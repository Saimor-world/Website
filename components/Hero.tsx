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

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cal = calUrl ?? process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min';

  const content = {
    de: {
      badge: 'Klarheit im Wandel',
      headline: 'Saimôr',
      subheadline: 'Das Ökosystem für bewusste Organisationen',
      description: 'Wo Wald und Myzel sich treffen: Oben die sichtbare Organisation, darunter das verbindende Netzwerk. Môra – unsere KI-Begleiterin – bringt zusammen, was zusammengehört.',
      ctaPrimary: 'Môra kennenlernen',
      ctaSecondary: 'Gespräch buchen',
      stats: [
        { value: 'KI', label: 'gestützte Klarheit' },
        { value: 'EU', label: 'DSGVO konform' },
        { value: '∞', label: 'Verbindungen' }
      ],
      scrollHint: 'Entdecken'
    },
    en: {
      badge: 'Clarity in Change',
      headline: 'Saimôr',
      subheadline: 'The Ecosystem for Conscious Organizations',
      description: 'Where forest meets mycelium: Above the visible organization, below the connecting network. Môra – our AI companion – brings together what belongs together.',
      ctaPrimary: 'Explore Môra',
      ctaSecondary: 'Book a Call',
      stats: [
        { value: 'AI', label: 'powered clarity' },
        { value: 'EU', label: 'GDPR compliant' },
        { value: '∞', label: 'Connections' }
      ],
      scrollHint: 'Discover'
    }
  }[locale];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* === CINEMATIC BACKGROUND === */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 50% 20%, rgba(26, 60, 50, 0.95) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 80% 80%, rgba(11, 15, 16, 0.98) 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 20% 90%, rgba(26, 60, 50, 0.9) 0%, transparent 40%),
              linear-gradient(180deg, #0B0F10 0%, #1A3C32 50%, #0B0F10 100%)
            `
          }}
        />

        {/* Animated aurora effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(ellipse 100% 50% at 30% 30%, rgba(214, 168, 72, 0.15) 0%, transparent 60%)',
              'radial-gradient(ellipse 100% 50% at 70% 60%, rgba(214, 168, 72, 0.2) 0%, transparent 60%)',
              'radial-gradient(ellipse 100% 50% at 40% 70%, rgba(214, 168, 72, 0.15) 0%, transparent 60%)',
              'radial-gradient(ellipse 100% 50% at 30% 30%, rgba(214, 168, 72, 0.15) 0%, transparent 60%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Forest image with overlay */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Floating particles */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <FloatingParticle
                key={i}
                delay={i * 0.5}
                size={Math.random() * 6 + 2}
                duration={Math.random() * 10 + 15}
              />
            ))}
          </div>
        )}

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(214, 168, 72, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(214, 168, 72, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* === MAIN CONTENT === */}
      <motion.div
        className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32"
        style={{ y: parallaxY, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">

          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} // Reduced movement for cleaner feel
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }} // Faster
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 sm:mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(214, 168, 72, 0.1) 0%, rgba(214, 168, 72, 0.05) 100%)',
                border: '1px solid rgba(214, 168, 72, 0.3)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              <Sparkles className="w-4 h-4 text-[#D6A848]" />
              <span className="text-xs sm:text-sm font-medium tracking-[0.1em] text-[#D6A848] uppercase">
                {content.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #D6A848 50%, #AAB0B2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            >
              {content.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-6 font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {content.subheadline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-[#AAB0B2] mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {content.description}
            </motion.p>

            {/* CTA Buttons - Mobile Optimized (Stacked) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 sm:mb-12 w-full sm:w-auto"
            >
              {/* Primary CTA */}
              <a
                href={locale === 'en' ? '/en/mora' : '/mora'}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-lg font-semibold overflow-hidden min-h-[50px] relative transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #1A3C32 0%, #2A5A4A 100%)',
                  border: '2px solid rgba(214, 168, 72, 0.5)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <span className="relative text-white z-10">{content.ctaPrimary}</span>
                <ArrowRight className="relative w-5 h-5 text-[#D6A848] group-hover:translate-x-1 transition-transform z-10" />
              </a>

              {/* Secondary CTA */}
              {/* Secondary CTA */}
              <a
                href={cal}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto block relative z-20 pointer-events-auto"
              >
                <motion.div
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full text-lg font-medium text-white/90 min-h-[50px] cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(32px)'
                  }}
                  whileHover={{
                    scale: 1.05,
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(214, 168, 72, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5 text-[#D6A848]" />
                  <span>{content.ctaSecondary}</span>
                </motion.div>
              </a>
            </motion.div>

            {/* Stats - Glassmorphism & Premium Rounding */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 p-2 sm:p-0"
            >
              {content.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center p-6 rounded-[2rem] backdrop-blur-[20px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    border: '1px solid rgba(214, 168, 72, 0.2)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                  }}
                  whileHover={{
                    scale: 1.05,
                    background: 'linear-gradient(135deg, rgba(214, 168, 72, 0.1) 0%, rgba(214, 168, 72, 0.05) 100%)',
                    borderColor: 'rgba(214, 168, 72, 0.5)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(214, 168, 72, 0.2)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-[#D6A848] mb-1 leading-tight">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-[#AAB0B2]/80 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Logo/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center mt-8 lg:mt-0"
          >
            {/* Glowing orb background */}
            <motion.div
              className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(214, 168, 72, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Rotating rings */}
            <motion.div
              className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full border border-[#D6A848]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-[#1A3C32]/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full border border-[#D6A848]/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Living Orb - Organic & Breathing */}
            <motion.div
              className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] rounded-full flex items-center justify-center z-20"
              whileHover={{ scale: 1.05 }}
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Base Orb with Gradient */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, rgba(42, 90, 74, 0.9) 0%, rgba(26, 60, 50, 0.7) 40%, rgba(11, 18, 19, 0.95) 100%)',
                  boxShadow: `
                    0 0 80px rgba(42, 90, 74, 0.5),
                    inset 15px 15px 30px rgba(255, 255, 255, 0.08),
                    inset -15px -15px 30px rgba(0, 0, 0, 0.6)
                  `
                }}
              />

              {/* Fog Layer 1 - Outer Mist */}
              <motion.div
                className="absolute inset-[-20%] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(214, 168, 72, 0.15) 0%, rgba(214, 168, 72, 0.05) 40%, transparent 70%)',
                  filter: 'blur(40px)',
                  mixBlendMode: 'screen'
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Fog Layer 2 - Inner Glow */}
              <motion.div
                className="absolute inset-[10%] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(214, 168, 72, 0.6) 0%, rgba(214, 168, 72, 0.2) 50%, transparent 80%)',
                  filter: 'blur(25px)',
                  mixBlendMode: 'screen'
                }}
                animate={{
                  scale: [0.9, 1.2, 0.9],
                  opacity: [0.5, 0.9, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Organic Pulse - Core */}
              <motion.div
                className="absolute inset-[25%] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(214, 168, 72, 0.4) 40%, transparent 70%)',
                  filter: 'blur(15px)',
                  mixBlendMode: 'overlay'
                }}
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />

              {/* Subtle Noise Texture */}
              <div
                className="absolute inset-0 rounded-full opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  backgroundSize: '200px 200px'
                }}
              />

              {/* Logo Image - Above fog layers */}
              <Image
                src="/saimor-logo-new.png"
                alt="Saimôr Logo"
                width={380}
                height={380}
                className="w-40 sm:w-52 object-contain drop-shadow-2xl relative z-40"
                priority
              />
            </motion.div>

            {/* Floating Badge - Simplified */}
            <motion.div
              className="absolute bottom-10 sm:bottom-20 left-0 px-3 py-1.5 rounded-full text-xs font-medium text-[#D6A848] border border-[#D6A848]/30 bg-[#0B0F10]/80 backdrop-blur-sm z-30"
              animate={{ y: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Môra · KI
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* === SCROLL INDICATOR === */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-[#AAB0B2]">{content.scrollHint}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#D6A848]" />
        </motion.div>
      </motion.div>

      {/* === BOTTOM GRADIENT TRANSITION === */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to top, rgba(248, 245, 240, 1) 0%, transparent 100%)'
        }}
      />
    </section>
  );
}
