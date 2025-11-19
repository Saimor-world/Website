export const metadata = {
  title: "Saimôr · Demo",
  description: "Entry point to the calm Môra demo preview."
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0c1813] via-[#0f1f17] to-[#0c1813] text-white">
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-saimor-gold">Demo</p>
        <h1 className="text-4xl font-semibold" style={{ fontFamily: "Cormorant Garamond, serif" }}>
          Live Demo Panel
        </h1>
        <p className="text-lg text-white/80 leading-relaxed">
          Dies ist der ruhige Zugang zur simulierten Demo. Die aktuelle Vorschau findest du im
          Live Demo Panel auf der Startseite. Direkte Logins folgen, sobald reale Datenquellen
          angebunden sind.
        </p>
      </div>
    </main>
  );
}
