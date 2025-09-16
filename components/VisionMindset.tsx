'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

export default function VisionMindset({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const transformations = [
    {
      from: t('Von Unsicherheit', 'From uncertainty'),
      to: t('zu Klarheit', 'to clarity'),
      desc: t('Orientierung finden, wenn Systeme schwanken und der Weg unklar ist.', 'Find orientation when systems waver and the path is unclear.'),
    },
    {
      from: t('Von Vision', 'From vision'),
      to: t('zu Wirkung', 'to impact'),
      desc: t('Ideen in die Realität überführen, nachhaltig und messbar.', 'Transform ideas into reality, sustainably and measurably.'),
    },
    {
      from: t('Von Daten', 'From data'),
      to: t('zu Entscheidungen', 'to decisions'),
      desc: t('Informationen in handlungsfähiges Wissen verwandeln.', 'Transform information into actionable knowledge.'),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-400 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-yellow-300 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t('Haltung & Vision', 'Mindset & Vision')}
          </h2>
        </motion.div>

        <div className="space-y-12 mb-16">
          {transformations.map((transformation, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8"
            >
              <div className="text-right md:flex-1">
                <h3 className="text-2xl sm:text-3xl font-light text-slate-300">
                  {transformation.from}
                </h3>
              </div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0"
              >
                <ArrowRight className="w-6 h-6 text-slate-900" />
              </motion.div>

              <div className="text-left md:flex-1">
                <h3 className="text-2xl sm:text-3xl font-semibold text-yellow-400 mb-3">
                  {transformation.to}
                </h3>
                <p className="text-slate-300 text-lg max-w-md">
                  {transformation.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-block p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl italic leading-relaxed mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {t(
                '&ldquo;Saimôr ist kein Tool, sondern ein Resonanzraum.&rdquo;',
                '&ldquo;Saimôr is not a tool, but a resonance space.&rdquo;'
              )}
            </blockquote>
            <p className="text-lg text-slate-300">
              {t(
                'Ein Ort, wo Menschen, Systeme und Veränderung aufeinandertreffen – mit Klarheit statt Verwirrung.',
                'A place where people, systems and change meet – with clarity instead of confusion.'
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}