import Link from 'next/link';
import DataFlowDiagram from '@/components/DataFlowDiagram';

export const metadata = {
  title: 'Môra – KI-Begleiterin von Saimôr',
  description: 'Ruhige Erklärung der Môra-Erfahrung: Demo-Modus, Datenfluss und Verbindung zwischen Orb, Dashboard und System.'
};

const sections = [
  {
    title: 'Was ist Môra?',
    body: 'Môra ist der ruhige Resonanzraum im Saimôr-Ökosystem. Sie führt durch Unsicherheit, beobachtet Signale und übersetzt Komplexität in handlungsfähige Impulse. Immer mit Zeit zum Verstehen, nie mit Lautstärke.'
  },
  {
    title: 'Wie fühlt sie sich an?',
    body: 'Im MVP bewegt sich Môra bewusst langsam: Orb-Interaktion, Dashboard-Module, stille Hinweise. Sie atmet mit dem Team, reagiert erst nach Reflexion – und widerspricht auch freundlich, wenn etwas nicht klar ist.'
  },
  {
    title: 'Was macht sie heute?',
    body: 'Sie zeigt Demo-Dashboards, beantwortet Fragen, verbindet Orb und Dashboard mit demselben Datenstrom. Noch ohne echte Kundendaten, aber mit dem kompletten Prozess, den wir später live einsetzen.'
  }
];

export default function MoraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1F17] via-[#13261D] to-[#0F1F17] text-slate-100">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(212,180,131,0.15), transparent 60%)' }} />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-saimor-gold-500/40 to-transparent opacity-70" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 space-y-24">
          <header className="space-y-6 text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-saimor-gold">Saimôr · Produktwelt</p>
            <h1 className="text-4xl sm:text-5xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Môra – KI als Resonanzraum, nicht als Lärm
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Wir zeigen offen, wie die Demo funktioniert: simulierte Daten, Adapter, Core-API und UI. Alles lokal, alles ruhig.
            </p>
          </header>

          <section className="grid gap-8">
            {sections.map(section => (
              <article
                key={section.title}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <h2 className="text-2xl font-semibold mb-3 text-saimor-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title}
                </h2>
                <p className="text-base text-white/80 leading-relaxed">
                  {section.body}
                </p>
              </article>
            ))}
          </section>

          <section className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-saimor-gold">Demo-Modus</p>
              <h2 className="text-3xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Simulierte Daten – echte Transparenz</h2>
              <p className="text-base text-white/80 leading-relaxed">
                Alle Werte stammen aus Mock-Streams. Wir testen bereits Auth, Logging und Audit, nur ohne Kundensysteme. Jede Anzeige ist als „Demo-Dashboard (simulierte Daten)“ markiert.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/#kontakt"
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Ruhigen Erstkontakt starten
              </Link>
              <Link
                href="/#waitlist"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-saimor-gold px-6 py-3 text-base font-semibold text-[#0E1A1B] transition hover:bg-saimor-gold-light"
              >
                Demo ansehen
              </Link>
            </div>
          </section>

          <DataFlowDiagram locale="de" />

          <section className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase text-saimor-gold">Verbindung</p>
            <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Orb → Dashboard → System
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Der Orb atmet, wenn jemand hinsieht. Dashboard-Kacheln reagieren, sobald eine Karte fokussiert wird. Alles ist der gleiche Datenstrom – nur leise.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
