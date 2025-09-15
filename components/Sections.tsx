'use client';
import { motion } from 'framer-motion';
import { Zap, Database, Orbit } from 'lucide-react';
import BrandSun from './BrandSun';


export default function Sections({ locale }: { locale: 'de'|'en' }) {
  const translations = {
    de: {
      offers: {
        pulse: { title: 'Pulse', subtitle: 'Workshops & Impulsformate', text: 'Gemeinsam Klarheit im Wandel erzeugen und Menschen in Veränderungen mitnehmen.', cta: 'Impulse entdecken' },
        systems: { title: 'Systems', subtitle: 'Daten, Dashboards & KI', text: 'Verständliche Datenlösungen, die Menschen befähigen statt überfordern.', cta: 'Einblick erhalten' },
        orbit: { title: 'Orbit', subtitle: 'Selbstorganisation & Coaching', text: 'Persönliche Klarheit und nachhaltige Strukturen für Einzelne und Teams.', cta: 'Klarheitsgespräch starten' },
        ctaHint: 'Ruhiger Erstkontakt über Cal.com'
      },
      mission: {
        title: 'Mission & Haltung',
        text: 'Saimôr entsteht aus der Überzeugung, dass echter Wandel nur durch Klarheit gelingt. Wir schaffen Resonanzräume, in denen Menschen, Daten und Veränderung aufeinandertreffen – ohne Überforderung, mit Vertrauen.',
        subtitle: 'Start: 1. September 2025'
      },
      contact: { title: 'Kontakt', subtitle: 'Kurz sprechen, Fokus klären, nächsten Schritt festlegen.', name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Nachricht senden', book: 'Lichtgespräch buchen', disclaimer: 'Alle Anfragen und Buchungen laufen DSGVO-konform über Cal.com. Kein Verkauf, sondern Klarheit im Gespräch.' }
    },
    en: {
      offers: {
        pulse: { title: 'Pulse', subtitle: 'Workshops & Impulse Formats', text: 'Create clarity in change together and bring people along in transformations.', cta: 'Discover impulses' },
        systems: { title: 'Systems', subtitle: 'Data, Dashboards & AI', text: 'Understandable data solutions that empower rather than overwhelm people.', cta: 'Get insights' },
        orbit: { title: 'Orbit', subtitle: 'Self-organization & Coaching', text: 'Personal clarity and sustainable structures for individuals and teams.', cta: 'Start clarity conversation' },
        ctaHint: 'Calm first contact via Cal.com'
      },
      mission: {
        title: 'Mission & Stance',
        text: 'Saimôr emerges from the conviction that real change only succeeds through clarity. We create resonance spaces where people, data and change meet – without overwhelm, with trust.',
        subtitle: 'Launch: September 1, 2025'
      },
      contact: { title: 'Contact', subtitle: 'Quick call, sharpen focus, decide the next step.', name: 'Name', email: 'Email', message: 'Message', send: 'Send message', book: 'Book Light Conversation', disclaimer: 'All inquiries and bookings run GDPR-compliant via Cal.com. No sales, but clarity in conversation.' }
    }
  }[locale];

  const cards = [
    { icon: Zap, key: 'pulse' },
    { icon: Database, key: 'systems' },
    { icon: Orbit, key: 'orbit' },
  ];

  return (
    <>
      {/* Offers Section */}
      <section id="leistungen" className="mx-auto max-w-7xl px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 }
              }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-xl hover:shadow-2xl hover:border-[#FFCE45]/40 transition-all duration-300 backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFCE45]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <Icon className="mb-6 w-10 h-10 text-[#FFCE45] group-hover:scale-110 transition-transform duration-300" />

                <h3 className="font-serif text-3xl mb-3 text-[#F9F9F6] group-hover:text-[#FFCE45] transition-colors duration-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {(translations.offers[key as keyof typeof translations.offers] as any).title}
                </h3>

                <h4 className="text-xl font-medium mb-4 text-[#F9F9F6]/90">
                  {(translations.offers[key as keyof typeof translations.offers] as any).subtitle}
                </h4>

                <p className="text-[#F9F9F6]/70 mb-8 leading-relaxed text-lg">
                  {(translations.offers[key as keyof typeof translations.offers] as any).text}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 rounded-xl border-2 border-[#FFCE45]/30 text-[#FFCE45] font-semibold text-lg hover:bg-[#FFCE45] hover:text-[#0E1526] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FFCE45] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1526] relative overflow-hidden group/btn"
                >
                  <span className="relative z-10">{(translations.offers[key as keyof typeof translations.offers] as any).cta}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFCE45] to-[#FFD700] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200" />
                </motion.button>

                <p className="text-xs text-[#F9F9F6]/50 mt-3 text-center">
                  {translations.offers.ctaHint}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="relative border-t border-[#FFCE45] bg-gradient-to-b from-[#FFCE45]/5 via-transparent to-transparent"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-32">
          <div className="flex items-center gap-6 mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl text-[#F9F9F6]"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {translations.mission.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <BrandSun className="w-8 h-8 md:w-10 md:h-10" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#F9F9F6]/90 max-w-4xl leading-relaxed"
          >
            {translations.mission.text}
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="mx-auto max-w-7xl px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[#F9F9F6]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {translations.contact.title}
          </h2>
          <p className="text-xl text-[#F9F9F6]/80 mb-12 max-w-3xl">
            {translations.contact.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <form className="grid md:grid-cols-2 gap-6 mb-8" action={`/api/contact`} method="post">
            <input
              className="px-6 py-4 rounded-xl bg-white/[0.06] border border-white/20 text-[#F9F9F6] placeholder-[#F9F9F6]/50 focus:border-[#FFCE45]/60 focus:outline-none focus:ring-2 focus:ring-[#FFCE45]/20 transition-all duration-200"
              name="name"
              placeholder={translations.contact.name}
              required
            />
            <input
              className="px-6 py-4 rounded-xl bg-white/[0.06] border border-white/20 text-[#F9F9F6] placeholder-[#F9F9F6]/50 focus:border-[#FFCE45]/60 focus:outline-none focus:ring-2 focus:ring-[#FFCE45]/20 transition-all duration-200"
              name="email"
              type="email"
              placeholder={translations.contact.email}
              required
            />
            <textarea
              className="md:col-span-2 px-6 py-4 rounded-xl bg-white/[0.06] border border-white/20 text-[#F9F9F6] placeholder-[#F9F9F6]/50 focus:border-[#FFCE45]/60 focus:outline-none focus:ring-2 focus:ring-[#FFCE45]/20 transition-all duration-200 resize-none"
              name="message"
              placeholder={translations.contact.message}
              rows={6}
              required
            />
          </form>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl border-2 border-[#F9F9F6]/20 text-[#F9F9F6] font-semibold hover:border-[#FFCE45]/60 hover:text-[#FFCE45] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FFCE45] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1526]"
            >
              {translations.contact.send}
            </motion.button>

            <motion.a
              href="https://cal.com/saimor/30min"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-xl bg-[#FFCE45] text-[#0E1526] font-semibold hover:brightness-110 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FFCE45] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E1526] text-center"
            >
              {translations.contact.book}
            </motion.a>
          </div>

          <p className="text-sm text-[#F9F9F6]/60 leading-relaxed">
            {translations.contact.disclaimer}
          </p>
        </motion.div>
      </section>
    </>
  );
}
