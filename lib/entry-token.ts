import crypto from 'crypto';

type ContextTokenPayload = {
    id: string;
    company: string;
    email: string;
    domain: string;
    score: number;
    level: string;
    grade?: string | null;
    summary?: string | null;
    actions?: string[];
    iat: number;
    exp: number;
};

function getEntrySecret() {
    const secret = process.env.SAIMOR_ENTRY_SECRET;
    if (secret) return secret;
    if (process.env.NODE_ENV !== 'production') return 'local-dev-entry-secret';
    throw new Error('SAIMOR_ENTRY_SECRET is required');
}

function toBase64Url(buf: Buffer): string {
    return buf
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function fromBase64Url(encoded: string): Buffer {
    const padded = encoded + '='.repeat((4 - (encoded.length % 4)) % 4);
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(base64, 'base64');
}

export function buildContextToken(
    payload: Omit<ContextTokenPayload, 'iat' | 'exp'>,
    secret?: string,
): string {
    const now = Math.floor(Date.now() / 1000);
    const body: ContextTokenPayload = {
        ...payload,
        iat: now,
        exp: now + 60 * 60 * 24,
    };
    const encoded = toBase64Url(Buffer.from(JSON.stringify(body)));
    const sig = toBase64Url(
        crypto
            .createHmac('sha256', secret ?? getEntrySecret())
            .update(encoded)
            .digest()
    );
    return `${encoded}.${sig}`;
}

/** Decodes payload without verifying signature — for display-only use on the client. */
export function decodeContextToken(token: string): ContextTokenPayload | null {
    try {
        const [encoded] = token.split('.');
        return JSON.parse(fromBase64Url(encoded).toString('utf8')) as ContextTokenPayload;
    } catch {
        return null;
    }
}

/** @deprecated Use buildContextToken instead */
export function signWebsiteEntryToken(
    payload: Omit<ContextTokenPayload, 'iat' | 'exp'>,
): string {
    return buildContextToken(payload);
}
