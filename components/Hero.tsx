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
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-32"
        style={{ y: parallaxY, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'linear-gradient(135deg, rgba(214, 168, 72, 0.15) 0%, rgba(214, 168, 72, 0.05) 100%)',
                border: '1px solid rgba(214, 168, 72, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Sparkles className="w-4 h-4 text-[#D6A848]" />
              <span className="text-sm font-medium tracking-wide text-[#D6A848]">
                {content.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-6 font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {content.subheadline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-[#AAB0B2] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {content.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              {/* Primary CTA */}
              <Link href={locale === 'en' ? '/en/mora' : '/mora'}>
                <motion.div
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-full text-lg font-semibold overflow-hidden min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A857] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #1A3C32 0%, #2A5A4A 100%)',
                    border: '2px solid rgba(214, 168, 72, 0.5)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 25px 50px rgba(214, 168, 72, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#D6A848]/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative text-white">{content.ctaPrimary}</span>
                  <ArrowRight className="relative w-5 h-5 text-[#D6A848] group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>

              {/* Secondary CTA */}
              <motion.a
                href={cal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-full text-lg font-medium text-white/90 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A857] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{
                  scale: 1.03,
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(214, 168, 72, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5 text-[#D6A848]" />
                <span>{content.ctaSecondary}</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              {content.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center p-4 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(214, 168, 72, 0.15)'
                  }}
                  whileHover={{
                    scale: 1.05,
                    background: 'rgba(214, 168, 72, 0.1)',
                    borderColor: 'rgba(214, 168, 72, 0.4)'
                  }}
                >
                  <div className="text-2xl font-bold text-[#D6A848] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#AAB0B2] uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Logo/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Glowing orb background */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full"
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
              className="absolute w-[400px] h-[400px] rounded-full border border-[#D6A848]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[320px] h-[320px] rounded-full border border-[#1A3C32]/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[240px] h-[240px] rounded-full border border-[#D6A848]/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Main logo container */}
            <motion.div
              className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(145deg, rgba(26, 60, 50, 0.9) 0%, rgba(11, 15, 16, 0.95) 100%)',
                border: '2px solid rgba(214, 168, 72, 0.3)',
                boxShadow: `
                  0 40px 80px rgba(0, 0, 0, 0.6),
                  inset 0 2px 0 rgba(255, 255, 255, 0.1),
                  0 0 100px rgba(214, 168, 72, 0.2)
                `
              }}
              animate={{
                boxShadow: [
                  '0 40px 80px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.1), 0 0 100px rgba(214, 168, 72, 0.2)',
                  '0 40px 80px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.1), 0 0 150px rgba(214, 168, 72, 0.35)',
                  '0 40px 80px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.1), 0 0 100px rgba(214, 168, 72, 0.2)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/saimor-logo-new.png"
                alt="Saimôr Logo"
                width={280}
                height={320}
                className="w-48 sm:w-64 object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Floating badges around logo */}
            <motion.div
              className="absolute top-10 right-0 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: 'linear-gradient(135deg, #D6A848, #E8C068)',
                color: '#0B0F10',
                boxShadow: '0 10px 30px rgba(214, 168, 72, 0.4)'
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {locale === 'de' ? 'Logo 2026' : 'Logo 2026'}
            </motion.div>

            <motion.div
              className="absolute bottom-20 left-0 px-3 py-1.5 rounded-full text-xs font-medium text-[#D6A848] border border-[#D6A848]/30 bg-[#0B0F10]/80 backdrop-blur-sm"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              Môra · KI-Begleiterin
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* === SCROLL INDICATOR === */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
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
