import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function authed(req: NextRequest): boolean {
  const s = process.env.MORA_ADMIN_SECRET || '';
  const g = req.headers.get('x-mora-admin') || '';
  return s.length >= 24 && g.length === s.length && timingSafeEqual(Buffer.from(g), Buffer.from(s));
}

// GET: list entries (incl. pending/hidden/test). POST {id, action: hide|show|delete}.
export async function GET(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const rows = await prisma.moraCatch.findMany({
    where: { status: { not: 'ticket' } }, orderBy: { caughtAt: 'asc' },
    select: { id: true, origin: true, caughtAt: true, name: true, note: true, status: true, test: true },
  });
  return NextResponse.json({ rows });
}

export async function POST(req: NextRequest) {
  if (!authed(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  const id = typeof b.id === 'string' ? b.id : '';
  if (b.action === 'purge-test') {
    const r = await prisma.moraCatch.deleteMany({ where: { test: true } });
    return NextResponse.json({ ok: true, deleted: r.count });
  }
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  if (b.action === 'delete') await prisma.moraCatch.delete({ where: { id } });
  else if (b.action === 'hide' || b.action === 'show')
    await prisma.moraCatch.update({ where: { id }, data: { status: b.action === 'hide' ? 'hidden' : 'visible' } });
  else return NextResponse.json({ error: 'unknown action' }, { status: 400 });
  return NextResponse.json({ ok: true });
}
