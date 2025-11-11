import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Database, Server, Users, Lock, Eye, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trust & Sicherheit – Saimôr',
  description: 'Human-in-the-Loop, Datenhoheit, EU-Cloud, DSGVO-Grundsätze – Transparenz bei Saimôr',
};

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#4A6741' }}>
            Saimôr
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Zurück zur Startseite
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              background: 'linear-gradient(135deg, #4A6741 0%, #D4B483 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Trust & Sicherheit
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparenz über unsere Grundsätze, Datenverarbeitung und Sicherheitsarchitektur
          </p>
        </div>

        {/* MVP Context Banner */}
        <div
          className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 180, 131, 0.1) 0%, rgba(212, 180, 131, 0.05) 100%)',
            borderColor: '#D4B483'
          }}
        >
          <AlertCircle className="w-6 h-6 text-[#D4B483] flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-1">MVP-Phase – Simulations-Umgebung</h2>
            <p className="text-gray-700">
              Aktuell läuft Môra als MVP-Prototyp mit lokal generierten Demo-Daten.
              Die hier beschriebenen Hosting-Optionen (EU-Cloud, On-Premises) sind Teil der Roadmap
              und werden vor Launch verfügbar sein. Keine Kundendaten werden aktuell verarbeitet.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Human-in-the-Loop */}
          <section className="rounded-2xl p-8 border-2 border-[#4A6741]/20 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-start gap-4 mb-4">
              <Users className="w-8 h-8 text-[#4A6741] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Human-in-the-Loop</h2>
                <p className="text-gray-700 leading-relaxed">
                  Môra trifft <strong>keine autonomen Entscheidungen</strong>. Alle Handlungen erfordern menschliche Bestätigung.
                  Das System dient als intelligente Assistenz, die Vorschläge macht – die finale Entscheidung liegt immer beim Menschen.
                </p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4A6741] flex-shrink-0 mt-0.5" />
                    <span>Alle Aktionen erfordern Nutzer-Bestätigung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4A6741] flex-shrink-0 mt-0.5" />
                    <span>Transparente Begründungen für jeden Vorschlag</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4A6741] flex-shrink-0 mt-0.5" />
                    <span>Audit-Logs für Nachvollziehbarkeit</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Datenhoheit */}
          <section className="rounded-2xl p-8 border-2 border-[#D4B483]/20 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-start gap-4 mb-4">
              <Database className="w-8 h-8 text-[#D4B483] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Datenhoheit</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ihre Daten gehören Ihnen. Wir verarbeiten nur aggregierte Business-Daten,
                  <strong> keine personenbezogenen Mitarbeiterdaten</strong>. Sie behalten jederzeit die volle Kontrolle.
                </p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                    <span>Ausschließlich aggregierte Geschäftsdaten (KPIs, Metriken)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                    <span>Keine Einzelpersonen-Tracking (Mindestgruppengröße: 5 Personen)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                    <span>Export & Löschung jederzeit auf Anfrage</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Hosting-Optionen */}
          <section className="rounded-2xl p-8 border-2 border-[#4A6741]/20 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-start gap-4 mb-4">
              <Server className="w-8 h-8 text-[#4A6741] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Hosting-Optionen</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sie wählen, wo Ihre Daten liegen: EU-Cloud (Standard) oder On-Premises auf Ihrer Infrastruktur.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-xl bg-white border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">EU-Cloud (Standard)</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>🇪🇺 Server in Deutschland/EU</li>
                      <li>✅ DSGVO-konform</li>
                      <li>🔒 ISO 27001 zertifiziert</li>
                      <li>⚡ Schnell & wartungsfrei</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">On-Premises</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>🏢 Auf Ihrer Infrastruktur</li>
                      <li>🔐 Maximale Kontrolle</li>
                      <li>📍 Luftspalt-Option möglich</li>
                      <li>⚙️ Self-Hosting-Support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DSGVO-Grundsätze */}
          <section className="rounded-2xl p-8 border-2 border-[#D4B483]/20 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="w-8 h-8 text-[#D4B483] flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">DSGVO-Grundsätze</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Wir halten uns strikt an die Datenschutz-Grundverordnung (DSGVO):
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Datenminimierung:</strong> Nur relevante Business-Metriken, keine überflüssigen Daten
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Transparenz:</strong> Sie sehen jederzeit, welche Daten verarbeitet werden
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Sicherheit:</strong> Ende-zu-Ende-Verschlüsselung, Zugriffskontrolle, Audit-Logs
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4B483] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Betroffenenrechte:</strong> Auskunft, Berichtigung, Löschung jederzeit möglich
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* KI-Kern & Orbs */}
          <section className="rounded-2xl p-8 border-2 border-[#4A6741]/20 bg-gradient-to-br from-white to-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Architektur-Grundsatz</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Ein KI-Kern pro Organisation.</strong> Môra ist ein zentrales System,
              das verschiedene Rollen-Views (&ldquo;Orbs&rdquo;) bereitstellt – keine separaten KI-Instanzen pro Abteilung.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Orbs = Views, nicht Entscheidungsträger.</strong> Ein Orb (z.B. &ldquo;Finanzen&rdquo;, &ldquo;HR&rdquo;, &ldquo;Bürgerservice&rdquo;)
              ist eine spezialisierte Ansicht auf dieselben Daten. Es gibt keine autonomen Teil-KIs,
              die unabhängig agieren.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-16 p-6 rounded-xl bg-gray-100 border border-gray-200 text-sm text-gray-600">
          <p className="mb-2">
            <strong>Hinweis:</strong> Diese Seite beschreibt technische Grundsätze und Sicherheitskonzepte.
            Sie stellt keine Rechtsberatung dar und ersetzt nicht die rechtlich verbindliche Datenschutzerklärung.
          </p>
          <p>
            Rechtlich verbindliche Informationen finden Sie unter{' '}
            <Link href="/legal" className="text-[#4A6741] underline hover:text-[#5D7C54]">
              /legal
            </Link>.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#waitlist"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #4A6741 0%, #5D7C54 100%)',
              boxShadow: '0 8px 24px rgba(74, 103, 65, 0.3)'
            }}
          >
            Zur Warteliste
          </Link>
        </div>
      </main>
    </div>
  );
}
