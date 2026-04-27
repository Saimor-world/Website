import Link from 'next/link';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Gästebuch | Saimôr',
  description: 'Ein offenes Buch an der Wand. Wer hier eingetragen ist, hat einen Schritt zur digitalen Souveränität gemacht — verifiziert, sichtbar, willkommen.',
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

const PHOTO_PALETTE = [
  { photo: 'linear-gradient(135deg, #FCE8DD 0%, #F4C7B4 100%)', tack: '#C97D5E', label: '#7A4A35' },
  { photo: 'linear-gradient(135deg, #E8F0E0 0%, #BFD7B5 100%)', tack: '#6B8B68', label: '#3F5D3D' },
  { photo: 'linear-gradient(135deg, #F8E0E5 0%, #E8B0BC 100%)', tack: '#B4677D', label: '#7C3D4A' },
  { photo: 'linear-gradient(135deg, #E8EBF5 0%, #B5BFD9 100%)', tack: '#6E7A9F', label: '#3F4870' },
  { photo: 'linear-gradient(135deg, #FAF1D9 0%, #E5C988 100%)', tack: '#A88A4A', label: '#6B5424' },
  { photo: 'linear-gradient(135deg, #E0EEF0 0%, #A8CACE 100%)', tack: '#4F8488', label: '#2F5658' },
];

function paletteFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PHOTO_PALETTE[h % PHOTO_PALETTE.length];
}

