'use client';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Props = { locale: 'de' | 'en' };

export default function FAQ({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t('Was ist Saimôr?', 'What is Saimôr?'),
      a: t(
        'Saimôr begleitet Menschen und Organisationen im Wandel. Wir schaffen Resonanzräume für Klarheit – durch persönliche Begleitung (Orbit, Pulse) und technische Unterstützung (Môra OS). Kein Verkaufsdruck, keine Profile, keine Standardlösungen.',
        'Saimôr accompanies people and organizations in transformation. We create resonance spaces for clarity – through personal guidance (Orbit, Pulse) and technical support (Môra OS). No sales pressure, no profiling, no standard solutions.'
      )
    },
    {
      q: t('Was ist Môra?', 'What is Môra?'),
      a: t(
        'Môra ist unsere KI-Begleiterin – Dashboard-Intelligence, Web-Chat und Voice-Assistent. Aktuell läuft Môra als MVP-Prototyp mit lokal generierten Demo-Daten. Keine Kundendaten, keine externen Clouds. Môra navigiert mit dir durch Komplexität zur klaren Handlung.',
        'Môra is our AI companion – dashboard intelligence, web chat, and voice assistant. Currently running as MVP prototype with locally generated demo data. No customer data, no external clouds. Môra navigates with you through complexity to clear action.'
      )
    },
    {
      q: t('Wie läuft die Demo-/Erstphase?', 'How does the demo/early phase work?'),
      a: t(
        'Aktuell entwickeln wir gemeinsam mit Pilot-Partnern. Alle Dashboard-Daten sind simuliert, die Adapter-Schicht zeigt Potenzial ohne echte Kundendaten. Orbit und Pulse sind bereits buchbar. Môra-Warteliste über die Website.',
        'Currently developing together with pilot partners. All dashboard data is simulated, the adapter layer shows potential without real customer data. Orbit and Pulse are already bookable. Môra waitlist via website.'
      )
    },
    {
      q: t('Wie geht ihr mit Daten & Datenschutz um?', 'How do you handle data & privacy?'),
      a: t(
        'DSGVO-Guardrails: EU-Hosting, keine Profile, kein Tracking, aggregierte Geschäftsdaten (keine Einzelpersonen-Metriken). In der Demo-Phase: Ausschließlich lokale Simulations-Daten. Transparenz ist Pflicht, Datensouveränität ist Standard.',
        'GDPR guardrails: EU hosting, no profiles, no tracking, aggregated business data (no individual-level metrics). In demo phase: Exclusively local simulation data. Transparency is mandatory, data sovereignty is standard.'
      )
    },
    {
      q: t('Für wen ist Saimôr geeignet?', 'Who is Saimôr suitable for?'),
      a: t(
        'Organisationen und Menschen, die an einem Punkt stehen, wo bisherige Strukturen nicht mehr passen. Kommunen, wachsende Unternehmen, Teams, Einzelpersonen – alle, die Klarheit vor Komplexität setzen.',
        'Organizations and people at a point where existing structures no longer fit. Municipalities, growing companies, teams, individuals – anyone who prioritizes clarity over complexity.'
      )
    },
    {
      q: t('Wie kann ich mitwirken?', 'How can I participate?'),
      a: t(
        'Klarheitsgespräch buchen (30 Min., kostenlos), Môra-Warteliste beitreten, oder direkt ein Orbit/Pulse-Format anfragen. Wir klären gemeinsam, was Sinn ergibt – ohne Druck, mit Tiefe.',
        'Book a clarity call (30 min, free), join the Môra waitlist, or directly request an Orbit/Pulse format. We clarify together what makes sense – without pressure, with depth.'
      )
    }
  ];

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8F5F0 0%, #FAF0E6 100%)' }}>
      {/* Background elements */}
      <motion.div
        className="absolute top-1/3 left-1/5 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74, 103, 65, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
        animate={{
          y: [-40, 40, -40],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('Häufige Fragen', 'Frequently Asked Questions')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('Alles, was Sie über Saimôr wissen sollten', 'Everything you should know about Saimôr')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)',
                border: '1px solid rgba(212, 180, 131, 0.35)',
                backdropFilter: 'blur(24px)',
                boxShadow: openIndex === i
                  ? '0 20px 50px rgba(10, 22, 18, 0.2)'
                  : '0 8px 20px rgba(10, 22, 18, 0.12)'
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-saimor-green/5 transition-colors duration-200"
              >
                <span className="font-serif text-lg sm:text-xl font-semibold text-slate-900 pr-4"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-1"
                >
                  <ChevronDown className="w-6 h-6 text-saimor-green" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="text-slate-700 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 mb-6">
            {t('Weitere Fragen? Lassen Sie uns sprechen.', 'More questions? Let\'s talk.')}
          </p>
          <motion.a
            href="https://cal.com/saimor/30min"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 50%, rgba(212, 180, 131, 0.85) 100%)',
              boxShadow: '0 10px 30px rgba(74, 103, 65, 0.25)'
            }}
          >
            {t('Klarheitsgespräch buchen', 'Book clarity call')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
