'use client';

import React, { useState, useEffect, useId, useCallback, useRef, useMemo, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, TrendingUp, TrendingDown, Users, Target, BarChart3,
  MessageSquare, Send, Loader2, CheckCircle2, ChevronRight,
  Activity, AlertCircle, CheckCircle, LayoutGrid, Folder, Info,
  Building2, FolderOpen, Zap, Clock, RefreshCw, FileText, Eye, ArrowUpDown, X,
  Search, Shield, Bell, Settings, User, Compass
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
}

export default function MoraDashboard({ locale }: MoraDashboardProps) {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('universe');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [hoveredNode, setHoveredMetric] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [moraResponse, setMoraResponse] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // --- DEMO DATA ---
  const metrics: DashboardMetric[] = useMemo(() => [
    { id: 'team', label: t.metrics.team, value: 87, change: 12, status: 'good', category: 'people', icon: Users, nodeCount: 156, departmentCount: 4, spaceCount: 12, folderCount: 28, activeUsers: 24, lastActivity: 'vor 2 Std' },
    { id: 'process', label: t.metrics.process, value: 92, change: 8, status: 'good', category: 'process', icon: Target, nodeCount: 134, departmentCount: 3, spaceCount: 9, folderCount: 22, activeUsers: 18, lastActivity: 'vor 45 Min' },
    { id: 'clarity', label: t.metrics.clarity, value: 91, change: 18, status: 'good', category: 'people', icon: Eye, nodeCount: 148, departmentCount: 4, spaceCount: 11, folderCount: 26, activeUsers: 22, lastActivity: 'vor 30 Min' },
    { id: 'velocity', label: t.metrics.velocity, value: 85, change: 5, status: 'good', category: 'process', icon: Zap, nodeCount: 142, departmentCount: 3, spaceCount: 10, folderCount: 24, activeUsers: 20, lastActivity: 'vor 1 Std' },
    { id: 'satisfaction', label: t.metrics.satisfaction, value: 78, change: -3, status: 'warning', category: 'people', icon: Activity, nodeCount: 198, departmentCount: 5, spaceCount: 15, folderCount: 35, activeUsers: 32, lastActivity: 'vor 5 Std' },
    { id: 'workload', label: t.metrics.workload, value: 68, change: -15, status: 'critical', category: 'resources', icon: BarChart3, nodeCount: 89, departmentCount: 2, spaceCount: 6, folderCount: 14, activeUsers: 12, lastActivity: 'vor 8 Std' },
  ], [t]);

  // --- UNIVERSE POSITIONS ---
  const nodePositions = useMemo(() => {
    return metrics.map((_, i) => {
      const angle = (i / metrics.length) * Math.PI * 2;
      const radius = isMobile ? 30 : 35;
      return {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius
      };
    });
  }, [metrics.length, isMobile]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-[800px] bg-black group/os overflow-hidden font-sans select-none border border-white/5">
      
      {/* 1. Scoped Universe Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
        
        {/* Scoped Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-emerald-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
          />
        ))}

        {/* Neural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* 2. Top Bar - OS Header */}
      <div className="absolute top-0 inset-x-0 h-16 z-30 flex items-center justify-between px-8 border-b border-white/5 backdrop-blur-md bg-black/20">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.4em] text-white/80">{t.systemName}</span>
          </div>
          
          {!isMobile && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400/80">{t.status}</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 text-white/30 text-[10px] font-mono">
                <Users className="w-3 h-3" />
                <span>24 AKTIV</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group/search">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 group-focus-within/search:text-emerald-400 transition-colors" />
            <input 
              type="text" 
              placeholder={t.search} 
              className="bg-white/5 border border-white/5 rounded-full pl-9 pr-4 py-1.5 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 w-48 focus:w-64 transition-all"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all relative">
            <Bell className="w-4 h-4" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-black" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-[10px] font-bold text-emerald-400">
            SF
          </div>
        </div>
      </div>

      {/* 3. Main Content Area */}
      <div className="absolute inset-0 pt-16 pb-20 z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* VIEW: UNIVERSE (The Network) */}
          {viewMode === 'universe' && (
            <motion.div 
              key="universe"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-full"
            >
              {/* Mycelium Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <defs>
                  <linearGradient id="netGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(16,185,129,0)" />
                    <stop offset="50%" stopColor="rgba(16,185,129,0.5)" />
                    <stop offset="100%" stopColor="rgba(16,185,129,0)" />
                  </linearGradient>
                </defs>
                {nodePositions.map((pos, i) => {
                  const next = nodePositions[(i + 1) % nodePositions.length];
                  const midX = (pos.x + next.x) / 2;
                  const midY = (pos.y + next.y) / 2;
                  return (
                    <motion.path
                      key={i}
                      d={`M ${pos.x}% ${pos.y}% Q ${midX + 5}% ${midY - 5}% ${next.x}% ${next.y}%`}
                      stroke="url(#netGrad)"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: i * 0.1 }}
                    />
                  );
                })}
              </svg>

              {/* Metric Orbs */}
              {metrics.map((m, i) => {
                const pos = nodePositions[i];
                const isSelected = selectedMetric === m.id;
                const isHovered = hoveredNode === m.id;
                const statusColor = m.status === 'good' ? '#10B981' : m.status === 'warning' ? '#F59E0B' : '#EF4444';

                return (
                  <motion.div
                    key={m.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: isSelected ? 50 : 10
                    }}
                    onMouseEnter={() => setHoveredMetric(m.id)}
                    onMouseLeave={() => setHoveredMetric(null)}
                    onClick={() => setSelectedMetric(isSelected ? null : m.id)}
                  >
                    {/* Outer Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full blur-xl opacity-20"
                      style={{ background: statusColor }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                    
                    {/* Node Core */}
                    <motion.div
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-500 ${
                        isSelected ? 'scale-125 border-white/40' : 'border-white/10 hover:border-white/30'
                      }`}
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${statusColor}22 0%, rgba(0,0,0,0.8) 100%)`,
                        boxShadow: isHovered ? `0 0 20px ${statusColor}33` : 'none'
                      }}
                    >
                      <m.icon className="w-6 h-6 text-white/80" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-[9px] font-mono font-bold text-white/60">
                        {m.value}%
                      </div>
                    </motion.div>

                    {/* Node Label */}
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

              {/* Center Intelligence Orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center group/core">
                <motion.div
                  className="w-32 h-32 rounded-full relative flex items-center justify-center"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 40px rgba(16,185,129,0.1)',
                      '0 0 60px rgba(16,185,129,0.2)',
                      '0 0 40px rgba(16,185,129,0.1)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-emerald-500/10 animate-[spin_15s_linear_infinite_reverse]" />
                  
                  <div 
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center cursor-pointer shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-transform active:scale-95 group-hover/core:scale-110"
                    onClick={() => setViewMode('chat')}
                  >
                    <Sparkles className="w-10 h-10 text-white drop-shadow-md" />
                  </div>
                </motion.div>
                <div className="mt-6 opacity-0 group-hover/core:opacity-100 transition-opacity duration-500">
                  <p className="text-[10px] font-bold tracking-[0.5em] text-emerald-400 uppercase">Resonanz-Kern</p>
                  <p className="text-[9px] text-white/30 uppercase mt-1">Bereit für Analyse</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW: FOLDERS (Traditional Grid) */}
          {viewMode === 'folders' && (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full p-12 overflow-y-auto"
            >
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group/card cursor-pointer backdrop-blur-xl"
                    onClick={() => { setSelectedMetric(m.id); setViewMode('universe'); }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                        <m.icon className="w-6 h-6 text-white/60 group-hover/card:text-white transition-colors" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-white mb-1">{m.value}%</div>
                        <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${m.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {m.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {m.change}%
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-white/90 mb-4 tracking-wide uppercase">{m.label}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Knoten</p>
                        <p className="text-xs text-white/60 font-mono">{m.nodeCount}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Aktivität</p>
                        <p className="text-xs text-white/60 font-mono">{m.lastActivity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW: CHAT (The Intelligence) */}
          {viewMode === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full h-full flex items-center justify-center p-8"
            >
              <div className="w-full max-w-3xl h-full flex flex-col bg-white/5 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl overflow-hidden relative">
                
                {/* Chat Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-wider text-white uppercase">{t.chatTitle}</h3>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">Semantisches Gedächtnis v4.2</p>
                    </div>
                  </div>
                  <button onClick={() => setViewMode('universe')} className="p-2 rounded-xl hover:bg-white/5 text-white/40">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {moraResponse ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="space-y-4 max-w-[80%]">
                        <p className="text-white/80 leading-relaxed text-sm">{moraResponse}</p>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-white/40 hover:text-white transition-colors uppercase font-bold tracking-wider">Metriken korrelieren</button>
                          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] text-white/40 hover:text-white transition-colors uppercase font-bold tracking-wider">Report generieren</button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                      <MessageSquare className="w-16 h-16 text-white mb-6" />
                      <p className="text-sm uppercase tracking-[0.2em] text-white">Stelle eine Frage zur Resonanz deiner Organisation</p>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="p-8 bg-black/20 border-t border-white/5">
                  <div className="relative">
                    <input 
                      type="text"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && userQuestion.trim() && (setMoraResponse("Ich analysiere die semantischen Verbindungen in deinem System... Basierend auf der aktuellen Gesundheitsscore von 87% sehe ich ein starkes Potenzial zur Optimierung im Bereich 'Velocity' durch engere Verzahnung mit dem 'Clarity Index'."), setUserQuestion(''))}
                      placeholder="Frage nach Zusammenhängen..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-16 py-5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Bottom Dock - Integrated Navigation */}
      <div className="absolute bottom-6 inset-x-0 z-30 flex justify-center">
        <div className="flex items-center gap-2 p-2 px-4 rounded-[2rem] bg-black/40 border border-white/10 backdrop-blur-2xl shadow-2xl">
          {[
            { id: 'universe', icon: Compass, label: t.universe },
            { id: 'folders', icon: LayoutGrid, label: t.folders },
            { id: 'chat', icon: MessageSquare, label: t.chat },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setViewMode(item.id as any)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all group ${
                viewMode === item.id ? 'bg-emerald-500 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <AnimatePresence>
                {viewMode === item.id && (
                  <motion.span 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="text-[11px] font-bold uppercase tracking-widest overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
          <div className="w-px h-8 bg-white/10 mx-2" />
          <button className="p-3 rounded-2xl text-white/40 hover:bg-white/5 hover:text-white transition-all">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-2xl text-white/40 hover:bg-white/5 hover:text-white transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 5. Detail Sidebar (Overlay) */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="absolute top-20 right-8 bottom-24 w-96 z-40 p-8 rounded-[2.5rem] bg-black/60 border border-white/10 backdrop-blur-3xl shadow-2xl overflow-y-auto"
          >
            {(() => {
              const m = metrics.find(x => x.id === selectedMetric);
              if (!m) return null;
              return (
                <div className="space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                      <m.icon className="w-7 h-7 text-white/80" />
                    </div>
                    <button onClick={() => setSelectedMetric(null)} className="p-2 rounded-xl hover:bg-white/5 text-white/20">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-3xl font-light italic mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{m.label}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-mono font-bold text-white">{m.value}%</span>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                        m.status === 'good' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}>
                        {m.status}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <Building2 className="w-4 h-4 text-emerald-400 mb-3 opacity-60" />
                      <div className="text-xl font-mono text-white mb-1">{m.departmentCount}</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-tighter font-bold">ABTEILUNGEN</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <Activity className="w-4 h-4 text-emerald-400 mb-3 opacity-60" />
                      <div className="text-xl font-mono text-white mb-1">{m.spaceCount}</div>
                      <div className="text-[9px] text-white/30 uppercase tracking-tighter font-bold">BEREICHE</div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">KI ANALYSE</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed italic">
                      "Die Resonanz im Bereich {m.label} zeigt eine starke Korrelation mit dem Team-Engagement. 
                      Empfehlung: Vertiefung der semantischen Knoten in Abteilung 3."
                    </p>
                    <button className="w-full py-3 rounded-xl bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20">
                      Tiefenanalyse starten
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
      `}</style>
    </div>
  );
}
