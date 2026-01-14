'use client';

import Link from "next/link";
import { useState } from "react";
import MoraDashboard from "@/components/MoraDashboard";
import { UniverseBackground } from "@/components/UniverseBackground";
import { MoraOrbWebsite } from "@/components/MoraOrbWebsite";
import { PlanetsNavigation } from "@/components/PlanetsNavigation";
import { UniverseDock } from "@/components/UniverseDock";
import { StarConstellations } from "@/components/StarConstellations";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Activity 
} from 'lucide-react';

const featureCards = [
  {
    title: 'Kein Spiegel',
    body: 'Môra reflektiert nicht nur Daten, sie erinnert sich an Muster und Zusammenhänge.'
  },
  {
    title: 'Ein Gedächtnis',
    body: 'Wie das Myzel im Waldboden verbindet Môra, was zusammengehört – ruhig und klar.'
  },
  {
    title: 'Lokal & sicher',
    body: 'Vollständig lokal, EU-gehostet, DSGVO-konform. Deine Daten bleiben deine Daten.'
  }
];

// Note: metadata moved to layout for client component
export default function MoraPage() {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Demo metrics for planets (matching dashboard metrics)
  const planetMetrics = [
    { 
      id: 'team-engagement', 
      label: 'Team-Engagement', 
      value: 87, 
      status: 'good' as const, 
      category: 'people' as const, 
      icon: Users,
      color: '#10B981'
    },
    { 
      id: 'process-efficiency', 
      label: 'Prozess-Effizienz', 
      value: 92, 
      status: 'good' as const, 
      category: 'process' as const, 
      icon: Target,
      color: '#10B981'
    },
    { 
      id: 'satisfaction', 
      label: 'Zufriedenheit', 
      value: 78, 
      status: 'warning' as const, 
      category: 'people' as const, 
      icon: BarChart3,
      color: '#D4A857'
    },
    { 
      id: 'workload', 
      label: 'Arbeitsbelastung', 
      value: 68, 
      status: 'critical' as const, 
      category: 'resources' as const, 
      icon: Zap,
      color: '#EF4444'
    },
    { 
      id: 'velocity', 
      label: 'Umsetzungsgeschwindigkeit', 
      value: 85, 
      status: 'good' as const, 
      category: 'process' as const, 
      icon: TrendingUp,
      color: '#10B981'
    },
    { 
      id: 'clarity', 
      label: 'Klarheitsindex', 
      value: 91, 
      status: 'good' as const, 
      category: 'people' as const, 
      icon: Activity,
      color: '#10B981'
    }
  ];

  // Semantic connections between metrics
  const connections = [
    { from: 'team-engagement', to: 'satisfaction', strength: 0.8, type: 'strong' as const },
    { from: 'satisfaction', to: 'clarity', strength: 0.7, type: 'strong' as const },
    { from: 'team-engagement', to: 'clarity', strength: 0.6, type: 'medium' as const },
    { from: 'process-efficiency', to: 'velocity', strength: 0.8, type: 'strong' as const },
    { from: 'workload', to: 'satisfaction', strength: 0.5, type: 'medium' as const },
    { from: 'clarity', to: 'process-efficiency', strength: 0.4, type: 'weak' as const },
    { from: 'team-engagement', to: 'velocity', strength: 0.4, type: 'weak' as const }
  ];

  // Handle dock item clicks
  const handleDockClick = (itemId: string) => {
    switch (itemId) {
      case 'chat':
        document.getElementById('mora-dashboard')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'apps':
        setSelectedSection('dashboard');
        break;
      case 'recent':
        setSelectedSection('activity');
        break;
      case 'user':
        window.location.href = '/account';
        break;
      case 'settings':
        setSelectedSection('settings');
        break;
    }
  };

  // Handle planet clicks
  const handlePlanetClick = (planetId: string) => {
    setSelectedSection(planetId);
    document.getElementById('mora-dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative text-slate-100">
      {/* Universe Background */}
      <UniverseBackground intensity={0.8} showGrid={true} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24 space-y-16 sm:space-y-24">

        {/* Hero Header - 2026 Premium */}
        <header className="space-y-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4A857]/30 bg-[#D4A857]/5 text-xs tracking-widest uppercase text-[#D4A857]">
            <span className="w-2 h-2 rounded-full bg-[#D4A857] animate-pulse" />
            Môra · Semantic Memory
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Kein Spiegel.<br />
            <span className="bg-gradient-to-r from-[#D4A857] via-[#E6C897] to-[#D4A857] bg-clip-text text-transparent">Ein Gedächtnis.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Môra erkennt Muster, versteht Kontext und zeigt, was zusammengehört.
            Lokal. Sicher. Intelligent.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">🔒 DSGVO-konform</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">💾 100% lokal</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">🧠 KI-gestützt</span>
          </div>
        </header>

        {/* Feature Cards - Premium Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card, index) => (
            <article
              key={card.title}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 transition-all duration-500 hover:border-[#D4A857]/20 hover:bg-white/[0.04]"
            >
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-mono text-white/30">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-[#D4A857]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {card.title}
              </h2>
              <p className="text-white/60 leading-relaxed">{card.body}</p>
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4A857]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </article>
          ))}
        </section>

        {/* Dashboard Section - Premium Container */}
        <section className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A857]/5 via-transparent to-[#4A6741]/5 pointer-events-none" />

          <div className="relative p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#D4A857] mb-2">Live Demo</p>
                <h2 className="text-3xl sm:text-4xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  So arbeitet Môra
                </h2>
              </div>
              <Link
                href="/en/mora"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-sm font-medium text-white/70 hover:text-white hover:border-white/40 transition-all"
              >
                🌐 English Version
              </Link>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
              <MoraDashboard locale="de" />
            </div>
          </div>
        </section>

        {/* CTA Section - Môra kennenlernen als Hauptfokus */}
        <section className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#D4A857]/5 to-transparent p-10 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

          <div className="relative space-y-6 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-[#D4A857]">Nächster Schritt</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Môra kennenlernen
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Entdecke, wie Môra deine Organisation unterstützt.
              Starte ein Gespräch oder erkunde das Portal.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4">
              <a
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-[#0F1F17] transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #D4A857 0%, #C49745 100%)',
                  boxShadow: '0 8px 32px rgba(212, 168, 87, 0.3)'
                }}
              >
                Gespräch buchen →
              </a>
              <Link
                href="/de/portal"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all active:scale-95"
              >
                Portal erkunden
              </Link>
            </div>

            {/* Sekundäre Links - weniger prominent */}
            <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm text-white/40">
              <Link href="/" className="hover:text-white/60 transition-colors">
                ← Zurück zur Startseite
              </Link>
              <span className="text-white/20">·</span>
              <Link
                href="/mora/analog-affect"
                className="hover:text-white/60 transition-colors"
              >
                Analog Affect →
              </Link>
            </div>
          </div>
        </section>

        {/* Universe OS Navigation Elements */}
        
        {/* Planets Navigation */}
        <PlanetsNavigation 
          metrics={planetMetrics}
          onPlanetClick={handlePlanetClick}
        />

        {/* Star Constellations */}
        <StarConstellations 
          metrics={planetMetrics}
          connections={connections}
          hoveredMetricId={hoveredPlanet}
        />

        {/* Dock System */}
        <UniverseDock 
          onItemClick={handleDockClick}
        />

        {/* Môra Orb */}
        <MoraOrbWebsite 
          state="demo" 
          size={92}
          onClick={() => {
            document.getElementById('mora-dashboard')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
}
