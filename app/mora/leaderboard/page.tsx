import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'MÔRA-Fänger · SAIMÔR',
  description: 'Wer MÔRA im .xyz-Universum gefangen hat.',
  alternates: { canonical: '/mora/leaderboard' },
};

type Row = { id: string; origin: string; caughtAt: Date; name: string | null; note: string | null };

const fmt = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', dateStyle: 'medium', timeStyle: 'short' });
const hour = (d: Date) => Number(new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', hourCycle: 'h23' }).format(d));

function badges(rows: Row[]) {
  const seen = new Set<string>();
  return rows.map((r, i) => {
    const b: { k: string; t: string }[] = [];
    if (i === 0) b.push({ k: '✦', t: 'Erste Fängerin / erster Fänger überhaupt' });
    if (!seen.has(r.origin)) { seen.add(r.origin); b.push({ k: '◎', t: `Domain-Pionier: erster Fang auf ${r.origin}` }); }
    const h = hour(r.caughtAt);
    if (h >= 22 || h < 5) b.push({ k: '☾', t: 'Nachtfang (22–5 Uhr)' });
    if (i < 10) b.push({ k: '10', t: 'Unter den ersten zehn' });
    if (r.origin === 'saimor.world/xyz') b.push({ k: '⌂', t: 'Im Portfolio gefangen' });
    return b;
  });
}

export default async function MoraLeaderboard({ searchParams }: { searchParams: Promise<{ test?: string }> }) {
  const sp = await searchParams;
  const test = sp?.test === '1';
  let rows: Row[] = [];
  try {
    rows = await prisma.moraCatch.findMany({
      where: { status: 'visible', test },
      orderBy: { caughtAt: 'asc' },
      take: 500,
      select: { id: true, origin: true, caughtAt: true, name: true, note: true },
    });
  } catch (e) {
    console.error('[mora leaderboard]', e);
  }
  const bs = badges(rows);
  return (
    <main className="min-h-screen bg-[#0b0d10] text-[#e9e4d8] px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-[#b9a77a]">SAIMÔR · .xyz-Universum{test ? ' · Testmodus' : ''}</p>
        <h1 className="mt-3 text-4xl font-light">MÔRA-Fänger</h1>
        <p className="mt-4 text-[#c9c3b5] max-w-xl">
          MÔRA fliegt nur selten und zufällig durch die Seiten des <Link className="underline" href="/xyz">.xyz-Universums</Link>.
          Wer sie fängt, darf sich hier eintragen. Freiwillig, ohne E-Mail.
        </p>
        {rows.length === 0 ? (
          <p className="mt-12 text-[#9a9486]">Noch niemand. Die Liste wartet auf den ersten Fang.</p>
        ) : (
          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {rows.map((r, i) => (
              <li key={r.id} className="grid grid-cols-[3rem_1fr] gap-3 py-4">
                <span className="text-2xl font-light text-[#b9a77a] tabular-nums">{i + 1}</span>
                <div>
                  <p className="font-medium">{r.name}
                    <span className="ml-2 text-sm text-[#9a9486]">{r.origin} · <time dateTime={r.caughtAt.toISOString()}>{fmt.format(r.caughtAt)}</time></span>
                  </p>
                  {r.note ? <p className="mt-1 text-[#c9c3b5]">{r.note}</p> : null}
                  {bs[i].length ? (
                    <ul className="mt-2 flex flex-wrap gap-2" aria-label="Errungenschaften">
                      {bs[i].map((b) => (
                        <li key={b.t} title={b.t} className="rounded-full border border-[#b9a77a]/40 px-2 py-0.5 text-xs text-[#d9c9a0]">
                          <span aria-hidden="true">{b.k}</span> <span>{b.t}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-10 text-sm text-[#9a9486]">Einträge werden automatisch geprüft; Links und Beleidigungen landen nicht auf der Liste. <Link className="underline" href="/de/rechtliches/datenschutz#mora-faenger">Datenschutz</Link></p>
      </div>
    </main>
  );
}
