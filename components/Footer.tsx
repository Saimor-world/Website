import Image from 'next/image';
import Link from 'next/link';

const COPY = {
  de: { line: 'KI-Arbeitsräume und begrenzte Pilotprojekte.', contact: 'Kontakt', legal: 'Rechtliches', imprint: 'Impressum', privacy: 'Datenschutz', trust: 'Sicherheit' },
  en: { line: 'AI workspaces and limited pilot projects.', contact: 'Contact', legal: 'Legal', imprint: 'Imprint', privacy: 'Privacy', trust: 'Security' },
} as const;

export default function Footer({ locale }: { locale: 'de' | 'en' }) {
  const copy = COPY[locale];
  return <footer className="border-t border-white/8 bg-[#060a0b] px-5 py-10 text-white sm:px-7">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-white"><Image src="/saimor-logo-256.webp" alt="Saimôr" width={34} height={34} /></span><span><strong className="block font-serif text-xl font-medium tracking-wide">Saimôr</strong><span className="block text-xs text-white/34">{copy.line}</span></span></Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/48"><Link href={locale === 'de' ? '/mora' : '/en/mora'}>Môra</Link><Link href={locale === 'de' ? '/yori' : '/en/yori'}>YORI</Link><Link href="/demo">Demo</Link><Link href={`/${locale}#kontakt`}>{copy.contact}</Link><Link href={locale === 'de' ? '/de/trust' : '/en/trust'}>{copy.trust}</Link></nav>
      </div>
      <div className="mt-8 flex flex-col gap-4 border-t border-white/7 pt-6 text-xs text-white/28 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Saimôr</span><div className="flex flex-wrap gap-5"><span>{copy.legal}</span><Link href={locale === 'de' ? '/de/rechtliches/impressum' : '/en/legal/imprint'}>{copy.imprint}</Link><Link href={locale === 'de' ? '/de/rechtliches/datenschutz' : '/en/legal/privacy'}>{copy.privacy}</Link></div></div>
    </div>
  </footer>;
}
