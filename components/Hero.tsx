'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useCallback } from 'react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import CommunityNote from './CommunityNote';

const Orbits = dynamic(() => import('./Orbits'), { ssr: false });
const DataJungle = dynamic(() => import('./DataJungle'), { ssr: false });

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
  calUrl?: string;
  contactHashId?: string;
};

const logoPanelStyle: CSSProperties = {
  background: 'linear-gradient(145deg, rgba(18,31,26,0.95) 0%, rgba(40,63,50,0.92) 100%)',
  border: '1px solid rgba(212, 180, 131, 0.28)',
  boxShadow: '0 30px 90px rgba(5, 10, 8, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
  borderRadius: '28px',
  padding: '24px',
  position: 'relative'
};

const logoInnerGlow: CSSProperties = {
  background: 'radial-gradient(circle at 50% 30%, rgba(212,180,87,0.25), transparent 60%)',
  filter: 'blur(32px)',
  borderRadius: '48px'
};

export default function Hero({
  locale,
  calUrl,
  contactHashId = 'kontakt',
}: Props) {

  const heroText = {
    de: {
      heading: 'Saimôr – semantisches OS für Klarheit im Wandel',
      claim: 'Môra ist das Resonanz-Dashboard deiner Organisation: macht Zusammenhänge sichtbar, reduziert Lärm, begleitet Entscheidungen – aktuell als Demo mit simulierten Daten.',
      subline: 'Heute Demo mit strukturierter Simulation, morgen mit angebundenen Systemen – ohne Hype, nur Klarheit.',
      ctaPrimary: 'Demo ansehen',
      ctaSecondary: 'Gespräch vereinbaren'
    },
    en: {
      heading: 'Saimôr – a semantic OS for clarity in change',
      claim: 'Môra is your organisation’s resonance dashboard: reveals connections, reduces noise, guides decisions – today in demo mode with simulated data.',
      subline: 'Today: demo with realistically structured simulation. Tomorrow: live connectors – calm, no hype.',
      ctaPrimary: 'See the demo',
      ctaSecondary: 'Schedule a call'
    }
  }[locale];

  const heroHighlights = {
    de: [
      { label: 'Signalmodus', value: 'ruhig · 12 Impulse' },
      { label: 'Fokusfelder', value: 'People × Process' },
      { label: 'Status', value: 'Demo · Calm Beta' }
    ],
    en: [
      { label: 'Signal mode', value: 'calm · 12 signals' },
      { label: 'Focus fields', value: 'People × Process' },
      { label: 'Status', value: 'Demo · Calm beta' }
    ]
  }[locale];

  const logoNotes = {
    de: [
      { title: 'Organisch', copy: 'Form inspiriert vom Wald-Myzel' },
      { title: 'Primär grün', copy: 'Sanfte Übergänge statt hartem Kontrast' },
      { title: 'Goldpunkte', copy: 'Markieren Resonanz & Entscheidungen' }
    ],
    en: [
      { title: 'Organic', copy: 'Form inspired by forest mycelium' },
      { title: 'Primary green', copy: 'Soft gradients for calm focus' },
      { title: 'Golden nodes', copy: 'Signalling resonance & decisions' }
    ]
  }[locale];

  const badgeCopy = locale === 'de'
    ? 'Môra Resonanz · neues Erscheinungsbild'
    : 'Môra resonance · refreshed identity';

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const cal = calUrl ?? process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min';
  const fallbackHref =
    typeof window === 'undefined'
      ? `/${locale === 'en' ? 'en' : 'de'}/kontakt`
      : document.getElementById(contactHashId)
        ? `#${contactHashId}`
        : `/${locale === 'en' ? 'en' : 'de'}/kontakt`;

  const emitLogoClick = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    const detail = { x: event.clientX, y: event.clientY };
    window.dispatchEvent(new CustomEvent('mora-logo-click', { detail }));
  }, []);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleContactCta = () => {
    if (typeof window === 'undefined') return;
    if (document.getElementById(contactHashId)) {
      smoothScrollTo(contactHashId);
    } else {
      window.location.href = fallbackHref;
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
          loading="lazy"
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

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-32 z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.4em] text-white/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-[#E6C897]">●</span>
              {badgeCopy}
            </motion.div>

            <h1
              className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-tight text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 4px 20px rgba(0,0,0,0.55)' }}
            >
              {heroText.heading}
            </h1>

            <p className="mt-6 text-xl text-white/90 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              {heroText.claim}
            </p>

            <p className="mt-2 text-lg text-white/75 leading-relaxed max-w-2xl">
              {heroText.subline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.a
                href={cal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_18px_60px_rgba(10,15,12,0.65)]"
                style={{
                  background: 'linear-gradient(120deg, #8BB581, #4A6741 60%, #2C402F)',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {heroText.ctaPrimary}
              </motion.a>

              <motion.button
                onClick={handleContactCta}
                className="inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-base font-semibold text-white/90"
                style={{
                  background: 'rgba(15, 28, 23, 0.4)',
                  border: '1px solid rgba(212, 180, 131, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label={heroText.ctaSecondary}
              >
                {heroText.ctaSecondary}
              </motion.button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {heroHighlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-[#E6C897]/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <div
              className="relative overflow-hidden"
              style={logoPanelStyle}
              aria-label="Saimôr Logo Showcase"
              onClick={emitLogoClick}
            >
              <div className="absolute inset-0 opacity-60 pointer-events-none" style={logoInnerGlow} />
              <div className="absolute -inset-6 opacity-40 pointer-events-none" style={logoInnerGlow} />

              <div className="relative">
                <div className="flex items-center justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{locale === 'de' ? 'Markenzeichen' : 'Word mark'}</p>
                    <p className="text-2xl font-serif mt-1">Saimôr Logo 2026</p>
                    <p className="text-sm text-white/70">{locale === 'de' ? 'ruhig · organisch · klar' : 'calm · organic · clear'}</p>
                  </div>
                  <motion.span
                    className="rounded-full px-3 py-1 text-xs font-semibold text-[#0F1A17]"
                    style={{ background: 'linear-gradient(135deg, #E6C897, #D4A857)' }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    {locale === 'de' ? 'Neu' : 'New'}
                  </motion.span>
                </div>

                <div className="relative mt-6 rounded-[28px] border border-white/10 bg-[#0f1c16]/60 px-6 py-8 overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <Orbits className="absolute inset-0" />
                  </div>
                  <div className="relative flex items-center justify-center">
                    <Image
                      src="/saimor-logo-new.png"
                      alt="Saimôr Logo"
                      width={420}
                      height={480}
                      className="w-full max-w-xs sm:max-w-sm object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)]"
                      priority
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {logoNotes.map((note) => (
                    <div
                      key={note.title}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/85"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-[#E6C897]/80">{note.title}</p>
                      <p className="mt-1 text-sm leading-relaxed">{note.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <CommunityNote locale={locale} className="max-w-3xl px-0" />
        </div>
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





