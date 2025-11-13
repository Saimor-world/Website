import Link from 'next/link';
import PortalPreview from '@/components/PortalPreview';

export const metadata = {
  title: 'Saimôr Portal – Ruhiger Zugriff (Demo)',
  description: 'UI-Shell für das kommende Kundenportal – noch ohne Login, aber bereits mit geführten Bereichen, Dashboard-Shell und Vertrauensraum.'
};

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1512] via-[#101f1a] to-[#0a1410] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(212,180,131,0.15), transparent 50%)' }} />
        <div className="relative mx-auto max-w-5xl px-6 py-24 space-y-16">
          <header className="space-y-6 text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-saimor-gold">Saimôr · Portal</p>
            <h1 className="text-4xl sm:text-5xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Ein Ort, an dem Teams ruhig einloggen können
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
              Der Login ist noch deaktiviert – aber die Struktur steht. Wir zeigen hier, wie das Portal später funktioniert und wie die Demo-Shell bereits heute verbunden ist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#waitlist"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-white/10 min-h-[44px]"
              >
                Demo erleben
              </Link>
              <Link
                href="/mora"
                className="inline-flex items-center justify-center rounded-2xl bg-saimor-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#0E1A1B] transition hover:bg-saimor-gold-light min-h-[44px]"
              >
                Über Môra lesen
              </Link>
            </div>
          </header>

          <PortalPreview locale="de" />
        </div>
      </div>
    </div>
  );
}
