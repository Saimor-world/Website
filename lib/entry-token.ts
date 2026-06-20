import crypto from 'crypto';

export type ScanFinding = {
    title: string;
    severity: 'risk' | 'warn' | 'ok';
    desc?: string | null;
};

type ContextTokenPayload = {
    id: string;
    company: string;
    /** @deprecated Plain email in tokens leaks PII from URL — prefer email_digest. */
    email?: string;
    email_digest?: string;
    domain: string;
    score: number;
    level: string;
    grade?: string | null;
    summary?: string | null;
    actions?: string[];
    /** Top findings (risk/warn) from the passive recon scan — seeded into MÔRA on first login. */
    findings?: ScanFinding[];
    iat: number;
    exp: number;
};

function getEntrySecret() {
    if (typeof window !== 'undefined') {
        return 'client-side-dummy-secret';
    }
    const secret = process.env.SAIMOR_ENTRY_SECRET || process.env.NEXTAUTH_SECRET;
    if (secret) return secret;
    if (process.env.NODE_ENV !== 'production') return 'local-dev-entry-secret';
    throw new Error('SAIMOR_ENTRY_SECRET is required');
}

// Server-side (Node) Base64Url helper using Buffer
function toBase64UrlNode(buf: Buffer): string {
    return buf
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function fromBase64UrlNode(encoded: string): Buffer {
    const padded = encoded + '='.repeat((4 - (encoded.length % 4)) % 4);
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(base64, 'base64');
}

// Browser-safe Base64Url helper
function toBase64UrlBrowser(str: string): string {
    const bytes = new TextEncoder().encode(str);
    let binString = "";
    for (let i = 0; i < bytes.byteLength; i++) {
        binString += String.fromCharCode(bytes[i]);
    }
    return btoa(binString)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function fromBase64UrlBrowser(encoded: string): string {
    const padded = encoded + '='.repeat((4 - (encoded.length % 4)) % 4);
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
    const binString = atob(base64);
    const bytes = new Uint8Array(binString.length);
    for (let i = 0; i < binString.length; i++) {
        bytes[i] = binString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}

export function digestEntryEmail(email: string, secret?: string): string {
    const normalized = (email || '').trim().toLowerCase();
    return crypto
        .createHmac('sha256', secret ?? getEntrySecret())
        .update(normalized)
        .digest('hex')
        .slice(0, 32);
}

/** Build token without plaintext email in the URL-decodable payload. */
export function buildOpaqueEntryToken(
    payload: Omit<ContextTokenPayload, 'iat' | 'exp' | 'email'> & { email: string },
    secret?: string,
): string {
    const resolvedSecret = secret ?? getEntrySecret();
    const { email, ...rest } = payload;
    return buildContextToken(
        {
            ...rest,
            email_digest: digestEntryEmail(email, resolvedSecret),
        },
        resolvedSecret,
    );
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

    const jsonStr = JSON.stringify(body);
    let encoded: string;
    let sig: string;

    if (typeof window === 'undefined') {
        // Node / Server environment
        const cryptoModule = require('crypto');
        encoded = toBase64UrlNode(Buffer.from(jsonStr, 'utf8'));
        sig = toBase64UrlNode(
            cryptoModule
                .createHmac('sha256', secret ?? getEntrySecret())
                .update(encoded)
                .digest()
        );
    } else {
        // Browser / Client environment
        encoded = toBase64UrlBrowser(jsonStr);
        sig = 'client-fallback-signature';
    }

    return `${encoded}.${sig}`;
}

/** Decodes payload without verifying signature — for display-only use on the client. */
export function decodeContextToken(token: string): ContextTokenPayload | null {
    try {
        const [encoded] = token.split('.');
        if (typeof window === 'undefined') {
            return JSON.parse(fromBase64UrlNode(encoded).toString('utf8')) as ContextTokenPayload;
        } else {
            return JSON.parse(fromBase64UrlBrowser(encoded)) as ContextTokenPayload;
        }
    } catch {
        return null;
    }
}

/** @deprecated Use buildOpaqueEntryToken instead */
export function signWebsiteEntryToken(
    payload: Omit<ContextTokenPayload, 'iat' | 'exp'> & { email: string },
): string {
    return buildOpaqueEntryToken(payload);
}

