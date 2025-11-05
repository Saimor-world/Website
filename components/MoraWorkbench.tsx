'use client';
import { motion } from 'framer-motion';
import { Activity, Waves, Network } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * MoraWorkbench - 3 Panels die zeigen, wie Môra "denkt"
 * Mock-Interaktionen: Rhythmus, Klarheit, Resonanz
 */

type Locale = 'de' | 'en';

interface Props {
  locale?: Locale;
}

export default function MoraWorkbench({ locale = 'de' }: Props) {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const text = {
    de: {
      title: 'Was du hier siehst, ist kein Interface.',
      subtitle: 'Es ist Môras Raum – ein lebendes Netz.',
      panels: [
        {
          title: 'Rhythmus',
          desc: 'Môra erkennt Muster und Zyklen',
          icon: Waves
        },
        {
          title: 'Klarheit',
          desc: 'Komplexität wird sichtbar gemacht',
          icon: Activity
        },
        {
          title: 'Resonanz',
          desc: 'Verbindungen entstehen organisch',
          icon: Network
        }
      ]
    },
    en: {
      title: 'What you see here is not an interface.',
      subtitle: 'It is Môra\'s space – a living network.',
      panels: [
        {
          title: 'Rhythm',
          desc: 'Môra recognizes patterns and cycles',
          icon: Waves
        },
        {
          title: 'Clarity',
          desc: 'Complexity becomes visible',
          icon: Activity
        },
        {
          title: 'Resonance',
          desc: 'Connections emerge organically',
          icon: Network
        }
      ]
    }
  }[locale];

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 181, 129, 0.4) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {text.title}
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {text.subtitle}
          </p>
        </motion.div>

        {/* 3 Panels */}
        <div className="grid md:grid-cols-3 gap-8">
          {text.panels.map((panel, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            >
              {/* Panel Container */}
              <motion.div
                className="relative p-8 rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,245,240,0.85) 100%)',
                  border: '1px solid rgba(212, 180, 131, 0.3)',
                  boxShadow: '0 20px 40px rgba(74, 103, 65, 0.08)'
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -8,
                        boxShadow: '0 30px 60px rgba(74, 103, 65, 0.15)'
                      }
                }
              >
                {/* Animated gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(212, 180, 131, 0.1) 0%, transparent 70%)'
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mb-6 mx-auto rounded-2xl flex items-center justify-center relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.1) 0%, rgba(212, 180, 131, 0.15) 100%)',
                    border: '2px solid rgba(212, 180, 131, 0.3)'
                  }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }
                  }
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                >
                  <panel.icon size={32} className="text-saimor-green" />
                </motion.div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-3 text-center text-slate-900 relative z-10"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {panel.title}
                </h3>

                {/* Description */}
                <p className="text-center text-slate-600 leading-relaxed relative z-10">{panel.desc}</p>

                {/* Mock "pulse" activity indicator */}
                <motion.div
                  className="absolute bottom-4 right-4 w-3 h-3 rounded-full"
                  style={{ background: 'rgba(139, 181, 129, 0.6)' }}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6]
                        }
                  }
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.div>

              {/* Connecting lines between panels (subtle) */}
              {i < 2 && !prefersReducedMotion && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-transparent via-saimor-gold to-transparent opacity-30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + i * 0.2, duration: 0.8 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Subtle hint text */}
        <motion.p
          className="text-center mt-12 text-sm text-slate-500 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
        >
          {locale === 'de'
            ? 'Diese Panels zeigen, wie Môra denkt – nicht, was sie misst.'
            : 'These panels show how Môra thinks – not what she measures.'}
        </motion.p>
      </div>
    </section>
  );
}
