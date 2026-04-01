const CORE_BASE_URL = process.env.SAIMOR_CORE_BASE_URL || 'https://api.saimor.world';
const OWNER_CONSOLE_CORE_TOKEN = process.env.OWNER_CONSOLE_CORE_TOKEN || '';

type CoreEnvelope<T> = {
  data?: T;
  meta?: Record<string, unknown>;
  detail?: string;
  error?: string;
  message?: string;
};

function buildCoreUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${CORE_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function extractCorePayload<T>(payload: unknown): T | null {
  if (!payload || typeof payload !== 'object') {
    return payload === undefined ? null : (payload as T);
  }
  const envelope = payload as CoreEnvelope<T>;
  if ('data' in envelope) {
    return (envelope.data ?? null) as T | null;
  }
  return payload as T;
}

function extractCoreError(payload: unknown): string {
  if (!payload || typeof payload !== 'object') {
    return 'Core request failed';
  }
  const envelope = payload as CoreEnvelope<unknown>;
  return envelope.detail || envelope.error || envelope.message || 'Core request failed';
}

export async function fetchCoreJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(buildCoreUrl(path), { cache: 'no-store', ...init });
    if (!response.ok) return null;
    const payload = await response.json();
    return extractCorePayload<T>(payload);
  } catch {
    return null;
  }
}

export async function fetchCoreOwnerJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!OWNER_CONSOLE_CORE_TOKEN) return null;
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${OWNER_CONSOLE_CORE_TOKEN}`);
  return fetchCoreJson<T>(path, { ...init, headers });
}

export async function requestCoreOwnerJson<T>(
  path: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; data: T | null; error: string | null }> {
  if (!OWNER_CONSOLE_CORE_TOKEN) {
    return { ok: false, status: 500, data: null, error: 'OWNER_CONSOLE_CORE_TOKEN is not configured' };
  }

  try {
    const headers = new Headers(init?.headers);
    headers.set('Authorization', `Bearer ${OWNER_CONSOLE_CORE_TOKEN}`);
    const response = await fetch(buildCoreUrl(path), { cache: 'no-store', ...init, headers });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        data: null,
        error: extractCoreError(payload),
      };
    }
    return {
      ok: true,
      status: response.status,
      data: extractCorePayload<T>(payload),
      error: null,
    };
  } catch {
    return {
      ok: false,
      status: 500,
      data: null,
      error: 'Owner console could not reach saimor-core',
    };
  }
}

export { CORE_BASE_URL, OWNER_CONSOLE_CORE_TOKEN };
