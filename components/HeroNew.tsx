'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
};

export default function HeroNew({ locale }: Props) {
  const content = {
    de: {
      headline: 'Klarheit im Wandel',
      subline: 'Môra begleitet dich durch Komplexität',
      description: 'Deine KI-Begleiterin verbindet menschliche Tiefe mit technischer Präzision – navigiert mit dir durch Datenflut zur klaren Handlung.',
      cta: 'Môra kennenlernen',
      scroll: 'Entdecken',
      badge: 'Môra Backend 85% ⋅ Jetzt verfügbar'
    },
    en: {
      headline: 'Clarity in Transformation',
      subline: 'Môra guides you through complexity',
      description: 'Your AI companion combines human depth with technical precision – navigates with you through data overload to clear action.',
      cta: 'Meet Môra',
      scroll: 'Discover',
      badge: 'Môra Backend 85% ⋅ Available Now'
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
        background: 'linear-gradient(180deg, rgba(10, 22, 18, 0.98) 0%, rgba(15, 30, 24, 0.95) 25%, rgba(26, 46, 38, 0.92) 50%, rgba(15, 30, 24, 0.95) 75%, rgba(10, 22, 18, 0.98) 100%)',
        backgroundImage: 'url(https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2560&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
      {/* Animated Mycelium Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 250 + i * 80,
              height: 250 + i * 80,
              background: `radial-gradient(circle, rgba(212, 180, 131, ${0.12 - i * 0.018}) 0%, rgba(139, 181, 129, ${0.08 - i * 0.012}) 50%, transparent 70%)`,
              left: `${15 + i * 12}%`,
              top: `${5 + i * 15}%`,
              filter: 'blur(50px)',
              border: `1px solid rgba(212, 180, 131, ${0.1 - i * 0.015})`,
            }}
            animate={{
              x: [0, 40 + i * 10, 0],
              y: [0, -50 + i * 8, 0],
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{
              duration: 18 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}
      </div>

      {/* Liquid Glass Content Container */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        style={{ opacity, scale }}
      >
        {/* Badge with Glassmorphism */}
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.15) 0%, rgba(74, 103, 65, 0.12) 100%)',
            border: '1px solid rgba(212, 180, 131, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-[#D4B483]" />
          </motion.div>
          <span className="text-sm font-semibold text-[#E6C897]">
            {content.badge}
          </span>
        </motion.div>

        {/* Main Headline - Massive Typography */}
        <motion.h1
          className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-[0.9]"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #D4B483 25%, #8BB581 50%, #D4B483 75%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            textShadow: '0 0 60px rgba(212, 180, 131, 0.3)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: 0,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            opacity: { duration: 1, delay: 0.4 },
            y: { duration: 1, delay: 0.4 },
            backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        >
          {content.headline}
        </motion.h1>

        {/* Subline with organic glow */}
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl mb-8 font-medium"
          style={{
            color: '#8BB581',
            textShadow: '0 0 30px rgba(139, 181, 129, 0.4)',
            fontFamily: 'Cormorant Garamond, serif'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {content.subline}
        </motion.p>

        {/* Description in Liquid Glass Card */}
        <motion.div
          className="max-w-3xl mx-auto mb-12 p-6 rounded-3xl backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(212, 180, 131, 0.05) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(212, 180, 131, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            {content.description}
          </p>
        </motion.div>

        {/* CTA with enhanced glassmorphism */}
        <motion.button
          onClick={() => window.location.hash = '#mora-showcase'}
          className="group relative px-12 py-6 rounded-full text-lg font-bold text-white overflow-hidden backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.9) 0%, rgba(139, 181, 129, 0.85) 50%, rgba(74, 103, 65, 0.9) 100%)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 20px 60px rgba(212, 180, 131, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(212, 180, 131, 0.3)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{
            scale: 1.08,
            boxShadow: '0 30px 80px rgba(212, 180, 131, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 0 0 2px rgba(212, 180, 131, 0.5)'
          }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-200%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Glowing border animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <span className="relative z-10 flex items-center gap-3">
            <Sparkles className="w-5 h-5" />
            {content.cta}
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator with organic animation */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }}
      >
        <span className="text-sm text-gray-400 font-medium">{content.scroll}</span>
        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-6 h-6 text-[#8BB581]" style={{
            filter: 'drop-shadow(0 0 8px rgba(139, 181, 129, 0.6))'
          }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
