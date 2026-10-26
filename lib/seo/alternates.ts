import type { Metadata } from 'next';

/**
 * DE/EN page pairs. Each page sets its own canonical and hreflang from here,
 * so subpages never inherit the locale home ('/de', '/en') as canonical.
 */
export const LOCALE_PAIRS: ReadonlyArray<{ de: string; en: string }> = [
  { de: '/de', en: '/en' },
  { de: '/de/kontakt', en: '/en/contact' },
  { de: '/de/einstieg', en: '/en/entry' },
  { de: '/de/trust', en: '/en/trust' },
  { de: '/de/ueber', en: '/en/about' },
  { de: '/de/finance', en: '/en/finance' },
  { de: '/de/rechtliches/impressum', en: '/en/legal/imprint' },
  { de: '/de/rechtliches/datenschutz', en: '/en/legal/privacy' },
  { de: '/de/rechtliches/agb', en: '/en/legal/terms' },
  { de: '/de/rechtliches/widerruf', en: '/en/legal/refund' },
];

/** Canonical = the page itself; hreflang = its DE/EN pair, x-default = German. */
export function localeAlternates(path: string): NonNullable<Metadata['alternates']> {
  const pair = LOCALE_PAIRS.find((p) => p.de === path || p.en === path);
  if (!pair) throw new Error(`No DE/EN pair for ${path}`);
  return { canonical: path, languages: { de: pair.de, en: pair.en, 'x-default': pair.de } };
}

/** Entry detail pages share their slug across languages. */
export function entryAlternates(locale: 'de' | 'en', slug: string): NonNullable<Metadata['alternates']> {
  const de = `/de/einstieg/${slug}`;
  const en = `/en/entry/${slug}`;
  return { canonical: locale === 'de' ? de : en, languages: { de, en, 'x-default': de } };
}
