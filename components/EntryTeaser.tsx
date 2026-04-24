import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EntryTeaser({ locale }: { locale: 'de' | 'en' }) {
  const content = {
    de: {
      badge: 'Neues Standbein',
      title: 'Standbein: Blog Tree + direkte Starts',
      text:
        'Strukturierte Beitraege mit In-Page-Aktionen: Security-Check starten, Digital AI Self einfuehren und passende Demo-Tracks direkt oeffnen.',
      cta: 'Zum Einstieg',
      href: '/de/einstieg',
    },
    en: {
      badge: 'New Track',
      title: 'Track: blog tree + direct starts',
      text:
        'Structured articles with in-page actions: start Security Check, launch Digital AI Self and jump into matching demo tracks.',
      cta: 'Open entry',
      href: '/en/entry',
    },
  }[locale];

  return (
    <section className="relative py-24 bg-[#081410]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 sm:p-12">
          <p className="text-xs tracking-[0.35em] uppercase text-saimor-gold mb-4">{content.badge}</p>
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 items-end">
            <div className="space-y-3">
              <h2
                className="text-4xl sm:text-5xl font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {content.title}
              </h2>
              <p className="text-white/70 text-lg max-w-3xl">{content.text}</p>
            </div>
            <div className="lg:justify-self-end">
              <Link
                href={content.href}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
              >
                <span>{content.cta}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
