'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Bot, Cpu } from 'lucide-react';
import { entryContent, type EntryLocale, type EntryPillar } from '@/lib/entry-content';

// Security first — it's the primary product and strongest entry point
const pillarOrder: EntryPillar[] = ['security', 'digital-self', 'ai-business'];

// Per-pillar design tokens — single source of truth
const pillarTheme: Record<
  EntryPillar,
  { borderColor: string; bgColor: string; iconColor: string; tagColor: string; Icon: React.ElementType }
> = {
  'digital-self': {
    borderColor: 'border-l-violet-400/50',
    bgColor: 'bg-violet-900/10',
    iconColor: 'text-violet-300/80',
    tagColor: 'text-violet-300/80',
    Icon: Bot,
  },
  security: {
    borderColor: 'border-l-amber-400/50',
    bgColor: 'bg-amber-900/10',
    iconColor: 'text-amber-300/80',
    tagColor: 'text-amber-300/80',
    Icon: Shield,
  },
  'ai-business': {
    borderColor: 'border-l-emerald-400/50',
    bgColor: 'bg-emerald-900/10',
    iconColor: 'text-emerald-300/80',
    tagColor: 'text-emerald-300/80',
    Icon: Cpu,
  },
};

// Top border accent for article cards (Tailwind arbitrary-value workaround via inline style)
const pillarTopAccent: Record<EntryPillar, string> = {
  'digital-self': '#7c3aed40',
  security: '#d97706a0',
  'ai-business': '#34d39940',
};

