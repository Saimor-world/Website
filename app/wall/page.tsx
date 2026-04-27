import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Gästebuch | Saimôr',
  description: 'Polaroid-Wand für die Saimôr Community. Wer hier hängt, hat den ersten Schritt zur digitalen Souveränität gemacht — verifiziert, sichtbar, willkommen.',
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

// Photo-area pastel palette — soft enough to feel personal, saturated
// enough to read as a real photograph against the white polaroid frame.
const PHOTO_PALETTE = [
  { photo: 'linear-gradient(135deg, #FCE8DD 0%, #F4C7B4 100%)', tack: '#C97D5E', label: '#7A4A35' }, // peach
  { photo: 'linear-gradient(135deg, #E8F0E0 0%, #BFD7B5 100%)', tack: '#6B8B68', label: '#3F5D3D' }, // sage
  { photo: 'linear-gradient(135deg, #F8E0E5 0%, #E8B0BC 100%)', tack: '#B4677D', label: '#7C3D4A' }, // rose
  { photo: 'linear-gradient(135deg, #E8EBF5 0%, #B5BFD9 100%)', tack: '#6E7A9F', label: '#3F4870' }, // lavender
  { photo: 'linear-gradient(135deg, #FAF1D9 0%, #E5C988 100%)', tack: '#A88A4A', label: '#6B5424' }, // honey
  { photo: 'linear-gradient(135deg, #E0EEF0 0%, #A8CACE 100%)', tack: '#4F8488', label: '#2F5658' }, // mint
];

function paletteFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PHOTO_PALETTE[h % PHOTO_PALETTE.length];
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function WallPage() {
  const entries = await getEntries();
  const sorted = [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const isEmpty = sorted.length === 0;

  return (
    <main
      className="min-h-screen overflow-x-hidden relative"
      style={{
        // Warm "wall" — wood-tone gradient, not cream-soft. Reads as a
        // real surface where things can be pinned, not as a paper page.
        background:
          'radial-gradient(circle at 20% 0%, #B89274 0%, transparent 55%),' +
          'radial-gradient(circle at 80% 100%, #8E6147 0%, transparent 60%),' +
          'linear-gradient(165deg, #C9A684 0%, #A07A5C 50%, #6F4E36 100%)',
        color: '#2F2118',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}
    >
      {/* Wood-grain texture overlay — diagonal subtle stripes */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(110deg, rgba(60, 35, 18, 0.5) 0px, transparent 1px, transparent 5px, rgba(60, 35, 18, 0.4) 6px, transparent 7px, transparent 22px)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="text-center mb-20 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(255,250,242,0.85)',
              border: '1px solid rgba(122, 74, 53, 0.25)',
              boxShadow: '0 2px 8px rgba(60, 35, 18, 0.15)',
            }}
          >
            <Heart size={12} fill="#C97D5E" stroke="#C97D5E" />
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: '#7A4A35', fontFamily: 'system-ui, sans-serif' }}>
              Gästebuch
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-light leading-[1.05]"
            style={{
              color: '#FAF6EE',
              textShadow: '0 2px 12px rgba(60, 35, 18, 0.6)',
            }}
          >
            Schön, dass du{' '}
            <em className="italic" style={{ color: '#FFE4C4' }}>hier</em> bist
          </h1>

          <p
            className="text-lg max-w-xl mx-auto leading-relaxed italic"
            style={{
              color: '#FAF6EE',
              opacity: 0.85,
              textShadow: '0 1px 6px rgba(60, 35, 18, 0.5)',
            }}
          >
            Eine Wand für die Menschen, die Saimôr mitgestalten. Heft dich dazu —
            indem du deinen Security-Check machst — wenn du magst, hängen wir dein
            Polaroid hier auf.
          </p>

          {/* tiny ornamental rule */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span style={{ width: 50, height: 1, background: 'rgba(250, 246, 238, 0.4)' }} />
            <Heart size={10} fill="#FFE4C4" stroke="#FFE4C4" />
            <span style={{ width: 50, height: 1, background: 'rgba(250, 246, 238, 0.4)' }} />
          </div>
        </header>

        {/* ── Polaroid grid ──────────────────────────────────────────────── */}
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {sorted.map((entry, idx) => (
              <Polaroid key={entry.id} entry={entry} index={idx} />
            ))}
          </div>
        )}

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <div className="mt-28 text-center space-y-5">
          <Link
            href="/de/einstieg/security-check"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all hover:scale-[1.02]"
            style={{
              background: '#FAF6EE',
              color: '#3E2C1C',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.05em',
              boxShadow: '0 6px 20px rgba(60, 35, 18, 0.35), 0 2px 0 rgba(255,255,255,0.4) inset',
            }}
          >
            Heft dich an die Wand
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs italic" style={{ color: '#FAF6EE', opacity: 0.7 }}>
            Kostenlos. Kein Login. Du entscheidest, ob dein Polaroid öffentlich wird.
          </p>
        </div>
      </div>
    </main>
  );
}

