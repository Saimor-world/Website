// components/Hero.tsx
type Props = {
  locale: 'de' | 'en';
  heading?: string;        // optional – überschreibt Standard
  sub?: string;            // optional – überschreibt Standard
  cta?: string;            // optional – Text für primären CTA
  ctaHref?: string;        // optional – Link für primären CTA
  secondaryText?: string;  // optional – Text für Sekundärlink
  secondaryHref?: string;  // optional – Link für Sekundärlink
};

export default function Hero({
  locale,
  heading,
  sub,
  cta,
  ctaHref,
  secondaryText,
  secondaryHref,
}: Props) {
  const H =
    heading ??
    (locale === 'de'
      ? 'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.'
      : 'Saimôr is a digital place for what remains when everything else gets loud.');

  const SUB =
    sub ??
    (locale === 'de'
      ? 'Klarheit im Wandel – Begleitung für Menschen und Organisationen, wenn Systeme schwanken.'
      : 'Clarity in Change — Guidance for people and organizations when systems falter.');

  const CTA = cta ?? (locale === 'de' ? 'Lichtgespräch' : 'Intro Call');
  const CTA_HREF = ctaHref ?? '/kontakt?lichtgespraech=1';

  const SEC_TEXT = secondaryText ?? (locale === 'de' ? 'Angebot ansehen' : 'View offering');
  const SEC_HREF = secondaryHref ?? '#angebot';

  return (
    <section className="relative section bg-band overflow-hidden section-underline">
      {/* Orbit */}
      <svg aria-hidden className="absolute inset-0 -z-10" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
        <g fill="none" className="orbit-stroke">
          <circle cx="720" cy="360" r="280" strokeWidth={1.2}/>
          <ellipse cx="720" cy="380" rx="520" ry="200" strokeWidth={1}/>
          <path d="M160 360 Q720 80 1280 360" strokeWidth={1}/>
        </g>
      </svg>

      <div className="mx-auto max-w-6xl px-6 s-appear grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="font-display max-w-5xl text-[44px] md:text-[66px] leading-[1.12] font-medium tracking-[-0.015em]">
            {H}
          </h1>

          <p className="max-w-2xl mt-7 text-[18px] leading-relaxed" style={{ color: 'var(--ink)' }}>
            {SUB}
          </p>

          <div className="mt-10 flex items-center gap-6">
            <a
              href={CTA_HREF}
              className="rounded-2xl px-5 py-2.5 text-sm font-medium transition border hover:bg-[color:var(--gold)] hover:text-[color:var(--navy)]"
              style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
            >
              {CTA}
            </a>
            <a href={SEC_HREF} className="text-sm hover:underline underline-offset-4" style={{ color: 'var(--ink)' }}>
              {SEC_TEXT}
            </a>
          </div>
        </div>

        {/* Warmes Panel */}
        <div
          className="rounded-3xl p-6"
          style={{
            background: 'linear-gradient(180deg,#FFFAE6 0%,#FFE5A3 100%)',
            border: '1px solid rgba(255,255,255,.08)',
            boxShadow: '0 22px 60px rgba(0,0,0,.38)',
          }}
        >
          <div
            className="aspect-square rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,.55)', backdropFilter: 'blur(6px)' }}
          >
            <span className="text-6xl md:text-7xl" style={{ color: 'var(--navy)' }}>Ô</span>
          </div>
          <p className="mt-4 text-center text-sm" style={{ color: '#3b3f48' }}>
            {locale==='de' ? 'Sonne über dem „ô“ – unser Leitmotiv.' : 'Sun above the “ô” — our motif.'}
          </p>
        </div>
      </div>
    </section>
  );
}
