'use client';
/**
 * MoraDashboard - Premium Glassmorphism Edition
 * 
 * Inspired by mora-ui ClientHealthDashboard with:
 * - Premium glassmorphic cards with blur effects
 * - Animated health bars with smooth transitions
 * - Pulse animations for warning/inactive states
 * - Hover quick actions
 * - Summary stats header
 * - Demo data (no real backend calls)
 * 
 * Adapted for website: Saimôr colors, demo mode, integrated chat
 */

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useId, useCallback, useRef, CSSProperties } from 'react';
import {
  Sparkles, TrendingUp, TrendingDown, Users, Target, BarChart3,
  MessageSquare, Send, Loader2, CheckCircle2, ChevronRight,
  Activity, AlertCircle, CheckCircle, LayoutGrid, Folder, Info,
  Building2, FolderOpen, Zap, Clock, RefreshCw, FileText, Eye, ArrowUpDown, X
} from 'lucide-react';

type Locale = 'de' | 'en';

interface MoraDashboardProps {
  locale: Locale;
}

type ViewMode = 'folder' | 'field';

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
}

// Premium Glassmorphism Styles (Universe OS Edition)
const glassPanelStyle: CSSProperties = {
  background: 'rgba(10, 20, 15, 0.75)', // Slightly greenish tint (Universe OS)
  backdropFilter: 'blur(40px)',
  WebkitBackdropFilter: 'blur(40px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  borderRadius: '24px' // Premium radius
};

const glassCardStyle: CSSProperties = {
  background: 'rgba(10, 20, 15, 0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.05)',
  borderRadius: '16px'
};

