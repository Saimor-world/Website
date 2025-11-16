type Locale = 'de' | 'en';

const content = {
  de: {
    kicker: 'Saimôr Core · Môra UI · Môra OS',
    title: 'Produktstory in drei Schichten',
    subtitle: 'Ruhig, souverän, auditbereit – heute als Demo mit simulierten Daten.',
    cards: [
      {
        title: 'Saimôr Core',
        body: 'Stabiles semantisches Backend: mock-default, später real-ready. Sicher, souverän, EU-fähig.',
        bullets: ['Datenadapter & Logging', 'Rollen & Audit vorbereitet', 'Keine echten Kundendaten im Demo-Modus']
      },
      {
        title: 'Môra UI',
        body: 'Resonanz-Dashboard mit Folder/Feld, Insights und Chat. Zeigt Prioritäten, Kontext und leise Hinweise.',
        bullets: ['Field: Myzel sichtbar machen', 'Insights: Kontext statt Lärm', 'Chat: Dialog mit demselben Datenstrom']
      },
      {
        title: 'Môra OS',
        body: 'Wachsende Plattform, die später Räume/Organisationen verbindet – ohne übertriebene Versprechen.',
        bullets: ['Modular, erweiterbar', 'Interne Nutzung zuerst', 'Viele Wege, aber immer ruhig']
      }
    ]
  },
  en: {
    kicker: 'Saimôr Core · Môra UI · Môra OS',
    title: 'Product story in three layers',
    subtitle: 'Calm, sovereign, audit-ready – today as a demo with simulated data.',
    cards: [
      {
        title: 'Saimôr Core',
        body: 'Stable semantic backend: mock-default, later real-ready. Secure, sovereign, EU-capable.',
        bullets: ['Data adapters & logging', 'Roles & audit prepared', 'No real customer data in demo mode']
      },
      {
        title: 'Môra UI',
        body: 'Resonance dashboard with folder/field, insights, and chat. Shows priorities, context, and quiet cues.',
        bullets: ['Field: exposing the mycelium', 'Insights: context over noise', 'Chat: dialogue on the same stream']
      },
      {
        title: 'Môra OS',
        body: 'Growing platform that will connect spaces/organisations over time – without overpromising.',
        bullets: ['Modular, extensible', 'Internal-first usage', 'Many paths, always calm']
      }
    ]
  }
} as const;

export default function ProductStory({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#0F1F17] via-[#13261D] to-[#0F1F17]">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center text-slate-100 space-y-3 mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-saimor-gold">{t.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 sm:p-7 text-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.25)] flex flex-col gap-3"
            >
              <h3 className="text-xl font-semibold text-saimor-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">{card.body}</p>
              <ul className="space-y-2 text-sm leading-relaxed text-white/80">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="text-saimor-gold font-semibold">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
