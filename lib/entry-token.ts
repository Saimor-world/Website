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
    const encoded = Buffer.from(JSON.stringify(body)).toString('base64url');
    const sig = crypto
        .createHmac('sha256', secret ?? getEntrySecret())
        .update(encoded)
        .digest('base64url');
    return `${encoded}.${sig}`;
}

/** Decodes payload without verifying signature — for display-only use on the client. */
export function decodeContextToken(token: string): ContextTokenPayload | null {
    try {
        const [encoded] = token.split('.');
        return JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as ContextTokenPayload;
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
