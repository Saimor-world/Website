import { memo } from 'react';
import { Leaf, Network, MonitorSmartphone, MessageCircle } from 'lucide-react';

type Locale = 'de' | 'en';

const copy = {
  de: {
    kicker: 'Wald \u00b7 Myzel \u00b7 Dashboard',
    title: 'Was oben rauscht, flie\u00dft unten zusammen',
    intro:
      'Unter jeder Organisation liegt ein unsichtbares Myzel aus Daten, Entscheidungen und Beziehungen. M\u00f4ra macht dieses Myzel sichtbar \u2013 als Dashboard, Myzel-Ansicht und Dialog.',
    forest: {
      title: 'Oben: der Wald',
      points: [
        'Teams, Projekte, Signale \u2013 viele Stimmen, wenig Zeit',
        'Wir sammeln nur, was f\u00fcr Klarheit n\u00f6tig ist',
        'Kein L\u00e4rm, keine Versprechen, die noch nicht existieren'
      ]
    },
    mycelium: {
      title: 'Unten: das Myzel',
      lines: [
        'Quellen verbinden',
        'Myzel erkennen (Feld)',
        'Kontext & Insights',
        'Dialog mit M\u00f4ra (Chat)'
      ],
      badge: 'Demo-Dashboard (simulierte Daten)'
    },
    panelTitle: 'M\u00f4ra Blick in das Myzel',
    panelSub: 'Folder \u00b7 Field \u00b7 Insights \u00b7 Chat',
    cta: 'Demo ansehen'
  },
  en: {
    kicker: 'Forest \u00b7 Mycelium \u00b7 Dashboard',
    title: 'What rustles above connects below',
    intro:
      'Every organisation has an invisible mycelium of data, decisions, and relationships. M\u00f4ra reveals this \u2013 as dashboard, field view, and dialogue.',
    forest: {
      title: 'Above: the forest',
      points: [
        'Teams, projects, signals \u2013 many voices, little time',
        'We only gather what is needed for clarity',
        'No noise, no promises that don\u2019t exist'
      ]
    },
    mycelium: {
      title: 'Below: the mycelium',
      lines: [
        'Connect sources',
        'See the field (mycelium)',
        'Context & insights',
        'Dialogue with M\u00f4ra (chat)'
      ],
      badge: 'Demo dashboard (simulated data)'
    },
    panelTitle: 'M\u00f4ra view into the mycelium',
    panelSub: 'Folder \u00b7 Field \u00b7 Insights \u00b7 Chat',
    cta: 'See the demo'
  }
} as const;

function MiniDashboard({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const lines = t.mycelium.lines;
  return (
    <div className="rounded-3xl border border-white/15 bg-white/8 backdrop-blur-xl p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-saimor-gold">{t.mycelium.badge}</p>
          <h3 className="text-lg sm:text-xl font-semibold text-white">{t.panelTitle}</h3>
          <p className="text-sm text-white/70">{t.panelSub}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85">
          <MonitorSmartphone className="w-4 h-4" />
          Môra
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Network className="w-4 h-4" />
            {locale === 'de' ? 'Myzel-Ansicht' : 'Field view'}
          </div>
          <div className="space-y-2">
            {lines.map((line) => (
              <div key={line} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/80">
                {line}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <MessageCircle className="w-4 h-4" />
            {locale === 'de' ? 'Dialog mit Môra' : 'Dialogue with Môra'}
          </div>
          <div className="rounded-xl bg-[#0f1f17] border border-white/10 px-3 py-2 text-sm text-white/85 shadow-inner">
            {locale === 'de'
              ? '„Welche Signale verbinden People & Process?“'
              : '“Which signals connect people & process?”'}
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/80">
            {locale === 'de'
              ? 'Antwort nach kurzer Reflexion – ruhig, mit Kontext.'
              : 'Response after brief reflection – calm, with context.'}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyceliumSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section
      id="mycelium"
      className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        background: 'linear-gradient(180deg, rgba(12,24,19,0.98) 0%, rgba(14,26,22,0.94) 40%, rgba(10,20,16,0.96) 100%)'
      }}
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 25% 20%, rgba(212,180,131,0.35), transparent 55%)' }}
      />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 75% 10%, rgba(74,103,65,0.25), transparent 55%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 space-y-10">
        <header className="space-y-3 text-center text-white">
          <p className="text-xs uppercase tracking-[0.45em] text-saimor-gold">{t.kicker}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">{t.intro}</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2 text-saimor-gold mb-3">
                <Leaf className="w-5 h-5" />
                <span className="text-sm font-semibold">{t.forest.title}</span>
              </div>
              <ul className="space-y-2 text-white/80 leading-relaxed text-sm sm:text-base">
                {t.forest.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-saimor-gold font-semibold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="flex items-center gap-2 text-saimor-gold mb-3">
                <Network className="w-5 h-5" />
                <span className="text-sm font-semibold">{t.mycelium.title}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">{t.mycelium.badge}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm sm:text-base text-white/85">
                {t.mycelium.lines.map((line) => (
                  <div key={line} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-saimor-gold flex-shrink-0" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <MiniDashboard locale={locale} />
        </div>
      </div>
    </section>
  );
}

export default memo(MyceliumSection);
