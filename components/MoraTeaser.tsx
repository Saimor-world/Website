'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Network, Lock, Zap } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale: Locale;
};

const capabilities = {
  de: [
    { icon: Brain, label: 'Semantische Analyse', desc: 'Zusammenhaenge verstehen, nicht nur Daten verarbeiten' },
    { icon: Network, label: 'Mycelium-Netzwerk', desc: 'Wissen, Signale und Entscheidungen verbinden' },
    { icon: Lock, label: 'Vollstaendig lokal', desc: 'Private Daten bleiben unter deiner Kontrolle' },
    { icon: Zap, label: 'Echtzeit-Kontext', desc: 'Strategische Signale werden sofort sichtbar' },
  ],
  en: [
    { icon: Brain, label: 'Semantic Analysis', desc: 'Understand connections, not just process data' },
    { icon: Network, label: 'Mycelium Network', desc: 'Connect knowledge, signals and decisions' },
    { icon: Lock, label: 'Fully local', desc: 'Private data stays under your control' },
    { icon: Zap, label: 'Real-time context', desc: 'Strategic signals become visible immediately' },
  ],
};

export default function MoraTeaser({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);
  const caps = capabilities[locale];

  return (
    <section className="relative overflow-hidden border-t border-[var(--world-border)] bg-[var(--world-ink)] py-28 text-[var(--world-paper)] sm:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_34%,rgba(214,168,72,.14),transparent_30%),radial-gradient(circle_at_78%_24%,rgba(232,215,170,.07),transparent_28%),linear-gradient(180deg,var(--world-night),var(--world-ink)_54%,#070b0c)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(214,168,72,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(232,215,170,.08)_1px,transparent_1px)] [background-size:96px_96px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--world-gold)]/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--world-gold)]/25 bg-[var(--world-gold)]/8 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[var(--world-gold)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--world-gold)]/90">
                SEMANTIC INTELLIGENCE / MÔRA CORE
              </span>
            </div>

            <div className="space-y-4">
              <p className="font-mono text-[12px] font-bold tracking-[.42em] text-[var(--world-gold)]">MÔRA</p>
              <h2 className="text-5xl font-light leading-none sm:text-7xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {t('Sie hoert zu.', 'She listens.')}
              </h2>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--world-mora-mist)]/72">
                {t('Die Intelligenz im Saimôr Betriebssystem', 'The intelligence inside the Saimôr operating system')}
              </p>
            </div>

            <p className="max-w-lg text-xl leading-relaxed text-white/58">
              {t(
                'Môra ist die semantische Intelligenz-Ebene des Systems. Sie erkennt Zusammenhaenge, hoert auf Signale und bringt Ordnung in Entscheidungen, ohne deine privaten Daten aus der Hand zu geben.',
                'Môra is the semantic intelligence layer of the system. It reads context, listens for signals and brings order to decisions without taking private data out of your hands.'
              )}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {caps.map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="group flex items-start gap-3 rounded-2xl border border-[var(--world-border)] bg-white/[0.035] p-4 transition-all duration-300 hover:border-[var(--world-gold)]/35 hover:bg-[var(--world-gold)]/5"
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--world-gold)]/10 transition-colors group-hover:bg-[var(--world-gold)]/16">
                      <Icon className="h-4 w-4 text-[var(--world-gold)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="mb-0.5 text-sm font-medium leading-tight text-white/82">{cap.label}</div>
                      <div className="text-xs leading-snug text-white/40">{cap.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <a
                href={locale === 'en' ? '/en/mora' : '/mora'}
                className="group flex items-center justify-center gap-3 rounded-2xl px-8 py-4 font-bold text-black shadow-[0_20px_60px_rgba(214,168,72,0.22)] transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #E7C46A 0%, #B8892C 100%)' }}
              >
                <span>{t('Môra oeffnen', 'Open Mora')}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href={locale === 'en' ? '/en/mora/analog-affect' : '/mora/analog-affect'}
                className="group flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/5"
              >
                <span>{t('Technische Details', 'Technical Details')}</span>
                <ArrowRight className="h-4 w-4 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:opacity-70" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1 }}
            className="relative flex h-[480px] items-center justify-center"
          >
            <div className="absolute h-[27rem] w-[27rem] rounded-full border border-[var(--world-gold)]/10" />
            <div className="absolute h-[20rem] w-[20rem] rounded-full border border-[var(--world-mora-mist)]/12" />
            <div className="absolute h-80 w-80 rounded-full bg-[var(--world-gold)]/12 blur-[100px]" />

            <div
              className="group relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-all duration-700 hover:rotate-0"
              style={{
                border: '1px solid rgba(214,168,72,0.18)',
                background: 'rgba(13,18,32,0.88)',
                transform: 'rotate(1.4deg)',
              }}
            >
              <div className="absolute left-0 right-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(214,168,72,.58),transparent)]" />
              <Image
                src="/images/mora_showcase.png"
                alt="Môra semantic intelligence showcase"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-78 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,#0C1020_0%,transparent_52%)]" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--world-gold)]/20 bg-[#081410]/85 px-3 py-2 backdrop-blur-xl">
                  <span className="h-2 w-2 rounded-full bg-[var(--world-mora-mist)] shadow-[0_0_18px_rgba(214,168,72,.6)]" />
                  <span className="text-xs font-medium tracking-wide text-[var(--world-gold)]">
                    {t('Môra Analyse laeuft', 'Môra analysis running')}
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              className="pointer-events-none absolute h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute left-1/2 top-8 h-2.5 w-2.5 rounded-full bg-[var(--world-gold)] shadow-[0_0_20px_rgba(214,168,72,0.9)]" />
              <div className="absolute bottom-14 right-16 h-1.5 w-1.5 rounded-full bg-[var(--world-mora-mist)] shadow-[0_0_12px_rgba(214,168,72,0.6)]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
