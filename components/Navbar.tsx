'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';

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
    <header
      className="sticky top-0 z-30 backdrop-blur-md border-b"
      style={{
        background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.85) 0%, rgba(93, 124, 84, 0.8) 100%)',
        border: '1px solid rgba(212, 180, 131, 0.3)',
        boxShadow: '0 4px 12px rgba(74, 103, 65, 0.15)'
      }}
    >
      <nav className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-saimor-gold to-saimor-gold-light flex items-center justify-center text-saimor-green-dark font-bold transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">S</div>
          <span className="font-serif text-xl tracking-wide text-white" style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Saimôr</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#leistungen" className="relative text-white hover:text-saimor-gold-light transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-full" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{nav.services}</a>
          <a href="#mission" className="relative text-white hover:text-saimor-gold-light transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-full" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{nav.mission}</a>
          <a href="#kontakt" className="relative text-white hover:text-saimor-gold-light transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-saimor-gold after:transition-all after:duration-300 hover:after:w-full" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{nav.contact}</a>
          <Link
            href={switchHref}
            className="px-5 py-2.5 rounded-full font-semibold text-white transition-all duration-300 backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(212, 180, 131, 0.2) 100%)',
              border: '1px solid rgba(212, 180, 131, 0.4)',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212, 180, 131, 0.3) 0%, rgba(230, 200, 151, 0.4) 100%)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(212, 180, 131, 0.2) 100%)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {locale === 'de' ? 'EN' : 'DE'}
          </Link>
        </div>
        <button onClick={() => setOpen(v=>!v)} className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white" aria-label="open menu">
          <Menu />
        </button>
      </nav>
      {open && (
        <div
          className="md:hidden border-t px-4 pb-4"
          style={{
            borderColor: 'rgba(212, 180, 131, 0.3)',
            background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.9) 0%, rgba(93, 124, 84, 0.85) 100%)'
          }}
        >
          <div className="flex flex-col gap-4 pt-4">
            <a href="#leistungen" onClick={()=>setOpen(false)} className="text-white hover:text-saimor-gold-light transition-colors" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{nav.services}</a>
            <a href="#mission" onClick={()=>setOpen(false)} className="text-white hover:text-saimor-gold-light transition-colors" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{nav.mission}</a>
            <a href="#kontakt" onClick={()=>setOpen(false)} className="text-white hover:text-saimor-gold-light transition-colors" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{nav.contact}</a>
            <Link
              href={switchHref}
              onClick={()=>setOpen(false)}
              className="px-4 py-2 w-max rounded-full text-white font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(212, 180, 131, 0.2) 100%)',
                border: '1px solid rgba(212, 180, 131, 0.4)',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              {locale === 'de' ? 'EN' : 'DE'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
