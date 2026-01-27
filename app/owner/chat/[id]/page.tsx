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

export default async function OwnerChatSessionPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/owner/login?callbackUrl=/owner/chat/${encodeURIComponent(params.id)}`);
  }

  if (session.user.role !== 'owner') {
    redirect('/owner');
  }

  const chatSession = await prisma.chatSession.findUnique({
    where: { id: params.id },
    include: { messages: { orderBy: { timestamp: 'asc' } } },
  });

  if (!chatSession) {
    return (
      <main className="min-h-screen bg-[#081410] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 space-y-6">
          <h1 className="text-3xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Session nicht gefunden
          </h1>
          <p className="text-white/70">Keine ChatSession mit ID: <span className="font-mono">{params.id}</span></p>
          <Link
            href="/owner"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-saimor-gold"
          >
            Zurück zur Übersicht
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#081410] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12 space-y-8">
        <header className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-saimor-gold">Owner · Chat</p>
              <h1 className="text-3xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Chat Session
              </h1>
            </div>
            <Link
              href="/owner"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-saimor-gold"
            >
              Zur Übersicht
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm space-y-2">
              <div className="flex justify-between gap-4">
                <span className="text-white/50">externalId</span>
                <span className="font-mono text-white truncate">{chatSession.externalId}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/50">userId</span>
                <span className="font-mono text-white truncate">{chatSession.userId || '-'}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/50">createdAt</span>
                <span className="font-mono text-white">{fmtDate(chatSession.createdAt)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/50">lastActivity</span>
                <span className="font-mono text-white">{fmtDate(chatSession.lastActivity)}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm space-y-2">
              <div className="flex justify-between gap-4">
                <span className="text-white/50">messages</span>
                <span className="font-mono text-white">{chatSession.messages.length}</span>
              </div>
              <div className="text-xs text-white/50">
                Tipp: Für Vollzugriff auf Tabellen nutze Prisma Studio: <span className="font-mono">pnpm db:studio</span>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-3">
          {chatSession.messages.length === 0 ? (
            <p className="text-white/60">Noch keine Messages.</p>
          ) : (
            chatSession.messages.map((m) => (
              <article
                key={m.id}
                className={[
                  'rounded-2xl border p-4',
                  m.role === 'assistant'
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-white/10 bg-black/10',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs uppercase tracking-[0.28em] text-white/50">
                    {m.role}
                  </div>
                  <div className="text-[11px] text-white/40 font-mono">{fmtDate(m.timestamp)}</div>
                </div>
                <pre className="mt-3 whitespace-pre-wrap text-sm text-white/80 leading-relaxed font-sans">
                  {m.content}
                </pre>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

