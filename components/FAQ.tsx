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
      q: t('Was unterscheidet Saimôr von klassischen Beratungen?', 'What distinguishes Saimôr from traditional consulting?'),
      a: t(
        'Wir verkaufen keine Standardlösungen, sondern schaffen Resonanzräume für Klarheit. Statt auf Effizienz und Optimierung setzen wir auf Verstehen und nachhaltige Veränderung. Unsere Formate (Orbit, Pulse, Systems) kombinieren persönliche Begleitung mit systemischer Methodik – ohne Verkaufsdruck, ohne Profile.',
        'We don\'t sell standard solutions, but create resonance spaces for clarity. Instead of focusing on efficiency and optimization, we emphasize understanding and sustainable change. Our formats (Orbit, Pulse, Systems) combine personal guidance with systemic methodology – without sales pressure, without profiling.'
      )
    },
    {
      q: t('Für wen ist Saimôr geeignet?', 'Who is Saimôr suitable for?'),
      a: t(
        'Saimôr begleitet vier Zielgruppen: (1) Öffentlicher Sektor (Kommunen, Verwaltungen), (2) Wachsende Unternehmen (15-150 Mitarbeitende), (3) Persönliche Entwicklung (Einzelpersonen, Teams), (4) B2B-Kooperationen (Agenturen, Beratungen). Gemeinsam: Alle stehen an einem Punkt, wo bisherige Strukturen nicht mehr passen.',
        'Saimôr accompanies four target groups: (1) Public sector (municipalities, administrations), (2) Growing companies (15-150 employees), (3) Personal development (individuals, teams), (4) B2B cooperations (agencies, consultancies). Common thread: All are at a point where existing structures no longer fit.'
      )
    },
    {
      q: t('Wie läuft ein Klarheitsgespräch ab?', 'How does a clarity call work?'),
      a: t(
        '30 Minuten kostenlos, ohne Verkaufsdruck. Wir hören zu, stellen Fragen und klären gemeinsam, ob und wie Saimôr für Sie Sinn ergibt. Danach entscheiden Sie in Ruhe. Buchung über Cal.com, DSGVO-konform, keine Datenprofile.',
        '30 minutes free, without sales pressure. We listen, ask questions, and clarify together whether and how Saimôr makes sense for you. Afterward, you decide at your own pace. Booking via Cal.com, GDPR-compliant, no data profiles.'
      )
    },
    {
      q: t('Was kostet Saimôr?', 'What does Saimôr cost?'),
      a: t(
        'Die Investition hängt vom Format ab: Pulse-Workshops ab €1.200, Orbit-Begleitung ab €2.500/Monat (3-6 Monate), Systems-Dashboards ab €3.500 (Nova-Paket). Alle Preise verstehen sich zzgl. MwSt. Im Klarheitsgespräch besprechen wir konkrete Bedarfe und Budgets.',
        'Investment depends on the format: Pulse workshops from €1,200, Orbit accompaniment from €2,500/month (3-6 months), Systems dashboards from €3,500 (Nova package). All prices excl. VAT. In the clarity call, we discuss specific needs and budgets.'
      )
    },
    {
      q: t('Wie sieht Datenschutz & Sicherheit aus?', 'What about data privacy & security?'),
      a: t(
        'Alle Daten werden EU-basiert gehostet (DSGVO-konform). Wir erstellen keine Profile, verkaufen keine Daten, nutzen keine Tracking-Tools. Bei Systems-Dashboards: End-to-End Verschlüsselung, granulare Zugriffsrechte, jederzeit Daten-Export möglich.',
        'All data is hosted in the EU (GDPR-compliant). We don\'t create profiles, sell data, or use tracking tools. For Systems dashboards: End-to-end encryption, granular access rights, data export available anytime.'
      )
    },
    {
      q: t('Wann starten wir?', 'When do we start?'),
      a: t(
        'Nach dem Klarheitsgespräch definieren wir gemeinsam einen Startzeitpunkt. Pulse-Workshops sind kurzfristig buchbar (2-4 Wochen Vorlauf), Orbit-Prozesse starten idealerweise zu Monats-/Quartalsbeginn, Systems-Dashboards benötigen 2-3 Wochen Setup. Start: 1. September 2025.',
        'After the clarity call, we define a start date together. Pulse workshops can be booked at short notice (2-4 weeks lead time), Orbit processes ideally start at month/quarter beginning, Systems dashboards require 2-3 weeks setup. Launch: September 1, 2025.'
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
