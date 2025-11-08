'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DataJungle = dynamic(() => import('./DataJungle'), { ssr: false });

// Filmische Atmosphäre
const HeroAmbient = dynamic(() => import('./HeroAmbient'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(135deg, rgba(14, 26, 27, 0.98) 0%, rgba(26, 46, 38, 0.95) 50%, rgba(14, 26, 27, 0.98) 100%)'
    }} />
  )
});
const SyntaxOverlay = dynamic(() => import('./SyntaxOverlay'), { ssr: false });

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
};

export default function Hero({ locale }: Props) {
  const heroText = {
    de: {
      subtitle: 'Ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
      scroll: 'Eintauchen'
    },
    en: {
      subtitle: 'A digital space for what remains when everything else gets loud.',
      scroll: 'Dive in'
    }
  }[locale];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const brandSunY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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

      {/* Filmische Atmosphäre - kombiniert mit Unsplash */}
      <div className="absolute inset-0 z-0">
        {/* Unsplash Background */}
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
          alt="Natural forest background"
          fill
          className="object-cover"
          quality={85}
          priority={false}
          sizes="100vw"
        />

        {/* Filmische Overlay - reduzierte Opacity damit Unsplash durchkommt */}
        <div className="absolute inset-0" style={{ opacity: 0.7 }}>
          <HeroAmbient />
        </div>
      </div>

      {/* Syntax Overlays - Pfadästhetik über allem */}
      <SyntaxOverlay />

      {/* Data Jungle Layer - Cookies & Licht */}
      <DataJungle />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center">
        {/* Logo - Brand Sun with parallax */}
        <motion.div
          style={{ y: brandSunY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-12 will-change-transform"
        >
          <div className="relative">
            {/* Dark backdrop for crisp logo contrast */}
            <div className="absolute inset-0 bg-black/40 rounded-3xl"
                 style={{
                   transform: 'scale(1.2)',
                   filter: 'blur(30px)',
                   zIndex: -1
                 }}
            />
            <Image
              src="/Logo neu.png"
              alt="Saimôr Logo"
              width={600}
              height={180}
              className="w-72 sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] h-auto object-contain relative z-10"
              style={{
                filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(212,180,131,0.4)) contrast(1.3) brightness(1.25) saturate(1.1)',
              }}
              priority
            />
          </div>
        </motion.div>

        {/* Môra Badge - subtle presence */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-3 px-6 py-3 mb-8 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.2) 0%, rgba(74, 103, 65, 0.18) 100%)',
            border: '1px solid rgba(212, 180, 131, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg className="w-5 h-5 text-[#D4B483]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 7H7v6h6V7z"/>
              <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"/>
            </svg>
          </motion.div>
          <span className="text-sm font-semibold text-[#E6C897]">
            {locale === 'de' ? 'Môra Backend 85% ⋅ Jetzt verfügbar' : 'Môra Backend 85% ⋅ Available Now'}
          </span>
        </motion.div>

        {/* Poetischer Satz - filmisch, zentriert */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
          className="mb-16"
        >
          <p
            className="text-2xl sm:text-3xl md:text-4xl text-white/90 leading-relaxed max-w-3xl mx-auto font-light"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              textShadow: '0 4px 16px rgba(0,0,0,0.5)'
            }}
          >
            {heroText.subtitle}
          </p>
        </motion.div>

        {/* Subtle scroll indicator - NO CTAs */}
        <motion.button
          onClick={() => smoothScrollTo('angebot')}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-white/70 transition-colors cursor-pointer bg-transparent border-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          aria-label={heroText.scroll}
        >
          <span className="text-sm font-medium tracking-wide">{heroText.scroll}</span>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </motion.svg>
        </motion.button>
      </div>

      {/* Organic Golden Transition Element */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 Q300,20 600,40 T1200,60 L1200,120 L0,120 Z"
            fill="url(#heroGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(212, 180, 131, 0.4)" />
              <stop offset="50%" stopColor="rgba(230, 200, 151, 0.6)" />
              <stop offset="100%" stopColor="rgba(212, 180, 131, 0.4)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
}
