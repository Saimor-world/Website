'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sparkles, Circle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Navbar({ locale }: { locale: 'de'|'en' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const pathname = usePathname();
  const switchLocale = locale === 'de' ? 'en' : 'de';
  const switchHref = `/${switchLocale}`;
  const headerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const nav = {
    de: {
      services: 'Leistungen',
      mission: 'Mission',
      contact: 'Kontakt',
      tagline: 'Klarheit im Wandel'
    },
    en: {
      services: 'Services',
      mission: 'Mission',
      contact: 'Contact',
      tagline: 'Clarity in Change'
    }
  }[locale];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // Create particles on hover
    if (Math.random() > 0.95) {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setParticles(prev => [...prev.slice(-8), newParticle]);

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 1500);
    }
  };

  return (
    <motion.header
      ref={headerRef}
      onMouseMove={handleMouseMove}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-30 transition-all duration-500 border-b overflow-hidden"
      style={{
        background: scrolled
          ? 'linear-gradient(135deg, rgba(26, 46, 26, 0.95) 0%, rgba(74, 103, 65, 0.9) 100%)'
          : 'linear-gradient(135deg, rgba(26, 46, 26, 0.85) 0%, rgba(74, 103, 65, 0.75) 100%)',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'blur(12px) saturate(150%)',
        border: `1px solid rgba(212, 180, 131, ${scrolled ? '0.5' : '0.25'})`,
        boxShadow: scrolled
          ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(212, 180, 131, 0.15)'
          : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(212, 180, 131, 0.1)'
      }}
    >
      {/* Floating Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0, x: particle.x, y: particle.y }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            y: particle.y - 40
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute pointer-events-none"
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #D4B483 0%, transparent 70%)',
            boxShadow: '0 0 8px #D4B483'
          }}
        />
      ))}

      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between relative">
        {/* Logo with Morphing Animation */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group relative z-10">
          <motion.div
            className="relative h-10 w-10 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated Background Rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #D4B483 0%, #6B8E5F 100%)',
                opacity: 0.2
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Pulsing Glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, #D4B483 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* SVG Logo */}
            <svg
              viewBox="0 0 40 40"
              className="relative z-10 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#D4B483' }} />
                  <stop offset="100%" style={{ stopColor: '#E6C897' }} />
                </linearGradient>
              </defs>
              {/* Stylized 'S' */}
              <motion.path
                d="M 15 12 Q 20 8, 28 11 Q 32 14, 31 20 Q 30 25, 24 26 L 22 26 Q 18 25, 17 22"
                fill="url(#logoGrad)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.path
                d="M 25 28 Q 20 32, 12 29 Q 8 26, 9 20 Q 10 15, 16 14 L 18 14 Q 22 15, 23 18"
                fill="url(#logoGrad)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>

          {/* Wordmark */}
          <div className="flex flex-col -space-y-1">
            <motion.span
              className="font-serif text-xl md:text-2xl font-bold tracking-wide bg-gradient-to-r from-white via-[#E6C897] to-white bg-clip-text text-transparent"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                textShadow: '0 2px 8px rgba(212, 180, 131, 0.3)'
              }}
              whileHover={{ scale: 1.02 }}
            >
              Saimôr
            </motion.span>
            <motion.span
              className="text-[10px] md:text-xs text-[#D4B483] tracking-wider uppercase opacity-80"
              style={{ fontFamily: 'Inter, sans-serif' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {nav.tagline}
            </motion.span>
          </div>
        </Link>
        {/* Desktop Navigation with Magnetic Effect */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '#leistungen', label: nav.services },
            { href: '#mission', label: nav.mission },
            { href: '#kontakt', label: nav.contact }
          ].map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-white group cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <span className="relative z-10" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                {link.label}
              </span>
              {/* Magnetic Underline */}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#D4B483] to-[#E6C897]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  boxShadow: '0 0 8px rgba(212, 180, 131, 0.6)'
                }}
              />
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'radial-gradient(circle at center, rgba(212, 180, 131, 0.15), transparent)',
                  filter: 'blur(8px)'
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}

          {/* Language Switcher - Liquid Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href={switchHref}
              className="relative px-5 py-2.5 rounded-full font-semibold text-white overflow-hidden group"
            >
              {/* Liquid Background */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.2) 0%, rgba(230, 200, 151, 0.3) 100%)',
                  backdropFilter: 'blur(12px)'
                }}
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(212, 180, 131, 0.2) 0%, rgba(230, 200, 151, 0.3) 100%)',
                    'linear-gradient(135deg, rgba(230, 200, 151, 0.3) 0%, rgba(212, 180, 131, 0.2) 100%)',
                    'linear-gradient(135deg, rgba(212, 180, 131, 0.2) 0%, rgba(230, 200, 151, 0.3) 100%)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle at center, rgba(212, 180, 131, 0.4), transparent)',
                  filter: 'blur(12px)'
                }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                <Circle className="w-2 h-2 fill-current" />
                {locale === 'de' ? 'EN' : 'DE'}
              </span>
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid rgba(212, 180, 131, 0.5)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button - Smooth */}
        <motion.button
          onClick={() => setOpen(v => !v)}
          className="md:hidden p-2 rounded-lg relative overflow-hidden text-white z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="toggle menu"
        >
          <motion.div
            className="absolute inset-0 bg-white/10"
            animate={{
              opacity: open ? 1 : 0,
              scale: open ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Menu />
          </motion.div>
        </motion.button>
      </nav>

      {/* Mobile Menu - Slide Animation */}
      <motion.div
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="md:hidden overflow-hidden border-t"
        style={{
          borderColor: 'rgba(212, 180, 131, 0.3)',
          background: 'linear-gradient(135deg, rgba(26, 46, 26, 0.95) 0%, rgba(74, 103, 65, 0.9) 100%)',
          backdropFilter: 'blur(16px)'
        }}
      >
        <div className="flex flex-col gap-1 p-4">
          {[
            { href: '#leistungen', label: nav.services },
            { href: '#mission', label: nav.mission },
            { href: '#kontakt', label: nav.contact }
          ].map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="relative px-4 py-3 text-white rounded-lg overflow-hidden"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: open ? 0 : -20, opacity: open ? 1 : 0 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#D4B483]/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                {link.label}
              </span>
            </motion.a>
          ))}

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: open ? 0 : -20, opacity: open ? 1 : 0 }}
            transition={{ delay: 0.15 }}
            className="pt-2 mt-2 border-t border-[#D4B483]/20"
          >
            <Link
              href={switchHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-full text-white font-semibold w-max"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.25) 0%, rgba(230, 200, 151, 0.15) 100%)',
                border: '1px solid rgba(212, 180, 131, 0.4)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Circle className="w-2 h-2 fill-current" />
              {locale === 'de' ? 'EN' : 'DE'}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
