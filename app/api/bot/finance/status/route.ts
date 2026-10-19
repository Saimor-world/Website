import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getClientIP, rateLimit } from '@/lib/rate-limit';
import { writeBotStatus } from '@/lib/finance/bot-store';
import { checkExt } from '@/lib/finance/ext';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const botStatusLimiter = rateLimit({
  interval: 60 * 1000,
  limit: parseInt(process.env.RATE_LIMIT_FINANCE_BOT || '30', 10),
});

function bearerOk(header: string | null, expected: string): boolean {
  if (!header || !expected) return false;
  const m = /^Bearer\s+(.+)$/i.exec(header.trim());
  if (!m) return false;
  const got = Buffer.from(m[1]);
  const exp = Buffer.from(expected);
  if (got.length !== exp.length) return false;
  try {
    return timingSafeEqual(got, exp);
  } catch {
    return false;
  }
}

function numOrNull(v: unknown): number | null {
  if (v == null) return null;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

/**
 * Read-only observation push from the trading bot.
 * Does not accept trade commands. No seeds. Auth = Bearer FINANCE_BOT_TOKEN.
 */
export async function POST(req: NextRequest) {
  const token = (process.env.FINANCE_BOT_TOKEN || '').trim();
  if (!token) {
    return NextResponse.json({ error: 'missing_env', message: 'FINANCE_BOT_TOKEN unset' }, { status: 503 });
  }
  if (!bearerOk(req.headers.get('authorization'), token)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const ip = getClientIP(req);
  const rl = await botStatusLimiter.check(req, `finance-bot-status:${ip}`);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'rate_limited', reset: rl.reset.toISOString() },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.reset.getTime() - Date.now()) / 1000)) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const status = {
    ref: numOrNull(body.ref),
    next_buy: numOrNull(body.next_buy),
    next_sell: numOrNull(body.next_sell),
    trades_today: numOrNull(body.trades_today),
    pnl: numOrNull(body.pnl),
    ts: typeof body.ts === 'string' ? body.ts : new Date().toISOString(),
  };

  // Contract v2: optional ext (≤16 KB, needs v). Old fields unchanged.
  const extCheck = checkExt(body.ext);
  if (!extCheck.ok) {
    return NextResponse.json({ error: extCheck.error, message: extCheck.message }, { status: extCheck.status });
  }

  if (status.ref == null && status.next_buy == null && status.next_sell == null) {
    return NextResponse.json(
      { error: 'validation', message: 'need at least one of ref, next_buy, next_sell' },
      { status: 400 },
    );
  }

  try {
    const stored = extCheck.ext ? { ...status, ext: extCheck.ext } : status;
    await writeBotStatus(stored);
    return NextResponse.json({ ok: true, stored });
  } catch (e: any) {
    return NextResponse.json({ error: 'store_failed', message: String(e?.message || e) }, { status: 500 });
  }
}
