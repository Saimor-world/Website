'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

export default function Navbar({ locale }: { locale: 'de'|'en' }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const switchLocale = locale === 'de' ? 'en' : 'de';
  const switchHref = `/${switchLocale}`;

  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10 bg-navy/60">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="font-serif text-lg tracking-wide">Saimôr</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <a href="#leistungen" className="hover:text-gold transition">Leistungen</a>
          <a href="#mission" className="hover:text-gold transition">Mission</a>
          <a href="#kontakt" className="hover:text-gold transition">Kontakt</a>
          <Link href={switchHref} className="px-3 py-1 rounded-full border border-white/15 hover:border-gold/60 transition">
            {locale === 'de' ? 'EN' : 'DE'}
          </Link>
        </div>
        <button onClick={() => setOpen(v=>!v)} className="md:hidden p-2 rounded hover:bg-white/5" aria-label="open menu">
          <Menu />
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-2">
            <a href="#leistungen" onClick={()=>setOpen(false)}>Leistungen</a>
            <a href="#mission" onClick={()=>setOpen(false)}>Mission</a>
            <a href="#kontakt" onClick={()=>setOpen(false)}>Kontakt</a>
            <Link href={switchHref} onClick={()=>setOpen(false)} className="px-3 py-1 w-max rounded-full border border-white/15">
              {locale === 'de' ? 'EN' : 'DE'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
