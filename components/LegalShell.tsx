import Link from 'next/link';
import type { ReactNode } from 'react';

type LegalLocale = 'de' | 'en';

type LegalShellProps = {
  children: ReactNode;
  locale: LegalLocale;
};

const legalNavigation = {
  de: {
    eyebrow: 'Saimôr World',
    title: 'Rechtliches & Transparenz',
    description:
      'Informationen und Bedingungen – ruhig lesbar, klar gegliedert und jederzeit erreichbar.',
    label: 'Rechtliche Dokumente',
    home: 'Zur Startseite',
    items: [
      { href: '/de/rechtliches/impressum', label: 'Impressum' },
      { href: '/de/rechtliches/datenschutz', label: 'Datenschutz' },
      { href: '/de/rechtliches/agb', label: 'AGB' },
      { href: '/de/rechtliches/widerruf', label: 'Widerruf' },
    ],
  },
  en: {
    eyebrow: 'Saimôr World',
    title: 'Legal & Transparency',
    description:
      'Information and terms – calm to read, clearly structured, and always accessible.',
    label: 'Legal documents',
    home: 'Back to home',
    items: [
      { href: '/en/legal/imprint', label: 'Imprint' },
      { href: '/en/legal/privacy', label: 'Privacy' },
      { href: '/en/legal/terms', label: 'Terms' },
      { href: '/en/legal/refund', label: 'Refunds' },
    ],
  },
} satisfies Record<LegalLocale, {
  eyebrow: string;
  title: string;
  description: string;
  label: string;
  home: string;
  items: Array<{ href: string; label: string }>;
}>;

export default function LegalShell({ children, locale }: LegalShellProps) {
  const copy = legalNavigation[locale];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#081410] pb-24 pt-28 text-white selection:bg-emerald-400/25">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-24 h-[34rem] w-[34rem] rounded-full bg-emerald-500/[0.07] blur-[130px]" />
        <div className="absolute -right-48 top-[28rem] h-[38rem] w-[38rem] rounded-full bg-cyan-400/[0.05] blur-[150px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <header className="mb-8 border-b border-white/10 pb-8 pt-8 sm:mb-10 sm:pt-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/75">
                {copy.eyebrow}
              </p>
              <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl">
                {copy.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
                {copy.description}
              </p>
            </div>
            <Link
              href={`/${locale}`}
              className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span aria-hidden="true">←</span>
              {copy.home}
            </Link>
          </div>

          <nav aria-label={copy.label} className="mt-8 flex flex-wrap gap-2">
            {copy.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-white/65 transition-colors hover:border-emerald-300/30 hover:bg-emerald-300/[0.07] hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <div
          className={[
            'overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]',
            'shadow-[0_28px_100px_rgba(0,0,0,0.24)] backdrop-blur-sm',
            '[&_main.section]:!py-10 sm:[&_main.section]:!py-14',
            '[&_h1]:font-serif [&_h1]:!text-white',
            '[&_h2]:!text-white [&_h3]:!text-white/90',
            '[&_.text-slate-800]:!text-white [&_.text-slate-700]:!text-white/70 [&_.text-slate-600]:!text-white/50',
            '[&_.bg-slate-50]:!bg-white/[0.045] [&_.bg-slate-100]:!bg-white/[0.035]',
            '[&_.border-yellow-200]:!border-emerald-300/15',
            '[&_.from-yellow-50]:!from-emerald-300/[0.08] [&_.to-yellow-100]:!to-cyan-300/[0.05]',
            '[&_a]:!text-emerald-300 hover:[&_a]:!text-emerald-200',
          ].join(' ')}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
