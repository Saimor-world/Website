import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ $queryRaw: vi.fn() }));

vi.mock('@/lib/prisma', () => ({
  prisma: { $queryRaw: mocks.$queryRaw },
}));

import { GET } from '@/app/api/health/route';

describe('public health route', () => {
  beforeEach(() => mocks.$queryRaw.mockReset());

  it('returns only the minimal public availability contract', async () => {
    mocks.$queryRaw.mockResolvedValue(42);
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('cache-control')).toBe('no-store');
    expect(body).toEqual({ ok: true });
  });

  it('does not expose infrastructure errors when unavailable', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    mocks.$queryRaw.mockRejectedValueOnce(
      new Error('postgres://secret-host/internal')
    );
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({ ok: false });
    expect(JSON.stringify(body)).not.toContain('secret-host');
    expect(warning).toHaveBeenCalledWith('[health] database check failed');
    warning.mockRestore();
  });
});