'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
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
        system: 'System', studio: 'Studio', entry: 'Entry', access: 'Zugang', legal: 'Rechtliches',
        trust: 'Sicherheit', imprint: 'Impressum', privacy: 'Datenschutz', terms: 'AGB', refund: 'Widerruf',
        tagline: 'Arbeitsraum, Kontext und KI in einem System.',
        status: {
          checking: 'Status wird geprüft',
          available: 'System verfügbar',
          limited: 'System eingeschränkt',
          unknown: 'Status unbekannt',
        },
      }
    : {
        system: 'System', studio: 'Studio', entry: 'Entry', access: 'Access', legal: 'Legal',
        trust: 'Security', imprint: 'Imprint', privacy: 'Privacy', terms: 'Terms', refund: 'Refund',
        tagline: 'Workspace, context and AI in one system.',
        status: {
          checking: 'Checking system status',
          available: 'System available',
          limited: 'System limited',
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
    <footer className="relative border-t border-white/[0.08] bg-[#050706] px-5 py-10 text-white sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/[0.07] pb-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <a href={homeHref} className="inline-flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center rounded-full border border-[#d6a848]/22 bg-black/25">
                <Image
                  src="/saimor-sigil.svg"
                  alt="Saimôr"
                  width={36}
                  height={36}
                  className="object-contain mix-blend-screen opacity-95"
                />
              </span>
              <span>
                <span className="block font-serif text-2xl font-light leading-none text-white/90">Saimôr</span>
                <span className="mt-1.5 block font-mono text-[8px] tracking-[.24em] text-white/24">SYSTEM / WORLD</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/34">{c.tagline}</p>
          </div>

          <div>
            <div className="font-mono text-[9px] uppercase tracking-[.22em] text-[#d6a848]/52">System</div>
            <div className="mt-4 grid gap-3 text-sm text-white/42">
              <a className="transition hover:text-white/82" href={`${homeHref}#system`}>{c.system}</a>
              <a className="transition hover:text-white/82" href={moraHref}>Môra</a>
              <a className="transition hover:text-white/82" href={`${homeHref}#studio`}>{c.studio}</a>
              <a className="transition hover:text-white/82" href={securityHref}>{c.entry}</a>
              <a className="transition hover:text-white/82" href="/login?callbackUrl=%2Faccount%2Fbridge">{c.access}</a>
            </div>
          </div>

          <div>
            <div className="font-mono text-[9px] uppercase tracking-[.22em] text-white/22">{c.legal}</div>
            <div className="mt-4 grid gap-3 text-sm text-white/34">
              <a className="transition hover:text-white/72" href={legal.trust}>{c.trust}</a>
              <a className="transition hover:text-white/72" href={legal.imprint}>{c.imprint}</a>
              <a className="transition hover:text-white/72" href={legal.privacy}>{c.privacy}</a>
              <a className="transition hover:text-white/72" href={legal.terms}>{c.terms}</a>
              <a className="transition hover:text-white/72" href={legal.refund}>{c.refund}</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[8px] uppercase tracking-[.2em] text-white/18">
            <span>© {year} SAIMÔR</span>
            <span>EU / REMOTE</span>
          </div>

          <div className="flex items-center gap-3">
            <ShareButton />
            <div
              role="status"
              aria-live="polite"
              data-system-status={systemStatus}
              className="flex items-center gap-2 border border-white/[0.08] px-3 py-2"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${dotClass} ${systemStatus === 'checking' ? 'animate-pulse' : ''}`} />
              <span className="font-mono text-[8px] uppercase tracking-[.16em] text-white/28">{c.status[systemStatus]}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
