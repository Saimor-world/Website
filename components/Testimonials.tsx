'use client';
import { motion } from 'framer-motion';
import { Quote, Building2, Users, TrendingUp } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

export default function Testimonials({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const cases = [
    {
      icon: Building2,
      title: t('Kommunale Transformation', 'Municipal Transformation'),
      organization: t('Mittelgroße Kommune (15.000 Einwohner)', 'Mid-sized municipality (15,000 residents)'),
      challenge: t('Digitalstrategie entwickeln ohne externe IT-Abhängigkeit', 'Develop digital strategy without external IT dependency'),
      solution: t('6-monatiger Orbit-Prozess mit Führungskreis und Fachbereichen', '6-month Orbit process with leadership and departments'),
      result: t('Eigene Roadmap, klare Priorisierung, 40% weniger Meetings', 'Own roadmap, clear prioritization, 40% fewer meetings'),
      quote: t('"Endlich verstehen wir, was wir wirklich brauchen – statt was uns verkauft wird."', '"Finally we understand what we really need – instead of what\'s being sold to us."'),
      role: t('Bürgermeisterin', 'Mayor'),
      color: '#4A6741'
    },
    {
      icon: Users,
      title: t('Team-Neuausrichtung', 'Team Realignment'),
      organization: t('Tech-Startup (30 Mitarbeitende)', 'Tech startup (30 employees)'),
      challenge: t('Nach Pivot: Team neu fokussieren, alte Muster ablegen', 'After pivot: Refocus team, shed old patterns'),
      solution: t('3 Pulse-Workshops + 2 Follow-up Sessions', '3 Pulse workshops + 2 follow-up sessions'),
      result: t('Klare Rollen, gemeinsames Verständnis, neue Energie', 'Clear roles, shared understanding, new energy'),
      quote: t('"Saimôr hat uns geholfen, wieder miteinander statt aneinander vorbei zu reden."', '"Saimôr helped us talk with each other again, instead of past each other."'),
      role: t('Head of Product', 'Head of Product'),
      color: '#D4A857'
    },
    {
      icon: TrendingUp,
      title: t('Daten-Dashboard für Entscheider', 'Data Dashboard for Decision-Makers'),
      organization: t('Sozialer Träger (120 Mitarbeitende)', 'Social organization (120 employees)'),
      challenge: t('Datenflut aus 5 Systemen – niemand versteht die Gesamtsicht', 'Data flood from 5 systems – no one understands the big picture'),
      solution: t('Môra: KPI-Workshop + individuelles Dashboard', 'Môra: KPI workshop + custom dashboard'),
      result: t('6 Kern-KPIs live, monatliche Klarheit statt Excel-Chaos', '6 core KPIs live, monthly clarity instead of Excel chaos'),
      quote: t('"Wir treffen jetzt Entscheidungen auf Basis von Fakten, nicht Bauchgefühl."', '"We now make decisions based on facts, not gut feeling."'),
      role: t('Geschäftsführerin', 'Managing Director'),
      color: '#5D7C54'
    }
  ];

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FAF0E6 0%, #F8F5F0 100%)' }}>
      {/* Background elements */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74, 103, 65, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
        animate={{
          y: [-30, 30, -30],
          x: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 z-10">
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
            {t('Erfolgreiche Projekte', 'Quietly successful projects')}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {t('Wie Saimôr Klarheit in der Praxis schafft', 'How Saimôr brings clarity into practice')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {cases.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{
                y: -6,
                scale: 1.01,
                transition: { duration: 0.3 }
              }}
              className="relative group rounded-3xl p-8 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,245,240,0.9) 100%)',
                border: '2px solid rgba(212,168,87,0.3)',
                boxShadow: '0 20px 50px rgba(74,103,65,0.12)'
              }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top, ${item.color}08 0%, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
                    border: `2px solid ${item.color}40`
                  }}
                >
                  <item.icon size={32} style={{ color: item.color }} />
                </motion.div>

                {/* Title */}
                <h3 className="font-bold text-2xl mb-3 text-slate-900"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {item.title}
                </h3>

                {/* Organization */}
                <p className="text-sm font-semibold text-slate-600 mb-6 pb-6 border-b border-saimor-gold/20">
                  {item.organization}
                </p>

                {/* Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-xs font-bold text-saimor-green mb-1">
                      {t('Herausforderung', 'Challenge')}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {item.challenge}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-saimor-green mb-1">
                      {t('Lösung', 'Solution')}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-saimor-green mb-1">
                      {t('Ergebnis', 'Result')}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {item.result}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative pt-6 border-t border-saimor-gold/20">
                  <Quote className="absolute -top-2 left-0 w-6 h-6 text-saimor-gold/40" />
                  <p className="text-base italic text-slate-700 mb-3 pl-8 leading-relaxed"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {item.quote}
                  </p>
                  <p className="text-sm font-semibold text-saimor-green pl-8">
                    – {item.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
