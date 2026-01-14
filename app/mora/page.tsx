'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Brain, Network, MessageSquare, Shield, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import MoraDashboard from "@/components/MoraDashboard";

export default function MoraPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-[#020504] text-white selection:bg-emerald-500/30">
      
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">Universe OS Showcase</span>
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
            
            {/* Window Frame Header */}
            <div className="flex items-center justify-between mb-4 px-8">
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">System: Resonance Field v1.0</span>
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

        {/* 4. Final CTA */}
        <section className="py-40 px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-3xl mx-auto space-y-12"
          >
            <h2 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Dein Universum <br />
              <span className="italic text-emerald-400">wartet.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="https://cal.com/saimor/30min"
                target="_blank"
                className="px-12 py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105"
              >
                Showcase buchen
              </a>
              <Link
                href="/de/portal"
                className="px-12 py-5 rounded-2xl border border-white/10 text-white font-semibold hover:bg-white/5 backdrop-blur-md transition-all"
              >
                Portal Zugang
              </Link>
            </div>

            <div className="pt-20 flex items-center justify-center gap-8 text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/mora/analog-affect" className="hover:text-emerald-400 transition-colors">Analog Affect</Link>
            </div>
          </motion.div>
        </section>

      </main>

      <style jsx global>{`
        body { background-color: #020504; }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
