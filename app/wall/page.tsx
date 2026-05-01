import Link from 'next/link';
import { ArrowRight, BadgeCheck, Building2, EyeOff, HeartHandshake, ShieldCheck, Sparkles, Users } from 'lucide-react';

export const metadata = {
  title: 'Saimor Wall',
  description: 'Verifizierte Supporter, Kunden, Partner, Team-Mitglieder und anonyme Security-Signale.',
};

export const dynamic = 'force-dynamic';

type WallEntry = {
  id: string;
  name: string;
  company: string | null;
  tag: string | null;
  domain: string | null;
  score: number;
  kind?: string;
  visibility?: string;
  status?: string;
  createdAt: string;
  claimed?: boolean;
  note?: string | null;
};

async function getEntries(): Promise<WallEntry[]> {
  try {
    const base = process.env.NEXTAUTH_URL || 'http://localhost:3001';
    const res = await fetch(`${base}/api/wall`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries ?? [];
  } catch {
    return [];
  }
}

const KIND_LABELS: Record<string, string> = {
  supporter: 'Supporter',
  customer: 'Kunde',
  pilot: 'Pilotkunde',
  partner: 'Partner',
  investor: 'Investor:in',
  team: 'Team',
  community: 'Community',
  'security-check': 'Security Signal',
};

const KIND_STYLES: Record<string, { accent: string; soft: string; icon: typeof HeartHandshake }> = {
  supporter: { accent: '#86efac', soft: 'rgba(134,239,172,0.10)', icon: HeartHandshake },
  customer: { accent: '#67e8f9', soft: 'rgba(103,232,249,0.10)', icon: Building2 },
  pilot: { accent: '#fde68a', soft: 'rgba(253,230,138,0.12)', icon: Sparkles },
  partner: { accent: '#c4b5fd', soft: 'rgba(196,181,253,0.12)', icon: Users },
  investor: { accent: '#f9a8d4', soft: 'rgba(249,168,212,0.12)', icon: BadgeCheck },
  team: { accent: '#d9f99d', soft: 'rgba(217,249,157,0.10)', icon: Users },
  community: { accent: '#a7f3d0', soft: 'rgba(167,243,208,0.10)', icon: HeartHandshake },
  'security-check': { accent: '#93c5fd', soft: 'rgba(147,197,253,0.12)', icon: ShieldCheck },
};

function roleFor(entry: WallEntry) {
  return KIND_LABELS[entry.kind || 'supporter'] || 'Supporter';
}

function styleFor(entry: WallEntry) {
  return KIND_STYLES[entry.kind || 'supporter'] || KIND_STYLES.supporter;
}

function visibilityLabel(entry: WallEntry) {
  if (entry.visibility === 'anonymous') return 'anonym';
  if (entry.visibility === 'company-anonymous') return 'Firma anonym';
  return 'sichtbar';
}

function initials(entry: WallEntry) {
  return (
    entry.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'S'
  );
}

function scoreBand(score: number) {
  if (score >= 80) return 'starkes Signal';
  if (score >= 60) return 'auf dem Weg';
  if (score >= 40) return 'ehrlicher Start';
  return 'frueher Check';
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

export default async function WallPage() {
  const entries = await getEntries();
  const sorted = [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const anonymousCount = sorted.filter((entry) => entry.visibility && entry.visibility !== 'named').length;
  const claimedCount = sorted.filter((entry) => entry.claimed).length;

  return (
    <main className="min-h-screen text-[#f7f0df]" style={{ background: 'linear-gradient(180deg, #06100d 0%, #0d1511 52%, #100f0c 100%)' }}>
      <section className="border-b border-white/10 px-5 pt-24 pb-8 md:px-8 md:pt-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.26em] text-emerald-100/70">
              <Sparkles size={12} />
              Verified Wall
            </div>
            <h1 className="mt-4 text-5xl font-light leading-none md:text-7xl" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
              Saimor Wall
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/58 md:text-lg">
              Supporter, Kund:innen, Team, Partner und anonyme Signale.
            </p>
          </div>

          <Link
            href="/de/einstieg/security-check"
            className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-emerald-300 px-5 py-3 text-sm font-semibold text-[#07100d] shadow-[0_18px_48px_rgba(52,211,153,0.24)] transition-transform hover:translate-y-[-1px]"
          >
            Check starten
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mx-auto mt-7 grid max-w-6xl gap-3 sm:grid-cols-3">
          <Stat label="Eintraege" value={String(sorted.length)} />
          <Stat label="Anonym erlaubt" value={String(anonymousCount)} />
          <Stat label="HQ verbunden" value={String(claimedCount)} />
        </div>
      </section>

      <section className="px-5 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-[8px] border border-white/12 p-4 shadow-[0_34px_110px_rgba(0,0,0,0.32)] md:p-7"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018)), repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 88px), repeating-linear-gradient(0deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 72px), #111a15',
            }}
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/34">Live Board</p>
                <p className="mt-1 text-sm text-white/54">{sorted.length} freigegebene Signale</p>
              </div>
              <div className="hidden rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/42 sm:block">
                Owner moderated
              </div>
            </div>
            {sorted.length === 0 ? <EmptyWall /> : <WallGrid entries={sorted} />}
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.035] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/36">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white/86">{value}</p>
    </div>
  );
}

