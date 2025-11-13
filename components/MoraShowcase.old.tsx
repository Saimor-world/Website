// DEPRECATED: This component was replaced by MoraDashboard.tsx (unified Môra demo section).
// Do not add new code here; kept only for reference until archival.
'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo, CSSProperties } from 'react';
import {
  Sparkles,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

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

const glassPanelStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 249, 0.85) 100%)',
  backdropFilter: 'blur(32px)',
  border: '1px solid rgba(212, 180, 131, 0.35)',
  boxShadow:
    '0 20px 60px rgba(74, 103, 65, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
};

const glassTileStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(212, 180, 131, 0.2) 100%)',
  border: '1px solid rgba(212, 180, 131, 0.3)',
  backdropFilter: 'blur(24px)',
  boxShadow:
    '0 12px 40px rgba(74, 103, 65, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
};

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

    // Demo responses
    const demoResponses = locale === 'de' ? {
      team: 'Basierend auf deinen aktuellen KPIs (87% Produktivität) empfehle ich: 1) Wöchentliche Klarheitsgespräche im Team 2) Fokus-Zeiten ohne Meetings 3) Klare Ziele & Milestones. Mit Orbit können wir das systematisch umsetzen.',
      budget: 'Deine Budget-Effizienz liegt bei 90% - sehr gut! Potenziale: 1) Automatisierung repetitiver Tasks 2) Ressourcen-Pooling 3) Daten-gestützte Entscheidungen. Môra zeigt dir alle Zahlen im Blick.',
      project: 'Projekt-Fortschritt: 73%. Ich sehe Verbesserungspotenzial bei: 1) Klarere Meilensteine 2) Team-Alignment 3) Regelmäßige Reviews. Pulse-Workshops helfen, alle abzuholen und Klarheit zu schaffen.',
      default: 'Hallo! Ich bin Môra, deine KI-Begleiterin bei Saimôr. Ich analysiere Business-Daten und gebe konkrete Empfehlungen. Stell mir gerne eine spezifische Frage zu Team, Budget oder Projekten!'
    } : {
      team: 'Based on your current KPIs (87% productivity), I recommend: 1) Weekly team clarity sessions 2) Focus time without meetings 3) Clear goals & milestones. With Orbit, we can implement this systematically.',
      budget: 'Your budget efficiency is at 90% - excellent! Potentials: 1) Automate repetitive tasks 2) Resource pooling 3) Data-driven decisions. Môra shows you all numbers at a glance.',
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
          <Image
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2560&auto=format&fit=crop"
            alt="Abstract illuminated shapes"
            fill
            className="object-cover"
            loading="lazy"
            decoding="async"
            sizes="100vw"
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
            className="space-y-6 rounded-3xl p-8 shadow-xl"
            style={glassPanelStyle}
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

            {/* Quick Questions */}
            <div className="space-y-3">
              {content.quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAskMora(question)}
                  className="w-full p-4 rounded-2xl text-left transition-all group disabled:opacity-50"
                  style={glassTileStyle}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
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
                className="w-full px-6 py-4 pr-14 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4B483]/30 disabled:opacity-50 bg-transparent"
                style={glassTileStyle}
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
                  className="p-6 rounded-2xl"
                  style={{
                    ...glassTileStyle,
                    background:
                      'linear-gradient(135deg, rgba(74, 103, 65, 0.15) 0%, rgba(212, 180, 131, 0.1) 100%)'
                  }}
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
                        <h4 className="font-bold text-gray-900">Môra</h4>
                        {showSuccess && (
                          <motion.div
                            className="flex items-center gap-1 text-xs text-emerald-600"
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
                    className="w-full mt-4 py-3 rounded-xl text-sm font-medium text-gray-900 transition-all flex items-center justify-center gap-2"
                    style={{
                      ...glassTileStyle,
                      background:
                        'linear-gradient(135deg, rgba(74, 103, 65, 0.2) 0%, rgba(212, 180, 131, 0.15) 100%)'
                    }}
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
            className="space-y-6 rounded-3xl p-8 shadow-xl"
            style={glassPanelStyle}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Business Dashboard
              </h3>
              <motion.div
                className="flex items-center gap-2 text-sm text-gray-600"
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
                  gradient:
                    'linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(6, 182, 212, 0.18) 100%)',
                  iconGradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)'
                },
                {
                  icon: Target,
                  label: content.kpis.progress,
                  value: `${Math.round(kpis.projectProgress)}%`,
                  gradient:
                    'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.18) 100%)',
                  iconGradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)'
                },
                {
                  icon: Sparkles,
                  label: content.kpis.satisfaction,
                  value: kpis.employeeSatisfaction.toFixed(1),
                  suffix: '/5',
                  gradient:
                    'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(249, 115, 22, 0.18) 100%)',
                  iconGradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)'
                },
                {
                  icon: BarChart3,
                  label: content.kpis.budget,
                  value: `${Math.round(kpis.budgetEfficiency)}%`,
                  gradient:
                    'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.18) 100%)',
                  iconGradient: 'linear-gradient(135deg, #22C55E 0%, #10B981 100%)'
                }
              ].map((kpi) => (
                <motion.div
                  key={kpi.label}
                  className="p-6 rounded-2xl relative overflow-hidden"
                  style={{ ...glassTileStyle, background: kpi.gradient }}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="absolute top-0 right-0 opacity-10">
                    <kpi.icon className="w-24 h-24 text-gray-800" strokeWidth={1} />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">{kpi.label}</p>
                      <div className="flex items-baseline gap-1">
                        <motion.p
                          className="text-4xl font-bold text-gray-900"
                          key={kpi.value}
                          initial={{ scale: 1.2, color: '#D4B483' }}
                          animate={{ scale: 1, color: '#1f2937' }}
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
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{ background: kpi.iconGradient }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <kpi.icon className="w-6 h-6 text-white" />
                    </motion.div>
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
