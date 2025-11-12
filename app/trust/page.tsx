import Link from 'next/link';
import type { Metadata } from 'next';

const demoLink = '/docs/architecture/DATA_FLOW_EXPLAINED.md';

const techItems = [
  'Datenerzeugung: lokal (Mock/Simulation)',
  'Verarbeitung: Saimôr Core (lokal) → Môra UI → Website',
  'Tracking: keins',
  'Cookies: nur technisch notwendig (falls vorhanden)'
];

export const metadata: Metadata = {
  title: 'Trust & Sicherheit – Saimôr',
  description: 'Transparenz über Demo-Daten, lokale Verarbeitung und EU-Datenschutz.'
};

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf9] to-white text-gray-800">
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-semibold text-[#4A6741]">
            Saimôr
          </Link>
          <Link href="/" className="text-sm text-gray-600 transition hover:text-gray-900">
            ← Zurück zur Startseite
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-10 px-6 py-16">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4B483]">
            Transparenz &amp; Sicherheit
          </p>
          <h1 className="font-serif text-4xl text-[#0E1A1B]">Ruhig, nachvollziehbar, bewusst.</h1>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Saimôr befindet sich in der Prototyp-/Demo-Phase. Alle gezeigten Werte basieren auf lokal
              generierten Demo-Daten – ohne externe Cloud-Abhängigkeiten und ohne Profilbildung.
            </p>
            <p>
              Für echte Projekte gilt: Datensparsamkeit, klare Rollen &amp; Rechte, Export jederzeit.
              EU-Recht (DSGVO) ist die Basis.
            </p>
            <Link
              href={demoLink}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center text-sm text-[#4A6741] transition hover:text-[#2f4729]"
            >
              Mehr erfahren zur Demo-Architektur →
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0E1A1B]">Technischer Rahmen</h2>
          <ul className="space-y-3 text-base leading-relaxed">
            {techItems.map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#D4B483]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-[#D4B483]/40 bg-white/70 p-5 text-sm text-gray-700">
            <strong>Hinweis:</strong> Keine Produktivaussagen. Keine personenbezogenen Daten in der Demo.
          </div>
        </section>
      </main>
    </div>
  );
}
