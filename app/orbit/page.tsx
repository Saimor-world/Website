'use client';
import { motion } from 'framer-motion';
import { Repeat, Target, Heart, Sparkles } from 'lucide-react';

export default function OrbitPage() {
  const benefits = [
    { icon: Target, title: 'Orientierung', text: 'Regelmäßiger Rhythmus statt Meeting-Chaos.', color: '#10B981' },
    { icon: Heart, title: 'Tiefe', text: 'Raum für das, was wirklich zählt.', color: '#06B6D4' },
    { icon: Sparkles, title: 'Kontinuität', text: 'Begleitung im permanenten Wandel.', color: '#8B5CF6' }
  ];

  return (
    <div className="min-h-screen bg-[#081410] text-white pt-32 pb-24 selection:bg-emerald-500/30">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-purple-900/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Hero Section */}
        <section className="mb-32 space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md"
          >
            <Repeat className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">System: Orbit</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            <span className="block opacity-90">Rhythmus statt</span>
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              Meetings.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/40 leading-relaxed max-w-3xl mx-auto">
            Systematische Begleitung für bewusste Transformation. Ein natürlicher Takt, der Klarheit und echte Resonanz schafft.
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-32">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-6 group hover:bg-white/[0.05] transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <benefit.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">{benefit.title}</h3>
                <p className="text-white/40 leading-relaxed">{benefit.text}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Callout */}
        <section className="mb-32">
          <div className="p-12 sm:p-20 rounded-[4rem] border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md text-center space-y-8">
            <p className="text-3xl sm:text-5xl font-light leading-tight tracking-tight text-white italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              &quot;Erst verstehen, dann verändern. Orbit schafft den verlässlichen Raum für bewusste Entscheidungen.&quot;
            </p>
            <div className="pt-8">
              <a
                href="https://cal.com/saimor/30min"
                target="_blank"
                className="px-12 py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105 inline-block"
              >
                Showcase buchen
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
