'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Brain, Phone, DollarSign, Play, TrendingUp, Zap, CheckCircle } from 'lucide-react';

type Locale = 'de' | 'en';

interface MoraShowcaseProps {
  locale: Locale;
}

interface DemoKPIs {
  memoryFacts: number;
  voiceCalls: number;
  costsToday: number;
}

export default function MoraShowcase({ locale }: MoraShowcaseProps) {
  const [kpis, setKpis] = useState<DemoKPIs>({
    memoryFacts: 247,
    voiceCalls: 12,
    costsToday: 2.34
  });
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [showInsight, setShowInsight] = useState(false);

  const content = {
    de: {
      title: 'Môra – Deine KI-Begleiterin',
      subtitle: 'Erlebe Môra in Aktion',
      intro: 'Hallo, ich bin Môra. Ich helfe dir, Daten zu verstehen und kluge Entscheidungen zu treffen. Probier mich aus!',

      demoActions: [
        {
          id: 'store-fact',
          icon: Brain,
          label: 'Fakt speichern',
          description: 'Speichere einen neuen Fakt im Memory',
          action: 'fact_stored',
          color: 'from-purple-500 to-indigo-500'
        },
        {
          id: 'voice-call',
          icon: Phone,
          label: 'Voice Call starten',
          description: 'Simuliere einen Voice-Anruf',
          action: 'call_started',
          color: 'from-blue-500 to-cyan-500'
        },
        {
          id: 'analyze',
          icon: Zap,
          label: 'Daten analysieren',
          description: 'Môra analysiert deine KPIs',
          action: 'analysis_done',
          color: 'from-amber-500 to-orange-500'
        }
      ],

      kpis: {
        memory: 'Memory Facts',
        calls: 'Voice Calls',
        costs: 'Kosten heute'
      },

      insight: {
        title: 'Môra Insight',
        text: '💡 Großartig! Du hast heute schon {facts} Facts gespeichert. Deine Costs liegen bei ${costs} – unter dem Durchschnitt. Weiter so!'
      },

      packages: [
        {
          name: 'Horizon',
          features: ['6 KPIs', 'Wöchentlich', 'Môra Insights'],
          badge: 'BELIEBT'
        },
        {
          name: 'Solara',
          features: ['12+ KPIs', 'Täglich', 'Live Chat', 'Alerts'],
          badge: 'PREMIUM'
        }
      ],

      cta: 'Kostenlos testen'
    },
    en: {
      title: 'Môra – Your AI Companion',
      subtitle: 'Experience Môra in Action',
      intro: 'Hello, I\'m Môra. I help you understand data and make smart decisions. Try me out!',

      demoActions: [
        {
          id: 'store-fact',
          icon: Brain,
          label: 'Store Fact',
          description: 'Save a new fact to memory',
          action: 'fact_stored',
          color: 'from-purple-500 to-indigo-500'
        },
        {
          id: 'voice-call',
          icon: Phone,
          label: 'Start Voice Call',
          description: 'Simulate a voice call',
          action: 'call_started',
          color: 'from-blue-500 to-cyan-500'
        },
        {
          id: 'analyze',
          icon: Zap,
          label: 'Analyze Data',
          description: 'Môra analyzes your KPIs',
          action: 'analysis_done',
          color: 'from-amber-500 to-orange-500'
        }
      ],

      kpis: {
        memory: 'Memory Facts',
        calls: 'Voice Calls',
        costs: 'Costs today'
      },

      insight: {
        title: 'Môra Insight',
        text: '💡 Great! You stored {facts} facts today. Your costs are ${costs} – below average. Keep it up!'
      },

      packages: [
        {
          name: 'Horizon',
          features: ['6 KPIs', 'Weekly', 'Môra Insights'],
          badge: 'POPULAR'
        },
        {
          name: 'Solara',
          features: ['12+ KPIs', 'Daily', 'Live Chat', 'Alerts'],
          badge: 'PREMIUM'
        }
      ],

      cta: 'Try for free'
    }
  }[locale];

  // Demo Actions
  const handleDemoAction = async (actionId: string) => {
    setActiveDemo(actionId);

    // Animate KPI changes based on action
    setTimeout(() => {
      setKpis(prev => {
        switch (actionId) {
          case 'store-fact':
            return { ...prev, memoryFacts: prev.memoryFacts + 1 };
          case 'voice-call':
            return { ...prev, voiceCalls: prev.voiceCalls + 1, costsToday: prev.costsToday + 0.12 };
          case 'analyze':
            setShowInsight(true);
            return prev;
          default:
            return prev;
        }
      });

      setTimeout(() => setActiveDemo(null), 1000);
    }, 600);
  };

  return (
    <section id="mora-showcase" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.03]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop')"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(248, 247, 243, 0.98) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 247, 243, 0.98) 100%)'
          }}
        />
      </div>

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
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
          >
            <Sparkles className="w-4 h-4" />
            {content.subtitle}
          </motion.p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
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
            {content.intro}
          </p>
        </motion.div>

        {/* Main Interactive Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* LEFT: Interactive Demo */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Probier mich aus
            </h3>

            {/* Demo Action Buttons */}
            <div className="space-y-4">
              {content.demoActions.map((action, index) => {
                const Icon = action.icon;
                const isActive = activeDemo === action.id;

                return (
                  <motion.button
                    key={action.id}
                    onClick={() => handleDemoAction(action.id)}
                    className="w-full p-6 rounded-2xl border-2 text-left transition-all"
                    style={{
                      borderColor: isActive ? '#D4B483' : 'rgba(212, 180, 131, 0.2)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(212, 180, 131, 0.1) 0%, rgba(230, 200, 151, 0.05) 100%)'
                        : 'white'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={activeDemo !== null}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}
                        animate={isActive ? { rotate: 360 } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg text-gray-800">{action.label}</h4>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-1 text-green-600"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      <Play className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Môra Insight */}
            <AnimatePresence>
              {showInsight && (
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-r from-[#4A6741]/10 to-[#D4B483]/10 border-2 border-[#D4B483]/30"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4B483] to-[#E6C897] flex items-center justify-center flex-shrink-0"
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-[#4A6741] mb-2">{content.insight.title}</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {content.insight.text
                          .replace('{facts}', kpis.memoryFacts.toString())
                          .replace('{costs}', kpis.costsToday.toFixed(2))}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Live Dashboard */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Live Dashboard
              </h3>
              <motion.div
                className="flex items-center gap-2 text-sm text-gray-500"
                animate={{
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Live</span>
              </motion.div>
            </div>

            {/* KPI Cards */}
            <div className="space-y-4">
              {[
                { icon: Brain, label: content.kpis.memory, value: kpis.memoryFacts, color: 'from-purple-500 to-indigo-500', bgColor: 'from-purple-50 to-indigo-50' },
                { icon: Phone, label: content.kpis.calls, value: kpis.voiceCalls, color: 'from-blue-500 to-cyan-500', bgColor: 'from-blue-50 to-cyan-50' },
                { icon: DollarSign, label: content.kpis.costs, value: `$${kpis.costsToday.toFixed(2)}`, color: 'from-green-500 to-emerald-500', bgColor: 'from-green-50 to-emerald-50' }
              ].map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${kpi.bgColor} border-2 border-white shadow-lg relative overflow-hidden`}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="absolute top-0 right-0 opacity-10">
                    <kpi.icon className="w-24 h-24 text-gray-400" strokeWidth={1} />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{kpi.label}</p>
                      <motion.p
                        className="text-4xl font-bold text-gray-900"
                        key={kpi.value.toString()}
                        initial={{ scale: 1.3, color: '#D4B483' }}
                        animate={{ scale: 1, color: '#111827' }}
                        transition={{ duration: 0.4 }}
                      >
                        {kpi.value}
                      </motion.p>
                    </div>
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}
                    >
                      <kpi.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Packages Preview */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {content.packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  className="p-4 rounded-xl border-2 border-[#D4B483]/30 bg-gradient-to-br from-white to-slate-50 relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#4A6741] to-[#D4B483]">
                    {pkg.badge}
                  </div>
                  <h4 className="font-bold text-lg text-center mb-3 mt-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {pkg.name}
                  </h4>
                  <div className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#4A6741]" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

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
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white bg-gradient-to-r from-[#4A6741] to-[#D4B483] shadow-2xl"
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
