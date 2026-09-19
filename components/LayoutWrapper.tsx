'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en/') || pathname === '/en';
  const locale = isEn ? 'en' : 'de';
  const isYori = pathname === '/yori' || pathname === '/en/yori';
  const isPrivateWorld = pathname?.startsWith('/world/');

  // YORI and private Client Worlds are intentionally immersive surfaces.
  // Their own navigation and identity would be diluted by the public
  // Saimôr header/footer around them.
  if (isYori || isPrivateWorld) return <>{children}</>;

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
