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
    <section className="py-16 sm:py-24 relative overflow-hidden text-white"
             style={{
               background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.98) 0%, rgba(58, 82, 49, 0.95) 50%, rgba(74, 103, 65, 0.98) 100%)'
             }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, transparent 70%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(230, 200, 151, 0.5) 0%, transparent 70%)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.7) 0%, transparent 70%)',
            left: `${5 + i * 8}%`,
            top: `${15 + (i % 4) * 20}%`
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}

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
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.9) 0%, rgba(230, 200, 151, 0.8) 100%)',
                  boxShadow: '0 4px 12px rgba(212, 180, 131, 0.4)'
                }}
              >
                <ArrowRight className="w-6 h-6 text-saimor-green-dark" />
              </motion.div>

              <div className="text-left md:flex-1">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #D4A857 0%, #E6C897 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
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
          <div className="inline-block p-10 rounded-3xl relative overflow-hidden"
               style={{
                 background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(212, 180, 131, 0.12) 100%)',
                 backdropFilter: 'blur(20px)',
                 border: '1px solid rgba(212, 180, 131, 0.25)'
               }}>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212, 180, 131, 0.2) 0%, transparent 70%)'
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10">
              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl italic leading-relaxed mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                {t(
                  '„Saimôr ist kein Tool, sondern ein Resonanzraum.“',
                  '“Saimôr is not a tool, but a resonance space.”'
                )}
              </blockquote>

              <motion.div
                className="w-16 h-1 rounded-full mx-auto mb-6"
                style={{
                  background: 'linear-gradient(90deg, rgba(212, 180, 131, 0.6) 0%, rgba(230, 200, 151, 0.8) 50%, rgba(212, 180, 131, 0.6) 100%)'
                }}
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />

              <p className="text-lg text-white/80">
                {t(
                  'Ein Ort, wo Menschen, Systeme und Veränderung aufeinandertreffen – mit Klarheit statt Verwirrung.',
                  'A place where people, systems and change meet – with clarity instead of confusion.'
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
