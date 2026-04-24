import Link from 'next/link';
import { Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Besucher-Wall | Saimor',
  description: 'Unternehmen die ihren kostenlosen Security-Audit gemacht haben.',
};

type WallEntry = {
  id: string;
  name: string;
  company: string | null;
  tag: string | null;
  domain: string | null;
  score: number;
  createdAt: string;
};

function scoreMeta(score: number) {
  if (score >= 80) return { label: 'Sicher', color: '#34d399', border: 'border-emerald-500/25', bg: 'bg-emerald-500/[0.07]', ring: 'rgba(52,211,153,0.15)' };
  if (score >= 50) return { label: 'Mittel', color: '#fbbf24', border: 'border-amber-500/25', bg: 'bg-amber-500/[0.07]', ring: 'rgba(251,191,36,0.15)' };
  return { label: 'Kritisch', color: '#f87171', border: 'border-red-500/25', bg: 'bg-red-500/[0.07]', ring: 'rgba(248,113,113,0.15)' };
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 2) return 'gerade eben';
  if (mins < 60) return `vor ${mins} Min.`;
  if (hrs < 24) return `vor ${hrs} Std.`;
  if (days === 1) return 'gestern';
  return new Date(dateStr).toLocaleDateString('de-DE', { day: 'numeric', month: 'short' });
}

