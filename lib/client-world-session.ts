import crypto from 'crypto';

const SESSION_DAYS = 30;

type WorldSessionPayload = {
  slug: string;
  sid: string;
  exp: number;
};

function secret() {
  const value = process.env.NEXTAUTH_SECRET;
  if (!value || value.length < 16) {
    throw new Error('NEXTAUTH_SECRET is required for Client World sessions');
  }
  return value;
}

function sign(value: string) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url');
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function safeWorldSlug(slug: string) {
  return slug.toLowerCase().replace(/[^a-z0-9_-]/g, '');
}

export function worldCookieName(slug: string) {
  return `saimor_world_${safeWorldSlug(slug)}`;
}

export function worldPreviewCookieName(slug: string) {
  return `saimor_world_preview_${safeWorldSlug(slug)}`;
}

export function createWorldSession(slug: string) {
  const payload: WorldSessionPayload = {
    slug,
    sid: crypto.randomUUID(),
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function readWorldSession(token: string | undefined, expectedSlug: string): WorldSessionPayload | null {
  if (!token) return null;
  const [encoded, signature, ...rest] = token.split('.');
  if (!encoded || !signature || rest.length > 0) return null;

  const expectedSignature = sign(encoded);
  if (!safeEqual(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as WorldSessionPayload;
    if (!payload || payload.slug !== expectedSlug || typeof payload.sid !== 'string' || typeof payload.exp !== 'number') return null;
    if (payload.exp <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function accessCodeMatches(input: string, expected: string) {
  const left = crypto.createHash('sha256').update(input, 'utf8').digest();
  const right = crypto.createHash('sha256').update(expected, 'utf8').digest();
  return crypto.timingSafeEqual(left, right);
}

export const worldSessionMaxAge = SESSION_DAYS * 24 * 60 * 60;
