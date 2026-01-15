export default function DemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0a1612] to-[#081410] text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-emerald-400">🎮</span>
            <span className="text-sm font-medium text-emerald-300">Interaktive Live-Demo</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Môra
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              live erleben
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Entdecke das semantische Dashboard in Aktion. Sieh, wie Môra Daten analysiert,
            Muster erkennt und klare Entscheidungsgrundlagen liefert – alles in Echtzeit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#demo"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
            >
              <span>🎮</span>
              <span>Demo starten</span>
            </a>
            <a
              href="/de/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-all"
            >
              <span>Persönliche Demo</span>
            </a>
          </div>
        </div>

        {/* Demo Panel */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2 text-white">Môra Live Demo</h3>
            <p className="text-white/60">Die interaktive Demo lädt gerade...</p>
          </div>
          <div className="aspect-video bg-white/5 rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <span className="text-6xl">🎮</span>
              <p className="text-white/70">Demo wird geladen...</p>
              <p className="text-sm text-white/50">
                Hier wird die vollständige Môra-Demo eingebettet, sobald alle Komponenten bereit sind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}