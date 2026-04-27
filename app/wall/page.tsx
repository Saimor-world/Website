import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Gästebuch | Saimôr',
  description: 'Ein digitales Gästebuch für die Saimôr Community. Wer hier steht, hat den ersten Schritt zur digitalen Souveränität gemacht — verifiziert, sichtbar, willkommen.',
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

// ─── Pastel palette: each entry rotates through these for variety ────────────
const PALETTE = [
  { bg: '#FCE8DD', ink: '#7A4A35', accent: '#E8A597', name: 'Pfirsich' },     // peach
  { bg: '#E8F0E0', ink: '#3F5D3D', accent: '#9CB69E', name: 'Salbei' },        // sage
  { bg: '#F8E0E5', ink: '#7C3D4A', accent: '#D4889B', name: 'Rose' },          // rose
  { bg: '#E8EBF5', ink: '#3F4870', accent: '#8B95B8', name: 'Flieder' },       // lavender
  { bg: '#FAF1D9', ink: '#6B5424', accent: '#D4B872', name: 'Honig' },         // butter / honey
  { bg: '#E0EEF0', ink: '#2F5658', accent: '#7FB1B5', name: 'Mint' },          // mint
];

function paletteFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

// ─── Decorative SVG: tiny hand-drawn-feel heart, used as a stamp ────────────
function StampHeart({ color, className = '' }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 21s-7.5-4.5-9.5-9.5C1 7.5 3.5 4 7 4c2 0 3.5 1.2 5 3 1.5-1.8 3-3 5-3 3.5 0 6 3.5 4.5 7.5C19.5 16.5 12 21 12 21z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StampStar({ color, className = '' }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 3l1.8 5.5h5.7l-4.6 3.4 1.8 5.6L12 14.1l-4.7 3.4 1.8-5.6L4.5 8.5h5.7L12 3z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function WallPage() {
  const entries = await getEntries();
  const sorted = [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const isEmpty = sorted.length === 0;

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{
        background:
          'radial-gradient(circle at 15% 10%, #FBE9D7 0%, transparent 45%),' +
          'radial-gradient(circle at 85% 80%, #E8E0EE 0%, transparent 50%),' +
          'radial-gradient(circle at 50% 50%, #FAF6EE 0%, #F4ECDD 100%)',
        color: '#4A3826',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}
    >
      {/* Subtle paper-grain overlay (CSS-only, no asset) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0 mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #4A3826 1px, transparent 0)',
          backgroundSize: '4px 4px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-28">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="text-center mb-20 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{ background: '#E8A59722', border: '1px solid #E8A59755' }}
          >
            <Heart size={12} fill="#E8A597" stroke="#E8A597" />
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: '#A86B57', fontFamily: 'system-ui, sans-serif' }}>
              Gästebuch
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light leading-[1.05]" style={{ color: '#3E2C1C' }}>
            Schön, dass du{' '}
            <em className="italic" style={{ color: '#A86B57' }}>hier</em> bist
          </h1>

          <p
            className="text-lg max-w-xl mx-auto leading-relaxed italic"
            style={{ color: '#6B5240' }}
          >
            Ein Gästebuch für die Menschen, die Saimôr mitgestalten. Trag dich ein,
            indem du deinen Security-Check machst — dein Name kommt dann hierher,
            wenn du magst.
          </p>

          {/* tiny ornamental rule */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span style={{ width: 40, height: 1, background: '#A86B5755' }} />
            <StampHeart color="#A86B5788" className="w-4 h-4" />
            <span style={{ width: 40, height: 1, background: '#A86B5755' }} />
          </div>
        </header>

        {/* ── Entries ────────────────────────────────────────────────────── */}
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {sorted.map((entry, idx) => (
              <GuestbookEntry key={entry.id} entry={entry} index={idx} />
            ))}
          </div>
        )}

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <div className="mt-24 text-center space-y-5">
          <Link
            href="/de/einstieg/security-check"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all hover:scale-[1.02]"
            style={{
              background: '#3E2C1C',
              color: '#FAF6EE',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '0.05em',
              boxShadow: '0 4px 20px rgba(168, 107, 87, 0.2)',
            }}
          >
            Trag dich ein
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs italic" style={{ color: '#8B6E55' }}>
            Kostenlos. Kein Login. Du entscheidest, ob dein Eintrag öffentlich wird.
          </p>
        </div>
      </div>
    </main>
  );
}

// ─── Entry card ─────────────────────────────────────────────────────────────

function GuestbookEntry({ entry, index }: { entry: WallEntry; index: number }) {
  const palette = paletteFor(entry.id || entry.name);
  const date = new Date(entry.createdAt).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Slight, deterministic rotation per card so it feels like a scrapbook.
  const rotation = ((index * 7) % 5) - 2; // -2..+2 deg
  const decoration = index % 3 === 0 ? 'heart' : index % 3 === 1 ? 'star' : null;

  // Score → warm warmth-level (not graded letter)
  const warmth =
    entry.score >= 90 ? 'sehr sicher unterwegs'
    : entry.score >= 75 ? 'gut aufgestellt'
    : entry.score >= 60 ? 'auf dem Weg'
    : 'gerade angekommen';

  return (
    <article
      className="break-inside-avoid relative rounded-[2rem] p-7 transition-all hover:rotate-0 hover:scale-[1.01]"
      style={{
        background: palette.bg,
        color: palette.ink,
        transform: `rotate(${rotation}deg)`,
        boxShadow:
          '0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 24px rgba(168, 107, 87, 0.08), 0 1px 3px rgba(74, 56, 38, 0.06)',
      }}
    >
      {/* Decorative stamp in corner */}
      {decoration === 'heart' && (
        <StampHeart color={palette.accent} className="absolute top-5 right-5 w-5 h-5 opacity-60" />
      )}
      {decoration === 'star' && (
        <StampStar color={palette.accent} className="absolute top-5 right-5 w-5 h-5 opacity-60" />
      )}

      {/* Date — small, looks handwritten */}
      <p
        className="text-[11px] italic mb-3"
        style={{ color: palette.accent, opacity: 0.85 }}
      >
        {date}
      </p>

      {/* Name — biggest element on the card */}
      <h3
        className="text-2xl md:text-3xl font-medium leading-tight mb-2"
        style={{ color: palette.ink }}
      >
        {entry.name}
      </h3>

      {/* Company / domain — secondary */}
      {(entry.company || entry.domain) && (
        <p
          className="text-sm mb-5"
          style={{ color: palette.ink, opacity: 0.7, fontFamily: 'system-ui, sans-serif' }}
        >
          {entry.company || entry.domain}
        </p>
      )}

      {/* Footer line: warmth label + score, framed warmly */}
      <div
        className="flex items-end justify-between pt-4 mt-2"
        style={{ borderTop: `1px dashed ${palette.accent}66` }}
      >
        <p className="text-xs italic leading-snug max-w-[140px]" style={{ color: palette.ink, opacity: 0.65 }}>
          {warmth}
        </p>
        <div className="text-right">
          <div
            className="text-[10px] uppercase tracking-[0.2em] mb-0.5"
            style={{ color: palette.accent, fontFamily: 'system-ui, sans-serif' }}
          >
            Score
          </div>
          <div
            className="text-2xl font-medium tabular-nums"
            style={{ color: palette.ink, fontFamily: '"Cormorant Garamond", serif' }}
          >
            {entry.score}
            <span className="text-base opacity-50">/100</span>
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
        style={{ background: '#FCE8DD', boxShadow: '0 4px 12px rgba(168, 107, 87, 0.15)' }}
      >
        <Heart size={32} fill="#E8A597" stroke="#A86B57" strokeWidth={1.5} />
      </div>
      <h2 className="text-3xl font-light mb-4" style={{ color: '#3E2C1C' }}>
        Noch <em className="italic" style={{ color: '#A86B57' }}>ganz frisch</em>
      </h2>
      <p
        className="text-lg italic leading-relaxed max-w-md mx-auto"
        style={{ color: '#6B5240' }}
      >
        Niemand hat sich noch eingetragen. Das könntest du sein — der erste
        Name in unserem Gästebuch. Wir freuen uns auf dich.
      </p>
    </div>
  );
}
