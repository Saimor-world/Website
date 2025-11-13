'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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
    note: 'Note: Portal is demo-only. No logins, no tracking yet.'
  }
} as const;

export default function PortalPreview({ locale }: PortalPreviewProps) {
  const text = copy[locale];

  return (
    <section className="relative overflow-hidden rounded-[48px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_35px_90px_rgba(0,0,0,0.4)]">
      <motion.div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-30 blur-[120px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 16, repeat: Infinity }}
        style={{
          background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-saimor-gold">
            {text.eyebrow}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {text.title}
          </h2>
          <p className="text-base text-white/85 leading-relaxed">
            {text.subtitle}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {text.cards.map((card, index) => (
            <motion.article
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/8 p-5 sm:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="inline-flex items-center justify-center rounded-full border border-white/20 px-3 py-1 text-xs tracking-[0.3em] text-white/70 mb-4">
                {card.badge}
              </span>
              <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {card.title}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed">
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={locale === 'de' ? '/#kontakt' : '/en#kontakt'}
            className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-white/10 min-h-[44px]"
          >
            {text.cta}
          </Link>
          <p className="text-xs text-white/60 uppercase tracking-[0.4em] text-center sm:text-right">
            {text.note}
          </p>
        </div>
      </div>
    </section>
  );
}
