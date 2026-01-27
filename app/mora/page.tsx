'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Brain, Network, MessageSquare, Eye, Radio } from "lucide-react";
import { motion } from "framer-motion";
import MoraDashboard from "@/components/MoraDashboard";
import dynamic from "next/dynamic";

const MoraAnalogAffect = dynamic(() => import("@/components/MoraAnalogAffect"), { ssr: false });

export default function MoraPage() {
  const [mounted, setMounted] = useState(false);
  const [showAnalogView, setShowAnalogView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Force scroll to top when analog view is activated
  useEffect(() => {
    if (showAnalogView) {
      // Immediate scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Fallback with RAF to catch any late renders
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });

      // Extra safety timeout
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [showAnalogView]);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  // Show Analog View fullscreen when activated
  if (showAnalogView) {
    return (
      <div className="min-h-screen bg-black" style={{ position: 'relative', top: 0 }}>
        <button
          onClick={() => setShowAnalogView(false)}
          className="fixed top-6 right-6 z-[100] px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-all backdrop-blur-md"
        >
          ← Zurück zum Dashboard
        </button>
        <MoraAnalogAffect locale="de" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081410] text-white selection:bg-emerald-500/30">

      {/* 🌌 Atmospheric Background (Subtle & Scoped) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10">

        {/* 1. Cinematic Hero */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-400/80">Concept Demo — In Development</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              <span className="block opacity-90">Kein Spiegel.</span>
              <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
                Ein Gedächtnis.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
              Môra ist das erste semantische Betriebssystem, das <span className="text-white/80">Bedeutung</span> über Daten stellt.
            </p>
          </motion.div>
        </section>

        {/* 2. THE OS SHOWCASE - The Centerpiece */}
        <section id="showcase" className="py-20 px-4 md:px-10">
          <div className="max-w-[1600px] mx-auto">

            {/* Honest Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 px-8 py-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 backdrop-blur-md"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-amber-300">Eine grobe Darstellung — nicht das echte System</h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-3xl">
                    Was du hier siehst, ist eine <span className="text-amber-300 font-semibold">konzeptuelle Demonstration</span>.
                    Das echte MÔRA OS ist noch in aktiver Entwicklung und wird <span className="text-white/70">völlig anders aussehen</span> —
                    mit deutlich mehr Tiefe, visueller Komplexität und semantischer Intelligenz.
                    Das hier dient nur dazu, die <span className="italic text-amber-200">Idee</span> zu vermitteln.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Window Frame Header */}
            <div className="flex items-center justify-between mb-4 px-8">
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-400/40">Concept Mockup — Not Final</span>
              </div>
              <div className="flex items-center gap-4 text-white/30 text-[10px] font-mono tracking-widest">
                <span>0xFF_SAIMOR</span>
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            {/* The Dashboard acts as the OS Environment */}
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative rounded-[3rem] border border-white/5 bg-black overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
            >
              <MoraDashboard locale="de" />
            </motion.div>

            {/* Analog Affect Deep View Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <button
                onClick={() => setShowAnalogView(true)}
                className="group px-10 py-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-purple-500/20 border border-amber-500/30 hover:border-amber-400/50 transition-all hover:scale-105 flex items-center justify-center gap-4 backdrop-blur-md"
              >
                <Eye className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="text-amber-200 font-bold text-lg block">Analog Affect Experience</span>
                  <span className="text-[11px] text-white/40 uppercase tracking-wider">VHS Archive • Deep View</span>
                </div>
                <Radio className="w-5 h-5 text-purple-400 group-hover:animate-pulse ml-2" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* 3. Core Principles - Clean & OS-style */}
        <section className="py-40 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-light italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Semantische Tiefe</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Nicht nur Begriffe, sondern Bedeutungen. Môra versteht den Kontext deiner Daten und verknüpft sie organisch.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                <Network className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-light italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Visuelle Intelligenz</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Navigiere durch deine Organisation wie durch ein Universum. Planetare Strukturen ersetzen starre Ordner.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-light italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Aktive Begleitung</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Môra ist kein Werkzeug, sondern ein Partner. Sie liefert Insights, bevor du die Frage überhaupt formuliert hast.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Vision & Reality Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Das <span className="italic text-emerald-400">echte</span> MÔRA OS
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                ist eine lebendige, sich entwickelnde Intelligenz.
                Ein System, das nicht nur verwaltet, sondern <span className="text-white/80 font-semibold">versteht</span>.
                Das sich an deine Denkweise anpasst und mit dir wächst.
              </p>
            </motion.div>

            {/* The Vision Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-light mb-4 text-emerald-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>3D-Universum Interface</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Navigiere durch deine Daten wie durch ein lebendiges Universum. Jede Abteilung ein Planet, jedes Projekt ein Orbit.
                  Semantische Verbindungen werden als <span className="text-white/60">leuchtende Gravitationsfelder</span> sichtbar.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-light mb-4 text-cyan-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Aktive Gedächtnisschicht</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  MÔRA lernt mit jedem Klick. Sie erkennt Muster, die du nicht siehst.
                  Sie schlägt Verbindungen vor, <span className="text-white/60">bevor du danach suchst</span>.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-light mb-4 text-purple-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Embodied Agent</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Sie ist kein Chatbot. Sie ist ein <span className="text-white/60">lebendiger Teil deines Workflows</span>.
                  Sie beobachtet, antizipiert und handelt proaktiv.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-light mb-4 text-amber-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Closed-Loop Learning</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  Jede Interaktion verfeinert ihr Verständnis. Das System wird nicht nur benutzt —
                  <span className="text-white/60">es entwickelt sich</span>.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. Honest CTA - Support the Vision */}
        <section className="py-32 px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Diese Vision <br />
                <span className="italic text-emerald-400">braucht dich.</span>
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                MÔRA ist kein fertiges Produkt, sondern eine <span className="text-white/70 font-semibold">lebendige Entwicklung</span>.
                Wir bauen ein System, das die Art und Weise verändert, wie Menschen mit Wissen arbeiten.
                Und wir suchen <span className="text-emerald-300">Partner, Pioniere und Unterstützer</span>, die an diese Zukunft glauben.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://cal.com/saimor/30min"
                target="_blank"
                className="px-12 py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105"
              >
                Gespräch vereinbaren
              </a>
              <Link
                href="/de/portal"
                className="px-12 py-5 rounded-2xl border border-white/10 text-white font-semibold hover:bg-white/5 backdrop-blur-md transition-all"
              >
                Portal erkunden
              </Link>
            </div>

            <p className="text-xs text-white/30 max-w-xl mx-auto">
              Ob als Early Adopter, Investor oder einfach als Enthusiast —
              jede Form von Unterstützung bringt uns dem Ziel näher.
            </p>
          </motion.div>
        </section>

      </main>

      <style jsx global>{`
        body { background-color: #081410; }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
