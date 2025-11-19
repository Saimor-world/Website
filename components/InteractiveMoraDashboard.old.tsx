// DEPRECATED: This component was replaced by MoraDashboard.tsx (unified MÃ´ra demo section).
// Do not add new code here; kept only for reference until archival.
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useId, useCallback, useRef } from 'react';
import {
  TrendingUp, TrendingDown, Users, Clock, Sparkles,
  Activity, AlertCircle, CheckCircle, LayoutGrid, Folder, Info
} from 'lucide-react';

type Locale = 'de' | 'en';

interface DashboardProps {
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

export default function InteractiveMoraDashboard({ locale }: DashboardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('field');
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [moraInsight, setMoraInsight] = useState(false);
  const [connections, setConnections] = useState<Array<[string, string]>>([]);
  const [isDemoTooltipVisible, setDemoTooltipVisible] = useState(false);
  const demoTooltipId = useId();
  const visitedCardsRef = useRef<Set<string>>(new Set());
  const viewSwitchCountRef = useRef(0);

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
      title: 'MÃ´ra Dashboard',
      subtitle: 'Dual Mode: Ordner â†” Feld Ansicht',
      demoLabel: 'Demo-Dashboard (simulierte Daten)',
      demoTooltip: 'Alle Werte basieren aktuell auf lokal generierten Demo-Daten. Keine echten Kundendaten.',
      folderView: 'Ordner-Ansicht',
      fieldView: 'Feld-Ansicht',
      moraInsight: 'ðŸ’¡ MÃ´ra Insight',
      insightText: 'Team-Engagement ist stark mit Prozess-Effizienz verbunden. Die Resonanz zeigt: Klare AblÃ¤ufe â†’ hÃ¶here Zufriedenheit.',
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
      }
    },
    en: {
      title: 'MÃ´ra Dashboard',
      subtitle: 'Dual Mode: Folder â†” Field View',
      demoLabel: 'Demo Dashboard (simulated data)',
      demoTooltip: 'All values are currently based on locally generated demo data. No real customer data.',
      folderView: 'Folder View',
      fieldView: 'Field View',
      moraInsight: 'ðŸ’¡ MÃ´ra Insight',
      insightText: 'Team engagement is strongly linked to process efficiency. The resonance shows: Clear workflows â†’ higher satisfaction.',
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
      }
    }
  }[locale];

  // Semantic business data points
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

  // Generate mycelium connections based on correlations
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

  // Auto-show MÃ´ra insight after 2s
  useEffect(() => {
    const timer = setTimeout(() => setMoraInsight(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: DataPoint['status']) => {
    switch (status) {
      case 'good': return '#4A6741';
      case 'warning': return '#D4A857';
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
      case 'resources': return '#D4A857';
      default: return '#669966';
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #f8faf9 0%, #faf8f6 50%, #f7f5f3 100%)'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4A857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">{content.subtitle}</p>

          {/* Demo Label + Tooltip */}
          <div className="flex items-center justify-center gap-2 mb-6">
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
                className="relative flex items-center justify-center w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4A857]/50"
                onMouseEnter={() => setDemoTooltipVisible(true)}
                onMouseLeave={() => setDemoTooltipVisible(false)}
                onFocus={() => setDemoTooltipVisible(true)}
                onBlur={() => setDemoTooltipVisible(false)}
                aria-describedby={demoTooltipId}
              >
                <Info className="w-4 h-4 text-[#D4A857]" />
                {/* Tooltip */}
                <div
                  id={demoTooltipId}
                  role="tooltip"
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 rounded-lg transition duration-300 whitespace-nowrap ${
                    isDemoTooltipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.98) 0%, rgba(93, 124, 84, 0.95) 100%)',
                    border: '1px solid rgba(212, 180, 131, 0.4)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <p className="text-sm text-white">{content.demoTooltip}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="w-2 h-2 rotate-45 bg-[#4A6741] border-r border-b border-[rgba(212,168,87,0.4)]" />
                  </div>
                </div>
              </button>
            </div>
          </div>

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
        </motion.div>

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
                      onFocus={() => {
                        setHoveredPoint(point.id);
                        sendDashboardHoverEvent(true);
                        emitCardVisited(point.id);
                      }}
                      onBlur={() => {
                        setHoveredPoint(null);
                        sendDashboardHoverEvent(false);
                      }}
                      className="relative rounded-2xl p-5 sm:p-6 min-h-[240px] cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A857]"
                      style={{
                        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, ${getCategoryColor(point.category)}15 100%)`,
                        border: `2px solid ${hoveredPoint === point.id ? getCategoryColor(point.category) : 'rgba(212, 180, 131, 0.2)'}`,
                        boxShadow: hoveredPoint === point.id
                          ? `0 10px 40px ${getCategoryColor(point.category)}30`
                          : '0 4px 12px rgba(0, 0, 0, 0.08)'
                      }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      tabIndex={0}
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
                      <h3 className="text-lg font-bold text-slate-800 mb-2">
                        {point.label}
                      </h3>

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
                        <span className="text-xs text-gray-500">letzte Woche</span>
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
                {/* SVG for connections (Mycelium lines) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(74, 103, 65, 0.6)" />
                      <stop offset="50%" stopColor="rgba(212, 180, 131, 0.8)" />
                      <stop offset="100%" stopColor="rgba(74, 103, 65, 0.6)" />
                    </linearGradient>

                    {/* Shimmer animation */}
                    <filter id="shimmer">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                      <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0
                                0 1 0 0 0
                                0 0 1 0 0
                                0 0 0 18 -7"
                      />
                    </filter>
                  </defs>

                  {connections.map(([from, to], i) => {
                    const fromPoint = dataPoints.find(p => p.id === from);
                    const toPoint = dataPoints.find(p => p.id === to);
                    if (!fromPoint || !toPoint) return null;

                    const isActive = hoveredPoint === from || hoveredPoint === to;

                    return (
                      <motion.g key={`${from}-${to}`}>
                        {/* Connection line */}
                        <motion.line
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
                          style={{ filter: isActive ? 'url(#shimmer)' : 'none' }}
                        />

                        {/* Animated particles along line */}
                        {isActive && (
                          <motion.circle
                            r="4"
                            fill="#D4A857"
                            initial={{
                              cx: `${fromPoint.x}%`,
                              cy: `${fromPoint.y}%`
                            }}
                            animate={{
                              cx: [`${fromPoint.x}%`, `${toPoint.x}%`],
                              cy: [`${fromPoint.y}%`, `${toPoint.y}%`]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        )}
                      </motion.g>
                    );
                  })}
                </svg>

                {/* Data points */}
                {dataPoints.map((point, i) => {
                  const StatusIcon = getStatusIcon(point.status);
                  return (
                    <motion.div
                      key={point.id}
                      className="absolute cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A857]"
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
                      onFocus={() => {
                        setHoveredPoint(point.id);
                        sendDashboardHoverEvent(true);
                        emitCardVisited(point.id);
                      }}
                      onBlur={() => {
                        setHoveredPoint(null);
                        sendDashboardHoverEvent(false);
                      }}
                      whileHover={{ scale: 1.2 }}
                      tabIndex={0}
                    >
                      {/* Glow effect */}
                      {hoveredPoint === point.id && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${getCategoryColor(point.category)}40 0%, transparent 70%)`,
                            filter: 'blur(20px)',
                            width: 120,
                            height: 120,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: -1
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.6, 0.9, 0.6]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

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
                                {content.categories[point.category as keyof typeof content.categories]} Â· {content.status[point.status]}
                              </div>
                              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{ background: getCategoryColor(point.category) }} />
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

        {/* MÃ´ra Insight Panel */}
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
              {/* Sparkles */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-[#D4A857]" />
              </motion.div>

              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {content.moraInsight}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {content.insightText}
                  </p>
                </div>

                <button
                  onClick={() => setMoraInsight(false)}
                  className="text-white/60 hover:text-white transition"
                >
                  âœ•
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
