'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  Shield,
  Fingerprint,
  Boxes,
  ScanLine,
  FileSearch,
  LayoutDashboard,
  KeyRound,
  Sparkles,
  CalendarClock,
} from 'lucide-react';

type Track = 'security' | 'digital-self' | 'ai-business';

const trackConfig: Record<
  Track,
  {
    label: string;
    title: string;
    tagline: string;
    icon: typeof Shield;
    accent: string; // tailwind color stem, e.g. 'emerald'
    does: string[];
    article: string;
    live: boolean;
  }
> = {
  security: {
    label: 'Security Intelligence',
    title: 'Security-Check',
    tagline: 'Ein passiver Blick auf deine Domain – echte Befunde statt Score-Theater.',
    icon: Shield,
    accent: 'emerald',
    does: [
      'Prüft DMARC / SPF / DNS, TLS-Zertifikat und Security-Header',
      'Jeder Befund benennt den konkreten Angriffsweg, den er ermöglicht',
      'Die Ergebnisse wandern direkt in deinen Preview-Arbeitsbereich',
    ],
    article: '/de/einstieg/security-check',
    live: true,
  },
  'digital-self': {
    label: 'Digital Self',
    title: 'Digital Self',
    tagline: 'Ein KI-Profil, das deinen Kontext kennt – entlastet Entscheidungen und Routine.',
    icon: Fingerprint,
    accent: 'cyan',
    does: [
      'Baut aus deinen Informationen ein arbeitsfähiges Profil',
      'Hält Kontext fest, statt ihn in Chats zu verlieren',
      'Automationen bleiben nachvollziehbar und steuerbar',
    ],
    article: '/de/einstieg/digital-self',
    live: false,
  },
  'ai-business': {
    label: 'AI Business OS',
    title: 'AI Business OS',
    tagline: 'Das Betriebssystem für lokale Unternehmen – provider-agnostisch, EU-gehostet.',
    icon: Boxes,
    accent: 'amber',
    does: [
      'Ein Ort für Leads, Angebote und Kundenpflege',
      'Môra vernetzt Dokumente und Signale statt sie zu stapeln',
      'Läuft in der EU, ohne Vendor-Lock-in',
    ],
    article: '/de/einstieg/ai-local-business',
    live: false,
  },
};

const accentMap: Record<string, { text: string; border: string; bg: string; glow: string; chipBg: string }> = {
  emerald: {
    text: 'text-emerald-300',
    border: 'border-emerald-400/30',
    bg: 'from-emerald-500/12',
    glow: 'bg-emerald-500/15',
    chipBg: 'bg-emerald-400/10 text-emerald-200 border-emerald-400/20',
  },
  cyan: {
    text: 'text-cyan-300',
    border: 'border-cyan-400/30',
    bg: 'from-cyan-500/12',
    glow: 'bg-cyan-500/15',
    chipBg: 'bg-cyan-400/10 text-cyan-200 border-cyan-400/20',
  },
  amber: {
    text: 'text-amber-300',
    border: 'border-amber-400/30',
    bg: 'from-amber-500/12',
    glow: 'bg-amber-500/15',
    chipBg: 'bg-amber-400/10 text-amber-200 border-amber-400/20',
  },
};

const flow = [
  { icon: ScanLine, title: 'Check läuft', body: 'Passiv und ohne Login – nur öffentlich sichtbare Signale deiner Domain.' },
  { icon: FileSearch, title: 'Befunde', body: 'Konkrete Risiken und Stärken, jeweils mit dem Angriffsweg dahinter.' },
  { icon: LayoutDashboard, title: 'Arbeitsbereich', body: 'Aus den Befunden entsteht automatisch ein Preview-Workspace im OS.' },
  { icon: KeyRound, title: 'Übernehmen', body: 'Gefällt es dir, wird aus dem Preview mit einem Login dein echter Account.' },
];

