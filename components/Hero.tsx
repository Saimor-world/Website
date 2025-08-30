'use client';
import { motion } from 'framer-motion';

export default function Hero({ heading, sub, cta, locale } : { heading: string; sub: string; cta: string; locale: 'de'|'en' }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-6xl tracking-tight"
        >
          {heading}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 text-balance text-lg md:text-xl text-white/80"
        >
          {sub}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <a href="#kontakt" className="px-5 py-3 rounded-full bg-gold text-navy font-medium hover:brightness-110 transition">
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
