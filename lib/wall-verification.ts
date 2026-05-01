import crypto from 'crypto';

export type WallFollowUpAnswer = {
  id: string;
  answer: string;
};

export type WallIntentPayload = {
  auditId: string;
  email: string;
  name: string;
  company?: string | null;
  kind?: string;
  visibility?: string;
  message?: string | null;
  followUpAnswers: WallFollowUpAnswer[];
  consentAt: string;
  iat: number;
  exp: number;
};

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function decodeBase64url(input: string) {
  const padded = input + '='.repeat((4 - (input.length % 4)) % 4);
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

function wallSecret() {
  return (
    process.env.SAIMOR_WALL_SECRET ||
    process.env.SAIMOR_ENTRY_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    (process.env.NODE_ENV !== 'production' ? 'local-dev-wall-secret' : '')
  );
}

function sign(encodedPayload: string) {
  const secret = wallSecret();
  if (!secret) throw new Error('Wall verification is not configured');
  return base64url(crypto.createHmac('sha256', secret).update(encodedPayload).digest());
}

export function createWallVerificationToken(payload: Omit<WallIntentPayload, 'iat' | 'exp'>, ttlSeconds = 30 * 60) {
  const now = Math.floor(Date.now() / 1000);
  const normalized: WallIntentPayload = {
    ...payload,
    email: payload.email.trim().toLowerCase(),
    name: payload.name.trim(),
    company: payload.company?.trim() || null,
    kind: normalizeKind(payload.kind),
    visibility: normalizeVisibility(payload.visibility),
    message: payload.message?.trim().slice(0, 240) || null,
    followUpAnswers: payload.followUpAnswers.slice(0, 5).map((item) => ({
      id: item.id,
      answer: item.answer.slice(0, 200),
    })),
    iat: now,
    exp: now + ttlSeconds,
  };
  const encodedPayload = base64url(JSON.stringify(normalized));
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyWallVerificationToken(token: string): WallIntentPayload {
  const [encodedPayload, signature] = token.split('.', 2);
  if (!encodedPayload || !signature) throw new Error('Invalid wall verification token');
  const expected = sign(encodedPayload);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    throw new Error('Invalid wall verification signature');
  }

  const payload = JSON.parse(decodeBase64url(encodedPayload).toString('utf8')) as WallIntentPayload;
  if (!payload.auditId || !payload.email || !payload.name) {
    throw new Error('Invalid wall verification payload');
  }
  if (!payload.consentAt) throw new Error('Wall consent is required');
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Wall verification token expired');
  }

  return {
    ...payload,
    email: payload.email.trim().toLowerCase(),
    kind: normalizeKind(payload.kind),
    visibility: normalizeVisibility(payload.visibility),
    message: payload.message?.trim().slice(0, 240) || null,
    followUpAnswers: Array.isArray(payload.followUpAnswers) ? payload.followUpAnswers.slice(0, 5) : [],
  };
}

function normalizeKind(value?: string) {
  const allowed = new Set(['supporter', 'customer', 'pilot', 'partner', 'investor', 'team', 'community', 'security-check']);
  return value && allowed.has(value) ? value : 'supporter';
}

function normalizeVisibility(value?: string) {
  const allowed = new Set(['named', 'company-anonymous', 'anonymous']);
  return value && allowed.has(value) ? value : 'named';
}
