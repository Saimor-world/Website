'use client';

import BrandSigil from './BrandSigil';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, Menu, ShieldCheck, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MatomoEvents } from '@/lib/matomo';
import { localizedLegalHref } from '@/lib/legal-routes';
import ScrollAmbient from './ScrollAmbient';

type Locale = 'de' | 'en';

export default function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isLightPage = pathname === '/de/kontakt' || pathname === '/en/contact' || pathname === '/earth' || pathname === '/en/earth';
  const otherLocale = locale === 'de' ? 'en' : 'de';

  // globals.css gibt html UND body height:100% plus overflow-x:hidden - dadurch
  // wird body selbst zum Scroll-Container und window.scrollY bleibt immer 0.
  // Die Leiste blieb deshalb beim Scrollen durchsichtig, und Seitentext lief
  // unter Logo und Navigation durch. Beide Quellen lesen, im Capture-Modus
  // lauschen (body-Scroll-Events bubbeln nicht bis window).
  useEffect(() => {
    const onScroll = () => setScrolled(Math.max(window.scrollY, document.body.scrollTop, document.documentElement.scrollTop) > 18);
    onScroll();
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => document.removeEventListener('scroll', onScroll, { capture: true });
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const links = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a,button') || []);
    links()[0]?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== 'Tab') return;
      const items = [toggleRef.current, ...links()].filter(Boolean) as HTMLElement[];
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault(); items.at(-1)?.focus();
      } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
        event.preventDefault(); items[0]?.focus();
      }
    };
    const resize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    document.addEventListener('keydown', keyboard);
    window.addEventListener('resize', resize);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', keyboard);
      window.removeEventListener('resize', resize);
    };
  }, [menuOpen]);

  const getSwitchHref = () => {
    if (!pathname) return `/${otherLocale}`;
    if (pathname.startsWith('/de/einstieg')) return pathname.replace('/de/einstieg', '/en/entry');
    if (pathname.startsWith('/en/entry')) return pathname.replace('/en/entry', '/de/einstieg');

    const legal = localizedLegalHref(pathname);
    if (legal) return legal;

    const paired: Record<string, string> = {
      '/mora': '/en/mora',
      '/en/mora': '/mora',
      '/mora/deep-view': '/en/mora/deep-view',
      '/en/mora/deep-view': '/mora/deep-view',
      '/mora/deep-view/lab': '/en/mora/deep-view/lab',
      '/en/mora/deep-view/lab': '/mora/deep-view/lab',
      '/de/kontakt': '/en/contact',
      '/en/contact': '/de/kontakt',
      '/mora/analog-affect': '/en/mora/deep-view',
      '/en/mora/analog-affect': '/mora/deep-view',
      '/studio': '/en/studio',
      '/en/studio': '/studio',
      '/yori': '/en/yori',
      '/en/yori': '/yori',
      '/earth': '/en/earth',
      '/en/earth': '/earth',
    };
    if (paired[pathname]) return paired[pathname];
    if (['/portal', '/demo', '/wall', '/login'].includes(pathname)) return pathname;

    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'de' || segments[0] === 'en') {
      segments[0] = otherLocale;
      return '/' + segments.join('/');
    }
    if (pathname === '/' || pathname === '/de') return '/en';
    if (pathname === '/en') return '/de';
    return `/${otherLocale}${pathname}`;
  };

  const homeHref = `/${locale}`;
  const isHome = pathname === homeHref || (locale === 'de' && pathname === '/');
  const anchorHref = (id: string) => (isHome ? `#${id}` : `${homeHref}#${id}`);
  const securityHref = locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check';
  const moraHref = locale === 'de' ? '/mora' : '/en/mora';
  const loginHref = '/login?callbackUrl=%2Faccount%2Fbridge';

  const copy = locale === 'de'
    ? { system: 'Produkte', mora: 'Môra', yori: 'YORI', studio: 'Studio', entry: 'Security Check', login: 'Zugang', menu: 'Menü' }
    : { system: 'Products', mora: 'Môra', yori: 'YORI', studio: 'Studio', entry: 'Security Check', login: 'Access', menu: 'Menu' };

  const navItems = [
    { href: anchorHref('products'), label: copy.system },
    { href: moraHref, label: copy.mora },
    { href: locale === 'de' ? '/yori' : '/en/yori', label: copy.yori },
    { href: locale === 'de' ? '/studio' : '/en/studio', label: copy.studio },
  ];

  const track = (label: string) => MatomoEvents.navClick(label);

  return (
    <>
      <header data-public-header data-scrolled={scrolled} data-light={isLightPage} className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-4">
          <div className={`flex h-[50px] items-center justify-between bg-transparent px-1 transition-colors duration-200 md:h-[58px] md:border md:px-4 md:backdrop-blur-lg ${isLightPage
            ? (scrolled
              ? 'md:border-[#3a5e46]/25 md:bg-[#f6f4ec]/95 md:shadow-[0_8px_24px_rgba(23,57,42,.10)]'
              : 'md:border-[#3a5e46]/20 md:bg-[#f6f4ec]/90 md:shadow-[0_8px_24px_rgba(23,57,42,.08)]')
            : (scrolled
              ? 'md:border-[#b8dbc5]/[0.18] md:bg-[#10251c]/[.92] md:shadow-[0_8px_24px_rgba(3,15,10,.16)]'
              : 'md:border-transparent md:bg-transparent')
          }`}>
            <Link href={homeHref} className={`group flex h-12 w-12 items-center justify-center rounded-full border shadow-[0_7px_22px_rgba(3,21,12,.34)] backdrop-blur-xl md:h-auto md:w-auto md:justify-start md:gap-3 md:rounded-none md:border-0 md:bg-transparent md:shadow-none md:backdrop-blur-none ${isLightPage ? 'border-[#17392a]/15 bg-[#17392a]/90' : 'border-[#c4dfca]/25 bg-[#0d3024]/90'}`} aria-label={locale === 'de' ? 'Saimôr Startseite' : 'Saimôr home'} onClick={() => track('Saimôr')}>
              <span className="block h-9 w-9 shrink-0"><BrandSigil priority /></span>
              <span className="hidden sm:block">
                <span className={`block font-serif text-lg font-light leading-none tracking-[.02em] ${isLightPage ? 'text-[#17392a]' : 'text-[#f5f3e9]'}`}>Saimôr</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label={locale === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => track(item.label)} className={`px-3 py-2 font-mono text-[12px] font-semibold uppercase tracking-[.14em] transition ${isLightPage ? 'text-[#17392a]/70 hover:text-[#17392a]' : 'text-[#d9eadf]/70 hover:text-[#fffdf2]'}`}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <ScrollAmbient locale={locale} embedded />
              <Link href={getSwitchHref()} className={`hidden h-9 min-w-9 items-center justify-center border px-2 font-mono text-[12px] font-semibold tracking-[.1em] transition sm:flex ${isLightPage ? 'border-[#17392a]/20 bg-[#17392a]/8 text-[#17392a]/70 hover:border-[#17392a]/40 hover:text-[#17392a]' : 'border-[#a8cdb5]/20 bg-[#18382b]/62 text-[#e4eee7]/70 hover:border-[#b6d9c3]/34 hover:text-white'}`} aria-label={`Switch language to ${otherLocale.toUpperCase()}`}>{otherLocale.toUpperCase()}</Link>

              <a href={loginHref} className={`hidden h-9 items-center gap-2 border px-3 font-mono text-[12px] font-semibold uppercase tracking-[.1em] transition lg:flex ${isLightPage ? 'border-[#17392a]/20 bg-[#17392a]/8 text-[#17392a]/70 hover:border-[#17392a]/40 hover:text-[#17392a]' : 'border-[#a8cdb5]/20 bg-[#18382b]/62 text-[#e4eee7]/70 hover:border-[#b6d9c3]/34 hover:text-white'}`} onClick={() => track(copy.login)}>
                <LogIn className="h-3.5 w-3.5" />{copy.login}
              </a>

              <Link href={securityHref} className={`hidden h-9 items-center gap-2 px-3.5 font-mono text-[12px] font-bold uppercase tracking-[.1em] shadow-[0_6px_18px_rgba(55,103,73,.14)] transition md:flex ${isLightPage ? 'bg-[#17392a] text-[#f6f4ec] hover:bg-[#0e2419]' : 'bg-[#eef1df] text-[#102019] hover:bg-white'}`} onClick={() => track(copy.entry)}>
                <ShieldCheck className="h-3.5 w-3.5" />{copy.entry}
              </Link>

              <button ref={toggleRef} type="button" onClick={() => setMenuOpen((value) => !value)} className="grid h-12 w-12 place-items-center rounded-full border border-[#c7dfcf]/28 bg-[#0d3024]/90 text-[#f2f7f3]/92 shadow-[0_7px_22px_rgba(3,21,12,.34)] backdrop-blur-xl transition hover:border-[#e5e6bf]/60 hover:text-white md:hidden" aria-expanded={menuOpen} aria-controls="saimor-mobile-menu" aria-label={locale === 'de' ? (menuOpen ? 'Menü schließen' : 'Menü öffnen') : (menuOpen ? 'Close menu' : 'Open menu')}>
                {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div ref={menuRef} id="saimor-mobile-menu" role="dialog" aria-modal="true" aria-label={copy.menu} className="fixed inset-0 z-40 overflow-y-auto bg-[#18392b] px-5 pb-8 pt-24 md:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_4%_12%,rgba(116,190,139,.27),transparent_34%),radial-gradient(ellipse_at_96%_18%,rgba(102,166,121,.24),transparent_35%),radial-gradient(ellipse_at_50%_88%,rgba(79,143,101,.18),transparent_42%),linear-gradient(180deg,#1a402f_0%,#153529_52%,#1a3b2d_100%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[35%] h-72 w-72 -translate-x-1/2 rounded-full border border-[#e8d394]/30" />
          <div className="pointer-events-none absolute left-1/2 top-[35%] h-48 w-48 -translate-x-1/2 translate-y-12 rounded-full border border-[#9ad4bc]/25" />

          <div className="relative mx-auto flex h-full max-w-lg flex-col">
            <div className="font-mono text-[12px] tracking-[.25em] text-[#d9eadf]/68">SAIMÔR / NAVIGATION</div>

            <nav className="mt-7 border-t border-[#cce0d2]/22">
              {navItems.map((item, index) => (
                <Link key={item.href} href={item.href} onClick={() => { setMenuOpen(false); track(item.label); }} className="flex items-center justify-between border-b border-[#cce0d2]/20 py-4">
                  <span className="font-serif text-[32px] font-light tracking-[-.03em] text-[#fbfbf4]">{item.label}</span>
                  <span className="font-mono text-[12px] tracking-[.18em] text-[#d5e4d9]/62">0{index + 1}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto grid gap-2">
              <Link href={securityHref} onClick={() => track(copy.entry)} className="flex min-h-14 items-center justify-center gap-2 bg-[#eef1df] px-5 text-sm font-bold text-[#102019]">
                <ShieldCheck className="h-4 w-4" />
                {locale === 'de' ? 'Security Check starten' : 'Start Security Check'}
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a href={loginHref} className="flex min-h-12 items-center justify-center gap-2 border border-[#c7dfcf]/24 bg-[#204636]/72 text-xs font-semibold text-[#eef5ef]/86">
                  <LogIn className="h-3.5 w-3.5" />{copy.login}
                </a>
                <Link href={getSwitchHref()} className="flex min-h-12 items-center justify-center border border-[#c7dfcf]/24 bg-[#204636]/72 font-mono text-[12px] font-semibold tracking-[.18em] text-[#eef5ef]/82">{otherLocale.toUpperCase()}</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
