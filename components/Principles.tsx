'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Orbits from "./Orbits";

type Props = { locale: 'de' | 'en' }

export default function Principles({ locale }: Props) {
  const items = locale==='de'
    ? ['Ruhe vor Tempo','Tiefe vor Lautstärke','Verantwortung vor Reichweite','Privatheit vor Profil','Schönheit vor Trick']
    : ['Calm before speed','Depth before volume','Responsibility before reach','Privacy before profile','Beauty before trick']

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <section id="prinzipien" className="section relative">
      {/* parallax hinterlegt */}
      <div className="absolute inset-0 opacity-20">
        <svg className="section-orbits" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <g fill="none" className="stroke">
            <path d="M0 200 Q720 60 1440 200" />
            <ellipse cx="960" cy="240" rx="420" ry="120" />
          </g>
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6" ref={ref}>
        <div className="h-px w-full bg-white/10 mb-8" />
        <motion.h2
          className="text-[26px] md:text-[30px] font-medium mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {locale==='de' ? 'Prinzipien' : 'Principles'}
        </motion.h2>

        <motion.div
          className="flex flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {items.map((t, i) => (
            <motion.span
              key={t}
              className="s-pill will-change-transform"
              variants={itemVariants}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
