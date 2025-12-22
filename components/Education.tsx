'use client';
import { motion } from 'framer-motion';
import { GraduationCap, Users, BarChart3, Heart, CheckCircle } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

export default function Education({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const solutions = [
    {
      icon: Users,
      title: t('Pulse Workshop', 'Pulse Workshop'),
      subtitle: t('"Digitaler Wandel"', '"Digital Transformation"'),
      duration: t('3h intensiv für Lehrerkollegium', '3h intensive for teaching staff'),
      color: '#D4A857'
    },
    {
      icon: BarChart3,
      title: t('Systems Dashboard', 'Systems Dashboard'),
      subtitle: t('"Schul-Klima"', '"School Climate"'),
      duration: t('Aggregierte Stimmung & Feedback (DSGVO-konform)', 'Aggregated mood & feedback (GDPR-compliant)'),
      color: '#5D7C54'
    },
    {
      icon: Heart,
      title: t('Orbit Begleitung', 'Orbit Guidance'),
      subtitle: t('"Schulentwicklung"', '"School Development"'),
      duration: t('3-6 Monate kontinuierlicher Support', '3-6 months continuous support'),
      color: '#4A6741'
    }
  ];

  const testimonials = [
    {
      quote: t(
        'Saimôr hat uns geholfen, digitale Transformation greifbar zu machen – für Lehrer UND Schüler.',
        'Saimôr helped us make digital transformation tangible – for teachers AND students.'
      ),
      author: t('Schulleitung Gymnasium', 'School Management High School'),
      location: t('Musterstadt', 'Sample City')
    },
    {
      quote: t(
        'Der Workshop hat unserem Kollegium Klarheit gegeben. Wir wissen jetzt, wo wir ansetzen.',
        'The workshop gave our staff clarity. We now know where to start.'
      ),
      author: t('Realschule', 'Secondary School'),
      location: t('Bayern', 'Bavaria')
    }
  ];

  const examples = [
    {
      title: t('Realschule Bayern', 'Secondary School Bavaria'),
      desc: t('Von Überforderung zu Klarheit', 'From overwhelm to clarity'),
      duration: t('6 Monate Orbit', '6 months Orbit'),
      icon: CheckCircle,
      color: '#4A6741'
    },
    {
      title: t('Grundschule NRW', 'Primary School NRW'),
      desc: t('Eltern-Lehrer-Dialog neu gestaltet', 'Parent-teacher dialogue redesigned'),
      duration: t('Pulse Workshop', 'Pulse Workshop'),
      icon: CheckCircle,
      color: '#D4A857'
    },
    {
      title: t('Berufsschule BW', 'Vocational School BW'),
      desc: t('Digitales Dashboard für Schüler-Feedback', 'Digital dashboard for student feedback'),
      duration: t('Systems', 'Systems'),
      icon: CheckCircle,
      color: '#5D7C54'
    }
  ];

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF0E6 0%, #F8F5F0 50%, #EAF1EC 100%)'
      }}
    >
      {/* Organic Background Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74, 103, 65, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          y: [-20, 20, -20],
          x: [0, 30, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.12) 0%, rgba(212, 180, 131, 0.15) 100%)',
              border: '1px solid rgba(212, 180, 131, 0.3)'
            }}
            whileHover={{ scale: 1.05 }}
          >
            <GraduationCap className="w-6 h-6 text-saimor-green" />
            <span className="font-bold text-saimor-green text-sm tracking-wide">
              {t('BILDUNG & SCHULEN', 'EDUCATION & SCHOOLS')}
            </span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('Klarheit für Bildung', 'Clarity for Education')}
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t(
              'Schulen und Bildungseinrichtungen brauchen klare Wege durch den Wandel',
              'Schools and educational institutions need clear paths through transformation'
            )}
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {solutions.map((solution, i) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative p-6 sm:p-8 rounded-3xl overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 245, 240, 0.9) 100%)',
                  border: `2px solid ${solution.color}40`,
                  boxShadow: `0 10px 30px ${solution.color}15`
                }}
              >
                {/* Hover Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle at top, ${solution.color}15 0%, transparent 70%)`
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${solution.color}20 0%, ${solution.color}10 100%)`,
                      border: `2px solid ${solution.color}40`
                    }}
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={32} style={{ color: solution.color }} />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-1 text-slate-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {solution.title}
                  </h3>
                  <h4 className="text-base font-semibold mb-3" style={{ color: solution.color }}>
                    {solution.subtitle}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {solution.duration}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              color: '#4A6741'
            }}
          >
            {t('Stimmen aus der Praxis', 'Voices from Practice')}
          </h3>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-6 sm:p-8 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 245, 240, 0.8) 100%)',
                  border: '1px solid rgba(74, 103, 65, 0.2)',
                  boxShadow: '0 8px 20px rgba(74, 103, 65, 0.08)'
                }}
              >
                <div className="absolute top-6 left-6 text-6xl text-saimor-gold opacity-20" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  &ldquo;
                </div>
                <p className="text-base sm:text-lg italic text-slate-700 mb-6 relative z-10 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {testimonial.quote}
                </p>
                <div className="relative z-10">
                  <p className="font-semibold text-saimor-green">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Praxis-Beispiele */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              color: '#4A6741'
            }}
          >
            {t('Praxis-Beispiele', 'Practice Examples')}
          </h3>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {examples.map((example, i) => {
              const Icon = example.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 245, 240, 0.9) 100%)',
                    border: `1px solid ${example.color}30`,
                    boxShadow: `0 4px 15px ${example.color}10`
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Icon size={20} style={{ color: example.color, flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <h4 className="font-bold text-sm mb-1 text-slate-900">{example.title}</h4>
                      <p className="text-xs text-slate-600 mb-2">{example.desc}</p>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: `${example.color}20`, color: example.color }}>
                        {example.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="https://cal.com/saimor/30min"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-10 py-5 rounded-3xl font-bold text-lg text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
              boxShadow: '0 15px 40px rgba(74, 103, 65, 0.3)',
              border: '2px solid rgba(212, 180, 131, 0.4)'
            }}
          >
            {t('Gespräch über Bildungslösungen buchen', 'Book conversation about education solutions')}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
