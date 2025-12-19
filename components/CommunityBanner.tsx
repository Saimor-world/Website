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
        { icon: Users, text: 'Früher Zugang zu Môra', color: 'from-blue-500 to-cyan-500' },
        { icon: Heart, text: 'Gemeinsam Funktionen schärfen', color: 'from-pink-500 to-rose-500' },
        { icon: Rocket, text: 'Ruhiger Start als Early Supporter', color: 'from-purple-500 to-indigo-500' },
        { icon: Sparkles, text: 'Direkter Kontakt zum Team', color: 'from-amber-500 to-orange-500' }
      ],
      status: 'Im Aufbau: Backend 85 % · Frontend 70 % · Communitystart: laufend',
      cta: 'Warteliste beitreten',
      secondary: 'Mehr erfahren',
      transparency: 'Technische Entwicklung läuft – wir halten dich ruhig auf dem Laufenden.'
    },
    en: {
      badge: 'Early Access',
      title: 'Join the Saimôr community',
      subtitle: 'We are building Saimôr together with you. Calmly and step by step.',
      features: [
        { icon: Users, text: 'Early access to Môra', color: 'from-blue-500 to-cyan-500' },
        { icon: Heart, text: 'Shape Features with Us', color: 'from-pink-500 to-rose-500' },
        { icon: Rocket, text: 'Early-Supporter Benefits', color: 'from-purple-500 to-indigo-500' },
        { icon: Sparkles, text: 'Direct Team Access', color: 'from-amber-500 to-orange-500' }
      ],
      status: 'In development: backend 85 % · frontend 70 % · community launch: ongoing',
      cta: 'Join Waitlist',
      secondary: 'Learn More',
      transparency: 'Technical development is ongoing – we will keep you gently informed.'
    }
  }[locale];

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A6741]/5 via-[#D4A857]/10 to-[#4A6741]/5" />

      {/* Organic floating shapes */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#D4A857]/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#4A6741]/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div
        className="max-w-5xl mx-auto px-6 py-12 lg:py-16 relative z-10 rounded-[3rem]"
        style={{
          ...glassPanelStyle,
          background: 'linear-gradient(135deg, rgba(10, 22, 18, 0.8) 0%, rgba(10, 22, 18, 0.4) 100%)',
          border: '1px solid rgba(212, 180, 131, 0.25)',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4A6741] to-[#D4A857] text-white font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            {content.badge}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 30%, #D4A857 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.title}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {content.features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-[2rem] transition-all hover:-translate-y-1"
              style={glassTileStyle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-medium text-white">
                  {feature.text}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transparency Banner */}
        <motion.div
          className="mb-8 p-4 rounded-xl text-white"
          style={glassTileStyle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center">
            <p className="text-sm font-medium text-white mb-2">
              {content.transparency}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {content.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <motion.a
            href="#waitlist"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#4A6741] to-[#D4A857] text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow flex items-center gap-3"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-5 h-5" />
            {content.cta}
          </motion.a>

          <motion.a
            href="https://cal.com/saimor/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-full border-2 border-[#D4A857] text-[#4A6741] font-semibold text-lg hover:bg-[#D4A857]/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.secondary}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
