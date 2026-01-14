'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Determine locale from pathname or default to 'de'
  const isEn = pathname?.startsWith('/en/') || pathname === '/en';
  const locale = isEn ? 'en' : 'de';

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}

