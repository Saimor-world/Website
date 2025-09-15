import Link from 'next/link';

type Props = { locale: 'de' | 'en' };

export default function Services({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const items = [
    {
      key: 'licht',
      title: t('Lichtgespräch', 'Intro Call'),
      desc: t('30 Min., kostenfrei, online – Klärung ohne Verkauf.', '30 min, free, online – clarity, no sales.'),
      href: locale === 'de' ? '/de/kontakt?licht=1' : '/en/contact?intro=1',
      cta: t('Termin finden', 'Book now'),
    },
    {
      key: 'begleitung',
      title: t('Begleitung', 'Guidance'),
      desc: t('1–6 Monate, Rhythmus statt Meetings.', '1–6 months, rhythm instead of meetings.'),
      href: locale === 'de' ? '/de/kontakt' : '/en/contact',
      cta: t('Anfrage', 'Enquire'),
    },
    {
      key: 'impulse',
      title: t('Impulse', 'Impulses'),
      desc: t('Workshops, Keynotes, stille Formate.', 'Workshops, keynotes, silent formats.'),
      href: locale === 'de' ? '/de/kontakt' : '/en/contact',
      cta: t('Formate anfragen', 'Request formats'),
    },
  ];

  return (
    <section id="angebot" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-[26px] md:text-[30px] font-medium mb-8">{t('Angebot', 'Offering')}</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <article key={it.key} className="s-card p-6 flex flex-col gap-4">
              <div className="flex-1">
                <h3 className="text-[18px] font-medium mb-1">{it.title}</h3>
                <p className="text-[15px]" style={{ color: 'var(--ink)' }}>{it.desc}</p>
              </div>
              <div className="pt-2">
                <Link
                  href={it.href}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm border transition
                             hover:bg-[color:var(--gold)] hover:text-[color:var(--navy)]"
                  style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                >
                  {it.cta}
                  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M9.5 3.5L13 7l-3.5 3.5-.7-.7 2.1-2.1H3v-1h7.9L8.8 4.2l.7-.7z"/></svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
