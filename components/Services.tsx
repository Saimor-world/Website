import Link from 'next/link';

type Props = { locale: 'de' | 'en' };

export default function Services({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const items = [
    {
      key: 'orbit',
      title: t('Orbit', 'Orbit'),
      desc: t('Systematische Begleitung für wiederkehrende Transformation – Rhythmus statt Meetings.', 'Systematic guidance for recurring transformation – rhythm instead of meetings.'),
      href: locale === 'de' ? '/de/kontakt' : '/en/contact',
      cta: t('Anfrage', 'Enquire'),
      secondaryCta: t('Lichtgespräch buchen', 'Book light conversation'),
      secondaryHref: process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min',
    },
    {
      key: 'pulse',
      title: t('Pulse', 'Pulse'),
      desc: t('Impulse für punktuelle Klärung – Workshops, Keynotes, stille Formate.', 'Impulses for focused clarity – workshops, keynotes, silent formats.'),
      href: locale === 'de' ? '/de/kontakt' : '/en/contact',
      cta: t('Formate anfragen', 'Request formats'),
      secondaryCta: t('Lichtgespräch buchen', 'Book light conversation'),
      secondaryHref: process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min',
    },
    {
      key: 'systems',
      title: t('Systems', 'Systems'),
      desc: t('Strukturelle Klarheit für komplexe Organisationen – von Daten zu Entscheidungen.', 'Structural clarity for complex organizations – from data to decisions.'),
      href: locale === 'de' ? '/de/kontakt' : '/en/contact',
      cta: t('Anfrage', 'Enquire'),
      secondaryCta: t('Lichtgespräch buchen', 'Book light conversation'),
      secondaryHref: process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min',
    },
  ];

  return (
    <section id="angebot" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-[26px] md:text-[30px] font-medium mb-8">{t('Angebot', 'Offering')}</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it) => (
            <article
              key={it.key}
              className="relative group p-8 flex flex-col gap-6 rounded-3xl backdrop-blur-sm border border-white/20 bg-white/10 hover:bg-white/15 transition-all duration-300 min-h-[280px] overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
                  url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M200,50 Q350,200 200,350 Q50,200 200,50' fill='none' stroke='rgba(255,206,69,0.1)' stroke-width='2'/%3E%3C/svg%3E") center/contain no-repeat
                `
              }}
            >
              {/* Unsplash placeholder background image */}
              <div
                className="absolute inset-0 opacity-5 bg-cover bg-center"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80")`
                }}
              />

              {/* Orbit line decoration */}
              <div className="absolute top-4 right-4 w-12 h-12 opacity-20">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-yellow-500" />
                  <circle cx="24" cy="4" r="2" fill="currentColor" className="text-yellow-500" />
                </svg>
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">{it.title}</h3>
                <p className="text-base leading-relaxed text-slate-700">{it.desc}</p>
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                <Link
                  href={it.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-slate-900 transition-all duration-200"
                >
                  {it.cta}
                  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M9.5 3.5L13 7l-3.5 3.5-.7-.7 2.1-2.1H3v-1h7.9L8.8 4.2l.7-.7z"/></svg>
                </Link>

                <Link
                  href={it.secondaryHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium bg-yellow-500 text-slate-900 hover:bg-yellow-400 transition-all duration-200"
                >
                  {it.secondaryCta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
