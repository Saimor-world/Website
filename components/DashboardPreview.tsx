'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TrendingUp, TrendingDown, Users, Clock, Sparkles, ChevronRight, Activity } from 'lucide-react';

type Locale = 'de' | 'en';

interface DashboardPreviewProps {
  locale: Locale;
}

export default function DashboardPreview({ locale }: DashboardPreviewProps) {
  const [activeTab, setActiveTab] = useState<'nova' | 'horizon' | 'solara'>('horizon');
  const [moraInsight, setMoraInsight] = useState(false);

  const content = {
    de: {
      title: 'Systems Dashboard',
      subtitle: 'Erlebe dein Dashboard',
      tabs: {
        nova: 'Nova',
        horizon: 'Horizon',
        solara: 'Solara'
      },
      kpis: {
        engagement: 'Team-Engagement',
        efficiency: 'Prozess-Effizienz',
        satisfaction: 'Zufriedenheit',
        workload: 'Arbeitsbelastung'
      },
      moraInsight: {
        trigger: 'Môra fragen',
        insight: '💡 Insight: Das Team-Engagement ist diese Woche um 12% gestiegen. Besonders die neuen asynchronen Meetings werden gut angenommen. Empfehlung: Format beibehalten.'
      },
      cta: 'Systems-Pakete erkunden',
      note: 'Live-Demo mit echten Daten'
    },
    en: {
      title: 'Systems Dashboard',
      subtitle: 'Experience your Dashboard',
      tabs: {
        nova: 'Nova',
        horizon: 'Horizon',
        solara: 'Solara'
      },
      kpis: {
        engagement: 'Team Engagement',
        efficiency: 'Process Efficiency',
        satisfaction: 'Satisfaction',
        workload: 'Workload'
      },
      moraInsight: {
        trigger: 'Ask Môra',
        insight: '💡 Insight: Team engagement increased by 12% this week. The new asynchronous meetings are particularly well received. Recommendation: Keep the format.'
      },
      cta: 'Explore Systems Packages',
      note: 'Live demo with real data'
    }
  }[locale];

  const mockData = {
    nova: [
      { label: content.kpis.engagement, value: 68, trend: 'up', change: '+5%' },
      { label: content.kpis.efficiency, value: 72, trend: 'up', change: '+3%' },
      { label: content.kpis.satisfaction, value: 65, trend: 'down', change: '-2%' }
    ],
    horizon: [
      { label: content.kpis.engagement, value: 78, trend: 'up', change: '+12%' },
      { label: content.kpis.efficiency, value: 81, trend: 'up', change: '+8%' },
      { label: content.kpis.satisfaction, value: 74, trend: 'up', change: '+6%' },
      { label: content.kpis.workload, value: 62, trend: 'down', change: '-4%' }
    ],
    solara: [
      { label: content.kpis.engagement, value: 85, trend: 'up', change: '+15%' },
      { label: content.kpis.efficiency, value: 88, trend: 'up', change: '+11%' },
      { label: content.kpis.satisfaction, value: 82, trend: 'up', change: '+9%' },
      { label: content.kpis.workload, value: 58, trend: 'down', change: '-7%' }
    ]
  };

  const currentData = mockData[activeTab];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sm uppercase tracking-wider text-[#D4B483] font-semibold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {content.subtitle}
          </motion.p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.title}
          </h2>
        </motion.div>

        {/* Package tabs */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {(['nova', 'horizon', 'solara'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMoraInsight(false);
              }}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#4A6741] to-[#D4B483] text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#D4B483]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {content.tabs[tab]}
            </motion.button>
          ))}
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Dashboard container */}
          <div
            className="rounded-3xl p-8 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 247, 243, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 180, 131, 0.3)'
            }}
          >
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A6741] to-[#D4B483] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {content.tabs[activeTab]} Dashboard
                  </h3>
                  <p className="text-xs text-gray-500">KW 43 · 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Live</span>
              </div>
            </div>

            {/* KPI Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="grid md:grid-cols-2 gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {currentData.map((kpi, index) => (
                  <motion.div
                    key={kpi.label}
                    className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#D4B483]/40 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, shadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">{kpi.label}</span>
                      <motion.div
                        className={`flex items-center gap-1 text-xs font-semibold ${
                          kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                      >
                        {kpi.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span>{kpi.change}</span>
                      </motion.div>
                    </div>

                    {/* Animated progress bar */}
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          background: kpi.trend === 'up'
                            ? 'linear-gradient(90deg, #4A6741, #D4B483)'
                            : 'linear-gradient(90deg, #EF4444, #F87171)'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${kpi.value}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>

                    <motion.p
                      className="text-2xl font-bold text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {kpi.value}%
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Môra Insight */}
            <div className="space-y-4">
              <motion.button
                onClick={() => setMoraInsight(!moraInsight)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4A6741]/10 to-[#D4B483]/10 border border-[#D4B483]/30 hover:border-[#D4B483] transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4 text-[#D4B483] group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-semibold text-gray-700">{content.moraInsight.trigger}</span>
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${moraInsight ? 'rotate-90' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {moraInsight && (
                  <motion.div
                    className="p-4 rounded-xl bg-gradient-to-r from-[#4A6741]/5 to-[#D4B483]/5 border border-[#D4B483]/20"
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {content.moraInsight.insight}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Floating Môra orb */}
          <motion.div
            className="absolute -right-4 -top-4 w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.9), rgba(212, 180, 131, 0.8))',
              boxShadow: '0 10px 40px rgba(212, 180, 131, 0.4)'
            }}
            animate={{
              y: [0, -10, 0],
              boxShadow: [
                '0 10px 40px rgba(212, 180, 131, 0.4)',
                '0 15px 50px rgba(212, 180, 131, 0.6)',
                '0 10px 40px rgba(212, 180, 131, 0.4)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => setMoraInsight(!moraInsight)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="/systems"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#4A6741] to-[#D4B483] shadow-xl hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.cta}
            <ChevronRight className="w-5 h-5" />
          </motion.a>
          <p className="text-xs text-gray-500 mt-4 italic">{content.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