export default function DemoContent() {
  const params = useSearchParams();
  const trackParam = params?.get('track');

  const activeTrack = useMemo<Track>(() => {
    if (trackParam === 'security' || trackParam === 'digital-self' || trackParam === 'ai-business') {
      return trackParam;
    }
    return 'security';
  }, [trackParam]);

  const track = trackConfig[activeTrack];
  const a = accentMap[track.accent];
  const TrackIcon = track.icon;

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24 space-y-16">
      {/* Hero */}
      <header className="space-y-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-200">
          <Sparkles className="w-3.5 h-3.5" />
          Mora Lab
        </span>
        <h1 className="text-5xl sm:text-6xl font-light leading-[1.05]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Sieh SAIMÔR
          <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300">
            wirklich arbeiten
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">
          Kein Marketing-Mockup und keine erfundenen Zahlen. Starte mit einer echten Analyse deiner
          Domain und sieh, wie aus Signalen ein Arbeitsbereich wird.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/de/einstieg/security-check"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40"
          >
            Echten Check starten
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-medium text-white/80 transition-colors hover:bg-white/10"
          >
            Zum Portal
          </Link>
        </div>
      </header>

      {/* Track panel */}
      <section className={`relative overflow-hidden rounded-[2.5rem] border ${a.border} bg-gradient-to-br ${a.bg} via-white/[0.02] to-transparent p-8 sm:p-12`}>
        <div className={`absolute -top-24 -right-24 h-72 w-72 rounded-full blur-[110px] ${a.glow}`} />
        <div className="relative space-y-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${a.border} bg-black/30 ${a.text}`}>
                  <TrackIcon className="w-5 h-5" />
                </div>
                <p className={`text-xs uppercase tracking-[0.28em] font-bold ${a.text}`}>{track.label}</p>
              </div>
              <h2 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {track.title}
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-white/75">{track.tagline}</p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                track.live ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-white/5 text-white/45'
              }`}
            >
              {track.live ? 'Heute live' : 'Im Aufbau'}
            </span>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3">
            {track.does.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-black/25 p-5 text-sm leading-relaxed text-white/70">
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-4 pt-1">
            <Link
              href={track.live ? '/de/einstieg/security-check' : track.article}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-bold text-black transition-colors hover:bg-emerald-200"
            >
              {track.live ? 'Check starten' : 'Mehr erfahren'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={track.article}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-3.5 font-medium text-white/80 transition-colors hover:bg-white/10"
            >
              Konzept lesen
            </Link>
          </div>
        </div>
      </section>

      {/* Track switch */}
      <section className="space-y-5">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-white/40">Standbein wählen</p>
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.keys(trackConfig) as Track[]).map((key) => {
            const cfg = trackConfig[key];
            const ca = accentMap[cfg.accent];
            const Icon = cfg.icon;
            const isActive = key === activeTrack;
            return (
              <Link
                key={key}
                href={`/demo?track=${key}`}
                className={`group flex items-center gap-4 rounded-2xl border p-5 transition-all ${
                  isActive ? `${ca.border} bg-white/[0.05]` : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${ca.border} bg-black/30 ${ca.text}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white/90">{cfg.title}</p>
                  <p className="truncate text-xs text-white/45">{cfg.live ? 'Heute live' : 'Im Aufbau'}</p>
                </div>
                <ArrowRight className="ml-auto w-4 h-4 text-white/30 group-hover:text-white/60" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Flow: from check to workspace */}
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-10 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Vom Check zum Arbeitsbereich
          </h2>
          <p className="mx-auto max-w-xl text-white/55">Ein durchgehender Weg – ohne Bruch, ohne zweites Konto.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {flow.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative rounded-2xl border border-white/8 bg-black/25 p-6">
                <span className="absolute right-5 top-5 font-mono text-xs text-white/25">0{i + 1}</span>
                <div className="mb-4 text-emerald-300/80">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white/90">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{step.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Close */}
      <section className="rounded-[2rem] border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-8 sm:p-10 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Bereit für den ersten echten Blick?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/de/einstieg/security-check"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-bold text-white transition-all hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Security-Check starten
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="https://cal.com/saimor/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
          >
            <CalendarClock className="w-4 h-4" />
            Gespräch buchen
          </a>
        </div>
      </section>
    </div>
  );
}