async function getEntries(): Promise<WallEntry[]> {
  try {
    const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/wall`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries ?? [];
  } catch {
    return [];
  }
}

export default async function WallPage() {
  const entries = await getEntries();

  // Stats
  const total = entries.length;
  const avg = total > 0 ? Math.round(entries.reduce((s, e) => s + e.score, 0) / total) : 0;
  const safe = entries.filter((e) => e.score >= 80).length;
  const safePercent = total > 0 ? Math.round((safe / total) * 100) : 0;

  // Top score entry
  const topEntry = [...entries].sort((a, b) => b.score - a.score)[0] ?? null;
  const recentEntries = [...entries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 50);

  return (
    <main className="min-h-screen bg-[#060d0b] text-white px-6 py-20">
      <div className="mx-auto max-w-6xl space-y-16">

        {/* ─── Header ─────────────────────────────────────────────────────── */}
        <header className="space-y-6 text-center max-w-2xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.38em] text-emerald-300/55">Saimor</p>
          <h1 className="text-5xl sm:text-6xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Besucher-Wall
          </h1>
          <p className="text-sm leading-7 text-white/50">
            Unternehmen die ihren kostenlosen Instant Security-Audit gemacht haben.
            Jeder Eintrag ist freiwillig — kein Name, keine E-Mail, nur Score und Branche.
          </p>
          <Link
            href="/de/einstieg/security-check"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black hover:bg-emerald-300 transition-colors"
          >
            <Shield size={15} />
            Eigenen Audit starten
          </Link>
        </header>

        {/* ─── Stats Bar ──────────────────────────────────────────────────── */}
        {total > 0 && (
          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-emerald-300/70">
                <Users size={14} />
                <span className="text-[10px] uppercase tracking-[0.22em]">Audits gesamt</span>
              </div>
              <p className="text-4xl font-light tabular-nums">{total}</p>
            </div>
            <div className="text-center space-y-1 border-x border-white/10">
              <div className="flex items-center justify-center gap-2 text-emerald-300/70">
                <TrendingUp size={14} />
                <span className="text-[10px] uppercase tracking-[0.22em]">Ø Score</span>
              </div>
              <p className="text-4xl font-light tabular-nums" style={{ color: avg >= 80 ? '#34d399' : avg >= 50 ? '#fbbf24' : '#f87171' }}>
                {avg}
              </p>
            </div>
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-emerald-300/70">
                <CheckCircle size={14} />
                <span className="text-[10px] uppercase tracking-[0.22em]">Score ≥ 80</span>
              </div>
              <p className="text-4xl font-light tabular-nums text-emerald-400">{safePercent}%</p>
            </div>
          </div>
        )}

        {/* ─── Empty State ─────────────────────────────────────────────────── */}
        {total === 0 && (
          <div className="rounded-3xl border border-dashed border-white/10 py-28 text-center space-y-4">
            <Shield size={32} className="text-white/15 mx-auto" />
            <p className="text-white/30 text-sm">Noch keine Einträge — sei der Erste auf der Wall.</p>
            <Link href="/de/einstieg/security-check" className="inline-flex items-center gap-2 text-emerald-400/70 text-sm hover:text-emerald-300 transition-colors">
              Jetzt Audit starten →
            </Link>
          </div>
        )}

        {/* ─── Featured + Grid ─────────────────────────────────────────────── */}
        {total > 0 && (
          <div className="space-y-10">

            {/* Featured top scorer */}
            {topEntry && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/30 mb-4">Höchster Score</p>
                <FeaturedCard entry={topEntry} />
              </div>
            )}

            {/* All entries grid */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/30 mb-4">
                Alle Einträge — {total} {total === 1 ? 'Unternehmen' : 'Unternehmen'}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recentEntries.map((entry) => (
                  <WallCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── Footer CTA ──────────────────────────────────────────────────── */}
        <div className="text-center space-y-4 pt-8 border-t border-white/10">
          <p className="text-sm text-white/35">Dein Eintrag fehlt noch?</p>
          <Link
            href="/de/einstieg/security-check"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm text-white/60 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            Jetzt Audit machen und auf die Wall
          </Link>
        </div>
      </div>
    </main>
  );
}

// ─── Card Components ──────────────────────────────────────────────────────────

function FeaturedCard({ entry }: { entry: WallEntry }) {
  const meta = scoreMeta(entry.score);
  const ini = initials(entry.name);

  return (
    <div className={`relative rounded-2xl border ${meta.border} ${meta.bg} p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 overflow-hidden`}>
      {/* Glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 10% 50%, ${meta.ring} 0%, transparent 60%)` }}
      />

      {/* Avatar */}
      <div className="relative shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-sm font-bold text-white/60">
        {ini}
        <div
          className="absolute -inset-0.5 rounded-2xl opacity-40"
          style={{ background: `radial-gradient(circle at 30% 30%, ${meta.color}30, transparent 70%)` }}
        />
      </div>

      {/* Info */}
      <div className="relative flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-lg font-medium text-white">{entry.name}</p>
          {entry.company && <p className="text-sm text-white/45">{entry.company}</p>}
        </div>
        {entry.domain && <p className="font-mono text-[11px] text-white/35">{entry.domain}</p>}
        {entry.tag && (
          <span className="inline-block text-[10px] uppercase tracking-[0.18em] border border-white/15 rounded-full px-2.5 py-0.5 text-white/40">
            {entry.tag}
          </span>
        )}
      </div>

      {/* Score */}
      <div className="relative shrink-0 text-right">
        <p className="text-5xl font-bold tabular-nums" style={{ color: meta.color }}>{entry.score}</p>
        <p className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: meta.color, opacity: 0.7 }}>{meta.label}</p>
        <p className="text-[9px] text-white/20 font-mono mt-2">{timeAgo(entry.createdAt)}</p>
      </div>
    </div>
  );
}

function WallCard({ entry }: { entry: WallEntry }) {
  const meta = scoreMeta(entry.score);
  const ini = initials(entry.name);

  return (
    <article
      id={entry.id}
      className={`group relative rounded-2xl border ${meta.border} bg-white/[0.025] p-5 space-y-4 hover:bg-white/[0.05] transition-all`}
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] text-xs font-bold text-white/55">
          {ini}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{entry.name}</p>
          {entry.company && <p className="truncate text-[11px] text-white/38">{entry.company}</p>}
        </div>
      </div>

      {/* Domain */}
      {entry.domain && (
        <p className="truncate font-mono text-[10px] text-white/28">{entry.domain}</p>
      )}

      {/* Score + tag */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
          style={{ borderColor: `${meta.color}40`, background: `${meta.color}12`, color: meta.color }}
        >
          {entry.score} · {meta.label}
        </span>
        {entry.tag && (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/38">
            {entry.tag}
          </span>
        )}
      </div>

      {/* Date */}
      <p className="text-[9px] text-white/20 font-mono">{timeAgo(entry.createdAt)}</p>
    </article>
  );
}
