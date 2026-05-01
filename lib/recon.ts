import dns from 'dns/promises';
import tls from 'tls';
import { isPrivateIp, validateScanDomain } from './domain-safety';

export type ReconResult = {
  domain: string;
  ip: string | null;
  subdomains: string[];
  mxRecords: string[];
  publicFiles: PublicFileProbe[];
  pageProbe: PageProbe | null;
  agentTrace: ReconTraceStep[];
  securityHeaders: {
    hsts: boolean;
    csp: boolean;
    xFrameOptions: boolean;
  };
  rawHeaders: Record<string, string>;
  redirectChain: string[];
  finalUrl: string | null;
  sslInfo: {
    valid: boolean;
    issuer: string | null;
    validTo: string | null;
    protocol: string | null;
    bits: number | null;
    fingerprint: string | null;
  } | null;
};

export type ReconTraceStep = {
  step: 'dns' | 'tls' | 'certificate-transparency' | 'http' | 'public-files' | 'page-fingerprint';
  target: string;
  status: 'ok' | 'warn' | 'blocked' | 'error';
  detail: string;
};

export type PublicFileProbe = {
  path: string;
  status: number | null;
  found: boolean;
  risk: 'ok' | 'info' | 'risk';
};

export type PageProbe = {
  status: number;
  title: string | null;
  forms: number;
  externalHosts: string[];
  technologies: string[];
};

const PUBLIC_FILE_PROBES: Array<{ path: string; risk: PublicFileProbe['risk'] }> = [
  { path: '/.well-known/security.txt', risk: 'ok' },
  { path: '/security.txt', risk: 'ok' },
  { path: '/robots.txt', risk: 'info' },
  { path: '/sitemap.xml', risk: 'info' },
  { path: '/.git/HEAD', risk: 'risk' },
  { path: '/.env', risk: 'risk' },
  { path: '/.DS_Store', risk: 'risk' },
];

/**
 * Performs a passive and active reconnaissance on a domain.
 */
