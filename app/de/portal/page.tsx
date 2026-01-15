import Link from 'next/link';
import PortalPreview from '@/components/PortalPreview';

// Remove motion import
const motion = { div: 'div', h1: 'h1', p: 'p' };
import { TransformationGuideLeadMagnet } from '@/components/LeadMagnet';
import { DemoCTA } from '@/components/BusinessCTA';

export const metadata = {
  title: 'Saimôr Portal – Sicherer Zugang (Demo)',
  description: 'UI Shell für das kommende Kundenportal – aktuell als Demo mit geführten Bereichen und Dashboard-Vorschau.'
};

export default function PortalPageDe() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1512] via-[#101f1a] to-[#0a1410] text-white">
      <div className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 25%, rgba(212,168,87,0.15), transparent 50%)' }} />

        <div className="relative mx-auto max-w-6xl px-6 py-24 space-y-20">
          <header className="space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="text-sm font-medium text-emerald-300">Kundenportal Preview</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-light"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Dein
              <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
                Arbeitsbereich
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            >
              Das Kundenportal verbindet alle Saimôr-Services an einem Ort. Hier siehst du,
              wie deine Datenströme zusammenfließen und klare Entscheidungen ermöglichen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/demo"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M14.828 14.828L21 21M21 16.657L21 21L16.657 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 3V9M21 9H15M21 9L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Live Demo starten</span>
              </Link>
              <Link
                href="/de/kontakt"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
              >
                <span>Portal-Zugang anfragen</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </header>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: '📊',
                title: 'Dashboard Übersicht',
                description: 'Alle KPIs und Metriken auf einen Blick. Echtzeit-Updates und benutzerdefinierte Ansichten.'
              },
              {
                icon: '🔗',
                title: 'System Integration',
                description: 'Verbinde deine bestehenden Tools und Datenquellen für eine nahtlose Erfahrung.'
              },
              {
                icon: '👥',
                title: 'Team Collaboration',
                description: 'Arbeite mit deinem Team zusammen. Teile Insights und treffe fundierte Entscheidungen.'
              },
              {
                icon: '🔒',
                title: 'Enterprise Security',
                description: 'Banken-Level-Sicherheit mit EU-Hosting und vollständiger DSGVO-Konformität.'
              },
              {
                icon: '📱',
                title: 'Mobile First',
                description: 'Optimiert für alle Geräte. Arbeite von überall aus mit der gleichen Erfahrung.'
              },
              {
                icon: '🤖',
                title: 'KI-gestützt',
                description: 'Môra analysiert automatisch deine Daten und gibt klare Handlungsempfehlungen.'
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Lead Magnet Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold mb-4 text-white">Kostenloser Transformations-Guide</h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Erfahre, wie du die digitale Transformation erfolgreich umsetzt.
                Mit praktischen Tipps und Fallbeispielen.
              </p>
            </div>
            <TransformationGuideLeadMagnet />
          </motion.div>

          {/* Demo CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <DemoCTA />
          </motion.div>

          <PortalPreview locale="de" />
        </div>
      </div>
    </div>
  );
}
