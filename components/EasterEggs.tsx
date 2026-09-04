'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getAchievementManager, type Achievement, type AchievementLocale } from '@/lib/achievements';
import AchievementButton from './AchievementButton';
import AchievementToast from './AchievementToast';

const LAST_VISIT_KEY = 'saimor-last-visit';
const RETURN_CHECK_KEY = 'saimor-return-checked';

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
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const unlock = useCallback((id: string) => {
    const item = managerRef.current.unlock(id);
    if (item) setNewAchievement(item);
  }, []);

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
      <AchievementToast achievement={newAchievement} onClose={() => setNewAchievement(null)} locale={locale} />
      <AchievementButton />
    </>
  );
}
