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
        'Saimôr ist ein ruhiger Resonanzraum für Klarheit in Veränderung. Wir verbinden menschliche Tiefe mit präziser Technologie – ohne Druck, mit Zeit zum Verstehen.',
        'Saimôr is a calm resonance space for clarity in change. We combine human depth with precise technology – without pressure, with time to understand.'
      ),
    },
    {
      q: t('Was ist Môra?', 'What is Môra?'),
      a: t(
        'Môra ist die KI-Begleiterin im Saimôr-Ökosystem. Im Prototyp zeigt sie Dashboard-Beispiele und reagiert im Chat – aktuell mit simulierten Daten, ohne externe Clouds.',
        'Môra is the AI companion inside the Saimôr ecosystem. In the prototype she shows dashboard examples and responds in chat – currently with simulated data and no external clouds.'
      ),
    },
    {
      q: t('Wie kann ich Saimôr ausprobieren?', 'How can I try Saimôr?'),
      a: t(
        'Schreib uns kurz. Wir zeigen dir die Demo in Ruhe und besprechen, ob und wie Saimôr zu deinem Kontext passt.',
        'Send us a short note. We will walk you through the demo calmly and discuss if and how Saimôr fits your context.'
      ),
    },
    {
      q: t('Wie geht ihr mit Daten und Sicherheit um?', 'How do you handle data and security?'),
      a: t(
        'In der Demo nutzen wir ausschließlich lokal generierte Beispieldaten. Keine Profilbildung, kein Tracking, EU-Recht als Basis. Bei echten Projekten gilt: Datensparsamkeit, klare Rollen, Export jederzeit.',
        'In the demo we use only locally generated sample data. No profiling, no tracking, EU law as the baseline. For real projects we apply data minimization, clear roles, and export on request at any time.'
      ),
    },
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
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
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
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 249, 0.85) 100%)',
                border: '1px solid rgba(212, 180, 131, 0.35)',
                backdropFilter: 'blur(32px)',
                boxShadow: openIndex === i
                  ? '0 20px 60px rgba(74, 103, 65, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                  : '0 8px 24px rgba(74, 103, 65, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-saimor-green/5 transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A857] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-2xl"
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
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
                id={`faq-panel-${i}`}
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
            {t('Weitere Fragen? Lassen Sie uns sprechen.', "More questions? Let's talk.")}
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
