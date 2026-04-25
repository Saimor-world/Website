'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Bot, Cpu } from 'lucide-react';
import { entryContent, type EntryLocale, type EntryPillar } from '@/lib/entry-content';

const pillarOrder: EntryPillar[] = ['digital-self', 'security', 'ai-business'];

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
      badge: 'SAIMOR STANDBEIN',
      title: 'Blog Tree: AI, Security, Digital Self',
      subtitle:
        'Dieses Standbein ist dein Einstieg in den breiten Markt: niedrigschwellig, direkt nutzbar und sauber getrennt vom Hauptsystem.',
      treeLabel: 'Standbein Tree',
      cta: 'Lesen',
      readTime: 'Lesezeit',
      pillarTitles: {
        'digital-self': 'Digital AI Self',
        security: 'Security / Datenschutz',
        'ai-business': 'AI für lokale Businesses',
      },
      pillarDescriptions: {
        'digital-self': 'Dein digitales Gegenüber — produktiv, sicher, vertrauenswürdig',
        security: 'Angriffsflächen verstehen und Grundlagen absichern',
        'ai-business': 'Praktische Automationen für lokale Unternehmen',
      },
    },
    en: {
      badge: 'SAIMOR TRACK',
      title: 'Blog Tree: AI, Security, Digital Self',
      subtitle:
        'This track is the low-friction market entry: practical, interactive and clearly separated from the core system.',
      treeLabel: 'Track Tree',
      cta: 'Read',
      readTime: 'read',
      pillarTitles: {
        'digital-self': 'Digital AI Self',
        security: 'Security / Privacy',
        'ai-business': 'AI for Local Businesses',
      },
      pillarDescriptions: {
        'digital-self': 'Your digital counterpart — productive, secure, trustworthy',
        security: 'Understand attack surface and secure the basics',
        'ai-business': 'Practical automations for local businesses',
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

        {/* ── Visitor Wall Banner ── */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* subtle glow behind */}
          <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />
          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.32em] text-emerald-300/60 mb-1.5">
              {locale === 'de' ? 'Besucher-Wall' : 'Visitor Wall'}
            </p>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              {locale === 'de'
                ? 'Mach deinen kostenlosen Security-Audit und erscheine auf der öffentlichen Wall.'
                : 'Run your free security audit and appear on the public wall.'}
            </p>
          </div>
          <Link
            href="/wall"
            className="relative shrink-0 inline-flex items-center gap-2 rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-5 py-2.5 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/20 hover:border-emerald-300/50 transition-all duration-200"
          >
            {locale === 'de' ? 'Wall ansehen' : 'View Wall'}
            <ArrowRight className="w-4 h-4" />
          </Link>
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
                  {list.map((article, index) => (
                    <motion.article
                      key={article.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07, duration: 0.4 }}
                      className="group rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-md flex flex-col overflow-hidden hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      {/* Top accent bar */}
                      <div
                        className="h-[2px] w-full shrink-0"
                        style={{ background: `linear-gradient(to right, ${pillarTopAccent[pillar]}, transparent)` }}
                      />

                      <div className="p-6 flex flex-col flex-1">
                        {/* Category + reading time row */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`text-[9px] uppercase tracking-[0.28em] font-semibold ${theme.tagColor}`}
                          >
                            {article.category}
                          </span>
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
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
