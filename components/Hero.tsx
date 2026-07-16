'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';

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
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
    return () => {
      void audioRef.current?.close();
      audioRef.current = null;
    };
  }, []);

  const cal = calUrl ?? process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min';

  const toggleSound = async () => {
    if (soundOn) {
      await audioRef.current?.close();
      audioRef.current = null;
      setSoundOn(false);
      return;
    }
    const Context = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Context) return;
    const context = new Context();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    filter.type = 'lowpass'; filter.frequency.value = 680;
    gain.gain.value = 0.012;
    filter.connect(gain); gain.connect(context.destination);
    [72, 108, 144].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index * 4;
      oscillator.connect(filter); oscillator.start();
    });
    await context.resume();
    audioRef.current = context;
    setSoundOn(true);
  };

  const content = {
    de: {
      badge: 'Operational Excellence v1.0',
      headline: 'Saimôr',
      subheadline: 'Klarheit im Wandel.',
      description: 'Das semantische Betriebssystem für zukunftsfähige Organisationen. Strukturierte Übersicht trifft auf tiefe Vernetzung. Maximiere deine Wirkung durch datengestützte Klarheit.',
      ctaPrimary: 'Showcase ansehen',
      ctaSecondary: 'Strategiegespräch buchen',
      stats: [
        { value: 'AI', label: 'Semantic Core' },
        { value: 'EU', label: 'Data Sovereignty' },
        { value: '∞', label: 'Connections' }
      ],
      scrollHint: 'Entdecken'
    },
    en: {
      badge: 'Operational Excellence v1.0',
      headline: 'Saimôr',
      subheadline: 'Clarity in Change.',
      description: 'The semantic operating system for resilient organizations. Structured overview meets deep networking. Maximize your impact through data-driven clarity.',
      ctaPrimary: 'View Showcase',
      ctaSecondary: 'Book Strategy Call',
      stats: [
        { value: 'AI', label: 'Semantic Core' },
        { value: 'EU', label: 'Data Sovereignty' },
        { value: '∞', label: 'Connections' }
      ],
      scrollHint: 'Explore'
    }
  }[locale];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--world-ink)]"
      role="banner"
    >
      {/* === HIGH-END BACKGROUND LAYERS === */}
      <div className="absolute inset-0 z-0 bg-[#02040A]">
        {/* Deep Space Gradients - Even Brighter and more inviting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,184,141,0.10)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(102,221,234,0.08)_0%,transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(214,168,72,0.30)_0%,transparent_42%)]" />
        
        {/* Milky Way / Mycelium atmosphere */}
        <div className="pointer-events-none absolute -inset-[30%] rotate-[-16deg] bg-[radial-gradient(ellipse_at_center,rgba(231,196,106,.16)_0%,rgba(200,188,255,.10)_28%,transparent_64%)] blur-[60px]" />
        <div className="pointer-events-none absolute -left-[15%] top-[14%] h-[28%] w-[130%] rotate-[-18deg] bg-[linear-gradient(90deg,transparent_0%,rgba(231,196,106,.06)_25%,rgba(200,188,255,.16)_50%,rgba(102,221,234,.07)_66%,transparent_100%)] blur-[32px]" />
        {/* Subtle Forest Layer - High End & Professional */}
        <div className="absolute inset-0 opacity-[0.24] mix-blend-screen" aria-hidden="true">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
            alt=""
            fill
            className="object-cover brightness-[0.52] contrast-[1.12] saturate-[0.42]"
            priority
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,.06)_0%,transparent_24%,transparent_68%,rgba(214,168,72,.11)_100%)] mix-blend-screen opacity-70" />

        {/* Mycelium Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 50 10 50 50 T 90 90' stroke='rgba(214,168,72,0.48)' fill='none' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px'
        }} />

        {/* Animated Atmospheric Nebula - More intense & vibrant */}
        <motion.div 
          className="absolute -top-[15%] -left-[10%] w-[80%] h-[80%] bg-[var(--world-violet)]/20 blur-[150px] rounded-full"
          animate={{ 
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-[15%] -right-[10%] w-[70%] h-[70%] bg-[var(--world-cyan)]/10 blur-[150px] rounded-full"
          animate={{ 
            opacity: [0.5, 0.8, 0.5],
            scale: [1.2, 1, 1.2] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Central Glow for better readability and "inviting" feel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#D6A848]/10 blur-[250px] rounded-full opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,6,15,0.52)_100%)]" />

        {/* Neural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(circle, rgba(231,196,106,.42) 1px, transparent 1px)", backgroundSize: "82px 82px", maskImage: "linear-gradient(to bottom, transparent, black 18%, black 72%, transparent)" }} />
          <div className="absolute left-1/2 top-[23%] h-[min(52vw,500px)] w-[min(52vw,500px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,168,72,.18)_0%,rgba(12,16,29,.16)_48%,transparent_72%)] blur-2xl" />
          <motion.div className="absolute left-1/2 top-[23%] h-[min(19vw,180px)] w-[min(42vw,420px)] -translate-x-1/2 -translate-y-1/2 rotate-[-16deg] rounded-[50%] border" style={{ borderColor: "rgba(214,168,72,.26)" }} animate={{ rotate: 344 }} transition={{ duration: 75, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute left-1/2 top-[23%] h-[min(14vw,132px)] w-[min(34vw,340px)] -translate-x-1/2 -translate-y-1/2 rotate-[20deg] rounded-[50%] border" style={{ borderColor: "rgba(102,221,234,.14)" }} animate={{ rotate: -340 }} transition={{ duration: 52, repeat: Infinity, ease: "linear" }} />
          <div className="absolute left-1/2 top-[23%] h-px w-[min(50vw,500px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D6A848]/30 to-transparent" />
          {mounted && Array.from({ length: 12 }, (_, index) => <FloatingParticle key={index} delay={index * 0.8} size={index % 4 === 0 ? 3 : 2} duration={20 + index % 6} />)}
        </div>
                {/* Grain/Noise */}
        <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* === MAIN CONTENT === */}
      <motion.div
        className="relative z-30 w-full max-w-7xl mx-auto px-6 py-32"
        style={{ y: parallaxY, opacity }}
      >
        <div className="flex flex-col items-center text-center space-y-12">
          <div className="relative z-10 -mb-5 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32" aria-label="Saimôr World">
            <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(214,168,72,.42)_0%,rgba(214,168,72,.16)_34%,rgba(3,5,10,.94)_68%,transparent_73%)] blur-xl" />
            <div className="absolute -inset-3 rounded-full border border-[#D6A848]/35 bg-[#03050A]/80 shadow-[0_0_80px_rgba(214,168,72,.28)]" />
            <motion.span className="absolute -top-10 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D6A848] shadow-[0_0_18px_rgba(214,168,72,.8)]" animate={{ y: [0, -4, 0], opacity: [0.55, 1, 0.55] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            <motion.span className="absolute -right-10 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#66DDEA] shadow-[0_0_16px_rgba(102,221,234,.75)]" animate={{ x: [0, 4, 0], opacity: [0.45, 0.85, 0.45] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} />
            <div className="absolute inset-0 overflow-hidden rounded-full">
            <Image src="/saimor-seal-master.png" alt="Saimôr World Siegel" fill className="object-contain opacity-95 mix-blend-screen drop-shadow-[0_0_24px_rgba(214,168,72,.7)]" priority />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full border border-[#D6A848]/55 bg-[#03050A]/90 px-2 py-1 font-mono text-[7px] font-bold tracking-[.32em] text-[#D6A848] backdrop-blur">WORLD</span>
          </div>
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--world-violet)]/5 border border-[var(--world-gold)]/25 backdrop-blur-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--world-cyan)]" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-[var(--world-cyan)]">{content.badge}</span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl sm:text-8xl lg:text-9xl font-light tracking-tighter leading-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              <span className="opacity-90">Saimôr</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl text-[#D6A848] italic font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {content.subheadline}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            {content.description}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto relative z-30 pointer-events-auto"
          >
            <AnimatedButton
              href={locale === 'en' ? '/en/mora' : '/mora'}
              variant="gradient"
              size="lg"
              className="shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              {content.ctaPrimary}
            </AnimatedButton>
            <AnimatedButton
              href={cal}
              external
              variant="secondary"
              size="lg"
              className="backdrop-blur-xl"
            >
              {content.ctaSecondary}
            </AnimatedButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-12 sm:gap-24 pt-12"
          >
            {content.stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mb-1 group-hover:text-[var(--world-cyan)] transition-colors">
                  {stat.value}
                </div>
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-white/20">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 whitespace-nowrap">{content.scrollHint}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-[var(--world-violet)] rounded-full" />
        </motion.div>
      </motion.div>

      <button type="button" onClick={() => void toggleSound()} className="absolute bottom-10 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-[var(--world-gold)]/25 bg-[var(--world-ink)]/55 px-3 py-2 font-mono text-[8px] font-bold tracking-[.16em] text-[var(--world-gold)] backdrop-blur-xl transition hover:border-[var(--world-gold)]/60" aria-label={soundOn ? 'Ambient Sound ausschalten' : 'Ambient Sound einschalten'}>
        {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5 opacity-70" />}
        {soundOn ? 'AMBIENT ON' : 'AMBIENT'}
      </button>
            {/* Styles */}
      <style jsx global>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
}
