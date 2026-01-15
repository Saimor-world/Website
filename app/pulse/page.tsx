import { Activity, TrendingUp, BarChart3, Zap } from 'lucide-react';

export default function PulsePage() {
  const metrics = [
    { icon: Activity, title: 'Echtzeit-Monitoring', text: 'Live-Überwachung aller relevanten KPIs.', color: '#10B981' },
    { icon: TrendingUp, title: 'Trend-Analyse', text: 'Automatische Erkennung von Entwicklungsmustern.', color: '#06B6D4' },
    { icon: BarChart3, title: 'Performance Insights', text: 'Detaillierte Analysen und Handlungsempfehlungen.', color: '#8B5CF6' },
    { icon: Zap, title: 'Instant Alerts', text: 'Sofortige Benachrichtigungen bei kritischen Veränderungen.', color: '#F59E0B' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081410] via-[#0a1612] to-[#081410] text-white">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-emerald-400">📊</span>
            <span className="text-sm font-medium text-emerald-300">Pulse Analytics</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Live
            <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500">
              Pulse
            </span>
          </h1>

          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Kontinuierliche Überwachung und Analyse. Verstehen Sie Ihren Puls -
            die vitalen Zeichen Ihrer Organisation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {metrics.map((metric, i) => (
            <div key={metric.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: `${metric.color}20` }}>
                <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{metric.title}</h3>
              <p className="text-white/70 leading-relaxed">{metric.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12">
            <Activity className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4 text-white">Pulse Dashboard</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Das Pulse-Dashboard zeigt Ihnen in Echtzeit den Gesundheitszustand
              Ihrer Organisation und Projekte.
            </p>
            <a
              href="/demo"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
            >
              <span>Demo ansehen</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}