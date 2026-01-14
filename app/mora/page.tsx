import Link from "next/link";
import { Sparkles, Brain, Network, Shield, Zap, Eye, MessageSquare } from "lucide-react";

export const metadata = {
  title: 'Môra - Universe OS | Saimôr',
  description: 'Das semantische Gedächtnis für deine Organisation. Lokal, sicher, intelligent.',
};

export default function MoraPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Hero - Clear & Focused */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle space background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-black to-black" />
        
        {/* Animated stars - subtle */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-300 font-medium">Universe OS</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-light tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            <span className="block text-white/90">Kein Spiegel.</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Ein Gedächtnis.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Môra ist dein semantisches Betriebssystem. Sie erinnert sich an Muster, versteht Kontext 
            und zeigt, was zusammengehört.
          </p>

          {/* Key Features - Simple */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">100% Lokal</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Brain className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">KI-gestützt</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
              <Network className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">DSGVO-konform</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <a 
              href="#demo" 
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
            >
              Live Demo ansehen
            </a>
            <a 
              href="https://cal.com/saimor/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
            >
              Gespräch buchen
            </a>
          </div>
        </div>
      </section>

      {/* What is Universe OS - Clear Explanation */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Was ist das Universe OS?
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Stell dir vor, deine gesamte Organisation wäre ein lebendiges Universum. 
              Jedes Team ein Planet, jedes Projekt ein System, jeder Gedanke ein Stern.
            </p>
          </div>

          {/* 3 Core Concepts - Clean Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* 1. Semantic Memory */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/50 to-black border border-emerald-500/20 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Semantisches Gedächtnis</h3>
              <p className="text-white/60 leading-relaxed">
                Môra versteht nicht nur Daten, sie erinnert sich an <strong>Bedeutungen</strong> und <strong>Zusammenhänge</strong>.
              </p>
            </div>

            {/* 2. Visual Navigation */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/50 to-black border border-emerald-500/20 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Visuelle Navigation</h3>
              <p className="text-white/60 leading-relaxed">
                Navigiere durch <strong>Planeten</strong> (Abteilungen), <strong>Systeme</strong> (Bereiche) und <strong>Sterne</strong> (Daten).
              </p>
            </div>

            {/* 3. AI Companion */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/50 to-black border border-emerald-500/20 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">KI-Begleitung</h3>
              <p className="text-white/60 leading-relaxed">
                Stelle Fragen, erhalte <strong>Insights</strong> und entdecke <strong>Muster</strong> in deinen Daten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo - Simplified */}
      <section id="demo" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-6">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">Live Demo</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Erlebe Môra live
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Interaktives Dashboard mit simulierten Daten. So könnte deine Organisation aussehen.
            </p>
          </div>

          {/* Demo Container - Clean & Focused */}
          <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-emerald-950/30 to-black backdrop-blur-xl overflow-hidden p-8 md:p-12">
            
            {/* Demo Content Placeholder */}
            <div className="space-y-8">
              
              {/* Chat Demo */}
              <div className="p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-semibold">Frag Môra etwas</h3>
                </div>
                
                <div className="space-y-4">
                  <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>Wie kann ich Team-Produktivität steigern?</span>
                    </div>
                  </button>
                  
                  <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>Zeig mir Budget-Optimierungen</span>
                    </div>
                  </button>
                  
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-emerald-400 mb-2">Môra antwortet...</p>
                        <p className="text-white/80 text-sm">
                          Basierend auf deinen aktuellen KPIs empfehle ich: 1) Wöchentliche Klarheitsgespräche, 
                          2) Fokus-Zeiten ohne Meetings, 3) Klare Ziele & Milestones.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Preview - Simple */}
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: 'Team-Engagement', value: 87, status: 'good' },
                  { label: 'Prozess-Effizienz', value: 92, status: 'good' },
                  { label: 'Klarheitsindex', value: 91, status: 'good' }
                ].map((metric, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm">
                    <div className="text-sm text-white/50 mb-2">{metric.label}</div>
                    <div className="text-3xl font-bold text-emerald-400 mb-3">{metric.value}%</div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Demo Link */}
              <div className="text-center pt-8">
                <p className="text-white/60 mb-4">
                  Möchtest du mehr sehen?
                </p>
                <a 
                  href="https://cal.com/saimor/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 transition-all"
                >
                  <span>Vollständige Demo buchen</span>
                  <Sparkles className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* How it Works - Simple Steps */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Wie funktioniert es?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Drei einfache Schritte zu deinem semantischen Betriebssystem
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                num: '01',
                title: 'Verbinde deine Daten',
                desc: 'Email, Kalender, Dokumente, Tools - Môra integriert sich nahtlos in deine bestehende Infrastruktur.'
              },
              {
                num: '02',
                title: 'Môra lernt & verknüpft',
                desc: 'Die KI analysiert Muster, versteht Kontext und erstellt ein semantisches Netzwerk deiner Organisation.'
              },
              {
                num: '03',
                title: 'Navigiere & frage',
                desc: 'Nutze das Universe OS Interface oder frage Môra direkt. Sie kennt alle Zusammenhänge.'
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-8 items-start p-8 rounded-2xl bg-gradient-to-r from-emerald-950/20 to-transparent border-l-2 border-emerald-500/50">
                <div className="text-6xl font-light text-emerald-500/20" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 backdrop-blur-xl">
            <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
            
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Bereit für dein semantisches Betriebssystem?
            </h2>
            
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Lass uns sprechen. Wir zeigen dir, wie Môra deine Organisation transformieren kann.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://cal.com/saimor/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
              >
                Gespräch buchen
              </a>
              <Link
                href="/de/portal"
                className="px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
              >
                Portal erkunden
              </Link>
            </div>

            <div className="flex justify-center gap-8 pt-12 text-sm text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">
                ← Zurück zur Startseite
              </Link>
              <span>·</span>
              <Link href="/mora/analog-affect" className="hover:text-white/70 transition-colors">
                Analog Affect →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
