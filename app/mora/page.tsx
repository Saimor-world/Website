'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Brain, Network, Shield, Zap, Eye, MessageSquare, Users, Target, TrendingUp, Activity, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MoraDashboard from "@/components/MoraDashboard";
import { UniverseBackground } from "@/components/UniverseBackground";
import { MoraOrbWebsite } from "@/components/MoraOrbWebsite";
import { PlanetsNavigation } from "@/components/PlanetsNavigation";
import { UniverseDock } from "@/components/UniverseDock";

export default function MoraPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    setMounted(true);
    
    // Simple scroll spy
    const handleScroll = () => {
      const demoSection = document.getElementById('demo');
      if (demoSection) {
        const rect = demoSection.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveSection('demo');
        } else {
          setActiveSection('story');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const demoMetrics = [
    { id: 'team-engagement', label: 'Team', value: 87, status: 'good', category: 'people', icon: Users },
    { id: 'process-efficiency', label: 'Prozess', value: 92, status: 'good', category: 'process', icon: Target },
    { id: 'clarity', label: 'Klarheit', value: 91, status: 'good', category: 'people', icon: Eye },
    { id: 'velocity', label: 'Velocity', value: 85, status: 'good', category: 'process', icon: Zap },
    { id: 'satisfaction', label: 'Zufriedenheit', value: 78, status: 'warning', category: 'people', icon: Activity },
    { id: 'workload', label: 'Last', value: 68, status: 'critical', category: 'resources', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      
      {/* 🌌 Universe OS Core - Always Present, Subtly Guiding */}
      <UniverseBackground intensity={0.6} showGrid={true} />
      
      {/* Floating OS Elements */}
      <MoraOrbWebsite state={activeSection === 'demo' ? 'active' : 'demo'} />
      <PlanetsNavigation metrics={demoMetrics as any} />
      <UniverseDock />

      {/* Main Content - Floating Glass Panes */}
      <main className="relative z-10">
        
        {/* 1. Hero - Cinematic & Deep */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <motion.div 
            className="max-w-5xl mx-auto text-center space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-medium uppercase tracking-[0.2em]">Universe OS Showcase</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-7xl md:text-9xl font-light tracking-tight leading-none" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              <span className="block text-white/95">Kein Spiegel.</span>
              <motion.span 
                className="block bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500 bg-clip-text text-transparent"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Ein Gedächtnis.
              </motion.span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-white/60 max-w-3xl mx-auto leading-relaxed font-light">
              Môra ist dein semantisches Betriebssystem. 
              <span className="block text-emerald-400/80 mt-2 italic">Sie erinnert sich an das, was wirklich zählt.</span>
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <a 
                href="#demo" 
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-bold hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
              >
                Das OS erleben
              </a>
              <a 
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/10 backdrop-blur-md transition-all"
              >
                Demo-Termin
              </a>
            </div>
          </motion.div>
        </section>

        {/* 2. The OS Concept - Glass Panels */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-light mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Was bedeutet <span className="text-emerald-400 italic">Universe OS</span>?
              </h2>
              <div className="h-1 w-24 bg-emerald-500/50 mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Semantisches Gedächtnis",
                  desc: "Môra lernt Bedeutungen, nicht nur Begriffe. Sie verknüpft Informationen über Abteilungen hinweg zu einem lebendigen Wissensnetz.",
                  color: "emerald"
                },
                {
                  icon: Network,
                  title: "Visuelle Navigation",
                  desc: "Verlasse die Ordnerstruktur. Navigiere intuitiv durch Planeten (Teams), Systeme (Projekte) und Sterne (Datenpunkte).",
                  color: "cyan"
                },
                {
                  icon: MessageSquare,
                  title: "KI-Kollaboration",
                  desc: "Kein passives Tool. Môra ist dein Partner, der Muster erkennt, wo andere nur Daten sehen, und proaktiv Insights liefert.",
                  color: "purple"
                }
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  className="p-10 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-2xl hover:bg-black/60 transition-all hover:border-emerald-500/30 group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <card.icon className={`w-8 h-8 text-${card.color}-400`} />
                  </div>
                  <h3 className="text-3xl font-semibold mb-6">{card.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. The Live Showcase - Interactive OS snippet */}
        <section id="demo" className="py-32 px-6 relative bg-black/40 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto">
            
            <motion.div 
              className="text-center mb-16 space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-purple-300 font-bold uppercase tracking-widest">Interaktiver OS-Snippet</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Betrete das <span className="text-emerald-400">Môra Feld</span>
              </h2>
              <p className="text-xl text-white/40 max-w-2xl mx-auto">
                Dies ist ein funktionierendes Showcase des echten Universe OS Interfaces. 
                Nutze den Chat oder erkunde die Metriken.
              </p>
            </motion.div>

            {/* The Real Dashboard Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] rounded-[3rem] overflow-hidden border border-white/5"
            >
              <MoraDashboard locale="de" />
            </motion.div>

          </div>
        </section>

        {/* 4. Mycelium Logic - Explaining the 'Why' */}
        <section className="py-32 px-6 relative overflow-hidden">
          {/* Subtle connecting lines in background could go here */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-20 items-center">
              <motion.div 
                className="flex-1 space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-6xl font-light leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Organisches <span className="text-emerald-400">Wachstum</span> durch semantische Vernetzung.
                </h2>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  Môra nutzt eine Myzel-Logik. Informationen wachsen nicht linear, 
                  sondern in einem Netzwerk aus Resonanz. Wenn sich ein Bereich ändert, 
                  spürt das System die Auswirkungen im gesamten Gefüge.
                </p>
                <ul className="space-y-4">
                  {[
                    "Lokal gehostet & sicher",
                    "Echtzeit-Resonanz-Analyse",
                    "Intuitive 3D-Navigation",
                    "DSGVO-Konformität by Design"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-emerald-300/80">
                      <Shield className="w-5 h-5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                className="flex-1 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                {/* A visual representation of a network or orb could go here */}
                <div className="aspect-square rounded-full bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-3xl flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
                  <div className="relative w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
                  <Brain className="w-32 h-32 text-emerald-400 relative z-10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. Final CTA - The Portal */}
        <section className="py-40 px-6 text-center relative overflow-hidden">
          <motion.div 
            className="max-w-4xl mx-auto p-20 rounded-[4rem] bg-gradient-to-br from-emerald-500/10 via-emerald-950/10 to-black border border-emerald-500/20 backdrop-blur-3xl relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 text-emerald-400 mx-auto mb-10" />
            <h2 className="text-6xl md:text-7xl font-light mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Bereit für das <span className="text-emerald-400 italic">nächste Level</span>?
            </h2>
            <p className="text-2xl text-white/50 mb-12 max-w-2xl mx-auto font-light">
              Lass uns gemeinsam dein Organisations-Universum bauen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-bold text-xl hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] transition-all hover:scale-105"
              >
                Demo-Call buchen
              </a>
              <Link
                href="/de/portal"
                className="px-12 py-6 rounded-2xl border border-white/20 text-white font-semibold text-xl hover:bg-white/10 backdrop-blur-md transition-all"
              >
                Portal Zugang
              </Link>
            </div>
            
            <div className="pt-16 flex items-center justify-center gap-12 text-sm text-white/30 uppercase tracking-[0.2em] font-medium">
              <Link href="/" className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2">
                <span>HOME</span>
              </Link>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <Link href="/mora/analog-affect" className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-2">
                <span>ANALOG AFFECT</span>
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      {/* Global OS Styles */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
