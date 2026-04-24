'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { entryContent, type EntryLocale, type EntryPillar } from '@/lib/entry-content';

const pillarOrder: EntryPillar[] = ['digital-self', 'security', 'ai-business'];

export default function EntryHub({ locale }: { locale: EntryLocale }) {
  const content = {
    de: {
      badge: 'Saimor Standbein',
      title: 'Blog Tree: AI, Security, Digital Self',
      subtitle:
        'Dieses Standbein ist dein Einstieg in den breiten Markt: niedrigschwellig, direkt nutzbar und sauber getrennt vom Hauptsystem.',
      treeLabel: 'Standbein Tree',
      cta: 'Beitrag lesen',
      pillarTitles: {
        'digital-self': 'Digital AI Self',
        security: 'Security / Datenschutz',
        'ai-business': 'AI fuer lokale Businesses',
      },
    },
    en: {
      badge: 'Saimor Track',
      title: 'Blog Tree: AI, Security, Digital Self',
      subtitle:
        'This track is the low-friction market entry: practical, interactive and clearly separated from the core system.',
      treeLabel: 'Track Tree',
      cta: 'Read article',
      pillarTitles: {
        'digital-self': 'Digital AI Self',
        security: 'Security / Privacy',
        'ai-business': 'AI for Local Businesses',
      },
    },
  }[locale];

  const basePath = locale === 'de' ? '/de/einstieg' : '/en/entry';
  const articles = entryContent[locale];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0d1b16] to-[#081410] text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-28 space-y-16">
        <header className="space-y-6 text-center max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.45em] uppercase text-saimor-gold">{content.badge}</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {content.title}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">{content.subtitle}</p>
        </header>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">{content.treeLabel}</p>
            <p className="text-sm text-white/55">
              {locale === 'de' ? `${articles.length} Beitraege` : `${articles.length} articles`}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {pillarOrder.map((pillar) => {
              const count = articles.filter((item) => item.pillar === pillar).length;
              return (
                <div key={pillar} className="rounded-2xl border border-white/10 bg-[#081410]/60 p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300/80 mb-2">{content.pillarTitles[pillar]}</p>
                  <p className="text-white/60 text-sm">
                    {locale === 'de' ? `${count} Beitraege in diesem Zweig` : `${count} articles in this branch`}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Visitor Wall Banner */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-300/70 mb-1">
              {locale === 'de' ? 'Besucher-Wall' : 'Visitor Wall'}
            </p>
            <p className="text-sm text-white/65 leading-relaxed">
              {locale === 'de'
                ? 'Mach deinen kostenlosen Security-Audit und erscheine auf der öffentlichen Wall.'
                : 'Run your free security audit and appear on the public wall.'}
            </p>
          </div>
          <Link
            href="/wall"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-5 py-2.5 text-sm font-bold text-emerald-100 hover:bg-emerald-400/20 transition-colors"
          >
            {locale === 'de' ? 'Wall ansehen' : 'View Wall'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="space-y-10">
          {pillarOrder.map((pillar) => {
            const list = articles.filter((item) => item.pillar === pillar);
            return (
              <div key={pillar} className="space-y-4">
                <h2 className="text-3xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {content.pillarTitles[pillar]}
                </h2>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {list.map((article, index) => (
                    <motion.article
                      key={article.slug}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06 }}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-300/80">{article.category}</span>
                        <span className="text-xs text-white/40">{article.readTime}</span>
                      </div>
                      <h3 className="text-3xl font-medium leading-tight mb-3 text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {article.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed mb-6 flex-1">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] uppercase tracking-[0.12em] rounded-full border border-white/15 px-2.5 py-1 text-white/65">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`${basePath}/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-300 hover:text-emerald-200 transition-colors"
                      >
                        <span>{content.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
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

