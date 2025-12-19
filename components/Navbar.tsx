'use client';
import Link from 'next/link';
import Image from 'next/image';
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: `/${locale}`, label: nav.home, isAnchor: false },
    { href: '#leistungen', label: nav.services, isAnchor: true },
    { href: '#mission', label: nav.mission, isAnchor: true },
    { href: '#kontakt', label: nav.contact, isAnchor: true }
  ];

  const handleNavClick = (href: string, isAnchor: boolean, e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);

    if (isAnchor) {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        // Element exists on current page, scroll to it
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Element doesn't exist on current page, navigate to home page with anchor
        // Use window.location.href instead of router.push() for proper hash handling
        const targetUrl = `/${locale}${href}`;
        window.location.href = targetUrl;
      }
    } else {
      // For non-anchor links, use Next.js router for client-side navigation
      router.push(href);
    }
  };

  return (
    <>
      {/* Minimal Header - Only Logo Orb */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-center pt-6 px-4">
          {/* Logo Orb - Centered */}
          <motion.div
            className="pointer-events-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            <Link
              href={`/${locale}`}
              onClick={() => {
                setMenuOpen(false);
                const event = new CustomEvent('saimor-logo-click');
                window.dispatchEvent(event);
              }}
            >
              <motion.div
                className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden cursor-pointer group"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(212, 168, 87, 0.4) 0%, rgba(26, 60, 50, 0.6) 50%, rgba(15, 35, 22, 0.8) 100%)',
                  border: '1px solid rgba(212, 180, 131, 0.3)',
                  boxShadow: scrolled
                    ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(212, 168, 87, 0.2) inset'
                    : '0 12px 40px rgba(212, 168, 87, 0.2), 0 0 60px rgba(212, 168, 87, 0.15), 0 0 0 1px rgba(212, 168, 87, 0.25) inset',
                  backdropFilter: 'blur(20px)',
                }}
                animate={{
                  scale: scrolled ? 0.9 : 1,
                  boxShadow: scrolled
                    ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(212, 168, 87, 0.2) inset'
                    : '0 12px 40px rgba(212, 168, 87, 0.2), 0 0 60px rgba(212, 168, 87, 0.15), 0 0 0 1px rgba(212, 168, 87, 0.25) inset'
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 16px 48px rgba(212, 168, 87, 0.3), 0 0 80px rgba(212, 168, 87, 0.25), 0 0 0 1px rgba(212, 168, 87, 0.4) inset'
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(212, 168, 87, 0.5) 0%, transparent 70%)',
                  }}
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />

                {/* Logo Image */}
                <Image
                  src="/saimor-logo-new.png"
                  alt="Saimôr"
                  width={64}
                  height={64}
                  className="relative z-10 w-10 h-10 object-contain rounded-full"
                  style={{
                    filter: 'brightness(1.4) contrast(1.2) drop-shadow(0 2px 8px rgba(212, 168, 87, 0.5))',
                  }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Right Side - Menu & Language */}
          <div className="absolute right-4 top-6 flex items-center gap-3 pointer-events-auto">
            {/* Language Switcher */}
            <Link href={switchHref}>
              <motion.button
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{
                  scale: 1.1,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(212, 168, 87, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
              </motion.button>
            </Link>

            {/* Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              whileHover={{
                scale: 1.1,
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(212, 168, 87, 0.3)'
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
        </div>
      </motion.header>

      {/* Modern Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-gradient-to-br from-[#0F1F17] via-[#13261D] to-[#0F1F17] border-l border-white/10 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full pt-20 px-8">
                {/* Close Button */}
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  whileHover={{ scale: 1.1, background: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Navigation Items */}
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, item.isAnchor, e)}
                      className="relative px-6 py-4 text-lg font-medium text-white/80 hover:text-white rounded-2xl transition-all group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        background: 'rgba(212, 168, 87, 0.1)',
                        borderColor: 'rgba(212, 168, 87, 0.3)',
                        x: 8
                      }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4A857] to-[#E6C897] rounded-l-xl opacity-0 group-hover:opacity-100"
                        initial={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.a>
                  ))}
                </nav>

                {/* CTA Button */}
                <motion.a
                  href="https://cal.com/saimor/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto mb-8 px-6 py-4 text-lg font-semibold text-[#1A3C32] rounded-2xl text-center"
                  style={{
                    background: 'linear-gradient(135deg, #D4A857 0%, #E6C897 100%)',
                    boxShadow: '0 4px 20px rgba(212, 168, 87, 0.3)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 6px 30px rgba(212, 168, 87, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {locale === 'de' ? 'Gespräch buchen' : 'Book Call'}
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
