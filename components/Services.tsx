'use client';
import Link from 'next/link';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Users } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const Services = memo(function Services({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const items = [
    {
      key: 'mora',
      icon: Sparkles,
      title: t('Môra', 'Môra'),
      subtitle: t('Deine KI-Begleiterin', 'Your AI Companion'),
      desc: t('Môra navigiert mit dir durch Komplexität zur klaren Handlung – über Dashboard, Web & Voice. Real-time Insights, Handlungsempfehlungen, immer an deiner Seite.', 'Môra navigates with you through complexity to clear action – via Dashboard, Web & Voice. Real-time insights, action recommendations, always by your side.'),
      benefits: [
        t('Cross-Channel: Dashboard · Web · Voice', 'Cross-Channel: Dashboard · Web · Voice'),
        t('Real-time KPI-Insights & Empfehlungen', 'Real-time KPI insights & recommendations'),
        t('Backend 85% fertig – Jetzt verfügbar', 'Backend 85% ready – Available now')
      ],
      href: '#mora-showcase',
      cta: t('Môra kennenlernen', 'Meet Môra'),
      secondaryCta: t('Early Access', 'Early Access'),
      secondaryHref: '#waitlist',
      featured: true,
      gradient: 'from-[#D4B483] via-[#8BB581] to-[#4A6741]'
    },
    {
      key: 'orbit',
      icon: Zap,
      title: t('Orbit', 'Orbit'),
      subtitle: t('Rhythmus statt Meetings', 'Rhythm instead of Meetings'),
      desc: t('Systematische Begleitung im klaren Takt. Verlässlicher Resonanzraum für Entscheidungen – mit Môra als intelligente Unterstützung.', 'Systematic guidance in clear rhythm. Reliable resonance space for decisions – with Môra as intelligent support.'),
      benefits: [
        t('Resonanzraum für klare Entscheidungen', 'Resonance space for clear decisions'),
        t('Tiefe statt Hektik, nachhaltig', 'Depth instead of rush, sustainable'),
        t('1-6 Monate · Môra-unterstützt', '1-6 months · Môra-supported')
      ],
      href: '/orbit',
      cta: t('Mehr erfahren', 'Learn more'),
      secondaryCta: t('Klarheitsgespräch', 'Clarity call'),
      secondaryHref: 'https://cal.com/saimor/30min',
      gradient: 'from-[#4A6741] to-[#8BB581]'
    },
    {
      key: 'pulse',
      icon: Users,
      title: t('Pulse', 'Pulse'),
      subtitle: t('Impulse für Klarheit', 'Impulses for Clarity'),
      desc: t('Workshops, Keynotes, stille Räume – Klarheit genau dort, wo sie gebraucht wird. Môra bereitet vor, wertet aus, begleitet nach.', 'Workshops, keynotes, silent spaces – clarity exactly where needed. Môra prepares, evaluates, follows up.'),
      benefits: [
        t('Energie & Fokus in Veränderung', 'Energy & focus in change'),
        t('Workshop (3h) · Keynote (45min)', 'Workshop (3h) · Keynote (45min)'),
        t('Môra-Vorbereitung & Follow-up', 'Môra preparation & follow-up')
      ],
      href: '/pulse',
      cta: t('Mehr erfahren', 'Learn more'),
      secondaryCta: t('Format anfragen', 'Request format'),
      secondaryHref: 'https://cal.com/saimor/30min',
      gradient: 'from-[#8BB581] to-[#D4B483]'
    }
  ];

  return (
    <section id="angebot" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #8BB581 30%, #D4B483 70%, #E6C897 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('Wie Môra dich begleitet', 'How Môra Guides You')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('Drei Wege, wie Môra Klarheit in deinen Alltag bringt – technisch präzise, menschlich tief.', 'Three ways Môra brings clarity to your daily life – technically precise, humanly deep.')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.article
              key={item.key}
              className="relative group overflow-hidden rounded-3xl backdrop-blur-xl"
              style={{
                background: item.featured
                  ? 'linear-gradient(135deg, rgba(212, 180, 131, 0.15) 0%, rgba(139, 181, 129, 0.12) 50%, rgba(74, 103, 65, 0.15) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(212, 180, 131, 0.05) 100%)',
                border: item.featured
                  ? '2px solid rgba(212, 180, 131, 0.4)'
                  : '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: item.featured
                  ? '0 20px 60px rgba(212, 180, 131, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(212, 180, 131, 0.2)'
                  : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: item.featured
                  ? '0 30px 80px rgba(212, 180, 131, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 2px rgba(212, 180, 131, 0.3)'
                  : '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Animated Gradient Background */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${item.gradient})`,
                  filter: 'blur(60px)'
                }}
                animate={{
                  opacity: [0.2, 0.35, 0.2],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradient})`,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title & Subtitle */}
                <h3
                  className="text-3xl font-bold mb-2 text-white"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {item.title}
                </h3>
                <h4 className="text-base font-semibold mb-4 text-gray-300">
                  {item.subtitle}
                </h4>

                <p className="text-sm text-gray-200 mb-6 leading-relaxed flex-1">
                  {item.desc}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-6">
                  {item.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-200"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + i * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#D4B483] to-[#8BB581] mt-1.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="space-y-3">
                  <Link
                    href={item.href}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all backdrop-blur-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(212, 180, 131, 0.15) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {item.cta}
                  </Link>

                  <a
                    href={item.secondaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all backdrop-blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${item.gradient})`,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 24px rgba(212, 180, 131, 0.3)'
                    }}
                  >
                    {item.secondaryCta}
                  </a>
                </div>
              </div>

              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)'
                }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Services;
