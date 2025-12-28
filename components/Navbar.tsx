'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ locale }: { locale: 'de' | 'en' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const switchLocale = locale === 'de' ? 'en' : 'de';

  const getSwitchHref = () => {
    if (!pathname) return `/${switchLocale}`;
    if (pathname.startsWith('/de/') || pathname === '/de') {
      return pathname.replace('/de', '/en');
    }
    if (pathname.startsWith('/en/') || pathname === '/en') {
      return pathname.replace('/en', '/de');
    }
    return `/${switchLocale}${pathname === '/' ? '' : pathname}`;
  };

  const switchHref = getSwitchHref();
  const switchLabel = locale === 'de' ? 'EN' : 'DE';

  const nav = {
    de: {
      home: 'Start',
      mora: 'Môra',
      portal: 'Portal',
      contact: 'Kontakt',
      book: 'Gespräch buchen'
    },
    en: {
      home: 'Home',
      mora: 'Môra',
      portal: 'Portal',
      contact: 'Contact',
      book: 'Book a Call'
    }
  }[locale];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: `/${locale}`, label: nav.home, isAnchor: false },
    { href: `/${locale === 'de' ? '' : 'en/'}mora`, label: nav.mora, isAnchor: false, highlight: true },
    { href: `/${locale}/portal`, label: nav.portal, isAnchor: false },
    { href: '#kontakt', label: nav.contact, isAnchor: true },
  ];

  const handleNavClick = (href: string, isAnchor: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);

    if (isAnchor) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.location.href = `/${locale}${href}`;
      }
    } else {
      router.push(href);
    }
  };

  return (
    <>
      {/* 2026-Ready Minimal Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className={`relative flex items-center justify-between rounded-full transition-all duration-500 ${scrolled
                ? 'px-4 py-2 bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl'
                : 'px-6 py-3'
              }`}
            layout
          >
            {/* Logo */}
            <Link
              href={`/${locale}`}
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new CustomEvent('saimor-logo-click'));
              }}
              className="relative z-10"
            >
              <motion.div
                className="relative w-12 h-12 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(212, 168, 87, 0.3) 0%, rgba(26, 60, 50, 0.5) 50%, rgba(15, 35, 22, 0.7) 100%)',
                  border: '1px solid rgba(212, 180, 131, 0.25)',
                  boxShadow: '0 8px 32px rgba(212, 168, 87, 0.15), inset 0 0 20px rgba(212, 168, 87, 0.1)',
                }}
                whileHover={{ scale: 1.1, boxShadow: '0 12px 40px rgba(212, 168, 87, 0.25)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/saimor-logo-new.png"
                  alt="Saimôr"
                  width={48}
                  height={48}
                  className="w-8 h-8 object-contain"
                  style={{ filter: 'brightness(1.3) drop-shadow(0 2px 4px rgba(212, 168, 87, 0.4))' }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all ${item.highlight
                      ? 'text-[#D4A857] hover:text-[#E6C897]'
                      : 'text-white/70 hover:text-white'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.highlight && <Sparkles className="w-3.5 h-3.5" />}
                    {item.label}
                  </span>
                  {item.highlight && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#D4A857]/10 border border-[#D4A857]/20"
                      layoutId="nav-highlight"
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher - Minimal */}
              <Link href={switchHref}>
                <motion.button
                  className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-xs font-bold text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {switchLabel}
                </motion.button>
              </Link>

              {/* CTA Button - Desktop */}
              <motion.a
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0F1F17] rounded-full transition-all"
                style={{
                  background: 'linear-gradient(135deg, #D4A857 0%, #C49745 100%)',
                  boxShadow: '0 4px 16px rgba(212, 168, 87, 0.3)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(212, 168, 87, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                {nav.book}
              </motion.a>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/20"
                whileHover={{ scale: 1.1, borderColor: 'rgba(212, 168, 87, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation */}
              <nav className="flex flex-col items-center gap-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                    className={`text-3xl font-semibold ${item.highlight ? 'text-[#D4A857]' : 'text-white/80 hover:text-white'
                      }`}
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.highlight && <Sparkles className="inline w-5 h-5 mr-2" />}
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* CTA */}
              <motion.a
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 px-8 py-4 text-lg font-bold text-[#0F1F17] rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #D4A857 0%, #C49745 100%)',
                  boxShadow: '0 8px 32px rgba(212, 168, 87, 0.4)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {nav.book}
              </motion.a>

              {/* Language Switch */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (navItems.length + 1) * 0.1 }}
              >
                <Link
                  href={switchHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {locale === 'de' ? 'Switch to English' : 'Zur deutschen Seite'}
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
