import { AlertCircle, Shield } from 'lucide-react';

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0a1612] to-[#081410] text-white">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">Rechtliches</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Impressum &
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              Datenschutz
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Rechtliche Informationen und Datenschutzbestimmungen für Saimôr.
          </p>
        </div>

        <div className="space-y-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">Impressum</h2>
            <div className="space-y-4 text-white/80">
              <div>
                <h3 className="font-semibold text-white mb-2">Verantwortlich</h3>
                <p>Saimôr GmbH</p>
                <p>Musterstraße 123</p>
                <p>12345 Musterstadt</p>
                <p>Deutschland</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Kontakt</h3>
                <p>E-Mail: contact@saimor.world</p>
                <p>Telefon: +49 (0) 123 456789</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Handelsregister</h3>
                <p>HRB 123456</p>
                <p>Amtsgericht Musterstadt</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-white">Datenschutz</h2>
            <div className="space-y-6 text-white/80">
              <div>
                <h3 className="font-semibold text-white mb-2">Datenschutz-Grundsätze</h3>
                <p>
                  Bei Saimôr steht der Datenschutz an erster Stelle. Wir verarbeiten nur die Daten,
                  die für die Erbringung unserer Dienstleistungen unbedingt erforderlich sind.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Ihre Rechte</h3>
                <p>
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung
                  Ihrer personenbezogenen Daten. Kontaktieren Sie uns jederzeit bei datenschutz@saimor.world.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Cookies</h3>
                <p>
                  Wir verwenden nur technisch notwendige Cookies. Weitere Informationen finden Sie
                  in unserer Cookie-Richtlinie.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-white">Wichtiger Hinweis</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Diese Seite befindet sich noch in der Entwicklung. Die rechtlichen Informationen
              werden laufend aktualisiert und vervollständigt.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}