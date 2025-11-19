'use client';

import { motion } from 'framer-motion';
import { Sparkles, Users } from 'lucide-react';

type Props = {
  locale: 'de' | 'en';
  className?: string;
};

const copy = {
  de: {
    badge: 'Community',
    title: 'Teil von Saimôr werden',
    body: 'Stille Updates, Einladungen, Impulse – wir bauen das Ökosystem gemeinsam mit dir weiter.',
    primary: 'Lichtgespräch',
    secondary: 'Community beitreten'
  },
  en: {
    badge: 'Community',
    title: 'Join the Saimôr circle',
    body: 'Quiet updates, invitations, impulses – help us grow this ecosystem together.',
    primary: 'Clarity call',
    secondary: 'Join the community'
  }
} as const;

export default function CommunityNote({ locale, className }: Props) {
  const content = copy[locale];

  return (
    <section className={className}>
      <motion.div
        className="relative overflow-hidden rounded-3xl px-6 py-6 sm:px-10 sm:py-8 text-left"
        style={{
          background: 'linear-gradient(135deg, rgba(14, 28, 22, 0.95) 0%, rgba(22, 46, 36, 0.9) 100%)',
          border: '1px solid rgba(212, 180, 131, 0.35)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
          backdropFilter: 'blur(22px)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          <Sparkles className="h-4 w-4 text-[#D4A857]" />
          {content.badge}
        </div>

        <div className="flex flex-col gap-4 text-white">
          <h3 className="text-2xl md:text-3xl font-serif">{content.title}</h3>
          <p className="text-white/80 leading-relaxed">{content.body}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <motion.a
            href="https://cal.com/saimor/30min"
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-gradient-to-r from-[#D4A857] via-[#E6C897] to-[#4A6741] px-6 py-3 text-center font-semibold text-[#0C1A14] shadow-xl"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {content.primary}
          </motion.a>
          <motion.a
            href="#community"
            className="flex-1 rounded-full border border-white/30 px-6 py-3 text-center font-semibold text-white/90 backdrop-blur"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              {content.secondary}
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
