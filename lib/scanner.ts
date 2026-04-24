import dns from 'dns/promises';
import axios from 'axios';

export type ScanMetrics = {
  domain: string;
  ip: string;
  headers: Record<string, string>;
  tls: any;
  subdomains: string[];
};

export async function runLiveRecon(domain: string): Promise<ScanMetrics | null> {
  const normalizedDomain = domain.replace(/^(https?:\/\/)/, '').replace(/\/$/, '');
  
  try {
    // 1. DNS Lookup
    const addresses = await dns.resolve4(normalizedDomain).catch(() => []);
    const ip = addresses[0] || 'Unknown';

    // 2. HTTP Header Scan
    const response = await axios.get(`https://${normalizedDomain}`, { 
      timeout: 5000,
      validateStatus: () => true, // Get headers even on 401/403
      headers: { 'User-Agent': 'Saimor-Security-Audit/1.0' }
    }).catch(() => null);

    const headers = response?.headers || {};

    // 3. Simple Subdomain Recon (Example: common ones)
    // In a real scenario, we would use a service or a wordlist
    const commonPrefixes = ['dev', 'staging', 'test', 'api', 'mail', 'vpn'];
    const foundSubdomains: string[] = [];
    
    await Promise.all(commonPrefixes.map(async (prefix) => {
      const sub = `${prefix}.${normalizedDomain}`;
      try {
        await dns.resolve4(sub);
        foundSubdomains.push(sub);
      } catch {}
    }));

    return {
      domain: normalizedDomain,
      ip,
      headers: Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, String(v)])),
      tls: {
        secure: response?.config.url?.startsWith('https'),
        // TLS details would normally require an https.request call
      },
      subdomains: foundSubdomains
    };
  } catch (error) {
    console.error("Live Recon failed for", domain, error);
    return null;
  }
}