export async function performPassiveRecon(domain: string): Promise<ReconResult> {
  const result: ReconResult = {
    domain,
    ip: null,
    subdomains: [],
    mxRecords: [],
    publicFiles: [],
    pageProbe: null,
    agentTrace: [],
    securityHeaders: { hsts: false, csp: false, xFrameOptions: false },
    rawHeaders: {},
    redirectChain: [],
    finalUrl: null,
    sslInfo: null
  };

  try {
    // 1. DNS & IP
    const addresses = await dns.resolve4(domain).catch(() => []);
    result.ip = addresses[0] || null;
    result.agentTrace.push({
      step: 'dns',
      target: domain,
      status: result.ip ? 'ok' : 'warn',
      detail: result.ip ? `Resolved ${addresses.length} IPv4 address${addresses.length === 1 ? '' : 'es'}.` : 'No public IPv4 address resolved.',
    });
    if (addresses.length > 0 && addresses.every(isPrivateIp)) {
      result.agentTrace.push({
        step: 'dns',
        target: domain,
        status: 'blocked',
        detail: 'Scan stopped because the resolved address is private or reserved.',
      });
      return result;
    }

    // 2. Active TLS Scan (Fixed race condition and added details)
    try {
      await new Promise<void>((resolve) => {
        const socket = tls.connect(443, domain, { 
          servername: domain, 
          timeout: 5000,
          rejectUnauthorized: false // We want to see the cert even if invalid
        }, () => {
          const cert = socket.getPeerCertificate();
          if (cert && Object.keys(cert).length > 0) {
            result.sslInfo = {
              valid: socket.authorized,
              issuer: typeof cert.issuer === 'string' ? cert.issuer : (cert.issuer.O || cert.issuer.CN || null),
              validTo: cert.valid_to,
              protocol: socket.getProtocol(),
              bits: (cert as any).bits || null,
              fingerprint: cert.fingerprint
            };
          }
          socket.destroy();
          result.agentTrace.push({
            step: 'tls',
            target: `${domain}:443`,
            status: result.sslInfo?.valid ? 'ok' : 'warn',
            detail: result.sslInfo?.protocol
              ? `TLS answered with ${result.sslInfo.protocol}.`
              : 'TLS answered without readable certificate metadata.',
          });
          resolve();
        });

        socket.on('error', (err) => {
          // console.error('[Recon] TLS socket error:', err.message);
          result.agentTrace.push({
            step: 'tls',
            target: `${domain}:443`,
            status: 'error',
            detail: err.message || 'TLS connection failed.',
          });
          socket.destroy();
          resolve();
        });

        socket.on('timeout', () => {
          result.agentTrace.push({
            step: 'tls',
            target: `${domain}:443`,
            status: 'error',
            detail: 'TLS probe timed out.',
          });
          socket.destroy();
          resolve();
        });
      });
    } catch (tlsError) {
      console.error('[Recon] TLS scan failed:', tlsError);
    }

    // 3. Subdomain Discovery (Passive crt.sh)
    try {
      const crtResponse = await fetch(`https://crt.sh/?q=${domain}&output=json`, { signal: AbortSignal.timeout(5000) });
      if (crtResponse.ok) {
        const data = await crtResponse.json();
        const uniqueNames = new Set<string>();
        if (Array.isArray(data)) {
          data.forEach((entry: any) => {
            if (entry.name_value) {
              entry.name_value.split('\n').forEach((name: string) => {
                const cleanName = name.replace(/^\*\./, '').toLowerCase().trim();
                if (cleanName.includes(domain)) uniqueNames.add(cleanName);
              });
            }
          });
        }
        result.subdomains = Array.from(uniqueNames).slice(0, 15);
        result.agentTrace.push({
          step: 'certificate-transparency',
          target: `crt.sh:${domain}`,
          status: result.subdomains.length > 0 ? 'ok' : 'warn',
          detail: `${result.subdomains.length} public name${result.subdomains.length === 1 ? '' : 's'} collected from certificate transparency.`,
        });
      }
    } catch (crtError: any) {
      result.agentTrace.push({
        step: 'certificate-transparency',
        target: `crt.sh:${domain}`,
        status: 'error',
        detail: crtError?.message || 'Certificate transparency lookup failed.',
      });
    }

    // 4. Headers & Redirects
    try {
      let currentUrl = `https://${domain}`;
      const visited = new Set<string>();
      let redirectsRemaining = 5;

      while (redirectsRemaining > 0) {
        if (visited.has(currentUrl)) break;
        visited.add(currentUrl);

        const currentHost = new URL(currentUrl).hostname;
        const currentAddresses = currentHost === domain ? addresses : await dns.resolve4(currentHost).catch(() => []);
        if (currentAddresses.length > 0 && currentAddresses.every(isPrivateIp)) break;

        const response = await fetch(currentUrl, { 
          method: 'GET', // Use GET instead of HEAD for better compatibility
          redirect: 'manual',
          signal: AbortSignal.timeout(5000)
        }).catch(() => null);

        if (!response) break;

        // Capture headers from the final or current response
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headers[key.toLowerCase()] = value;
        });
        
        // Update security headers based on current response (cumulative or final?)
        // Usually we care about the final landing page security
        result.rawHeaders = headers;
        result.finalUrl = currentUrl;
        result.securityHeaders.hsts = !!headers['strict-transport-security'];
        result.securityHeaders.csp = !!headers['content-security-policy'];
        result.securityHeaders.xFrameOptions = !!headers['x-frame-options'];
        result.agentTrace.push({
          step: 'http',
          target: currentUrl,
          status: response.ok ? 'ok' : response.status >= 300 && response.status < 400 ? 'warn' : 'error',
          detail: `HTTP ${response.status}; HSTS=${String(result.securityHeaders.hsts)}, CSP=${String(result.securityHeaders.csp)}, XFO=${String(result.securityHeaders.xFrameOptions)}.`,
        });

        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get('location');
          if (location) {
            const nextUrl = new URL(location, currentUrl).toString();
            const nextHost = new URL(nextUrl).hostname;
            const nextHostCheck = validateScanDomain(nextHost);
            if (!nextHostCheck.ok) break;
            result.redirectChain.push(nextUrl);
            currentUrl = nextUrl;
            redirectsRemaining--;
            continue;
          }
        }
        await collectPageProbe(response, currentUrl, result);
        break; // Not a redirect
      }
    } catch (e) {
        // console.error('[Recon] Header scan failed:', e);
    }

    // 5. Public information hygiene probes. GET-only, common public paths.
    if (result.finalUrl) {
      const finalOrigin = new URL(result.finalUrl).origin;
      const probes = await Promise.all(PUBLIC_FILE_PROBES.map(async (probe) => {
        try {
          const response = await fetch(`${finalOrigin}${probe.path}`, {
            method: 'GET',
            redirect: 'manual',
            signal: AbortSignal.timeout(4000),
          });
          const found = response.status >= 200 && response.status < 300;
          return {
            path: probe.path,
            status: response.status,
            found,
            risk: found ? probe.risk : 'ok',
          };
        } catch {
          return {
            path: probe.path,
            status: null,
            found: false,
            risk: 'ok' as const,
          };
        }
      }));
      result.publicFiles = probes;
      const found = probes.filter((probe) => probe.found);
      result.agentTrace.push({
        step: 'public-files',
        target: finalOrigin,
        status: found.some((probe) => probe.risk === 'risk') ? 'warn' : 'ok',
        detail: `${found.length}/${probes.length} public probe paths returned HTTP 2xx.`,
      });
    }

  } catch (globalError) {
    console.error('[Recon] Global error:', globalError);
  }

  return result;
}

