'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Database, TrendingUp, Shield, Layers, BarChart3, Activity } from 'lucide-react';

export default function SystemsPage() {
  const benefits = [
    { icon: Database, text: 'Verständliche Datenlösungen', color: '#4A6741' },
    { icon: TrendingUp, text: 'Aggregierte Insights statt Überforderung', color: '#5D7C54' },
    { icon: Shield, text: 'Entscheidungen mit Vertrauen', color: '#D4B483' }
  ];

  const packages = [
    {
      name: 'Nova',
      icon: Layers,
      kpis: '3 KPIs',
      frequency: 'Monatsreport',
      color: '#8BB581',
      description: 'Kompakt & klar – die wichtigsten Metriken auf einen Blick'
    },
    {
      name: 'Horizon',
      icon: BarChart3,
      kpis: '6 KPIs',
      frequency: 'Wochenreport',
      color: '#4A6741',
      description: 'Wöchentliche Orientierung für kontinuierliche Verbesserung'
    },
    {
      name: 'Solara',
      icon: Activity,
      kpis: '12+ KPIs',
      frequency: 'Tägliche Insights mit Handlungsempfehlungen',
      color: '#D4B483',
      description: 'Umfassende Transparenz mit KI-gestützten Empfehlungen'
    }
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
          className="absolute top-1/4 right-1/6 w-80 h-80 rounded-full opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/5 w-96 h-96 rounded-full opacity-15 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139, 181, 129, 0.5) 0%, transparent 70%)',
            filter: 'blur(70px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 25, 0],
            y: [0, -35, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Data particles flowing */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? 'rgba(212, 180, 131, 0.7)' : i % 3 === 1 ? 'rgba(139, 181, 129, 0.6)' : 'rgba(230, 200, 151, 0.5)',
              left: `${10 + i * 11}%`,
              top: `${20 + (i % 3) * 20}%`,
              boxShadow: '0 0 12px currentColor'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              scale: [1, 1.4, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
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
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(212,180,131,0.15) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,180,131,0.4)'
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white/90 font-semibold text-sm tracking-wide">SYSTEMS</span>
            </motion.div>

            <h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl mb-8 text-white leading-tight"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                textShadow: '0 4px 12px rgba(0,0,0,0.4)'
              }}
            >
              Daten, die Klarheit schaffen
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-8"
               style={{
                 fontFamily: 'Cormorant Garamond, serif',
                 textShadow: '0 2px 8px rgba(0,0,0,0.3)'
               }}>
              Systems verbindet Daten, Dashboards & KI – immer menschenzentriert.<br/>
              Ziel ist nicht Kontrolle, sondern Orientierung.
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
        {/* Background decoration */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 pointer-events-none"
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
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Nutzen
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
                  border: '1px solid rgba(212,180,131,0.3)',
                  boxShadow: '0 20px 40px rgba(74,103,65,0.1)'
                }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                     style={{
                       background: 'radial-gradient(circle at center, rgba(212,180,131,0.1) 0%, transparent 70%)'
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

          {/* Packages Section */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl mb-6 text-center"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Packages
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-slate-600 mb-12 text-lg"
          >
            Wählen Sie das passende Package für Ihre Bedürfnisse
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  boxShadow: `0 30px 60px ${pkg.color}30`
                }}
                className="relative p-8 rounded-[2rem] overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,245,240,0.95) 100%)',
                  border: `2px solid ${pkg.color}40`,
                  boxShadow: '0 25px 50px rgba(74,103,65,0.12)'
                }}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${pkg.color}15 0%, transparent 60%)`
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-20 h-20 mb-6 mx-auto rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${pkg.color}25 0%, ${pkg.color}15 100%)`,
                      border: `2px solid ${pkg.color}50`
                    }}
                    whileHover={{ rotate: [0, 360], scale: 1.15 }}
                    transition={{ duration: 0.8 }}
                  >
                    <pkg.icon size={36} style={{ color: pkg.color }} />
                  </motion.div>

                  <h3
                    className="text-3xl font-bold mb-3 text-center"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      color: pkg.color
                    }}
                  >
                    {pkg.name}
                  </h3>

                  <div className="text-center mb-4">
                    <span className="text-lg font-semibold text-slate-700">{pkg.kpis}</span>
                    <span className="text-slate-500 mx-2">·</span>
                    <span className="text-slate-600">{pkg.frequency}</span>
                  </div>

                  <p className="text-center text-slate-600 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DSGVO Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-10 rounded-[3rem] mb-20 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.08) 0%, rgba(212, 180, 131, 0.12) 50%, rgba(74, 103, 65, 0.06) 100%)',
              border: '2px solid rgba(212, 180, 131, 0.4)',
              boxShadow: '0 25px 50px rgba(74, 103, 65, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)'
            }}
          >
            {/* Shield icon */}
            <motion.div
              className="absolute top-8 left-8 opacity-10"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Shield size={80} className="text-saimor-green" />
            </motion.div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield size={28} className="text-saimor-green" />
                <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Datenschutz: DSGVO-Guardrails
                </h3>
              </div>

              <div className="max-w-3xl mx-auto">
                <ul className="space-y-3 text-lg text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-saimor-green mt-2 flex-shrink-0" />
                    <span>Ausschließlich aggregierte Geschäftsdaten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-saimor-green mt-2 flex-shrink-0" />
                    <span>EU-Hosting (Frankfurt & Amsterdam)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-saimor-green mt-2 flex-shrink-0" />
                    <span>Mindestgruppengröße 5 – keine personenbezogenen Profile</span>
                  </li>
                </ul>
              </div>
            </div>
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
                border: '2px solid rgba(212,180,131,0.5)'
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(212,180,131,0.3) 0%, transparent 60%)',
                    'radial-gradient(circle at 80% 50%, rgba(212,180,131,0.3) 0%, transparent 60%)',
                    'radial-gradient(circle at 20% 50%, rgba(212,180,131,0.3) 0%, transparent 60%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <span className="relative z-10">Einblick in Systems erhalten</span>
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
