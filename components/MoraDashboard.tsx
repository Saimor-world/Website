'use client';
/**
 * MoraDashboard - Unified Component
 *
 * Combines MoraShowcase (Chat Interface) + InteractiveMoraDashboard (Dashboard Grid)
 * into ONE cohesive section. User request: "aus einem Guss" - everything connected.
 *
 * Structure:
 * 1. Header with Demo Badge
 * 2. Chat Interface (top) - Ask Môra questions
 * 3. Dashboard Grid (bottom) - Folder ↔ Field view
 * 4. Môra Insights
 * 5. Quiet CTA
 */

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useId, useCallback, useRef, CSSProperties } from 'react';
import {
  Sparkles, TrendingUp, TrendingDown, Users, Target, BarChart3,
  MessageSquare, Send, Loader2, CheckCircle2, ChevronRight,
  Activity, AlertCircle, CheckCircle, LayoutGrid, Folder, Info
} from 'lucide-react';

type Locale = 'de' | 'en';

interface MoraDashboardProps {
  locale: Locale;
}

type ViewMode = 'folder' | 'field';

interface DataPoint {
  id: string;
  label: string;
  value: number;
  change: number;
  status: 'good' | 'warning' | 'critical';
  category: string;
  x: number;
  y: number;
}

// Liquid Glass Styles (konsistent mit Rest der Site)
const glassPanelStyle: CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 249, 0.85) 100%)',
  backdropFilter: 'blur(32px)',
  border: '1px solid rgba(212, 180, 131, 0.35)',
  boxShadow: '0 20px 60px rgba(74, 103, 65, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
};

const glassTileStyle: CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(212, 180, 131, 0.2) 100%)',
  border: '1px solid rgba(212, 180, 131, 0.3)',
  backdropFilter: 'blur(24px)',
  boxShadow: '0 12px 40px rgba(74, 103, 65, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
};

