'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, TrendingUp, TrendingDown, Users, Target, BarChart3,
  MessageSquare, Send, X, ArrowRight,
  Activity, LayoutGrid, Building2, Zap, Settings, User, Compass, Search, Bell, Eye, Minimize2, Maximize2
} from 'lucide-react';

type Locale = 'de' | 'en';

interface MoraDashboardProps {
  locale: Locale;
}

type ViewMode = 'universe' | 'folders' | 'chat';

interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  status: 'good' | 'warning' | 'critical';
  category: 'people' | 'process' | 'resources';
  departmentCount?: number;
  spaceCount?: number;
  folderCount?: number;
  nodeCount?: number;
  activeUsers?: number;
  lastActivity?: string;
  icon: any;
  trend?: number[];
}

export default function MoraDashboard({ locale }: MoraDashboardProps) {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('universe');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [hoveredNode, setHoveredMetric] = useState<string | null>(null);
  const [userQuestion, setUserQuestion] = useState('');
  const [moraResponse, setMoraResponse] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ q: string, a: string }[]>([]);
  const [liveData, setLiveData] = useState<any>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const chartIdRef = useRef(0);
  const chatScrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollChatToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
    const el = chatScrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    if (viewMode !== 'chat') return;

    // Keep scrolling strictly inside the chat panel. `scrollIntoView` may scroll the whole page,
    // which caused the viewport to jump down towards the "Analog Affect" button.
    requestAnimationFrame(() => scrollChatToBottom('auto'));
  }, [viewMode, scrollChatToBottom]);

  useEffect(() => {
    if (viewMode !== 'chat') return;
    scrollChatToBottom(chatHistory.length > 0 ? 'smooth' : 'auto');
  }, [viewMode, chatHistory.length, isThinking, scrollChatToBottom]);

  const getContextualResponse = (question: string) => {
    const q = (question || "").toLowerCase();
    const responses = {
      team: [
        "Die Resonanzanalyse zeigt eine fluktuierende Dynamik. Der 'Clarity Index' im Team-Backend ist auf 87% gestiegen, was auf verbesserte interne Kommunikation hindeutet.",
        "Ich erkenne eine starke semantische Kopplung zwischen Team-Zufriedenheit und Output-Velocity. Ein leichter Drift in Abteilung 3 sollte beobachtet werden.",
        "Die sozialen Knotenpunkte im System sind hochaktiv. Die Resonanz im Bereich 'Collaboration' ist auf einem Allzeithoch."
      ],
      finanz: [
        "Finanz-Knoten stabil. Ich erkenne jedoch eine semantische Reibung im Bereich 'Resource Allocation'. Eine Optimierung würde die Effizienz um ca. 12% steigern.",
        "Die Budget-Resonanz ist im grünen Bereich. Die semantische Schicht empfiehlt eine Re-Investigation der Fixkosten-Cluster in Q3.",
        "Positive Korrelation zwischen F&E-Investitionen und der zukünftigen Velocity-Prognose detektiert."
      ],
      vision: [
        "Ich bin MÔRA Intelligence, die semantische Schicht deines Unternehmens. Ich sehe keine isolierten Daten, sondern ganzheitliche Resonanzen.",
        "Meine Aufgabe ist es, die verborgenen Muster in deinem Organisations-Universum sichtbar zu machen. Aktueller Systemstatus: Harmonisch.",
        "Resonanz v4.2 aktiv. Ich verarbeite aktuell über 150.000 semantische Knoten pro Sekunde für maximale Klarheit."
      ],
      default: [
        "Interessante Beobachtung. Die Korrelation zwischen 'Velocity' und 'Clarity' hat sich verdichtet. Ich empfehle tiefergehende Analysen in Cluster 7.",
        "Analyse abgeschlossen. Ich habe eine minimale Anomalie in den Kommunikations-Clustern gefunden, die auf Informationsverlust hindeuten könnte.",
        "Die Datenströme fließen synchron. Fokus liegt aktuell auf der Erhaltung des hohen Resonanzniveaus von 91% in der Prozess-Effizienz.",
        "System-Check: Alle semantischen Pfade sind offen. Die Resonanz-Matrix zeigt keine nennenswerten Interferenzen."
      ]
    };

    if (q.includes('team') || q.includes('mitarbeiter') || q.includes('leute')) return responses.team[Math.floor(Math.random() * responses.team.length)];
    if (q.includes('geld') || q.includes('umsatz') || q.includes('kosten') || q.includes('finanz')) return responses.finanz[Math.floor(Math.random() * responses.finanz.length)];
    if (q.includes('wer bist') || q.includes('mora') || q.includes('was tust')) return responses.vision[Math.floor(Math.random() * responses.vision.length)];

    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  const handleSendMessage = async () => {
    if (userQuestion.trim() && !isThinking) {
      const question = userQuestion;
      setUserQuestion('');
      setIsThinking(true);
      setMoraResponse(null);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: question,
            sessionId: sessionId || 'temp-session'
          })
        });

        if (response.ok) {
          const data = await response.json();
          const answer = data.message.content;
          setMoraResponse(answer);
          setChatHistory(prev => [...prev, { q: question, a: answer }].slice(-10));
        } else {
          // Fallback to contextual response if API fails
          const answer = getContextualResponse(question);
          setMoraResponse(answer);
          setChatHistory(prev => [...prev, { q: question, a: answer }].slice(-10));
        }
      } catch (error) {
        console.error('Chat error:', error);
        const answer = getContextualResponse(question);
        setMoraResponse(answer);
        setChatHistory(prev => [...prev, { q: question, a: answer }].slice(-10));
      } finally {
        setIsThinking(false);
      }
    }
  };

  // Stable star positions - only generate once
  const starPositions = useMemo(() => {
    return Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2
    }));
  }, []);

  // Keyboard shortcuts - improved dependency management
  useEffect(() => {
    if (!mounted) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if not typing in input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === 'Enter') return;
        return;
      }

      // Prevent if a modal or dropdown is open
      if (selectedMetric && e.key !== 'Escape') return;

      switch (e.key) {
        case '1':
          e.preventDefault();
          setViewMode('universe');
          if (selectedMetric) setSelectedMetric(null);
          break;
        case '2':
          e.preventDefault();
          setViewMode('folders');
          if (selectedMetric) setSelectedMetric(null);
          break;
        case '3':
          e.preventDefault();
          setViewMode('chat');
          if (selectedMetric) setSelectedMetric(null);
          break;
        case 'Escape':
          e.preventDefault();
          if (selectedMetric) {
            setSelectedMetric(null);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mounted, selectedMetric]);

  // Real-time data polling - improved error handling
  useEffect(() => {
    if (!mounted) return;
    let isMounted = true;

    const fetchLiveData = async () => {
      try {
        setIsLoadingData(true);
        const response = await fetch('/api/dashboard/overview', {
          cache: 'no-store',
          signal: AbortSignal.timeout(5000) // 5s timeout
        });
        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          setLiveData(data);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Failed to fetch dashboard data:', error);
        }
      } finally {
        if (isMounted) setIsLoadingData(false);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [mounted]);

  // Initialization effect
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(locale === 'de' ? 'de-DE' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);

    // Initialize session ID
    let sid = localStorage.getItem('saimor-mora-session');
    if (!sid) {
      sid = 'mora_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('saimor-mora-session', sid);
    }
    setSessionId(sid);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(timer);
    };
  }, [locale]);

  // --- CONTENT ---
  const t = {
    de: {
      systemName: "MÔRA UNIVERSE OS",
      status: "Resonanz Aktiv",
      search: "Nach Zusammenhängen suchen...",
      chatTitle: "Môra Intelligence",
      universe: "Universum",
      folders: "Systeme",
      chat: "Gedächtnis",
      metrics: {
        team: "Team-Engagement",
        process: "Prozess-Effizienz",
        clarity: "Klarheits-Index",
        velocity: "Velocity",
        satisfaction: "Zufriedenheit",
        workload: "Arbeitslast"
      }
    },
    en: {
      systemName: "MÔRA UNIVERSE OS",
      status: "Resonance Active",
      search: "Search connections...",
      chatTitle: "Môra Intelligence",
      universe: "Universe",
      folders: "Systems",
      chat: "Memory",
      metrics: {
        team: "Team Engagement",
        process: "Process Efficiency",
        clarity: "Clarity Index",
        velocity: "Velocity",
        satisfaction: "Satisfaction",
        workload: "Workload"
      }
    }
  }[locale];

  // Stable trend generation - same for each metric ID
  const generateTrendForMetric = useCallback((metricId: string) => {
    // Use metric ID as seed for consistent trends
    let seed = 0;
    for (let i = 0; i < metricId.length; i++) {
      seed += metricId.charCodeAt(i);
    }
    const baseValue = 70 + (seed % 30);
    return Array.from({ length: 12 }, (_, i) => {
      const variation = Math.sin(i * 0.5) * 10 + (seed % 20) - 10;
      return Math.max(50, Math.min(100, Math.round(baseValue + variation)));
    });
  }, []);

  // --- DEMO DATA with stable trends ---
  const metrics: DashboardMetric[] = useMemo(() => {
    const baseMetrics = [
      { id: 'team', label: t.metrics.team, value: 87, change: 12, status: 'good' as const, category: 'people' as const, icon: Users, nodeCount: 156, departmentCount: 4, spaceCount: 12, folderCount: 28, activeUsers: 24, lastActivity: 'vor 2 Std' },
      { id: 'process', label: t.metrics.process, value: 92, change: 8, status: 'good' as const, category: 'process' as const, icon: Target, nodeCount: 134, departmentCount: 3, spaceCount: 9, folderCount: 22, activeUsers: 18, lastActivity: 'vor 45 Min' },
      { id: 'clarity', label: t.metrics.clarity, value: 91, change: 18, status: 'good' as const, category: 'people' as const, icon: Eye, nodeCount: 148, departmentCount: 4, spaceCount: 11, folderCount: 26, activeUsers: 22, lastActivity: 'vor 30 Min' },
      { id: 'velocity', label: t.metrics.velocity, value: 85, change: 5, status: 'good' as const, category: 'process' as const, icon: Zap, nodeCount: 142, departmentCount: 3, spaceCount: 10, folderCount: 24, activeUsers: 20, lastActivity: 'vor 1 Std' },
      { id: 'satisfaction', label: t.metrics.satisfaction, value: 78, change: -3, status: 'warning' as const, category: 'people' as const, icon: Activity, nodeCount: 198, departmentCount: 5, spaceCount: 15, folderCount: 35, activeUsers: 32, lastActivity: 'vor 5 Std' },
      { id: 'workload', label: t.metrics.workload, value: 68, change: -15, status: 'critical' as const, category: 'resources' as const, icon: BarChart3, nodeCount: 89, departmentCount: 2, spaceCount: 6, folderCount: 14, activeUsers: 12, lastActivity: 'vor 8 Std' },
    ];

    return baseMetrics.map(m => ({ ...m, trend: generateTrendForMetric(m.id) }));
  }, [t, generateTrendForMetric]);

  // --- UNIVERSE POSITIONS ---
  const nodePositions = useMemo(() => {
    return metrics.map((_, i) => {
      const angle = (i / metrics.length) * Math.PI * 2 - Math.PI / 2;
      const radius = isMobile ? 28 : 35;
      return {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      };
    });
  }, [metrics.length, isMobile]);

  // Trend Chart Component - unique IDs
  const TrendChart = useCallback(({ data, color }: { data: number[], color: string }) => {
    chartIdRef.current += 1;
    const chartId = `chart-${chartIdRef.current}-${Date.now()}`;

    const max = Math.max(...data, 100);
    const min = Math.min(...data, 0);
    const range = max - min || 1;
    const width = 200;
    const height = 60;
    const stepX = width / Math.max(1, data.length - 1);

    const points = data.map((value, i) => {
      const x = i * stepX;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${chartId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polyline
          fill={`url(#gradient-${chartId})`}
          stroke="none"
          points={`0,${height} ${points} ${width},${height}`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((value, i) => (
          <circle
            key={i}
            cx={i * stepX}
            cy={height - ((value - min) / range) * height}
            r="2.5"
            fill={color}
            opacity="0.8"
          />
        ))}
      </svg>
    );
  }, []);

  // Handle view mode change - close sidebar when switching views
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    if (selectedMetric && mode !== 'universe') {
      setSelectedMetric(null);
    }
    // Track dashboard view change
    if (typeof window !== 'undefined' && (window as any)._paq) {
      const { MatomoEvents } = require('@/lib/matomo');
      MatomoEvents.dashboardView(mode);
    }
  }, [selectedMetric]);

  if (!mounted) return null;

  return (
    <div className={`relative w-full ${isMobile ? 'h-[600px]' : 'h-[800px]'} bg-[#051208] group/os overflow-hidden font-sans select-none border border-white/20 rounded-[3rem] shadow-[0_0_100px_rgba(16,185,129,0.2)]`}>

      {/* Loading indicator */}
      {isLoadingData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 right-6 z-50 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] text-emerald-300 uppercase tracking-widest font-bold"
        >
          Syncing...
        </motion.div>
      )}

      {/* Keyboard Shortcuts Hint */}
      {!isMobile && !selectedMetric && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-20 left-6 z-40 px-3 py-2 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md text-[9px] text-white/50 uppercase tracking-wider font-bold space-y-0.5"
        >
          <div>1-3: Views</div>
          <div>ESC: Close</div>
        </motion.div>
      )}

      {/* 1. Scoped Universe Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.25)_0%,rgba(5,18,8,1)_90%)]" />

        <motion.div
          className="absolute top-[5%] left-[5%] w-[80%] h-[80%] bg-emerald-400/25 blur-[160px] rounded-full"
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] right-[5%] w-[80%] h-[80%] bg-cyan-400/20 blur-[160px] rounded-full"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1.15, 1, 1.15]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-emerald-400/15 to-transparent" />
        <div className="absolute inset-0 bg-noise opacity-[0.25] mix-blend-overlay" />

        {/* Stable Stars */}
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              boxShadow: '0 0 6px rgba(255,255,255,1)'
            }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.8, 1] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          />
        ))}

        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* 2. Top Bar */}
      <div className="absolute top-0 inset-x-0 h-16 z-30 flex items-center justify-between px-8 border-b border-white/30 backdrop-blur-2xl bg-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-xl bg-emerald-400/40 border border-white/40 flex items-center justify-center shadow-[0_0_25px_rgba(52,211,153,0.5)]"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-sm font-black tracking-[0.4em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] uppercase">{t.systemName}</span>
          </div>

          {!isMobile && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/30 border border-white/40 shadow-lg">
                <div className={`w-2.5 h-2.5 rounded-full bg-emerald-300 ${isLoadingData ? 'animate-pulse' : ''} shadow-[0_0_12px_rgba(110,231,183,1)]`} />
                <span className="text-[11px] font-mono font-black text-white uppercase tracking-widest">{t.status}</span>
              </div>
              <div className="h-5 w-px bg-white/30" />
              <div className="flex items-center gap-2 text-white text-[11px] font-black tracking-widest uppercase">
                <Users className="w-4 h-4 text-emerald-300" />
                <span>{liveData?.memory?.facts || 24} ONLINE</span>
              </div>
              <div className="h-5 w-px bg-white/30" />
              <div className="text-white font-mono font-black text-[12px] tracking-[0.2em] bg-black/40 px-4 py-2 rounded-xl border border-white/20">
                {currentTime}
              </div>
            </div>
          )}
          {isMobile && (
            <div className="text-white font-mono font-black text-[10px] tracking-[0.1em] bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
              {currentTime}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isMobile && (
            <div className="relative group/search">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white group-focus-within/search:text-emerald-300 transition-colors" />
              <input
                type="text"
                placeholder={t.search}
                className="bg-black/50 border border-white/30 rounded-full pl-10 pr-4 py-2.5 text-[11px] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 w-48 focus:w-80 transition-all backdrop-blur-md shadow-2xl font-bold"
              />
            </div>
          )}
          <button className="p-2.5 rounded-xl hover:bg-white/30 text-white hover:text-white transition-all relative group/btn bg-white/10 border border-white/20 shadow-lg">
            <Bell className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} group-hover/btn:scale-110 transition-transform`} />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-black shadow-[0_0_10px_rgba(52,211,153,1)]" />
          </button>
          <motion.div
            className={`${isMobile ? 'w-9 h-9 text-[10px]' : 'w-11 h-11 text-[12px]'} rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 border border-white/40 flex items-center justify-center font-black text-white shadow-2xl cursor-pointer backdrop-blur-md`}
            whileHover={{ scale: 1.1, border: '2px solid rgba(255,255,255,0.8)', boxShadow: '0 0 35px rgba(52,211,153,0.5)' }}
          >
            SF
          </motion.div>
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className={`absolute ${isMobile ? 'top-16 bottom-20' : 'top-16 bottom-24'} inset-x-0 z-10 overflow-hidden`}>
        <AnimatePresence mode="wait">

          {/* VIEW: UNIVERSE */}
          {viewMode === 'universe' && (
            <motion.div
              key="universe"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0"
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(16,185,129,0)" />
                    <stop offset="50%" stopColor="rgba(16,185,129,0.4)" />
                    <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                  </linearGradient>
                  <filter id="glowLine">
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {nodePositions.map((pos, i) => {
                  const next = nodePositions[(i + 1) % nodePositions.length];
                  const midX = (pos.x + next.x) / 2;
                  const midY = (pos.y + next.y) / 2;
                  const curveOffset = i % 2 === 0 ? 5 : -5;
                  const path = `M ${pos.x} ${pos.y} Q ${midX + curveOffset} ${midY - curveOffset} ${next.x} ${next.y}`;

                  return (
                    <g key={i}>
                      <motion.path
                        d={path}
                        stroke="url(#netGrad)"
                        strokeWidth="0.3"
                        fill="none"
                        filter="url(#glowLine)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, delay: i * 0.15, ease: "easeInOut" }}
                      />
                      <motion.circle
                        r="0.4"
                        fill="#34D399"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                        style={{ offsetPath: `path('${path}')` }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Metric Orbs */}
              {metrics.map((m, i) => {
                const pos = nodePositions[i];
                const isSelected = selectedMetric === m.id;
                const isHovered = hoveredNode === m.id;
                const statusColor = m.status === 'good' ? '#10B981' : m.status === 'warning' ? '#F59E0B' : '#EF4444';
                const statusGlow = m.status === 'good' ? 'rgba(52,211,153,0.8)' : m.status === 'warning' ? 'rgba(251,191,36,0.8)' : 'rgba(248,113,113,0.8)';

                return (
                  <motion.div
                    key={m.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      zIndex: isSelected ? 50 : 10
                    }}
                    initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                    animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                    onMouseEnter={() => setHoveredMetric(m.id)}
                    onMouseLeave={() => setHoveredMetric(null)}
                    onClick={() => {
                      setSelectedMetric(isSelected ? null : m.id);
                      if (!isSelected && typeof window !== 'undefined' && (window as any)._paq) {
                        const { MatomoEvents } = require('@/lib/matomo');
                        MatomoEvents.dashboardMetricClick(m.id);
                      }
                    }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className={`absolute ${isMobile ? 'inset-[-20px] blur-[30px]' : 'inset-[-40px] blur-[50px]'} rounded-full opacity-60`}
                      style={{ background: `radial-gradient(circle, ${statusColor} 0%, transparent 70%)` }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.4, 0.7, 0.4]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />

                    <motion.div
                      className={`relative ${isMobile ? 'w-12 h-12' : 'w-24 h-24'} rounded-full flex items-center justify-center backdrop-blur-3xl border-2 transition-all duration-500 group/node ${isSelected ? 'scale-125 border-white shadow-[0_0_60px_rgba(255,255,255,0.5)]' : 'border-white/40 hover:border-white/60'
                        }`}
                      style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(10,20,15,0.6) 100%)`,
                        boxShadow: `0 0 40px ${statusGlow}, inset 0 0 30px rgba(255,255,255,0.2)`
                      }}
                    >
                      <m.icon className={`${isMobile ? 'w-5 h-5' : 'w-10 h-10'} text-white group-hover/node:scale-110 transition-transform drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]`} />
                      <div className={`absolute -top-1 -right-1 ${isMobile ? 'px-1.5 py-0.5 text-[8px]' : 'px-3 py-1.5 text-xs'} rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center font-black text-emerald-700 shadow-[0_8px_20px_rgba(0,0,0,0.4)]`}>
                        {m.value}%
                      </div>
                    </motion.div>

                    <AnimatePresence>
                      {(isHovered || isSelected) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap px-4 py-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-xl z-50 text-center"
                        >
                          <p className="text-[11px] font-bold tracking-wider text-white mb-0.5 uppercase">{m.label}</p>
                          <p className="text-[9px] text-white/40 uppercase tracking-widest">{m.category} • {m.nodeCount} KNOTEN</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              {/* Center Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center group/core">
                <motion.div
                  className={`${isMobile ? 'w-28 h-28' : 'w-64 h-64'} rounded-full relative flex items-center justify-center`}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className={`absolute inset-0 rounded-full ${isMobile ? 'border-2' : 'border-4'} border-emerald-400/50 animate-[spin_12s_linear_infinite]`} />
                  <div className={`absolute ${isMobile ? 'inset-3' : 'inset-10'} rounded-full border-2 border-white/40 animate-[spin_18s_linear_infinite_reverse]`} />
                  <div className={`absolute ${isMobile ? 'inset-[-20px] blur-[40px]' : 'inset-[-60px] blur-[80px]'} rounded-full bg-emerald-400/30 opacity-80 animate-pulse`} />

                  <div
                    className={`${isMobile ? 'w-16 h-16' : 'w-36 h-36'} rounded-full bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-600 flex items-center justify-center cursor-pointer shadow-[0_0_80px_rgba(52,211,153,1)] transition-all active:scale-95 group-hover/core:scale-110 group-hover/core:shadow-[0_0_120px_rgba(52,211,153,1)] ${isMobile ? 'border-2' : 'border-4'} border-white shadow-2xl`}
                    onClick={() => handleViewModeChange('chat')}
                  >
                    <Sparkles className={`${isMobile ? 'w-8 h-8' : 'w-20 h-20'} text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]`} />
                  </div>
                </motion.div>
                <div className={`${isMobile ? 'mt-4' : 'mt-14'} opacity-100 transition-all duration-500`}>
                  <p className={`${isMobile ? 'text-[8px]' : 'text-sm'} font-black tracking-[0.5em] text-white uppercase drop-shadow-[0_0_20px_rgba(52,211,153,1)]`}>MÔRA CORE</p>
                  <p className={`${isMobile ? 'text-[7px] px-3 py-1' : 'text-[11px] px-6 py-2'} text-white font-black uppercase mt-2 tracking-widest bg-emerald-500/40 rounded-full border border-white/50 inline-block backdrop-blur-md shadow-xl`}>ACTIVE</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW: FOLDERS */}
          {viewMode === 'folders' && (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`w-full h-full ${isMobile ? 'p-4' : 'p-12'} overflow-y-auto custom-scrollbar`}
            >
              <div className={`max-w-6xl mx-auto grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`${isMobile ? 'p-6' : 'p-8'} rounded-[2.5rem] bg-white/[0.08] border-2 border-white/20 hover:bg-white/[0.12] hover:border-emerald-400/40 transition-all group/card cursor-pointer backdrop-blur-3xl shadow-2xl relative overflow-hidden`}
                    onClick={() => { setSelectedMetric(m.id); handleViewModeChange('universe'); }}
                  >
                    <div className="absolute inset-0 bg-noise opacity-20" />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-white/20 flex items-center justify-center group-hover/card:scale-110 transition-transform shadow-inner">
                          <m.icon className="w-7 h-7 text-emerald-300" />
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black font-mono text-white mb-1 drop-shadow-md">{m.value}%</div>
                          <div className={`text-xs font-black flex items-center justify-end gap-1 px-2 py-1 rounded-lg bg-black/20 ${m.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {m.change > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            {m.change}%
                          </div>
                        </div>
                      </div>
                      <h3 className="text-lg font-black text-white mb-6 tracking-widest uppercase drop-shadow-sm">{m.label}</h3>
                      <div className="grid grid-cols-2 gap-6 p-4 rounded-2xl bg-black/20 border border-white/10">
                        <div className="space-y-1">
                          <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">Knoten</p>
                          <p className="text-sm text-white font-mono font-bold">{m.nodeCount}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">Aktivität</p>
                          <p className="text-sm text-white font-mono font-bold whitespace-nowrap">{m.lastActivity}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW: CHAT */}
          {viewMode === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`w-full h-full flex items-center justify-center ${isMobile ? 'p-4' : 'p-8'}`}
            >
              <div className={`w-full max-w-4xl h-full flex flex-col bg-white/[0.1] border-2 border-white/20 ${isMobile ? 'rounded-[2rem]' : 'rounded-[3rem]'} backdrop-blur-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden relative`}>
                <div className={`${isMobile ? 'p-4' : 'p-8'} border-b border-white/20 flex items-center justify-between bg-white/5`}>
                  <div className="flex items-center gap-4">
                    <div className={`${isMobile ? 'w-10 h-10' : 'w-16 h-16'} rounded-2xl bg-emerald-500/20 border border-white/30 flex items-center justify-center shadow-inner`}>
                      <Sparkles className={`${isMobile ? 'w-5 h-5' : 'w-8 h-8'} text-emerald-300`} />
                    </div>
                    <div>
                      <h3 className={`${isMobile ? 'text-sm' : 'text-xl'} font-black tracking-widest text-white uppercase`}>{t.chatTitle}</h3>
                      {!isMobile && <p className="text-[11px] text-white/50 uppercase tracking-[0.3em] font-bold">Semantisches Gedächtnis v4.2</p>}
                    </div>
                  </div>
                  <button onClick={() => handleViewModeChange('universe')} className="p-2 rounded-xl hover:bg-white/10 text-white/40 hover:text-white transition-all">
                    <X className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                  </button>
                </div>

                <div
                  ref={chatScrollContainerRef}
                  className={`flex-1 overflow-y-auto ${isMobile ? 'p-6' : 'p-10'} space-y-8 custom-scrollbar`}
                >
                  {chatHistory.length === 0 && !isThinking && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                        <div className="relative w-24 h-24 rounded-3xl bg-emerald-500/10 flex items-center justify-center border-2 border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500">
                          <MessageSquare className="w-10 h-10 text-emerald-400 opacity-60" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-black uppercase tracking-[0.4em] text-white/60`}>System bereit</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium">Stelle eine Frage zur semantischen Schicht</p>
                      </div>
                    </div>
                  )}

                  {chatHistory.map((chat, idx) => (
                    <div key={idx} className="space-y-6">
                      <div className="flex justify-end">
                        <div className="max-w-[80%] p-4 rounded-2xl bg-white/5 border border-white/10 text-white/80 text-sm">
                          {chat.q}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="max-w-[85%] p-5 rounded-2xl bg-white/[0.05] border border-white/10 text-white text-base leading-relaxed">
                          {chat.a}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isThinking && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white animate-spin-slow" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                        <div className="flex gap-1.5 p-1">
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                </div>

                <div className={`${isMobile ? 'p-6' : 'p-8'} bg-white/[0.02] border-t border-white/10 backdrop-blur-xl`}>
                  <div className="relative max-w-4xl mx-auto">
                    <input
                      type="text"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                      }}
                      placeholder={isMobile ? "Frage MÔRA..." : "Frage nach strategischen Zusammenhängen..."}
                      disabled={isThinking}
                      className={`w-full bg-black/40 border-2 border-white/10 rounded-2xl ${isMobile ? 'pl-6 pr-14 py-4 text-sm' : 'pl-8 pr-20 py-5 text-base'} text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all disabled:opacity-50`}
                    />
                    <button
                      onClick={handleSendMessage}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all hover:bg-emerald-400 disabled:opacity-50`}
                      disabled={isThinking}
                    >
                      <Send className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Bottom Dock */}
      <div className={`absolute ${isMobile ? 'bottom-4' : 'bottom-10'} inset-x-0 z-30 flex justify-center`}>
        <div className={`flex items-center ${isMobile ? 'gap-1 p-1.5' : 'gap-3 p-3'} px-6 rounded-[3rem] bg-white/20 border-2 border-white/40 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]`}>
          {[
            { id: 'universe', icon: Compass, label: t.universe, key: '1' },
            { id: 'folders', icon: LayoutGrid, label: t.folders, key: '2' },
            { id: 'chat', icon: MessageSquare, label: t.chat, key: '3' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleViewModeChange(item.id as ViewMode)}
              className={`flex items-center ${isMobile ? 'gap-2 px-4 py-3' : 'gap-4 px-8 py-4'} rounded-[2rem] transition-all group relative overflow-hidden ${viewMode === item.id ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              title={`${item.label} (${item.key})`}
            >
              {viewMode === item.id && (
                <motion.div
                  layoutId="activeDock"
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_0_30px_rgba(52,211,153,0.6)] border border-white/40"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} relative z-10`} />
              <AnimatePresence>
                {viewMode === item.id && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-black uppercase tracking-[0.25em] overflow-hidden whitespace-nowrap relative z-10`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
          <div className={`w-px ${isMobile ? 'h-6 mx-1' : 'h-10 mx-3'} bg-white/30`} />
          <button className={`${isMobile ? 'p-3' : 'p-4'} rounded-full text-white/60 hover:bg-white/20 hover:text-white transition-all`}>
            <Settings className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
          </button>
          <button className={`${isMobile ? 'p-3' : 'p-4'} rounded-full text-white/60 hover:bg-white/20 hover:text-white transition-all`}>
            <User className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
          </button>
        </div>
      </div>

      {/* 5. Detail Sidebar with Trend Chart */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div
            initial={{
              x: isMobile ? 0 : 400,
              y: isMobile ? 100 : 0,
              opacity: 0
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1
            }}
            exit={{
              x: isMobile ? 0 : 400,
              y: isMobile ? 100 : 0,
              opacity: 0
            }}
            className={`absolute ${isMobile ? 'inset-4 z-[100]' : 'top-20 right-8 bottom-24 w-96 z-40'} p-8 rounded-[2.5rem] bg-black/90 border-2 border-white/20 backdrop-blur-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.8)] overflow-y-auto custom-scrollbar`}
          >
            {(() => {
              const m = metrics.find(x => x.id === selectedMetric);
              if (!m) return null;
              const chartColor = m.status === 'good' ? '#10B981' : m.status === 'warning' ? '#F59E0B' : '#EF4444';
              return (
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                      <m.icon className="w-7 h-7 text-white/80" />
                    </div>
                    <button
                      onClick={() => setSelectedMetric(null)}
                      className="p-2 rounded-xl hover:bg-white/5 text-white/20 hover:text-white transition-colors"
                      title="Schließen (ESC)"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-3xl font-light italic mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{m.label}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-mono font-bold text-white">{m.value}%</span>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${m.status === 'good' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        m.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                          'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                        {m.status}
                      </div>
                    </div>
                  </div>

                  {/* Trend Chart */}
                  {m.trend && m.trend.length > 0 && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em] mb-3">Trend (12h)</p>
                      <TrendChart data={m.trend} color={chartColor} />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                      <Building2 className="w-5 h-5 text-emerald-400 mb-2 opacity-60" />
                      <div className="text-2xl font-mono text-white mb-1">{m.departmentCount}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">Abteilungen</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                      <Activity className="w-5 h-5 text-emerald-400 mb-2 opacity-60" />
                      <div className="text-2xl font-mono text-white mb-1">{m.spaceCount}</div>
                      <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">Bereiche</div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">KI ANALYSE</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed italic font-medium bg-black/20 p-4 rounded-xl border border-white/5">
                      {m.status === 'good'
                        ? `"${m.label} zeigt eine stabile Resonanz. Strategische Kopplung mit ${m.category} ist optimal. Fokus auf Erhaltung empfohlen."`
                        : `"Warnung: Semantische Reibung im Bereich ${m.label}. Korrelation sinkt. Tiefenanalyse wird dringend empfohlen."`
                      }
                    </p>
                    <button
                      type="button"
                      disabled
                      title="Demnächst"
                      className="w-full py-3 rounded-xl bg-emerald-500/50 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <span>Tiefenanalyse</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}
