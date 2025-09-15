'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import BrandSun from './BrandSun';

export default function Navbar({ locale }: { locale: 'de'|'en' }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const switchLocale = locale === 'de' ? 'en' : 'de';
  const switchHref = `/${switchLocale}`;

  const nav = {
    de: { services: 'Leistungen', mission: 'Mission', contact: 'Kontakt' },
    en: { services: 'Services', mission: 'Mission', contact: 'Contact' }
  }[locale];

  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10 bg-navy/60">
      <nav className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <BrandSun className="h-7 w-7 transition-transform group-hover:scale-110" />
          <span className="font-serif text-xl tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Saimôr</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#leistungen" className="relative hover:text-gold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-200 hover:after:w-full">{nav.services}</a>
          <a href="#mission" className="relative hover:text-gold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-200 hover:after:w-full">{nav.mission}</a>
          <a href="#kontakt" className="relative hover:text-gold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-200 hover:after:w-full">{nav.contact}</a>
          <Link href={switchHref} className="px-4 py-2 rounded-full border border-white/20 hover:border-gold/60 hover:bg-gold/10 transition-all duration-200">
            {locale === 'de' ? 'EN' : 'DE'}
          </Link>
        </div>
        <button onClick={() => setOpen(v=>!v)} className="md:hidden p-2 rounded hover:bg-white/5" aria-label="open menu">
          <Menu />
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4">
            <a href="#leistungen" onClick={()=>setOpen(false)} className="hover:text-gold transition-colors">{nav.services}</a>
            <a href="#mission" onClick={()=>setOpen(false)} className="hover:text-gold transition-colors">{nav.mission}</a>
            <a href="#kontakt" onClick={()=>setOpen(false)} className="hover:text-gold transition-colors">{nav.contact}</a>
            <Link href={switchHref} onClick={()=>setOpen(false)} className="px-4 py-2 w-max rounded-full border border-white/20 hover:border-gold/60 transition-all">
              {locale === 'de' ? 'EN' : 'DE'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
