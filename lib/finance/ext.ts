/**
 * Contract v2: optional `ext` object on the bot status push.
 * Read-only observation data (core levels, grid, FUZZY, memes, breakouts, totals).
 * Leaves must be number | string | boolean | null. Never wallets or seeds.
 */
export const EXT_MAX_BYTES = 16 * 1024;
export const EXT_MAX_DEPTH = 8;

export type ExtValue = number | string | boolean | null | ExtValue[] | { [k: string]: ExtValue };
export type FinanceExt = { v: number } & { [k: string]: ExtValue };

export type ExtCheck =
  | { ok: true; ext: FinanceExt | null }
  | { ok: false; status: 400 | 413; error: string; message: string };

// XRPL classic address (r…) or family seed (s…) — must never be pushed.
const ADDRESS_RE = /\br[1-9A-HJ-NP-Za-km-z]{24,34}\b/;
const SEED_RE = /\bs[1-9A-HJ-NP-Za-km-z]{28,30}\b/;

function walk(v: unknown, depth: number): string | null {
  if (depth > EXT_MAX_DEPTH) return 'ext too deeply nested';
  if (v === null || typeof v === 'boolean') return null;
  if (typeof v === 'number') return Number.isFinite(v) ? null : 'non-finite number in ext';
  if (typeof v === 'string') {
    if (ADDRESS_RE.test(v) || SEED_RE.test(v)) return 'ext must not contain addresses or seeds';
    return null;
  }
  if (Array.isArray(v)) {
    for (const x of v) {
      const e = walk(x, depth + 1);
      if (e) return e;
    }
    return null;
  }
  if (typeof v === 'object') {
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
      if (ADDRESS_RE.test(k) || SEED_RE.test(k)) return 'ext must not contain addresses or seeds';
      const e = walk(x, depth + 1);
      if (e) return e;
    }
    return null;
  }
  return 'unsupported value type in ext';
}

export function checkExt(raw: unknown): ExtCheck {
  if (raw === undefined || raw === null) return { ok: true, ext: null };
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, status: 400, error: 'validation', message: 'ext must be an object' };
  }
  const bytes = new TextEncoder().encode(JSON.stringify(raw)).length;
  if (bytes > EXT_MAX_BYTES) {
    return { ok: false, status: 413, error: 'ext_too_large', message: `ext is ${bytes} bytes; max ${EXT_MAX_BYTES}` };
  }
  const v = (raw as Record<string, unknown>).v;
  if (typeof v !== 'number' || !Number.isInteger(v) || v < 1) {
    return { ok: false, status: 400, error: 'validation', message: 'ext.v (integer ≥ 1) is required' };
  }
  const err = walk(raw, 0);
  if (err) return { ok: false, status: 400, error: 'validation', message: err };
  return { ok: true, ext: raw as FinanceExt };
}
