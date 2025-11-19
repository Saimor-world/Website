'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

type Props = { locale: 'de' | 'en' };

const FundingSection = memo(function FundingSection({ locale }: Props) {
  const content = {
    de: {
      title: 'F\u00f6rderoptionen in Pr\u00fcfung',
      subtitle: 'F\u00f6rderoptionen werden gepr\u00fcft \u2013 aktuell fokussieren wir die Prototyp-Entwicklung.',
      points: [
        'Gespr\u00e4che mit F\u00f6rderstellen laufen transparent und ohne Zeitdruck.',
        'Wir teilen Entscheidungen erst, wenn Zusagen schriftlich vorliegen.'
      ],
      note: 'Bis dahin konzentrieren wir uns auf den Wert f\u00fcr Pilot:innen und die Weiterentwicklung des MVP.'
    },
    en: {
      title: 'Funding Options Under Review',
      subtitle: 'Funding options are under review \u2013 right now we focus on the prototype development.',
      points: [
        'Conversations with funding bodies stay transparent and unhurried.',
        'We communicate decisions only after final written confirmations.'
      ],
      note: 'Until then we focus on pilot value and the ongoing MVP work.'
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
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4A857 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="rounded-3xl p-8 md:p-10 max-w-3xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(74,103,65,0.08) 0%, rgba(212,168,87,0.08) 100%)',
            border: '1px solid rgba(212,168,87,0.3)',
            boxShadow: '0 12px 36px rgba(10, 22, 18, 0.12)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-4 mb-4">
            <Info className="w-5 h-5 text-[#D4A857] flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-left space-y-3 text-gray-700">
              {content.points.map((point, idx) => (
                <p key={idx} className="text-base leading-relaxed">
                  {point}
                </p>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 italic text-left">{content.note}</p>
        </motion.div>
      </div>
    </section>
  );
});

export default FundingSection;
