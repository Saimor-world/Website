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
    const value = ip.toLowerCase();
    return value === '::1' || value.startsWith('fc') || value.startsWith('fd') || value.startsWith('fe80:');
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
  if (a >= 224) return true;

  return false;
}

function isValidDnsLabel(label: string) {
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label);
}
