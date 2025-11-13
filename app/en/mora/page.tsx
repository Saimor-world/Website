import Link from 'next/link';
import DataFlowDiagram from '@/components/DataFlowDiagram';

export const metadata = {
  title: 'Môra – Calm AI Companion by Saimôr',
  description: 'Narrative walkthrough of Môra: how she feels, how the demo stack works, and how data flows from mock sources into the website.'
};

const sections = [
  {
    title: 'What is Môra?',
    body: 'Môra is the calm companion inside the Saimôr ecosystem. She guides teams through ambiguity, watches signals and translates complexity into grounded action – always with time to understand.'
  },
  {
    title: 'How does it feel?',
    body: 'In the MVP she moves slowly on purpose: orb interactions, dashboard modules, quiet hints. She breathes with the team and only reacts once she has reflected – even disagreeing gently when something is unclear.'
  },
  {
    title: 'What can she do today?',
    body: 'She shows demo dashboards, answers questions and keeps the orb + dashboard on one shared data stream. No production data yet, but the full process that will later run live is already in place.'
  }
];

export default function MoraPageEn() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1F17] via-[#13261D] to-[#0F1F17] text-slate-100">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(212,180,131,0.15), transparent 60%)' }} />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-saimor-gold-500/40 to-transparent opacity-70" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 space-y-24">
          <header className="space-y-6 text-center">
            <p className="text-xs tracking-[0.5em] uppercase text-saimor-gold">Saimôr · Product universe</p>
            <h1 className="text-4xl sm:text-5xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Môra – AI as resonance, never as noise
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              We openly share how the demo works: simulated data, adapters, core API and UI. Everything local, everything calm.
            </p>
          </header>

          <section className="grid gap-8">
            {sections.map(section => (
              <article
                key={section.title}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <h2 className="text-2xl font-semibold mb-3 text-saimor-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title}
                </h2>
                <p className="text-base text-white/80 leading-relaxed">
                  {section.body}
                </p>
              </article>
            ))}
          </section>

          <section className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-saimor-gold">Demo status</p>
              <h2 className="text-3xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Simulated data, radical transparency</h2>
              <p className="text-base text-white/80 leading-relaxed">
                Every value comes from mock streams. Auth, logging and audit already run as in production – only the inputs are simulated. Each card is labelled “Demo Dashboard (simulated data)” to keep things clear.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/en#kontakt"
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Start a calm first contact
              </Link>
              <Link
                href="/en#waitlist"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-saimor-gold px-6 py-3 text-base font-semibold text-[#0E1A1B] transition hover:bg-saimor-gold-light"
              >
                See the demo
              </Link>
            </div>
          </section>

          <DataFlowDiagram locale="en" />

          <section className="rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase text-saimor-gold">Connection</p>
            <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Orb → Dashboard → System
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              The orb inhales when someone pays attention. Dashboard tiles respond whenever a card is focused. Everything rides on the same data stream – just quietly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