export default function MoraDashboard({ locale }: MoraDashboardProps) {
  // Hydration fix: only run client-side effects after mount
  const [mounted, setMounted] = useState(false);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Throttle mouse movement for better performance
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
        rafId = 0;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Use safe mouse position (0 during SSR, actual value after mount)
  const safeMousePosition = mounted ? mousePosition : { x: 0, y: 0 };

  // Chat States
  const [userQuestion, setUserQuestion] = useState('');
  const [moraResponse, setMoraResponse] = useState('');
  const [typedResponse, setTypedResponse] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dashboard States
  const [viewMode, setViewMode] = useState<ViewMode>('folder');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'health' | 'name' | 'activity'>('health');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [moraInsight, setMoraInsight] = useState(false);
  const [isDemoTooltipVisible, setDemoTooltipVisible] = useState(false);
  const [expandedMetrics, setExpandedMetrics] = useState<Set<string>>(new Set());

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
      chatIntro: 'Frag mich zu deinem Business – ich erinnere mich an Muster und gebe klare Antworten.',
      inputPlaceholder: 'Frag Môra nach Zusammenhängen...',
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

      // Stats
      avgHealth: 'Ø Gesundheit',
      healthy: 'Gesund',
      warning: 'Beobachten',
      inactive: 'Inaktiv',
      totalNodes: 'Knoten',
      sortBy: 'Sortieren',
      lastUpdate: 'Aktualisiert',
      refresh: 'Aktualisieren',
      expandDetails: 'Details anzeigen',
      collapseDetails: 'Details verbergen',

      // Metrics
      depts: 'ABTEILUNGEN',
      spaces: 'BEREICHE',
      folders: 'ORDNER',
      nodes: 'KNOTEN',
      activeUsers: 'aktiv',
      healthScore: 'Gesundheits-Score',

      // CTA
      cta: 'Demo ansehen',
      ctaSecondary: 'Mehr über Môra erfahren',

      // Contextual
      suggestedQuestions: {
        'team-engagement': 'Wie kann ich das Team-Engagement weiter fördern?',
        'process-efficiency': 'Wo liegen die Engpässe in unseren Prozessen?',
        'satisfaction': 'Was sind die Hauptgründe für die aktuelle Zufriedenheitsrate?',
        'workload': 'Wie können wir die Arbeitsbelastung besser balancieren?',
        'velocity': 'Was bremst unsere Umsetzungsgeschwindigkeit?',
        'clarity': 'Welche Bereiche benötigen mehr Klarheit?'
      }
    },
    en: {
      title: 'Môra – Resonance Dashboard (Demo)',
      subtitle: 'Chat + Dashboard, one data stream',
      demoLabel: 'Demo Dashboard (simulated data)',
      demoTooltip: 'All values are currently based on locally generated demo data. No real customer data. This dashboard shows the potential of Môra.',

      // Chat Section
      chatTitle: 'Ask Môra a Question',
      chatIntro: 'Ask me about your business – I remember patterns and give clear answers.',
      inputPlaceholder: 'Ask Môra about connections...',
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

      // Stats
      avgHealth: 'Avg Health',
      healthy: 'Healthy',
      warning: 'Warning',
      inactive: 'Inactive',
      totalNodes: 'Nodes',
      sortBy: 'Sort by',
      lastUpdate: 'Updated',
      refresh: 'Refresh',
      expandDetails: 'Show details',
      collapseDetails: 'Hide details',

      // Metrics
      depts: 'DEPTS',
      spaces: 'SPACES',
      folders: 'FOLDERS',
      nodes: 'NODES',
      activeUsers: 'active',
      healthScore: 'Health Score',

      // CTA
      cta: 'See the demo',
      ctaSecondary: 'Learn more about Môra',

      // Contextual
      suggestedQuestions: {
        'team-engagement': 'How can I further foster team engagement?',
        'process-efficiency': 'Where are the bottlenecks in our processes?',
        'satisfaction': 'What are the main reasons for the current satisfaction rate?',
        'workload': 'How can we better balance the workload?',
        'velocity': 'What is slowing down our velocity?',
        'clarity': 'Which areas need more clarity?'
      }
    }
  }[locale] as any;


  // Demo Dashboard Metrics (simulated data)
  const demoMetrics: DashboardMetric[] = [
    {
      id: 'team-engagement',
      label: locale === 'de' ? 'Team-Engagement' : 'Team Engagement',
      value: 87,
      change: 12,
      status: 'good',
      category: 'people',
      departmentCount: 4,
      spaceCount: 12,
      folderCount: 28,
      nodeCount: 156,
      activeUsers: 24,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'process-efficiency',
      label: locale === 'de' ? 'Prozess-Effizienz' : 'Process Efficiency',
      value: 92,
      change: 8,
      status: 'good',
      category: 'process',
      departmentCount: 3,
      spaceCount: 9,
      folderCount: 22,
      nodeCount: 134,
      activeUsers: 18,
      lastActivity: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
      id: 'satisfaction',
      label: locale === 'de' ? 'Zufriedenheit' : 'Satisfaction',
      value: 78,
      change: -3,
      status: 'warning',
      category: 'people',
      departmentCount: 5,
      spaceCount: 15,
      folderCount: 35,
      nodeCount: 198,
      activeUsers: 32,
      lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'workload',
      label: locale === 'de' ? 'Arbeitsbelastung' : 'Workload',
      value: 68,
      change: -15,
      status: 'critical',
      category: 'resources',
      departmentCount: 2,
      spaceCount: 6,
      folderCount: 14,
      nodeCount: 89,
      activeUsers: 12,
      lastActivity: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'velocity',
      label: locale === 'de' ? 'Umsetzungsgeschwindigkeit' : 'Velocity',
      value: 85,
      change: 5,
      status: 'good',
      category: 'process',
      departmentCount: 3,
      spaceCount: 10,
      folderCount: 24,
      nodeCount: 142,
      activeUsers: 20,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'clarity',
      label: locale === 'de' ? 'Klarheitsindex' : 'Clarity Index',
      value: 91,
      change: 18,
      status: 'good',
      category: 'people',
      departmentCount: 4,
      spaceCount: 11,
      folderCount: 26,
      nodeCount: 148,
      activeUsers: 22,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    }
  ];

  // Auto-show Môra insight after 3s
  useEffect(() => {
    const timer = setTimeout(() => setMoraInsight(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect for Môra response
  useEffect(() => {
    if (moraResponse && isTyping) {
      let i = 0;
      setTypedResponse('');
      const interval = setInterval(() => {
        setTypedResponse(prev => prev + moraResponse.charAt(i));
        i++;
        if (i >= moraResponse.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 20); // Fast but visible typing
      return () => clearInterval(interval);
    }
  }, [moraResponse, isTyping]);

  // Chat Handler with Gemini API integration
  const handleAskMora = async (question?: string) => {
    const q = question || userQuestion;
    if (!q.trim() || isAsking) return;

    setIsAsking(true);
    setMoraResponse('');
    setShowSuccess(false);
    const startTime = Date.now();

    try {
      // Try Gemini API first
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: q,
          locale: locale
        }),
      });

      const data = await response.json();

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(1);

      if (data.error) {
        // ... (demo responses)
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

        const qLower = q.toLowerCase();
        let fallbackResponse = demoResponses.default;

        if (qLower.includes('produktiv') || qLower.includes('team') || qLower.includes('productiv') || qLower.includes('engagement')) {
          fallbackResponse = demoResponses.team;
        } else if (qLower.includes('budget') || qLower.includes('kosten') || qLower.includes('cost') || qLower.includes('effizien')) {
          fallbackResponse = demoResponses.budget;
        } else if (qLower.includes('projekt') || qLower.includes('project') || qLower.includes('fortschritt') || qLower.includes('progress') || qLower.includes('velocity')) {
          fallbackResponse = demoResponses.project;
        }

        setMoraResponse(fallbackResponse);
      } else {
        setMoraResponse(data.reply || data.response || '');
      }

      setResponseTime(parseFloat(duration));
      setShowSuccess(true);
      setIsAsking(false);
      setIsTyping(true); // Trigger typing effect
      setUserQuestion('');

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      // Fallback to demo response on error
      const fallbackResponse = locale === 'de'
        ? 'Entschuldigung, ich bin gerade nicht erreichbar. Bitte versuche es später noch einmal.'
        : 'Sorry, I\'m not available right now. Please try again later.';

      const endTime = Date.now();
      const duration = ((endTime - startTime) / 1000).toFixed(1);

      setMoraResponse(fallbackResponse);
      setResponseTime(parseFloat(duration));
      setShowSuccess(true);
      setIsAsking(false);
      setIsTyping(true);
      setUserQuestion('');
    }
  };

  const openMoraChat = () => {
    const event = new CustomEvent('openMoraChat');
    window.dispatchEvent(event);
  };

  // Helper functions
  const getStatusColor = (status: DashboardMetric['status']) => {
    switch (status) {
      case 'good': return { text: 'text-[#4A6741]', bg: 'bg-[#4A6741]/20', border: 'border-[#4A6741]/30', glow: 'shadow-[#4A6741]/20' };
      case 'warning': return { text: 'text-[#D4A857]', bg: 'bg-[#D4A857]/20', border: 'border-[#D4A857]/30', glow: 'shadow-[#D4A857]/20' };
      case 'critical': return { text: 'text-[#E85D75]', bg: 'bg-[#E85D75]/20', border: 'border-[#E85D75]/30', glow: 'shadow-[#E85D75]/20' };
    }
  };

  const getStatusIcon = (status: DashboardMetric['status']) => {
    switch (status) {
      case 'good': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'critical': return AlertCircle;
    }
  };

  const getCategoryColor = (category: DashboardMetric['category']) => {
    switch (category) {
      case 'people': return '#4A6741';
      case 'process': return '#5D7C54';
      case 'resources': return '#D4A857';
      default: return '#669966';
    }
  };

  // Enhanced connections based on semantic relationships (not just categories)
  const getSemanticConnections = (): Array<[string, string, number]> => {
    const connections: Array<[string, string, number]> = [];

    // Strong connections (same category) - weight 1.0
    const categoryGroups: Record<string, string[]> = {};
    demoMetrics.forEach(m => {
      if (!categoryGroups[m.category]) categoryGroups[m.category] = [];
      categoryGroups[m.category].push(m.id);
    });

    Object.values(categoryGroups).forEach(group => {
      for (let i = 0; i < group.length - 1; i++) {
        connections.push([group[i], group[i + 1], 1.0]);
      }
    });

    // Semantic connections (meaningful relationships) - weight 0.6
    // Team-Engagement ↔ Satisfaction (people metrics influence each other)
    connections.push(['team-engagement', 'satisfaction', 0.6]);
    connections.push(['satisfaction', 'clarity', 0.6]);
    connections.push(['team-engagement', 'clarity', 0.6]);

    // Process efficiency ↔ Velocity (process metrics)
    connections.push(['process-efficiency', 'velocity', 0.6]);

    // Cross-category semantic links (workload affects satisfaction)
    connections.push(['workload', 'satisfaction', 0.4]);
    connections.push(['clarity', 'process-efficiency', 0.4]);
    connections.push(['team-engagement', 'velocity', 0.4]);

    return connections;
  };

  const formatTimeAgo = (dateString: string | null) => {
    if (!dateString) return locale === 'de' ? 'Nie' : 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (locale === 'de') {
      if (diffMins < 1) return 'Gerade eben';
      if (diffMins < 60) return `vor ${diffMins} Min`;
      if (diffHours < 24) return `vor ${diffHours} Std`;
      return `vor ${diffDays} Tagen`;
    } else {
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${diffDays}d ago`;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsRefreshing(false);
  };

  // Calculate positions for universe view (distributed in a network pattern)
  const getUniversePositions = (metrics: DashboardMetric[]) => {
    const positions: Record<string, { x: number; y: number }> = {};
    const centerX = 50;
    const centerY = 50;
    const radius = 35;

    metrics.forEach((metric, index) => {
      const angle = (index / metrics.length) * Math.PI * 2 - Math.PI / 2;
      const variation = (Math.sin(index * 1.3) * 0.3 + 1) * radius;
      positions[metric.id] = {
        x: centerX + Math.cos(angle) * variation,
        y: centerY + Math.sin(angle) * variation
      };
    });

    return positions;
  };

  // Legacy connections for compatibility (uses semantic connections)
  const getConnections = (): Array<[string, string]> => {
    return getSemanticConnections().map(([from, to]) => [from, to]);
  };

  // Sort metrics
  const sortedMetrics = [...demoMetrics].sort((a, b) => {
    switch (sortBy) {
      case 'health': return b.value - a.value;
      case 'name': return a.label.localeCompare(b.label);
      case 'activity': return new Date(b.lastActivity || 0).getTime() - new Date(a.lastActivity || 0).getTime();
      default: return 0;
    }
  });

  const healthyCount = demoMetrics.filter(m => m.status === 'good').length;
  const warningCount = demoMetrics.filter(m => m.status === 'warning').length;
  const criticalCount = demoMetrics.filter(m => m.status === 'critical').length;
  const totalNodes = demoMetrics.reduce((sum, m) => sum + (m.nodeCount || 0), 0);
  const avgHealth = demoMetrics.length > 0 ? demoMetrics.reduce((sum, m) => sum + m.value, 0) / demoMetrics.length : 0;

  // Universe view data (calculated after demoMetrics)
  const universePositions = getUniversePositions(demoMetrics);
  const connections = getConnections();

  return (
    <section id="mora-dashboard" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Universe OS Container - Compact Showcase */}
      <div className="relative rounded-[2.5rem] border border-white/10 overflow-hidden" 
        style={{ 
          background: 'linear-gradient(135deg, #030806 0%, #040a08 50%, #030806 100%)',
          minHeight: '800px'
        }}>

        {/* Noise Texture Overlay (Universe OS) */}
        <div className="absolute inset-0 bg-noise pointer-events-none opacity-30 mix-blend-overlay" />

        {/* Universe Background - Compact */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Space gradient */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(180deg, #030806 0%, #000000 100%)'
          }} />
          
          {/* Compact starfield */}
          {mounted && Array.from({ length: 25 }).map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 0.5;
            return (
              <div
                key={i}
                className="absolute rounded-full animate-pulse"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: size,
                  height: size,
                  backgroundColor: i % 3 === 0 ? '#10B981' : i % 3 === 1 ? '#ffffff' : '#06B6D4',
                  opacity: 0.6,
                  animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`
                }}
              />
            );
          })}

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Compact Môra Orb - Top Right Corner */}
        <motion.div
          className="absolute top-8 right-8 z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <motion.div
            className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #A855F7FF 0%, #A855F7CC 50%, #A855F788 100%)',
              boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.3)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.15 }}
            title="Universe OS Demo"
          >
            <Sparkles className="w-5 h-5 text-white drop-shadow-lg" />
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-purple-500 text-white">
              OS
            </div>
          </motion.div>
        </motion.div>

        {/* Premium Header with glassmorphism */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`backdrop-blur-xl bg-black/40 border border-white/10 ${isMobile ? 'rounded-xl px-4 py-3' : 'rounded-2xl px-8 py-4'} shadow-2xl`}>
              <div className={`flex items-center gap-3 ${isMobile ? 'mb-1' : 'mb-2'} justify-center`}>
                <Sparkles className="text-[#D4A857]" size={isMobile ? 20 : 28} />
                <h2
                  className={`${isMobile ? 'text-lg' : 'text-2xl sm:text-3xl'} font-light ${isMobile ? 'tracking-[0.1em]' : 'tracking-[0.2em]'} text-white/90`}
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {content.title.toUpperCase()}
                </h2>
                {!isMobile && (
                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-2 rounded-lg hover:bg-white/10 transition-all ml-2 disabled:opacity-50"
                  >
                    <RefreshCw size={18} className={`text-[#4A6741] transition-transform ${isRefreshing ? 'animate-spin' : 'hover:rotate-180'}`} />
                  </button>
                )}
              </div>
              {!isMobile && (
                <p className="text-xs text-white/40 tracking-widest uppercase">
                  {demoMetrics.length} {locale === 'de' ? 'Metriken' : 'Metrics'} • {content.lastUpdate} {new Date().toLocaleTimeString()}
                </p>
              )}
            </div>
          </motion.div>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-6">
            {content.subtitle}
          </p>
          <p className="text-sm text-white/50 max-w-2xl mx-auto italic leading-relaxed">
            {locale === 'de'
              ? 'Kein Spiegel. Ein Gedächtnis. Môra erinnert sich an Muster und Zusammenhänge.'
              : 'Not a mirror. A memory. Môra remembers patterns and connections.'}
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
                className="text-sm font-medium text-white/80"
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
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 rounded-lg transition duration-300 whitespace-nowrap max-w-xs ${isDemoTooltipVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                    }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.98) 0%, rgba(93, 124, 84, 0.95) 100%)',
                    border: '1px solid rgba(212, 180, 131, 0.4)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <p className="text-sm text-white whitespace-normal">{content.demoTooltip}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div className="w-2 h-2 rotate-45 bg-[#4A6741] border-r border-b border-[rgba(212,168,87,0.4)]" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Summary Stats Row - Enhanced with tooltips */}
        <div className={`flex flex-wrap items-center justify-center ${isMobile ? 'gap-2 mb-4' : 'gap-4 mb-8'}`} role="region" aria-label={locale === 'de' ? 'Dashboard Übersicht' : 'Dashboard Overview'}>
          {/* Overall Health - Enhanced */}
          <motion.div
            className={`group relative backdrop-blur-xl bg-black/40 border border-[#D4A857]/30 hover:border-[#D4A857]/50 ${isMobile ? 'rounded-lg px-3 py-2' : 'rounded-xl px-6 py-3'} flex items-center gap-3 cursor-help transition-all`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            title={`${content.avgHealth}: ${Math.round(avgHealth)}% - ${locale === 'de' ? 'Durchschnitt aller Metriken' : 'Average of all metrics'}`}
          >
            <BarChart3 size={isMobile ? 14 : 18} className="text-[#D4A857] group-hover:scale-110 transition-transform" aria-hidden="true" />
            <div>
              <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-light text-[#D4A857] font-mono`}>{Math.round(avgHealth)}%</div>
              {!isMobile && <div className="text-[10px] text-white/40 uppercase tracking-wider">{content.avgHealth}</div>}
            </div>
            {/* Trend indicator */}
            {!isMobile && (
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#4A6741] animate-pulse" 
                title={locale === 'de' ? 'Gesunde Gesamtlage' : 'Healthy overall status'}
                aria-label={locale === 'de' ? 'Gesunde Gesamtlage' : 'Healthy overall status'} />
            )}
          </motion.div>

          <motion.div
            className={`group backdrop-blur-xl bg-[#4A6741]/10 hover:bg-[#4A6741]/20 border border-[#4A6741]/30 hover:border-[#4A6741]/50 ${isMobile ? 'rounded-lg px-2 py-1.5' : 'rounded-xl px-4 py-3'} flex items-center gap-2 cursor-help transition-all`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            title={`${healthyCount} ${content.healthy} ${locale === 'de' ? 'Metriken' : 'metrics'}`}
          >
            <CheckCircle size={isMobile ? 12 : 14} className="text-[#4A6741] group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#4A6741] font-mono font-semibold`}>{healthyCount}</span>
            {!isMobile && <span className="text-[10px] text-[#4A6741]/60 ml-1">{content.healthy}</span>}
          </motion.div>
          <motion.div
            className={`group backdrop-blur-xl bg-[#D4A857]/10 hover:bg-[#D4A857]/20 border border-[#D4A857]/30 hover:border-[#D4A857]/50 ${isMobile ? 'rounded-lg px-2 py-1.5' : 'rounded-xl px-4 py-3'} flex items-center gap-2 cursor-help transition-all`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            title={`${warningCount} ${content.warning} ${locale === 'de' ? 'Metriken' : 'metrics'}`}
          >
            <AlertCircle size={isMobile ? 12 : 14} className="text-[#D4A857] group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#D4A857] font-mono font-semibold`}>{warningCount}</span>
            {!isMobile && <span className="text-[10px] text-[#D4A857]/60 ml-1">{content.warning}</span>}
          </motion.div>
          <motion.div
            className={`group backdrop-blur-xl bg-[#E85D75]/10 hover:bg-[#E85D75]/20 border border-[#E85D75]/30 hover:border-[#E85D75]/50 ${isMobile ? 'rounded-lg px-2 py-1.5' : 'rounded-xl px-4 py-3'} flex items-center gap-2 cursor-help transition-all ${criticalCount > 0 ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            title={`${criticalCount} ${locale === 'de' ? 'Kritische' : 'Critical'} ${locale === 'de' ? 'Metriken' : 'metrics'}`}
          >
            <AlertCircle size={isMobile ? 12 : 14} className="text-[#E85D75] group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-[#E85D75] font-mono font-semibold`}>{criticalCount}</span>
            {!isMobile && <span className="text-[10px] text-[#E85D75]/60 ml-1">{locale === 'de' ? 'Kritisch' : 'Critical'}</span>}
          </motion.div>

          {/* Total Nodes - Enhanced with tooltip */}
          {!isMobile && (
            <motion.div
              className="group backdrop-blur-xl bg-black/40 hover:bg-black/50 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 flex items-center gap-2 cursor-help transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              title={`${totalNodes} ${locale === 'de' ? 'Datenpunkte insgesamt' : 'total data points'}`}
            >
              <Zap size={14} className="text-[#4A6741] group-hover:text-[#5D7C54] group-hover:scale-110 transition-all" aria-hidden="true" />
              <span className="text-sm text-white/60 group-hover:text-white/80 font-mono transition-colors">{totalNodes}</span>
              <span className="text-xs text-white/40 uppercase">{content.totalNodes.toLowerCase()}</span>
            </motion.div>
          )}
        </div>

        {/* Sort Controls - Compact on mobile */}
        {!isMobile && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-1 backdrop-blur-sm bg-black/30 rounded-lg p-1">
              <ArrowUpDown size={12} className="text-white/40 ml-2" />
              {(['health', 'name', 'activity'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1 text-xs rounded-md transition-all ${sortBy === option
                    ? 'bg-[#4A6741]/20 text-[#4A6741] border border-[#4A6741]/30'
                    : 'text-white/40 hover:text-white/70'
                    }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHAT SECTION - Compact on mobile */}
        <motion.div
          className={`relative mb-8 ${isMobile ? 'rounded-2xl p-4' : 'mb-16 rounded-3xl p-8'} shadow-xl overflow-hidden`}
          style={glassPanelStyle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise pointer-events-none opacity-30 mix-blend-overlay" />
          
          <div className={`relative z-10 text-center ${isMobile ? 'mb-4' : 'mb-8'}`}>
            <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-2`} style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {content.chatTitle}
            </h3>
            <p className={`${isMobile ? 'text-sm' : ''} text-white/70`}>{content.chatIntro}</p>
          </div>

          <div className={`grid ${isMobile ? 'gap-4' : 'lg:grid-cols-2 gap-8'}`}>
            {/* Quick Questions - Compact on mobile */}
            <div className={isMobile ? 'space-y-2' : 'space-y-3'}>
              {content.quickQuestions.map((question: string, index: number) => (
                <motion.button
                  key={index}
                  onClick={() => handleAskMora(question)}
                  className={`w-full ${isMobile ? 'p-3 rounded-xl' : 'p-4 rounded-2xl'} text-left transition-all group disabled:opacity-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#D4A857]/50`}
                  style={glassCardStyle}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!isMobile ? { x: 4 } : {}}
                  disabled={isAsking}
                  aria-label={`${locale === 'de' ? 'Schnellfrage' : 'Quick question'}: ${question}`}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#4A6741] group-hover:text-[#D4A857] transition-colors flex-shrink-0`} aria-hidden="true" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white/90 group-hover:text-white`}>
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
                  onKeyDown={(e) => e.key === 'Enter' && !isAsking && userQuestion.trim() && handleAskMora()}
                  placeholder={content.inputPlaceholder}
                  disabled={isAsking}
                  className="w-full px-6 py-4 pr-14 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4A857]/30 disabled:opacity-50 bg-transparent"
                  style={glassCardStyle}
                  aria-label={content.inputPlaceholder}
                  role="searchbox"
                />
                <motion.button
                  onClick={() => handleAskMora()}
                  disabled={isAsking || !userQuestion.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-[#4A6741] to-[#D4A857] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#D4A857]/50 focus:ring-offset-2 focus:ring-offset-black/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={content.askButton}
                  type="button"
                >
                  {isAsking ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="w-5 h-5 text-white" aria-hidden="true" />
                  )}
                  <span className="sr-only">{isAsking ? (locale === 'de' ? 'Lädt...' : 'Loading...') : content.askButton}</span>
                </motion.button>
              </motion.div>

              {/* Contextual Suggestions */}
              <AnimatePresence>
                {selectedCard && content.suggestedQuestions[selectedCard] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2"
                  >
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2 pl-4">
                      {locale === 'de' ? 'Môra empfiehlt diese Analyse:' : 'Môra suggests this analysis:'}
                    </p>
                    <motion.button
                      onClick={() => handleAskMora(content.suggestedQuestions[selectedCard])}
                      className="w-full p-3 rounded-xl text-left border border-[#D4A857]/40 bg-[#D4A857]/5 hover:bg-[#D4A857]/10 transition-colors flex items-center gap-3 group"
                      whileHover={{ x: 4 }}
                      disabled={isAsking}
                    >
                      <Sparkles className="w-4 h-4 text-[#D4A857] group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-[#D4A857] font-medium italic">
                        &quot;{content.suggestedQuestions[selectedCard]}&quot;
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Môra Response */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                {moraResponse ? (
                  <motion.div
                    className="w-full p-6 rounded-2xl"
                    style={{
                      ...glassCardStyle,
                      background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.15) 0%, rgba(212, 180, 131, 0.1) 100%)'
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A857] to-[#4A6741] flex items-center justify-center flex-shrink-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-white">Môra</h4>
                          {showSuccess && (
                            <motion.div
                              className="flex items-center gap-1 text-xs text-[#4A6741]"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              {content.realResponse} · {responseTime}{content.seconds.slice(0, 1)}
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed">
                          {typedResponse}
                          {isTyping && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="inline-block w-1 h-4 bg-[#D4A857] ml-1 align-middle"
                            />
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Link to Full Chat */}
                    <motion.button
                      onClick={openMoraChat}
                      className="w-full mt-4 py-3 rounded-xl text-sm font-medium text-white transition-all flex items-center justify-center gap-2"
                      style={{
                        ...glassCardStyle,
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
                    className="text-center text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-[#D4A857]" />
                    <p className="text-sm">{content.chatIntro}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* DASHBOARD GRID - Premium Glassmorphism Cards */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {content.dashboardTitle}
            </h3>
            <p className="text-white/70 mb-6">{content.dashboardSubtitle}</p>

            {/* View Mode Toggle - Only on Desktop */}
            {!isMobile && (
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <motion.button
                  onClick={() => {
                    setViewMode('folder');
                    emitViewSwitch();
                  }}
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#D4A857]/50"
                  style={{
                    background: viewMode === 'folder'
                      ? 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)'
                      : 'rgba(74, 103, 65, 0.1)',
                    color: viewMode === 'folder' ? 'white' : '#4A6741',
                    border: viewMode === 'folder' ? 'none' : '2px solid rgba(74, 103, 65, 0.3)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="tab"
                  aria-selected={viewMode === 'folder'}
                  aria-label={content.folderView}
                >
                  <Folder className="w-5 h-5" aria-hidden="true" />
                  <span>{content.folderView}</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    setViewMode('field');
                    emitViewSwitch();
                  }}
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#D4A857]/50"
                  style={{
                    background: viewMode === 'field'
                      ? 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)'
                      : 'rgba(74, 103, 65, 0.1)',
                    color: viewMode === 'field' ? 'white' : '#4A6741',
                    border: viewMode === 'field' ? 'none' : '2px solid rgba(74, 103, 65, 0.3)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="tab"
                  aria-selected={viewMode === 'field'}
                  aria-label={content.fieldView}
                >
                  <LayoutGrid className="w-5 h-5" aria-hidden="true" />
                  <span>{content.fieldView}</span>
                </motion.button>
              </div>
            )}

            {/* Mobile Quick Info */}
            {isMobile && (
              <div className="text-center mb-4">
                <p className="text-sm text-white/60">
                  {locale === 'de' ? 'Tippe auf eine Metrik für Details' : 'Tap a metric for details'}
                </p>
              </div>
            )}
          </div>

          {/* MOBILE VIEW - Fast, scannable, compact */}
          {isMobile ? (
            <div className="space-y-3">
              {sortedMetrics.map((metric, index) => {
                const StatusIcon = getStatusIcon(metric.status);
                const colors = getStatusColor(metric.status);
                const categoryColor = getCategoryColor(metric.category);
                const isSelected = selectedCard === metric.id;

                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => {
                      setSelectedCard(isSelected ? null : metric.id);
                      const newExpanded = new Set(expandedMetrics);
                      if (isSelected) {
                        newExpanded.delete(metric.id);
                      } else {
                        newExpanded.add(metric.id);
                      }
                      setExpandedMetrics(newExpanded);
                    }}
                    className={`relative rounded-xl p-4 transition-all active:scale-[0.98] cursor-pointer ${isSelected
                      ? 'bg-[#4A6741]/20 border-2 border-[#4A6741] shadow-lg shadow-[#4A6741]/20'
                      : 'bg-black/30 border border-white/10 hover:border-white/20'
                      }`}
                    style={{ backdropFilter: 'blur(10px)' }}
                    role="button"
                    aria-expanded={isSelected}
                    aria-label={`${metric.label}, ${metric.value}% ${content.healthScore}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCard(isSelected ? null : metric.id);
                      }
                    }}
                  >
                    {/* Compact Header Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                          <StatusIcon size={18} className={colors.text} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white truncate">{metric.label}</h3>
                          <p className="text-[10px] text-white/50 font-mono">{metric.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xl font-bold ${colors.text} font-mono`}>{metric.value}%</span>
                        <div className={`w-2 h-2 rounded-full ${metric.status === 'good' ? 'bg-[#4A6741]' : metric.status === 'warning' ? 'bg-[#D4A857]' : 'bg-[#E85D75]'}`} />
                      </div>
                    </div>

                    {/* Quick Stats Row - Compact */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-white/60">
                        <div className="flex items-center gap-1" title={`${metric.activeUsers} ${content.activeUsers}`}>
                          <Users size={12} />
                          <span>{metric.activeUsers}</span>
                        </div>
                        <div className="flex items-center gap-1" title={formatTimeAgo(metric.lastActivity || null)}>
                          <Clock size={12} />
                          <span>{formatTimeAgo(metric.lastActivity || null)}</span>
                        </div>
                      </div>
                      {metric.change !== 0 && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${metric.change > 0 ? 'bg-[#4A6741]/20 text-[#4A6741]' : 'bg-[#E85D75]/20 text-[#E85D75]'}`}
                          title={`${metric.change > 0 ? '+' : ''}${metric.change}% ${locale === 'de' ? 'Veränderung' : 'change'}`}>
                          {metric.change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          <span className="font-semibold">{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                        </div>
                      )}
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 pt-3 border-t border-white/10 space-y-3"
                        >
                          {/* Enhanced metrics grid */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Building2 size={10} className="text-[#D4A857]" />
                                <span className="text-white/50 text-[10px] uppercase">{content.depts}</span>
                              </div>
                              <span className="text-white font-mono font-semibold">{metric.departmentCount || 0}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Activity size={10} className="text-[#D4A857]" />
                                <span className="text-white/50 text-[10px] uppercase">{content.spaces}</span>
                              </div>
                              <span className="text-white font-mono font-semibold">{metric.spaceCount || 0}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-center gap-1.5 mb-1">
                                <FolderOpen size={10} className="text-[#D4A857]" />
                                <span className="text-white/50 text-[10px] uppercase">{content.folders}</span>
                              </div>
                              <span className="text-white font-mono font-semibold">{metric.folderCount || 0}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Zap size={10} className="text-[#D4A857]" />
                                <span className="text-white/50 text-[10px] uppercase">{content.nodes}</span>
                              </div>
                              <span className="text-white font-mono font-semibold">{metric.nodeCount || 0}</span>
                            </div>
                          </div>

                          {/* Status badge */}
                          <div className={`flex items-center justify-between p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                            <span className="text-xs text-white/70">{locale === 'de' ? 'Status' : 'Status'}</span>
                            <span className={`text-xs font-semibold ${colors.text} uppercase`}>{metric.status}</span>
                          </div>

                          {/* Suggested action */}
                          {content.suggestedQuestions[metric.id] && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAskMora(content.suggestedQuestions[metric.id]);
                                setSelectedCard(null);
                              }}
                              className="w-full p-2 rounded-lg bg-[#D4A857]/10 border border-[#D4A857]/30 text-[#D4A857] text-xs hover:bg-[#D4A857]/20 transition-colors flex items-center gap-2 group"
                            >
                              <Sparkles size={12} className="group-hover:scale-110 transition-transform" />
                              <span className="flex-1 text-left truncate">{locale === 'de' ? 'Môra fragen' : 'Ask Môra'}</span>
                              <ChevronRight size={12} />
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* DESKTOP VIEW - Full organic experience */
            <AnimatePresence mode="wait">
              {viewMode === 'folder' ? (
                <motion.div
                  key="folder"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {sortedMetrics.map((metric, index) => {
                    const StatusIcon = getStatusIcon(metric.status);
                    const colors = getStatusColor(metric.status);
                    const isHovered = hoveredCard === metric.id;
                    const needsAttention = metric.status === 'warning' || metric.status === 'critical';

                    const categoryColor = getCategoryColor(metric.category);

                    return (
                      <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
                        className="relative group cursor-pointer transition-all duration-300"
                        onMouseEnter={() => {
                          setHoveredCard(metric.id);
                          sendDashboardHoverEvent(true);
                          emitCardVisited(metric.id);
                        }}
                        onMouseLeave={() => {
                          setHoveredCard(null);
                          sendDashboardHoverEvent(false);
                        }}
                        onClick={() => setSelectedCard(selectedCard === metric.id ? null : metric.id)}
                        role="article"
                        aria-label={`${metric.label} - ${metric.value}% ${content.healthScore}, ${metric.status}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedCard(selectedCard === metric.id ? null : metric.id);
                          }
                        }}
                      >
                        {/* Pulse animation for warnings */}
                        {needsAttention && (
                          <motion.div
                            className={`absolute -inset-0.5 rounded-2xl ${colors.bg} opacity-50`}
                            animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}

                        {/* Premium Glassmorphic Card - Living memory, not static mirror */}
                        <div className={`relative p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${selectedCard === metric.id
                          ? `bg-[#4A6741]/10 border-[#4A6741]/40 shadow-lg shadow-[#4A6741]/10`
                          : `bg-black/40 ${colors.border} hover:border-white/30 hover:bg-black/50`
                          } ${isHovered ? 'transform scale-[1.02] shadow-xl' : ''}`}
                          style={glassCardStyle}>

                          {/* Subtle pulse - memory is alive */}
                          {isHovered && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl"
                              style={{
                                background: `radial-gradient(circle at 50% 50%, ${categoryColor}05 0%, transparent 70%)`,
                                border: `1px solid ${categoryColor}20`
                              }}
                              animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.02, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}

                          {/* Metric Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-11 h-11 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-lg ${colors.glow}`}>
                                <StatusIcon size={20} className={colors.text} />
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-white/90">{metric.label}</h3>
                                <p className="text-[10px] text-white/40 font-mono">{metric.category}</p>
                              </div>
                            </div>
                            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border ${colors.bg} ${colors.border} ${colors.text} text-[10px] font-mono`}>
                              <StatusIcon size={10} />
                              <span>{metric.status.toUpperCase()}</span>
                            </div>
                          </div>

                          {/* Health Score Bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-xs mb-1.5">
                              <span className="text-white/50">{content.healthScore}</span>
                              <span className={`${colors.text} font-mono font-medium`}>{metric.value}%</span>
                            </div>
                            <div className="relative w-full h-2.5 bg-black/50 rounded-full overflow-hidden"
                              role="progressbar"
                              aria-valuenow={metric.value}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`${content.healthScore}: ${metric.value}%`}>
                              <motion.div
                                className={`h-full rounded-full relative ${metric.value >= 80 ? 'bg-gradient-to-r from-[#4A6741] to-[#5D7C54]' :
                                  metric.value >= 60 ? 'bg-gradient-to-r from-[#D4A857] to-[#E6C897]' :
                                    'bg-gradient-to-r from-[#E85D75] to-[#F87171]'
                                  }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${metric.value}%` }}
                                transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
                              >
                                {/* Animated shimmer effect */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                  animate={{
                                    x: ['-100%', '100%']
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 3,
                                    ease: 'easeInOut'
                                  }}
                                />
                              </motion.div>
                            </div>
                          </div>

                          {/* Metrics Grid - Enhanced with tooltips */}
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { icon: Building2, label: content.depts, value: metric.departmentCount || 0 },
                              { icon: Activity, label: content.spaces, value: metric.spaceCount || 0 },
                              { icon: FolderOpen, label: content.folders, value: metric.folderCount || 0 },
                              { icon: Zap, label: content.nodes, value: metric.nodeCount || 0 },
                            ].map((item) => (
                              <div 
                                key={item.label} 
                                className="group relative p-2 rounded-lg bg-black/30 hover:bg-black/40 text-center transition-all cursor-help"
                                title={`${item.label}: ${item.value}`}
                              >
                                <item.icon size={10} className="text-white/30 group-hover:text-[#D4A857] mx-auto mb-1 transition-colors" />
                                <div className="text-sm font-mono text-[#4A6741] group-hover:text-[#5D7C54] transition-colors">{item.value}</div>
                                <div className="text-[8px] text-white/40 uppercase tracking-tighter mt-0.5">{item.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* Change Indicator */}
                          <div className="flex items-center gap-2 mt-4">
                            {metric.change > 0 ? (
                              <TrendingUp className="w-4 h-4 text-[#4A6741]" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-[#E85D75]" />
                            )}
                            <span
                              className="text-sm font-semibold"
                              style={{ color: metric.change > 0 ? '#4A6741' : '#E85D75' }}
                            >
                              {metric.change > 0 ? '+' : ''}{metric.change}%
                            </span>
                          </div>

                          {/* Bottom Row */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[10px] text-white/40">
                              <Users size={11} />
                              <span>{metric.activeUsers} {content.activeUsers}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-white/40">
                              <Clock size={11} />
                              <span>{formatTimeAgo(metric.lastActivity || null)}</span>
                            </div>
                          </div>

                          {/* Hover Quick Actions */}
                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10"
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCard(metric.id);
                                  }}
                                  className="px-3 py-1 text-[10px] bg-[#4A6741]/20 hover:bg-[#4A6741]/30 border border-[#4A6741]/30 rounded-full text-[#4A6741] transition-all flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4A6741]/50"
                                  title={locale === 'de' ? 'Detaillierten Bericht anzeigen' : 'Show detailed report'}
                                  aria-label={`${locale === 'de' ? 'Bericht anzeigen für' : 'Show report for'} ${metric.label}`}
                                >
                                  <FileText size={10} aria-hidden="true" />
                                  {locale === 'de' ? 'Bericht' : 'Report'}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCard(metric.id);
                                  }}
                                  className="px-3 py-1 text-[10px] bg-[#D4A857]/20 hover:bg-[#D4A857]/30 border border-[#D4A857]/30 rounded-full text-[#D4A857] transition-all flex items-center gap-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4A857]/50"
                                  title={locale === 'de' ? 'Erweiterte Details anzeigen' : 'Show extended details'}
                                  aria-label={`${locale === 'de' ? 'Details anzeigen für' : 'Show details for'} ${metric.label}`}
                                >
                                  <Eye size={10} aria-hidden="true" />
                                  {locale === 'de' ? 'Details' : 'Details'}
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="field"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="relative h-[520px] sm:h-[600px] rounded-3xl overflow-hidden"
                  style={glassPanelStyle}
                >
                  {/* Universe View - Network Visualization */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <defs>
                      <linearGradient id="universeConnectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(74, 103, 65, 0.6)" />
                        <stop offset="50%" stopColor="rgba(212, 180, 131, 0.8)" />
                        <stop offset="100%" stopColor="rgba(74, 103, 65, 0.6)" />
                      </linearGradient>
                      <filter id="universeShimmer">
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

                    {/* Mycelium connections - organic, living network */}
                    {getSemanticConnections().map(([from, to, weight], i) => {
                      const fromPos = universePositions[from];
                      const toPos = universePositions[to];
                      if (!fromPos || !toPos) return null;

                      const isActive = hoveredCard === from || hoveredCard === to;
                      const baseOpacity = weight * 0.5; // Stronger connections are more visible
                      const baseWidth = weight * 2; // Stronger connections are thicker

                      // Organic curve (not straight line) - mycelium grows organically
                      const midX = (fromPos.x + toPos.x) / 2;
                      const midY = (fromPos.y + toPos.y) / 2;
                      const offset = (Math.sin(i * 2.3) * 3) / weight; // Organic variation
                      const cpX1 = fromPos.x + (midX - fromPos.x) * 0.5 + offset;
                      const cpY1 = fromPos.y + (midY - fromPos.y) * 0.5 + offset * 0.7;
                      const cpX2 = midX + (toPos.x - midX) * 0.5 + offset;
                      const cpY2 = midY + (toPos.y - midY) * 0.5 - offset * 0.7;

                      return (
                        <motion.g key={`${from}-${to}-${i}`}>
                          {/* Organic curved path (mycelium thread) */}
                          <motion.path
                            d={`M ${fromPos.x + (isActive ? safeMousePosition.x * 0.2 : safeMousePosition.x * 0.1)}%,${fromPos.y + (isActive ? safeMousePosition.y * 0.2 : safeMousePosition.y * 0.1)}% C ${cpX1 + safeMousePosition.x * 0.15}%,${cpY1 + safeMousePosition.y * 0.15}% ${cpX2 + safeMousePosition.x * 0.15}%,${cpY2 + safeMousePosition.y * 0.15}% ${toPos.x + (isActive ? safeMousePosition.x * 0.2 : safeMousePosition.x * 0.1)}%,${toPos.y + (isActive ? safeMousePosition.y * 0.2 : safeMousePosition.y * 0.1)}%`}
                            fill="none"
                            stroke="url(#universeConnectionGradient)"
                            strokeWidth={isActive ? baseWidth * 2 : baseWidth}
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                              pathLength: 1,
                              opacity: isActive ? baseOpacity * 1.5 : baseOpacity
                            }}
                            transition={{
                              pathLength: { duration: 1.2, delay: i * 0.08, ease: "easeOut" },
                              opacity: { duration: 0.5 }
                            }}
                            style={{
                              filter: isActive ? 'url(#universeShimmer)' : 'none',
                              strokeDasharray: weight < 0.5 ? '4,4' : 'none' // Dashed for weak connections
                            }}
                          />
                          {/* Pulsing signals traveling along mycelium thread */}
                          {isActive && [0, 0.33, 0.66].map((progress, idx) => {
                            // Calculate position along curve using progress
                            const t = progress;
                            const t2 = t * t;
                            const t3 = t2 * t;
                            const mt = 1 - t;
                            const mt2 = mt * mt;
                            const mt3 = mt2 * mt;

                            const x = mt3 * fromPos.x + 3 * mt2 * t * cpX1 + 3 * mt * t2 * cpX2 + t3 * toPos.x;
                            const y = mt3 * fromPos.y + 3 * mt2 * t * cpY1 + 3 * mt * t2 * cpY2 + t3 * toPos.y;

                            return (
                              <motion.circle
                                key={`signal-${idx}`}
                                r="3"
                                fill="#D4A857"
                                cx={`${x}%`}
                                cy={`${y}%`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                  opacity: [0, 1, 1, 0],
                                  scale: [0, 1, 1, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear",
                                  delay: idx * 0.67,
                                  times: [0, 0.1, 0.9, 1]
                                }}
                              />
                            );
                          })}
                        </motion.g>
                      );
                    })}
                  </svg>

                  {/* Metric nodes */}
                  {demoMetrics.map((metric, index) => {
                    const pos = universePositions[metric.id];
                    if (!pos) return null;
                    const StatusIcon = getStatusIcon(metric.status);
                    const categoryColor = getCategoryColor(metric.category);
                    const isHovered = hoveredCard === metric.id;

                    return (
                      <motion.div
                        key={metric.id}
                        className="absolute cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A857]"
                        style={{
                          left: `${pos.x}%`,
                          top: `${pos.y}%`,
                          transform: 'translate(-50%, -50%)',
                          x: isHovered ? safeMousePosition.x * 0.5 : safeMousePosition.x * 0.2,
                          y: isHovered ? safeMousePosition.y * 0.5 : safeMousePosition.y * 0.2,
                          zIndex: isHovered ? 10 : 5
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                        onMouseEnter={() => {
                          setHoveredCard(metric.id);
                          sendDashboardHoverEvent(true);
                          emitCardVisited(metric.id);
                        }}
                        onMouseLeave={() => {
                          setHoveredCard(null);
                          sendDashboardHoverEvent(false);
                        }}
                        onFocus={() => {
                          setHoveredCard(metric.id);
                          sendDashboardHoverEvent(true);
                          emitCardVisited(metric.id);
                        }}
                        onBlur={() => {
                          setHoveredCard(null);
                          sendDashboardHoverEvent(false);
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedCard(metric.id === selectedCard ? null : metric.id);
                          if (metric.id !== selectedCard) {
                            window.dispatchEvent(new CustomEvent('mora-node-select', { detail: metric.id }));
                          }
                        }}
                        tabIndex={0}
                      >
                        {/* Glow effect */}
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `radial-gradient(circle, ${categoryColor}40 0%, transparent 70%)`,
                              filter: 'blur(30px)',
                              width: 150,
                              height: 150,
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

                        {/* Node orb - living memory, not static mirror */}
                        <motion.div
                          className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${categoryColor}FF 0%, ${categoryColor}CC 50%, ${categoryColor}88 100%)`,
                            boxShadow: `0 8px 24px ${categoryColor}40, 0 0 30px ${categoryColor}30, inset 0 2px 4px rgba(255,255,255,0.2)`,
                            border: `2px solid ${isHovered ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`
                          }}
                          animate={{
                            scale: isHovered ? 1.15 : [1, 1.02, 1],
                            boxShadow: isHovered
                              ? `0 12px 32px ${categoryColor}60, 0 0 40px ${categoryColor}40`
                              : `0 8px 24px ${categoryColor}40, 0 0 20px ${categoryColor}30`
                          }}
                          transition={{
                            scale: { duration: isHovered ? 0.2 : 3, repeat: isHovered ? 0 : Infinity },
                            boxShadow: { duration: 0.2 }
                          }}
                        >
                          {/* Inner glow - memory pulse */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `radial-gradient(circle, ${categoryColor}40 0%, transparent 70%)`,
                              opacity: 0.6
                            }}
                            animate={{
                              opacity: [0.4, 0.7, 0.4],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <StatusIcon size={24} className="text-white mb-1 relative z-10" />
                          <span className="text-xs font-bold text-white relative z-10">{metric.value}%</span>
                        </motion.div>

                        {/* Label on hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-4 py-2 rounded-lg whitespace-nowrap"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 22, 18, 0.9) 100%)',
                                border: `1px solid ${categoryColor}`,
                                boxShadow: `0 8px 24px rgba(0, 0, 0, 0.5)`
                              }}
                            >
                              <p className="text-sm font-semibold text-white">{metric.label}</p>
                              <p className="text-xs text-white/60 mt-1">{categoryColor === '#4A6741' ? (locale === 'de' ? 'Menschen' : 'People') : categoryColor === '#5D7C54' ? (locale === 'de' ? 'Prozesse' : 'Processes') : (locale === 'de' ? 'Ressourcen' : 'Resources')}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Metric Detail Overlay (selectedCard) */}
          <AnimatePresence>
            {selectedCard && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
                onClick={() => setSelectedCard(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="w-full max-w-2xl rounded-3xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(10, 22, 18, 0.85) 100%)',
                    border: '1px solid rgba(212, 180, 131, 0.3)',
                    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.5)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#D4A857]/50"
                    aria-label={locale === 'de' ? 'Schließen' : 'Close'}
                    title={locale === 'de' ? 'Detailansicht schließen' : 'Close detail view'}
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>

                  <div className="p-8">
                    {(() => {
                      const metric = demoMetrics.find(m => m.id === selectedCard);
                      if (!metric) return null;
                      const colors = getStatusColor(metric.status);
                      const Icon = getStatusIcon(metric.status);
                      return (
                        <>
                          <div className="flex items-center gap-4 mb-8">
                            <div className={`w-16 h-16 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center shadow-lg ${colors.glow}`}>
                              <Icon size={32} className={colors.text} />
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                                {metric.label}
                              </h3>
                              <div className="flex items-center gap-4">
                                <span className={`text-xl font-mono ${colors.text}`}>{metric.value}%</span>
                                <span className="text-white/40 text-sm uppercase tracking-widest">{metric.category}</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {[
                              { label: content.depts, value: metric.departmentCount, icon: Building2 },
                              { label: content.spaces, value: metric.spaceCount, icon: Activity },
                              { label: content.folders, value: metric.folderCount, icon: FolderOpen },
                              { label: content.nodes, value: metric.nodeCount, icon: Zap }
                            ].map(stat => (
                              <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <stat.icon className="w-4 h-4 text-[#D4A857] mx-auto mb-2 opacity-60" />
                                <div className="text-xl font-mono text-white mb-1">{stat.value}</div>
                                <div className="text-[10px] text-white/40 uppercase tracking-tighter">{stat.label}</div>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-6">
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#4A6741]/20 to-transparent border border-[#4A6741]/30">
                              <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="w-4 h-4 text-[#D4A857]" />
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider">{locale === 'de' ? 'Môra Tiefen-Analyse' : 'Môra Deep Analysis'}</h4>
                              </div>
                              <p className="text-sm text-white/80 leading-relaxed italic">
                                {content.suggestedQuestions[metric.id]}
                              </p>
                              <motion.button
                                onClick={() => {
                                  handleAskMora(content.suggestedQuestions[metric.id]);
                                  setSelectedCard(null);
                                  document.getElementById('mora-dashboard')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="mt-4 px-6 py-2 rounded-lg bg-[#D4A857]/20 border border-[#D4A857]/40 text-[#D4A857] text-xs font-bold hover:bg-[#D4A857]/30 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {locale === 'de' ? 'Diese Analyse starten' : 'Start this analysis'}
                              </motion.button>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Môra Insight Panel */}
        <AnimatePresence>
          {moraInsight && (
            <motion.div
              className="mb-8 rounded-3xl p-6 overflow-hidden relative"
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
                <Sparkles className="w-6 h-6 text-[#D4A857]" />
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
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA - Ruhig & Einladend */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/#waitlist">
            <motion.div
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white bg-gradient-to-r from-[#4A6741] to-[#D4A857] shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 20px 60px rgba(74, 103, 65, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              {content.cta}
            </motion.div>
          </Link>

          <div>
            <Link href={locale === 'de' ? '/mora' : '/en/mora'}>
              <motion.div
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#4A6741] transition-colors cursor-pointer"
                whileHover={{ x: 4 }}
              >
                {content.ctaSecondary}
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
