import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIP, rateLimit } from '@/lib/rate-limit';
import { clean, needsReview, verifyTicket } from '@/lib/mora-catch';

export const dynamic = 'force-dynamic';
const entryLimiter = rateLimit({ interval: 10 * 60 * 1000, limit: 6 });

export async function POST(req: NextRequest) {
  const lim = await entryLimiter.check(req, 'mora-entry:' + getClientIP(req));
  if (!lim.success) return NextResponse.json({ error: 'Zu viele Versuche. Bitte später.' }, { status: 429 });
  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const name = clean(typeof body.name === 'string' ? body.name : '', 32);
  const note = clean(typeof body.note === 'string' ? body.note : '', 140);
  const t = verifyTicket(typeof body.ticket === 'string' ? body.ticket : '');
  if (!t) return NextResponse.json({ error: 'Dein Fang-Ticket ist ungültig oder abgelaufen.' }, { status: 403 });
  if (!name) return NextResponse.json({ error: 'Bitte gib einen Namen an.' }, { status: 400 });
  const status = needsReview(name + ' ' + note) ? 'pending' : 'visible';
  try {
    const r = await prisma.moraCatch.updateMany({
      where: { ticketId: t.id, status: 'ticket' },
      data: { name, note: note || null, status, enteredAt: new Date() },
    });
    if (r.count !== 1) return NextResponse.json({ error: 'Dieser Fang ist schon eingetragen.' }, { status: 409 });
    const row = await prisma.moraCatch.findUnique({ where: { ticketId: t.id } });
    let rank: number | null = null;
    if (row && status === 'visible') {
      rank = 1 + (await prisma.moraCatch.count({ where: { status: 'visible', test: row.test, caughtAt: { lt: row.caughtAt } } }));
    }
    return NextResponse.json({ ok: true, status, rank, test: t.test });
  } catch (e) {
    console.error('[mora entry]', e);
    return NextResponse.json({ error: 'Gerade nicht möglich.' }, { status: 500 });
  }
}