export default function MoraDashboard({ locale }: MoraDashboardProps) {
  // Chat States
  const [userQuestion, setUserQuestion] = useState('');
  const [moraResponse, setMoraResponse] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dashboard States
  const [viewMode, setViewMode] = useState<ViewMode>('field');
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [moraInsight, setMoraInsight] = useState(false);
  const [connections, setConnections] = useState<Array<[string, string]>>([]);
  const [isDemoTooltipVisible, setDemoTooltipVisible] = useState(false);

  const demoTooltipId = useId();
  const visitedCardsRef = useRef<Set<string>>(new Set());
  const viewSwitchCountRef = useRef(0);

  // Event dispatchers for Orb Connection
  const sendDashboardHoverEvent = useCallback((state: boolean) => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('mora-dashboard-card-hover', { detail: state }));
  }, []);

  useEffect(() => () => sendDashboardHoverEvent(false), [sendDashboardHoverEvent]);

  const emitCardVisited = useCallback((id: string) => {
    if (visitedCardsRef.current.has(id) || typeof window === 'undefined') return;
    visitedCardsRef.current.add(id);
    window.dispatchEvent(new CustomEvent('mora-dashboard-card-visited', { detail: id }));
  }, []);

  const emitViewSwitch = useCallback(() => {
    if (typeof window === 'undefined') return;
    viewSwitchCountRef.current += 1;
    window.dispatchEvent(
      new CustomEvent('mora-dashboard-view-switch', { detail: viewSwitchCountRef.current })
    );
  }, []);

  const content = {
    de: {
      title: 'Môra – Resonanz-Dashboard (Demo)',
      subtitle: 'Chat + Dashboard, ein Datenstrom',
      demoLabel: 'Demo-Dashboard (simulierte Daten)',
      demoTooltip: 'Alle Werte basieren aktuell auf lokal generierten Demo-Daten. Keine echten Kundendaten. Dieses Dashboard zeigt das Potenzial von Môra.',

      // Chat Section
      chatTitle: 'Stell Môra eine Frage',
      chatIntro: 'Frag mich zu deinem Business – ich analysiere die Daten und gebe klare Antworten.',
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
      chatLink: 'Für tiefere Analysen',
      chatButton: 'Môra Chat öffnen',

      // Dashboard Section
      dashboardTitle: 'Dashboard',
      dashboardSubtitle: 'Dual Mode: Ordner ↔ Feld Ansicht',
      folderView: 'Ordner-Ansicht',
      fieldView: 'Feld-Ansicht',
      moraInsight: '💡 Môra Insight',
      insightText: 'Team-Engagement ist stark mit Prozess-Effizienz verbunden. Die Resonanz zeigt: Klare Abläufe → höhere Zufriedenheit.',

      categories: {
        people: 'Menschen',
        process: 'Prozesse',
        resources: 'Ressourcen'
      },
      dataPoints: {
        engagement: 'Team-Engagement',
        efficiency: 'Prozess-Effizienz',
        satisfaction: 'Zufriedenheit',
        workload: 'Arbeitsbelastung',
        velocity: 'Umsetzungsgeschwindigkeit',
        clarity: 'Klarheitsindex'
      },
      status: {
        good: 'Optimal',
        warning: 'Beobachten',
        critical: 'Handeln'
      },

      // CTA
      cta: 'Demo ansehen',
      ctaSecondary: 'Mehr über Môra erfahren'
    },
    en: {
      title: 'Môra – Resonance Dashboard (Demo)',
      subtitle: 'Chat + Dashboard, one data stream',
      demoLabel: 'Demo Dashboard (simulated data)',
      demoTooltip: 'All values are currently based on locally generated demo data. No real customer data. This dashboard shows the potential of Môra.',

      // Chat Section
      chatTitle: 'Ask Môra a Question',
      chatIntro: 'Ask me about your business – I analyze the data and give clear answers.',
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
      chatLink: 'For deeper analysis',
      chatButton: 'Open Môra Chat',

      // Dashboard Section
      dashboardTitle: 'Dashboard',
      dashboardSubtitle: 'Dual Mode: Folder ↔ Field View',
      folderView: 'Folder View',
      fieldView: 'Field View',
      moraInsight: '💡 Môra Insight',
      insightText: 'Team engagement is strongly linked to process efficiency. The resonance shows: Clear workflows → higher satisfaction.',

      categories: {
        people: 'People',
        process: 'Processes',
        resources: 'Resources'
      },
      dataPoints: {
        engagement: 'Team Engagement',
        efficiency: 'Process Efficiency',
        satisfaction: 'Satisfaction',
        workload: 'Workload',
        velocity: 'Velocity',
        clarity: 'Clarity Index'
      },
      status: {
        good: 'Optimal',
        warning: 'Monitor',
        critical: 'Act'
      },

      // CTA
      cta: 'See the demo',
      ctaSecondary: 'Learn more about Môra'
    }
  }[locale];

  // Data points for dashboard
  const dataPoints: DataPoint[] = [
    {
      id: 'engagement',
      label: content.dataPoints.engagement,
      value: 87,
      change: 12,
      status: 'good',
      category: 'people',
      x: 25,
      y: 30
    },
    {
      id: 'efficiency',
      label: content.dataPoints.efficiency,
      value: 92,
      change: 8,
      status: 'good',
      category: 'process',
      x: 65,
      y: 35
    },
    {
      id: 'satisfaction',
      label: content.dataPoints.satisfaction,
      value: 78,
      change: -3,
      status: 'warning',
      category: 'people',
      x: 45,
      y: 60
    },
    {
      id: 'workload',
      label: content.dataPoints.workload,
      value: 68,
      change: -15,
      status: 'critical',
      category: 'resources',
      x: 75,
      y: 65
    },
    {
      id: 'velocity',
      label: content.dataPoints.velocity,
      value: 85,
      change: 5,
      status: 'good',
      category: 'process',
      x: 35,
      y: 75
    },
    {
      id: 'clarity',
      label: content.dataPoints.clarity,
      value: 91,
      change: 18,
      status: 'good',
      category: 'people',
      x: 55,
      y: 45
    }
  ];

  // Generate mycelium connections
  useEffect(() => {
    const newConnections: Array<[string, string]> = [
      ['engagement', 'clarity'],
      ['efficiency', 'satisfaction'],
      ['clarity', 'efficiency'],
      ['satisfaction', 'velocity'],
      ['velocity', 'workload']
    ];
    setConnections(newConnections);
  }, []);

  // Auto-show Môra insight after 3s
  useEffect(() => {
    const timer = setTimeout(() => setMoraInsight(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Chat Handler
  const handleAskMora = async (question?: string) => {
    const q = question || userQuestion;
    if (!q.trim() || isAsking) return;

    setIsAsking(true);
    setMoraResponse('');
    setShowSuccess(false);
    const startTime = Date.now();

    // Demo responses
    const demoResponses = locale === 'de' ? {
      team: 'Basierend auf deinen aktuellen KPIs (87% Engagement) empfehle ich: 1) Wöchentliche Klarheitsgespräche im Team 2) Fokus-Zeiten ohne Meetings 3) Klare Ziele & Milestones. Mit Orbit können wir das systematisch umsetzen.',
      budget: 'Deine Prozess-Effizienz liegt bei 92% - sehr gut! Potenziale: 1) Automatisierung repetitiver Tasks 2) Ressourcen-Pooling 3) Daten-gestützte Entscheidungen. Das Dashboard zeigt dir alle Zahlen im Blick.',
      project: 'Umsetzungsgeschwindigkeit: 85%. Ich sehe Verbesserungspotenzial bei: 1) Klarere Meilensteine 2) Team-Alignment 3) Regelmäßige Reviews. Pulse-Workshops helfen, alle abzuholen und Klarheit zu schaffen.',
      default: 'Hallo! Ich bin Môra, deine KI-Begleiterin bei Saimôr. Ich analysiere Business-Daten und gebe konkrete Empfehlungen. Stell mir gerne eine spezifische Frage zu Team, Prozessen oder Ressourcen!'
    } : {
      team: 'Based on your current KPIs (87% engagement), I recommend: 1) Weekly team clarity sessions 2) Focus time without meetings 3) Clear goals & milestones. With Orbit, we can implement this systematically.',
      budget: 'Your process efficiency is at 92% - excellent! Potentials: 1) Automate repetitive tasks 2) Resource pooling 3) Data-driven decisions. The dashboard shows you all numbers at a glance.',
      project: 'Velocity: 85%. I see improvement potential in: 1) Clearer milestones 2) Team alignment 3) Regular reviews. Pulse workshops help get everyone on board and create clarity.',
      default: 'Hello! I\'m Môra, your AI companion at Saimôr. I analyze business data and give concrete recommendations. Feel free to ask me a specific question about team, processes or resources!'
    };

    // Match question to response
    const qLower = q.toLowerCase();
    let response = demoResponses.default;

    if (qLower.includes('produktiv') || qLower.includes('team') || qLower.includes('productiv') || qLower.includes('engagement')) {
      response = demoResponses.team;
    } else if (qLower.includes('budget') || qLower.includes('kosten') || qLower.includes('cost') || qLower.includes('effizien')) {
      response = demoResponses.budget;
    } else if (qLower.includes('projekt') || qLower.includes('project') || qLower.includes('fortschritt') || qLower.includes('progress') || qLower.includes('velocity')) {
      response = demoResponses.project;
    }

    // Simulate API delay (400-900ms)
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 500));

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);

    setMoraResponse(response);
    setResponseTime(parseFloat(duration));
    setShowSuccess(true);
    setIsAsking(false);
    setUserQuestion('');
  };

  const openMoraChat = () => {
    const event = new CustomEvent('openMoraChat');
    window.dispatchEvent(event);
  };

  // Helper functions
  const getStatusColor = (status: DataPoint['status']) => {
    switch (status) {
      case 'good': return '#4A6741';
      case 'warning': return '#D4B483';
      case 'critical': return '#E85D75';
    }
  };

  const getStatusIcon = (status: DataPoint['status']) => {
    switch (status) {
      case 'good': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'critical': return AlertCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'people': return '#4A6741';
      case 'process': return '#5D7C54';
      case 'resources': return '#D4B483';
      default: return '#669966';
    }
  };

  return (
    <section id="mora-dashboard" className="relative py-20 sm:py-24 overflow-hidden">
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
        {/* Header with Demo Badge */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 30%, #D4B483 70%, #E6C897 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            {content.subtitle}
          </p>

          {/* Demo Badge with Tooltip */}
          <div className="flex items-center justify-center gap-2">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl group relative"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.15) 0%, rgba(212, 180, 131, 0.08) 100%)',
                border: '1px solid rgba(212, 180, 131, 0.4)'
              }}
            >
              <span
                className="text-sm font-medium text-gray-700"
                role="status"
                aria-live="polite"
                title={content.demoTooltip}
              >
                {content.demoLabel}
              </span>
              <button
                type="button"
                className="relative flex items-center justify-center w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4B483]/50"
                onMouseEnter={() => setDemoTooltipVisible(true)}
                onMouseLeave={() => setDemoTooltipVisible(false)}
                onFocus={() => setDemoTooltipVisible(true)}
                onBlur={() => setDemoTooltipVisible(false)}
                aria-describedby={demoTooltipId}
              >
                <Info className="w-4 h-4 text-[#D4B483]" />
                {/* Tooltip */}
                <div
                  id={demoTooltipId}
                  role="tooltip"
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 rounded-lg transition duration-300 whitespace-nowrap max-w-xs ${
                    isDemoTooltipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.98) 0%, rgba(93, 124, 84, 0.95) 100%)',
                    border: '1px solid rgba(212, 180, 131, 0.4)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <p className="text-sm text-white whitespace-normal">{content.demoTooltip}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="w-2 h-2 rotate-45 bg-[#4A6741] border-r border-b border-[rgba(212,180,131,0.4)]" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* CHAT SECTION */}
        <motion.div
          className="mb-16 rounded-3xl p-8 shadow-xl"
          style={glassPanelStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {content.chatTitle}
            </h3>
            <p className="text-gray-600">{content.chatIntro}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Quick Questions */}
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
            </div>

            {/* Right: Môra Response */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                {moraResponse ? (
                  <motion.div
                    className="w-full p-6 rounded-2xl"
                    style={{
                      ...glassTileStyle,
                      background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.15) 0%, rgba(212, 180, 131, 0.1) 100%)'
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
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
                        background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.2) 0%, rgba(212, 180, 131, 0.15) 100%)'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{content.chatLink}</span>
                      <ChevronRight className="w-4 h-4" />
                      <span className="font-bold">{content.chatButton}</span>
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-[#D4B483]" />
                    <p className="text-sm">{content.chatIntro}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* DASHBOARD SECTION */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {content.dashboardTitle}
            </h3>
            <p className="text-gray-600 mb-6">{content.dashboardSubtitle}</p>

            {/* View Mode Toggle */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <motion.button
                onClick={() => {
                  setViewMode('folder');
                  emitViewSwitch();
                }}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all min-h-[44px]"
                style={{
                  background: viewMode === 'folder'
                    ? 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)'
                    : 'rgba(74, 103, 65, 0.1)',
                  color: viewMode === 'folder' ? 'white' : '#4A6741',
                  border: viewMode === 'folder' ? 'none' : '2px solid rgba(74, 103, 65, 0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Folder className="w-5 h-5" />
                <span>{content.folderView}</span>
              </motion.button>

              <motion.button
                onClick={() => {
                  setViewMode('field');
                  emitViewSwitch();
                }}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all min-h-[44px]"
                style={{
                  background: viewMode === 'field'
                    ? 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)'
                    : 'rgba(74, 103, 65, 0.1)',
                  color: viewMode === 'field' ? 'white' : '#4A6741',
                  border: viewMode === 'field' ? 'none' : '2px solid rgba(74, 103, 65, 0.3)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LayoutGrid className="w-5 h-5" />
                <span>{content.fieldView}</span>
              </motion.button>
            </div>
          </div>

          {/* Dashboard Container */}
          <motion.div
            className="relative rounded-3xl p-5 sm:p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 249, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(212, 180, 131, 0.3)',
              boxShadow: '0 20px 60px rgba(74, 103, 65, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}
          >
            <AnimatePresence mode="wait">
              {viewMode === 'folder' ? (
                // FOLDER VIEW - Traditional Cards
                <motion.div
                  key="folder"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {dataPoints.map((point, i) => {
                    const StatusIcon = getStatusIcon(point.status);
                    return (
                      <motion.div
                        data-mora-node="true"
                        key={point.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onMouseEnter={() => {
                          setHoveredPoint(point.id);
                          sendDashboardHoverEvent(true);
                          emitCardVisited(point.id);
                        }}
                        onMouseLeave={() => {
                          setHoveredPoint(null);
                          sendDashboardHoverEvent(false);
                        }}
                        className="relative rounded-2xl p-5 sm:p-6 min-h-[240px] cursor-pointer group"
                        style={{
                          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, ${getCategoryColor(point.category)}15 100%)`,
                          border: `2px solid ${hoveredPoint === point.id ? getCategoryColor(point.category) : 'rgba(212, 180, 131, 0.2)'}`,
                          boxShadow: hoveredPoint === point.id
                            ? `0 10px 40px ${getCategoryColor(point.category)}30`
                            : '0 4px 12px rgba(0, 0, 0, 0.08)'
                        }}
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        {/* Category badge */}
                        <div
                          className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 sm:px-3 py-1 rounded-full text-[0.65rem] sm:text-xs font-semibold"
                          style={{
                            background: `${getCategoryColor(point.category)}20`,
                            color: getCategoryColor(point.category)
                          }}
                        >
                          {content.categories[point.category as keyof typeof content.categories]}
                        </div>

                        {/* Status Icon */}
                        <StatusIcon
                          className="w-8 h-8 mb-4"
                          style={{ color: getStatusColor(point.status) }}
                        />

                        {/* Label */}
                        <h4 className="text-lg font-bold text-slate-800 mb-2">
                          {point.label}
                        </h4>

                        {/* Value */}
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-4xl font-bold" style={{ color: getCategoryColor(point.category) }}>
                            {point.value}
                          </span>
                          <span className="text-lg text-gray-500">/ 100</span>
                        </div>

                        {/* Change */}
                        <div className="flex items-center gap-2">
                          {point.change > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className="text-sm font-semibold"
                            style={{ color: point.change > 0 ? '#4A6741' : '#E85D75' }}
                          >
                            {point.change > 0 ? '+' : ''}{point.change}%
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                // FIELD VIEW - Mycelium Network
                <motion.div
                  key="field"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative h-[520px] sm:h-[600px]"
                >
                  {/* SVG for connections */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(74, 103, 65, 0.6)" />
                        <stop offset="50%" stopColor="rgba(212, 180, 131, 0.8)" />
                        <stop offset="100%" stopColor="rgba(74, 103, 65, 0.6)" />
                      </linearGradient>
                    </defs>

                    {connections.map(([from, to], i) => {
                      const fromPoint = dataPoints.find(p => p.id === from);
                      const toPoint = dataPoints.find(p => p.id === to);
                      if (!fromPoint || !toPoint) return null;

                      const isActive = hoveredPoint === from || hoveredPoint === to;

                      return (
                        <motion.line
                          key={`${from}-${to}`}
                          x1={`${fromPoint.x}%`}
                          y1={`${fromPoint.y}%`}
                          x2={`${toPoint.x}%`}
                          y2={`${toPoint.y}%`}
                          stroke="url(#connectionGradient)"
                          strokeWidth={isActive ? 3 : 2}
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: 1,
                            opacity: isActive ? 1 : 0.4
                          }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      );
                    })}
                  </svg>

                  {/* Data points */}
                  {dataPoints.map((point, i) => {
                    const StatusIcon = getStatusIcon(point.status);
                    return (
                      <motion.div
                        key={point.id}
                        className="absolute cursor-pointer group"
                        style={{
                          left: `${point.x}%`,
                          top: `${point.y}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: hoveredPoint === point.id ? 10 : 5
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.15, type: 'spring' }}
                        onMouseEnter={() => {
                          setHoveredPoint(point.id);
                          sendDashboardHoverEvent(true);
                          emitCardVisited(point.id);
                        }}
                        onMouseLeave={() => {
                          setHoveredPoint(null);
                          sendDashboardHoverEvent(false);
                        }}
                        whileHover={{ scale: 1.2 }}
                      >
                        {/* Data point orb */}
                        <motion.div
                          className="relative w-20 h-20 rounded-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${getCategoryColor(point.category)} 0%, ${getCategoryColor(point.category)}CC 100%)`,
                            boxShadow: `0 8px 24px ${getCategoryColor(point.category)}40`,
                            border: '2px solid rgba(255, 255, 255, 0.3)'
                          }}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{point.value}</div>
                            <div className="text-[10px] text-white/80">
                              {point.change > 0 ? '+' : ''}{point.change}%
                            </div>
                          </div>

                          {/* Status indicator */}
                          <div
                            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                            style={{
                              background: getStatusColor(point.status),
                              border: '2px solid white'
                            }}
                          >
                            <StatusIcon className="w-3 h-3 text-white" />
                          </div>
                        </motion.div>

                        {/* Tooltip */}
                        <AnimatePresence>
                          {hoveredPoint === point.id && (
                            <motion.div
                              className="absolute bottom-full left-1/2 mb-4 whitespace-nowrap"
                              initial={{ opacity: 0, y: 10, x: '-50%' }}
                              animate={{ opacity: 1, y: 0, x: '-50%' }}
                              exit={{ opacity: 0, y: 10 }}
                              style={{ zIndex: 100 }}
                            >
                              <div
                                className="px-4 py-3 rounded-xl shadow-2xl text-sm"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 249, 0.95) 100%)',
                                  backdropFilter: 'blur(12px)',
                                  border: `2px solid ${getCategoryColor(point.category)}`,
                                  boxShadow: `0 8px 32px ${getCategoryColor(point.category)}30`
                                }}
                              >
                                <div className="font-bold text-slate-800 mb-1">{point.label}</div>
                                <div className="text-xs text-gray-600">
                                  {content.categories[point.category as keyof typeof content.categories]} · {content.status[point.status]}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Môra Insight Panel */}
          <AnimatePresence>
            {moraInsight && (
              <motion.div
                className="mt-8 rounded-3xl p-6 overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 100%)',
                  border: '2px solid rgba(212, 180, 131, 0.4)',
                  boxShadow: '0 12px 40px rgba(74, 103, 65, 0.3)'
                }}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-[#D4B483]" />
                </motion.div>

                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {content.moraInsight}
                    </h4>
                    <p className="text-white/90 leading-relaxed">
                      {content.insightText}
                    </p>
                  </div>

                  <button
                    onClick={() => setMoraInsight(false)}
                    className="text-white/60 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA - Ruhig & Einladend */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/#waitlist"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white bg-gradient-to-r from-[#4A6741] to-[#D4B483] shadow-2xl"
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 60px rgba(74, 103, 65, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            {content.cta}
          </motion.a>

          <div>
            <motion.a
              href={locale === 'de' ? '/mora' : '/en/mora'}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#4A6741] transition-colors"
              whileHover={{ x: 4 }}
            >
              {content.ctaSecondary}
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
