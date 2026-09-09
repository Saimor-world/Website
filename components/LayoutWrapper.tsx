'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en/') || pathname === '/en';
  const locale = isEn ? 'en' : 'de';
  const isYori = pathname === '/yori' || pathname === '/en/yori';

  // YORI is intentionally a second world inside Saimôr. Its garden arrival
  // already carries its own back-navigation and identity; the OS navigation
  // and World footer would visually pull the visitor back into the forest.
  if (isYori) return <>{children}</>;

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
