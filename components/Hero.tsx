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
      heading: 'Saimôr ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
      claim: 'Klarheit im Wandel – Begleitung für Menschen und Organisationen, wenn Systeme schwanken.',
      ctaPrimary: 'Lichtgespräch buchen',
      ctaSecondary: 'Angebot ansehen'
    },
    en: {
      heading: 'Saimôr is a digital space for what remains when everything else gets loud.',
      claim: 'Clarity in transformation – guidance for people and organizations when systems waver.',
      ctaPrimary: 'Book light conversation',
      ctaSecondary: 'View offering'
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
      className="relative overflow-hidden min-h-screen flex items-center"
      style={{
        background: `
          radial-gradient(ellipse 1200px 900px at 50% 40%, rgba(255, 206, 69, 0.15) 0%, transparent 70%),
          radial-gradient(ellipse 800px 600px at 20% 80%, rgba(255, 183, 77, 0.12) 0%, transparent 60%),
          radial-gradient(ellipse 600px 400px at 80% 20%, rgba(254, 215, 102, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #fffef9 0%, #fefcf3 30%, #fdf8e7 100%)
        `
      }}
      role="banner"
      aria-label="A space for clarity and transformation"
    >
      {/* Orbital Background */}
      <motion.div
        style={{ y: orbitsY }}
        className="absolute inset-0 opacity-20 will-change-transform"
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
        {/* Brand Sun */}
        <motion.div
          style={{ y: brandSunY, rotate: brandSunRotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8 will-change-transform"
        >
          <BrandSun className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="max-w-6xl mx-auto mb-8 px-4"
        >
          <h1
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide leading-tight font-medium text-slate-900"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              letterSpacing: '0.01em',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
            role="heading"
            aria-level={1}
          >
            {heroText.heading}
          </h1>
        </motion.div>

        {/* Claim Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-12 px-4"
        >
          <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-yellow-200/30 shadow-xl">
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-slate-800 font-medium"
               style={{ textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              {heroText.claim}
            </p>
          </div>
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
              boxShadow: "0 25px 50px rgba(255, 206, 69, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group w-full sm:w-auto px-10 sm:px-14 py-6 sm:py-7 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-slate-900 font-bold text-lg sm:text-xl hover:brightness-110 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-yellow-500/50 focus-visible:ring-offset-2 relative overflow-hidden shadow-2xl text-center min-h-[64px] flex items-center justify-center will-change-transform"
            style={{
              background: 'linear-gradient(45deg, #FBBF24, #F59E0B, #D97706)',
              boxShadow: '0 10px 25px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
            aria-label="Book a light conversation via Cal.com (opens in new tab)"
            role="button"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{heroText.ctaPrimary}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.08 2.38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => smoothScrollTo('angebot')}
            whileHover={{
              scale: 1.03,
              y: -4,
              boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group w-full sm:w-auto px-10 sm:px-14 py-6 sm:py-7 rounded-full border-2 border-slate-300 bg-white/80 backdrop-blur-sm text-slate-800 font-semibold text-lg sm:text-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300 focus-visible:ring-4 focus-visible:ring-yellow-500/50 focus-visible:ring-offset-2 relative overflow-hidden shadow-lg text-center min-h-[64px] flex items-center justify-center will-change-transform"
            aria-label="Scroll to offering section"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{heroText.ctaSecondary}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
