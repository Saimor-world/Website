'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

// Filmische Components - lazy loaded für Performance, NO SSR
const HeroAmbient = dynamic(() => import('./HeroAmbient'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(135deg, rgba(14, 26, 27, 0.98) 0%, rgba(26, 46, 38, 0.95) 50%, rgba(14, 26, 27, 0.98) 100%)'
    }} />
  )
});
const MoraOrbCanvas = dynamic(() => import('./MoraOrbCanvas'), { ssr: false });
const SyntaxOverlay = dynamic(() => import('./SyntaxOverlay'), { ssr: false });

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
};

export default function Hero({ locale }: Props) {
  const heroText = {
    de: {
      title: 'Saimôr ist ein digitaler Ort',
      subtitle: 'für das, was bleibt, wenn alles andere laut wird.',
    },
    en: {
      title: 'Saimôr is a digital space',
      subtitle: 'for what remains when everything else gets loud.',
    }
  }[locale];

  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
      role="banner"
      aria-label="Saimôr - A space for clarity and transformation"
    >
      {/* Skip Link for A11y */}
      <a
        href="#angebot"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-saimor-gold focus:text-white focus:rounded"
      >
        {locale === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}
      </a>

      {/* Atmospheric Background */}
      <HeroAmbient />

      {/* Syntax Overlays - Pfadästhetik */}
      <SyntaxOverlay />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Title - Reduced, poetic */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          className="mb-16"
        >
          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide leading-tight font-light text-white/95 mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              textShadow: '0 4px 16px rgba(0,0,0,0.5)'
            }}
          >
            {heroText.title}
          </h1>
          <p
            className="text-xl sm:text-2xl md:text-3xl text-white/80 leading-relaxed max-w-3xl mx-auto"
            style={{
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300
            }}
          >
            {heroText.subtitle}
          </p>
        </motion.div>

        {/* Môra Orb - The Central Living Presence */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <MoraOrbCanvas />
        </motion.div>

        {/* Subtle scroll indicator - no CTA buttons */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 cursor-pointer hover:text-white/70 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          onClick={() => {
            const target = document.getElementById('angebot');
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          role="button"
          tabIndex={0}
          aria-label={locale === 'de' ? 'Nach unten scrollen' : 'Scroll down'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const target = document.getElementById('angebot');
              target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          <span className="text-sm font-light tracking-wide">
            {locale === 'de' ? 'Eintauchen' : 'Dive in'}
          </span>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Organic Transition Wave - Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 Q300,20 600,40 T1200,60 L1200,120 L0,120 Z"
            fill="url(#heroWaveGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 2.2 }}
          />
          <defs>
            <linearGradient id="heroWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(14, 26, 27, 0.8)" />
              <stop offset="50%" stopColor="rgba(74, 103, 65, 0.6)" />
              <stop offset="100%" stopColor="rgba(14, 26, 27, 0.8)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
}
