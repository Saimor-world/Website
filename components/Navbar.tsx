'use client';
// Link removed - using native <a> tags for full page reloads
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ locale }: { locale: 'de' | 'en' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const switchLocale = locale === 'de' ? 'en' : 'de';

  const getSwitchHref = () => {
    if (!pathname) return `/${switchLocale}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'de' || segments[0] === 'en') {
      segments[0] = switchLocale;
      return '/' + segments.join('/');
    }
    // Handle root /mora specially if needed, or just prefix
    if (pathname === '/mora') return '/en/mora';
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
    { href: locale === 'de' ? '/mora' : '/en/mora', label: nav.mora, isAnchor: false },
    { href: `/${locale}/portal`, label: nav.portal, isAnchor: false },
    { href: `/${locale}#kontakt`, label: nav.contact, isAnchor: true },
  ];

  const handleNavClick = (href: string, isAnchor: boolean, e: React.MouseEvent) => {
    setMenuOpen(false);

    if (isAnchor) {
      const [path, hash] = href.split('#');
      const isOnTargetPage = pathname === path || (path === '/de' && pathname === '/') || (path === '/en' && pathname === '/en');
      
      if (isOnTargetPage) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Let standard navigation happen
      }
    }
  };

  return (
    <>
      {/* Sleek Premium Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div
            className={`relative flex items-center justify-between transition-all duration-500 ${scrolled
                ? 'px-5 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                : 'px-5 py-3'
              }`}
          >
            {/* Logo */}
            <a
              href={`/${locale}`}
              onClick={() => {
                setMenuOpen(false);
                window.dispatchEvent(new CustomEvent('saimor-logo-click'));
              }}
              className="relative z-10 group"
            >
              <motion.div
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative w-8 h-8 overflow-hidden rounded-lg bg-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all">
                  <Image 
                    src="/saimor-logo-new.png"
                    alt="Saimôr"
                    width={28}
                    height={28}
                    className="object-contain scale-[1.3]"
                    priority
                  />
                </div>
                <span
                  className="text-lg font-medium text-white/90 hidden sm:block tracking-wide"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Saimôr
                </span>
              </motion.div>
            </a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                item.isAnchor ? (
                  <button
                    key={item.href}
                    onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                    className="relative px-4 py-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 text-[13px] font-medium text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                )
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <motion.a 
                href={switchHref}
                className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-[11px] font-bold text-white/50 hover:text-white border border-white/10 hover:border-emerald-500/30 transition-all hover:bg-white/5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {switchLabel}
              </motion.a>

              {/* CTA Button - Desktop */}
              <motion.a
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-5 py-2 text-[12px] font-bold text-white rounded-xl transition-all bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="tracking-wide">{nav.book}</span>
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
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{
                background: 'linear-gradient(135deg, rgba(8, 20, 16, 0.98) 0%, rgba(5, 18, 8, 0.95) 100%)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
            >
              {/* Decorative background elements */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
                style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]"
                style={{ background: 'rgba(6, 182, 212, 0.08)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Menu Content */}
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setMenuOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/20 hover:border-emerald-500/50 transition-colors"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Logo */}
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/saimor-logo-new.png"
                    alt="Saimôr"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </motion.div>

              {/* Navigation Items */}
              <nav className="flex flex-col items-center gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.15 + index * 0.08, type: 'spring', stiffness: 100 }}
                  >
                    {item.isAnchor ? (
                      <motion.button
                        onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                        className="text-3xl font-semibold text-white/70 hover:text-white py-2 px-6 rounded-xl transition-colors"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.button>
                    ) : (
                      <motion.a
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-3xl font-semibold text-white/70 hover:text-white py-2 px-6 rounded-xl transition-colors block"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.a
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 px-8 py-4 text-lg font-bold text-[#0F1F17] rounded-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #D4A857 0%, #C49745 100%)',
                  boxShadow: '0 8px 32px rgba(212, 168, 87, 0.4)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring' }}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(212, 168, 87, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10">{nav.book}</span>
              </motion.a>

              {/* Language Switch */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href={switchHref}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                >
                  <Globe className="w-4 h-4" />
                  {locale === 'de' ? 'Switch to English' : 'Zur deutschen Seite'}
                </a>
              </motion.div>

              {/* Keyboard Hint */}
              <motion.div
                className="absolute bottom-8 text-[10px] text-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono mr-2">⌘K</kbd>
                {locale === 'de' ? 'Schnellnavigation' : 'Quick navigation'}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
