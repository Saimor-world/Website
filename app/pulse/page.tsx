'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Zap, Target, Heart } from 'lucide-react';

export default function PulsePage() {
  const benefits = [
    'Energie & Fokus in Veränderungssituationen',
    'Punktuelle Klärung statt Dauerbelastung',
    'Resonanzräume für Teams & Regionen'
  ];

  const formats = [
    {
      name: 'Workshop „Klarheit im Wandel"',
      duration: '3h',
      icon: Target
    },
    {
      name: 'Keynote „Resonanz statt Rauschen"',
      duration: '30–45 min',
      icon: Zap
    },
    {
      name: 'Stilles Format „Die stille Sprache der Tiefe"',
      duration: '60–90 min',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[60vh] flex items-center"
        style={{
          background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.98) 0%, rgba(58, 82, 49, 0.95) 50%, rgba(74, 103, 65, 0.98) 100%)'
        }}
      >
        {/* Background decoration */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(212, 180, 131, 0.6) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6 text-white"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Pulse – Impulse für Klarheit im Moment
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Pulse sind gezielte Impulsformate: Workshops, Keynotes oder stille Räume. Sie bringen Klarheit genau dorthin, wo sie gebraucht wird.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl mb-12 text-center"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Nutzen
          </motion.h2>

          <div className="space-y-6 mb-16">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-saimor-gold/20 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-2 rounded-full bg-saimor-green mt-2 flex-shrink-0" />
                <p className="text-lg text-slate-700">{benefit}</p>
              </motion.div>
            ))}
          </div>

          {/* Format Examples */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl mb-8 text-center text-slate-800"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Beispiele
          </motion.h3>

          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {formats.map((format, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.05) 0%, rgba(212, 180, 131, 0.08) 100%)',
                  border: '1px solid rgba(212, 180, 131, 0.3)'
                }}
              >
                <format.icon className="w-10 h-10 mx-auto mb-4 text-saimor-green" />
                <h4 className="font-semibold text-lg mb-2 text-slate-900">{format.name}</h4>
                <p className="text-sm text-slate-600">{format.duration}</p>
              </motion.div>
            ))}
          </div>

          {/* Callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl mb-16 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.08) 0%, rgba(212, 180, 131, 0.12) 100%)',
              border: '1px solid rgba(212, 180, 131, 0.3)'
            }}
          >
            <p className="text-xl sm:text-2xl font-medium text-slate-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Pulse setzt Impulse – spürbar, verständlich, wirksam.
            </p>
          </motion.div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              href="https://cal.com/saimor/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 rounded-2xl font-bold text-lg text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 50%, rgba(212, 180, 131, 0.85) 100%)',
                boxShadow: '0 8px 20px rgba(74, 103, 65, 0.3)'
              }}
            >
              Pulse-Format anfragen
            </motion.a>

            <Link
              href="/"
              className="flex items-center gap-2 text-saimor-green hover:text-saimor-gold transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Zurück zur Startseite</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
