import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  EyeOff,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

export const metadata = {
  title: { absolute: 'The Wall | Saimôr' },
  description:
    'Der ruhige Backroom von Saimôr: Polaroids von Menschen, Projekten und Begegnungen, die einen Platz an der Wand bekommen haben.',
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

// ── Category metadata (from codex's data model) ─────────────────────────────

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

// Each kind owns a polaroid photo gradient + the matching thumbtack and ink
// color. Warmer/softer pastel range than the original cold dark accents,
// while still being category-distinctive on the dark wall.
type KindStyle = {
  photo: string;       // CSS gradient for the photo area
  tack: string;        // thumbtack body
  ink: string;         // text color used inside the photo
  caption: string;     // small uppercase label color (on cream caption strip)
  icon: typeof HeartHandshake;
};

const KIND_STYLES: Record<string, KindStyle> = {
  supporter:        { photo: 'linear-gradient(135deg, #FCE8DD 0%, #F4C7B4 100%)', tack: '#C97D5E', ink: '#7A4A35', caption: '#A86B57', icon: HeartHandshake },
  customer:         { photo: 'linear-gradient(135deg, #E0EEF0 0%, #A8CACE 100%)', tack: '#4F8488', ink: '#2F5658', caption: '#4F8488', icon: Building2 },
  pilot:            { photo: 'linear-gradient(135deg, #FAF1D9 0%, #E5C988 100%)', tack: '#A88A4A', ink: '#6B5424', caption: '#8E6F2D', icon: Sparkles },
  partner:          { photo: 'linear-gradient(135deg, #E8EBF5 0%, #B5BFD9 100%)', tack: '#6E7A9F', ink: '#3F4870', caption: '#5E6A8E', icon: Users },
  investor:         { photo: 'linear-gradient(135deg, #F8E0E5 0%, #E8B0BC 100%)', tack: '#B4677D', ink: '#7C3D4A', caption: '#9E5366', icon: Sparkles },
  team:             { photo: 'linear-gradient(135deg, #E8F0E0 0%, #BFD7B5 100%)', tack: '#6B8B68', ink: '#3F5D3D', caption: '#5A7B58', icon: Users },
  community:        { photo: 'linear-gradient(135deg, #EFE4F1 0%, #C9A8D6 100%)', tack: '#85608C', ink: '#4E3855', caption: '#6F5079', icon: HeartHandshake },
  'security-check': { photo: 'linear-gradient(135deg, #DDEAF0 0%, #97B8C9 100%)', tack: '#406B83', ink: '#264257', caption: '#3B5C72', icon: ShieldCheck },
};

function styleFor(entry: WallEntry): KindStyle {
  return KIND_STYLES[entry.kind || 'supporter'] || KIND_STYLES.supporter;
}

function roleFor(entry: WallEntry) {
  return KIND_LABELS[entry.kind || 'supporter'] || 'Supporter';
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

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function WallPage() {
  const entries = await getEntries();
  const sorted = [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{
        // Warm dark wall — walnut + dusty peach radial highlights so the
        // polaroids pop against the surface without the previous cold
        // green-black tone.
        background:
          'radial-gradient(circle at 24% 10%, rgba(255, 222, 168, 0.25) 0%, transparent 34%),' +
          'radial-gradient(circle at 82% 78%, rgba(128, 164, 134, 0.12) 0%, transparent 42%),' +
          'linear-gradient(165deg, #35281F 0%, #241C18 48%, #171412 100%)',
        color: '#F7EFDF',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}
    >
      {/* Subtle wood-grain stripe overlay (very faint) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.07] z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(96deg, rgba(252, 222, 188, 0.42) 0px, transparent 1px, transparent 18px, rgba(74, 51, 36, 0.55) 19px, transparent 20px, transparent 54px)',
        }}
      />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="relative z-10 border-b border-white/8 px-5 pt-24 pb-8 md:px-8 md:pt-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: 'rgba(252, 222, 188, 0.10)',
                border: '1px solid rgba(252, 222, 188, 0.22)',
              }}
            >
              <Sparkles size={12} style={{ color: '#FCE0BC' }} />
              <span className="text-[10px] uppercase tracking-[0.32em]" style={{ color: '#FCE0BC', fontFamily: 'system-ui, sans-serif' }}>
                BACKROOM · THE WALL
              </span>
            </div>
            <h1
              className="mt-5 text-5xl font-light leading-[1.05] md:text-7xl"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              Komm rein. An der Wand ist{' '}
              <em className="italic" style={{ color: '#FCE0BC' }}>
                noch Platz
              </em>{' '}
              .
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed italic md:text-lg" style={{ color: 'rgba(247, 239, 223, 0.65)' }}>
              Ein warmer Nebenraum für Menschen, Projekte und Begegnungen rund um Saimôr.
              Kein Feed, keine Rangliste — einfach Erinnerungen, die bleiben dürfen.
            </p>
          </div>

          <Link
            href="/de#kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-[1px]"
            style={{
              background: '#FCE0BC',
              color: '#2C2018',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.02em',
              boxShadow: '0 6px 20px rgba(252, 222, 188, 0.18), 0 1px 0 rgba(255,255,255,0.4) inset',
            }}
          >
            Einen Platz anfragen
            <ArrowRight size={15} />
          </Link>
        </div>

      </header>

      {/* ── Wall section ────────────────────────────────────────────────── */}
      <section className="relative z-10 px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: 'rgba(247, 239, 223, 0.40)', fontFamily: 'system-ui, sans-serif' }}>
              {sorted.length === 0 ? 'noch leer' : `${sorted.length} ${sorted.length === 1 ? 'Polaroid' : 'Polaroids'}`}
            </p>
            <span className="text-[11px] italic" style={{ color: 'rgba(247, 239, 223, 0.42)' }}>Mach es dir gemütlich.</span>
          </div>

          {sorted.length === 0 ? <EmptyWall /> : <WallGrid entries={sorted} />}
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────────────────────── */}
      <section className="relative z-10 px-5 pb-24 pt-6 md:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <p className="text-base italic" style={{ color: 'rgba(247, 239, 223, 0.55)' }}>
            Ein Polaroid erscheint nur nach persönlicher Absprache und Freigabe.
          </p>
        </div>
      </section>
    </main>
  );
}

// ─── Wall grid ──────────────────────────────────────────────────────────────

function WallGrid({ entries }: { entries: WallEntry[] }) {
  return (
    <div className="grid auto-rows-fr gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry, index) => (
        <Polaroid key={entry.id} entry={entry} index={index} />
      ))}
    </div>
  );
}

