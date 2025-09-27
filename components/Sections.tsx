'use client';
import { motion } from 'framer-motion';
import { Zap, Database, Orbit } from 'lucide-react';
import ContactForm from './ContactForm';


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
      contact: { title: 'Contact', subtitle: 'Quick call, sharpen focus, decide the next step.', name: 'Name', email: 'Email', message: 'Message', send: 'Send message', book: 'Book Clarity Conversation', disclaimer: 'All inquiries and bookings run GDPR-compliant via Cal.com. No sales, but clarity in conversation.' }
    }
  }[locale];

  const cards = [
    { icon: Zap, key: 'pulse' },
    { icon: Database, key: 'systems' },
    { icon: Orbit, key: 'orbit' },
  ];

  return (
    <>
      {/* Organic Transition from Hero */}
      <div className="relative -mt-1 h-24 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <motion.path
            d="M0,40 Q300,60 600,50 T1200,40 L1200,100 L0,100 Z"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            fill="rgba(74, 103, 65, 0.95)"
          />
        </svg>
      </div>

      {/* Offers Section */}
      <section
        id="leistungen"
        className="relative py-16 sm:py-24 md:py-40 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(74, 103, 65, 0.95) 0%,
              rgba(93, 124, 84, 0.9) 25%,
              rgba(184, 212, 186, 0.85) 50%,
              rgba(93, 124, 84, 0.9) 75%,
              rgba(74, 103, 65, 0.95) 100%
            )
          `
        }}
      >
        {/* Organic Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(ellipse 1000px 600px at 20% 30%, rgba(212, 180, 131, 0.3) 0%, transparent 60%)',
              'radial-gradient(ellipse 1000px 600px at 80% 70%, rgba(212, 180, 131, 0.3) 0%, transparent 60%)',
              'radial-gradient(ellipse 1000px 600px at 50% 50%, rgba(212, 180, 131, 0.3) 0%, transparent 60%)',
              'radial-gradient(ellipse 1000px 600px at 20% 30%, rgba(212, 180, 131, 0.3) 0%, transparent 60%)'
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group relative rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-500 backdrop-blur-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(212, 180, 131, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%)',
                border: '1px solid rgba(212, 180, 131, 0.3)',
                boxShadow: '0 20px 40px rgba(74, 103, 65, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Organic glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(212, 180, 131, 0.2) 0%, transparent 70%)',
                  backdropFilter: 'blur(20px)'
                }}
              />

              <div className="relative z-10">
                <Icon className="mb-8 w-12 h-12 text-saimor-gold group-hover:text-saimor-gold-light group-hover:scale-125 transition-all duration-500" />

                <h3 className="font-serif text-2xl sm:text-3xl mb-4 text-white group-hover:text-saimor-gold-light transition-colors duration-500" style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {(translations.offers[key as keyof typeof translations.offers] as any).title}
                </h3>

                <h4 className="text-lg sm:text-xl font-medium mb-6 text-white/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
                  {(translations.offers[key as keyof typeof translations.offers] as any).subtitle}
                </h4>

                <p className="text-white/80 mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  {(translations.offers[key as keyof typeof translations.offers] as any).text}
                </p>

                <motion.a
                  href="https://cal.com/saimor/30min"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full px-6 py-4 rounded-xl border-2 border-gold-primary/30 text-gold-dark font-semibold text-lg hover:bg-gold-primary hover:text-forest-primary transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-forest-primary relative overflow-hidden group/btn text-center"
                  aria-label={`${(translations.offers[key as keyof typeof translations.offers] as any).cta} - Book via Cal.com (opens in new tab)`}
                >
                  <span className="relative z-10">{(translations.offers[key as keyof typeof translations.offers] as any).cta}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFCE45] to-[#FFD700] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-200" />
                </motion.a>

                <p className="text-xs text-[#F9F9F6]/50 mt-3 text-center">
                  {translations.offers.ctaHint}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Organic Transition to Mission */}
      <div className="relative h-24 overflow-hidden">
        <svg className="absolute top-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <motion.path
            d="M0,60 Q300,40 600,50 T1200,60 L1200,0 L0,0 Z"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            fill="rgba(248, 245, 243, 0.9)"
          />
        </svg>
      </div>

      {/* Mission Section */}
      <section
        id="mission"
        className="relative overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(250, 240, 230, 0.95) 0%,
              rgba(248, 245, 243, 0.9) 25%,
              rgba(212, 180, 131, 0.1) 50%,
              rgba(248, 245, 243, 0.9) 75%,
              rgba(240, 237, 232, 0.95) 100%
            )
          `
        }}
      >
        {/* Organic Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-15"
          animate={{
            background: [
              'radial-gradient(ellipse 800px 500px at 30% 40%, rgba(74, 103, 65, 0.2) 0%, transparent 70%)',
              'radial-gradient(ellipse 800px 500px at 70% 60%, rgba(74, 103, 65, 0.2) 0%, transparent 70%)',
              'radial-gradient(ellipse 800px 500px at 50% 30%, rgba(74, 103, 65, 0.2) 0%, transparent 70%)',
              'radial-gradient(ellipse 800px 500px at 30% 40%, rgba(74, 103, 65, 0.2) 0%, transparent 70%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 md:py-40">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8 mb-8 sm:mb-12 text-center sm:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-primary"
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
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-slate-900 font-bold">M</div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-forest-primary/80 max-w-4xl leading-relaxed mb-6 text-center sm:text-left"
          >
            {translations.mission.text}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-forest-primary/60 font-medium bg-gold-primary/10 px-6 py-3 rounded-full inline-block"
          >
            {translations.mission.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Organic Transition to Contact */}
      <div className="relative h-24 overflow-hidden">
        <svg className="absolute top-0 w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <motion.path
            d="M0,40 Q300,60 600,50 T1200,40 L1200,0 L0,0 Z"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            fill="rgba(74, 103, 65, 0.9)"
          />
        </svg>
      </div>

      {/* Contact Section */}
      <section
        id="kontakt"
        className="relative overflow-hidden py-16 sm:py-20 md:py-32"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(74, 103, 65, 0.9) 0%,
              rgba(93, 124, 84, 0.85) 25%,
              rgba(58, 82, 49, 0.95) 75%,
              rgba(74, 103, 65, 0.9) 100%
            )
          `
        }}
      >
        {/* Organic Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-25"
          animate={{
            background: [
              'radial-gradient(ellipse 1200px 800px at 25% 25%, rgba(212, 180, 131, 0.2) 0%, transparent 60%)',
              'radial-gradient(ellipse 1200px 800px at 75% 75%, rgba(212, 180, 131, 0.2) 0%, transparent 60%)',
              'radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(212, 180, 131, 0.2) 0%, transparent 60%)',
              'radial-gradient(ellipse 1200px 800px at 25% 25%, rgba(212, 180, 131, 0.2) 0%, transparent 60%)'
            ]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 text-white" style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            {translations.contact.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 max-w-3xl" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            {translations.contact.subtitle}
          </p>
        </motion.div>

        <ContactForm locale={locale} />
      </section>
    </>
  );
}
