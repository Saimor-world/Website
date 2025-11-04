'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Orbits = dynamic(() => import('./Orbits'), { ssr: false });
const DataJungle = dynamic(() => import('./DataJungle'), { ssr: false });

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
      heading: 'Klarheit im Wandel',
      claim: 'Begleitung für Menschen und Organisationen, wenn Systeme schwanken.',
      ctaPrimary: 'Klarheitsgespräch buchen',
      ctaSecondary: 'Angebot ansehen'
    },
    en: {
      heading: 'Clarity in Transformation',
      claim: 'Guidance for people and organizations when systems waver.',
      ctaPrimary: 'Book clarity conversation',
      ctaSecondary: 'View offering'
    }
  }[locale];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const brandSunY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

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
      role="banner"
      aria-label="A space for clarity and transformation"
    >
      {/* Data Jungle Layer - Cookies & Licht */}
      <DataJungle />

      {/* Unsplash Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
          alt="Natural forest background"
          fill
          className="object-cover"
          quality={85}
          priority={false}
          sizes="100vw"
        />

        {/* Modern Dark Overlay - Epiminds Style */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(10, 22, 18, 0.96) 0%,
                rgba(15, 30, 24, 0.92) 30%,
                rgba(26, 46, 38, 0.88) 60%,
                rgba(15, 30, 24, 0.92) 85%,
                rgba(10, 22, 18, 0.96) 100%
              )
            `,
            backgroundBlendMode: 'multiply'
          }}
        />

        {/* Subtle Liquid Glass Layer */}
        <div
          className="absolute inset-0 backdrop-blur-[2px]"
          style={{
            background: `
              radial-gradient(ellipse 1000px 600px at 30% 40%, rgba(139, 181, 129, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 800px 500px at 70% 60%, rgba(212, 180, 131, 0.06) 0%, transparent 55%)
            `
          }}
        />
      </div>
      {/* Organic Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-40 h-40 rounded-full z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.2) 0%, rgba(212, 180, 131, 0.15) 100%)',
          backdropFilter: 'blur(25px)',
          border: '1px solid rgba(212, 180, 131, 0.3)',
          boxShadow: '0 8px 32px rgba(74, 103, 65, 0.1)'
        }}
        animate={{
          y: [0, -40, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 120, 240, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-2/3 right-1/5 w-24 h-24 rounded-full z-10"
        style={{
          background: 'linear-gradient(45deg, rgba(102, 153, 102, 0.25) 0%, rgba(212, 180, 131, 0.2) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(102, 153, 102, 0.2)',
          boxShadow: '0 6px 24px rgba(102, 153, 102, 0.08)'
        }}
        animate={{
          y: [0, 35, 0],
          x: [0, -25, 0],
          scale: [1, 0.85, 1],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-32 h-32 z-10"
        style={{
          background: 'linear-gradient(225deg, rgba(74, 103, 65, 0.15) 0%, rgba(230, 200, 151, 0.2) 100%)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(230, 200, 151, 0.25)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          boxShadow: '0 4px 20px rgba(74, 103, 65, 0.06)'
        }}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 45, 90, 135, 180]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Golden Flowing Lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-5"
        style={{ y: parallaxY }}
      >
        <svg className="absolute top-1/3 left-0 w-full h-full opacity-30" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <motion.path
            d="M0,300 Q300,200 600,250 T1200,200"
            stroke="rgba(212, 180, 131, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,500 Q400,400 800,450 T1200,400"
            stroke="rgba(230, 200, 151, 0.4)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-32 md:py-40 text-center z-10">
        {/* Brand Sun */}
        <motion.div
          style={{ y: brandSunY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8 will-change-transform"
        >
          <div className="relative">
            {/* Enhanced backdrop for better logo visibility */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-3xl"
                 style={{
                   transform: 'scale(1.15)',
                   filter: 'blur(25px)',
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
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4)) drop-shadow(0 0 40px rgba(255,255,255,0.6)) contrast(1.15) brightness(1.1)',
              }}
              priority
            />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="max-w-5xl mx-auto mb-6 px-4 text-center"
        >
          {/* Môra Badge - Prominent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.15) 0%, rgba(74, 103, 65, 0.12) 100%)',
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

          <h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide leading-tight font-bold text-white mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              textShadow: '0 4px 12px rgba(0,0,0,0.4)'
            }}
          >
            {heroText.heading}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 leading-relaxed"
             style={{
               textShadow: '0 2px 8px rgba(0,0,0,0.3)',
               fontFamily: 'Cormorant Garamond, serif'
             }}>
            {heroText.claim}
          </p>
        </motion.div>

        {/* Single Modern CTA - Minimalist like Epiminds */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center gap-8 w-full max-w-xl mx-auto"
        >
          {/* Single Primary CTA - Liquid Glass */}
          <motion.a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('waitlist');
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 30px 80px rgba(212, 180, 131, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 2px rgba(212, 180, 131, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group relative w-full px-12 py-5 rounded-full text-white font-bold text-lg overflow-hidden text-center backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.9) 0%, rgba(139, 181, 129, 0.85) 50%, rgba(74, 103, 65, 0.9) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(212, 180, 131, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(212, 180, 131, 0.25)'
            }}
            aria-label="Join Môra waitlist"
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-200%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            />

            <span className="relative z-10 flex items-center justify-center gap-3">
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <path d="M13 7H7v6h6V7z"/>
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z"/>
              </motion.svg>
              <span>{locale === 'de' ? 'Môra kennenlernen' : 'Meet Môra'}</span>
            </span>
          </motion.a>

          {/* Scroll Indicator */}
          <motion.button
            onClick={() => smoothScrollTo('angebot')}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#8BB581] transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            aria-label="Scroll to offering"
          >
            <span className="text-sm font-medium">{locale === 'de' ? 'Entdecken' : 'Discover'}</span>
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
        </motion.div>

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
