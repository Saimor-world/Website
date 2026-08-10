import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
}));

vi.mock('next-auth', () => ({
  getServerSession: mocks.getServerSession,
}));
vi.mock('@/lib/auth', () => ({
  authOptions: {},
}));

import { GET as getActivity } from '@/app/api/dashboard/activity/route';
import { GET as getCosts } from '@/app/api/dashboard/costs/route';
import { GET as getOverview } from '@/app/api/dashboard/overview/route';
import { GET as getStatus } from '@/app/api/dashboard/status/route';

const request = (path: string, token?: string) =>
  new NextRequest(`http://localhost${path}`, {
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });

const routes = [
  ['/api/dashboard/activity', getActivity],
  ['/api/dashboard/costs', getCosts],
  ['/api/dashboard/overview', getOverview],
  ['/api/dashboard/status', getStatus],
] as const;

describe('owner dashboard routes', () => {
  beforeEach(() => {
    mocks.getServerSession.mockReset();
    vi.stubEnv('BACKEND_BASE_URL', 'https://dashboard.internal/api/dashboard');
    vi.stubEnv('DASHBOARD_API_TOKEN', 'server-token');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it.each(routes)('rejects unauthenticated access to %s', async (path, get) => {
    mocks.getServerSession.mockResolvedValue(null);
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await get(request(path));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({ error: 'Unauthorized' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fails closed when the dashboard backend is not configured', async () => {
    mocks.getServerSession.mockResolvedValue({ user: { role: 'owner' } });
    vi.stubEnv('BACKEND_BASE_URL', '');
    vi.stubEnv('DASHBOARD_API_TOKEN', '');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await getOverview(request('/api/dashboard/overview'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({ error: 'Dashboard backend is not configured' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('proxies owner requests with a bearer token and no demo wrapper', async () => {
    mocks.getServerSession.mockResolvedValue({ user: { role: 'owner' } });
    const upstream = { memory: { facts: 11 }, costs: { today_usd: 1.2 } };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => upstream,
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await getOverview(
      request('/api/dashboard/overview', 'request-token')
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(upstream);
    expect(body).not.toHaveProperty('isDemo');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://dashboard.internal/api/dashboard/stats/overview',
      expect.objectContaining({
        headers: { Authorization: 'Bearer request-token' },
        cache: 'no-store',
      })
    );
  });

  it('returns an error instead of fake data when upstream fails', async () => {
    mocks.getServerSession.mockResolvedValue({ user: { role: 'owner' } });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    const response = await getActivity(request('/api/dashboard/activity'));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({ error: 'Dashboard backend unavailable' });
    expect(body).not.toHaveProperty('activities');
    expect(body).not.toHaveProperty('isDemo');
  });
});