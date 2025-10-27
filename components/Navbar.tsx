'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Home, Briefcase, Mail, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ locale }: { locale: 'de'|'en' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const switchLocale = locale === 'de' ? 'en' : 'de';
  const switchHref = `/${switchLocale}`;

  const nav = {
    de: {
      home: 'Start',
      services: 'Leistungen',
      mission: 'Mission',
      contact: 'Kontakt'
    },
    en: {
      home: 'Home',
      services: 'Services',
      mission: 'Mission',
      contact: 'Contact'
    }
  }[locale];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: `/${locale}`, label: nav.home, icon: Home },
    { href: '#leistungen', label: nav.services, icon: Briefcase },
    { href: '#mission', label: nav.mission, icon: Sparkles },
    { href: '#kontakt', label: nav.contact, icon: Mail }
  ];

  return (
    <>
      {/* FLOATING CENTRAL ORB - komplett anders! */}
      <motion.div
        className="fixed top-12 left-1/2 z-50 pointer-events-auto"
        initial={{ y: -100, x: '-50%', scale: 0.8, opacity: 0 }}
        animate={{
          y: scrolled ? -8 : 0,
          x: '-50%',
          scale: scrolled ? 0.85 : 1,
          opacity: 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Ambient Glow */}
        <motion.div
          className="absolute inset-0 -m-8 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.25) 0%, transparent 70%)',
            filter: 'blur(24px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Main Orb Container */}
        <motion.div
          className="relative bg-gradient-to-br from-[#1a2e1a]/95 via-[#4A6741]/90 to-[#2d4a2d]/95 rounded-full shadow-2xl overflow-hidden"
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '2px solid rgba(212, 180, 131, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(212, 180, 131, 0.2), 0 0 40px rgba(212, 180, 131, 0.15)'
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {/* Rotating Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(212, 180, 131, 0.3), transparent)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Content */}
          <div className="relative px-6 py-3 flex items-center gap-4">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 group"
              onClick={(e) => {
                setMenuOpen(false);
                // Fire custom event for achievement tracking
                const event = new CustomEvent('saimor-logo-click');
                window.dispatchEvent(event);
              }}
            >
              {/* Animated S Logo */}
              <motion.div
                className="relative w-9 h-9 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <defs>
                    <linearGradient id="orbLogo" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#D4B483' }} />
                      <stop offset="100%" style={{ stopColor: '#E6C897' }} />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 15 12 Q 20 8, 28 11 Q 32 14, 31 20 Q 30 25, 24 26 L 22 26 Q 18 25, 17 22"
                    fill="url(#orbLogo)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M 25 28 Q 20 32, 12 29 Q 8 26, 9 20 Q 10 15, 16 14 L 18 14 Q 22 15, 23 18"
                    fill="url(#orbLogo)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
                  />
                </svg>
              </motion.div>

              {/* Wordmark */}
              <div className="flex flex-col -space-y-0.5">
                <span
                  className="text-lg font-bold tracking-wide bg-gradient-to-r from-white via-[#E6C897] to-white bg-clip-text text-transparent"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    textShadow: '0 2px 8px rgba(212, 180, 131, 0.3)'
                  }}
                >
                  Saimôr
                </span>
                <span
                  className="text-[9px] text-[#D4B483] tracking-widest uppercase opacity-70"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {locale === 'de' ? 'Klarheit' : 'Clarity'}
                </span>
              </div>
            </Link>

            {/* Divider */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-[#D4B483]/40 to-transparent" />

            {/* Desktop Quick Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.slice(1, 3).map((item, index) => (
                <div key={item.href} className="flex items-center gap-2">
                  <motion.a
                    href={item.href}
                    className="relative px-3 py-1.5 text-sm text-white/90 hover:text-white rounded-lg transition-colors group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.a>
                  {index < navItems.slice(1, 3).length - 1 && (
                    <span className="text-[#D4B483]/30 text-xs">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button - Desktop only */}
            <motion.a
              href="https://cal.com/saimor/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#D4B483] to-[#E6C897] shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>{locale === 'de' ? 'Gespräch buchen' : 'Book Call'}</span>
            </motion.a>

            {/* Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#D4B483]/20 to-[#E6C897]/10 flex items-center justify-center text-[#D4B483] hover:from-[#D4B483]/30 hover:to-[#E6C897]/20 transition-all"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              style={{
                border: '1px solid rgba(212, 180, 131, 0.3)',
                boxShadow: '0 4px 12px rgba(212, 180, 131, 0.2)'
              }}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* RADIAL MENU - expands from orb! */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-start justify-center pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"
              style={{ backdropFilter: 'blur(12px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Radial Menu Items */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              {navItems.map((item, i) => {
                const angle = (i / navItems.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                const ItemIcon = item.icon;

                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center gap-2 group"
                    initial={{ opacity: 0, scale: 0, x: '-50%', y: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: `calc(-50% + ${x}px)`,
                      y: y
                    }}
                    exit={{ opacity: 0, scale: 0, x: '-50%', y: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                    whileHover={{ scale: 1.1, y: y - 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Icon Orb */}
                    <motion.div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(212, 180, 131, 0.8) 100%)',
                        border: '2px solid rgba(212, 180, 131, 0.4)',
                        boxShadow: '0 8px 24px rgba(212, 180, 131, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)'
                      }}
                      whileHover={{
                        boxShadow: '0 12px 32px rgba(212, 180, 131, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <ItemIcon className="w-6 h-6" />
                    </motion.div>

                    {/* Label */}
                    <motion.span
                      className="text-sm font-semibold text-white px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(26, 46, 26, 0.9)',
                        border: '1px solid rgba(212, 180, 131, 0.3)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 + 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  </motion.a>
                );
              })}

              {/* Language Switcher - Center */}
              <motion.div
                className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
              >
                <Link
                  href={switchHref}
                  onClick={() => setMenuOpen(false)}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.3) 0%, rgba(230, 200, 151, 0.2) 100%)',
                    border: '2px solid rgba(212, 180, 131, 0.5)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 24px rgba(212, 180, 131, 0.2)'
                  }}
                >
                  <Globe className="w-5 h-5" />
                </Link>
                <span className="text-xs font-medium text-[#D4B483]">{locale === 'de' ? 'EN' : 'DE'}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
