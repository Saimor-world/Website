import { prisma } from '@/lib/prisma';

export type BotStatus = {
  ref: number | null;
  next_buy: number | null;
  next_sell: number | null;
  trades_today: number | null;
  pnl: number | null;
  ts: string | null;
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
    return {
      ref: num('ref'),
      next_buy: num('next_buy'),
      next_sell: num('next_sell'),
      trades_today: num('trades_today'),
      pnl: num('pnl'),
      ts: typeof p.ts === 'string' ? p.ts : row.createdAt.toISOString(),
    };
  } catch {
    return null;
  }
}

export async function writeBotStatus(status: BotStatus): Promise<void> {
  await prisma.websiteEvent.create({
    data: {
      event: EVENT,
      path: '/api/bot/finance/status',
      payload: {
        ref: status.ref,
        next_buy: status.next_buy,
        next_sell: status.next_sell,
        trades_today: status.trades_today,
        pnl: status.pnl,
        ts: status.ts || new Date().toISOString(),
      },
    },
  });
}
