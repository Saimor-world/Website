'use client';
import { motion } from 'framer-motion';
import { Zap, Database, Orbit } from 'lucide-react';

export default function OffersMission({ locale }: { locale: 'de' | 'en' }) {
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
      contact: { title: 'Kontakt', subtitle: 'Kurz sprechen, Fokus klären, nächsten Schritt festlegen.', name: 'Name', email: 'E-Mail', message: 'Nachricht', send: 'Nachricht senden', book: 'Klarheitsgespräch buchen', disclaimer: 'Alle Anfragen und Buchungen laufen DSGVO-konform über Cal.com. Kein Verkauf, sondern Klarheit im Gespräch.' }
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
      <section id="leistungen" className="py-16 sm:py-24 md:py-40 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(248,245,240,0.98) 0%, rgba(250,240,230,0.95) 100%)'
        }}>
        {/* Subtle organic background elements */}
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(74, 103, 65, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
          animate={{
            y: [-30, 30, -30],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-1/5 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
            filter: 'blur(70px)'
          }}
          animate={{
            y: [30, -30, 30],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                className="group relative rounded-3xl border p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,245,240,0.9) 100%)',
                  borderColor: 'rgba(212,168,87,0.25)'
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-saimor-gold/15 to-saimor-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="mb-6 w-10 h-10 text-saimor-gold group-hover:drop-shadow-lg transition-all duration-300" />
                  </motion.div>

                  <h3 className="font-serif text-2xl sm:text-3xl mb-3 transition-colors duration-300"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                    {(translations.offers[key as keyof typeof translations.offers] as any).title}
                  </h3>

                  <h4 className="text-lg sm:text-xl font-medium mb-4 text-saimor-green/90">
                    {(translations.offers[key as keyof typeof translations.offers] as any).subtitle}
                  </h4>

                  <p className="text-slate-700 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                    {(translations.offers[key as keyof typeof translations.offers] as any).text}
                  </p>

                  <motion.a
                    href="https://cal.com/saimor/30min"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full px-6 py-4 sm:py-5 rounded-full font-semibold text-lg transition-all duration-300 min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-saimor-gold focus-visible:ring-offset-2 relative overflow-hidden group/btn text-center text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 50%, rgba(212, 180, 131, 0.85) 100%)',
                      border: '2px solid rgba(212, 180, 131, 0.4)',
                      boxShadow: '0 8px 25px rgba(74, 103, 65, 0.25)'
                    }}
                    aria-label={`${(translations.offers[key as keyof typeof translations.offers] as any).cta} - Book via Cal.com (opens in new tab)`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-saimor-green/95 to-saimor-gold-light/90 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{(translations.offers[key as keyof typeof translations.offers] as any).cta}</span>
                  </motion.a>

                  <p className="text-xs text-slate-600 mt-3 text-center">
                    {translations.offers.ctaHint}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="relative border-t-2 overflow-hidden"
        style={{
          borderColor: 'rgba(212, 180, 131, 0.4)',
          background: 'linear-gradient(135deg, #f8faf9 0%, #faf8f6 50%, #f7f5f3 100%)'
        }}
      >
        {/* Background elements */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(74, 103, 65, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 md:py-40">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8 mb-8 sm:mb-12 text-center sm:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {translations.mission.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, 0]
              }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.9) 0%, rgba(212, 180, 131, 0.85) 100%)'
                }}>M</div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-700 max-w-4xl leading-relaxed mb-6 text-center sm:text-left"
          >
            {translations.mission.text}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="text-lg text-slate-700 font-medium px-6 py-3 rounded-full inline-block"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.15) 0%, rgba(74, 103, 65, 0.1) 100%)',
              border: '1px solid rgba(212, 180, 131, 0.3)'
            }}
          >
            {translations.mission.subtitle}
          </motion.p>
        </div>
      </section>


    </>
  );
}
