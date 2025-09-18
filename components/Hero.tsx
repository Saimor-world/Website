'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
      heading: '... ist ein digitaler Ort für das, was bleibt, wenn alles andere laut wird.',
      claim: 'Klarheit im Wandel – Begleitung für Menschen und Organisationen, wenn Systeme schwanken.',
      ctaPrimary: 'Lichtgespräch buchen',
      ctaSecondary: 'Angebot ansehen'
    },
    en: {
      heading: '... is a digital space for what remains when everything else gets loud.',
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
          radial-gradient(ellipse 2000px 1200px at 30% 20%, rgba(255, 215, 102, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 1800px 1000px at 70% 80%, rgba(251, 191, 36, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse 1200px 800px at 90% 10%, rgba(255, 206, 69, 0.05) 0%, transparent 40%),
          radial-gradient(ellipse 1600px 900px at 10% 90%, rgba(254, 240, 138, 0.04) 0%, transparent 45%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 252, 243, 0.9) 30%, rgba(253, 248, 231, 0.85) 100%)
        `
      }}
      role="banner"
      aria-label="A space for clarity and transformation"
    >
      {/* Liquid Glass Layers */}
      <motion.div
        className="absolute inset-0 opacity-30 will-change-transform"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(255, 215, 102, 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(254, 240, 138, 0.18) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Glass Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/5 w-32 h-32 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 215, 102, 0.2) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-20 h-20 rounded-full"
        style={{
          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.3) 0%, rgba(251, 191, 36, 0.15) 100%)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full"
        style={{
          background: 'linear-gradient(225deg, rgba(255, 255, 255, 0.35) 0%, rgba(254, 240, 138, 0.18) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glass Morphism Overlay */}
      <div
        className="absolute inset-0 opacity-60 mix-blend-soft-light pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 215, 102, 0.1) 100%)',
          backdropFilter: 'blur(1px)'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-32 md:py-40 text-center z-10">
        {/* Brand Sun */}
        <motion.div
          style={{ y: brandSunY, rotate: brandSunRotate }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8 will-change-transform"
        >
          <Image
            src="/Logo neu.png"
            alt="Saimôr Logo"
            width={600}
            height={180}
            className="w-72 sm:w-96 md:w-[28rem] lg:w-[32rem] xl:w-[36rem] h-auto object-contain drop-shadow-2xl"
            priority
          />
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

        {/* Claim Section - Liquid Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{
            y: -8,
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="max-w-5xl mx-auto mb-16 px-4 group"
        >
          <motion.div
            className="relative overflow-hidden rounded-[2rem] p-10 shadow-2xl border border-white/40"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 215, 102, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
            }}
            animate={{
              boxShadow: [
                '0 25px 50px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                '0 35px 70px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                '0 25px 50px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(255, 215, 102, 0.1) 0%, transparent 50%)',
                  'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
                  'linear-gradient(225deg, rgba(254, 240, 138, 0.1) 0%, transparent 50%)',
                  'linear-gradient(315deg, rgba(255, 215, 102, 0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <p className="relative text-xl sm:text-2xl md:text-3xl leading-relaxed text-slate-800 font-medium z-10"
               style={{
                 textShadow: '0 2px 4px rgba(0,0,0,0.05)',
                 fontFamily: 'Cormorant Garamond, serif'
               }}>
              {heroText.claim}
            </p>

            {/* Floating particles inside card */}
            <motion.div
              className="absolute top-4 right-6 w-2 h-2 bg-yellow-400/60 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-yellow-300/50 rounded-full"
              animate={{
                y: [0, 8, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </motion.div>

        {/* Futuristic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center w-full max-w-2xl mx-auto"
        >
          {/* Liquid Glass Primary CTA */}
          <motion.a
            href={cal}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.08,
              y: -12,
              rotateY: 8,
              rotateX: 5
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative w-full sm:w-auto px-12 sm:px-16 py-7 sm:py-8 rounded-[2rem] text-slate-900 font-bold text-xl sm:text-2xl overflow-hidden text-center min-h-[72px] flex items-center justify-center will-change-transform"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 102, 0.9) 0%, rgba(251, 191, 36, 0.95) 50%, rgba(217, 119, 6, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 rgba(0, 0, 0, 0.1)'
            }}
            aria-label="Book a light conversation via Cal.com (opens in new tab)"
            role="button"
          >
            {/* Animated background layers */}
            <motion.div
              className="absolute inset-0 rounded-[2rem]"
              animate={{
                background: [
                  'linear-gradient(45deg, rgba(255, 215, 102, 0.8) 0%, rgba(251, 191, 36, 0.9) 100%)',
                  'linear-gradient(135deg, rgba(251, 191, 36, 0.9) 0%, rgba(255, 215, 102, 0.8) 100%)',
                  'linear-gradient(225deg, rgba(254, 240, 138, 0.8) 0%, rgba(251, 191, 36, 0.9) 100%)',
                  'linear-gradient(315deg, rgba(255, 215, 102, 0.8) 0%, rgba(251, 191, 36, 0.9) 100%)'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.6) 50%, transparent 70%)'
              }}
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />

            <span className="relative z-10 flex items-center gap-3">
              <span>{heroText.ctaPrimary}</span>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.08 2.38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </span>
          </motion.a>

          {/* Glass Secondary CTA */}
          <motion.button
            onClick={() => smoothScrollTo('angebot')}
            whileHover={{
              scale: 1.05,
              y: -8,
              rotateY: -5,
              rotateX: 3
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative w-full sm:w-auto px-12 sm:px-16 py-7 sm:py-8 rounded-[2rem] text-slate-800 font-semibold text-xl sm:text-2xl overflow-hidden text-center min-h-[72px] flex items-center justify-center will-change-transform"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1), inset 0 2px 0 rgba(255, 255, 255, 0.4)'
            }}
            aria-label="Scroll to offering section"
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 102, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)'
              }}
              transition={{ duration: 0.3 }}
            />

            <span className="relative z-10 flex items-center gap-3">
              <span>{heroText.ctaSecondary}</span>
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
