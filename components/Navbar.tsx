'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogIn, Menu, ShieldCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MatomoEvents } from '@/lib/matomo';
import { localizedLegalHref } from '@/lib/legal-routes';

type Locale = 'de' | 'en';

export default function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const otherLocale = locale === 'de' ? 'en' : 'de';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
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
      '/mora/analog-affect': '/en/mora/analog-affect',
      '/en/mora/analog-affect': '/mora/analog-affect',
      '/yori': '/en/yori',
      '/en/yori': '/yori',
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
    ? { system: 'System', mora: 'Môra', studio: 'Studio', entry: 'Entry', login: 'Zugang', menu: 'Menü' }
    : { system: 'System', mora: 'Môra', studio: 'Studio', entry: 'Entry', login: 'Access', menu: 'Menu' };

  const navItems = [
    { href: anchorHref('system'), label: copy.system },
    { href: moraHref, label: copy.mora },
    { href: anchorHref('studio'), label: copy.studio },
  ];

  const track = (label: string) => MatomoEvents.navClick(label);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-4">
          <div
            className={`flex h-[58px] items-center justify-between border px-3.5 transition-all duration-300 sm:px-4 ${
              scrolled
                ? 'border-white/[0.09] bg-[#050706]/86 shadow-[0_14px_50px_rgba(0,0,0,.28)] backdrop-blur-2xl'
                : 'border-transparent bg-transparent'
            }`}
          >
            <a
              href={homeHref}
              className="group flex items-center gap-3"
              aria-label={locale === 'de' ? 'Saimôr Startseite' : 'Saimôr home'}
              onClick={() => track('Saimôr')}
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[#d6a848]/24 bg-black/25">
                <Image
                  src="/saimor-seal-256.webp"
                  alt="Saimôr"
                  width={31}
                  height={31}
                  priority
                  className="object-contain mix-blend-screen opacity-95"
                />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#7fd4c1] shadow-[0_0_12px_rgba(127,212,193,.8)]" />
              </span>
              <span className="hidden sm:block">
                <span className="block font-serif text-lg font-light leading-none tracking-[.02em] text-white/92">Saimôr</span>
                <span className="mt-1 block font-mono text-[8px] tracking-[.24em] text-white/26">SYSTEM / 00</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label={locale === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => track(item.label)}
                  className="px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-white/38 transition hover:text-white/82"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href={getSwitchHref()}
                className="hidden h-9 min-w-9 items-center justify-center border border-white/[0.08] px-2 font-mono text-[9px] font-semibold tracking-[.14em] text-white/35 transition hover:border-white/18 hover:text-white/75 sm:flex"
                aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
              >
                {otherLocale.toUpperCase()}
              </a>

              <a
                href={loginHref}
                className="hidden h-9 items-center gap-2 border border-white/[0.08] px-3 font-mono text-[9px] font-semibold uppercase tracking-[.14em] text-white/42 transition hover:border-white/18 hover:text-white/82 lg:flex"
                onClick={() => track(copy.login)}
              >
                <LogIn className="h-3.5 w-3.5" />
                {copy.login}
              </a>

              <a
                href={securityHref}
                className="hidden h-9 items-center gap-2 bg-[#e7eadf] px-3.5 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#08100d] transition hover:bg-white md:flex"
                onClick={() => track(copy.entry)}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {copy.entry}
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] text-white/64 transition hover:border-white/25 hover:text-white md:hidden"
                aria-expanded={menuOpen}
                aria-controls="saimor-mobile-menu"
                aria-label={menuOpen ? `${copy.menu} schließen` : `${copy.menu} öffnen`}
              >
                {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="saimor-mobile-menu" className="fixed inset-0 z-40 bg-[#050706] px-5 pb-8 pt-24 md:hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[.25] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:38px_38px]" />
          <div className="pointer-events-none absolute left-1/2 top-[34%] h-72 w-72 -translate-x-1/2 rounded-full border border-[#d6a848]/12" />
          <div className="pointer-events-none absolute left-1/2 top-[34%] h-48 w-48 -translate-x-1/2 translate-y-12 rounded-full border border-[#7fd4c1]/10" />

          <div className="relative mx-auto flex h-full max-w-lg flex-col">
            <div className="font-mono text-[9px] tracking-[.25em] text-white/25">SAIMÔR / NAVIGATION</div>

            <nav className="mt-12 border-t border-white/[0.09]">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMenuOpen(false);
                    track(item.label);
                  }}
                  className="flex items-center justify-between border-b border-white/[0.08] py-5"
                >
                  <span className="font-serif text-4xl font-light tracking-[-.03em] text-white/88">{item.label}</span>
                  <span className="font-mono text-[9px] tracking-[.18em] text-white/22">0{index + 1}</span>
                </a>
              ))}
            </nav>

            <div className="mt-auto grid gap-2">
              <a
                href={securityHref}
                onClick={() => track(copy.entry)}
                className="flex min-h-14 items-center justify-center gap-2 bg-[#e7eadf] px-5 text-sm font-bold text-[#08100d]"
              >
                <ShieldCheck className="h-4 w-4" />
                {locale === 'de' ? 'Security Check / System betreten' : 'Security Check / Enter system'}
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={loginHref}
                  className="flex min-h-12 items-center justify-center gap-2 border border-white/[0.1] text-xs font-semibold text-white/58"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  {copy.login}
                </a>
                <a
                  href={getSwitchHref()}
                  className="flex min-h-12 items-center justify-center border border-white/[0.1] font-mono text-[10px] font-semibold tracking-[.18em] text-white/48"
                >
                  {otherLocale.toUpperCase()}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
