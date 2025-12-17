'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, Home, Briefcase, Mail, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ locale }: { locale: 'de' | 'en' }) {
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
    { href: `/${locale}`, label: nav.home, icon: Home, isAnchor: false },
    { href: '#leistungen', label: nav.services, icon: Briefcase, isAnchor: true },
    { href: '#mission', label: nav.mission, icon: Sparkles, isAnchor: true },
    { href: '#kontakt', label: nav.contact, icon: Mail, isAnchor: true }
  ];

  const handleNavClick = (href: string, isAnchor: boolean, e: React.MouseEvent) => {
    setMenuOpen(false);
    if (isAnchor) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        // Element exists on current page, scroll to it
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Element doesn't exist on current page, navigate to home page with anchor
        // Use full URL with locale prefix: /de#leistungen or /en#leistungen
        const targetUrl = `/${locale}${href}`;
        window.location.href = targetUrl;
      }
    }
  };

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
        {/* Ambient Glow - Subtle */}
        <motion.div
          className="absolute inset-0 -m-12 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.15) 0%, transparent 60%)',
            filter: 'blur(32px)'
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Main Orb Container - Elegant & Refined */}
        <motion.div
          className="relative flex items-center gap-6 px-8 py-4 rounded-[32px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 35, 22, 0.85) 0%, rgba(26, 60, 50, 0.9) 50%, rgba(15, 35, 22, 0.85) 100%)',
            backdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(212, 180, 131, 0.2)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.03) inset,
              0 1px 2px rgba(255, 255, 255, 0.05) inset
            `,
            minWidth: 'min(90vw, 720px)'
          }}
          whileHover={{ 
            borderColor: 'rgba(212, 180, 131, 0.3)',
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.05) inset,
              0 1px 3px rgba(255, 255, 255, 0.08) inset,
              0 0 60px rgba(212, 180, 131, 0.08)
            `
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Subtle animated shimmer */}
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(212, 180, 131, 0.4) 50%, transparent 100%)',
            }}
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />

          {/* Content */}
          <div className="relative flex items-center gap-6 w-full">
            {/* Logo - Elegant Integration */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 group"
              onClick={() => {
                setMenuOpen(false);
                const event = new CustomEvent('saimor-logo-click');
                window.dispatchEvent(event);
              }}
            >
              <motion.div 
                className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 60, 50, 0.6) 0%, rgba(74, 103, 65, 0.4) 100%)',
                  border: '1px solid rgba(212, 180, 131, 0.25)',
                  boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(212, 180, 131, 0.4)',
                  boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.12), 0 4px 12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 180, 131, 0.15)'
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Subtle gold glow */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{ 
                    background: 'radial-gradient(circle at 50% 50%, rgba(212,180,131,0.3) 0%, transparent 70%)',
                  }}
                  animate={{
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
                <Image
                  src="/saimor-logo-new.png"
                  alt="Saimôr"
                  width={80}
                  height={80}
                  className="relative z-10 w-8 h-8 object-contain"
                  style={{ 
                    filter: 'brightness(1.2) contrast(1.15) drop-shadow(0 1px 3px rgba(212, 180, 131, 0.25))',
                  }}
                />
              </motion.div>

              <div className="flex flex-col -space-y-0.5">
                <motion.span
                  className="text-xl font-bold tracking-wide"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #E6C897 50%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  Saimôr
                </motion.span>
                <span
                  className="text-[10px] text-[#E6C897]/70 tracking-[0.4em] uppercase font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {locale === 'de' ? 'Klarheit' : 'Clarity'}
                </span>
              </div>
            </Link>

            {/* Elegant Divider */}
            <div className="h-6 w-px bg-gradient-to-b from-transparent via-[#D4A857]/30 to-transparent" />

            {/* Desktop Quick Links - Elegant */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(1, 3).map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                  className="relative px-4 py-2 text-sm font-medium text-white/85 hover:text-white rounded-lg transition-all cursor-pointer"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-white/5 border border-white/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: 1,
                      borderColor: 'rgba(212, 180, 131, 0.2)',
                      backgroundColor: 'rgba(212, 180, 131, 0.05)'
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* CTA Button - Refined */}
            <motion.a
              href="https://cal.com/saimor/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#1A3C32] transition-all relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #D4A857 0%, #E6C897 100%)',
                boxShadow: '0 4px 16px rgba(212, 168, 87, 0.25)'
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 6px 24px rgba(212, 168, 87, 0.35)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{locale === 'de' ? 'Gespräch buchen' : 'Book Call'}</span>
            </motion.a>

            {/* Menu Button - Elegant */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[#D4A857] transition-all"
              style={{
                background: 'rgba(212, 180, 131, 0.08)',
                border: '1px solid rgba(212, 180, 131, 0.2)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(212, 180, 131, 0.12)',
                borderColor: 'rgba(212, 180, 131, 0.3)',
                boxShadow: '0 4px 12px rgba(212, 180, 131, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
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
                    onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                    className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
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
                <span className="text-xs font-medium text-[#D4A857]">{locale === 'de' ? 'EN' : 'DE'}</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

