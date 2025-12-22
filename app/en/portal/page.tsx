import Link from 'next/link';
import PortalPreview from '@/components/PortalPreview';

export const metadata = {
  title: 'Saimôr Portal – Calm Access (Demo)',
  description: 'UI shell for the upcoming customer portal – no login yet, but guided areas, dashboard shell and trust room already exist.'
};

export default function PortalPageEn() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1512] via-[#101f1a] to-[#0a1410] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 25%, rgba(212,168,87,0.15), transparent 50%)' }} />
        <div className="relative mx-auto max-w-5xl px-6 py-24 space-y-16">
          <header className="space-y-6 text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-saimor-gold">Saimôr · Portal</p>
            <h1 className="text-4xl sm:text-5xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              A calm space where teams will log in
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
              Login is still disabled – but the structure is ready. Here we show how the portal will work and how today&apos;s demo shell already links the same data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/en#waitlist"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-white/10 min-h-[44px]"
              >
                Experience the demo
              </Link>
              <Link
                href="/en/mora"
                className="inline-flex items-center justify-center rounded-2xl bg-saimor-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#0E1A1B] transition hover:bg-saimor-gold-light min-h-[44px]"
              >
                Read about Môra
              </Link>
            </div>
          </header>

          <PortalPreview locale="en" />
        </div>
      </div>
    </div>
  );
}
