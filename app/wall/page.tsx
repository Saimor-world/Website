import Image from 'next/image';
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
      className="relative min-h-screen overflow-x-hidden bg-[#160f0b]"
      style={{
        color: '#F7EFDF',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src="/images/wall-backroom.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={78}
          className="object-cover object-[42%_top] opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,8,6,.16)_0%,rgba(18,12,9,.34)_38%,rgba(12,9,7,.70)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_80%,rgba(18,92,69,.14),transparent_28%)]" />
      </div>

      <header className="relative z-10 flex min-h-[58svh] items-end px-5 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-9 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: 'rgba(26, 15, 10, 0.28)',
                border: '1px solid rgba(252, 224, 188, 0.26)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Sparkles size={12} style={{ color: '#FCE0BC' }} />
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: '#FCE0BC', fontFamily: 'system-ui, sans-serif' }}>
                THE WALL · BACKROOM
              </span>
            </div>
            <h1
              className="mt-6 max-w-3xl text-5xl font-light leading-[0.98] text-[#fff7e9] drop-shadow-[0_3px_30px_rgba(0,0,0,.42)] sm:text-6xl md:text-8xl"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              Komm rein. Was bleibt, bekommt{' '}
              <em className="italic" style={{ color: '#FCE0BC' }}>
                einen Platz.
              </em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl" style={{ color: 'rgba(255, 244, 226, 0.72)' }}>
              Menschen, Projekte und Begegnungen rund um Saimôr. Keine Rangliste. Kein Feed.
              Nur Dinge, an die wir uns erinnern wollen.
            </p>
          </div>

          <Link
            href="/de#kontakt"
            className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full border border-[#fce0bc]/35 bg-[#1b110b]/35 px-6 py-3 text-base font-medium text-[#fff3df] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#fce0bc] hover:text-[#2c2018] md:self-auto"
            style={{
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            Einen Platz anfragen
            <ArrowRight size={15} />
          </Link>
        </div>

      </header>

      <section className="relative z-10 px-5 pb-14 pt-3 md:px-8 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center gap-5 border-t border-[#fce0bc]/15 pt-5 md:mb-14">
            <p className="text-xs uppercase tracking-[0.22em]" style={{ color: 'rgba(255, 240, 218, 0.56)', fontFamily: 'system-ui, sans-serif' }}>
              {sorted.length === 0
                ? 'Noch keine freigegebenen Polaroids'
                : `${sorted.length} ${sorted.length === 1 ? 'freigegebenes Polaroid' : 'freigegebene Polaroids'}`}
            </p>
            <span className="h-px flex-1 bg-[#fce0bc]/10" aria-hidden />
            <span className="hidden text-sm italic text-[#fce0bc]/55 sm:inline">Mach es dir gemütlich.</span>
          </div>

          {sorted.length === 0 ? <EmptyWall /> : <WallGrid entries={sorted} />}
        </div>
      </section>

      {sorted.length > 0 ? (
        <section className="relative z-10 px-5 pb-24 pt-4 md:px-8">
          <div className="mx-auto flex max-w-6xl justify-end">
            <p className="max-w-sm text-right text-base italic text-[#fce0bc]/60">
              Nichts erscheint hier automatisch. Jedes Polaroid braucht eine persönliche Freigabe.
            </p>
          </div>
        </section>
      ) : null}
    </main>
  );
}

// ─── Wall grid ──────────────────────────────────────────────────────────────

function WallGrid({ entries }: { entries: WallEntry[] }) {
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
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
  const rotation = ((index * 11) % 5) - 2;
  const tackOffset = ((index * 5) % 11) - 5; // -5..+5 px horizontal nudge of the tack
  const isAnonymous = entry.visibility === 'anonymous';
  const isCompanyAnonymous = entry.visibility === 'company-anonymous';
  const placements = [
    'lg:col-span-4 lg:col-start-2',
    'lg:col-span-4 lg:col-start-7 lg:mt-14',
    'lg:col-span-4 lg:col-start-1',
    'lg:col-span-4 lg:col-start-6 lg:mt-16',
    'lg:col-span-3 lg:col-start-10',
  ];

  return (
    <article
      className={`relative mx-auto w-full max-w-[390px] pt-5 transition-transform duration-500 hover:rotate-0 hover:scale-[1.018] ${placements[index % placements.length]}`}
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
        className="relative rounded-[5px] px-3 pb-2 pt-3 sm:px-4 sm:pt-4"
        style={{
          background: '#FAF6EE',
          boxShadow:
            '0 2px 0 rgba(255,255,255,0.6) inset, ' +
            '0 22px 48px rgba(0, 0, 0, 0.52), ' +
            '0 5px 14px rgba(0, 0, 0, 0.34)',
        }}
      >
        {/* Photo area */}
        <div
          className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-[2px] p-5"
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

          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(4rem,12vw,7rem)] font-light opacity-[0.10]"
            style={{ color: style.ink, fontFamily: '"Cormorant Garamond", serif' }}
            aria-hidden
          >
            {initials(entry)}
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
        <div className="flex min-h-24 items-start justify-between gap-3 px-1 pb-3 pt-4">
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
    <div className="flex min-h-[42svh] items-center py-12 md:py-20">
      <div className="max-w-xl border-l border-[#fce0bc]/25 pl-6 md:pl-9">
        <p className="text-xs uppercase tracking-[0.24em] text-[#fce0bc]/55" style={{ fontFamily: 'system-ui, sans-serif' }}>
          Die Wand ist still
        </p>
        <h2 className="mt-4 text-4xl font-light text-[#fff5e5] md:text-5xl">
          Die ersten Plätze bleiben bewusst leer.
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#f7efdf]/65">
          Hier hängt erst etwas, wenn eine echte Begegnung, ein Projekt oder eine Zusammenarbeit dazugehört — und die Person zugestimmt hat.
        </p>
      <Link
        href="/de#kontakt"
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#fce0bc] px-6 py-3 text-base font-medium text-[#2c2018] transition hover:-translate-y-0.5 hover:bg-[#fff0d4]"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        Eine Begegnung vorschlagen
        <ArrowRight size={15} />
      </Link>
      </div>
    </div>
  );
}
