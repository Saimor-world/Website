export type CoreConnectionStatus =
  | { state: 'connected'; label: 'CORE erreichbar'; detail: 'Health-Check bestaetigt' }
  | { state: 'unavailable'; label: 'CORE nicht erreichbar'; detail: 'Health-Check fehlgeschlagen' }
  | { state: 'unknown'; label: 'CORE Status unbekannt'; detail: 'Keine Health-Quelle konfiguriert' };

type FetchLike = typeof fetch;

export async function getCoreConnectionStatus(options: {
  endpoint?: string;
  fetchImpl?: FetchLike;
  timeoutMs?: number;
} = {}): Promise<CoreConnectionStatus> {
  const endpoint = options.endpoint ?? process.env.CORE_HEALTH_URL;
  if (!endpoint?.trim()) {
    return {
      state: 'unknown',
      label: 'CORE Status unbekannt',
      detail: 'Keine Health-Quelle konfiguriert',
    };
  }

  try {
    const response = await (options.fetchImpl ?? fetch)(endpoint, {
      cache: 'no-store',
      signal: AbortSignal.timeout(options.timeoutMs ?? 1500),
    });

    if (!response.ok) {
      return {
        state: 'unavailable',
        label: 'CORE nicht erreichbar',
        detail: 'Health-Check fehlgeschlagen',
      };
    }

    const body = await response.json().catch(() => null) as { ok?: boolean } | null;
    if (body?.ok !== true) {
      return {
        state: 'unavailable',
        label: 'CORE nicht erreichbar',
        detail: 'Health-Check fehlgeschlagen',
      };
    }

    return {
      state: 'connected',
      label: 'CORE erreichbar',
      detail: 'Health-Check bestaetigt',
    };
  } catch {
    return {
      state: 'unavailable',
      label: 'CORE nicht erreichbar',
      detail: 'Health-Check fehlgeschlagen',
    };
  }
}
