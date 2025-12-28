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
  title: 'Môra – Semantic Memory | Saimôr',
  description: 'Experience Môra: The semantic memory of Saimôr. Live demo dashboard, intelligent pattern analysis, and local-first AI.',
};

export default function MoraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1410] via-[#0F1F17] to-[#0a1410] text-slate-100">
      {/* Premium Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(212,168,87,0.12), transparent 50%)' }} />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 80%, rgba(74,103,65,0.15), transparent 50%)' }} />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-40 sm:pb-24 space-y-16 sm:space-y-24">

        {/* Hero Header - 2026 Premium */}
        <header className="space-y-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4A857]/30 bg-[#D4A857]/5 text-xs tracking-widest uppercase text-[#D4A857]">
            <span className="w-2 h-2 rounded-full bg-[#D4A857] animate-pulse" />
            Môra · Semantic Memory
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Not a mirror.<br />
            <span className="bg-gradient-to-r from-[#D4A857] via-[#E6C897] to-[#D4A857] bg-clip-text text-transparent">A memory.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Môra recognizes patterns, understands context, and reveals what belongs together.
            Local. Secure. Intelligent.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">🔒 GDPR-compliant</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">💾 100% local</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/60">🧠 AI-powered</span>
          </div>
        </header>

        {/* Feature Cards - Premium Grid */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card, index) => (
            <article
              key={card.title}
              className="group relative rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 transition-all duration-500 hover:border-[#D4A857]/20 hover:bg-white/[0.04]"
            >
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-mono text-white/30">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-[#D4A857]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {card.title}
              </h2>
              <p className="text-white/60 leading-relaxed">{card.body}</p>
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4A857]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </article>
          ))}
        </section>

        {/* Dashboard Section - Premium Container */}
        <section className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A857]/5 via-transparent to-[#4A6741]/5 pointer-events-none" />

          <div className="relative p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#D4A857] mb-2">Live Demo</p>
                <h2 className="text-3xl sm:text-4xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  This is how Môra works
                </h2>
              </div>
              <Link
                href="/mora"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-sm font-medium text-white/70 hover:text-white hover:border-white/40 transition-all"
              >
                🌐 Deutsche Version
              </Link>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
              <MoraDashboard locale="en" />
            </div>
          </div>
        </section>

        {/* CTA Section - Premium */}
        <section className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#D4A857]/5 to-transparent p-10 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

          <div className="relative space-y-6 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.4em] text-[#D4A857]">Next Step</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Ready for more clarity?
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Explore the Portal and connect Môra with your systems.
              Or start a conversation with us.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/en/portal"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-[#0F1F17] transition-all hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #D4A857 0%, #C49745 100%)',
                  boxShadow: '0 8px 32px rgba(212, 168, 87, 0.3)'
                }}
              >
                Go to Portal →
              </Link>
              <Link
                href="/en"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all active:scale-95"
              >
                Back to homepage
              </Link>
            </div>

            {/* Easter Egg Trigger - Hidden */}
            <div
              className="mt-16 opacity-0 hover:opacity-30 transition-opacity duration-1000 cursor-default select-none"
              title="🔮"
            >
              <Link
                href="/en/mora/analog-affect"
                className="text-[10px] text-white/20 hover:text-[#D4A857]/40 transition-colors"
              >
                ⌘ · analog affect
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
