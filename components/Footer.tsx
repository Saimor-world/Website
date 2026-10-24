'use client';

import BrandSigil from './BrandSigil';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ResponsiveDetails from './ResponsiveDetails';
import ShareButton from '@/components/ShareButton';

type Locale = 'de' | 'en';
type SystemStatus = 'checking' | 'available' | 'limited' | 'unknown';

export default function Footer({ locale }: { locale: Locale }) {
  const [year, setYear] = useState('2026');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('checking');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    fetch('/api/health', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as { ok?: boolean } | null;
        if (!active) return;
        setSystemStatus(response.ok && payload?.ok === true ? 'available' : 'limited');
      })
      .catch((error: unknown) => {
        if (!active || (error instanceof DOMException && error.name === 'AbortError')) return;
        setSystemStatus('unknown');
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const c = locale === 'de'
    ? {
        system: 'System', overview: 'Übersicht', about: 'Über uns', studio: 'Studio', entry: 'Entry', access: 'Zugang', legal: 'Rechtliches',
        trust: 'Sicherheit', imprint: 'Impressum', privacy: 'Datenschutz', terms: 'AGB', refund: 'Widerruf',
        tagline: 'Arbeitsraum, Kontext und KI in einem System.',
        status: {
          checking: 'Status wird geprüft',
          available: 'Website erreichbar',
          limited: 'Website eingeschränkt',
          unknown: 'Status unbekannt',
        },
      }
    : {
        system: 'System', overview: 'Overview', about: 'About', studio: 'Studio', entry: 'Entry', access: 'Access', legal: 'Legal',
        trust: 'Security', imprint: 'Imprint', privacy: 'Privacy', terms: 'Terms', refund: 'Refund',
        tagline: 'Workspace, context and AI in one system.',
        status: {
          checking: 'Checking website status',
          available: 'Website available',
          limited: 'Website limited',
          unknown: 'Status unknown',
        },
      };

  const homeHref = `/${locale}`;
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const moraHref = locale === 'de' ? '/mora' : '/en/mora';
  const legal = {
    trust: locale === 'de' ? '/de/trust' : '/en/trust',
    imprint: locale === 'de' ? '/de/rechtliches/impressum' : '/en/legal/imprint',
    privacy: locale === 'de' ? '/de/rechtliches/datenschutz' : '/en/legal/privacy',
    terms: locale === 'de' ? '/de/rechtliches/agb' : '/en/legal/terms',
    refund: locale === 'de' ? '/de/rechtliches/widerruf' : '/en/legal/refund',
  };

  const dotClass = systemStatus === 'available'
    ? 'bg-[#7fd4c1] shadow-[0_0_12px_rgba(127,212,193,.7)]'
    : systemStatus === 'limited'
      ? 'bg-amber-300'
      : 'bg-white/30';

  return (
    <footer data-public-footer className="relative border-t border-white/[0.08] bg-[#050706] px-5 py-10 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto max-w-7xl">
        <div data-footer-grid className="grid gap-10 border-b border-white/[0.07] pb-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div data-footer-brand>
            <Link href={homeHref} className="inline-flex items-center gap-3">
              <span className="block h-11 w-11 shrink-0"><BrandSigil /></span>
              <span>
                <span className="block font-serif text-2xl font-light leading-none text-white/90">Saimôr</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">{c.tagline}</p>
          </div>

          <ResponsiveDetails title={c.system}>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <Link className="transition hover:text-white/82" href={`${homeHref}#system`}>{c.overview}</Link>
              <Link className="transition hover:text-white/82" href={locale === 'de' ? '/de/ueber' : '/en/about'}>{c.about}</Link>
              <Link className="transition hover:text-white/82" href={moraHref}>MÔRA</Link>
              <Link className="transition hover:text-white/82" href={locale === 'de' ? '/studio' : '/en/studio'}>{c.studio}</Link>
              <Link className="transition hover:text-white/82" href={securityHref}>{c.entry}</Link>
              <a className="transition hover:text-white/82" href={`/login?callbackUrl=%2Faccount%2Fbridge${locale === 'en' ? '&lang=en' : ''}`}>{c.access}</a>
            </div>
          </ResponsiveDetails>

          <ResponsiveDetails title={c.legal}>
            <div className="mt-4 grid gap-3 text-sm text-white/60">
              <Link className="transition hover:text-white/72" href={legal.trust}>{c.trust}</Link>
              <Link className="transition hover:text-white/72" href={legal.imprint}>{c.imprint}</Link>
              <Link className="transition hover:text-white/72" href={legal.privacy}>{c.privacy}</Link>
              <Link className="transition hover:text-white/72" href={legal.terms}>{c.terms}</Link>
              <Link className="transition hover:text-white/72" href={legal.refund}>{c.refund}</Link>
            </div>
          </ResponsiveDetails>
        </div>

        <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[.14em] text-white/55">
            <span>© {year} SAIMÔR</span>
            <span>EU / REMOTE</span>
          </div>

          <div className="flex items-center gap-3">
            <ShareButton locale={locale} />
            <div
              role="status"
              aria-live="polite"
              data-system-status={systemStatus}
              className="flex items-center gap-2 border border-white/[0.08] px-3 py-2"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${dotClass} ${systemStatus === 'checking' ? 'animate-pulse' : ''}`} />
              <span className="font-mono text-[12px] uppercase tracking-[.1em] text-white/60">{c.status[systemStatus]}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