// ─── Polaroid card ──────────────────────────────────────────────────────────

function Polaroid({ entry, index }: { entry: WallEntry; index: number }) {
  const style = styleFor(entry);
  const Icon = style.icon;
  // Slight, deterministic rotation per polaroid so the wall feels real.
  const rotation = ((index * 11) % 7) - 3; // -3..+3 deg
  const tackOffset = ((index * 5) % 11) - 5; // -5..+5 px horizontal nudge of the tack
  const isAnonymous = entry.visibility === 'anonymous';
  const isCompanyAnonymous = entry.visibility === 'company-anonymous';

  return (
    <article
      className="relative pt-5 transition-transform hover:rotate-0 hover:scale-[1.015]"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Thumbtack — tinted to the kind */}
      <div
        className="absolute z-20 top-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 14,
          height: 14,
          marginLeft: tackOffset,
          background: `radial-gradient(circle at 35% 35%, ${style.tack}EE 0%, ${style.tack} 60%, ${style.tack}88 100%)`,
          boxShadow:
            '0 1px 0 rgba(255,255,255,0.7) inset, ' +
            '0 -1px 0 rgba(0,0,0,0.3) inset, ' +
            '0 4px 6px rgba(0,0,0,0.45)',
        }}
        aria-hidden
      />

      {/* Polaroid frame */}
      <div
        className="relative rounded-[6px] pt-3 px-3 pb-1"
        style={{
          background: '#FAF6EE',
          boxShadow:
            '0 2px 0 rgba(255,255,255,0.6) inset, ' +
            '0 14px 32px rgba(0, 0, 0, 0.55), ' +
            '0 4px 10px rgba(0, 0, 0, 0.30)',
        }}
      >
        {/* Photo area */}
        <div
          className="relative aspect-[4/3] rounded-[3px] overflow-hidden p-4 flex flex-col justify-between"
          style={{ background: style.photo }}
        >
          {/* Vignette for photographic feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.18) 100%)',
            }}
            aria-hidden
          />

          {/* Top row: kind icon (left), claim badge (right) */}
          <div className="relative z-10 flex items-start justify-between">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                background: 'rgba(255, 250, 242, 0.55)',
                border: `1px solid ${style.tack}33`,
              }}
            >
              {isAnonymous ? (
                <EyeOff size={14} style={{ color: style.ink, opacity: 0.7 }} />
              ) : (
                <Icon size={14} style={{ color: style.ink, opacity: 0.85 }} />
              )}
            </div>

          </div>

          {/* Bottom row: name (or initials when fully anonymous) */}
          <div className="relative z-10">
            {isAnonymous ? (
              <h3
                className="text-3xl font-light leading-tight"
                style={{
                  color: style.ink,
                  fontFamily: '"Cormorant Garamond", serif',
                  letterSpacing: '0.04em',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                {initials(entry)}
              </h3>
            ) : (
              <h3
                className="text-2xl md:text-3xl font-medium leading-tight"
                style={{
                  color: style.ink,
                  fontFamily: '"Cormorant Garamond", serif',
                  textShadow: '0 1px 0 rgba(255,255,255,0.45)',
                }}
              >
                {entry.name}
              </h3>
            )}

            {/* Company line — hidden if company-anonymous OR anonymous */}
            {!isAnonymous && !isCompanyAnonymous && (entry.company || entry.domain) && (
              <p
                className="mt-1 text-xs"
                style={{
                  color: style.ink,
                  opacity: 0.72,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {entry.company || entry.domain}
              </p>
            )}

            {isCompanyAnonymous && entry.tag && (
              <p
                className="mt-1 text-xs italic"
                style={{
                  color: style.ink,
                  opacity: 0.6,
                  fontFamily: '"Cormorant Garamond", serif',
                }}
              >
                aus dem {entry.tag}
              </p>
            )}
          </div>
        </div>

        {/* Caption strip — handwritten warmth band + small chips */}
        <div className="pt-3 pb-3 px-1 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase tracking-[0.22em] mb-1"
              style={{ color: style.caption, fontFamily: 'system-ui, sans-serif' }}
            >
              {roleFor(entry)}
            </p>
            {entry.note ? (
              <p
                className="text-[13px] italic leading-snug line-clamp-2"
                style={{
                  color: '#5C4A3A',
                  fontFamily: '"Caveat", "Cormorant Garamond", cursive, serif',
                  fontSize: 16,
                }}
              >
                &bdquo;{entry.note}&ldquo;
              </p>
            ) : (
              <p
                className="text-[12px] italic"
                style={{ color: '#8B6E55', fontFamily: '"Cormorant Garamond", serif' }}
              >
                Seit {formatDate(entry.createdAt)} an dieser Wand
              </p>
            )}
          </div>

        </div>
      </div>
    </article>
  );
}

// ─── Empty state ────────────────────────────────────────────────────────────

function EmptyWall() {
  return (
    <div
      className="relative mx-auto max-w-2xl rounded-[16px] px-8 py-16 text-center"
      style={{
        background: 'rgba(252, 222, 188, 0.04)',
        border: '1px dashed rgba(252, 222, 188, 0.20)',
      }}
    >
      <div
        className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: 'rgba(252, 222, 188, 0.10)',
          border: '1px solid rgba(252, 222, 188, 0.22)',
        }}
      >
        <ShieldCheck size={28} style={{ color: '#FCE0BC', opacity: 0.85 }} />
      </div>
      <h2
        className="text-3xl font-light mb-3"
        style={{ fontFamily: '"Cormorant Garamond", serif', color: '#F7EFDF' }}
      >
        Die Wand ist noch{' '}
        <em className="italic" style={{ color: '#FCE0BC' }}>
          ganz frisch
        </em>
      </h2>
      <p
        className="mx-auto max-w-md text-base italic leading-relaxed"
        style={{ color: 'rgba(247, 239, 223, 0.55)' }}
      >
        Noch hängt hier kein Polaroid. Wenn eine Begegnung, ein Projekt oder eine Zusammenarbeit hierher gehört, sprechen wir zuerst persönlich darüber.
      </p>
      <Link
        href="/de#kontakt"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-[1px]"
        style={{
          background: '#FCE0BC',
          color: '#2C2018',
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 6px 20px rgba(252, 222, 188, 0.18)',
        }}
      >
        Einen Platz anfragen
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
