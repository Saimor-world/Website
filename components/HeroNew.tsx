'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
};

export default function HeroNew({ locale }: Props) {
  const content = {
    de: {
      headline: 'Klarheit im Wandel',
      subline: 'KI-gestützte Begleitung für Business-Entscheidungen',
      description: 'Saimôr verbindet menschliche Tiefe mit technischer Präzision. Môra, deine KI-Assistentin, navigiert mit dir durch Datenflut zur klaren Handlung.',
      cta: 'Early Access sichern',
      scroll: 'Entdecken'
    },
    en: {
      headline: 'Clarity in Transformation',
      subline: 'AI-powered guidance for business decisions',
      description: 'Saimôr connects human depth with technical precision. Môra, your AI assistant, navigates with you through data overload to clear action.',
      cta: 'Get Early Access',
      scroll: 'Discover'
    }
  }[locale];

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #0A1612 0%, #1A2E26 50%, #0A1612 100%)'
      }}
    >
      {/* Animated Orbs Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 300 + i * 100,
              height: 300 + i * 100,
              background: `radial-gradient(circle, rgba(212, 180, 131, ${0.08 - i * 0.015}) 0%, transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              filter: 'blur(60px)'
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-[#D4B483]/30"
          style={{
            background: 'rgba(212, 180, 131, 0.08)',
            backdropFilter: 'blur(10px)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-2 h-2 rounded-full bg-[#D4B483] animate-pulse" />
          <span className="text-sm text-[#D4B483] font-medium">
            {locale === 'de' ? 'Môra Backend 85% ⋅ Early Access' : 'Môra Backend 85% ⋅ Early Access'}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #D4B483 50%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 80px rgba(212, 180, 131, 0.3)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {content.headline}
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="text-xl md:text-2xl text-[#D4B483]/90 mb-4 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {content.subline}
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {content.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={() => window.location.hash = '#waitlist'}
            className="group relative px-12 py-5 rounded-full text-lg font-bold text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
              boxShadow: '0 10px 40px rgba(212, 180, 131, 0.3)'
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(212, 180, 131, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative z-10">{content.cta}</span>
          </motion.button>

          {/* Scroll Indicator */}
          <motion.button
            onClick={() => document.getElementById('angebot')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-[#D4B483] transition-colors cursor-pointer group"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-medium">{content.scroll}</span>
            <ChevronDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
}
