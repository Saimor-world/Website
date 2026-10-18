import dns from 'node:dns/promises';
import https from 'node:https';
import { isPrivateIp, validateScanDomain } from './domain-safety';

export async function resolvePublicTarget(hostname: string) {
  if (!validateScanDomain(hostname).ok) throw new Error('Public DNS name required');
  const targets = await dns.lookup(hostname, { all: true, verbatim: true });
  // A mixed DNS answer is unsafe too. Fail closed on missing DNS and IPv6-only
  // private answers rather than checking only the first IPv4 address.
  if (!targets.length || targets.some(({ address }) => isPrivateIp(address))) {
    throw new Error('Non-public DNS target blocked');
  }
  return targets[0];
}

/** Bounded HTTPS request pinned to the address we actually validated. */
export async function fetchPublicPage(input: string, maxBytes = 192_000): Promise<Response> {
  const url = new URL(input);
  if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443')) {
    throw new Error('Only public HTTPS on port 443 is allowed');
  }
  const target = await resolvePublicTarget(url.hostname);
  return new Promise((resolve, reject) => {
    const request = https.request(url, {
      method: 'GET',
      agent: false,
      maxHeaderSize: 16_384,
      // Pin the connection; a second DNS resolution must never undo validation.
      lookup: (_hostname, options, callback) => {
        if (options.all) callback(null, [target]);
        else callback(null, target.address, target.family);
      },
      headers: { 'User-Agent': 'SAIMOR-Public-Security-Check/1.0', Accept: 'text/html,*/*;q=0.5' },
    }, (response) => {
      const status = response.statusCode || 502;
      const headers = new Headers();
      for (const [name, value] of Object.entries(response.headers)) {
        // Cookies have no role in an unauthenticated public posture check.
        if (name === 'set-cookie' || value === undefined) continue;
        headers.set(name, Array.isArray(value) ? value.join(', ') : value);
      }
      if ((status >= 300 && status < 400) || status === 204 || status === 304) {
        response.destroy();
        resolve(new Response(null, { status, headers }));
        return;
      }
      const chunks: Buffer[] = [];
      let bytes = 0;
      response.on('data', (chunk: Buffer) => {
        bytes += chunk.length;
        if (bytes > maxBytes) {
          response.destroy(new Error('Public response exceeds scan limit'));
          return;
        }
        chunks.push(chunk);
      });
      response.on('end', () => resolve(new Response(Buffer.concat(chunks), { status, headers })));
      response.on('error', reject);
      response.on('aborted', () => reject(new Error('Public response aborted')));
    });
    const timer = setTimeout(() => request.destroy(new Error('Public request timed out')), 5_000);
    request.on('close', () => clearTimeout(timer));
    request.on('error', reject);
    request.end();
  });
}
