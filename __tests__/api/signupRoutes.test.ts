import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  limiterCheck: vi.fn(),
  upsert: vi.fn(),
  count: vi.fn(),
}));

vi.mock('@/lib/rate-limit', () => ({
  getClientIP: () => '127.0.0.1',
  waitlistLimiter: { check: mocks.limiterCheck },
}));

vi.mock('@/lib/prisma', () => ({
  prisma: {
    waitlist: {
      upsert: mocks.upsert,
      count: mocks.count,
    },
  },
}));

import { POST as postNewsletter } from '@/app/api/newsletter/route';
import { POST as postWaitlist } from '@/app/api/waitlist/route';

function jsonRequest(path: string, body: unknown) {
  return new NextRequest(`http://localhost${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

const storedEntry = {
  id: 'entry-1',
  email: 'ada@example.com',
  name: 'Ada',
  interests: ['security'],
  locale: 'de',
  createdAt: new Date('2026-07-29T08:00:00.000Z'),
};

describe('waitlist and newsletter persistence', () => {
  beforeEach(() => {
    mocks.limiterCheck.mockReset().mockResolvedValue({ success: true });
    mocks.upsert.mockReset().mockResolvedValue(storedEntry);
    mocks.count.mockReset().mockResolvedValue(7);
    vi.stubEnv('N8N_WAITLIST_WEBHOOK_URL', '');
    vi.stubEnv('N8N_WEBHOOK_URL', '');
    vi.stubEnv('N8N_NEWSLETTER_WEBHOOK_URL', '');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('returns the real persisted waitlist count without artificial offsets', async () => {
    const response = await postWaitlist(
      jsonRequest('/api/waitlist', {
        email: 'ADA@EXAMPLE.COM',
        name: 'Ada',
        interests: ['security'],
        locale: 'de',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      message: 'Anmeldung gespeichert.',
      position: 7,
    });
    expect(mocks.upsert).toHaveBeenCalledWith(
      expect.objectContaining({ where: { email: 'ada@example.com' } })
    );
    expect(mocks.count).toHaveBeenCalledWith({
      where: { createdAt: { lte: storedEntry.createdAt } },
    });
  });

  it('does not claim success when waitlist persistence fails', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    mocks.upsert.mockRejectedValueOnce(new Error('database unavailable'));

    const response = await postWaitlist(
      jsonRequest('/api/waitlist', {
        email: 'ada@example.com',
        name: 'Ada',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({ error: 'Registration could not be stored' });
    expect(body).not.toHaveProperty('success');
    expect(mocks.count).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('does not claim full success when a configured webhook rejects delivery', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubEnv('N8N_WAITLIST_WEBHOOK_URL', 'https://hooks.example/waitlist');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));

    const response = await postWaitlist(
      jsonRequest('/api/waitlist', {
        email: 'ada@example.com',
        name: 'Ada',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toEqual({
      error: 'Registration stored but confirmation delivery failed',
    });
    expect(body).not.toHaveProperty('success');
    expect(mocks.count).not.toHaveBeenCalled();
    error.mockRestore();
  });

  it('persists newsletter subscriptions before returning success', async () => {
    mocks.upsert.mockResolvedValueOnce({
      ...storedEntry,
      name: 'Newsletter subscriber',
      interests: ['newsletter'],
      locale: 'en',
    });

    const response = await postNewsletter(
      jsonRequest('/api/newsletter', {
        email: 'ADA@EXAMPLE.COM',
        locale: 'en',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      message: 'Subscription stored.',
    });
    expect(mocks.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { email: 'ada@example.com' },
        create: expect.objectContaining({ interests: ['newsletter'] }),
      })
    );
  });
});