async function collectPageProbe(response: Response, currentUrl: string, result: ReconResult) {
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !contentType.includes('text/html')) return;

  try {
    const html = await response.text();
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() || null;
    const forms = (html.match(/<form[\s>]/gi) || []).length;
    const externalHosts = collectExternalHosts(html, currentUrl);
    const technologies = fingerprintTechnologies(html, result.rawHeaders);
    result.pageProbe = {
      status: response.status,
      title,
      forms,
      externalHosts,
      technologies,
    };
    result.agentTrace.push({
      step: 'page-fingerprint',
      target: currentUrl,
      status: 'ok',
      detail: `${technologies.length} technology hint${technologies.length === 1 ? '' : 's'}, ${forms} form${forms === 1 ? '' : 's'}, ${externalHosts.length} external host${externalHosts.length === 1 ? '' : 's'}.`,
    });
  } catch (error: any) {
    result.agentTrace.push({
      step: 'page-fingerprint',
      target: currentUrl,
      status: 'error',
      detail: error?.message || 'HTML fingerprint failed.',
    });
  }
}

function collectExternalHosts(html: string, currentUrl: string) {
  const baseHost = new URL(currentUrl).hostname;
  const hosts = new Set<string>();
  const attrPattern = /\s(?:href|src|action)=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = attrPattern.exec(html))) {
    try {
      const url = new URL(match[1], currentUrl);
      if ((url.protocol === 'http:' || url.protocol === 'https:') && url.hostname !== baseHost) {
        hosts.add(url.hostname);
      }
    } catch {
      // Ignore malformed relative attributes.
    }
  }
  return Array.from(hosts).slice(0, 12);
}

function fingerprintTechnologies(html: string, headers: Record<string, string>) {
  const haystack = `${html.slice(0, 160000)}\n${Object.values(headers).join('\n')}`.toLowerCase();
  const hints: Array<[string, RegExp]> = [
    ['WordPress', /wp-content|wp-includes|x-pingback/],
    ['Shopify', /cdn\.shopify\.com|x-shopify/],
    ['Wix', /wixstatic|x-wix/],
    ['Webflow', /webflow\.js|x-powered-by:\s*webflow/],
    ['Next.js', /_next\/static|next-router-state-tree/],
    ['React', /react-dom|__react/],
    ['Google Tag Manager', /googletagmanager\.com|gtm-/],
    ['Cloudflare', /cloudflare|cf-cache-status|__cf_bm/],
  ];
  return hints.filter(([, pattern]) => pattern.test(haystack)).map(([label]) => label);
}
