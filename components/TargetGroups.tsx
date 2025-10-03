'use client';
import { motion } from 'framer-motion';
import { Building2, Users, User, Network } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

export default function TargetGroups({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const groups = [
    {
      icon: Building2,
      title: t('Kommunen & Regionen', 'Municipalities & Regions'),
      desc: t('Digitale Transformation im öffentlichen Raum – Bürgernähe durch klare Strukturen und verständliche Prozesse.', 'Digital transformation in public space – citizen proximity through clear structures and understandable processes.'),
      features: [
        t('Digitalisierungsstrategie', 'Digitalization strategy'),
        t('Bürgerdialoge', 'Citizen dialogues'),
        t('Organisationsentwicklung', 'Organizational development'),
      ],
    },
    {
      icon: Users,
      title: t('KMU & Mittelstand', 'SMEs & Mid-market'),
      desc: t('Nachhaltige Strukturen für wachsende Unternehmen – von familiären Teams zu professionellen Organisationen.', 'Sustainable structures for growing companies – from family teams to professional organizations.'),
      features: [
        t('Wachstumsbegleitung', 'Growth guidance'),
        t('Teamentwicklung', 'Team development'),
        t('Prozessoptimierung', 'Process optimization'),
      ],
    },
    {
      icon: User,
      title: t('Einzelpersonen', 'Individuals'),
      desc: t('Persönliche Klarheit in Übergangsphasen – berufliche Neuorientierung, Führungsrollen, Lebenswandel.', 'Personal clarity in transition phases – career reorientation, leadership roles, life changes.'),
      features: [
        t('Coaching', 'Coaching'),
        t('Mentoring', 'Mentoring'),
        t('Reflexionsräume', 'Reflection spaces'),
      ],
    },
    {
      icon: Network,
      title: t('Partner & Netzwerke', 'Partners & Networks'),
      desc: t('Zusammenarbeit mit anderen Beratern, Agenturen und Organisationen – gemeinsam komplexe Herausforderungen lösen.', 'Collaboration with other consultants, agencies and organizations – solving complex challenges together.'),
      features: [
        t('Kooperationen', 'Cooperations'),
        t('Referral-Partner', 'Referral partners'),
        t('Projektallianzen', 'Project alliances'),
      ],
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 1200px 800px at 25% 30%, rgba(74, 103, 65, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse 1000px 600px at 75% 70%, rgba(212, 180, 131, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #f8faf9 0%, #faf8f6 50%, #f7f5f3 100%)
        `
      }}
    >
      {/* Organic floating background elements */}
      <motion.div
        className="absolute top-20 left-1/6 w-40 h-40 rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.15) 0%, rgba(212, 180, 131, 0.1) 100%)',
          filter: 'blur(60px)'
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-1/5 w-32 h-32 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(102, 153, 102, 0.2) 0%, rgba(212, 180, 131, 0.15) 100%)',
          filter: 'blur(50px)'
        }}
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4B483 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            {t('Zielgruppen', 'Target Groups')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto">
            {t(
              'Klarheit brauchen verschiedene Menschen auf verschiedene Weise. Wir begleiten dort, wo Systeme schwanken.',
              'Different people need clarity in different ways. We provide guidance where systems waver.'
            )}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              className="group relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(247, 245, 243, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212, 180, 131, 0.3)',
                boxShadow: '0 10px 30px rgba(74, 103, 65, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-3xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at top left, rgba(74, 103, 65, 0.08) 0%, transparent 60%)'
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Organic glow */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-40 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.15) 0%, rgba(212, 180, 131, 0.2) 100%)',
                      border: '1px solid rgba(212, 180, 131, 0.3)'
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    {/* Icon glow effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'radial-gradient(circle, rgba(74, 103, 65, 0.3) 0%, transparent 70%)',
                        filter: 'blur(10px)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <group.icon className="w-7 h-7 text-saimor-green relative z-10" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-xl text-slate-800 mb-2 group-hover:text-saimor-green transition-colors duration-300">
                      {group.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6 text-base">
                  {group.desc}
                </p>

                <div className="space-y-3">
                  {group.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + idx * 0.05 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)'
                        }}
                        whileHover={{
                          scale: 1.5,
                          boxShadow: '0 0 12px rgba(74, 103, 65, 0.6)'
                        }}
                      />
                      <span className="text-slate-700 text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(74, 103, 65, 0.5) 0%, rgba(212, 180, 131, 0.6) 50%, rgba(74, 103, 65, 0.5) 100%)'
                  }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}