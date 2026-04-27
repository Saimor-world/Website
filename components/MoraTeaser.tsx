'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Network, Lock, Zap } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
};

const capabilities = {
  de: [
    { icon: Brain, label: 'Semantische Analyse', desc: 'Zusammenhänge verstehen, nicht nur Daten verarbeiten' },
    { icon: Network, label: 'Mycelium-Netzwerk', desc: 'Vernetzt Ihr Wissen in Echtzeit' },
    { icon: Lock, label: 'Vollständig lokal', desc: 'Keine Cloud, keine Drittanbieter' },
    { icon: Zap, label: 'Echtzeit-Kontext', desc: 'Strategische Signale sofort erkannt' },
  ],
  en: [
    { icon: Brain, label: 'Semantic Analysis', desc: 'Understand connections, not just process data' },
    { icon: Network, label: 'Mycelium Network', desc: 'Connects your knowledge in real-time' },
    { icon: Lock, label: 'Fully local', desc: 'No cloud, no third parties' },
    { icon: Zap, label: 'Real-time context', desc: 'Strategic signals detected instantly' },
  ],
};

export default function MoraTeaser({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);
  const caps = capabilities[locale];

  return (
    <section className="relative py-32 sm:py-48 overflow-hidden bg-[#060a09]">
      {/* Background atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-emerald-500/10 blur-[180px] rounded-full" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/6 blur-[120px] rounded-full" />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">
                Semantic Intelligence
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h2
                className="text-5xl sm:text-7xl font-light tracking-tight leading-[0.9]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                <span className="block text-white/90">
                  {t('Kein Spiegel.', 'Not a mirror.')}
                </span>
                <span
                  className="block italic text-white/30"
                  aria-hidden
                >
                  …
                </span>
              </h2>
              <p className="text-sm text-white/30 uppercase tracking-[0.2em] pl-0.5">
                {t('Môra — die Antwort wartet auf der nächsten Seite', 'Môra — the answer waits on the next page')}
              </p>
            </div>

            {/* Body copy */}
            <p className="text-xl text-white/50 leading-relaxed max-w-lg">
              {t(
                'Môra ist die semantische Intelligenz-Ebene Ihres Systems. Sie erkennt strategische Zusammenhänge in Echtzeit – vollständig lokal, ohne Cloud-Abhängigkeit, ohne Kompromisse bei der Privatsphäre.',
                'Môra is the semantic intelligence layer of your system. It recognises strategic connections in real-time – fully local, without cloud dependency, without compromising on privacy.'
              )}
            </p>

            {/* Capabilities grid */}
            <div className="grid grid-cols-2 gap-3">
              {caps.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="group flex items-start gap-3 p-4 rounded-2xl border border-white/6 bg-white/[0.025] hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/15 transition-colors mt-0.5">
                      <Icon className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-white/80 text-sm font-medium leading-tight mb-0.5">{cap.label}</div>
                      <div className="text-white/35 text-xs leading-snug">{cap.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={locale === 'en' ? '/en/mora' : '/mora'}
                className="group px-8 py-4 rounded-2xl font-bold text-black transition-all hover:scale-[1.02] flex items-center justify-center gap-3 shadow-[0_20px_60px_rgba(52,211,153,0.25)]"
                style={{ background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)' }}
              >
                <span>{t('Showcase öffnen', 'Open Showcase')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href={locale === 'en' ? '/en/mora/analog-affect' : '/mora/analog-affect'}
                className="group px-8 py-4 rounded-2xl border border-white/10 text-white font-semibold hover:bg-white/5 backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:border-white/20"
              >
                <span>{t('Technische Details', 'Technical Details')}</span>
                <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="relative h-[480px] flex items-center justify-center"
          >
            {/* Outer glow ring */}
            <div className="absolute w-96 h-96 rounded-full border border-emerald-500/8 animate-spin-slow" />
            <div className="absolute w-72 h-72 rounded-full border border-emerald-500/12" style={{ animation: 'spin 20s linear infinite reverse' }} />

            {/* Pulsing core glow */}
            <div className="absolute w-80 h-80 bg-emerald-500/15 blur-[100px] rounded-full animate-pulse" />

            {/* Main showcase card */}
            <div
              className="relative w-full max-w-md aspect-square rounded-[2rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.6)] group hover:rotate-0 transition-all duration-700"
              style={{
                border: '1px solid rgba(52,211,153,0.15)',
                background: 'rgba(8,20,16,0.8)',
                transform: 'rotate(2deg)',
              }}
            >
              {/* Inner top highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.5), transparent)' }}
              />

              <img
                src="/images/mora_showcase.png"
                alt="Mora Semantic Intelligence Showcase"
                className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
              />

              {/* Bottom fade */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, #060a09 0%, transparent 50%)' }}
              />

              {/* Floating label */}
              <div className="absolute bottom-6 left-6 right-6">
                <div
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: 'rgba(8,20,16,0.85)',
                    border: '1px solid rgba(52,211,153,0.15)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 text-xs font-medium tracking-wide">
                    {t('Môra · Analyse läuft', 'Môra · Analysis running')}
                  </span>
                </div>
              </div>
            </div>

            {/* Orbiting accent dots */}
            <motion.div
              className="absolute w-full h-full pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-8 left-1/2 w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.9)]" />
              <div className="absolute bottom-14 right-16 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            </motion.div>

            <motion.div
              className="absolute w-[80%] h-[80%] pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 right-8 w-1 h-1 bg-emerald-300/60 rounded-full" />
              <div className="absolute bottom-0 left-12 w-1 h-1 bg-cyan-300/40 rounded-full" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