const ENTRIES_PER_SPREAD = 2; // one polaroid left, one journal entry right

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function WallPage({
  searchParams,
}: {
  searchParams?: Promise<{ s?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const spread = Math.max(0, parseInt(sp.s ?? '0', 10) || 0);

  const entries = await getEntries();
  const sorted = [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalSpreads = Math.max(1, Math.ceil(sorted.length / ENTRIES_PER_SPREAD));
  const safeSpread = Math.min(spread, totalSpreads - 1);
  const start = safeSpread * ENTRIES_PER_SPREAD;
  const pair = sorted.slice(start, start + ENTRIES_PER_SPREAD);
  const left = pair[0];
  const right = pair[1];

  const isEmpty = sorted.length === 0;

  return (
    <main
      className="min-h-screen overflow-x-hidden relative"
      style={{
        // FRESH wall — soft warm cream + peach + dusty mint, light and airy.
        // Not a heavy brown wall anymore.
        background:
          'radial-gradient(circle at 20% 0%, #FBE4D0 0%, transparent 55%),' +
          'radial-gradient(circle at 80% 100%, #E2EFE3 0%, transparent 60%),' +
          'linear-gradient(165deg, #FCF6EC 0%, #F1E5D0 50%, #E8D5BA 100%)',
        color: '#3E2C1C',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}
    >
      {/* Subtle paper-grain so the wall feels like a real surface, not flat */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #6B5240 1px, transparent 0)',
          backgroundSize: '5px 5px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="text-center mb-12 space-y-5">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(255, 250, 242, 0.85)',
              border: '1px solid rgba(168, 107, 87, 0.3)',
              boxShadow: '0 2px 8px rgba(168, 107, 87, 0.12)',
            }}
          >
            <Heart size={12} fill="#C97D5E" stroke="#C97D5E" />
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: '#7A4A35', fontFamily: 'system-ui, sans-serif' }}>
              Gästebuch
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light leading-[1.05]" style={{ color: '#3E2C1C' }}>
            Schön, dass du{' '}
            <em className="italic" style={{ color: '#A86B57' }}>hier</em> bist
          </h1>

          <p className="text-lg max-w-xl mx-auto leading-relaxed italic" style={{ color: '#6B5240' }}>
            Ein Buch an der Wand. Wer Saimôr mitgestaltet, hinterlässt eine
            Seite — Polaroid links, ein paar Zeilen rechts. Heft dich dazu.
          </p>
        </header>

        {/* ── Open book on the wall ───────────────────────────────────────── */}
        <section className="relative mx-auto max-w-5xl">
          <BookSpread left={left} right={right} isEmpty={isEmpty} />

          {/* Pagination — only when there are real entries to flip through */}
          {!isEmpty && totalSpreads > 1 && (
            <nav className="flex items-center justify-center gap-6 mt-8 text-sm" style={{ color: '#6B5240' }}>
              {safeSpread > 0 ? (
                <Link
                  href={`/wall${safeSpread - 1 === 0 ? '' : `?s=${safeSpread - 1}`}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-white/40"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  <ArrowLeft size={14} />
                  Vorherige Seite
                </Link>
              ) : <span className="opacity-30 px-4 py-2 inline-flex items-center gap-2"><ArrowLeft size={14} />Vorherige Seite</span>}

              <span className="text-xs italic opacity-70 tabular-nums">
                Seite {safeSpread + 1} von {totalSpreads}
              </span>

              {safeSpread < totalSpreads - 1 ? (
                <Link
                  href={`/wall?s=${safeSpread + 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-white/40"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Nächste Seite
                  <ArrowRight size={14} />
                </Link>
              ) : <span className="opacity-30 px-4 py-2 inline-flex items-center gap-2">Nächste Seite<ArrowRight size={14} /></span>}
            </nav>
          )}
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <div className="mt-20 text-center space-y-4">
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
              boxShadow: '0 6px 20px rgba(168, 107, 87, 0.25)',
            }}
          >
            Trag dich ein
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs italic" style={{ color: '#8B6E55' }}>
            Kostenlos. Kein Login. Du entscheidest, ob deine Seite öffentlich wird.
          </p>
        </div>
      </div>
    </main>
  );
}

// ─── Book spread (the open-book centerpiece) ────────────────────────────────

function BookSpread({
  left,
  right,
  isEmpty,
}: {
  left?: WallEntry;
  right?: WallEntry;
  isEmpty: boolean;
}) {
  return (
    <div
      className="relative grid grid-cols-1 md:grid-cols-2 rounded-[8px] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFCF6 0%, #F8F0DD 100%)',
        boxShadow:
          '0 30px 60px rgba(60, 40, 28, 0.18), ' +
          '0 12px 24px rgba(60, 40, 28, 0.12), ' +
          '0 1px 0 rgba(255,255,255,0.7) inset',
        minHeight: 540,
      }}
    >
      {/* Center binding fold — shadow on both sides of the gutter */}
      <div
        className="hidden md:block absolute top-4 bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10"
        style={{
          width: 28,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(122, 80, 53, 0.18) 30%, rgba(122, 80, 53, 0.28) 50%, rgba(122, 80, 53, 0.18) 70%, transparent 100%)',
        }}
      />

      {/* Left page */}
      <div className="relative p-8 md:p-12 flex items-center justify-center">
        {isEmpty ? (
          <BlankPagePolaroid />
        ) : left ? (
          <SmallPolaroid entry={left} />
        ) : (
          <BlankPagePolaroid />
        )}
      </div>

      {/* Right page */}
      <div className="relative p-8 md:p-12 flex items-center justify-center">
        {isEmpty ? (
          <BlankPageEntry />
        ) : right ? (
          <JournalEntry entry={right} />
        ) : left ? (
          <JournalEntry entry={left} />
        ) : (
          <BlankPageEntry />
        )}
      </div>
    </div>
  );
}

// ─── Polaroid (left page) ───────────────────────────────────────────────────

function SmallPolaroid({ entry }: { entry: WallEntry }) {
  const palette = paletteFor(entry.id || entry.name);
  return (
    <article className="relative pt-4" style={{ transform: 'rotate(-2deg)' }}>
      <div
        className="absolute z-20 top-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 14, height: 14,
          background: `radial-gradient(circle at 35% 35%, ${palette.tack}EE 0%, ${palette.tack} 60%, ${palette.tack}88 100%)`,
          boxShadow: `0 1px 0 rgba(255,255,255,0.7) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 3px 4px rgba(0,0,0,0.3)`,
        }}
        aria-hidden
      />
      <div
        className="relative rounded-[6px] pt-3 px-3 pb-1"
        style={{
          background: '#FFFCF6',
          boxShadow: '0 8px 22px rgba(40, 22, 10, 0.25), 0 2px 0 rgba(255,255,255,0.7) inset',
        }}
      >
        <div
          className="relative aspect-[4/3] rounded-[3px] overflow-hidden flex items-end p-4"
          style={{ background: palette.photo, minWidth: 220 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.18) 100%)' }}
          />
          <div className="relative z-10">
            <h3
              className="text-2xl font-medium leading-tight"
              style={{
                color: palette.label,
                fontFamily: '"Cormorant Garamond", serif',
                textShadow: '0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              {entry.name}
            </h3>
          </div>
        </div>
        <div className="pt-3 pb-3 px-1 text-center">
          <p
            className="text-[12px] italic"
            style={{ color: '#5C4A3A', fontFamily: '"Caveat", "Cormorant Garamond", cursive, serif', fontSize: 16 }}
          >
            {entry.company || entry.domain || 'Saimôr Community'}
          </p>
        </div>
      </div>
    </article>
  );
}

