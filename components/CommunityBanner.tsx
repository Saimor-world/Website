'use client';
import { motion } from 'framer-motion';
import { Sparkles, Users, Heart, Rocket } from 'lucide-react';
import type { CSSProperties } from 'react';

type Locale = 'de' | 'en';

interface CommunityBannerProps {
  locale: Locale;
}

const glassPanelStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(10, 22, 18, 0.65) 0%, rgba(10, 22, 18, 0.35) 100%)',
  backdropFilter: 'blur(32px)',
  border: '1px solid rgba(212, 180, 131, 0.35)',
  boxShadow:
    '0 20px 60px rgba(74, 103, 65, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
};

const glassTileStyle: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(212, 180, 131, 0.08) 100%)',
  border: '1px solid rgba(212, 180, 131, 0.35)',
  backdropFilter: 'blur(20px)',
  boxShadow:
    '0 12px 32px rgba(74, 103, 65, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
};

export default function CommunityBanner({ locale }: CommunityBannerProps) {
  const content = {
    de: {
      badge: 'Early Access',
      title: 'Werde Teil der Saimôr Community',
      subtitle: 'Wir bauen Saimôr gemeinsam mit dir. In ruhigem Tempo, Schritt für Schritt.',
      features: [
        { icon: Users, text: 'Früher Zugang zu Môra', color: 'bg-blue-500/20 text-blue-400' },
        { icon: Heart, text: 'Funktionen schärfen', color: 'bg-rose-500/20 text-rose-400' },
        { icon: Rocket, text: 'Early Supporter', color: 'bg-purple-500/20 text-purple-400' },
        { icon: Sparkles, text: 'Direkter Kontakt', color: 'bg-emerald-500/20 text-emerald-400' }
      ],
      cta: 'Warteliste beitreten',
      transparency: 'Technische Entwicklung läuft: Backend 85% · Frontend 70%'
    },
    en: {
      badge: 'Early Access',
      title: 'Join the Saimôr community',
      subtitle: 'We are building Saimôr together with you. Calmly and step by step.',
      features: [
        { icon: Users, text: 'Early access to Môra', color: 'bg-blue-500/20 text-blue-400' },
        { icon: Heart, text: 'Shape Features', color: 'bg-rose-500/20 text-rose-400' },
        { icon: Rocket, text: 'Early-Supporter', color: 'bg-purple-500/20 text-purple-400' },
        { icon: Sparkles, text: 'Direct Access', color: 'bg-emerald-500/20 text-emerald-400' }
      ],
      cta: 'Join Waitlist',
      transparency: 'Development ongoing: Backend 85% · Frontend 70%'
    }
  }[locale];

  return (
    <section className="relative py-32 bg-[#081410] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-emerald-500/20 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/15 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          className="p-12 sm:p-20 rounded-[3rem] border border-white/10 bg-white/[0.06] backdrop-blur-3xl overflow-hidden shadow-2xl relative"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-noise opacity-10" />
          
          <div className="relative z-10 text-center space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-md mx-auto">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400/80">{content.badge}</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-light tracking-tighter leading-[0.9]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {content.title}
              </h2>
              <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
                {content.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content.features.map((feature, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4 text-center group hover:bg-white/10 transition-colors">
                  <div className={`w-12 h-12 rounded-2xl ${feature.color} mx-auto flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/60">{feature.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-8 flex flex-col items-center gap-8">
              <motion.a
                href="#waitlist"
                className="px-12 py-5 rounded-2xl bg-white text-black font-bold hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl flex items-center gap-3"
                whileHover={{ y: -5 }}
              >
                <Users className="w-5 h-5" />
                <span>{content.cta}</span>
              </motion.a>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">{content.transparency}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
