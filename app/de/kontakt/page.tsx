import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Kontakt & Beratung – Saimôr',
  description: 'Kostenloses Erstgespräch buchen. Professionelle Beratung für Transformation & digitale Klarheit. Wir antworten innerhalb 24h.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0a1612] to-[#081410] text-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-emerald-400">✅</span>
            <span className="text-sm font-medium text-emerald-300">24h Antwortzeit garantiert</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Lass uns
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              sprechen
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Ein kostenloses Erstgespräch über deine Herausforderungen. Kein Pitch, nur ehrliche Beratung
            für Transformation und digitale Klarheit.
          </p>

          {/* Quick CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cal.com/saimor/30min"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
            >
              <span>30-Minuten Gespräch buchen</span>
              <span>→</span>
            </a>
            <span className="text-sm text-white/50 self-center">oder direkt unten schreiben</span>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
              <span className="text-emerald-400">⏰</span>
            </div>
            <h3 className="font-semibold text-white">Schnell</h3>
            <p className="text-sm text-white/60">Innerhalb 24h Antwort</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
              <span className="text-emerald-400">✅</span>
            </div>
            <h3 className="font-semibold text-white">Kostenlos</h3>
            <p className="text-sm text-white/60">Erstgespräch ohne Verpflichtung</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto">
              <span className="text-emerald-400">🇪🇺</span>
            </div>
            <h3 className="font-semibold text-white">Remote</h3>
            <p className="text-sm text-white/60">EU-basiert, sicher & DSGVO-konform</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-white">Warum wir?</h2>
              <p className="text-white/70 leading-relaxed">
                Wir sind keine typische Beratung. Wir bauen Systeme, die wirklich funktionieren.
                Unser Fokus liegt auf nachhaltiger Transformation, nicht auf kurzfristigen Projekten.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-400">✉️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Direkter Kontakt</h3>
                  <p className="text-white/60 text-sm">contact@saimor.world</p>
                  <p className="text-white/50 text-xs mt-1">Für alle Anfragen und Fragen</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-emerald-400">⏰</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Verfügbarkeit</h3>
                  <p className="text-white/60 text-sm">Montag - Freitag, 9:00 - 17:00 CET</p>
                  <p className="text-white/50 text-xs mt-1">Schnelle Reaktionszeit garantiert</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-semibold mb-2 text-white">Schreib uns</h2>
              <p className="text-white/70">Oder buche direkt einen Termin – wie du möchtest.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <ContactForm locale="de" />
            </div>

            <div className="text-center">
              <p className="text-white/50 text-sm">
                Deine Daten sind sicher. Wir nutzen sie nur für diese Anfrage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}