function WallGrid({ entries }: { entries: WallEntry[] }) {
  return (
    <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry, index) => (
        <WallTile key={entry.id} entry={entry} index={index} />
      ))}
    </div>
  );
}

function WallTile({ entry, index }: { entry: WallEntry; index: number }) {
  const style = styleFor(entry);
  const Icon = style.icon;
  const tilt = index % 3 === 0 ? '-rotate-[0.7deg]' : index % 3 === 1 ? 'rotate-[0.45deg]' : '';

  return (
    <article
      className={`relative min-h-[250px] rounded-[8px] border p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition-transform hover:-translate-y-1 ${tilt}`}
      style={{
        borderColor: `${style.accent}32`,
        background: `linear-gradient(180deg, ${style.soft}, rgba(255,255,255,0.05) 56%, rgba(0,0,0,0.10)), linear-gradient(135deg, rgba(255,255,255,0.035), transparent), #132019`,
      }}
    >
      <div
        className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full"
        style={{
          background: style.accent,
          boxShadow: `0 0 0 5px ${style.accent}18, 0 8px 18px rgba(0,0,0,0.28)`,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-[8px]" style={{ background: style.accent }} />
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border text-sm font-semibold"
            style={{ borderColor: `${style.accent}55`, background: `${style.accent}18`, color: style.accent }}
          >
            {entry.visibility === 'anonymous' ? <EyeOff size={17} /> : initials(entry)}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: style.accent }}>
              {roleFor(entry)}
            </p>
            <h2 className="mt-1 truncate text-lg font-semibold text-white/90">{entry.name}</h2>
          </div>
        </div>
        <Icon size={18} style={{ color: style.accent }} />
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-sm text-white/52">{entry.company || entry.domain || visibilityLabel(entry)}</p>
        {entry.note ? (
          <p className="line-clamp-3 text-sm italic leading-relaxed text-white/70">"{entry.note}"</p>
        ) : (
          <p className="text-sm leading-relaxed text-white/42">
            #{String(index + 1).padStart(2, '0')} auf der Wall. {scoreBand(entry.score)}.
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em]">
        <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-white/46">{visibilityLabel(entry)}</span>
        <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-white/46">{formatDate(entry.createdAt)}</span>
        {entry.claimed ? <span className="rounded-full border border-cyan-200/20 bg-cyan-300/10 px-2 py-1 text-cyan-100/70">HQ verbunden</span> : null}
      </div>
    </article>
  );
}

function EmptyWall() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[8px] border border-dashed border-white/14 bg-black/12 px-6 text-center">
      <ShieldCheck className="h-9 w-9 text-emerald-200/70" />
      <h2 className="mt-5 text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
        Noch keine freigegebenen Eintraege
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-white/48">
        Checks bleiben privat, bis E-Mail, Zustimmung und Owner-Freigabe passen. Anonyme Eintraege sind moeglich.
      </p>
    </div>
  );
}
