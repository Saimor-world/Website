'use client';
import { Shield, Lock, Globe, Server } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrustPageDE() {
  const techItems = [
    { title: 'Datenerzeugung', desc: 'Vollständig lokal (Mock/Simulation)', icon: Server },
    { title: 'Verarbeitung', desc: 'Saimôr Core → Môra UI → Lokal im Browser', icon: Shield },
    { title: 'Tracking', desc: 'Keine Cookies, keine Profilbildung', icon: Lock },
    { title: 'Datenschutz', desc: 'EU-basiert, 100% DSGVO-konform', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-[#081410] text-white pt-32 pb-24 selection:bg-emerald-500/30">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="space-y-24">
          
          {/* Header */}
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">Trust Protocol</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              <span className="block opacity-90">Bewusst. Sicher.</span>
              <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
                Nachvollziehbar.
              </span>
            </h1>
            
            <p className="text-xl text-white/40 leading-relaxed max-w-2xl">
              Saimôr befindet sich in der Prototyp-Phase. Transparenz ist unser wichtigstes Fundament. Alle Daten bleiben dort, wo sie hingehören: Bei dir.
            </p>
          </section>

          {/* Grid */}
          <section className="grid sm:grid-cols-2 gap-6">
            {techItems.map((item, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-6 group hover:bg-white/[0.05] transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">{item.title}</h3>
                  <p className="text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Note */}
          <section className="p-10 rounded-[3rem] border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-start gap-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-white uppercase tracking-widest">DSGVO Standard</h4>
                <p className="text-white/60 leading-relaxed italic">
                  &quot;In der Demo werden ausschließlich lokal generierte Daten verwendet. Es findet keine Übertragung an externe Server statt. Für zukünftige Produktivsysteme gilt unser Versprechen: Datensparsamkeit und EU-Hosting sind unverhandelbar.&quot;
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

