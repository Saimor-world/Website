'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Cpu, Search, ShieldCheck } from 'lucide-react';

type Locale = 'de' | 'en';

const content = {
  de: {
    eyebrow: 'Einstieg',
    title: 'Fang klein an.\nSieh, was passiert.',
    text: 'Kurze Texte, die erklären statt zu verkaufen — und an jeder Stelle etwas, das du sofort ausprobieren kannst. Am einfachsten beginnst du mit dem Sicherheitscheck deiner Website: kostenlos, ohne Konto, in etwa einer Minute.',
    cta: 'Einstieg öffnen',
    href: '/de/einstieg',
    tracks: [
      {
        icon: ShieldCheck,
        label: 'Sicherheitscheck',
        desc: 'Was von außen sichtbar ist',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/15',
      },
      {
        icon: Cpu,
        label: 'Dein digitaler Zwilling',
        desc: 'Nimmt dir Routine ab',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/15',
      },
      {
        icon: Search,
        label: 'Zum Ausprobieren',
        desc: 'Ohne Konto, ohne Risiko',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/15',
      },
      {
        icon: BookOpen,
        label: 'Zum Nachlesen',
        desc: 'Wie das Ganze funktioniert',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/15',
      },
    ],
  },
  en: {
    eyebrow: 'Getting started',
    title: 'Start small.\nSee what happens.',
    text: 'Short pieces that explain rather than sell — and something you can try out at every step. The easiest place to begin is the security check for your website: free, no account, about a minute.',
    cta: 'Open the entry point',
    href: '/en/entry',
    tracks: [
      {
        icon: ShieldCheck,
        label: 'Security check',
        desc: 'What is visible from outside',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/15',
      },
      {
        icon: Cpu,
        label: 'Your digital twin',
        desc: 'Takes routine off your desk',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/15',
      },
      {
        icon: Search,
        label: 'Try it out',
        desc: 'No account, no risk',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/15',
      },
      {
        icon: BookOpen,
        label: 'Read up',
        desc: 'How the whole thing works',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/15',
      },
    ],
  },
};

export default function EntryTeaser({ locale }: { locale: Locale }) {
  const c = content[locale];

  return (
    <section className="relative py-24 bg-world-ink overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-world-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[2.5rem] border border-white/8 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(8,20,16,0.9) 0%, rgba(6,14,11,0.95) 100%)' }}
        >
          {/* Top accent line */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(214,168,72,0.3) 50%, transparent 100%)' }}
          />

          <div className="p-10 sm:p-14">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">

              {/* Left: Copy */}
              <div className="space-y-6">
                <p className="text-xs tracking-[0.35em] uppercase text-[#D6A848] font-medium">
                  {c.eyebrow}
                </p>
                <h2
                  className="text-4xl sm:text-5xl font-light leading-[1.05] text-white whitespace-pre-line"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {c.title.split('\n').map((line, i) =>
                    i === 1 ? (
                      <span key={i} className="block italic text-transparent bg-clip-text"
                        style={{ backgroundImage: 'linear-gradient(135deg, #D6A848 0%, #E4BE6D 100%)' }}>
                        {line}
                      </span>
                    ) : (
                      <span key={i} className="block">{line}</span>
                    )
                  )}
                </h2>
                <p className="text-white/55 text-base leading-relaxed max-w-lg">
                  {c.text}
                </p>

                <Link
                  href={c.href}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-black transition-all hover:scale-[1.02] shadow-[0_12px_40px_rgba(214,168,72,0.2)] mt-2"
                  style={{ background: 'linear-gradient(135deg, #D6A848, #C79E42)' }}
                >
                  <span>{c.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right: Track tiles */}
              <div className="grid grid-cols-2 gap-3">
                {c.tracks.map((track, i) => {
                  const Icon = track.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className={`group p-5 rounded-2xl border ${track.border} ${track.bg} hover:scale-[1.03] transition-all duration-300 cursor-default`}
                    >
                      <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center mb-3 ${track.color}`}>
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div className="font-semibold text-white/85 text-sm mb-0.5">{track.label}</div>
                      <div className="text-white/35 text-xs">{track.desc}</div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
