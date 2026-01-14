'use client';
import { motion } from 'framer-motion';
import { Zap, Target, Heart, Sparkles } from 'lucide-react';

export default function PulsePage() {
  const formats = [
    {
      name: 'Workshop „Klarheit im Wandel"',
      duration: '3h',
      icon: Target,
      desc: 'Fokussierte Klärung für Teams.'
    },
    {
      name: 'Keynote „Resonanz statt Rauschen"',
      duration: '30–45 min',
      icon: Zap,
      desc: 'Inspiration für große Runden.'
    },
    {
      name: 'Stilles Format „Tiefe"',
      duration: '60–90 min',
      icon: Heart,
      desc: 'Bewusste Reflexion im Prozess.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#081410] text-white pt-32 pb-24 selection:bg-emerald-500/30">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-cyan-900/10 blur-[150px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Hero Section */}
        <section className="mb-32 space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">System: Pulse</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            <span className="block opacity-90">Impulse für</span>
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              Klarheit.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/40 leading-relaxed max-w-3xl mx-auto">
            Pulse sind gezielte Impulsformate: Workshops, Keynotes oder stille Räume. Sie bringen Energie genau dorthin, wo sie gebraucht wird.
          </p>
        </section>

        {/* Formats Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-32">
          {formats.map((format, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-6 group hover:bg-white/[0.05] transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <format.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white uppercase tracking-widest">{format.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/20">{format.duration}</p>
                </div>
                <p className="text-white/40 leading-relaxed">{format.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <div className="inline-flex flex-col items-center space-y-8">
            <p className="text-white/40 text-sm uppercase tracking-[0.4em] font-black">Bereit für einen Impuls?</p>
            <a
              href="https://cal.com/saimor/30min"
              target="_blank"
              className="px-12 py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl"
            >
              Pulse anfragen
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
