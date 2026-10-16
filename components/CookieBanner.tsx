'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Eye, EyeOff, Shield } from 'lucide-react';

const COPY = {
  de: {
    title: 'Datenschutz',
    subtitle: 'EU-Hosting · keine Werbe-Tracker',
    body: 'Anonyme Nutzungsstatistik mit Matomo – nur mit deiner Einwilligung.',
    essential: 'Nur Essenziell',
    acceptAll: 'Alle akzeptieren',
    settings: 'Einstellungen',
    less: 'Weniger anzeigen',
    essentialTitle: 'Essenziell',
    essentialBody: 'Für Sitzung, Sprache und deine Cookie-Auswahl.',
    analyticsTitle: 'Analytics',
    analyticsBody: 'Anonyme Statistik mit Matomo auf EU-Servern.',
    save: 'Auswahl speichern',
    privacy: 'Datenschutzerklärung',
  },
  en: {
    title: 'Privacy',
    subtitle: 'EU hosting · no ad trackers',
    body: 'Anonymous Matomo analytics – only with your consent.',
    essential: 'Essential only',
    acceptAll: 'Accept all',
    settings: 'Settings',
    less: 'Show less',
    essentialTitle: 'Essential',
    essentialBody: 'Required for session, language and your cookie choice.',
    analyticsTitle: 'Analytics',
    analyticsBody: 'Anonymous Matomo statistics on EU servers.',
    save: 'Save selection',
    privacy: 'Privacy policy',
  },
} as const;

export default function CookieBanner() {
  const pathname = usePathname();
  // The staged encounter has no data-dependent features or analytics opt-in.
  // Keep the existing preference; visitors can choose on the public pages.
  const isEncounter = pathname === '/mora/deep-view' || pathname === '/en/mora/deep-view';
  const locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const copy = COPY[locale];

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const asideRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isEncounter) return;

    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = window.setTimeout(() => setIsVisible(true), 1800);
      return () => window.clearTimeout(timer);
    }
  }, [mounted, isEncounter]);

  const acceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('analytics_enabled', 'true');
    setIsVisible(false);
    window._paq?.push(['rememberCookieConsentGiven']);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie_consent', analyticsEnabled ? 'analytics' : 'essential');
    localStorage.setItem('analytics_enabled', String(analyticsEnabled));
    setIsVisible(false);

    if (analyticsEnabled) {
      window._paq?.push(['rememberCookieConsentGiven']);
    } else {
      window._paq?.push(['forgetCookieConsentGiven']);
      window._paq?.push(['optUserOut']);
    }
  };

  const rejectAll = () => {
    localStorage.setItem('cookie_consent', 'essential');
    localStorage.setItem('analytics_enabled', 'false');
    setIsVisible(false);
    window._paq?.push(['forgetCookieConsentGiven']);
    window._paq?.push(['optUserOut']);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (!isVisible || isEncounter) {
      root.style.setProperty('--consent-banner-height', '0px');
      return;
    }

    const publish = () => {
      const node = asideRef.current;
      if (!node) return;
      // bottom-3 / sm:bottom-5 plus etwas Luft, damit der Inhalt nicht klebt
      root.style.setProperty('--consent-banner-height', `${Math.round(node.offsetHeight) + 32}px`);
    };

    publish();
    const observer = new ResizeObserver(publish);
    if (asideRef.current) observer.observe(asideRef.current);
    window.addEventListener('resize', publish);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', publish);
      root.style.setProperty('--consent-banner-height', '0px');
    };
  }, [isVisible, showDetails, isEncounter]);

  const privacyHref = locale === 'en' ? '/en/legal/privacy' : '/de/rechtliches/datenschutz';

  if (isEncounter) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          ref={asideRef}
          role="dialog"
          aria-modal={false}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          aria-label={copy.title}
          className="fixed bottom-2 left-2 right-2 z-[10000] sm:bottom-5 sm:left-5 sm:right-auto sm:w-[min(430px,calc(100vw-2.5rem))]"
        >
          <div className="max-h-[min(78dvh,640px)] overflow-y-auto overscroll-contain rounded-[1.3rem] border border-[#d8c69c]/25 bg-[#0b291e]/[0.96] shadow-[0_14px_48px_rgba(2,18,10,.42)] backdrop-blur-xl">
            <div className="h-px bg-gradient-to-r from-[#d6a848]/70 via-[#7fd4c1]/55 to-transparent" />

            <div className="p-3.5 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#a9d3b6]/30 bg-[#a9d3b6]/[0.07] text-[#b8dec3] sm:h-9 sm:w-9">
                  <Shield className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-white/92">{copy.title}</h2>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[.12em] text-white/60">{copy.subtitle}</p>
                </div>
              </div>

              <p className="mt-2 text-[12px] leading-[1.5] text-white/78 sm:mt-3 sm:text-[13px]">{copy.body}</p>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="min-h-11 rounded-full border border-white/50 px-2 py-2.5 text-xs font-semibold text-white transition hover:border-white/80 hover:bg-white/10"
                >
                  {copy.essential}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="min-h-11 rounded-full bg-[#f4efde] px-2 py-2.5 text-xs font-semibold text-[#102b1d] transition hover:bg-white"
                >
                  {copy.acceptAll}
                </button>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <button
                  type="button"
                  onClick={() => setShowDetails((value) => !value)}
                  aria-expanded={showDetails}
                  className="inline-flex min-h-9 items-center gap-1.5 text-[11px] font-medium text-white/80 underline-offset-4 transition hover:text-white hover:underline"
                >
                  <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.18 }}>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </motion.span>
                  {showDetails ? copy.less : copy.settings}
                </button>
                <a href={privacyHref} className="inline-flex min-h-9 items-center text-[11px] text-white/70 underline-offset-4 transition hover:text-white hover:underline">
                  {copy.privacy}
                </a>
              </div>

              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-2 border-t border-white/[0.08] pt-3">
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7fd4c1]/10 text-[#7fd4c1]">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white/82">{copy.essentialTitle}</div>
                            <div className="mt-0.5 text-[10px] leading-4 text-white/36">{copy.essentialBody}</div>
                          </div>
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[.12em] text-[#7fd4c1]/65">ON</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAnalyticsEnabled((value) => !value)}
                        className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3 text-left transition hover:bg-white/[0.04]"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#d6a848]/10 text-[#e7cd8c]">
                            {analyticsEnabled ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white/82">{copy.analyticsTitle}</div>
                            <div className="mt-0.5 text-[10px] leading-4 text-white/36">{copy.analyticsBody}</div>
                          </div>
                        </div>
                        <span className={`font-mono text-[9px] uppercase tracking-[.12em] ${analyticsEnabled ? 'text-[#e7cd8c]' : 'text-white/28'}`}>
                          {analyticsEnabled ? 'ON' : 'OFF'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={acceptSelected}
                        className="mt-1 min-h-10 w-full rounded-full border border-[#d6a848]/22 px-4 py-2 text-xs font-semibold text-[#e7cd8c] transition hover:border-[#d6a848]/45 hover:text-[#f3dda4]"
                      >
                        {copy.save}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>


            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
