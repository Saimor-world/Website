import Link from "next/link";
import MoraDashboard from "@/components/MoraDashboard";
import DataFlowDiagram from "@/components/DataFlowDiagram";

const featureCards = [
  {
    title: 'What is Môra?',
    body: 'Môra is our resonance dashboard. It connects orb, chat and dashboard into one calm space where data becomes context – currently as a demo with simulated data.'
  },
  {
    title: 'How does it feel?',
    body: 'Slow, clear, auditable. Responses come after short reflection. Every view carries the note “Demo dashboard (simulated data)” and stays readable on mobile.'
  },
  {
    title: 'What does it show today?',
    body: 'Chat + dashboard in one block: folder and field view, demo KPIs, a subtle link between orb and dashboard. No customer data – only the process.'
  }
];

export const metadata = {
  title: 'Môra – Resonance Dashboard',
  description: 'Calm explanation of the Môra experience: demo mode, data flow, and the bridge between orb, dashboard, and system.',
};

export default function MoraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1F17] via-[#13261D] to-[#0F1F17] text-slate-100">
      <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(212,180,131,0.18), transparent 55%)' }} />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 10%, rgba(74,103,65,0.2), transparent 50%)' }} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-16 lg:py-24 space-y-12">
        <header className="space-y-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-saimor-gold">Môra · Demo mode</p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Resonance dashboard for calm clarity
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            We are open about how the demo works: simulated data, adapters, core API, UI. Everything local, quiet, auditable – a preview of the productive integration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
            <span className="rounded-full border border-white/20 px-4 py-1.5 bg-white/5">Demo dashboard (simulated data)</span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 bg-white/5">Orb ↔ Dashboard ↔ System</span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 bg-white/5">EU-hosted · audit-ready</span>
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
              <p className="text-xs uppercase tracking-[0.35em] text-saimor-gold">Live demo</p>
              <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Chat + dashboard in one block
              </h2>
              <p className="text-base text-white/80 max-w-3xl leading-relaxed">
                One data stream, two angles: chat on top, folder and field view below. Every number has a demo label, every interaction stays quiet.
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href="/en#waitlist" className="rounded-2xl bg-saimor-gold px-4 py-2 font-semibold text-[#0E1A1B] shadow-lg shadow-saimor-gold/20 hover:bg-saimor-gold-light transition">
                See the demo
              </Link>
              <Link href="/mora" className="rounded-2xl border border-white/30 px-4 py-2 font-semibold text-white/90 hover:bg-white/10 transition">
                Zur deutschen Seite
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-4">
            <MoraDashboard locale="en" />
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 space-y-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-saimor-gold">Data flow</p>
            <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Demo data → adapter → core API → UI → website
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Everything comes from mock streams. We practice logging, audit, and roles – just without real customer data. You see early how integration will look later.
            </p>
          </div>
          <DataFlowDiagram locale="en" />
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 space-y-4">
          <p className="text-xs tracking-[0.35em] uppercase text-saimor-gold">Connection</p>
          <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Orb · chat · dashboard – one core
          </h2>
          <p className="text-base text-white/80 leading-relaxed max-w-3xl">
            The orb reacts to focus, the chat feeds insights, the dashboard shows the same signals – only visualized. Everything remains calm and traceable.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/en#contact" className="rounded-2xl border border-white/30 px-4 py-2 font-semibold text-white/90 hover:bg-white/10 transition">
              Start a calm intro call
            </Link>
            <Link href="/en#waitlist" className="rounded-2xl bg-saimor-gold px-4 py-2 font-semibold text-[#0E1A1B] shadow-lg shadow-saimor-gold/20 hover:bg-saimor-gold-light transition">
              Secure early access
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
