import { describe, expect, it, vi } from 'vitest';
import { getCoreConnectionStatus } from '@/lib/core-connection';

function fetchResponse(body: string, init?: ResponseInit): typeof fetch {
  return vi.fn(async () => new Response(body, init)) as unknown as typeof fetch;
}

describe('CORE connection status', () => {
  it('is unknown when no explicit health source is configured', async () => {
    const status = await getCoreConnectionStatus({ endpoint: '' });

    expect(status.state).toBe('unknown');
  });

  it('reports connected only for an explicit healthy payload', async () => {
    const status = await getCoreConnectionStatus({
      endpoint: 'https://core.example/health',
      fetchImpl: fetchResponse('{"ok":true}', { status: 200 }),
    });

    expect(status.state).toBe('connected');
  });

  it.each([
    ['empty JSON', '{}', 200],
    ['non-JSON', 'healthy', 200],
    ['unhealthy JSON', '{"ok":false}', 200],
    ['HTTP failure', '{"ok":true}', 503],
  ])('fails closed for %s', async (_label, body, statusCode) => {
    const status = await getCoreConnectionStatus({
      endpoint: 'https://core.example/health',
      fetchImpl: fetchResponse(body, { status: statusCode }),
    });

    expect(status.state).toBe('unavailable');
  });
});
