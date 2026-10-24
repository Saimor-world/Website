'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

/** Shared unprefixed pages (/login, /demo, /wall) take ?lang=en from English entry points. */
export const SHARED_LOCALE_PATHS = ['/login', '/demo', '/wall'];

export function usePublicLocale(): 'de' | 'en' {
  const pathname = usePathname();
  const [langEn, setLangEn] = useState(false);
  useEffect(() => {
    setLangEn(new URLSearchParams(window.location.search).get('lang') === 'en');
  }, [pathname]);
  if (pathname === '/en' || pathname?.startsWith('/en/')) return 'en';
  if (pathname && SHARED_LOCALE_PATHS.includes(pathname) && langEn) return 'en';
  return 'de';
}
