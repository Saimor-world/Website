'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Shield, Sparkles, TrendingUp, UserCog, Zap } from 'lucide-react';

type Track = 'security' | 'digital-self' | 'ai-business';

const trackConfig: Record<
  Track,
  {
    title: string;
    subtitle: string;
    bullets: string[];
    primaryHref: string;
    stats: { label: string; value: string; trend: string }[];
  }
> = {
  security: {
    title: 'Security Intelligence',
    subtitle: 'Automatisierte Risiko-Analyse und Resilienz-Monitoring fuer Ihr Business.',
    bullets: ['Threat Detection', 'Identity Guard', 'Backup Confidence'],
    primaryHref: '/de/einstieg/security-check',
    stats: [
      { label: 'Blocked Threats', value: '1,284', trend: '+12%' },
      { label: 'Security Score', value: '94/100', trend: 'Stable' },
      { label: 'MFA Coverage', value: '100%', trend: 'Verified' },
    ],
  },
  'digital-self': {
    title: 'Digital Self Core',
    subtitle: 'Ihr KI-Zwilling fuer skalierbare Prozesse und entlastete Entscheider.',
    bullets: ['Context Memory', 'Decision Guard', 'Routine Automation'],
    primaryHref: '/de/einstieg/digital-self',
    stats: [
      { label: 'Hours Saved', value: '24h/wk', trend: '+4h' },
      { label: 'Mail Accuracy', value: '98.2%', trend: '+0.5%' },
      { label: 'Meeting Load', value: '-30%', trend: 'Reduced' },
    ],
  },
  'ai-business': {
    title: 'AI Business OS',
    subtitle: 'Das Betriebssystem fuer lokale Unternehmen im digitalen Wandel.',
    bullets: ['Lead Triage', 'Smart Quotes', 'Client Nurture'],
    primaryHref: '/de/einstieg/ai-local-business',
    stats: [
      { label: 'Lead Response', value: '< 2min', trend: 'Instant' },
      { label: 'Quote Volume', value: '+45%', trend: 'Growth' },
      { label: 'Customer Sat', value: '4.9/5', trend: 'Excellent' },
    ],
  },
};

const cards = [
  {
    icon: Activity,
    title: 'Realtime Signals',
    text: 'Live-Layer fuer Aktivitaet, Trends und Engpaesse.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Lens',
    text: 'Vom Einzelfall zur Entwicklung ueber mehrere Wochen.',
  },
  {
    icon: Shield,
    title: 'Trust Frame',
    text: 'Datenschutz und Security als Grundlinie fuer jeden Track.',
  },
  {
    icon: UserCog,
    title: 'Human Control',
    text: 'Automationen bleiben nachvollziehbar und steuerbar.',
  },
];

export default function DemoContent() {
  const params = useSearchParams();
  const trackParam = params?.get('track');

  const activeTrack = useMemo<Track>(() => {
    if (trackParam === 'security' || trackParam === 'digital-self' || trackParam === 'ai-business') {
      return trackParam;
    }
    return 'ai-business';
  }, [trackParam]);

  const track = trackConfig[activeTrack];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 space-y-16">
      <header className="space-y-7 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
        >
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span className="text-sm font-medium text-emerald-200">Mora Lab · Standbein Software</span>
        </motion.div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Demo-Zentrale fuer
          <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300">
            dein Standbein
          </span>
        </h1>

        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
          Pulse wurde funktional im Lab integriert. Diese Seite zeigt je nach Wunsch den passenden Softwarepfad.
        </p>
      </header>

      <section className="rounded-[2.5rem] border border-emerald-500/30 bg-black/40 p-8 sm:p-12 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.32em] text-emerald-400 font-bold">Mora Insight Panel</p>
            <h2 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {track.title}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {track.bullets.map((item) => (
              <span
                key={item}
                className="text-[11px] uppercase tracking-[0.13em] rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-white/60"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xl text-white/80 max-w-3xl leading-relaxed">{track.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {track.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-1">
              <p className="text-xs uppercase tracking-widest text-white/40">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-emerald-400 font-medium">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            href={track.primaryHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-emerald-300 transition-all shadow-xl shadow-white/5"
          >
            <span>Konfiguration starten</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/de/kontakt"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
          >
            <span>Live Demo buchen</span>
            <Zap className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {cards.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.07 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6 text-emerald-300" />
            </div>
            <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {item.title}
            </h3>
            <p className="text-white/65 leading-relaxed">{item.text}</p>
          </motion.article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-black/20 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-saimor-gold mb-4">Track Switch</p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/demo?track=security"
            className="inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white hover:bg-white/[0.08] transition-colors"
          >
            <span>Security</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo?track=digital-self"
            className="inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white hover:bg-white/[0.08] transition-colors"
          >
            <span>Digital Self</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo?track=ai-business"
            className="inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white hover:bg-white/[0.08] transition-colors"
          >
            <span>AI Business</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center space-y-5">
        <h2 className="text-4xl sm:text-5xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Direkt weitermachen
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Vom Software-Track direkt in den passenden Beitrag und in die jeweilige In-Page-Aktion.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={track.primaryHref}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold hover:shadow-lg transition-all"
          >
            <span>Zum aktiven Track-Beitrag</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="https://cal.com/saimor/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
          >
            <span>Strategiegespraech</span>
            <Zap className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
