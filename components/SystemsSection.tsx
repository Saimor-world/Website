'use client';
import { motion } from 'framer-motion';
import { Sparkles, Shield, TrendingUp, Zap, CheckCircle } from 'lucide-react';

type Locale = 'de' | 'en';

interface SystemsSectionProps {
  locale: Locale;
}

export default function SystemsSection({ locale }: SystemsSectionProps) {
  const content = {
    de: {
      title: 'Systems – Daten, die Klarheit schaffen',
      subtitle: 'Powered by Môra',
      lead: 'Systems verbindet Daten, Dashboards & KI – immer menschenzentriert. Ziel ist nicht Kontrolle, sondern Orientierung.',
      packages: [
        {
          name: 'Nova',
          kpis: '3 KPIs',
          report: 'Monatsreport',
          features: ['Basis-Metriken', 'Monatlicher Überblick', 'Email-Report'],
          color: 'from-slate-100 to-slate-50'
        },
        {
          name: 'Horizon',
          kpis: '6 KPIs',
          report: 'Wochenreport',
          features: ['Erweiterte Metriken', 'Wöchentliche Updates', 'Trend-Analysen', 'Môra Insights'],
          color: 'from-[#4A6741]/10 to-[#D4B483]/5',
          popular: true
        },
        {
          name: 'Solara',
          kpis: '12+ KPIs',
          report: 'Tägliche Insights',
          features: ['Alle Metriken', 'Täglich frisch', 'Handlungsempfehlungen', 'Live Môra Chat', 'Priorisierte Alerts'],
          color: 'from-[#D4B483]/15 to-[#E6C897]/10',
          premium: true
        }
      ],
      privacy: {
        title: 'DSGVO-Guardrails',
        points: [
          'Nur aggregierte Geschäftsdaten',
          'EU-Hosting (Frankfurt)',
          'Mindestgruppengröße: 5 Personen',
          'Keine personenbezogenen Profile'
        ]
      },
      cta: 'Kostenlos Demo buchen'
    },
    en: {
      title: 'Systems – Data that creates clarity',
      subtitle: 'Powered by Môra',
      lead: 'Systems connects data, dashboards & AI – always human-centered. The goal is not control, but orientation.',
      packages: [
        {
          name: 'Nova',
          kpis: '3 KPIs',
          report: 'Monthly report',
          features: ['Basic metrics', 'Monthly overview', 'Email report'],
          color: 'from-slate-100 to-slate-50'
        },
        {
          name: 'Horizon',
          kpis: '6 KPIs',
          report: 'Weekly report',
          features: ['Extended metrics', 'Weekly updates', 'Trend analysis', 'Môra Insights'],
          color: 'from-[#4A6741]/10 to-[#D4B483]/5',
          popular: true
        },
        {
          name: 'Solara',
          kpis: '12+ KPIs',
          report: 'Daily insights',
          features: ['All metrics', 'Daily fresh', 'Action recommendations', 'Live Môra Chat', 'Prioritized alerts'],
          color: 'from-[#D4B483]/15 to-[#E6C897]/10',
          premium: true
        }
      ],
      privacy: {
        title: 'GDPR Guardrails',
        points: [
          'Only aggregated business data',
          'EU hosting (Frankfurt)',
          'Minimum group size: 5 people',
          'No personal profiles'
        ]
      },
      cta: 'Book free demo'
    }
  }[locale];

  return (
    <section id="systems" className="relative py-24 overflow-hidden">
      {/* Unsplash tech background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2560&auto=format&fit=crop')"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(248, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(248, 247, 243, 0.95) 100%)'
          }}
        />
      </div>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(74, 103, 65, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#D4B483] font-semibold mb-3 px-4 py-1.5 rounded-full bg-[#D4B483]/10"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            {content.subtitle}
          </motion.p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.lead}
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {content.packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              className="relative p-8 rounded-3xl border-2 transition-all"
              style={{
                background: `linear-gradient(135deg, ${pkg.color})`,
                borderColor: pkg.popular || pkg.premium ? '#D4B483' : 'rgba(212, 180, 131, 0.2)',
                boxShadow: pkg.popular || pkg.premium
                  ? '0 20px 60px rgba(212, 180, 131, 0.2)'
                  : '0 10px 30px rgba(0, 0, 0, 0.05)'
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: pkg.popular || pkg.premium
                  ? '0 25px 70px rgba(212, 180, 131, 0.3)'
                  : '0 15px 40px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Badge */}
              {(pkg.popular || pkg.premium) && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{
                    background: pkg.premium
                      ? 'linear-gradient(135deg, #D4B483, #E6C897)'
                      : 'linear-gradient(135deg, #4A6741, #5D7C54)'
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
                >
                  {pkg.popular ? (locale === 'de' ? 'BELIEBT' : 'POPULAR') : (locale === 'de' ? 'PREMIUM' : 'PREMIUM')}
                </motion.div>
              )}

              <div className="text-center mb-6">
                <h3
                  className="text-3xl font-bold mb-2"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    color: '#4A6741'
                  }}
                >
                  {pkg.name}
                </h3>
                <p className="text-[#D4B483] font-bold text-lg mb-1">{pkg.kpis}</p>
                <p className="text-sm text-gray-600">{pkg.report}</p>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + i * 0.05 }}
                  >
                    <CheckCircle className="w-5 h-5 text-[#4A6741] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Icon indicator */}
              {pkg.premium && (
                <motion.div
                  className="flex justify-center"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                  }}
                >
                  <Zap className="w-6 h-6 text-[#D4B483]" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Privacy section */}
        <motion.div
          className="max-w-4xl mx-auto p-8 rounded-3xl mb-12"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.05) 0%, rgba(212, 180, 131, 0.05) 100%)',
            border: '2px solid rgba(74, 103, 65, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A6741] to-[#5D7C54] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xl mb-4 text-[#4A6741]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {content.privacy.title}
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {content.privacy.points.map((point, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4B483]" />
                    <span className="text-sm text-gray-700">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://cal.com/saimor/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white bg-gradient-to-r from-[#4A6741] to-[#D4B483] shadow-2xl hover:shadow-3xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6" />
            {content.cta}
            <TrendingUp className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
