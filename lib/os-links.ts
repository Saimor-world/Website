import crypto from 'crypto';

export function getOsBaseUrl() {
  return (
    process.env.OS_HOME_URL ||
    process.env.NEXT_PUBLIC_OS_HOME_URL ||
    'https://hq.saimor.world/home'
  );
}

export function buildOsSsoUrl(email: string): string {
  const secret = process.env.SSO_SHARED_SECRET;
  if (!secret) return getOsBaseUrl(); // fallback: no SSO configured
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const payload = `${email}:${timestamp}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const token = `${payloadB64}.${sig}`;
  return `${getOsBaseUrl()}?sso_token=${encodeURIComponent(token)}`;
}

export function buildOsAuditUrl(auditId: string) {
  const base = getOsBaseUrl();
  return `${base}?surface=website&entity=security-audit&id=${encodeURIComponent(auditId)}`;
}

export function buildOsBlueprintUrl(blueprintId: string) {
  const base = getOsBaseUrl();
  return `${base}?surface=website&entity=digital-blueprint&id=${encodeURIComponent(blueprintId)}`;
}

