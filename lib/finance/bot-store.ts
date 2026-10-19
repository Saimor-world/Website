import { prisma } from '@/lib/prisma';
import type { FinanceExt } from '@/lib/finance/ext';

export type BotStatus = {
  ref: number | null;
  next_buy: number | null;
  next_sell: number | null;
  trades_today: number | null;
  pnl: number | null;
  ts: string | null;
  /** Contract v2 — optional, null when the bot sent none. */
  ext?: FinanceExt | null;
};

const EVENT = 'finance_bot_status';

/** Latest bot status push (read-only observation). Fail-open → null. */
export async function readBotStatus(): Promise<BotStatus | null> {
  try {
    const row = await prisma.websiteEvent.findFirst({
      where: { event: EVENT },
      orderBy: { createdAt: 'desc' },
    });
    if (!row?.payload || typeof row.payload !== 'object') return null;
    const p = row.payload as Record<string, unknown>;
    const num = (k: string) =>
      typeof p[k] === 'number' && Number.isFinite(p[k] as number) ? (p[k] as number) : null;
    const ext =
      p.ext && typeof p.ext === 'object' && !Array.isArray(p.ext) && typeof (p.ext as any).v === 'number'
        ? (p.ext as FinanceExt)
        : null;
    return {
      ref: num('ref'),
      next_buy: num('next_buy'),
      next_sell: num('next_sell'),
      trades_today: num('trades_today'),
      pnl: num('pnl'),
      ts: typeof p.ts === 'string' ? p.ts : row.createdAt.toISOString(),
      ext,
    };
  } catch {
    return null;
  }
}

export async function writeBotStatus(status: BotStatus): Promise<void> {
  const payload: Record<string, unknown> = {
    ref: status.ref,
    next_buy: status.next_buy,
    next_sell: status.next_sell,
    trades_today: status.trades_today,
    pnl: status.pnl,
    ts: status.ts || new Date().toISOString(),
  };
  if (status.ext) payload.ext = status.ext;
  await prisma.websiteEvent.create({
    data: { event: EVENT, path: '/api/bot/finance/status', payload: payload as any },
  });
}
