'use client';
import { motion } from 'framer-motion';
import { Compass, Waves, Lightbulb, Users } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

export default function Values({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const values = [
    {
      icon: Compass,
      title: t('Klar', 'Clear'),
      desc: t('Durchblick schaffen, wo Komplexität überfordert. Einfache Wege in schwierigen Situationen.', 'Create clarity where complexity overwhelms. Simple paths in difficult situations.'),
    },
    {
      icon: Waves,
      title: t('Resonant', 'Resonant'),
      desc: t('Was wirklich zählt, verstärken. Echte Verbindungen zwischen Menschen und Systemen ermöglichen.', 'Amplify what truly matters. Enable real connections between people and systems.'),
    },
    {
      icon: Lightbulb,
      title: t('Modern', 'Modern'),
      desc: t('Zeitgemäße Ansätze für zeitlose Herausforderungen. Technologie im Dienst der Menschlichkeit.', 'Contemporary approaches for timeless challenges. Technology in service of humanity.'),
    },
    {
      icon: Users,
      title: t('Kooperativ', 'Cooperative'),
      desc: t('Gemeinsam statt gegeneinander. Nachhaltiger Wandel entsteht nur durch echte Zusammenarbeit.', 'Together instead of against each other. Sustainable change only emerges through genuine collaboration.'),
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-800 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t('Werte & Identität', 'Values & Identity')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {t(
              'Vier Grundprinzipien prägen unsere Haltung und bestimmen, wie wir arbeiten.',
              'Four core principles shape our approach and determine how we work.'
            )}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              >
                <value.icon className="w-8 h-8 text-slate-900" />
              </motion.div>

              <h3 className="font-semibold text-xl mb-3 text-slate-800 group-hover:text-yellow-600 transition-colors duration-300">
                {value.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Optional resonance quote section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <blockquote className="font-serif text-2xl sm:text-3xl text-slate-700 italic max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t(
              '&ldquo;Alle Wege starten an einem gemeinsamen Punkt – der Bereitschaft, Klarheit über Lautheit zu stellen.&rdquo;',
              '&ldquo;All paths start at a common point – the readiness to place clarity above noise.&rdquo;'
            )}
          </blockquote>
          <p className="text-slate-500 mt-4 text-lg">
            {t('Clarity Home – Die gemeinsame Basis', 'Clarity Home – The common foundation')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}