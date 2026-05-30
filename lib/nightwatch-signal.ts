export type NightwatchSignalEvent =
  | 'security_scan_completed'
  | 'hq_link_sent'
  | 'wall_verification_requested'
  | 'wall_verification_email_sent'
  | 'email_delivery_event'
  | 'preview_created';

export type NightwatchSignalPayload = {
  event: NightwatchSignalEvent;
  signalId?: string | null;
  auditId?: string | null;
  companyName?: string | null;
  contactName?: string | null;
  email?: string | null;
  domain?: string | null;
  score?: number | null;
  level?: string | null;
  grade?: string | null;
  hqUrl?: string | null;
  emailStatus?: string | null;
  wallStatus?: string | null;
  source?: string;
  occurredAt?: string;
  metadata?: Record<string, unknown>;
};

export type NightwatchSignalResult =
  | { sent: true; status: number }
  | { sent: false; reason: 'not_configured' | 'failed'; status?: number; error?: string };

const DEFAULT_TIMEOUT_MS = 2500;

export async function emitNightwatchSignal(
  payload: NightwatchSignalPayload,
  options: {
    endpoint?: string;
    secret?: string;
    fetchImpl?: typeof fetch;
    timeoutMs?: number;
  } = {}
): Promise<NightwatchSignalResult> {
  const endpoint = options.endpoint || process.env.NIGHTWATCH_SIGNAL_URL;
  const secret = options.secret || process.env.NIGHTWATCH_SIGNAL_SECRET;
  if (!endpoint || !secret) return { sent: false, reason: 'not_configured' };

  const fetchImpl = options.fetchImpl || fetch;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${secret}`,
        'x-nightwatch-secret': secret,
      },
      body: JSON.stringify({
        ...payload,
        source: payload.source || 'world',
        occurredAt: payload.occurredAt || new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      return { sent: false, reason: 'failed', status: res.status };
    }
    return { sent: true, status: res.status };
  } catch (error: any) {
    return { sent: false, reason: 'failed', error: error?.message || String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

export function redactedHqUrl(value?: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    url.searchParams.delete('token');
    url.searchParams.delete('entry_token');
    return url.toString();
  } catch {
    return null;
  }
}

export function nightwatchSignalId(auditId?: string | null, email?: string | null, domain?: string | null) {
  return (auditId || `${email || 'unknown'}:${domain || 'unknown'}`)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:_-]/g, '-')
    .slice(0, 160);
}
