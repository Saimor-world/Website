'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { localizedLegalHref } from '@/lib/legal-routes';

export default function Navbar({ locale }: { locale: 'de' | 'en' }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const home = `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const switchHref = (() => {
    const legal = pathname ? localizedLegalHref(pathname) : null;
    if (legal) return legal;
    if (pathname === '/mora') return '/en/mora';
    if (pathname === '/en/mora') return '/mora';
    if (pathname === '/yori') return '/en/yori';
    if (pathname === '/en/yori') return '/yori';
    if (pathname?.startsWith('/de/einstieg')) return pathname.replace('/de/einstieg', '/en/entry');
    if (pathname?.startsWith('/en/entry')) return pathname.replace('/en/entry', '/de/einstieg');
    return locale === 'de' ? '/en' : '/de';
  })();

  const copy = locale === 'de'
    ? { mora: 'Môra', products: 'Produkte', demo: 'Demo', contact: 'Kontakt', cta: 'Projekt anfragen', menu: 'Menü' }
    : { mora: 'Môra', products: 'Products', demo: 'Demo', contact: 'Contact', cta: 'Discuss a project', menu: 'Menu' };
  const items = [
    { href: locale === 'de' ? '/mora' : '/en/mora', label: copy.mora },
    { href: `${home}#produkte`, label: copy.products },
    { href: locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check', label: copy.demo },
    { href: `${home}#kontakt`, label: copy.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition ${scrolled ? 'border-white/10 bg-[#05090a]/88 shadow-[0_12px_36px_rgba(0,0,0,.3)] backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
        <a href={home} className="flex items-center gap-3" aria-label="Saimôr – Startseite">
          <Image src="/saimor-seal-256.webp" alt="" width={30} height={30} className="rounded-lg" priority />
          <span className="font-serif text-xl text-white/90">Saimôr</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          {items.map((item) => <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-white/55 transition hover:bg-white/5 hover:text-white">{item.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={switchHref} className="grid h-10 min-w-10 place-items-center rounded-full border border-white/10 px-3 text-xs font-semibold text-white/45 transition hover:text-white">{locale === 'de' ? 'EN' : 'DE'}</a>
          <a href={`${home}#kontakt`} className="hidden min-h-10 items-center gap-2 rounded-full bg-[#d6a848] px-4 py-2 text-sm font-bold text-[#151006] sm:inline-flex">{copy.cta}<ArrowRight className="h-4 w-4" /></a>
          <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 md:hidden" aria-label={copy.menu} aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open ? <nav className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#071011]/96 p-3 shadow-2xl backdrop-blur-xl md:hidden" aria-label="Mobile Navigation">{items.map((item) => <a key={item.href} href={item.href} className="flex min-h-12 items-center justify-between rounded-xl px-4 text-base text-white/72 hover:bg-white/5"><span>{item.label}</span><ArrowRight className="h-4 w-4 text-white/25" /></a>)}<a href={`${home}#kontakt`} className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-[#d6a848] px-4 text-sm font-bold text-[#151006]">{copy.cta}</a></nav> : null}
    </header>
  );
}
