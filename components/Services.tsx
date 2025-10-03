import Link from 'next/link';

type Props = { locale: 'de' | 'en' };

export default function Services({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);

  const items = [
    {
      key: 'orbit',
      title: t('Orbit', 'Orbit'),
      desc: t('Systematische Begleitung für wiederkehrende Transformation – Rhythmus statt Meetings.', 'Systematic guidance for recurring transformation – rhythm instead of meetings.'),
      href: '#kontakt',
      cta: t('Anfrage', 'Enquire'),
      secondaryCta: t('Lichtgespräch buchen', 'Book light conversation'),
      secondaryHref: process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/saimor/30min',
    },
    {
      key: 'pulse',
      title: t('Pulse', 'Pulse'),
      desc: t('Impulse für punktuelle Klärung – Workshops, Keynotes, stille Formate.', 'Impulses for focused clarity – workshops, keynotes, silent formats.'),
      href: '#kontakt',
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
    <section id="angebot" className="section relative overflow-hidden">
      {/* Organic background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 left-1/4 w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(74, 103, 65, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute bottom-32 right-1/5 w-48 h-48 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(212, 180, 131, 0.4) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <h2
          className="text-[26px] md:text-[30px] font-medium mb-8"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {t('Angebot', 'Offering')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it, index) => {
            const gradientBackgrounds = [
              'linear-gradient(135deg, rgba(74, 103, 65, 0.12) 0%, rgba(212, 180, 131, 0.15) 50%, rgba(93, 124, 84, 0.08) 100%)', // Orbit - green/gold
              'linear-gradient(135deg, rgba(212, 180, 131, 0.18) 0%, rgba(102, 153, 102, 0.1) 50%, rgba(212, 180, 131, 0.12) 100%)', // Pulse - gold/accent
              'linear-gradient(135deg, rgba(93, 124, 84, 0.15) 0%, rgba(212, 180, 131, 0.12) 50%, rgba(74, 103, 65, 0.1) 100%)'  // Systems - green variations
            ];

            return (
              <article
                key={it.key}
                className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 min-h-[420px] cursor-pointer hover:-translate-y-2 hover:scale-105"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 249, 0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(212, 180, 131, 0.25)',
                  boxShadow: '0 20px 40px rgba(74, 103, 65, 0.12), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 opacity-40 transition-all duration-500 group-hover:opacity-60"
                  style={{
                    background: gradientBackgrounds[index],
                    backdropFilter: 'blur(20px)'
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse at top left, rgba(74, 103, 65, 0.05) 0%, transparent 60%)'
                  }}
                />

                {/* Orbit Decoration */}
                <div className="absolute top-6 right-6 w-16 h-16 opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-spin-slow">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#4A6741" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="32" cy="4" r="3" fill="#4A6741" />
                    <circle cx="60" cy="32" r="2" fill="#D4B483" />
                    <circle cx="32" cy="60" r="2" fill="#5D7C54" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-saimor-green transition-colors duration-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {it.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                      {it.desc}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-4">
                    <div className="transform transition-all duration-300 hover:scale-105 active:scale-95">
                      <Link
                        href={it.href}
                        className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-semibold border-2 bg-white/80 text-slate-800 transition-all duration-300 shadow-md hover:shadow-lg hover:border-saimor-green/60 hover:bg-saimor-green/5"
                        style={{
                          borderColor: 'rgba(212, 180, 131, 0.4)',
                        }}
                      >
                        <span>{it.cta}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-105 active:scale-95">
                      <Link
                        href={it.secondaryHref}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl group/cta"
                        style={{
                          background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 50%, rgba(212, 180, 131, 0.85) 100%)',
                          boxShadow: '0 8px 20px rgba(74, 103, 65, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <span className="group-hover/cta:scale-105 transition-transform duration-200">{it.secondaryCta}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.08 2.38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(212, 180, 131, 0.15) 0%, transparent 70%)'
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
