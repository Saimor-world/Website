import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIP, rateLimit } from '@/lib/rate-limit';
import { MORA_ORIGINS, ipHash, issueTicket } from '@/lib/mora-catch';

export const dynamic = 'force-dynamic';
const catchLimiter = rateLimit({ interval: 60 * 60 * 1000, limit: 12 });

// Top-level navigation from the MÔRA catch (no CORS needed): records the catch,
// issues a signed one-time ticket and forwards to the demo at /xyz/mora.
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const tok = q.get('c') || '';
  const from = (q.get('from') || '').toLowerCase();
  const test = q.get('t') === '1';
  const dur = Number(q.get('dur'));
  const origin = MORA_ORIGINS.includes(from) ? from : 'saimor.world/xyz';
  const frag = new URLSearchParams();
  frag.set('c', tok);
  if (origin !== 'saimor.world/xyz') frag.set('from', origin);
  if (test) { frag.set('t', '1'); if (dur >= 5 && dur <= 213) frag.set('dur', String(Math.round(dur))); }

  const ts = Number(tok.split('.')[1]);
  const fresh = /^[a-z0-9]{4,80}\.\d{13}$/i.test(tok) && Math.abs(Date.now() - ts) < 10 * 60 * 1000;
  if (fresh) frag.set('at', String(ts)); // catch moment: the 3:33 run is timed from here
  try {
    const ip = getClientIP(req);
    const lim = await catchLimiter.check(req, 'mora-catch:' + ip);
    if (fresh && lim.success) {
      const h = ipHash(ip);
      const recent = await prisma.moraCatch.count({ where: { ipHash: h, caughtAt: { gt: new Date(Date.now() - 3600e3) } } });
      if (recent < 12) {
        const { id, ticket } = issueTicket(test);
        await prisma.moraCatch.create({ data: { ticketId: id, origin, ipHash: h, test } });
        frag.set('k', ticket);
      }
    }
  } catch (e) {
    console.error('[mora catch]', e);
  }
  const res = NextResponse.redirect(new URL('/xyz/mora#' + frag.toString(), 'https://www.saimor.world'), 303);
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('Referrer-Policy', 'no-referrer');
  return res;
}
