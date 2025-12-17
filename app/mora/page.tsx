import Link from "next/link";
import MoraDashboard from "@/components/MoraDashboard";

const featureCards = [
  {
    title: 'Kein Spiegel',
    body: 'Môra reflektiert nicht nur Daten, sie erinnert sich an Muster und Zusammenhänge.'
  },
  {
    title: 'Ein Gedächtnis',
    body: 'Wie das Myzel im Waldboden verbindet Môra, was zusammengehört – ruhig und klar.'
  },
  {
    title: 'Lokal & sicher',
    body: 'Vollständig lokal, EU-gehostet, DSGVO-konform. Deine Daten bleiben deine Daten.'
  }
];

export const metadata = {
  title: 'Môra – Resonanz-Dashboard',
  description: 'Ruhige Erklärung der Môra-Erfahrung: Demo-Modus, Datenfluss und Verbindung zwischen Orb, Dashboard und System.',
};

export default function MoraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1F17] via-[#13261D] to-[#0F1F17] text-slate-100">
      {/* Background gradients - lighter on mobile */}
      <div className="absolute inset-0 opacity-25 pointer-events-none hidden md:block" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(212,168,87,0.18), transparent 55%)' }} />
      <div className="absolute inset-0 opacity-20 pointer-events-none hidden md:block" style={{ background: 'radial-gradient(circle at 80% 10%, rgba(74,103,65,0.2), transparent 50%)' }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24 space-y-8 sm:space-y-12">
        <header className="space-y-4 sm:space-y-6 text-center">
          <p className="text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-saimor-gold">Môra · Das Gedächtnis</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Kein Spiegel.<br />
            <span className="text-saimor-teal italic">Ein Gedächtnis.</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed px-2">
            Môra erkennt Muster, versteht Kontext und zeigt, was zusammengehört.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/80 px-4">
            <span className="rounded-full border border-white/20 px-3 py-1 bg-white/5">Demo</span>
            <span className="rounded-full border border-white/20 px-3 py-1 bg-white/5">Lokal & sicher</span>
          </div>
        </header>

        {/* Feature Cards - Compact stack on mobile */}
        <section className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card, index) => (
            <article
              key={card.title}
              className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-6 lg:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-saimor-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {card.title}
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">{card.body}</p>
            </article>
          ))}
        </section>

        {/* Dashboard Section - Full width on mobile, contained on desktop */}
        <section className="rounded-2xl sm:rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-6 lg:p-8 lg:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] space-y-4 sm:space-y-6">
          <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 sm:space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] text-saimor-gold">Demo</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                So sieht Môra aus
              </h2>
            </div>
            <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm">
              <Link href="/en/mora" className="rounded-xl sm:rounded-2xl border border-white/30 px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-white/90 hover:bg-white/10 transition">
                EN
              </Link>
            </div>
          </div>
          <div className="rounded-xl sm:rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-2 sm:p-3 lg:p-4">
            <MoraDashboard locale="de" />
          </div>
        </section>

        {/* CTA Section - Compact on mobile */}
        <section className="rounded-2xl sm:rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 lg:p-10 space-y-3 sm:space-y-4 text-center">
          <p className="text-xs tracking-[0.3em] sm:tracking-[0.35em] uppercase text-saimor-gold">Nächster Schritt</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Tiefer eintauchen
          </h2>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto px-2">
            Entdecke die vollständige Môra-Experience: VHS-Archive, emotionale Semantik.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 text-sm pt-3 sm:pt-4">
            <Link href="/mora/analog-affect" className="rounded-xl sm:rounded-2xl bg-saimor-teal px-5 sm:px-6 py-2.5 sm:py-3 font-bold text-black shadow-lg shadow-saimor-teal/20 hover:scale-105 transition active:scale-95">
              Môra Analog Affect erleben
            </Link>
            <Link href="/" className="rounded-xl sm:rounded-2xl border border-white/30 px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white/90 hover:bg-white/10 transition active:scale-95">
              Zurück zur Startseite
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