// ─── Polaroid card ──────────────────────────────────────────────────────────

function Polaroid({ entry, index }: { entry: WallEntry; index: number }) {
  const palette = paletteFor(entry.id || entry.name);
  const date = new Date(entry.createdAt).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Slight, deterministic rotation per polaroid so the wall feels real.
  const rotation = ((index * 11) % 7) - 3; // -3..+3 deg
  const tackOffset = ((index * 5) % 11) - 5; // -5..+5 px horizontal nudge of the tack

  // Score → warmth label (no leaderboard cold)
  const warmth =
    entry.score >= 90 ? 'sehr sicher unterwegs'
    : entry.score >= 75 ? 'gut aufgestellt'
    : entry.score >= 60 ? 'auf dem Weg'
    : 'gerade angekommen';

  return (
    <article
      className="break-inside-avoid relative pt-5 transition-all hover:rotate-0 hover:scale-[1.02]"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Thumbtack at top */}
      <div
        className="absolute z-20 top-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 14,
          height: 14,
          marginLeft: tackOffset,
          background: `radial-gradient(circle at 35% 35%, ${palette.tack}EE 0%, ${palette.tack} 60%, ${palette.tack}88 100%)`,
          boxShadow:
            `0 1px 0 rgba(255,255,255,0.7) inset, ` +
            `0 -1px 0 rgba(0,0,0,0.3) inset, ` +
            `0 3px 4px rgba(0,0,0,0.35), ` +
            `0 1px 0 ${palette.tack}66`,
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
            '0 12px 28px rgba(40, 22, 10, 0.45), ' +
            '0 4px 8px rgba(40, 22, 10, 0.25)',
        }}
      >
        {/* Photo area (the colored portion of the polaroid) */}
        <div
          className="relative aspect-[4/3] rounded-[3px] overflow-hidden flex items-end p-5"
          style={{ background: palette.photo }}
        >
          {/* Subtle vignette for photographic feel */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.18) 100%)',
            }}
          />

          {/* Name laid into the photo, like a stamped initial */}
          <div className="relative z-10">
            <h3
              className="text-3xl md:text-4xl font-medium leading-tight"
              style={{
                color: palette.label,
                fontFamily: '"Cormorant Garamond", serif',
                textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              {entry.name}
            </h3>
            {(entry.company || entry.domain) && (
              <p
                className="text-xs mt-1"
                style={{
                  color: palette.label,
                  opacity: 0.75,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {entry.company || entry.domain}
              </p>
            )}
          </div>
        </div>

        {/* Caption strip — the white bottom of the polaroid */}
        <div className="pt-3 pb-4 px-1 flex items-end justify-between gap-2">
          <p
            className="text-[11px] italic leading-tight max-w-[150px]"
            style={{
              color: '#5C4A3A',
              fontFamily: '"Caveat", "Cormorant Garamond", cursive, serif',
              fontSize: '14px',
            }}
          >
            {warmth}
            <br />
            <span style={{ opacity: 0.6, fontSize: '12px' }}>{date}</span>
          </p>
          <div
            className="text-right shrink-0"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            <div
              className="text-[9px] uppercase tracking-[0.2em]"
              style={{ color: palette.label, opacity: 0.7, fontFamily: 'system-ui, sans-serif' }}
            >
              Score
            </div>
            <div
              className="text-2xl font-medium tabular-nums leading-none"
              style={{ color: palette.label }}
            >
              {entry.score}
              <span className="text-sm opacity-50">/100</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Empty state ────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="text-center py-20 px-8 mx-auto max-w-2xl">
      <div
        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8"
        style={{
          background: 'rgba(250, 246, 238, 0.95)',
          boxShadow: '0 6px 20px rgba(60, 35, 18, 0.4)',
        }}
      >
        <Heart size={32} fill="#C97D5E" stroke="#7A4A35" strokeWidth={1.5} />
      </div>
      <h2
        className="text-3xl font-light mb-4"
        style={{ color: '#FAF6EE', textShadow: '0 1px 6px rgba(60, 35, 18, 0.5)' }}
      >
        Die Wand ist noch <em className="italic" style={{ color: '#FFE4C4' }}>ganz frisch</em>
      </h2>
      <p
        className="text-lg italic leading-relaxed max-w-md mx-auto"
        style={{ color: '#FAF6EE', opacity: 0.85 }}
      >
        Niemand hat sich noch eingeheftet. Das könntest du sein — das erste
        Polaroid an der Wand. Wir freuen uns auf dich.
      </p>
    </div>
  );
}
