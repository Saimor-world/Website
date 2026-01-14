'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
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
    { href: '/mora', label: nav.mora, isAnchor: false },
    { href: `/${locale}/portal`, label: nav.portal, isAnchor: false },
    { href: '#kontakt', label: nav.contact, isAnchor: true },
  ];

  const handleNavClick = (href: string, isAnchor: boolean, e: React.MouseEvent) => {
    setMenuOpen(false);

    if (isAnchor) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        router.push(`/${locale}${href}`);
      }
    }
    // For non-anchor links, let the standard Link component handle it
  };

  return (
    <>
      {/* Ultra-Clean Transparent Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className={`relative flex items-center justify-between transition-all duration-500 ${scrolled
                ? 'px-6 py-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/5 shadow-2xl'
                : 'px-6 py-4'
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
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className="text-xl font-semibold text-white drop-shadow-lg"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Saimôr
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-full transition-all hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <Link href={switchHref}>
                <motion.button
                  className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-xs font-bold text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all hover:bg-white/5"
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
                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-all hover:bg-white/5"
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

      {/* Mobile Menu */}
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
              <motion.button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/20"
                whileHover={{ scale: 1.1, borderColor: 'rgba(212, 168, 87, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <nav className="flex flex-col items-center gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                      className="text-3xl font-semibold text-white/80 hover:text-white"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

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
