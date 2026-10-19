'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandPalette from './CommandPalette';
import ScrollProgress from './ScrollProgress';
import DesktopDiscoveries from './DesktopDiscoveries';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en/') || pathname === '/en';
  const locale = isEn ? 'en' : 'de';
  const isYori = pathname === '/yori' || pathname === '/en/yori';
  const isClientWorld = pathname?.startsWith('/world/');
  // Owner console (login, chat, finance, …) is its own surface. Marketing
  // chrome (global nav / footer) overlaps sticky owner headers on desktop
  // (~1024px) and pulls the operator out of the room — same rationale as YORI.
  const isOwnerSurface = Boolean(pathname?.startsWith('/owner'));
  const isEncounter = pathname === '/mora/deep-view' || pathname === '/en/mora/deep-view';
  const isImmersive = isYori || isClientWorld || isOwnerSurface || isEncounter;

  useEffect(() => {
    if (isClientWorld || isOwnerSurface) return;
    const previous = document.documentElement.lang;
    document.documentElement.lang = locale;
    document.documentElement.dataset.publicReady = 'true';
    return () => {
      document.documentElement.lang = previous;
      delete document.documentElement.dataset.publicReady;
    };
  }, [locale, isClientWorld, isOwnerSurface]);

  // Immersive surfaces render without public-site chrome.
  if (isImmersive) return isEncounter ? <div data-public-site>{children}</div> : <>{children}</>;

  return (
    <div data-public-site>
      <DesktopDiscoveries />
      <CommandPalette />
      <ScrollProgress />
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
