import Link from "next/link";
import MoraDashboard from "@/components/MoraDashboard";

const featureCards = [
  {
    title: 'Not a mirror',
    body: 'Môra does not just reflect data, it remembers patterns and connections.'
  },
  {
    title: 'A memory',
    body: 'Like mycelium in forest soil, Môra connects what belongs together – calm and clear.'
  },
  {
    title: 'Local & secure',
    body: 'Fully local, EU-hosted, GDPR-compliant. Your data stays your data.'
  }
];

export const metadata = {
  title: 'Môra – Resonance Dashboard',
  description: 'Calm explanation of the Môra experience: demo mode, data flow, and the bridge between orb, dashboard, and system.',
};

export default function MoraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1F17] via-[#13261D] to-[#0F1F17] text-slate-100">
      <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(212,168,87,0.18), transparent 55%)' }} />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 10%, rgba(74,103,65,0.2), transparent 50%)' }} />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-16 lg:py-24 space-y-12">
        <header className="space-y-6 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-saimor-gold">Môra · The memory of Saimôr</p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Not a mirror.<br />
            <span className="text-saimor-teal italic">A memory.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Môra is the semantic memory of Saimôr. It recognizes patterns, understands context, and shows what belongs together.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
            <span className="rounded-full border border-white/20 px-4 py-1.5 bg-white/5">Demo with sample data</span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 bg-white/5">Local & secure</span>
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
              <p className="text-xs uppercase tracking-[0.35em] text-saimor-gold">Demo</p>
              <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                This is what Môra looks like
              </h2>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href="/mora" className="rounded-2xl border border-white/30 px-4 py-2 font-semibold text-white/90 hover:bg-white/10 transition">
                Zur deutschen Seite
              </Link>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-3 sm:p-4">
            <MoraDashboard locale="en" />
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 space-y-4 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-saimor-gold">Next step</p>
          <h2 className="text-3xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Dive deeper
          </h2>
          <p className="text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
            Discover the full Môra experience: VHS archives, emotional semantics, and how Môra learns from German broadcast data.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm pt-4">
            <Link href="/en/mora/analog-affect" className="rounded-2xl bg-saimor-teal px-6 py-3 font-bold text-black shadow-lg shadow-saimor-teal/20 hover:scale-105 transition">
              Experience Môra Analog Affect
            </Link>
            <Link href="/en" className="rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white/90 hover:bg-white/10 transition">
              Back to homepage
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
