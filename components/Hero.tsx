'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import dynamic from 'next/dynamic';

const BrandSun = dynamic(() => import('./BrandSun'), { ssr: false });
const Orbits = dynamic(() => import('./Orbits'), { ssr: false });

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
  calUrl?: string;
  contactHashId?: string;
};

export default function Hero({
  locale,
  calUrl,
  contactHashId = 'kontakt',
}: Props) {
  const heroText = {
    de: {
      heading: 'Saimôr — Klarheit im Wandel',
      subheading1: 'Ein Resonanzraum für Klarheit.',
      subheading2: 'Brücke zwischen Menschen, Daten und Wandel.',
      ctaPrimary: 'Lichtgespräch buchen',
      ctaSecondary: 'Angebot entdecken'
    },
    en: {
      heading: 'Saimôr — Clarity in Change',
      subheading1: 'A resonance space for clarity.',
      subheading2: 'A bridge between people, data, and change.',
      ctaPrimary: 'Book Light Conversation',
      ctaSecondary: 'Discover Offering'
    }
  }[locale];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const brandSunY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const brandSunRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const orbitsY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const cal = calUrl ?? process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min';
  const fallbackHref =
    typeof window === 'undefined'
      ? `/${locale === 'en' ? 'en' : 'de'}/kontakt`
      : document.getElementById(contactHashId)
        ? `#${contactHashId}`
        : `/${locale === 'en' ? 'en' : 'de'}/kontakt`;

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
      className="relative overflow-hidden min-h-screen flex items-center bg-navy"
      style={{
        background: `
          radial-gradient(ellipse 1000px 800px at 50% 30%, rgba(255, 206, 69, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse 1400px 1000px at 20% 80%, rgba(255, 206, 69, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 800px 600px at 80% 20%, rgba(255, 206, 69, 0.06) 0%, transparent 40%),
          linear-gradient(180deg, #0E1526 0%, #1A2332 100%)
        `
      }}
      role="banner"
      aria-label="Hero section with main call-to-action"
    >
      {/* Orbital Background */}
      <motion.div
        style={{ y: orbitsY }}
        className="absolute inset-0 opacity-20"
      >
        <Orbits className="w-full h-full" />
      </motion.div>

      {/* CSS Noise Layer */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`
        }}
      />

      {/* Additional Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gold/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-gold/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-32 md:py-40 text-center z-10">
        {/* Brand Sun + Heading */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div
            style={{ y: brandSunY, rotate: brandSunRotate }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <BrandSun className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-[#F9F9F6] leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            role="heading"
            aria-level={1}
          >
            {heroText.heading}
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto mb-8 sm:mb-12 px-2"
        >
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-[#F9F9F6]/90 mb-2">
            {heroText.subheading1}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-[#F9F9F6]/90">
            {heroText.subheading2}
          </p>
        </motion.div>

        {/* CTAs with Magnetic Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-lg sm:max-w-none mx-auto"
        >
          {/* Primary CTA */}
          <motion.a
            href={cal}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.05,
              y: -6,
              rotateY: 5,
              boxShadow: "0 20px 40px rgba(255, 206, 69, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 rounded-2xl bg-gradient-to-br from-[#FFCE45] via-[#FFD700] to-[#FFCE45] text-[#0E1526] font-bold text-lg sm:text-xl hover:brightness-110 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-[#FFCE45]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1526] relative overflow-hidden shadow-lg text-center min-h-[56px] flex items-center justify-center"
            aria-label="Book a light conversation via Cal.com (opens in new tab)"
            role="button"
          >
            <span className="relative z-10 drop-shadow-sm">{heroText.ctaPrimary}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FFEB3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => smoothScrollTo('leistungen')}
            whileHover={{
              scale: 1.03,
              y: -4,
              rotateY: -3,
              boxShadow: "0 15px 30px rgba(249, 249, 246, 0.15)"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group w-full sm:w-auto px-8 sm:px-12 py-5 sm:py-6 rounded-2xl border-2 border-[#F9F9F6]/25 text-[#F9F9F6] font-semibold text-lg sm:text-xl hover:border-[#FFCE45]/70 hover:text-[#FFCE45] hover:bg-[#FFCE45]/8 backdrop-blur-sm transition-all duration-300 focus-visible:ring-4 focus-visible:ring-[#FFCE45]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1526] relative overflow-hidden min-h-[56px] flex items-center justify-center"
            aria-label="Scroll to services section"
          >
            <span className="relative z-10">{heroText.ctaSecondary}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFCE45]/10 to-[#FFD700]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
