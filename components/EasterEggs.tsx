'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getAchievementManager, type Achievement, type AchievementLocale } from '@/lib/achievements';
import AchievementButton from './AchievementButton';
import AchievementToast from './AchievementToast';

const LAST_VISIT_KEY = 'saimor-last-visit';
const RETURN_CHECK_KEY = 'saimor-return-checked';
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function normalizePath(pathname: string) {
  const normalized = pathname.replace(/^\/(de|en)(?=\/|$)/, '');
  return normalized || '/';
}

export default function EasterEggs() {
  const pathname = usePathname() ?? '/';
  const locale: AchievementLocale = pathname.startsWith('/en') ? 'en' : 'de';
  const managerRef = useRef(getAchievementManager());
  const logoClicksRef = useRef(0);
  const logoTimerRef = useRef<number | null>(null);
  const konamiIndexRef = useRef(0);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [resonance, setResonance] = useState(false);

  const unlock = useCallback((id: string) => {
    const item = managerRef.current.unlock(id);
    if (item) setNewAchievement(item);
    return item;
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const expected = KONAMI[konamiIndexRef.current];
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (key === expected) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current < KONAMI.length) return;

        konamiIndexRef.current = 0;
        setResonance(true);
        unlock('konami');
        window.dispatchEvent(new CustomEvent('saimor-achievement-menu-open'));
        window.setTimeout(() => setResonance(false), 3200);
        return;
      }

      konamiIndexRef.current = key === KONAMI[0] ? 1 : 0;
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [unlock]);

  useEffect(() => {
    const timer = window.setTimeout(() => unlock('silent-observer'), 12000);
    return () => window.clearTimeout(timer);
  }, [unlock]);

  useEffect(() => {
    const path = normalizePath(pathname);
    if (path.startsWith('/mora')) unlock('mora-explorer');
    if (path.startsWith('/demo')) unlock('demo-explorer');
    if (path.startsWith('/trust') || path.startsWith('/legal') || path.startsWith('/rechtliches')) unlock('clarity-navigator');
  }, [pathname, unlock]);

  useEffect(() => {
    let finished = false;
    const onScroll = () => {
      if (finished) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0 || window.scrollY / total < 0.9) return;
      finished = true;
      unlock('scroll-champion');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [unlock]);

  useEffect(() => {
    try {
      const previousVisit = localStorage.getItem(LAST_VISIT_KEY);
      const checked = sessionStorage.getItem(RETURN_CHECK_KEY);
      if (previousVisit && !checked) {
        unlock('return-visitor');
        sessionStorage.setItem(RETURN_CHECK_KEY, '1');
      }
      localStorage.setItem(LAST_VISIT_KEY, Date.now().toString());
    } catch { /* Private browsing may block storage. */ }
  }, [unlock]);

  useEffect(() => {
    const onContact = () => unlock('first-contact');
    const onLogoClick = () => {
      logoClicksRef.current += 1;
      if (logoTimerRef.current !== null) window.clearTimeout(logoTimerRef.current);
      logoTimerRef.current = window.setTimeout(() => { logoClicksRef.current = 0 }, 1600);
      if (logoClicksRef.current < 4) return;
      logoClicksRef.current = 0;
      unlock('quad_logo');
    };
    window.addEventListener('saimor-contact-submitted', onContact);
    window.addEventListener('saimor-logo-click', onLogoClick);
    return () => {
      window.removeEventListener('saimor-contact-submitted', onContact);
      window.removeEventListener('saimor-logo-click', onLogoClick);
      if (logoTimerRef.current !== null) window.clearTimeout(logoTimerRef.current);
    };
  }, [unlock]);

  return (
    <>
      {resonance ? (
        <div className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(209,183,111,.12),transparent_28%),radial-gradient(circle_at_20%_75%,rgba(74,125,86,.12),transparent_32%)] animate-pulse" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#d9c17d]/50 to-transparent shadow-[0_0_28px_rgba(217,193,125,.35)]" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[.28em] text-[#eadba9]/60">
            RESONANCE LAYER // 1986
          </div>
        </div>
      ) : null}
      <AchievementToast achievement={newAchievement} onClose={() => setNewAchievement(null)} locale={locale} />
      <AchievementButton />
    </>
  );
}
