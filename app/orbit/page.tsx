import { Repeat, Target, Heart, Sparkles } from 'lucide-react';

export default function OrbitPage() {
  const benefits = [
    { icon: Target, title: 'Orientierung', text: 'Regelmäßiger Rhythmus statt Meeting-Chaos.', color: '#10B981' },
    { icon: Heart, title: 'Tiefe', text: 'Raum für das, was wirklich zählt.', color: '#06B6D4' },
    { icon: Sparkles, title: 'Kontinuität', text: 'Begleitung im permanenten Wandel.', color: '#8B5CF6' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0a1612] to-[#081410] text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-emerald-400">🔄</span>
            <span className="text-sm font-medium text-emerald-300">Orbit Framework</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Regelmäßige
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              Begleitung
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Strukturierte Prozesse für kontinuierliche Entwicklung. Kein Meeting-Marathon,
            sondern zielgerichtete Begleitung im Wandel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, i) => (
            <div key={benefit.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: `${benefit.color}20` }}>
                <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
              <p className="text-white/70 leading-relaxed">{benefit.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <Repeat className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Orbit-Framework</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Das Orbit-Framework bietet strukturierte Begleitung für Teams und Organisationen,
              die kontinuierliche Entwicklung suchen.
            </p>
            <a
              href="/de/kontakt"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
            >
              <span>Mehr erfahren</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}