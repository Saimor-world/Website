import dns from 'dns/promises';
import tls from 'tls';

export type ReconResult = {
  domain: string;
  ip: string | null;
  subdomains: string[];
  mxRecords: string[];
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

/**
 * Performs a passive and active reconnaissance on a domain.
 */
export async function performPassiveRecon(domain: string): Promise<ReconResult> {
  const result: ReconResult = {
    domain,
    ip: null,
    subdomains: [],
    mxRecords: [],
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
          resolve();
        });

        socket.on('error', (err) => {
          // console.error('[Recon] TLS socket error:', err.message);
          socket.destroy();
          resolve();
        });

        socket.on('timeout', () => {
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
      }
    } catch (crtError) {}

    // 4. Headers & Redirects
    try {
      let currentUrl = `https://${domain}`;
      const visited = new Set<string>();
      let redirectsRemaining = 5;

      while (redirectsRemaining > 0) {
        if (visited.has(currentUrl)) break;
        visited.add(currentUrl);

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

        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get('location');
          if (location) {
            const nextUrl = new URL(location, currentUrl).toString();
            result.redirectChain.push(nextUrl);
            currentUrl = nextUrl;
            redirectsRemaining--;
            continue;
          }
        }
        break; // Not a redirect
      }
    } catch (e) {
        // console.error('[Recon] Header scan failed:', e);
    }

  } catch (globalError) {
    console.error('[Recon] Global error:', globalError);
  }

  return result;
}
