'use client';
import { motion } from 'framer-motion';
import { Quote, Building2, Users, TrendingUp } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

export default function Testimonials({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FAF0E6 0%, #F8F5F0 100%)' }}>
      <div className="relative mx-auto max-w-7xl px-6 z-10 text-center">      
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 50%, #D4A857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('Transparenz & Wahrheit', 'Transparency & Truth')}
          </h2>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            {t('Wir verzichten an dieser Stelle auf künstlich generierte Erfolgsgeschichten. SAIMÔR ist ein wachsendes Ökosystem. Jedes Projekt ist individuell und wir bauen auf echtes Vertrauen statt auf Marketing-Prosa.', 
               'We intentionally avoid artificially generated success stories here. SAIMÔR is a growing ecosystem. Every project is individual, and we build on real trust instead of marketing prose.')}
          </p>
          <div className="h-1 w-24 bg-saimor-gold/30 mx-auto rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
