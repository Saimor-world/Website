'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Check, ChevronDown, Eye, EyeOff, Shield } from 'lucide-react';

const COPY = {
  de: {
    title: 'Datenschutz',
    subtitle: 'EU-Hosting · keine Werbe-Tracker',
    body: 'Matomo hilft uns mit anonymen Nutzungsstatistiken. Analytics ist optional.',
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
    body: 'Matomo helps us understand anonymous usage. Analytics is optional.',
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
  const locale = pathname?.startsWith('/en') ? 'en' : 'de';
  const copy = COPY[locale];

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = window.setTimeout(() => setIsVisible(true), 1800);
      return () => window.clearTimeout(timer);
    }
  }, [mounted]);

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

  const privacyHref = locale === 'en' ? '/en/legal/privacy' : '/de/rechtliches/datenschutz';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          aria-label={copy.title}
          className="fixed bottom-3 left-3 right-3 z-[10000] sm:bottom-5 sm:left-5 sm:right-auto sm:w-[min(430px,calc(100vw-2.5rem))]"
        >
          <div className="overflow-hidden rounded-[1.4rem] border border-white/[0.12] bg-[#07110e]/[0.97] shadow-[0_24px_70px_rgba(0,0,0,.6)] backdrop-blur-2xl">
            <div className="h-px bg-gradient-to-r from-[#d6a848]/70 via-[#7fd4c1]/55 to-transparent" />

            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#7fd4c1]/20 bg-[#7fd4c1]/[0.06] text-[#9de3d2]">
                  <Shield className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold text-white/92">{copy.title}</h2>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[.15em] text-white/34">{copy.subtitle}</p>
                </div>
              </div>

              <p className="mt-3 text-[12px] leading-5 text-white/56 sm:text-[13px]">{copy.body}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="min-h-11 rounded-full border border-white/16 px-3 py-2.5 text-xs font-semibold text-white/76 transition hover:border-white/30 hover:text-white"
                >
                  {copy.essential}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="min-h-11 rounded-full bg-[#e7eadf] px-3 py-2.5 text-xs font-bold text-[#08100d] transition hover:bg-white"
                >
                  {copy.acceptAll}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowDetails((value) => !value)}
                aria-expanded={showDetails}
                className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-white/42 transition hover:text-white/72"
              >
                <motion.span animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.18 }}>
                  <ChevronDown className="h-3.5 w-3.5" />
                </motion.span>
                {showDetails ? copy.less : copy.settings}
              </button>

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

              <a href={privacyHref} className="mt-2 inline-block text-[10px] text-white/28 underline-offset-2 transition hover:text-white/55 hover:underline">
                {copy.privacy}
              </a>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
