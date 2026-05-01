import crypto from 'crypto';

type EntryTokenPayload = {
  id: string;
  company: string;
  email: string;
  domain: string;
  score: number;
  level: string;
  summary?: string | null;
  actions?: string[];
  iat: number;
  exp: number;
};

function getEntrySecret() {
  const secret = process.env.SAIMOR_ENTRY_SECRET || process.env.SAIMOR_WALL_SECRET || process.env.NEXTAUTH_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== 'production') return 'local-dev-entry-secret';
  throw new Error('SAIMOR_ENTRY_SECRET is required');
}

export function signWebsiteEntryToken(payload: Omit<EntryTokenPayload, 'iat' | 'exp'>) {
  const now = Math.floor(Date.now() / 1000);
  const body: EntryTokenPayload = {
    ...payload,
    iat: now,
    exp: now + 60 * 60 * 24,
  };
  const encoded = Buffer.from(JSON.stringify(body)).toString('base64url');
  const signature = crypto.createHmac('sha256', getEntrySecret()).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}
