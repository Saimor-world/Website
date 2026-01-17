'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, Repeat, Sparkles, Target, Heart } from 'lucide-react';

export default function OrbitPage() {
  const benefits = [
    { icon: Target, text: 'Regelmäßige Orientierung statt Meeting-Overload', color: '#4A6741' },
    { icon: Heart, text: 'Tiefe statt Hektik', color: '#5D7C54' },
    { icon: Sparkles, text: 'Kontinuität im Wandel', color: '#D4A857' }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FAF0E6 0%, #F8F5F0 50%, #FAF0E6 100%)' }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[70vh] flex items-center"
        style={{
          background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 30%, rgba(212, 180, 131, 0.3) 60%, rgba(74, 103, 65, 0.95) 100%)'
        }}
      >
        {/* Organic Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 30, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(102, 153, 102, 0.5) 0%, transparent 70%)',
            filter: 'blur(70px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, -25, 0],
            y: [0, 35, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: i % 2 === 0 ? 'rgba(212, 180, 131, 0.6)' : 'rgba(230, 200, 151, 0.5)',
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              boxShadow: '0 0 15px rgba(212, 180, 131, 0.5)'
            }}
            animate={{
              y: [-20, 20, -20],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-block mb-6 px-6 py-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(212,168,87,0.15) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,168,87,0.4)'
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white/90 font-semibold text-sm tracking-wide">ORBIT</span>
            </motion.div>

            <h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl mb-8 text-white leading-tight"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                textShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}
            >
              Rhythmus statt Meetings
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8"
               style={{
                 fontFamily: 'Cormorant Garamond, serif',
                 textShadow: '0 2px 8px rgba(0,0,0,0.3)'
               }}>
              Systematische Begleitung für wiederkehrende Transformation. Ein natürlicher Rhythmus, der Klarheit und Resonanz schafft.
            </p>
          </motion.div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,60 Q300,30 600,50 T1200,60 L1200,120 L0,120 Z"
                  fill="rgba(250,240,230,0.95)" />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        {/* Background elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(74, 103, 65, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl mb-16 text-center"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Was Sie erwartet
          </motion.h2>

          <div className="grid sm:grid-cols-3 gap-8 mb-20">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
                className="relative p-8 rounded-3xl shadow-xl group overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,245,240,0.9) 100%)',
                  border: '1px solid rgba(212,168,87,0.3)',
                  boxShadow: '0 20px 40px rgba(74,103,65,0.1)'
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                     style={{
                       background: 'radial-gradient(circle at center, rgba(212,168,87,0.1) 0%, transparent 70%)'
                     }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mb-6 mx-auto rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${benefit.color}20 0%, ${benefit.color}10 100%)`,
                      border: `2px solid ${benefit.color}40`
                    }}
                  >
                    <benefit.icon size={32} style={{ color: benefit.color }} />
                  </motion.div>
                  <p className="text-lg text-center leading-relaxed text-slate-800 font-medium">
                    {benefit.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Format Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6 mb-20"
          >
            {[
              { icon: Clock, title: 'Dauer', desc: '1–6 Monate' },
              { icon: Repeat, title: 'Sessions', desc: 'Regelmäßiger Takt' },
              { icon: Users, title: 'Zielgruppe', desc: 'Teams, Organisationen, Führungskreise' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="text-center p-8 rounded-3xl shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(74,103,65,0.08) 0%, rgba(212,168,87,0.12) 100%)',
                  border: '1px solid rgba(212,168,87,0.3)'
                }}
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-saimor-green" />
                <p className="font-bold text-lg text-saimor-green mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {item.title}
                </p>
                <p className="text-slate-700">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-[3rem] mb-20 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.1) 0%, rgba(212, 180, 131, 0.15) 50%, rgba(74, 103, 65, 0.08) 100%)',
              border: '2px solid rgba(212, 180, 131, 0.4)',
              boxShadow: '0 25px 50px rgba(74, 103, 65, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            <motion.div
              className="absolute top-6 right-8 w-4 h-4 rounded-full"
              style={{ background: 'rgba(212,168,87,0.6)' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <p className="text-2xl sm:text-3xl font-medium text-slate-900 leading-relaxed"
               style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Erst verstehen, dann verändern – <br className="hidden sm:block"/>
              Orbit schafft einen verlässlichen <span className="text-saimor-green font-bold">Resonanzraum</span> für Entscheidungen.
            </p>
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <motion.a
              href="https://cal.com/saimor/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.08,
                y: -6,
                boxShadow: '0 25px 50px rgba(74, 103, 65, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-12 py-6 rounded-3xl font-bold text-xl text-white transition-all duration-300 overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 50%, rgba(212, 180, 131, 0.85) 100%)',
                boxShadow: '0 15px 35px rgba(74, 103, 65, 0.3), inset 0 2px 0 rgba(255,255,255,0.3)',
                border: '2px solid rgba(212,168,87,0.5)'
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(212,168,87,0.3) 0%, transparent 60%)',
                    'radial-gradient(circle at 80% 50%, rgba(212,168,87,0.3) 0%, transparent 60%)',
                    'radial-gradient(circle at 20% 50%, rgba(212,168,87,0.3) 0%, transparent 60%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <span className="relative z-10">Klarheitsgespräch zu Orbit buchen</span>
            </motion.a>

            <Link
              href="/"
              className="flex items-center gap-3 text-lg text-saimor-green hover:text-saimor-gold transition-colors font-semibold"
            >
              <ArrowLeft size={22} />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
