'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Play, ChevronDown } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
  calUrl?: string;
};

// Floating particle component
const FloatingParticle = ({ delay = 0, size = 4, duration = 20 }: { delay?: number; size?: number; duration?: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: 'radial-gradient(circle, rgba(212, 180, 131, 0.8) 0%, rgba(212, 180, 131, 0.2) 100%)',
      boxShadow: '0 0 10px rgba(212, 180, 131, 0.5)',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -100, 0],
      x: [0, Math.random() * 50 - 25, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export default function Hero({ locale, calUrl }: Props) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cal = calUrl ?? process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min';

  const content = {
    de: {
      badge: 'Operational Excellence v1.0',
      headline: 'Saimôr',
      subheadline: 'Klarheit im Wandel.',
      description: 'Das semantische Betriebssystem für zukunftsfähige Organisationen. Strukturierte Übersicht trifft auf tiefe Vernetzung. Maximieren Sie Ihre Wirkung durch datengestützte Klarheit.',
      ctaPrimary: 'Showcase ansehen',
      ctaSecondary: 'Strategiegespräch buchen',
      stats: [
        { value: 'AI', label: 'Semantic Core' },
        { value: 'EU', label: 'Data Sovereignty' },
        { value: '∞', label: 'Connections' }
      ],
      scrollHint: 'Entdecken'
    },
    en: {
      badge: 'Operational Excellence v1.0',
      headline: 'Saimôr',
      subheadline: 'Clarity in Change.',
      description: 'The semantic operating system for resilient organizations. Structured overview meets deep networking. Maximize your impact through data-driven clarity.',
      ctaPrimary: 'View Showcase',
      ctaSecondary: 'Book Strategy Call',
      stats: [
        { value: 'AI', label: 'Semantic Core' },
        { value: 'EU', label: 'Data Sovereignty' },
        { value: '∞', label: 'Connections' }
      ],
      scrollHint: 'Explore'
    }
  }[locale];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#081410]"
      role="banner"
    >
      {/* === HIGH-END BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0">
        {/* Deep Space Gradients - Even Brighter and more inviting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.3)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.25)_0%,transparent_70%)]" />
        
        {/* Subtle Forest Layer - High End & Professional */}
        <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Mycelium Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 50 10 50 50 T 90 90' stroke='rgba(16,185,129,0.5)' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }} />

        {/* Animated Atmospheric Nebula - More intense & vibrant */}
        <motion.div 
          className="absolute -top-[15%] -left-[10%] w-[80%] h-[80%] bg-emerald-500/30 blur-[150px] rounded-full"
          animate={{ 
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-[15%] -right-[10%] w-[70%] h-[70%] bg-cyan-500/25 blur-[150px] rounded-full"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1.2, 1, 1.2] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Central Glow for better readability and "inviting" feel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-emerald-500/20 blur-[250px] rounded-full opacity-80" />

        {/* Neural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        {/* Grain/Noise */}
        <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* === MAIN CONTENT === */}
      <motion.div
        className="relative z-30 w-full max-w-7xl mx-auto px-6 py-32"
        style={{ y: parallaxY, opacity }}
      >
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-emerald-400/80">{content.badge}</span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-4 relative">
            {/* User Logo Integration - Beautiful botanical design with white card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="absolute -top-36 left-1/2 -translate-x-1/2 pointer-events-none select-none"
            >
              <div className="w-24 h-24 rounded-2xl bg-white shadow-2xl shadow-black/20 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/saimor-logo-new.png"
                  alt="Saimôr Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl sm:text-8xl lg:text-9xl font-light tracking-tighter leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              <span className="opacity-90">Saimôr</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl text-emerald-400 italic font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {content.subheadline}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            {content.description}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto relative z-30 pointer-events-auto"
          >
            <Link
              href={locale === 'en' ? '/en/mora' : '/mora'}
              className="px-10 py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105 shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer"
            >
              {content.ctaPrimary}
            </Link>
            <a
              href={cal}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white font-bold hover:bg-white/10 transition-all hover:scale-105 flex items-center justify-center cursor-pointer"
            >
              {content.ctaSecondary}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-12 sm:gap-24 pt-12"
          >
            {content.stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 whitespace-nowrap">{content.scrollHint}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-emerald-500 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Styles */}
      <style jsx global>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
}