export default function EntryHub({ locale }: { locale: EntryLocale }) {
  const content = {
    de: {
      badge: 'FÜR LOKALE UNTERNEHMEN',
      title: 'Was steckt hinter deiner digitalen Präsenz?',
      subtitle:
        'Ein kostenloser Security-Check zeigt dir in 60 Sekunden, was Angreifer über dein Unternehmen sehen — und was du dagegen tun kannst.',
      treeLabel: 'Was dich erwartet',
      cta: 'Mehr erfahren',
      readTime: 'Lesezeit',
      featuredLabel: 'Empfohlen',
      pillarTitles: {
        'digital-self': 'Smarter arbeiten mit AI',
        security: 'Sicherheit für dein Business',
        'ai-business': 'AI-Automationen',
      },
      pillarDescriptions: {
        'digital-self': 'Dein persönlicher AI-Assistent — der nie schläft und immer auf dich hört',
        security: 'In 60 Sekunden sehen, was Angreifer über dich wissen. Kostenlos, ohne Anmeldung.',
        'ai-business': 'Drei kleine Automationen, die sofort Zeit sparen',
      },
    },
    en: {
      badge: 'FOR LOCAL BUSINESSES',
      title: 'What does your digital footprint reveal?',
      subtitle:
        'A free security check shows you in 60 seconds what attackers can see about your business — and what you can do about it.',
      treeLabel: 'What to expect',
      cta: 'Read more',
      readTime: 'read',
      featuredLabel: 'Recommended',
      pillarTitles: {
        'digital-self': 'Work smarter with AI',
        security: 'Security for your business',
        'ai-business': 'AI automations',
      },
      pillarDescriptions: {
        'digital-self': 'Your personal AI assistant — never sleeps, always listens',
        security: 'See in 60 seconds what attackers know about you. Free, no signup.',
        'ai-business': 'Three small automations that save time immediately',
      },
    },
  }[locale];

  const basePath = locale === 'de' ? '/de/einstieg' : '/en/entry';
  const articles = entryContent[locale];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060d0b] via-[#0a1a14] to-[#060d0b] text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-24 space-y-20">

        {/* ── Hero ── */}
        <header className="space-y-5 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[10px] tracking-[0.45em] uppercase text-emerald-300/80">{content.badge}</p>
          </div>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-light leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {content.title}
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {content.subtitle}
          </p>
          {/* Horizontal rule with gradient */}
          <div className="pt-4 flex items-center gap-4 justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-400/30" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/20">Saimor</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-400/30" />
          </div>
        </header>

        {/* ── Category Tree Overview ── */}
        <section className="rounded-[2rem] border border-white/8 bg-white/[0.025] backdrop-blur-xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/35">{content.treeLabel}</p>
            <p className="text-xs text-white/40 tabular-nums">
              {locale === 'de'
                ? `${articles.length} Beiträge`
                : `${articles.length} articles`}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {pillarOrder.map((pillar) => {
              const count = articles.filter((item) => item.pillar === pillar).length;
              const theme = pillarTheme[pillar];
              const PillarIcon = theme.Icon;
              return (
                <div
                  key={pillar}
                  className={`rounded-2xl border border-white/8 border-l-2 ${theme.borderColor} ${theme.bgColor} p-5 flex flex-col gap-3`}
                >
                  <div className="flex items-center justify-between">
                    <PillarIcon className={`w-4 h-4 ${theme.iconColor}`} strokeWidth={1.5} />
                    <span className="text-[10px] tabular-nums text-white/30">
                      {locale === 'de' ? `${count} Beiträge` : `${count} articles`}
                    </span>
                  </div>
                  <p className={`text-[11px] uppercase tracking-[0.22em] font-medium ${theme.tagColor}`}>
                    {content.pillarTitles[pillar]}
                  </p>
                  <p className="text-white/45 text-xs leading-relaxed">
                    {content.pillarDescriptions[pillar]}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Primary CTA Banner ── */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/25 bg-amber-500/[0.05] px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-amber-400/8 blur-2xl" />
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.32em] text-amber-300/60 mb-2">
              {locale === 'de' ? 'Kostenlos · Kein Login · 60 Sekunden' : 'Free · No Login · 60 Seconds'}
            </p>
            <p className="text-lg font-light text-white/90 leading-snug max-w-md" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {locale === 'de'
                ? 'Dein kostenloser Security-Check — sieh sofort, wo dein Unternehmen angreifbar ist.'
                : 'Your free security check — see immediately where your business is exposed.'}
            </p>
          </div>
          <div className="relative shrink-0 flex flex-col sm:flex-row gap-2">
            <Link
              href={locale === 'de' ? '/de/einstieg/security-check' : '/en/entry/security-check'}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-400 transition-all duration-200"
            >
              {locale === 'de' ? 'Jetzt prüfen' : 'Check now'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/wall"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm text-white/50 hover:text-white/70 hover:bg-white/5 transition-all duration-200"
            >
              {locale === 'de' ? 'Ergebnisse anderer sehen' : 'See others\' results'}
            </Link>
          </div>
        </div>

        {/* ── Article Sections by Pillar ── */}
        <section className="space-y-14">
          {pillarOrder.map((pillar) => {
            const list = articles.filter((item) => item.pillar === pillar);
            const theme = pillarTheme[pillar];
            const PillarIcon = theme.Icon;
            return (
              <div key={pillar} className="space-y-5">
                {/* Section heading */}
                <div className="flex items-center gap-3">
                  <PillarIcon className={`w-5 h-5 ${theme.iconColor} shrink-0`} strokeWidth={1.5} />
                  <h2
                    className="text-3xl font-light text-white"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {content.pillarTitles[pillar]}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-2" />
                </div>

                {/* Article cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {list.map((article, index) => {
                    const isFeatured = article.slug === 'security-check';
                    return (
                    <motion.article
                      key={article.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07, duration: 0.4 }}
                      className={`group rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 ${
                        isFeatured
                          ? 'border-amber-400/30 bg-amber-400/[0.04] hover:border-amber-400/50 hover:bg-amber-400/[0.07]'
                          : 'border-white/8 bg-white/[0.03] backdrop-blur-md hover:border-white/15 hover:bg-white/[0.05]'
                      }`}
                    >
                      {/* Top accent bar */}
                      <div
                        className="h-[2px] w-full shrink-0"
                        style={{ background: `linear-gradient(to right, ${pillarTopAccent[pillar]}, transparent)` }}
                      />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Category + reading time row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[9px] uppercase tracking-[0.28em] font-semibold ${theme.tagColor}`}
                            >
                              {article.category}
                            </span>
                            {isFeatured && (
                              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] text-amber-300 font-semibold">
                                {content.featuredLabel}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-white/30 tabular-nums">
                            {article.readTime}{' '}
                            <span className="text-white/20">{content.readTime}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-2xl font-medium leading-snug mb-3 text-white/95 group-hover:text-white transition-colors"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-white/50 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                          {article.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] uppercase tracking-[0.14em] rounded-full border border-white/10 px-2.5 py-1 text-white/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA */}
                        <Link
                          href={`${basePath}/${article.slug}`}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${theme.tagColor} hover:brightness-125 transition-all`}
                        >
                          <span>{content.cta}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
