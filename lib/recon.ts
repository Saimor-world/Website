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
  sslInfo: {
    valid: boolean;
    issuer: string | null;
    validTo: string | null;
    protocol: string | null;
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
    sslInfo: null
  };

  try {
    // 1. DNS & IP
    const addresses = await dns.resolve4(domain).catch(() => []);
    result.ip = addresses[0] || null;

    // 2. Active TLS Scan (Real Product Feature)
    try {
      const socket = tls.connect(443, domain, { servername: domain, timeout: 5000 }, () => {
        const cert = socket.getPeerCertificate();
        if (cert && Object.keys(cert).length > 0) {
          result.sslInfo = {
            valid: socket.authorized,
            issuer: cert.issuer.O || cert.issuer.CN,
            validTo: cert.valid_to,
            protocol: socket.getProtocol()
          };
        }
        socket.destroy();
      });
      await new Promise((resolve) => {
        socket.on('secureConnect', resolve);
        socket.on('error', resolve);
        socket.on('timeout', resolve);
      });
    } catch (tlsError) {
      console.error('[Recon] TLS scan failed:', tlsError);
    }

    // 3. Subdomain Discovery (Passive crt.sh)
    try {
      const crtResponse = await fetch(`https://crt.sh/?q=${domain}&output=json`);
      if (crtResponse.ok) {
        const data = await crtResponse.json();
        const uniqueNames = new Set<string>();
        if (Array.isArray(data)) {
          data.forEach((entry: any) => {
            entry.name_value.split('\n').forEach((name: string) => {
              if (name.includes(domain)) uniqueNames.add(name.toLowerCase());
            });
          });
        }
        result.subdomains = Array.from(uniqueNames).slice(0, 15);
      }
    } catch (crtError) {}

    // 4. Headers
    try {
      const headResponse = await fetch(`https://${domain}`, { method: 'HEAD' }).catch(() => null);
      if (headResponse) {
        result.securityHeaders.hsts = headResponse.headers.has('strict-transport-security');
        result.securityHeaders.csp = headResponse.headers.has('content-security-policy');
        result.securityHeaders.xFrameOptions = headResponse.headers.has('x-frame-options');
      }
    } catch (e) {}

  } catch (globalError) {
    console.error('[Recon] Global error:', globalError);
  }

  return result;
}
