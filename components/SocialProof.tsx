'use client';

import { motion } from 'framer-motion';
import { Shield, Code, Lock, CheckCircle, ArrowRight } from 'lucide-react';

type Locale = 'de' | 'en';

interface SocialProofProps {
  locale?: Locale;
}

const metrics = [
  { value: '100%', label: { de: 'EU-Datenhoheit', en: 'EU Data Sovereignty' } },
  { value: 'DSGVO', label: { de: 'Konform by Design', en: 'Compliant by Design' } },
  { value: '0', label: { de: 'Third-Party Cookies', en: 'Third-Party Cookies' } },
  { value: 'Open', label: { de: 'Source Philosophy', en: 'Source Philosophy' } },
];

const pillars = [
  {
    icon: Shield,
    title: { de: '100% DSGVO-konform', en: '100% GDPR Compliant' },
    description: {
      de: 'Alle Daten bleiben in der EU. Keine externen Tracker, kein Drittanbieter-Profiling. Datenschutz ist keine Checkbox – er ist unsere Architektur.',
      en: 'All data stays in the EU. No external trackers, no third-party profiling. Privacy is not a checkbox – it is our architecture.',
    },
  },
  {
    icon: Code,
    title: { de: 'Open Source Philosophie', en: 'Open Source Philosophy' },
    description: {
      de: 'Wir entwickeln Saimôr mit offenen Standards. Kein Vendor Lock-in, keine Black Boxes – Transparenz beginnt bei der Technologie.',
      en: 'We build Saimôr with open standards. No vendor lock-in, no black boxes – transparency starts with the technology stack.',
    },
  },
  {
    icon: Lock,
    title: { de: 'Privacy by Design', en: 'Privacy by Design' },
    description: {
      de: 'Datenschutz ist kein nachträgliches Add-on. Jede Funktion wird von Anfang an unter dem Gesichtspunkt der Datensparsamkeit entworfen.',
      en: 'Privacy is not an afterthought. Every feature is designed from day one with data minimization as a first-class requirement.',
    },
  },
];

const testimonials = [
  {
    quote: {
      de: 'Das ist genau die Art von Werkzeug, die wir für unsere Gemeinde brauchen – klar, sicher, und ehrlich.',
      en: 'This is exactly the kind of tool our municipality needs – clear, secure, and honest.',
    },
    author: 'K. Berger',
    role: { de: 'Stadtplanungsamt', en: 'Urban Planning Office' },
  },
  {
    quote: {
      de: 'Endlich eine KI-Lösung, bei der ich weiß, wo meine Daten bleiben. Das gibt Vertrauen.',
      en: 'Finally an AI solution where I know exactly where my data stays. That builds real trust.',
    },
    author: 'S. Maier',
    role: { de: 'Geschäftsführerin, Beratungsbüro', en: 'Managing Director, Consulting Firm' },
  },
];

export default function SocialProof({ locale = 'de' }: SocialProofProps) {
  return (
    <section className="py-28 bg-gradient-to-b from-[#060a09] via-[#081410] to-[#060a09] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-emerald-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/15 mb-8">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">
              {locale === 'de' ? 'Unsere Grundsätze' : 'Our Principles'}
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-6 text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {locale === 'de' ? (
              <>Technologie, der man<br /><span className="italic text-emerald-400">vertrauen kann.</span></>
            ) : (
              <>Technology you can<br /><span className="italic text-emerald-400">actually trust.</span></>
            )}
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            {locale === 'de'
              ? 'Saimôr entsteht im Aufbau – und genau deshalb setzen wir jetzt auf ehrliche Kommunikation, offene Standards und europäische Datensouveränität.'
              : 'Saimôr is being built right now – and that is precisely why we commit to honest communication, open standards, and European data sovereignty from the very start.'}
          </p>
        </motion.div>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8 mb-20"
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              className="bg-[#081410] px-6 py-8 text-center hover:bg-emerald-500/5 transition-colors"
            >
              <div
                className="text-3xl md:text-4xl font-semibold text-emerald-400 mb-1"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {m.value}
              </div>
              <div className="text-xs text-white/40 tracking-wide">
                {m.label[locale]}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Value pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group relative rounded-3xl border border-white/8 bg-white/[0.03] p-8 hover:border-emerald-500/25 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/8 blur-[60px] rounded-full -translate-x-1/4 -translate-y-1/4" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center mb-6 group-hover:bg-emerald-500/15 transition-colors">
                    <Icon className="w-7 h-7 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-4 text-white"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {pillar.title[locale]}
                  </h3>
                  <p className="text-white/55 leading-relaxed text-sm">
                    {pillar.description[locale]}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 relative overflow-hidden"
            >
              <div
                className="text-5xl text-emerald-400/25 font-serif leading-none mb-4 select-none"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                &ldquo;
              </div>
              <p className="text-white/70 text-base leading-relaxed mb-6 italic">
                {t.quote[locale]}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-white/80 text-sm font-medium">{t.author}</div>
                  <div className="text-white/35 text-xs">{t.role[locale]}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/8 border border-emerald-500/15">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-sm font-medium">
              {locale === 'de' ? 'In aktiver Entwicklung · Early Access möglich' : 'In active development · Early access available'}
            </span>
          </div>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-emerald-400 transition-colors"
          >
            <span>{locale === 'de' ? 'Jetzt vormerken' : 'Join the waitlist'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
