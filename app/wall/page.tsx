import Link from 'next/link';
import { Shield, Trophy, Star, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Security Wall | Saimor',
  description: 'Echte Audits von echten Unternehmen. Die sichersten digitalen Präsenzen im Saimor Universum.',
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
  if (score >= 80)
    return {
      label: 'Sicher',
      labelEn: 'Secure',
      ringColor: '#34d399',
      glowColor: 'rgba(52,211,153,0.35)',
      bgColor: 'rgba(52,211,153,0.08)',
      borderColor: 'rgba(52,211,153,0.25)',
      emoji: '🛡️',
    };
  if (score >= 50)
    return {
      label: 'Mittel',
      labelEn: 'Medium',
      ringColor: '#fbbf24',
      glowColor: 'rgba(251,191,36,0.35)',
      bgColor: 'rgba(251,191,36,0.08)',
      borderColor: 'rgba(251,191,36,0.25)',
      emoji: '⚠️',
    };
  return {
    label: 'Risiko',
    labelEn: 'Risk',
    ringColor: '#f87171',
    glowColor: 'rgba(248,113,113,0.35)',
    bgColor: 'rgba(248,113,113,0.08)',
    borderColor: 'rgba(248,113,113,0.25)',
    emoji: '🚨',
  };
}

async function getEntries(): Promise<WallEntry[]> {
  try {
    const base = process.env.NEXTAUTH_URL || 'http://localhost:3001';
    const res = await fetch(`${base}/api/wall`, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries ?? [];
  } catch {
    return [];
  }
}

export default async function WallPage() {
  const entries = await getEntries();
  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);
  const isEmpty = entries.length === 0;

  return (
    <main className="min-h-screen bg-[#070c0a] text-white overflow-x-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(52,211,153,0.12) 0%, transparent 70%)' }} className="absolute inset-0" />
        <div style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(56,189,248,0.07) 0%, transparent 60%)' }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28">

        {/* ── Header ───────────────────────────────────────── */}
        <div className="text-center mb-20 space-y-5">
          <p className="text-[10px] uppercase tracking-[0.55em] text-emerald-400/70 font-bold">
            Community Leaderboard
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Security <span className="italic text-emerald-400">Wall</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Echte Audits. Echte Ergebnisse. Jede Domain, die hier erscheint, hat einen vollständigen
            passiven Sicherheits-Scan durchlaufen.
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-10 pt-4">
            {[
              { value: entries.length.toString(), label: 'Audits' },
              { value: sorted.length > 0 ? String(Math.round(sorted.reduce((s, e) => s + e.score, 0) / sorted.length)) : '—', label: 'Ø Score' },
              { value: sorted.filter(e => e.score >= 80).length.toString(), label: 'Grüne Zonen' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-light tabular-nums text-white/90">{stat.value}</div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/25 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Empty State ───────────────────────────────────── */}
        {isEmpty && (
          <div className="flex flex-col items-center text-center py-24 space-y-8">
            <div className="w-24 h-24 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center text-4xl">
              🏆
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Die Wall wartet auf ihren ersten Eintrag
              </h2>
              <p className="text-white/35 text-sm max-w-sm mx-auto">
                Starte deinen kostenlosen Security-Audit und werde das erste Unternehmen auf der Wall.
              </p>
            </div>
            <Link
              href="/de/einstieg/security-check"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-emerald-300 transition-all"
            >
              <Shield size={16} />
              Jetzt Audit starten
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* ── Podium (Top 3) ───────────────────────────────── */}
        {top3.length > 0 && (
          <div className="mb-24">
            <p className="text-center text-[9px] uppercase tracking-[0.4em] text-white/20 mb-12">Top Performer</p>
            <div className="flex flex-wrap justify-center items-end gap-4 md:gap-8">
              {/* Silver — 2nd */}
              {top3[1] && (
                <PodiumCard entry={top3[1]} rank={2} heightClass="h-44 md:h-52" />
              )}
              {/* Gold — 1st */}
              {top3[0] && (
                <PodiumCard entry={top3[0]} rank={1} heightClass="h-56 md:h-64" gold />
              )}
              {/* Bronze — 3rd */}
              {top3[2] && (
                <PodiumCard entry={top3[2]} rank={3} heightClass="h-36 md:h-44" />
              )}
            </div>
          </div>
        )}

        {/* ── Score Legend ─────────────────────────────────── */}
        {!isEmpty && (
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {[
              { range: '80–100', label: 'Sicher', color: '#34d399' },
              { range: '50–79', label: 'Mittel', color: '#fbbf24' },
              { range: '0–49', label: 'Risiko', color: '#f87171' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  {item.range} — {item.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* ── Rest Grid (Polaroid Cards) ───────────────────── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
            {rest.map((entry, i) => (
              <ScoreCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        )}

        {/* ── CTA ─────────────────────────────────────────── */}
        <div className="mt-28 text-center space-y-6">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-sm text-white/30">
              {isEmpty
                ? 'Sei das erste Unternehmen auf der Wall.'
                : 'Bereit, deinen Platz auf der Wall zu sichern?'}
            </p>
            <Link
              href="/de/einstieg/security-check"
              className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-emerald-300 transition-all hover:scale-105 active:scale-95"
            >
              <Shield size={18} />
              Kostenloser Audit — Jetzt starten
            </Link>
            <p className="text-[10px] text-white/20 italic">
              Alle Berichte werden anonymisiert. Kein Login erforderlich.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Podium Card ─────────────────────────────────────────────────────────────
type PodiumCardProps = {
  entry: WallEntry;
  rank: number;
  heightClass: string;
  gold?: boolean;
};

function PodiumCard({ entry, rank, heightClass, gold }: PodiumCardProps) {
  const meta = scoreMeta(entry.score);
  const rankColors = ['', '#f5c542', '#b0bec5', '#c8874b'];
  const rankLabels = ['', '🥇', '🥈', '🥉'];
  const ringSize = 528;

  return (
    <div className="flex flex-col items-center group" style={{ width: gold ? '168px' : '140px' }}>
      {/* Score ring */}
      <div
        className="relative flex items-center justify-center mb-4"
        style={{
          width: gold ? 96 : 80,
          height: gold ? 96 : 80,
          filter: gold ? `drop-shadow(0 0 20px ${meta.glowColor})` : undefined,
        }}
      >
        <svg
          style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
          viewBox="0 0 64 64"
        >
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={meta.ringColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - entry.score / 100)}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-light tabular-nums"
            style={{ fontSize: gold ? 22 : 18, color: meta.ringColor }}
          >
            {entry.score}
          </span>
        </div>
      </div>

      {/* Rank badge */}
      <div className="text-xl mb-3">{rankLabels[rank]}</div>

      {/* Podium column */}
      <div
        className={`w-full ${heightClass} rounded-t-2xl flex flex-col items-center justify-end pb-4 px-3 text-center transition-all group-hover:brightness-110`}
        style={{
          background: gold
            ? 'linear-gradient(180deg, rgba(245,197,66,0.18) 0%, rgba(245,197,66,0.06) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          border: `1px solid ${gold ? 'rgba(245,197,66,0.3)' : 'rgba(255,255,255,0.08)'}`,
          borderBottom: 'none',
        }}
      >
        <p className="text-xs font-bold truncate w-full" style={{ color: 'rgba(255,255,255,0.9)' }}>
          {entry.name}
        </p>
        {entry.company && (
          <p className="text-[10px] text-white/35 truncate w-full mt-0.5">{entry.company}</p>
        )}
        <span
          className="mt-2 text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-0.5 rounded-full"
          style={{
            background: meta.bgColor,
            color: meta.ringColor,
            border: `1px solid ${meta.borderColor}`,
          }}
        >
          {meta.label}
        </span>
      </div>
    </div>
  );
}

// ── Score Card (Polaroid-style) ──────────────────────────────────────────────
const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3'];

type ScoreCardProps = { entry: WallEntry; index: number };

function ScoreCard({ entry, index }: ScoreCardProps) {
  const meta = scoreMeta(entry.score);
  const rotation = rotations[index % rotations.length];
  const date = new Date(entry.createdAt).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  return (
    <div className={`relative group transition-all duration-300 hover:scale-105 hover:z-10 ${rotation} hover:rotate-0`}>
      {/* Pin */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 w-3 h-3 rounded-full"
        style={{
          background: meta.ringColor,
          boxShadow: `0 0 10px ${meta.glowColor}`,
        }}
      />

      {/* Card */}
      <div className="bg-[#f5f5f0] p-3 pb-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-sm">
        {/* Score visual */}
        <div
          className="aspect-square flex flex-col items-center justify-center relative overflow-hidden rounded-sm mb-2"
          style={{ background: '#111', minHeight: 80 }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at center, ${meta.ringColor} 0%, transparent 65%)`,
            }}
          />
          {/* Score number */}
          <span
            className="relative z-10 text-3xl md:text-4xl font-light tabular-nums"
            style={{ color: meta.ringColor, textShadow: `0 0 20px ${meta.glowColor}` }}
          >
            {entry.score}
          </span>
          {/* Label */}
          <span
            className="relative z-10 text-[8px] uppercase tracking-[0.2em] mt-1"
            style={{ color: meta.ringColor, opacity: 0.7 }}
          >
            {meta.label}
          </span>
          {/* Emoji */}
          <span className="absolute bottom-1.5 right-2 text-sm opacity-60">{meta.emoji}</span>
        </div>

        {/* Name & date */}
        <div className="space-y-0.5 px-0.5">
          <p className="text-black/80 text-[11px] font-bold truncate leading-tight">{entry.name}</p>
          <div className="flex justify-between items-center">
            <span className="text-black/35 text-[8px] font-mono uppercase tracking-wide truncate max-w-[60%]">
              {entry.tag || entry.company || 'Audit'}
            </span>
            <span className="text-black/25 text-[8px] font-mono">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
