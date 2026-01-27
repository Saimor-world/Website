import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function fmtDate(value: Date | string | null | undefined) {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString('de-DE');
}

export default async function OwnerPage({ searchParams }: { searchParams: { q?: string } }) {
  const session = await getServerSession(authOptions);
  const query = searchParams.q?.trim().toLowerCase();

  if (!session?.user) {
    redirect('/owner/login?callbackUrl=/owner');
  }

  if (session.user.role !== 'owner') {
    return (
      <main className="min-h-screen bg-[#081410] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 space-y-6">
          <h1 className="text-3xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Owner Bereich
          </h1>
          <p className="text-white/70">
            Du bist angemeldet als <span className="text-white">{session.user.email}</span>, aber hast keine
            Owner-Rechte.
          </p>
          <div className="flex gap-3">
            <Link
              href="/de"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-saimor-gold"
            >
              Zur Website
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-saimor-gold"
            >
              Anderer Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  try {
    const whereClause = query ? {
      OR: [
        { email: { contains: query, mode: 'insensitive' } as any },
        { name: { contains: query, mode: 'insensitive' } as any }
      ]
    } : {};

    const [
      waitlistCount,
      contactCount,
      sessionCount,
      messageCount,
      waitlist,
      contacts,
      chatSessions,
      stats,
    ] = await Promise.all([
      prisma.waitlist.count(),
      prisma.contactMessage.count(),
      prisma.chatSession.count(),
      prisma.message.count(),
      prisma.waitlist.findMany({
        where: whereClause,
        take: 10,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.contactMessage.findMany({
        where: whereClause,
        take: 10,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.chatSession.findMany({ take: 10, orderBy: { lastActivity: 'desc' } }),
      prisma.dashboardStats.findFirst({ orderBy: { updatedAt: 'desc' } }),
    ]);

    return (
      <main className="min-h-screen bg-[#081410] text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 space-y-10">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.32em] text-saimor-gold">Owner</p>
              <h1 className="text-4xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Datenbank Übersicht
              </h1>
              <p className="text-white/70 text-sm">
                Eingeloggt als <span className="text-white">{session.user.email}</span>
              </p>
            </div>

            <form action="/owner" className="flex items-center gap-2">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Email oder Name suchen..."
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-saimor-gold min-w-[240px]"
              />
              <button type="submit" className="rounded-xl bg-saimor-gold/10 border border-saimor-gold/20 px-4 py-2 text-sm hover:bg-saimor-gold/20 text-saimor-gold">
                Suchen
              </button>
              {query && (
                <Link href="/owner" className="text-xs text-white/30 hover:text-white/60 ml-2 underline underline-offset-4">
                  Reset
                </Link>
              )}
            </form>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60 uppercase tracking-[0.28em]">Waitlist</p>
              <p className="mt-2 text-3xl font-semibold">{waitlistCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60 uppercase tracking-[0.28em]">Kontakt</p>
              <p className="mt-2 text-3xl font-semibold">{contactCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60 uppercase tracking-[0.28em]">Chat Sessions</p>
              <p className="mt-2 text-3xl font-semibold">{sessionCount}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60 uppercase tracking-[0.28em]">Messages</p>
              <p className="mt-2 text-3xl font-semibold">{messageCount}</p>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <h2 className="text-xl font-semibold">DashboardStats</h2>
              {stats ? (
                <div className="text-sm text-white/80 space-y-2">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">facts</span>
                    <span className="font-mono">{stats.facts}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">callsToday</span>
                    <span className="font-mono">{stats.callsToday}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">costsToday</span>
                    <span className="font-mono">{stats.costsToday.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">updatedAt</span>
                    <span className="font-mono">{fmtDate(stats.updatedAt)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-sm">Keine Stats gefunden (wird automatisch erstellt, sobald APIs laufen).</p>
              )}
              <div className="text-xs text-white/50">
                Tipp: Prisma Studio: <span className="font-mono">pnpm db:studio</span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <h2 className="text-xl font-semibold">Letzte Waitlist</h2>
              <div className="space-y-3 text-sm">
                {waitlist.length === 0 ? (
                  <p className="text-white/60">Noch keine Einträge.</p>
                ) : (
                  waitlist.map((row: any) => (
                    <div key={row.id} className="rounded-2xl border border-white/10 bg-black/10 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="truncate">
                          <div className="text-white font-medium truncate">{row.name}</div>
                          <div className="text-white/60 font-mono text-xs truncate">{row.email}</div>
                        </div>
                        <div className="text-white/50 text-xs font-mono">{fmtDate(row.createdAt)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <h2 className="text-xl font-semibold">Letzte Kontakte</h2>
              <div className="space-y-3 text-sm">
                {contacts.length === 0 ? (
                  <p className="text-white/60">Noch keine Nachrichten.</p>
                ) : (
                  contacts.map((row: any) => (
                    <div key={row.id} className="rounded-2xl border border-white/10 bg-black/10 p-3 space-y-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="truncate">
                          <div className="text-white font-medium truncate">{row.name}</div>
                          <div className="text-white/60 font-mono text-xs truncate">{row.email}</div>
                        </div>
                        <div className="text-white/50 text-xs font-mono">{fmtDate(row.createdAt)}</div>
                      </div>
                      <div className="text-white/75 text-xs">
                        {row.message.length > 120 ? `${row.message.slice(0, 120)}...` : row.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
            <h2 className="text-xl font-semibold">Letzte Chat Sessions</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {chatSessions.length === 0 ? (
                <p className="text-white/60">Noch keine Sessions.</p>
              ) : (
                chatSessions.map((row: any) => (
                  <Link
                    key={row.id}
                    href={`/owner/chat/${row.id}`}
                    className="group rounded-2xl border border-white/10 bg-black/10 p-4 space-y-1 hover:border-saimor-gold hover:bg-white/5 transition-all block"
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-xs text-white/50 uppercase tracking-[0.22em] group-hover:text-saimor-gold transition-colors">externalId</div>
                      <div className="text-[10px] text-white/30 font-mono">DETAIL →</div>
                    </div>
                    <div className="font-mono text-sm text-white truncate">{row.externalId}</div>
                    <div className="text-xs text-white/60">lastActivity: {fmtDate(row.lastActivity)}</div>
                    <div className="text-xs text-white/60">userId: {row.userId || '-'}</div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    );
  } catch (err) {
    return (
      <main className="min-h-screen bg-[#081410] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 space-y-6">
          <h1 className="text-3xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Owner Bereich
          </h1>
          <p className="text-white/70">
            Datenbank ist nicht erreichbar. Starte Postgres (Docker) und setze <span className="font-mono">DATABASE_URL</span>.
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60 font-mono">
            {String(err)}
          </div>
          <div className="flex gap-3">
            <Link
              href="/docs"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-saimor-gold"
            >
              Setup Guide
            </Link>
            <Link
              href="/de"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-saimor-gold"
            >
              Zur Website
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