function BlankPagePolaroid() {
  return (
    <div className="text-center opacity-60">
      <div
        className="mx-auto mb-4 rounded-[6px]"
        style={{
          width: 220, height: 200,
          background: 'repeating-linear-gradient(45deg, #F0E6D5 0px, #F0E6D5 8px, #E8DCC4 8px, #E8DCC4 16px)',
          boxShadow: 'inset 0 0 30px rgba(168, 107, 87, 0.1)',
        }}
      />
      <p className="text-sm italic" style={{ color: '#A86B57' }}>
        Hier hängt bald dein Polaroid.
      </p>
    </div>
  );
}

// ─── Journal entry (right page) ─────────────────────────────────────────────

function JournalEntry({ entry }: { entry: WallEntry }) {
  const date = new Date(entry.createdAt).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
  const warmth =
    entry.score >= 90 ? 'sehr sicher unterwegs'
    : entry.score >= 75 ? 'gut aufgestellt'
    : entry.score >= 60 ? 'auf dem Weg'
    : 'gerade angekommen';

  // Ruled-paper guidelines for a journal feel
  return (
    <article
      className="relative w-full max-w-md"
      style={{
        backgroundImage: 'repeating-linear-gradient(transparent 0px, transparent 31px, rgba(168, 107, 87, 0.18) 32px)',
        paddingTop: 4,
      }}
    >
      <p
        className="italic mb-3"
        style={{ color: '#A86B57', fontSize: 13, lineHeight: '32px', fontFamily: 'system-ui, sans-serif' }}
      >
        {date}
      </p>

      <h4
        className="font-medium mb-2"
        style={{
          color: '#3E2C1C',
          fontSize: 28,
          lineHeight: '32px',
          fontFamily: '"Cormorant Garamond", serif',
        }}
      >
        {entry.name}
      </h4>

      <p
        className="italic"
        style={{
          color: '#5C4A3A',
          fontSize: 18,
          lineHeight: '32px',
          fontFamily: '"Caveat", "Cormorant Garamond", cursive, serif',
          maxWidth: 360,
        }}
      >
        {warmth}.
        <br />
        Score: <span className="not-italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{entry.score}/100</span>
      </p>

      {(entry.company || entry.domain) && (
        <p
          className="mt-2"
          style={{
            color: '#8B6E55',
            fontSize: 13,
            lineHeight: '32px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          — {entry.company || entry.domain}
        </p>
      )}
    </article>
  );
}

function BlankPageEntry() {
  return (
    <div
      className="relative w-full max-w-md text-center opacity-60"
      style={{
        backgroundImage: 'repeating-linear-gradient(transparent 0px, transparent 31px, rgba(168, 107, 87, 0.18) 32px)',
        paddingTop: 4,
        minHeight: 280,
      }}
    >
      <p
        className="italic mb-2 text-left"
        style={{ color: '#A86B57', fontSize: 13, lineHeight: '32px', fontFamily: 'system-ui, sans-serif' }}
      >
        — heute —
      </p>
      <h4
        className="font-medium mb-2 text-left"
        style={{ color: '#3E2C1C', fontSize: 28, lineHeight: '32px', fontFamily: '"Cormorant Garamond", serif' }}
      >
        Dein Name
      </h4>
      <p
        className="italic text-left"
        style={{
          color: '#8B6E55',
          fontSize: 18,
          lineHeight: '32px',
          fontFamily: '"Caveat", "Cormorant Garamond", cursive, serif',
        }}
      >
        Eine Zeile, ein Polaroid,
        <br />
        ein erster Schritt.
      </p>
    </div>
  );
}
