'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import CommandPalette from './CommandPalette';
import ScrollProgress from './ScrollProgress';
import DesktopDiscoveries from './DesktopDiscoveries';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en/') || pathname === '/en';
  const locale = isEn ? 'en' : 'de';
  const isYori = pathname === '/yori' || pathname === '/en/yori';
  const isPrivateWorld = pathname?.startsWith('/world/');
  const isImmersive = isYori || isPrivateWorld;

  // YORI and private Client Worlds are intentionally immersive surfaces.
  // Their own navigation and identity would be diluted by the public
  // Saimôr header/footer, cookie banner, achievement/discovery gamification
  // and Cmd+K public-site palette around them.
  if (isImmersive) return <>{children}</>;

  return (
    <>
      <DesktopDiscoveries />
      <CommandPalette />
      <ScrollProgress />
      <CookieBanner />
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
