import Link from "next/link";
import MoraDashboard from "@/components/MoraDashboard";
import DataFlowDiagram from "@/components/DataFlowDiagram";

const featureCards = [
  {
    title: 'Was ist Môra?',
    body: 'Môra ist unser Resonanz-Dashboard. Sie verbindet Orb, Chat und Dashboard zu einem ruhigen Raum, in dem Daten zu Kontext werden – aktuell als Demo mit simulierten Daten.'
  },
  {
    title: 'Wie fühlt sie sich an?',
    body: 'Langsam, klar, auditierbar. Antworten kommen nach kurzer Reflexion. Jede Anzeige trägt den Hinweis „Demo-Dashboard (simulierte Daten)“ und bleibt lesbar auf Mobilgeräten.'
  },
  {
    title: 'Was zeigt sie heute?',
    body: 'Chat + Dashboard in einem Block: Ordner- und Feld-Ansicht, Demo-KPIs, ruhige Animationslinie zwischen Orb und Dashboard. Keine echten Kundendaten – nur der Prozess.'
  }
];

export const metadata = {
  title: 'Môra – Resonanz-Dashboard',
  description: 'Ruhige Erklärung der Môra-Erfahrung: Demo-Modus, Datenfluss und Verbindung zwischen Orb, Dashboard und System.',
};

export default function MoraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1F17] via-[#13261D] to-[#0F1F17] text-slate-100">
      <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(212,180,131,0.18), transparent 55%)' }} />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 10%, rgba(74,103,65,0.2), transparent 50%)' }} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-16 lg:py-24 space-y-12">
        <header className="space-y-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-saimor-gold">Môra · Demo-Modus</p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Resonanz-Dashboard für ruhige Klarheit
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            Wir zeigen offen, wie die Demo funktioniert: simulierte Daten, Adapter, Core-API, UI. Alles lokal, leise, auditierbar – als Vorgeschmack auf die produktive Integration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
            <span className="rounded-full border border-white/20 px-4 py-1.5 bg-white/5">Demo-Dashboard (simulierte Daten)</span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 bg-white/5">Orb ↔ Dashboard ↔ System</span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 bg-white/5">EU-gehostet · auditbereit</span>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            >
              <h2 className="text-2xl font-semibold mb-3 text-saimor-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {card.title}
              </h2>
              <p className="text-base text-white/80 leading-relaxed">{card.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-saimor-gold">Live-Demo</p>
              <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Chat + Dashboard in einem Block
              </h2>
              <p className="text-base text-white/80 max-w-3xl leading-relaxed">
                Ein Datenstrom, zwei Blickwinkel: oben Chat, unten Ordner- und Feld-Ansicht. Jede Zahl trägt einen Demo-Hinweis, jede Interaktion bleibt leise.
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href="/#waitlist" className="rounded-2xl bg-saimor-gold px-4 py-2 font-semibold text-[#0E1A1B] shadow-lg shadow-saimor-gold/20 hover:bg-saimor-gold-light transition">
                Demo ansehen
              </Link>
              <Link href="/en/mora" className="rounded-2xl border border-white/30 px-4 py-2 font-semibold text-white/90 hover:bg-white/10 transition">
                Switch to English
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-4">
            <MoraDashboard locale="de" />
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 space-y-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-saimor-gold">Datenfluss</p>
            <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Demo-Daten → Adapter → Core API → UI → Website
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Alles stammt aus Mock-Streams. Wir üben Logging, Audit und Rollen – nur ohne echte Unternehmensdaten. So siehst du früh, wie Integration später aussieht.
            </p>
          </div>
          <DataFlowDiagram locale="de" />
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 space-y-4">
          <p className="text-xs tracking-[0.35em] uppercase text-saimor-gold">Verbindung</p>
          <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Orb · Chat · Dashboard – ein Kern
          </h2>
          <p className="text-base text-white/80 leading-relaxed max-w-3xl">
            Der Orb reagiert auf Fokus, der Chat speist Insights, das Dashboard zeigt dieselben Signale – nur visualisiert. Alles bleibt ruhig und nachvollziehbar.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/#kontakt" className="rounded-2xl border border-white/30 px-4 py-2 font-semibold text-white/90 hover:bg-white/10 transition">
              Ruhigen Erstkontakt starten
            </Link>
            <Link href="/#waitlist" className="rounded-2xl bg-saimor-gold px-4 py-2 font-semibold text-[#0E1A1B] shadow-lg shadow-saimor-gold/20 hover:bg-saimor-gold-light transition">
              Early Access sichern
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
