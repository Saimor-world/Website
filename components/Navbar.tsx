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

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
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
          <div className={`flex h-[58px] items-center justify-between border px-3.5 transition-colors duration-200 sm:px-4 ${scrolled
            ? 'border-[#b8dbc5]/[0.18] bg-[#17372a]/96 shadow-[0_8px_24px_rgba(3,15,10,.16)] md:bg-[#10251c]/88 md:backdrop-blur-lg'
            : 'border-transparent bg-transparent'
          }`}>
            <a href={homeHref} className="group flex items-center gap-3" aria-label={locale === 'de' ? 'Saimôr Startseite' : 'Saimôr home'} onClick={() => track('Saimôr')}>
              <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[#e0c77c]/38 bg-[#183a2c]/76">
                <Image src="/saimor-seal-256.webp" alt="Saimôr" width={31} height={31} priority className="object-contain mix-blend-screen opacity-100" />
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#9be0c9]" />
              </span>
              <span className="hidden sm:block">
                <span className="block font-serif text-lg font-light leading-none tracking-[.02em] text-[#f5f3e9]">Saimôr</span>
                <span className="mt-1 block font-mono text-[8px] tracking-[.24em] text-[#bad4c2]/58">SYSTEM / 00</span>
              </span>
            </a>

            <nav className="hidden items-center gap-1 md:flex" aria-label={locale === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => track(item.label)} className="px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#d9eadf]/66 transition hover:text-[#fffdf2]">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a href={getSwitchHref()} className="hidden h-9 min-w-9 items-center justify-center border border-[#a8cdb5]/20 bg-[#18382b]/62 px-2 font-mono text-[9px] font-semibold tracking-[.14em] text-[#e4eee7]/68 transition hover:border-[#b6d9c3]/34 hover:text-white sm:flex" aria-label={`Switch language to ${otherLocale.toUpperCase()}`}>{otherLocale.toUpperCase()}</a>

              <a href={loginHref} className="hidden h-9 items-center gap-2 border border-[#a8cdb5]/20 bg-[#18382b]/62 px-3 font-mono text-[9px] font-semibold uppercase tracking-[.14em] text-[#e4eee7]/70 transition hover:border-[#b6d9c3]/34 hover:text-white lg:flex" onClick={() => track(copy.login)}>
                <LogIn className="h-3.5 w-3.5" />{copy.login}
              </a>

              <a href={securityHref} className="hidden h-9 items-center gap-2 bg-[#eef1df] px-3.5 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#102019] shadow-[0_6px_18px_rgba(55,103,73,.14)] transition hover:bg-white md:flex" onClick={() => track(copy.entry)}>
                <ShieldCheck className="h-3.5 w-3.5" />{copy.entry}
              </a>

              <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-[#c7dfcf]/28 bg-[#1b3d2f]/78 text-[#f2f7f3]/92 transition hover:border-[#d0e3d5]/42 hover:text-white md:hidden" aria-expanded={menuOpen} aria-controls="saimor-mobile-menu" aria-label={menuOpen ? `${copy.menu} schließen` : `${copy.menu} öffnen`}>
                {menuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="saimor-mobile-menu" className="fixed inset-0 z-40 overflow-hidden bg-[#18392b] px-5 pb-8 pt-24 md:hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_4%_12%,rgba(116,190,139,.27),transparent_34%),radial-gradient(ellipse_at_96%_18%,rgba(102,166,121,.24),transparent_35%),radial-gradient(ellipse_at_50%_88%,rgba(79,143,101,.18),transparent_42%),linear-gradient(180deg,#1a402f_0%,#153529_52%,#1a3b2d_100%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[35%] h-72 w-72 -translate-x-1/2 rounded-full border border-[#e8d394]/30" />
          <div className="pointer-events-none absolute left-1/2 top-[35%] h-48 w-48 -translate-x-1/2 translate-y-12 rounded-full border border-[#9ad4bc]/25" />

          <div className="relative mx-auto flex h-full max-w-lg flex-col">
            <div className="font-mono text-[9px] tracking-[.25em] text-[#d9eadf]/68">SAIMÔR / NAVIGATION</div>

            <nav className="mt-12 border-t border-[#cce0d2]/22">
              {navItems.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => { setMenuOpen(false); track(item.label); }} className="flex items-center justify-between border-b border-[#cce0d2]/20 py-5">
                  <span className="font-serif text-4xl font-light tracking-[-.03em] text-[#fbfbf4]">{item.label}</span>
                  <span className="font-mono text-[9px] tracking-[.18em] text-[#d5e4d9]/62">0{index + 1}</span>
                </a>
              ))}
            </nav>

            <div className="mt-auto grid gap-2">
              <a href={securityHref} onClick={() => track(copy.entry)} className="flex min-h-14 items-center justify-center gap-2 bg-[#eef1df] px-5 text-sm font-bold text-[#102019]">
                <ShieldCheck className="h-4 w-4" />
                {locale === 'de' ? 'Security Check / System betreten' : 'Security Check / Enter system'}
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a href={loginHref} className="flex min-h-12 items-center justify-center gap-2 border border-[#c7dfcf]/24 bg-[#204636]/72 text-xs font-semibold text-[#eef5ef]/86">
                  <LogIn className="h-3.5 w-3.5" />{copy.login}
                </a>
                <a href={getSwitchHref()} className="flex min-h-12 items-center justify-center border border-[#c7dfcf]/24 bg-[#204636]/72 font-mono text-[10px] font-semibold tracking-[.18em] text-[#eef5ef]/82">{otherLocale.toUpperCase()}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
