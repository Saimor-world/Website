'use client';
import { motion } from 'framer-motion';
import { Sparkles, Brain, TrendingUp, MessageCircle } from 'lucide-react';

type Locale = 'de' | 'en';

interface MoraIntroProps {
  locale: Locale;
}

export default function MoraIntro({ locale }: MoraIntroProps) {
  const content = {
    de: {
      subtitle: 'Lernen Sie Môra kennen',
      title: 'Deine KI-Begleiterin',
      intro: 'Hallo, ich bin Môra.',
      description: 'Ich helfe dir, Muster in deinen Daten zu erkennen und das Wesentliche zu fokussieren – damit du dich auf das Menschliche konzentrieren kannst.',
      features: [
        {
          icon: Brain,
          title: 'Intelligente Analyse',
          text: 'Ich analysiere komplexe Daten im Hintergrund und präsentiere dir täglich klare Insights statt Datenflut.'
        },
        {
          icon: MessageCircle,
          title: 'Die richtigen Fragen',
          text: 'Ich stelle die Fragen, die zählen, und gebe Handlungsempfehlungen für fundierte Entscheidungen.'
        },
        {
          icon: TrendingUp,
          title: 'Orientierungs-Kompass',
          text: 'Ich bin kein Kontrollinstrument, sondern dein verlässlicher Kompass im Wandel.'
        }
      ],
      cta: 'Môra im Systems-Dashboard erleben',
      note: 'Verfügbar in den Systems-Paketen Horizon & Solara'
    },
    en: {
      subtitle: 'Meet Môra',
      title: 'Your AI Companion',
      intro: 'Hello, I\'m Môra.',
      description: 'I help you recognize patterns in your data and focus on what matters – so you can concentrate on the human side.',
      features: [
        {
          icon: Brain,
          title: 'Intelligent Analysis',
          text: 'I analyze complex data in the background and present clear insights instead of data overload.'
        },
        {
          icon: MessageCircle,
          title: 'The Right Questions',
          text: 'I ask the questions that matter and provide actionable recommendations for informed decisions.'
        },
        {
          icon: TrendingUp,
          title: 'Orientation Compass',
          text: 'I\'m not a control tool, but your reliable compass in transformation.'
        }
      ],
      cta: 'Experience Môra in Systems Dashboard',
      note: 'Available in Systems packages Horizon & Solara'
    }
  }[locale];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Unsplash background with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop')"
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.03) 0%, rgba(212, 180, 131, 0.05) 100%)'
          }}
        />
      </div>

      {/* Ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-64 h-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm uppercase tracking-wider text-[#D4B483] font-semibold mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {content.subtitle}
          </motion.p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {content.title}
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Animated Orb Avatar - ENHANCED */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
            style={{ perspective: '1000px' }}
          >
            {/* Mega outer glow rings - multiple layers */}
            <motion.div
              className="absolute w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212, 180, 131, 0.3) 0%, rgba(74, 103, 65, 0.15) 50%, transparent 70%)',
                filter: 'blur(60px)'
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.5, 0.2],
                rotate: 360
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
            <motion.div
              className="absolute w-80 h-80 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212, 180, 131, 0.2) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* Middle ring */}
            <motion.div
              className="absolute w-64 h-64 rounded-full border-2 border-[#D4B483]/30"
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* Core orb */}
            <motion.div
              className="relative w-48 h-48 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.9) 0%, rgba(212, 180, 131, 0.8) 100%)',
                boxShadow: '0 20px 60px rgba(212, 180, 131, 0.4), inset 0 2px 20px rgba(255, 255, 255, 0.2)'
              }}
              animate={{
                boxShadow: [
                  '0 20px 60px rgba(212, 180, 131, 0.4), inset 0 2px 20px rgba(255, 255, 255, 0.2)',
                  '0 25px 80px rgba(212, 180, 131, 0.6), inset 0 2px 30px rgba(255, 255, 255, 0.3)',
                  '0 20px 60px rgba(212, 180, 131, 0.4), inset 0 2px 20px rgba(255, 255, 255, 0.2)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Inner sparkle */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }}
              >
                <Sparkles className="w-16 h-16 text-white" strokeWidth={1.5} />
              </motion.div>

              {/* Orbiting particles */}
              {[0, 120, 240].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-white/80"
                  style={{
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((angle * Math.PI) / 180) * 80,
                    y: Math.sin((angle * Math.PI) / 180) * 80
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: 'linear', delay: i * 0.3 }
                  }}
                />
              ))}
            </motion.div>

            {/* Floating data nodes */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`node-${i}`}
                className="absolute w-2 h-2 rounded-full bg-[#D4B483]/60"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  boxShadow: '0 0 8px rgba(212, 180, 131, 0.6)'
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Greeting */}
            <div className="space-y-3">
              <p
                className="text-2xl font-semibold text-[#4A6741]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {content.intro}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {content.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex gap-4 items-start p-4 rounded-xl bg-white/50 border border-[#D4B483]/20 hover:border-[#D4B483]/40 transition-all"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#4A6741] to-[#D4B483] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#4A6741] mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.a
                href="/systems"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#4A6741] to-[#D4B483] shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                {content.cta}
              </motion.a>
              <p className="text-xs text-gray-500 mt-3 italic">{content.note}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
