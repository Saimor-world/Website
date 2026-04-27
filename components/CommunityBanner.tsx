'use client';
import { motion } from 'framer-motion';
import { Sparkles, Users, MessageSquare, Zap, ArrowRight, Star } from 'lucide-react';
import type { CSSProperties } from 'react';

type Locale = 'de' | 'en';

interface CommunityBannerProps {
  locale: Locale;
}

const content = {
  de: {
    badge: 'Limitierter Early Access',
    title: 'Gestalte Saimôr\nmit uns.',
    subtitle: 'Die ersten 100 Mitglieder formen das Produkt – nicht nur durch Feedback, sondern durch direkte Zusammenarbeit mit unserem Team.',
    features: [
      {
        icon: Zap,
        title: 'Frühzugang',
        text: 'Teste Môra und alle Features bevor sie öffentlich werden.',
      },
      {
        icon: MessageSquare,
        title: 'Direkter Draht',
        text: 'Wöchentliche Calls mit dem Gründerteam. Dein Input zählt.',
      },
      {
        icon: Star,
        title: 'Founder-Status',
        text: 'Lebenslanger Gründer-Preis und öffentliche Anerkennung.',
      },
      {
        icon: Users,
        title: 'Community',
        text: 'Zugang zur privaten Saimôr-Community und Netzwerk.',
      },
    ],
    cta: 'Platz sichern',
    ctaSub: 'Kostenlos · Kein Spam · Jederzeit abmeldbar',
    spotsLeft: 'Noch wenige Plätze frei',
    transparency: 'Wir bauen offen — kein Pitch-Deck-Theater. Status, Roadmap und offene Fragen findest du im Portal.',
  },
  en: {
    badge: 'Limited Early Access',
    title: 'Shape Saimôr\nwith us.',
    subtitle: 'The first 100 members shape the product – not just through feedback, but through direct collaboration with our founding team.',
    features: [
      {
        icon: Zap,
        title: 'First Access',
        text: 'Use Môra and all features before they go public.',
      },
      {
        icon: MessageSquare,
        title: 'Direct Line',
        text: 'Weekly calls with the founding team. Your input matters.',
      },
      {
        icon: Star,
        title: 'Founder Status',
        text: 'Lifetime founder pricing and public recognition.',
      },
      {
        icon: Users,
        title: 'Community',
        text: 'Access to the private Saimôr community and network.',
      },
    ],
    cta: 'Secure your spot',
    ctaSub: 'Free · No spam · Unsubscribe anytime',
    spotsLeft: 'Limited spots remaining',
    transparency: 'We build in the open — no pitch-deck theatre. Status, roadmap, open questions live in the portal.',
  },
};

export default function CommunityBanner({ locale }: CommunityBannerProps) {
  const c = content[locale];

  return (
    <section className="relative py-32 bg-[#060a09] overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-emerald-500/12 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/8 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Main card */}
          <div
            className="rounded-[3rem] overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 22, 18, 0.9) 0%, rgba(6, 18, 14, 0.95) 100%)',
              border: '1px solid rgba(52, 211, 153, 0.15)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(52,211,153,0.05), inset 0 1px 0 rgba(255,255,255,0.06)',
            } as CSSProperties}
          >
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)' }}
            />

            <div className="px-10 py-16 sm:px-20 sm:py-24">
              {/* Badge + spots */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-400">
                    {c.badge}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-amber-400/90">
                    {c.spotsLeft}
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className="text-center mb-6">
                <h2
                  className="text-5xl sm:text-7xl font-light tracking-tight leading-[0.95] text-white whitespace-pre-line"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {c.title.split('\n').map((line, i) =>
                    i === 1 ? (
                      <span key={i} className="block italic text-transparent bg-clip-text"
                        style={{ backgroundImage: 'linear-gradient(135deg, #34d399, #06b6d4)' }}>
                        {line}
                      </span>
                    ) : (
                      <span key={i} className="block">{line}</span>
                    )
                  )}
                </h2>
              </div>

              <p className="text-xl text-white/45 max-w-2xl mx-auto text-center leading-relaxed mb-16">
                {c.subtitle}
              </p>

              {/* Feature tiles */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {c.features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="group p-6 rounded-2xl border border-white/6 bg-white/[0.03] hover:bg-emerald-500/5 hover:border-emerald-500/15 transition-all duration-300 text-left space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/15 transition-colors">
                        <Icon className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                      </div>
                      <div className="font-semibold text-white/80 text-sm">{feature.title}</div>
                      <p className="text-white/40 text-xs leading-relaxed">{feature.text}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center gap-4">
                <motion.a
                  href="#waitlist"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 px-12 py-5 rounded-2xl font-bold text-black transition-all shadow-[0_20px_60px_rgba(52,211,153,0.2)]"
                  style={{ background: 'linear-gradient(135deg, #34d399, #10b981)' }}
                >
                  <span>{c.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <p className="text-[11px] text-white/25 tracking-wide">{c.ctaSub}</p>
              </div>
            </div>

            {/* Bottom transparency line */}
            <div className="border-t border-white/5 px-10 py-5 sm:px-20">
              <p className="text-center text-[10px] uppercase tracking-[0.35em] text-white/20 font-medium">
                {c.transparency}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
