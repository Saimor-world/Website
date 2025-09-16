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
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 1000px 800px at 20% 30%, rgba(254, 215, 102, 0.08) 0%, transparent 70%),
          radial-gradient(ellipse 800px 600px at 80% 70%, rgba(255, 183, 77, 0.06) 0%, transparent 60%),
          linear-gradient(135deg, #fffbf0 0%, #fff8e1 50%, #fef7cd 100%)
        `
      }}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-32 h-32 rounded-full bg-yellow-200/10 blur-xl"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/3 w-24 h-24 rounded-full bg-yellow-300/10 blur-xl"
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block p-6 rounded-full bg-yellow-100/50 mb-8"
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-yellow-600">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <path d="M19 11L20.09 14.26L23 15L20.09 15.74L19 19L17.91 15.74L15 15L17.91 14.26L19 11Z" fill="currentColor"/>
              <path d="M5 11L6.09 14.26L9 15L6.09 15.74L5 19L3.91 15.74L1 15L3.91 14.26L5 11Z" fill="currentColor"/>
            </svg>
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-slate-900 mb-8 font-light" style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            {t('Werte & Identität', 'Values & Identity')}
          </h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto border border-yellow-200/30 shadow-lg">
            <p className="text-xl sm:text-2xl text-slate-800 leading-relaxed font-medium">
              {t(
                'Vier Grundprinzipien prägen unsere Haltung und bestimmen, wie wir arbeiten.',
                'Four core principles shape our approach and determine how we work.'
              )}
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-yellow-200/30 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                    rotate: { duration: 0.6 }
                  }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  style={{
                    boxShadow: '0 8px 20px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <value.icon className="w-10 h-10 text-slate-900" />
                </motion.div>

                <h3 className="font-bold text-2xl mb-4 text-slate-900 group-hover:text-yellow-700 transition-colors duration-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {value.title}
                </h3>

                <p className="text-slate-700 leading-relaxed text-lg">
                  {value.desc}
                </p>

                {/* Decorative element */}
                <motion.div
                  className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ delay: i * 0.1 + 0.5, duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resonance quote section with enhanced design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="relative">
            <div className="bg-gradient-to-br from-white/90 to-yellow-50/80 backdrop-blur-sm rounded-3xl p-12 border border-yellow-200/40 shadow-2xl max-w-5xl mx-auto">
              {/* Decorative quote marks */}
              <div className="absolute -top-4 left-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white text-4xl font-serif shadow-lg">
                &ldquo;
              </div>

              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-slate-800 italic leading-relaxed mb-8 pt-6" style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                {t(
                  'Alle Wege starten an einem gemeinsamen Punkt – der Bereitschaft, Klarheit über Lautheit zu stellen.',
                  'All paths start at a common point – the readiness to place clarity above noise.'
                )}
              </blockquote>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mx-auto mb-6"
              />

              <p className="text-slate-600 text-xl font-medium">
                {t('Clarity Home – Die gemeinsame Basis', 'Clarity Home – The common foundation')}
              </p>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-200/40"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-6 left-6 w-6 h-6 rounded-full bg-yellow-300/30"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}