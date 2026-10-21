'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Eye, EyeOff, Shield, X } from 'lucide-react';
import styles from './CookieBanner.module.css';

const COPY = {
  de: {
    title: 'Datenschutz',
    subtitle: 'EU-Hosting · keine Werbe-Tracker',
    body: 'Anonyme Nutzungsstatistik mit Matomo – nur mit deiner Einwilligung.',
    essential: 'Nur essenziell',
    acceptAll: 'Akzeptieren',
    settings: 'Einstellungen',
    less: 'Weniger',
    essentialTitle: 'Essenziell',
    essentialBody: 'Für Sitzung, Sprache und deine Cookie-Auswahl.',
    analyticsTitle: 'Analytics',
    analyticsBody: 'Anonyme Statistik mit Matomo auf EU-Servern.',
    save: 'Speichern',
    privacy: 'Datenschutz',
  },
  en: {
    title: 'Privacy',
    subtitle: 'EU hosting · no ad trackers',
    body: 'Anonymous Matomo analytics – only with your consent.',
    essential: 'Essential',
    acceptAll: 'Accept',
    settings: 'Settings',
    less: 'Less',
    essentialTitle: 'Essential',
    essentialBody: 'Required for session, language and your cookie choice.',
    analyticsTitle: 'Analytics',
    analyticsBody: 'Anonymous Matomo statistics on EU servers.',
    save: 'Save',
    privacy: 'Privacy',
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
    window.dispatchEvent(new Event('saimor-consent-change'));
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie_consent', analyticsEnabled ? 'analytics' : 'essential');
    localStorage.setItem('analytics_enabled', String(analyticsEnabled));
    setIsVisible(false);

    window.dispatchEvent(new Event('saimor-consent-change'));
  };

  const rejectAll = () => {
    localStorage.setItem('cookie_consent', 'essential');
    localStorage.setItem('analytics_enabled', 'false');
    setIsVisible(false);
    window.dispatchEvent(new Event('saimor-consent-change'));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (!isVisible || isEncounter) {
      root.style.setProperty('--consent-banner-height', '0px');
      return;
    }

    root.classList.add(styles.clearance);
    document.body.classList.add(styles.clearance);

    const publish = () => {
      const node = asideRef.current;
      if (!node) return;
      const style = getComputedStyle(node);
      const bottom = parseFloat(style.bottom) || 0;
      const safeArea = parseFloat(style.marginBottom) || 0;
      const height = Math.max(node.offsetHeight, node.getBoundingClientRect().height);
      root.style.setProperty('--consent-banner-height', `${Math.ceil(height + bottom + safeArea + 16)}px`);
    };

    publish();
    const observer = new ResizeObserver(publish);
    if (asideRef.current) observer.observe(asideRef.current);
    window.addEventListener('resize', publish);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', publish);
      root.classList.remove(styles.clearance);
      document.body.classList.remove(styles.clearance);
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          aria-label={copy.title}
          className={`${styles.banner} fixed bottom-3 left-3 right-3 z-[10000] sm:bottom-4 sm:left-4 sm:right-auto`}
        >
          <div className="max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border border-[#d8c69c]/20 bg-[#0b291e]/95 shadow-[0_8px_32px_rgba(2,18,10,.35)] backdrop-blur-xl sm:max-w-none">
            <div className="h-px bg-gradient-to-r from-[#d6a848]/60 via-[#7fd4c1]/40 to-transparent" />

            <div className="p-3">
              {!showDetails ? (
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#a9d3b6]/25 bg-[#a9d3b6]/[0.06] text-[#b8dec3]">
                    <Shield className="h-3.5 w-3.5" />
                  </div>
                  <span className="flex-1 min-w-[120px] text-[13px] leading-snug text-white/80">{copy.body}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={rejectAll}
                      className="min-h-[44px] min-w-[44px] rounded-full border border-white/40 px-3 py-2 text-[13px] font-semibold text-white/90 transition hover:border-white/60 hover:bg-white/10"
                    >
                      {copy.essential}
                    </button>
                    <button
                      type="button"
                      onClick={acceptAll}
                      className="min-h-[44px] min-w-[44px] rounded-full bg-[#f4efde] px-3 py-2 text-[13px] font-semibold text-[#102b1d] transition hover:bg-white"
                    >
                      {copy.acceptAll}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDetails(true)}
                      aria-expanded={showDetails}
                      className="ml-1 flex h-[44px] w-[44px] items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
                      aria-label={copy.settings}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  <a href={privacyHref} className="mt-2 block text-[12px] text-white/50 underline-offset-2 transition hover:text-white/80 hover:underline sm:hidden">
                    {copy.privacy}
                  </a>
                </div>
              ) : (
                <div className="w-[min(340px,calc(100vw-2rem))]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#a9d3b6]/25 bg-[#a9d3b6]/[0.06] text-[#b8dec3]">
                        <Shield className="h-3.5 w-3.5" />
                      </div>
                      <h2 className="text-[13px] font-semibold text-white/90">{copy.title}</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDetails(false)}
                      className="flex h-[44px] w-[44px] items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
                      aria-label={copy.less}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex min-h-[44px] items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 text-[#7fd4c1]" />
                        <span className="text-[13px] text-white/80">{copy.essentialTitle}</span>
                      </div>
                      <span className="font-mono text-[12px] uppercase tracking-[.1em] text-[#7fd4c1]/70">ON</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAnalyticsEnabled((value) => !value)}
                      className="flex min-h-[44px] w-full items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left transition hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-2">
                        {analyticsEnabled ? <Eye className="h-3.5 w-3.5 text-[#e7cd8c]" /> : <EyeOff className="h-3.5 w-3.5 text-white/40" />}
                        <span className="text-[13px] text-white/80">{copy.analyticsTitle}</span>
                      </div>
                      <span className={`font-mono text-[12px] uppercase tracking-[.1em] ${analyticsEnabled ? 'text-[#e7cd8c]' : 'text-white/35'}`}>
                        {analyticsEnabled ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <a href={privacyHref} className="text-[12px] text-white/60 underline-offset-2 transition hover:text-white/80 hover:underline">
                      {copy.privacy}
                    </a>
                    <button
                      type="button"
                      onClick={acceptSelected}
                      className="min-h-[44px] rounded-full border border-[#d6a848]/25 px-4 py-2 text-[13px] font-semibold text-[#e7cd8c] transition hover:border-[#d6a848]/50 hover:bg-[#d6a848]/10"
                    >
                      {copy.save}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
