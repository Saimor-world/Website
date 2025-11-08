'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Sparkles, TrendingUp, Activity, BarChart3,
  MessageSquare, Send, Loader2, Layers, Grid3x3,
  Zap, Eye, Network
} from 'lucide-react';

type Locale = 'de' | 'en';

interface Props {
  locale: Locale;
}

interface BusinessKPI {
  label: string;
  value: number;
  trend: number;
  color: string;
}

export default function InteractiveMoraDashboard({ locale }: Props) {
  const [viewMode, setViewMode] = useState<'folder' | 'field'>('folder');
  const [activeKPI, setActiveKPI] = useState<number | null>(null);
  const [pulseActive, setPulseActive] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const content = {
    de: {
      title: 'Môra Dashboard - Erlebe KI in Echtzeit',
      subtitle: 'Dual Mode: Ordner-Ansicht ↔ Feld-Ansicht',
      folderMode: 'Ordner',
      fieldMode: 'Feld',
      placeholder: 'Frag Môra etwas...',
      ask: 'Fragen'
    },
    en: {
      title: 'Môra Dashboard - Experience AI in Real-Time',
      subtitle: 'Dual Mode: Folder View ↔ Field View',
      folderMode: 'Folder',
      fieldMode: 'Field',
      placeholder: 'Ask Môra something...',
      ask: 'Ask'
    }
  }[locale];

  const [kpis, setKpis] = useState<BusinessKPI[]>([
    { label: locale === 'de' ? 'Team-Produktivität' : 'Team Productivity', value: 87, trend: 5, color: '#4A6741' },
    { label: locale === 'de' ? 'Projekt-Fortschritt' : 'Project Progress', value: 73, trend: 8, color: '#D4B483' },
    { label: locale === 'de' ? 'Mitarbeiter-Zufriedenheit' : 'Employee Satisfaction', value: 85, trend: -2, color: '#8BB581' },
    { label: locale === 'de' ? 'Budget-Effizienz' : 'Budget Efficiency', value: 90, trend: 3, color: '#E6C897' }
  ]);

  // Live KPI Updates
  useEffect(() => {
    if (!pulseActive) return;

    const interval = setInterval(() => {
      setKpis(prev => prev.map(kpi => ({
        ...kpi,
        value: Math.max(0, Math.min(100, kpi.value + (Math.random() - 0.5) * 2)),
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 10) : -Math.floor(Math.random() * 10)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [pulseActive]);

  const handleAsk = async () => {
    if (!question.trim() || isThinking) return;

    setIsThinking(true);
    setPulseActive(true);
    setResponse('');

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const responses = locale === 'de' ? [
      'Basierend auf deinen KPIs sehe ich Verbesserungspotenzial bei Team-Alignment. Empfehlung: Wöchentliche Clarity Sessions.',
      'Deine Budget-Effizienz ist stark (90%)! Fokus auf Automatisierung könnte weitere 5-8% bringen.',
      'Projekt-Fortschritt: 73%. Ich analysiere Bottlenecks und schlage konkrete Maßnahmen vor.'
    ] : [
      'Based on your KPIs, I see improvement potential in team alignment. Recommendation: Weekly clarity sessions.',
      'Your budget efficiency is strong (90%)! Focus on automation could bring another 5-8%.',
      'Project progress: 73%. I\'m analyzing bottlenecks and suggesting concrete measures.'
    ];

    setResponse(responses[Math.floor(Math.random() * responses.length)]);
    setIsThinking(false);
    setPulseActive(false);
    setQuestion('');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Mycelium Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full">
          {[...Array(12)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${10 + i * 8}%`}
              y1="0%"
              x2={`${15 + i * 7}%`}
              y2="100%"
              stroke="url(#myceliumGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: pulseActive ? 1 : 0.3 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
          <defs>
            <linearGradient id="myceliumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4B483" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4A6741" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header with Mode Toggle */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.title}
          </motion.h2>
          <p className="text-lg text-slate-600 mb-6">{content.subtitle}</p>

          {/* Dual Mode Toggle */}
          <div className="inline-flex items-center gap-2 p-2 rounded-full"
               style={{
                 background: 'linear-gradient(135deg, rgba(74,103,65,0.1) 0%, rgba(212,180,131,0.15) 100%)',
                 border: '1px solid rgba(212,180,131,0.3)'
               }}>
            <motion.button
              onClick={() => setViewMode('folder')}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                viewMode === 'folder' ? 'text-white' : 'text-slate-600'
              }`}
              style={viewMode === 'folder' ? {
                background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)',
                boxShadow: '0 4px 12px rgba(74,103,65,0.3)'
              } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Layers size={18} />
              {content.folderMode}
            </motion.button>
            <motion.button
              onClick={() => setViewMode('field')}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                viewMode === 'field' ? 'text-white' : 'text-slate-600'
              }`}
              style={viewMode === 'field' ? {
                background: 'linear-gradient(135deg, #D4B483 0%, #E6C897 100%)',
                boxShadow: '0 4px 12px rgba(212,180,131,0.3)'
              } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3x3 size={18} />
              {content.fieldMode}
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'folder' ? (
            /* FOLDER MODE - Traditional KPI Cards */
            <motion.div
              key="folder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {kpis.map((kpi, i) => (
                <motion.div
                  key={kpi.label}
                  className="relative p-6 rounded-3xl cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,245,240,0.9) 100%)',
                    border: `2px solid ${activeKPI === i ? kpi.color : 'rgba(212,180,131,0.3)'}`,
                    boxShadow: activeKPI === i ? `0 20px 40px ${kpi.color}30` : '0 8px 20px rgba(0,0,0,0.1)'
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setActiveKPI(activeKPI === i ? null : i)}
                >
                  {/* Pulse indicator */}
                  {pulseActive && (
                    <motion.div
                      className="absolute top-4 right-4 w-3 h-3 rounded-full"
                      style={{ background: kpi.color }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  <div className="text-sm text-slate-600 mb-2">{kpi.label}</div>
                  <div className="flex items-end justify-between">
                    <motion.div
                      className="text-4xl font-bold"
                      style={{ color: kpi.color }}
                      animate={pulseActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2 }}
                    >
                      {Math.round(kpi.value)}%
                    </motion.div>
                    <div className={`flex items-center gap-1 text-sm ${kpi.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.trend > 0 ? '↗' : '↘'} {Math.abs(kpi.trend)}%
                    </div>
                  </div>

                  {/* Enhanced Resonanz-Linie with glow */}
                  {activeKPI === i && (
                    <>
                      {/* Glow layer */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-2 rounded-full"
                        style={{
                          background: kpi.color,
                          filter: 'blur(8px)',
                          opacity: 0.6
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Main line */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 rounded-full overflow-hidden"
                        style={{ background: kpi.color }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Animated shimmer */}
                        <motion.div
                          className="absolute inset-0 h-full"
                          style={{
                            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)`,
                            width: '50%'
                          }}
                          animate={{
                            x: ['0%', '200%']
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />
                      </motion.div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* FIELD MODE - Network Visualization */
            <motion.div
              key="field"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative mb-12 p-12 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(74,103,65,0.05) 0%, rgba(212,180,131,0.08) 100%)',
                border: '1px solid rgba(212,180,131,0.3)',
                minHeight: '400px'
              }}
            >
              {/* Central Node - Môra */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center"
                     style={{
                       background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
                       boxShadow: '0 0 40px rgba(212,180,131,0.5)'
                     }}>
                  <Network size={32} className="text-white" />
                </div>
              </motion.div>

              {/* KPI Nodes around center */}
              {kpis.map((kpi, i) => {
                const angle = (i * 360) / kpis.length;
                const radius = 140;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={kpi.label}
                    className="absolute top-1/2 left-1/2 cursor-pointer"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setActiveKPI(activeKPI === i ? null : i)}
                  >
                    {/* Connection line with enhanced resonance */}
                    <svg className="absolute top-1/2 left-1/2 pointer-events-none"
                         style={{ width: radius * 2, height: radius * 2, transform: 'translate(-50%, -50%)' }}>
                      <defs>
                        <linearGradient id={`lineGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={kpi.color} stopOpacity="0.8" />
                          <stop offset="100%" stopColor={kpi.color} stopOpacity="0.2" />
                        </linearGradient>
                      </defs>

                      {/* Main connection line */}
                      <motion.line
                        x1="50%"
                        y1="50%"
                        x2={`${50 + (x / radius) * 50}%`}
                        y2={`${50 + (y / radius) * 50}%`}
                        stroke={`url(#lineGradient-${i})`}
                        strokeWidth={activeKPI === i ? "3" : "1.5"}
                        opacity={activeKPI === i || pulseActive ? 1 : 0.4}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                      />

                      {/* Glow effect on active */}
                      {activeKPI === i && (
                        <motion.line
                          x1="50%"
                          y1="50%"
                          x2={`${50 + (x / radius) * 50}%`}
                          y2={`${50 + (y / radius) * 50}%`}
                          stroke={kpi.color}
                          strokeWidth="6"
                          opacity="0.3"
                          filter="blur(4px)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        />
                      )}

                      {/* Animated particle */}
                      {(activeKPI === i || pulseActive) && (
                        <motion.circle
                          r="4"
                          fill={kpi.color}
                          initial={{
                            cx: '50%',
                            cy: '50%',
                            opacity: 0
                          }}
                          animate={{
                            cx: `${50 + (x / radius) * 50}%`,
                            cy: `${50 + (y / radius) * 50}%`,
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />
                      )}

                      {/* Connection dot at endpoint */}
                      <motion.circle
                        cx={`${50 + (x / radius) * 50}%`}
                        cy={`${50 + (y / radius) * 50}%`}
                        r={activeKPI === i ? "5" : "3"}
                        fill={kpi.color}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 }}
                      />
                    </svg>

                    <div className="relative p-4 rounded-2xl text-center"
                         style={{
                           background: activeKPI === i ? kpi.color : 'rgba(255,255,255,0.95)',
                           border: `2px solid ${kpi.color}`,
                           minWidth: '120px'
                         }}>
                      <div className={`text-xs mb-1 ${activeKPI === i ? 'text-white' : 'text-slate-600'}`}>
                        {kpi.label}
                      </div>
                      <div className={`text-2xl font-bold ${activeKPI === i ? 'text-white' : ''}`}
                           style={activeKPI !== i ? { color: kpi.color } : {}}>
                        {Math.round(kpi.value)}%
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Chat */}
        <motion.div
          className="max-w-3xl mx-auto p-8 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,245,240,0.9) 100%)',
            border: '2px solid rgba(212,180,131,0.3)',
            boxShadow: '0 20px 40px rgba(74,103,65,0.15)'
          }}
        >
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              placeholder={content.placeholder}
              className="flex-1 px-6 py-4 rounded-2xl border-2 border-saimor-gold/30 focus:border-saimor-gold focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.8)' }}
            />
            <motion.button
              onClick={handleAsk}
              disabled={!question.trim() || isThinking}
              className="px-8 py-4 rounded-2xl font-bold text-white flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
                opacity: !question.trim() || isThinking ? 0.5 : 1
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isThinking ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              {content.ask}
            </motion.button>
          </div>

          {/* Response */}
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(74,103,65,0.08) 0%, rgba(212,180,131,0.12) 100%)',
                  border: '1px solid rgba(212,180,131,0.3)'
                }}
              >
                <div className="flex items-start gap-3">
                  <Sparkles size={20} className="text-saimor-gold mt-1 flex-shrink-0" />
                  <p className="text-slate-700 leading-relaxed">{response}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
