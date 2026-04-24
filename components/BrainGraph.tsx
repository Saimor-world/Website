'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';

type Fact = {
  id: string;
  key: string;
  value: string;
};

export default function BrainGraph({ facts }: { facts: Fact[] }) {
  if (facts.length === 0) return null;

  return (
    <div className="relative w-full aspect-square md:aspect-video rounded-[2.5rem] border border-white/10 bg-black/40 overflow-hidden group">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
      
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
          <Brain className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-white">Knowledge Graph</h3>
          <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Lernfortschritt des Digitalen Ichs</p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-md max-h-[300px]">
          {/* Central Node */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/30 blur-xl"
          />
          <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
             <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>

          {/* Fact Nodes */}
          {facts.map((fact, i) => {
            const angle = (i / facts.length) * Math.PI * 2;
            const radius = 120;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div key={fact.id} className="absolute inset-0 m-auto w-0 h-0">
                {/* Connecting Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: radius }}
                  className="absolute h-px bg-gradient-to-r from-cyan-500/40 to-transparent origin-left"
                  style={{ transform: `rotate(${angle}rad)` }}
                />
                
                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md whitespace-nowrap group-hover:border-cyan-500/50 transition-colors">
                    <p className="text-[9px] uppercase tracking-tighter text-cyan-400 font-bold leading-none mb-1">{fact.key}</p>
                    <p className="text-[11px] text-white/90 font-medium leading-none">{fact.value}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 text-right">
        <p className="text-[10px] text-white/20 font-mono uppercase">Sync Status: Active</p>
        <p className="text-[10px] text-emerald-400 font-mono uppercase">Cognitive Load: {facts.length * 8}%</p>
      </div>
    </div>
  );
}
