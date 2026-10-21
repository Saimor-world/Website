import dns from 'dns/promises';
import http from 'http';
import https from 'https';
import net from 'net';
import { isPrivateIp, validateScanDomain } from './domain-safety';

export type SafeResolution =
  | { ok: true; address: string; family: 4 | 6; addresses: string[] }
  | { ok: false; reason: 'invalid-host' | 'unresolved' | 'private'; addresses: string[] };

/**
 * Resolve a public hostname and refuse it if ANY resolved address (IPv4 or IPv6)
 * is private, loopback, link-local, metadata or otherwise reserved.
 */
export async function resolvePublicHost(host: string): Promise<SafeResolution> {
  const check = validateScanDomain(host);
  if (!check.ok) return { ok: false, reason: 'invalid-host', addresses: [] };
  const results = await dns.lookup(check.domain, { all: true, verbatim: true }).catch(() => []);
  const addresses = results.map((r) => r.address);
  if (addresses.length === 0) return { ok: false, reason: 'unresolved', addresses };
  if (addresses.some(isPrivateIp)) return { ok: false, reason: 'private', addresses };
  const first = results.find((r) => r.family === 4) ?? results[0];
  return { ok: true, address: first.address, family: first.family === 6 ? 6 : 4, addresses };
}

type PinnedOptions = { timeoutMs?: number; maxBytes?: number };

/**
 * GET a URL while connecting only to a validated public IP (DNS pinning, no rebinding).
 * Never follows redirects; callers re-validate each Location themselves.
 */
export async function pinnedGet(target: string, opts: PinnedOptions = {}): Promise<Response> {
  const url = new URL(target);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('unsupported protocol');
  if (url.port && url.port !== '443' && url.port !== '80') throw new Error('unsupported port');
  const resolved = await resolvePublicHost(url.hostname);
  if (!resolved.ok) throw new Error(`blocked host (${resolved.reason})`);
  const { address, family } = resolved;
  const timeoutMs = opts.timeoutMs ?? 5000;
  const maxBytes = opts.maxBytes ?? 512 * 1024;
  const mod = url.protocol === 'https:' ? https : http;

  return new Promise<Response>((resolve, reject) => {
    const req = mod.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method: 'GET',
        servername: net.isIP(url.hostname) ? undefined : url.hostname,
        headers: { 'user-agent': 'SaimorNightwatch/1.0 (+https://saimor.world)', accept: '*/*' },
        lookup: (_host: string, _o: unknown, cb: (err: Error | null, addr: string, fam: number) => void) =>
          cb(null, address, family),
        timeout: timeoutMs,
      } as https.RequestOptions,
      (res) => {
        const chunks: Buffer[] = [];
        let size = 0;
        res.on('data', (chunk: Buffer) => {
          size += chunk.length;
          if (size > maxBytes) {
            res.destroy();
            return;
          }
          chunks.push(chunk);
        });
        const finish = () => {
          const headers = new Headers();
          for (const [k, v] of Object.entries(res.headers)) {
            if (v === undefined) continue;
            headers.set(k, Array.isArray(v) ? v.join(', ') : String(v));
          }
          const status = res.statusCode && res.statusCode >= 200 && res.statusCode <= 599 ? res.statusCode : 500;
          const body = status === 204 || status === 304 ? null : Buffer.concat(chunks);
          resolve(new Response(body, { status, headers }));
        };
        res.on('end', finish);
        res.on('close', finish);
        res.on('error', reject);
      },
    );
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}
