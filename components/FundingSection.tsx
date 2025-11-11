'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const FundingSection = memo(function FundingSection({ locale }: Props) {
  const content = {
    de: {
      title: 'Förderlogik',
      subtitle: 'Pre-Seed Baden-Württemberg',
      intro: 'Saimôr wird im Rahmen der Pre-Seed-Förderung Baden-Württemberg entwickelt:',
      split: {
        public: '85% Öffentliche Mittel',
        publicDesc: 'Vom Land Baden-Württemberg',
        private: '15% Co-Investment',
        privateDesc: 'Eigenkapital & Partner'
      },
      note: 'Diese Information dient der Transparenz und stellt keine Rechtsberatung dar.',
      details: 'Detaillierte Informationen zur Förderung sind im Dossier verfügbar oder können auf Anfrage bereitgestellt werden.',
      cta: 'Mehr erfahren'
    },
    en: {
      title: 'Funding Structure',
      subtitle: 'Pre-Seed Baden-Württemberg',
      intro: 'Saimôr is being developed as part of the Pre-Seed funding program Baden-Württemberg:',
      split: {
        public: '85% Public Funding',
        publicDesc: 'From the State of Baden-Württemberg',
        private: '15% Co-Investment',
        privateDesc: 'Equity & Partners'
      },
      note: 'This information is for transparency purposes and does not constitute legal advice.',
      details: 'Detailed funding information is available in the dossier or upon request.',
      cta: 'Learn more'
    }
  }[locale];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #f8faf9 0%, #ffffff 50%, #f8faf9 100%)'
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-sm uppercase tracking-wider text-[#D4B483] font-semibold mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {content.subtitle}
          </motion.p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.intro}
          </p>
        </motion.div>

        {/* Funding Split */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* 85% Public */}
          <motion.div
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.08) 0%, rgba(74, 103, 65, 0.03) 100%)',
              border: '2px solid rgba(74, 103, 65, 0.2)',
              boxShadow: '0 8px 24px rgba(74, 103, 65, 0.1)'
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: '#4A6741' }}>
              85%
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {content.split.public}
            </h3>
            <p className="text-gray-600">
              {content.split.publicDesc}
            </p>
          </motion.div>

          {/* 15% Private */}
          <motion.div
            className="rounded-2xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.08) 0%, rgba(212, 180, 131, 0.03) 100%)',
              border: '2px solid rgba(212, 180, 131, 0.2)',
              boxShadow: '0 8px 24px rgba(212, 180, 131, 0.1)'
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: '#D4B483' }}>
              15%
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {content.split.private}
            </h3>
            <p className="text-gray-600">
              {content.split.privateDesc}
            </p>
          </motion.div>
        </div>

        {/* Details Note */}
        <motion.div
          className="rounded-xl p-6 flex items-start gap-4"
          style={{
            background: 'rgba(212, 180, 131, 0.05)',
            border: '1px solid rgba(212, 180, 131, 0.2)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Info className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 mb-2">
              {content.details}
            </p>
            <p className="text-xs text-gray-500 italic">
              {content.note}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default FundingSection;
