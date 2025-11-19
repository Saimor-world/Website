'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Activity } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

export default function TrustProof({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const trustPoints = [
    {
      icon: CheckCircle,
      title: t('Klar statt komplex', 'Clear instead of complex'),
      desc: t('VerstÃ¤ndliche Ergebnisse in kurzer Zeit.', 'Understandable results in a short time.'),
    },
    {
      icon: Shield,
      title: t('DatensouverÃ¤nitÃ¤t', 'Data sovereignty'),
      desc: t('EU-Hosting & DSGVO-Guardrails, keine Profile.', 'EU hosting & GDPR guardrails, no profiles.'),
    },
    {
      icon: Activity,
      title: t('Begleitung statt Hype', 'Guidance instead of hype'),
      desc: t('Rhythmus, der Entscheidungen ermÃ¶glicht.', 'Rhythm that enables decisions.'),
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8faf9 0%, #faf8f6 50%, #f7f5f3 100%)'
      }}
    >
      {/* Organic background elements */}
      <motion.div
        className="absolute top-20 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74, 103, 65, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          y: [-20, 20, -20],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('Warum SaimÃ´r', 'Why SaimÃ´r')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              className="group relative rounded-3xl p-8 overflow-hidden text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 249, 0.85) 100%)',
                backdropFilter: 'blur(32px)',
                border: '1px solid rgba(212, 180, 131, 0.35)',
                boxShadow: '0 20px 60px rgba(74, 103, 65, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(74, 103, 65, 0.06) 0%, transparent 60%)'
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Organic glow */}
              <motion.div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-30 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 180, 131, 0.5) 0%, transparent 70%)',
                  filter: 'blur(30px)'
                }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(248, 250, 249, 0.5) 100%)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(212, 180, 131, 0.4)',
                    boxShadow: '0 4px 12px rgba(74, 103, 65, 0.1)'
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <point.icon className="w-8 h-8 text-saimor-green" />
                </motion.div>

                <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-saimor-green transition-colors duration-300"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {point.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-slate-500 italic text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t(
              'â€žSaimÃ´r ist kein Tool, sondern ein Resonanzraum."',
              '"SaimÃ´r is not a tool, but a resonance space."'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
