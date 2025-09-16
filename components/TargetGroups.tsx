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
    <section className="py-16 sm:py-24 bg-slate-100">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-800 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t('Zielgruppen', 'Target Groups')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
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
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-200"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center flex-shrink-0">
                  <group.icon className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl text-slate-800 mb-2">
                    {group.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {group.desc}
              </p>

              <div className="space-y-2">
                {group.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}