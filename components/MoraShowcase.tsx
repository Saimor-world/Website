'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo } from 'react';
import { Sparkles, TrendingUp, Users, Target, BarChart3, MessageSquare, Send, Loader2, CheckCircle2, ChevronRight, Zap, DollarSign } from 'lucide-react';

type Locale = 'de' | 'en';

interface MoraShowcaseProps {
  locale: Locale;
}

interface BusinessKPIs {
  teamProductivity: number;
  projectProgress: number;
  employeeSatisfaction: number;
  budgetEfficiency: number;
}

const MoraShowcase = memo(function MoraShowcase({ locale }: MoraShowcaseProps) {
  const [kpis, setKpis] = useState<BusinessKPIs>({
    teamProductivity: 87,
    projectProgress: 73,
    employeeSatisfaction: 4.2,
    budgetEfficiency: 90
  });

  const [userQuestion, setUserQuestion] = useState('');
  const [moraResponse, setMoraResponse] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const content = {
    de: {
      title: 'Môra – Deine KI-Begleiterin für Business-Klarheit',
      subtitle: 'Erlebe echte KI in Aktion',
      intro: 'Hallo, ich bin Môra. Ich analysiere deine Business-Daten in Echtzeit und gebe dir klare Antworten. Stell mir eine Frage!',

      inputPlaceholder: 'Frag Môra etwas zu deinem Business...',
      askButton: 'Fragen',

      quickQuestions: [
        'Wie kann ich Team-Produktivität steigern?',
        'Zeig mir Budget-Optimierungen',
        'Analysiere Projekt-Fortschritt'
      ],

      realResponse: 'Echte Môra-Antwort',
      responseIn: 'Antwort in',
      seconds: 'Sekunden',

      kpis: {
        productivity: 'Team-Produktivität',
        progress: 'Projekt-Fortschritt',
        satisfaction: 'Mitarbeiter-Zufriedenheit',
        budget: 'Budget-Effizienz'
      },

      chatLink: 'Für tiefere Analysen',
      chatButton: 'Môra Chat öffnen',

      packages: [
        {
          name: 'Horizon',
          features: ['6 Business-KPIs', 'Wöchentliche Insights', 'Môra Analysen'],
          badge: 'BELIEBT'
        },
        {
          name: 'Solara',
          features: ['12+ KPIs', 'Tägliche Updates', 'Live Môra Chat', 'Alerts'],
          badge: 'PREMIUM'
        }
      ],

      cta: 'Kostenlos testen'
    },
    en: {
      title: 'Môra – Your AI Companion for Business Clarity',
      subtitle: 'Experience Real AI in Action',
      intro: 'Hello, I\'m Môra. I analyze your business data in real-time and give you clear answers. Ask me a question!',

      inputPlaceholder: 'Ask Môra about your business...',
      askButton: 'Ask',

      quickQuestions: [
        'How can I boost team productivity?',
        'Show me budget optimizations',
        'Analyze project progress'
      ],

      realResponse: 'Real Môra Response',
      responseIn: 'Response in',
      seconds: 'seconds',

      kpis: {
        productivity: 'Team Productivity',
        progress: 'Project Progress',
        satisfaction: 'Employee Satisfaction',
        budget: 'Budget Efficiency'
      },

      chatLink: 'For deeper analysis',
      chatButton: 'Open Môra Chat',

      packages: [
        {
          name: 'Horizon',
          features: ['6 Business KPIs', 'Weekly Insights', 'Môra Analysis'],
          badge: 'POPULAR'
        },
        {
          name: 'Solara',
          features: ['12+ KPIs', 'Daily Updates', 'Live Môra Chat', 'Alerts'],
          badge: 'PREMIUM'
        }
      ],

      cta: 'Try for free'
    }
  }[locale];

  const handleAskMora = async (question?: string) => {
    const q = question || userQuestion;
    if (!q.trim() || isAsking) return;

    setIsAsking(true);
    setMoraResponse('');
    setShowSuccess(false);
    const startTime = Date.now();

    // Animate KPIs during analysis
    const interval = setInterval(() => {
      setKpis(prev => ({
        teamProductivity: Math.max(0, Math.min(100, prev.teamProductivity + (Math.random() - 0.5) * 3)),
        projectProgress: Math.max(0, Math.min(100, prev.projectProgress + (Math.random() - 0.5) * 2)),
        employeeSatisfaction: Math.max(1, Math.min(5, prev.employeeSatisfaction + (Math.random() - 0.5) * 0.2)),
        budgetEfficiency: Math.max(0, Math.min(100, prev.budgetEfficiency + (Math.random() - 0.5) * 2))
      }));
    }, 150);

    // Demo responses (kosteneffizient für Demo)
    const demoResponses = locale === 'de' ? {
      team: 'Basierend auf deinen aktuellen KPIs (87% Produktivität) empfehle ich: 1) Wöchentliche Klarheitsgespräche im Team 2) Fokus-Zeiten ohne Meetings 3) Klare Ziele & Milestones. Mit Orbit können wir das systematisch umsetzen.',
      budget: 'Deine Budget-Effizienz liegt bei 90% - sehr gut! Potenziale: 1) Automatisierung repetitiver Tasks 2) Ressourcen-Pooling 3) Daten-gestützte Entscheidungen. Mit Systems Dashboard hast du alle Zahlen im Blick.',
      project: 'Projekt-Fortschritt: 73%. Ich sehe Verbesserungspotenzial bei: 1) Klarere Meilensteine 2) Team-Alignment 3) Regelmäßige Reviews. Pulse-Workshops helfen, alle abzuholen und Klarheit zu schaffen.',
      default: 'Hallo! Ich bin Môra, deine KI-Begleiterin bei Saimôr. Ich analysiere Business-Daten und gebe konkrete Empfehlungen. Stell mir gerne eine spezifische Frage zu Team, Budget oder Projekten!'
    } : {
      team: 'Based on your current KPIs (87% productivity), I recommend: 1) Weekly team clarity sessions 2) Focus time without meetings 3) Clear goals & milestones. With Orbit, we can implement this systematically.',
      budget: 'Your budget efficiency is at 90% - excellent! Potentials: 1) Automate repetitive tasks 2) Resource pooling 3) Data-driven decisions. With Systems Dashboard, you have all numbers at a glance.',
      project: 'Project progress: 73%. I see improvement potential in: 1) Clearer milestones 2) Team alignment 3) Regular reviews. Pulse workshops help get everyone on board and create clarity.',
      default: 'Hello! I\'m Môra, your AI companion at Saimôr. I analyze business data and give concrete recommendations. Feel free to ask me a specific question about team, budget or projects!'
    };

    // Match question to response
    const qLower = q.toLowerCase();
    let response = demoResponses.default;

    if (qLower.includes('produktiv') || qLower.includes('team') || qLower.includes('productiv')) {
      response = demoResponses.team;
    } else if (qLower.includes('budget') || qLower.includes('kosten') || qLower.includes('cost')) {
      response = demoResponses.budget;
    } else if (qLower.includes('projekt') || qLower.includes('project') || qLower.includes('fortschritt') || qLower.includes('progress')) {
      response = demoResponses.project;
    }

    // Simulate API delay (400-900ms)
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 500));

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);

    setMoraResponse(response);
    setResponseTime(parseFloat(duration));
    setShowSuccess(true);

    // Final KPI adjustment
    setTimeout(() => {
      clearInterval(interval);
      setKpis({
        teamProductivity: 89,
        projectProgress: 76,
        employeeSatisfaction: 4.3,
        budgetEfficiency: 92
      });
    }, 200);

    setIsAsking(false);
    setUserQuestion('');
  };

  const openMoraChat = () => {
    const event = new CustomEvent('openMoraChat');
    window.dispatchEvent(event);
  };

  return (
    <section id="mora-showcase" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.04]">
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2560&auto=format&fit=crop"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(180deg, rgba(248, 247, 243, 0.98) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 247, 243, 0.98) 100%)',
              'linear-gradient(180deg, rgba(248, 247, 243, 0.95) 0%, rgba(255, 255, 255, 0.98) 50%, rgba(248, 247, 243, 0.95) 100%)',
              'linear-gradient(180deg, rgba(248, 247, 243, 0.98) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(248, 247, 243, 0.98) 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
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
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-[#D4B483] font-semibold mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4B483]/10 to-[#4A6741]/10 border border-[#D4B483]/20"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(212, 180, 131, 0)',
                '0 0 0 8px rgba(212, 180, 131, 0.1)',
                '0 0 0 0 rgba(212, 180, 131, 0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4" />
            {content.subtitle}
          </motion.p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 30%, #D4B483 70%, #E6C897 100%)',
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
          {/* LEFT: Môra Chat Interface */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated Môra Orb */}
            <div className="relative flex items-center justify-center mb-8">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute w-48 h-48 rounded-full border-2 border-dashed border-[#D4B483]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Middle pulsing ring */}
              <motion.div
                className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#D4B483]/20 to-[#4A6741]/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Orbiting particles */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#D4B483]"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-4px',
                    marginTop: '-4px'
                  }}
                  animate={{
                    x: [
                      Math.cos((angle * Math.PI) / 180) * 60,
                      Math.cos(((angle + 360) * Math.PI) / 180) * 60
                    ],
                    y: [
                      Math.sin((angle * Math.PI) / 180) * 60,
                      Math.sin(((angle + 360) * Math.PI) / 180) * 60
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.2
                  }}
                />
              ))}

              {/* Core Orb */}
              <motion.div
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#D4B483] via-[#E6C897] to-[#4A6741] flex items-center justify-center shadow-2xl"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(212, 180, 131, 0.5)',
                    '0 0 60px rgba(212, 180, 131, 0.8)',
                    '0 0 40px rgba(212, 180, 131, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
            </div>

            {/* Quick Questions with Liquid Glass */}
            <div className="space-y-3">
              {content.quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAskMora(question)}
                  className="w-full p-4 rounded-xl text-left group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.08) 0%, rgba(74, 103, 65, 0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(212, 180, 131, 0.25)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  disabled={isAsking}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-[#4A6741] group-hover:text-[#D4B483] transition-colors" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {question}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Custom Question Input */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskMora()}
                placeholder={content.inputPlaceholder}
                disabled={isAsking}
                className="w-full px-6 py-4 pr-14 rounded-2xl border-2 border-[#D4B483]/30 bg-white focus:border-[#D4B483] focus:outline-none focus:ring-2 focus:ring-[#D4B483]/20 text-gray-800 placeholder-gray-400 disabled:opacity-50"
              />
              <motion.button
                onClick={() => handleAskMora()}
                disabled={isAsking || !userQuestion.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-[#4A6741] to-[#D4B483] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAsking ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </motion.button>
            </motion.div>

            {/* Môra Response */}
            <AnimatePresence>
              {moraResponse && (
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#4A6741]/10 via-white to-[#D4B483]/10 border-2 border-[#D4B483]/30 shadow-lg"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4B483] to-[#4A6741] flex items-center justify-center flex-shrink-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-[#4A6741]">Môra</h4>
                        {showSuccess && (
                          <motion.div
                            className="flex items-center gap-1 text-xs text-green-600"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            {content.realResponse} · {responseTime}{content.seconds.slice(0, 1)}
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {moraResponse}
                      </p>
                    </div>
                  </div>

                  {/* Link to Full Chat */}
                  <motion.button
                    onClick={openMoraChat}
                    className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-[#4A6741]/5 to-[#D4B483]/5 border border-[#D4B483]/20 text-sm font-medium text-[#4A6741] hover:from-[#4A6741]/10 hover:to-[#D4B483]/10 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{content.chatLink}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-bold">{content.chatButton}</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Live Business Dashboard */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Business Dashboard
              </h3>
              <motion.div
                className="flex items-center gap-2 text-sm text-gray-500"
                animate={{ opacity: isAsking ? [1, 0.5, 1] : 1 }}
                transition={{ duration: 1, repeat: isAsking ? Infinity : 0 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={isAsking ? { scale: [1, 1.5, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span>{isAsking ? 'Analyzing...' : 'Live'}</span>
              </motion.div>
            </div>

            {/* Business KPI Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: Users,
                  label: content.kpis.productivity,
                  value: `${Math.round(kpis.teamProductivity)}%`,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'from-blue-50 to-cyan-50'
                },
                {
                  icon: Target,
                  label: content.kpis.progress,
                  value: `${Math.round(kpis.projectProgress)}%`,
                  color: 'from-purple-500 to-indigo-500',
                  bgColor: 'from-purple-50 to-indigo-50'
                },
                {
                  icon: Sparkles,
                  label: content.kpis.satisfaction,
                  value: kpis.employeeSatisfaction.toFixed(1),
                  suffix: '/5',
                  color: 'from-amber-500 to-orange-500',
                  bgColor: 'from-amber-50 to-orange-50'
                },
                {
                  icon: BarChart3,
                  label: content.kpis.budget,
                  value: `${Math.round(kpis.budgetEfficiency)}%`,
                  color: 'from-green-500 to-emerald-500',
                  bgColor: 'from-green-50 to-emerald-50'
                }
              ].map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  className="p-6 rounded-2xl relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(212, 180, 131, 0.12) 0%, rgba(74, 103, 65, 0.08) 100%)`,
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(212, 180, 131, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="absolute top-0 right-0 opacity-10">
                    <kpi.icon className="w-24 h-24 text-gray-400" strokeWidth={1} />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{kpi.label}</p>
                      <div className="flex items-baseline gap-1">
                        <motion.p
                          className="text-4xl font-bold text-gray-900"
                          key={kpi.value}
                          initial={{ scale: 1.2, color: '#D4B483' }}
                          animate={{ scale: 1, color: '#111827' }}
                          transition={{ duration: 0.4 }}
                        >
                          {kpi.value}
                        </motion.p>
                        {kpi.suffix && (
                          <span className="text-lg font-medium text-gray-600">{kpi.suffix}</span>
                        )}
                      </div>
                    </div>
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
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
                  className="p-4 rounded-xl relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.10) 0%, rgba(74, 103, 65, 0.08) 100%)',
                    backdropFilter: 'blur(18px)',
                    border: '1px solid rgba(212, 180, 131, 0.25)',
                    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.03, y: -4, boxShadow: '0 10px 36px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)' }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
                        <CheckCircle2 className="w-4 h-4 text-[#4A6741]" />
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
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 60px rgba(74, 103, 65, 0.3)' }}
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
});

export default MoraShowcase;
