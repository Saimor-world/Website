import Link from 'next/link';

type Props = {
  locale: 'de' | 'en';
  heading?: string;
  sub?: string;
  cta?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
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

  // korrekte Standard-Links pro Sprache
  const CTA_HREF =
    ctaHref ?? (locale === 'de' ? '/de/kontakt?licht=1' : '/en/contact?intro=1');
  const CTA = cta ?? (locale === 'de' ? 'Lichtgespräch' : 'Intro Call');

  const SEC_HREF =
    secondaryHref ?? (locale === 'de' ? '/de#angebot' : '/en#offering');
  const SEC_TEXT = secondaryText ?? (locale === 'de' ? 'Angebot ansehen' : 'View offering');

  return (
    <section className="relative section bg-band overflow-hidden">
      {/* ... Orbit / Überschrift / Subtext wie bei dir ... */}

      <div className="mt-10 flex items-center gap-6">
        <Link
          href={CTA_HREF}
          className="rounded-2xl px-5 py-2.5 text-sm font-medium transition border hover:bg-[color:var(--gold)] hover:text-[color:var(--navy)]"
          style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
        >
          {CTA}
        </Link>

        <Link
          href={SEC_HREF}
          className="text-sm hover:underline underline-offset-4"
          style={{ color: 'var(--ink)' }}
        >
          {SEC_TEXT}
        </Link>
      </div>
    </section>
  );
}
