// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import fixture from '../fixtures/finance-status-v2.json';

const mocks = vi.hoisted(() => ({ create: vi.fn(), findFirst: vi.fn() }));
vi.mock('@/lib/prisma', () => ({
  prisma: { websiteEvent: { create: mocks.create, findFirst: mocks.findFirst } },
}));

import { POST } from '@/app/api/bot/finance/status/route';
import { readBotStatus } from '@/lib/finance/bot-store';
import { checkExt, EXT_MAX_BYTES } from '@/lib/finance/ext';

const TOKEN = 'test-token-0123456789abcdef';
let ip = 0;
const req = (body: unknown, auth = `Bearer ${TOKEN}`) =>
  new NextRequest('http://localhost/api/bot/finance/status', {
    method: 'POST',
    headers: { authorization: auth, 'content-type': 'application/json', 'x-forwarded-for': `10.0.0.${++ip}` },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

describe('POST /api/bot/finance/status (contract v2)', () => {
  beforeEach(() => {
    process.env.FINANCE_BOT_TOKEN = TOKEN;
    mocks.create.mockReset().mockResolvedValue({});
    mocks.findFirst.mockReset();
  });

  it('stays backward compatible without ext', async () => {
    const res = await POST(req({ ref: 0.76, next_buy: 0.75, next_sell: 0.77, trades_today: 3, pnl: 0.1 }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.stored).toMatchObject({ ref: 0.76, next_buy: 0.75, next_sell: 0.77, trades_today: 3, pnl: 0.1 });
    expect(body.stored.ext).toBeUndefined();
    expect(mocks.create.mock.calls[0][0].data.payload.ext).toBeUndefined();
  });

  it('accepts and stores the real dry-run payload with ext', async () => {
    const res = await POST(req(fixture));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.stored.ext.v).toBe(1);
    expect(body.stored.ext.memes.ARMY.entry).toBeCloseTo(fixture.ext.memes.ARMY.entry);
    expect(mocks.create.mock.calls[0][0].data.payload.ext.core.levels.tier4.usd).toBe(20);
  });

  it('rejects ext without v (400)', async () => {
    const res = await POST(req({ ref: 1, ext: { mode: 'grid' } }));
    expect(res.status).toBe(400);
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it('rejects non-object ext (400)', async () => {
    expect((await POST(req({ ref: 1, ext: [1, 2] }))).status).toBe(400);
    expect((await POST(req({ ref: 1, ext: 'x' }))).status).toBe(400);
  });

  it('rejects ext over 16 KB (413)', async () => {
    const res = await POST(req({ ref: 1, ext: { v: 1, pad: 'x'.repeat(EXT_MAX_BYTES) } }));
    expect(res.status).toBe(413);
    expect((await res.json()).error).toBe('ext_too_large');
    expect(mocks.create).not.toHaveBeenCalled();
  });

  it('rejects ext containing an XRPL address', async () => {
    const res = await POST(req({ ref: 1, ext: { v: 1, w: 'rsVyytN8QTKBUc6r4Ga7Zznbmk4FKWi68F' } }));
    expect(res.status).toBe(400);
  });

  it('still requires the bearer token', async () => {
    expect((await POST(req(fixture, 'Bearer wrong'))).status).toBe(401);
  });

  it('readBotStatus returns ext and old fields', async () => {
    mocks.findFirst.mockResolvedValue({ createdAt: new Date(), payload: fixture });
    const s = await readBotStatus();
    expect(s?.ref).toBe(fixture.ref);
    expect(s?.ext?.v).toBe(1);
  });

  it('readBotStatus returns ext null for v1 rows', async () => {
    mocks.findFirst.mockResolvedValue({ createdAt: new Date(), payload: { ref: 1 } });
    expect((await readBotStatus())?.ext).toBeNull();
  });
});

describe('checkExt', () => {
  it('passes undefined as null', () => expect(checkExt(undefined)).toEqual({ ok: true, ext: null }));
  it('rejects non-finite numbers', () => expect(checkExt({ v: 1, x: Infinity }).ok).toBe(false));
});
