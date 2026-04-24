'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginOverlay from './LoginOverlay';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Determine locale from pathname or default to 'de'
  const isEn = pathname?.startsWith('/en/') || pathname === '/en';
  const locale = isEn ? 'en' : 'de';

  // Listen for global login trigger
  useEffect(() => {
    const handleOpenLogin = (e: any) => {
      setIsLoginOpen(true);
    };
    window.addEventListener('open-login', handleOpenLogin);
    return () => window.removeEventListener('open-login', handleOpenLogin);
  }, []);

  return (
    <>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
      <LoginOverlay isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}

