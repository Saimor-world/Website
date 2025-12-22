'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import LocalSystemConnector from './LocalSystemConnector';
import { Terminal } from 'lucide-react';

type Locale = 'de' | 'en';

type PortalPreviewProps = {
  locale: Locale;
};

const copy = {
  de: {
    eyebrow: 'Portal · Preview',
    title: 'Ein ruhiger Zugang für Teams',
    subtitle: 'Die Oberfläche existiert bereits als Demo-Struktur: Login-Shell, Raum-Übersicht, geführte Entscheidungen. Noch ohne Identität – aber mit allen Bausteinen.',
    cards: [
      {
        title: 'Startbereich',
        body: 'Sanfter Onboarding-Flow mit Kontextkarten, Demo-Daten-Hinweis und einem „weiter atmen“-CTA.',
        badge: '01'
      },
      {
        title: 'Dashboard-Shell',
        body: 'Folder- und Feld-Modus, KPIs als Module, gleiche Daten wie auf der Website – nur interaktiv, aber noch read-only.',
        badge: '02'
      },
      {
        title: 'Vertrauensraum',
        body: 'Geführte Check-ins, geteilte Notizen, Export-Knopf. Alles vorbereitet für spätere Accounts.',
        badge: '03'
      }
    ],
    cta: 'Demo-Zugang anfragen',
    connect: 'Lokal Verbinden',
    note: 'Hinweis: Portal ist noch Demo-only. Keine Logins, kein Tracking.'
  },
  en: {
    eyebrow: 'Portal · Preview',
    title: 'A calm access point for teams',
    subtitle: 'The surface already exists as a demo structure: login shell, room overview, guided decisions. No identity layer yet – but all building blocks are in place.',
    cards: [
      {
        title: 'Welcome Area',
        body: 'Gentle onboarding flow with context cards, demo-data notice and a “breathe first” CTA.',
        badge: '01'
      },
      {
        title: 'Dashboard Shell',
        body: 'Folder & field modes, KPI modules, same data as the website – only interactive, still read-only.',
        badge: '02'
      },
      {
        title: 'Trust Room',
        body: 'Guided check-ins, shared notes, export control. Ready for accounts later on.',
        badge: '03'
      }
    ],
    cta: 'Request demo access',
    connect: 'Connect Local',
    note: 'Note: Portal is demo-only. No logins, no tracking yet.'
  }
} as const;

export default function PortalPreview({ locale }: PortalPreviewProps) {
  const text = copy[locale];
  const [showConnector, setShowConnector] = useState(false);

  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-3xl p-8 sm:p-12 shadow-[0_32px_128px_rgba(0,0,0,0.6)] min-h-[600px] flex flex-col justify-center">
      {/* Decorative background orbs */}
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: 'radial-gradient(circle, #D4A857 0%, transparent 70%)' }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-20 blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: 'radial-gradient(circle, #4A6741 0%, transparent 70%)' }}
      />

      <div className="relative z-10 space-y-12">
        <AnimatePresence mode="wait">
          {showConnector ? (
            <motion.div
              key="connector"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full"
            >
              <div className="mb-8 text-center">
                <button
                  onClick={() => setShowConnector(false)}
                  className="text-xs text-white/40 hover:text-white uppercase tracking-widest transition-colors mb-4"
                >
                  ← {locale === 'de' ? 'Zurück zur Vorschau' : 'Back to Preview'}
                </button>
              </div>
              <LocalSystemConnector locale={locale} />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-w-3xl space-y-4 mb-12">
                <p className="text-xs uppercase tracking-[0.5em] text-[#D4A857] font-semibold">
                  {text.eyebrow}
                </p>
                <h2
                  className="text-4xl sm:text-5xl font-semibold text-white leading-tight"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {text.title}
                </h2>
                <p className="text-lg text-white/70 leading-relaxed font-light">
                  {text.subtitle}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 mb-12">
                {text.cards.map((card, index) => (
                  <motion.article
                    key={card.title}
                    className="group relative rounded-[2rem] border border-white/5 bg-white/[0.03] p-8 transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-2xl hover:shadow-[#D4A857]/5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Badge */}
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xs font-mono tracking-widest text-[#D4A857] group-hover:bg-[#D4A857]/10 group-hover:border-[#D4A857]/30 transition-colors">
                      {card.badge}
                    </div>

                    <h3 className="text-2xl font-semibold text-white mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                      {card.body}
                    </p>

                    {/* Subtle hover reveal line */}
                    <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4A857]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  </motion.article>
                ))}
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between pt-8 border-t border-white/5">
                <div className="flex gap-4">
                  <Link
                    href={locale === 'de' ? '/#kontakt' : '/en#kontakt'}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-white/15 active:scale-95"
                  >
                    <span className="relative z-10">{text.cta}</span>
                  </Link>
                  <button
                    onClick={() => setShowConnector(true)}
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 px-6 py-4 text-sm font-bold uppercase tracking-widest text-[#D4A857] transition-all hover:bg-[#D4A857]/10 active:scale-95 flex gap-2"
                  >
                    <Terminal size={14} />
                    <span className="relative z-10">{text.connect}</span>
                  </button>
                </div>

                <div className="space-y-1 text-center sm:text-right">
                  <p className="text-xs text-[#D4A857]/60 uppercase tracking-[0.3em] font-medium">
                    Saimôr OS · System Status
                  </p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">
                    {text.note}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
