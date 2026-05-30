import crypto from 'crypto';

export function getOsBaseUrl() {
  return (
    process.env.OS_HOME_URL ||
    process.env.NEXT_PUBLIC_OS_HOME_URL ||
    'https://hq.saimor.world'
  );
}

export function getOsEntryBaseUrl() {
  const url = new URL(getOsBaseUrl());
  if (!url.pathname || url.pathname === '/') url.pathname = '/entry';
  return url.toString();
}

type OsContext = {
  surface?: string;
  entity?: string;
  id?: string;
  company?: string;
  email?: string;
  domain?: string;
  score?: string;
  level?: string;
  summary?: string;
  entry_token?: string;
  actions?: string;
};

function withQueryParams(baseUrl: string, params: Record<string, string | undefined>) {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

export function buildOsSsoUrl(email: string, context?: OsContext): string {
  const secret = process.env.SSO_SHARED_SECRET;
  const baseUrl = getOsBaseUrl();
  if (!secret) return withQueryParams(baseUrl, context || {}); // fallback: no SSO configured
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payload = `${email}:${timestamp}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const token = `${payloadB64}.${sig}`;
  return withQueryParams(baseUrl, {
    sso_token: token,
    ...context,
  });
}

export function buildOsAuditUrl(
  auditId: string,
  context?: Pick<OsContext, 'company' | 'email' | 'domain' | 'score' | 'level' | 'summary' | 'entry_token' | 'actions'>
) {
  return withQueryParams(getOsEntryBaseUrl(), {
    surface: 'website',
    entity: 'security-audit',
    id: auditId,
    token: context?.entry_token,
    ...context,
  });
}

export function buildOsBlueprintUrl(blueprintId: string) {
  return withQueryParams(getOsEntryBaseUrl(), {
    surface: 'website',
    entity: 'digital-blueprint',
    id: blueprintId,
  });
}
