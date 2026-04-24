import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { entryContent, type EntryLocale } from '@/lib/entry-content';
import EntryActionPanel from './EntryActionPanel';

type Props = {
  locale: EntryLocale;
  slug: string;
};

export default function EntryArticle({ locale, slug }: Props) {
  const article = entryContent[locale].find((item) => item.slug === slug);

  if (!article) {
    return null;
  }

  const homeHref = locale === 'de' ? '/de/einstieg' : '/en/entry';
  const backLabel = locale === 'de' ? 'Zur Uebersicht' : 'Back to overview';
  const related = entryContent[locale]
    .filter((item) => item.pillar === article.pillar && item.slug !== article.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0d1b16] to-[#081410] text-white">
      <article className="relative mx-auto max-w-4xl px-6 py-28 space-y-10">
        <Link
          href={homeHref}
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </Link>

        <header className="space-y-5">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-emerald-300/80">
            <span>{article.category}</span>
            <span className="text-white/35">{article.readTime}</span>
          </div>
          <h1
            className="text-5xl sm:text-6xl font-light leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {article.title}
          </h1>
          <p className="text-lg text-white/75 leading-relaxed">{article.intro}</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-[0.13em] rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section className="space-y-8">
          {article.sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <h2
                className="text-3xl mb-3 text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {section.title}
              </h2>
              <p className="text-white/70 leading-relaxed text-lg">{section.body}</p>
            </div>
          ))}
        </section>

        {article.actionKind ? <EntryActionPanel kind={article.actionKind} locale={locale} /> : null}

        <div className="pt-4">
          <Link
            href={article.ctaHref}
            target={article.ctaHref.startsWith('http') ? '_blank' : undefined}
            rel={article.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
          >
            <span>{article.ctaLabel}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {related.length > 0 ? (
          <section className="pt-6 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              {locale === 'de' ? 'Weiter im Tree' : 'Continue in tree'}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`${homeHref}/${item.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80 mb-2">{item.category}</p>
                  <h3
                    className="text-2xl text-white mb-2"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}
