import Link from 'next/link';
import { memo } from 'react';

type Locale = 'de' | 'en';

type ServiceItem = {
  key: string;
  title: string;
  subtitle: string;
  benefits: string[];
  href: string;
  cta: string;
  secondaryCta: string;
  secondaryHref: string;
  featured?: boolean;
};

type Props = {
  locale: Locale;
};

const Services = memo(function Services({ locale }: Props) {
  const t = (de: string, en: string) => (locale === 'de' ? de : en);
  const items: ServiceItem[] = [
    {
      key: 'mora',
      title: t('Môra', 'Môra'),
      subtitle: t('Deine KI-Begleiterin für Klarheit', 'Your AI companion for clarity'),
      benefits: [
        t('Dashboard · Web · Voice – alles verbunden', 'Dashboard · Web · Voice – all connected'),
        t('Dual-Modus: Ordner & Feld', 'Dual mode: folder & field'),
        t('MVP-Prototyp – Entwicklung läuft', 'MVP prototype – in development')
      ],
      href: '#waitlist',
      cta: t('Early Access sichern', 'Get early access'),
      secondaryCta: t('Mehr über Môra', 'Learn about Môra'),
      secondaryHref: '/mora',
      featured: true
    },
    {
      key: 'orbit',
      title: t('Orbit', 'Orbit'),
      subtitle: t('Rhythmus statt Meetings', 'Rhythm instead of meetings'),
      benefits: [
        t('Resonanzraum für klare Entscheidungen', 'Resonance space for clear decisions'),
        t('Tiefe statt Hektik – nachhaltige Veränderung', 'Depth instead of rush – sustainable change'),
        t('1–6 Monate begleitet von Môra', '1–6 months with Môra’s support')
      ],
      href: '/orbit',
      cta: t('Mehr erfahren', 'Learn more'),
      secondaryCta: t('Klarheitsgespräch buchen', 'Book clarity call'),
      secondaryHref: 'https://cal.com/saimor/30min'
    },
    {
      key: 'pulse',
      title: t('Pulse', 'Pulse'),
      subtitle: t('Impulse für Klarheit im Moment', 'Impulses for clarity in the moment'),
      benefits: [
        t('Energie in Veränderungssituationen', 'Energy in transformation moments'),
        t('Workshop · Keynote · Stille Formate', 'Workshop · Keynote · Silent formats'),
        t('Môra bereitet vor und begleitet nach', 'Môra prepares and follows up')
      ],
      href: '/pulse',
      cta: t('Mehr erfahren', 'Learn more'),
      secondaryCta: t('Pulse-Format anfragen', 'Request pulse format'),
      secondaryHref: 'https://cal.com/saimor/30min'
    }
  ];

  const gradientBackgrounds = [
    'linear-gradient(135deg, rgba(212, 180, 131, 0.25) 0%, rgba(255, 215, 0, 0.12) 60%, rgba(212, 180, 131, 0.18) 100%)',
    'linear-gradient(135deg, rgba(74, 103, 65, 0.12) 0%, rgba(212, 180, 131, 0.15) 50%, rgba(93, 124, 84, 0.08) 100%)',
    'linear-gradient(135deg, rgba(212, 180, 131, 0.18) 0%, rgba(102, 153, 102, 0.1) 50%, rgba(212, 180, 131, 0.12) 100%)'
  ];

  const ctaHint = t('Ruhiger Erstkontakt über Cal.com', 'Calm first contact via Cal.com');

  return (
    <section id="angebot" className="py-16 sm:py-24 relative overflow-hidden">
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 30%, #D4B483 70%, #E6C897 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('Angebot', 'Offering')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('Klarheit im Wandel – mit menschlicher Tiefe & technischer Präzision.', 'Clarity in transformation – with human depth & technical precision.')}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const isExternalSecondary = /^https?:\/\//.test(item.secondaryHref) || item.secondaryHref.startsWith('mailto:');
            return (
              <article
                key={item.key}
                className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500"
                style={{
                  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 249, 0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: item.featured
                    ? '2px solid rgba(212, 180, 131, 0.5)'
                    : '1px solid rgba(212, 180, 131, 0.25)',
                  boxShadow: item.featured
                    ? '0 25px 50px rgba(212, 180, 131, 0.25), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1px rgba(212, 180, 131, 0.2)'
                    : '0 20px 40px rgba(74, 103, 65, 0.12), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}
              >
                <div
                  className="absolute inset-0 opacity-40 transition-all duration-500 group-hover:opacity-60"
                  style={{
                    background: gradientBackgrounds[index],
                    backdropFilter: 'blur(20px)'
                  }}
                />

                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top left, rgba(74, 103, 65, 0.05) 0%, transparent 60%)' }} />

                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-spin-slow">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#4A6741" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="32" cy="4" r="3" fill="#4A6741" />
                    <circle cx="60" cy="32" r="2" fill="#D4B483" />
                    <circle cx="32" cy="60" r="2" fill="#5D7C54" />
                  </svg>
                </div>

                <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-saimor-green transition-colors duration-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {item.title}
                    </h3>
                    <h4 className="text-base font-semibold mb-4 text-saimor-green/80">
                      {item.subtitle}
                    </h4>
                    <ul className="space-y-2.5 mb-6">
                      {item.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2 text-sm text-slate-700 leading-snug">
                          <svg className="w-4 h-4 text-saimor-green flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="transform transition-all duration-300 hover:scale-105 active:scale-95">
                      <Link
                        href={item.href}
                        className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-5 py-3 sm:py-4 text-base font-semibold border-2 bg-white/80 text-slate-800 transition-all duration-300 shadow-md hover:shadow-lg hover:border-saimor-green/60 hover:bg-saimor-green/5 min-h-[48px]"
                        style={{ borderColor: 'rgba(212, 180, 131, 0.4)' }}
                      >
                        <span>{item.cta}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-105 active:scale-95">
                      {isExternalSecondary ? (
                        <a
                          href={item.secondaryHref}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-5 py-3 sm:py-4 text-base font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl group/cta min-h-[48px]"
                          style={{
                            background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 50%, rgba(212, 180, 131, 0.85) 100%)',
                            boxShadow: '0 8px 20px rgba(74, 103, 65, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <span className="group-hover/cta:scale-105 transition-transform duration-200">{item.secondaryCta}</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.08 2.38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={item.secondaryHref}
                          className="w-full inline-flex items-center justify-center gap-3 rounded-2xl px-5 py-3 sm:py-4 text-base font-bold text-white transition-all duration-300 shadow-lg hover:shadow-xl group/cta min-h-[48px]"
                          style={{
                            background: 'linear-gradient(135deg, rgba(74, 103, 65, 0.95) 0%, rgba(93, 124, 84, 0.9) 50%, rgba(212, 180, 131, 0.85) 100%)',
                            boxShadow: '0 8px 20px rgba(74, 103, 65, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <span className="group-hover/cta:scale-105 transition-transform duration-200">{item.secondaryCta}</span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.48.9 6.08 2.38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      )}
                      <p className="text-xs text-slate-500 mt-2 text-center">
                        {ctaHint}
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(212, 180, 131, 0.15) 0%, transparent 70%)'
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Services;
