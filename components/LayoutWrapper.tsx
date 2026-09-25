'use client';

import { usePathname } from 'next/navigation';
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
  const isImmersive = isYori || isClientWorld;

  // YORI and personalized Worlds are immersive surfaces. Public-site chrome
  // would pull the user out of the room and make the pilot feel like a page
  // inside the marketing site rather than the product itself.
  if (isImmersive) return <>{children}</>;

  return (
    <>
      <DesktopDiscoveries />
      <CommandPalette />
      <ScrollProgress />
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
