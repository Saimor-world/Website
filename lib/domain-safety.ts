import net from 'net';

export type ScanDomainValidation =
  | { ok: true; domain: string }
  | { ok: false; reason: string };

const RESERVED_SUFFIXES = [
  '.localhost',
  '.local',
  '.internal',
  '.lan',
  '.home',
  '.test',
  '.invalid',
];

export function normalizeScanDomain(value: string) {
  const input = (value || '').trim().toLowerCase();
  if (!input) return '';

  try {
    const url = new URL(input.startsWith('http://') || input.startsWith('https://') ? input : `https://${input}`);
    return url.hostname.replace(/\.$/, '');
  } catch {
    return input
      .replace(/^https?:\/\//, '')
      .replace(/[/?#].*$/, '')
      .replace(/:\d+$/, '')
      .replace(/\.$/, '');
  }
}

export function validateScanDomain(value: string): ScanDomainValidation {
  const domain = normalizeScanDomain(value);
  if (!domain) return { ok: false, reason: 'Domain fehlt.' };
  if (domain.length > 253) return { ok: false, reason: 'Domain ist zu lang.' };
  if (domain === 'localhost' || RESERVED_SUFFIXES.some((suffix) => domain.endsWith(suffix))) {
    return { ok: false, reason: 'Interne oder reservierte Hostnamen koennen nicht gescannt werden.' };
  }
  if (net.isIP(domain)) {
    return { ok: false, reason: 'Bitte eine oeffentliche Domain statt einer IP-Adresse angeben.' };
  }

  const labels = domain.split('.');
  if (labels.length < 2) return { ok: false, reason: 'Bitte eine vollstaendige oeffentliche Domain angeben.' };
  if (!labels.every(isValidDnsLabel)) {
    return { ok: false, reason: 'Domain enthaelt ungueltige Zeichen.' };
  }

  return { ok: true, domain };
}

export function isPrivateIp(ip: string) {
  if (net.isIP(ip) === 6) {
    const value = ip.toLowerCase().split('%')[0];
    const mapped = /^(?:0{0,4}:){0,5}(?:0{0,4}:)?ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(value) || /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(value);
    if (mapped) return isPrivateIp(mapped[1]);
    if (value === '::' || value === '::1') return true;
    if (/^::(\d+\.){3}\d+$/.test(value)) return true; // IPv4-compatible
    if (/^::ffff:[0-9a-f]{1,4}:[0-9a-f]{1,4}$/.test(value)) return true; // mapped, hex form
    if (value.startsWith('64:ff9b:')) return true; // NAT64
    if (/^f[cd]/.test(value)) return true; // unique local
    if (/^fe[89ab]/.test(value)) return true; // link-local
    if (/^fe[c-f]/.test(value)) return true; // site-local (deprecated)
    if (value.startsWith('ff')) return true; // multicast
    if (value.startsWith('2001:db8') || value.startsWith('2001:0db8')) return true; // documentation
    if (value.startsWith('fd00:ec2::254')) return true; // AWS metadata
    return false;
  }

  if (net.isIP(ip) !== 4) return true;
  const parts = ip.split('.').map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return true;
  }

  const [a, b] = parts;
  if (a === 0 || a === 10 || a === 127) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 192 && b === 0) return true;
  if (a === 198 && (b === 18 || b === 19)) return true;
  if (a === 198 && b === 51 && parts[2] === 100) return true;
  if (a === 203 && b === 0 && parts[2] === 113) return true;
  if (a >= 224) return true;

  return false;
}

function isValidDnsLabel(label: string) {
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label);
}
