'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale?: Locale;
};

type Copy = {
  badge: string;
  heroStatus: string;
  heroLine1: string;
  heroLine2: string;
  heroDesc1: string;
  heroDesc2: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroSecondaryHref: string;
  archEyebrow: string;
  archTitle: string;
  archBody: string;
  archFeature1Label: string;
  archFeature1Value: string;
  archFeature2Label: string;
  archFeature2Value: string;
  vhsTagSimple: string;
  vhsTitleSimple: string;
  vhsQuestion: string;
  vhsBody: string;
  vhsActivate: string;
  vhsTagDeep: string;
  vhsTitleDeep: string;
  vhsBodyDeep: string;
  vhsConsoleLines: string[];
  techEyebrow: string;
  techTitle: string;
  techCard1Title: string;
  techCard1Body: string;
  techCard2Title: string;
  techCard2Body: string;
  techCard3Title: string;
  techCard3Body: string;
  bootPromptTitle: string;
  bootPromptSubtitle: string;
  ctaBlink: string;
  ctaTitle: string;
};

const copyByLocale: Record<Locale, Copy> = {
  de: {
    badge: 'Sektor: VHS-Archiv',
    heroStatus: 'Strukturierter Kern',
    heroLine1: 'Kein Spiegel.',
    heroLine2: 'Ein Gedächtnis.',
    heroDesc1:
      'Mora ist die semantische Schnittstelle von Saimôr OS. Sie versteht nicht nur Syntax; sie erkennt die Ursache von Verhaltensmustern.',
    heroDesc2:
      'Basierend auf der Analog Affect Theorie, wurzelt sie in Ihren lokalen Daten, um den Kontext zu reflektieren, anstatt nur Prompts zu verarbeiten.',
    heroPrimaryCta: 'Zur Vertiefung',
    heroSecondaryCta: 'Dokumentation',
    heroSecondaryHref: '/#mora-dashboard',
    archEyebrow: '// System-Architektur',
    archTitle: 'Klarheit durch Wandel',
    archBody:
      'Saimôr OS verwendet keine starren Ordner. Es nutzt organische Räume und Knoten. Mora fungiert als digitales Myzel, das sie verbindet.',
    archFeature1Label: 'Datenhoheit',
    archFeature1Value: 'Lokale GPU / On-Prem',
    archFeature2Label: 'Kontextfenster',
    archFeature2Value: 'Verschachteltes Gedächtnis',
    vhsTagSimple: 'Sektor: VHS-Archiv (Vorschau)',
    vhsTitleSimple: 'Strukturierte Sicht',
    vhsQuestion: 'Möchten Sie in die Tiefe gehen?',
    vhsBody:
      'Klicken Sie, um die Myzelium-Ansicht zu aktivieren. Dadurch wird das volle, analoge Affekt-System geladen.',
    vhsActivate: 'Eintauchen in die Welt (Deep View)',
    vhsTagDeep: 'Dataset: VHS_Archive_DE',
    vhsTitleDeep: 'The Emotional Fossil',
    vhsBodyDeep:
      'We train Mora on German broadcast archives to capture what clean data misses: Awkwardness. Silence. Irony. The &quot;Static&quot; of human interaction.',
    vhsConsoleLines: [
      '> Extracting emotional semantics... [OK]',
      '> Analyzing nostalgic codes... [OK]',
      '> Result: 98% Human-Adjacent.'
    ],
    techEyebrow: 'Core Technology',
    techTitle: 'Verschachtelte Reflexion',
    techCard1Title: 'Schnelles Gedächtnis',
    techCard1Body:
      'Reagiert auf die Syntax. Das unmittelbare "Jetzt". Verarbeitet Echtzeit-Anfragen.',
    techCard2Title: 'Tiefe Konsolidierung',
    techCard2Body:
      'Mora pausiert, um Inputs zu langfristigem kulturellem Verständnis zu konsolidieren.',
    techCard3Title: 'Selbstmodifikation',
    techCard3Body:
      'Passt Gewichte basierend auf emotionaler Schwerkraft an. Entwickelt sich mit Ihrer Organisation.',
    bootPromptTitle: '> System initialisieren',
    bootPromptSubtitle: 'Klicken für Deep View Experience',
    ctaBlink: 'Bereit zum Starten',
    ctaTitle: 'Sind Sie bereit für das Signal?'
  },
  en: {
    badge: 'Sector: VHS Archive',
    heroStatus: 'Structured Core',
    heroLine1: 'Not a mirror.',
    heroLine2: 'A memory.',
    heroDesc1:
      'Mora is the semantic interface of Saimôr OS. It doesn\'t just understand syntax; it recognizes the cause of behavioral patterns.',
    heroDesc2:
      'Based on Analog Affect theory, it\'s rooted in your local data to reflect context, not just process prompts.',
    heroPrimaryCta: 'Dive Deeper',
    heroSecondaryCta: 'Documentation',
    heroSecondaryHref: '/en#mora-dashboard',
    archEyebrow: '// System Architecture',
    archTitle: 'Clarity through Change',
    archBody:
      'Saimôr OS doesn\'t use rigid folders. It leverages organic spaces and nodes. Mora acts as the digital mycelium connecting them.',
    archFeature1Label: 'Data Sovereignty',
    archFeature1Value: 'Local GPU / On-Prem',
    archFeature2Label: 'Context Window',
    archFeature2Value: 'Nested Memory',
    vhsTagSimple: 'Sector: VHS Archive (Preview)',
    vhsTitleSimple: 'Structured View',
    vhsQuestion: 'Ready to go deeper?',
    vhsBody:
      'Click to activate the Mycelium View. This will load the full, analog affect system.',
    vhsActivate: 'Dive into the World (Deep View)',
    vhsTagDeep: 'Dataset: VHS_Archive_EN',
    vhsTitleDeep: 'The Emotional Fossil',
    vhsBodyDeep:
      'We train Mora on broadcast archives to capture what clean data misses: Awkwardness. Silence. Irony. The &quot;Static&quot; of human interaction.',
    vhsConsoleLines: [
      '> Extracting emotional semantics... [OK]',
      '> Analyzing nostalgic codes... [OK]',
      '> Result: 98% Human-Adjacent.'
    ],
    techEyebrow: 'Core Technology',
    techTitle: 'Nested Reflection',
    techCard1Title: 'Fast Memory',
    techCard1Body:
      'Responds to syntax. The immediate "now". Processes real-time queries.',
    techCard2Title: 'Deep Consolidation',
    techCard2Body:
      'Mora pauses to consolidate inputs into long-term cultural understanding.',
    techCard3Title: 'Self-Modification',
    techCard3Body:
      'Adjusts weights based on emotional gravity. Evolves with your organization.',
    bootPromptTitle: '> Initialize System',
    bootPromptSubtitle: 'Click for Deep View Experience',
    ctaBlink: 'Ready to Start',
    ctaTitle: 'Are you ready for the signal?'
  }
};

const scale = [
  130.81, 155.56, 174.61, 196.0, 233.08, 261.63, 311.13, 349.23, 392.0
];

export default function MoraAnalogAffect({ locale = 'de' }: Props) {
  const copy = copyByLocale[locale];
  const [audioOn, setAudioOn] = useState(false);
  const [bootVisible, setBootVisible] = useState(false);
  const [bootSequenceVisible, setBootSequenceVisible] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sequencerTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Ensure body doesn't have is-mora-active on mount
    document.body.classList.remove('is-mora-active');

    return () => {
      // Cleanup on unmount
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      if (sequencerTimerRef.current) {
        clearInterval(sequencerTimerRef.current);
      }
    };
  }, []);

  const initAudio = () => {
    if (typeof window === 'undefined') return;
    if (audioCtxRef.current) return;

    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;

    // Drone oscillator
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();

    droneOsc.type = 'sine'; // Changed from triangle to sine
    droneOsc.frequency.setValueAtTime(40, ctx.currentTime); // Lower frequency hum
    droneGain.gain.value = 0.03;

    droneOsc.connect(droneGain);
    droneGain.connect(ctx.destination);
    droneOsc.start();

    // Start sequencer
    startSequencer();
    setAudioOn(true);
  };

  const playBlip = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const note = scale[Math.floor(Math.random() * scale.length)];
    osc.type = 'sine'; // Changed from square/sawtooth to sine for more subtle sound
    osc.frequency.setValueAtTime(note, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      note * 1.005,
      ctx.currentTime + 0.3
    );

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

    osc.connect(gain);
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(1000, ctx.currentTime);
    gain.connect(lowpass);
    lowpass.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  };

  const startSequencer = () => {
    if (sequencerTimerRef.current) clearInterval(sequencerTimerRef.current);
    sequencerTimerRef.current = setInterval(() => {
      if (audioOn && Math.random() > 0.7) {
        playBlip();
      }
    }, 150);
  };

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      initAudio();
      return;
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
      setAudioOn(true);
    } else if (ctx.state === 'running') {
      ctx.suspend();
      setAudioOn(false);
    }
  };

  const activateDeepView = () => {
    // Add class to body
    document.body.classList.add('is-mora-active');

    // Show boot screen
    setBootVisible(true);
  };

  const handleBootClick = () => {
    if (!audioOn) {
      initAudio();
    }

    setBootSequenceVisible(true);

    // Animate boot sequence
    setTimeout(() => {
      setBootVisible(false);
      setBootSequenceVisible(false);
    }, 3000);
  };

  return (
    <>
      {/* FX Layers (only visible in Deep View via CSS) */}
      <div className="scanlines" />
      <div className="crt-overlay" />

      <div className="relative min-h-screen px-6 md:px-20 transition-colors duration-1000">
        {/* Hero Section with VHS Visual */}
        <section id="vision" className="pt-32 pb-20 relative overflow-hidden min-h-screen flex flex-col justify-center">
          {/* VHS Mycelium Artifact */}
          <div className="artifact-visuals absolute right-[-15%] md:right-[2%] top-[15%] opacity-30 md:opacity-100 animate-float pointer-events-none z-0 scale-75 md:scale-110 origin-center transition-opacity duration-1000">
            <svg id="vhs-svg" width="500" height="500" viewBox="0 0 400 400">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Main Cassette Body */}
              <rect x="50" y="100" width="300" height="180" rx="4" className="vhs-body transition-all duration-500" />
              <rect x="70" y="120" width="260" height="100" className="vhs-inner transition-all duration-500" />
              <rect x="80" y="130" width="240" height="80" fill="transparent" stroke="#ccc" strokeWidth="1" strokeDasharray="4" opacity="0.5" className="transition-stroke duration-500" />

              {/* Spools/Reels */}
              <g className="vhs-reel-glow" style={{ transformOrigin: '130px 170px' }}>
                <circle cx="130" cy="170" r="28" className="vhs-spool-outline animate-spin-slow" strokeDasharray="8 4" />
                <circle cx="130" cy="170" r="10" className="vhs-spool-center" />
              </g>
              <g className="vhs-reel-glow" style={{ transformOrigin: '270px 170px' }}>
                <circle cx="270" cy="170" r="28" className="vhs-spool-outline animate-spin-slow" strokeDasharray="8 4" />
                <circle cx="270" cy="170" r="10" className="vhs-spool-center" />
              </g>

              {/* Mycelium Paths */}
              <path d="M100 280 C 100 350, 60 380, 20 450" className="neural-path" filter="url(#glow)" />
              <path d="M150 280 C 150 360, 180 390, 180 480" className="neural-path" style={{ animationDelay: '-3s' }} filter="url(#glow)" />
              <path d="M250 280 C 250 340, 220 380, 220 460" className="neural-path" style={{ animationDelay: '-5s' }} filter="url(#glow)" />
              <path d="M300 280 C 300 350, 360 380, 400 420" className="neural-path" style={{ animationDelay: '-7s' }} filter="url(#glow)" />
              <circle cx="180" cy="390" r="3" fill="#8C7548" className="animate-pulse" filter="url(#glow)" />
              <circle cx="360" cy="380" r="2" fill="#1a3c34" className="animate-pulse" filter="url(#glow)" />
            </svg>
          </div>

          <div className="max-w-4xl z-10 relative">
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 border border-saimor-gold-retro/20 bg-saimor-gold-retro/5 backdrop-blur-md rounded-sm">
              <div className="w-2 h-2 bg-saimor-gold-retro animate-pulse"></div>
              <span className="text-xl font-sans text-saimor-gold-retro tracking-widest uppercase pt-0.5">{copy.heroStatus}</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-sans leading-[0.85] mb-10 uppercase cursor-default drop-shadow-2xl">
              <span className="hero-title-line glitch-hover block text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.3)' }}>{copy.heroLine1}</span>
              <span className="hero-title-line text-saimor-teal italic glitch-hover block" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(16,185,129,0.5)' }}>{copy.heroLine2}</span>
            </h1>

            <div className="grid md:grid-cols-12 gap-12 mt-8">
              <div className="md:col-span-7 space-y-6 text-lg font-normal font-sans leading-relaxed border-l-2 border-saimor-forest-dark pl-6 relative" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', padding: '1.5rem', borderRadius: '0.5rem' }}>
                <div className="absolute -left-[2px] top-0 w-2 h-2 bg-saimor-forest-dark"></div>
                <div className="absolute -left-[2px] bottom-0 w-2 h-2 bg-saimor-forest-dark"></div>

                <p className="text-white/95" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  <strong className="text-saimor-teal font-mono font-bold">Mora</strong> {copy.heroDesc1}
                </p>
                <p className="text-white/90" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                  {copy.heroDesc2}
                </p>

                <div className="flex flex-wrap gap-4 mt-10 pt-4 font-sans text-sm">
                  <a href="#vhs" className="group flex items-center gap-3 px-8 py-4 bg-saimor-forest-dark text-white hover:bg-saimor-teal transition-all duration-300 uppercase font-bold tracking-wider clip-path-slant shadow-lg hover:shadow-xl">
                    <span className="group-hover:translate-x-1 transition-transform">{copy.heroPrimaryCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href={copy.heroSecondaryHref} className="group flex items-center gap-3 px-8 py-4 border border-saimor-forest-dark hover:border-saimor-teal hover:bg-saimor-teal/10 transition-colors uppercase tracking-wider">
                    <span>{copy.heroSecondaryCta}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section id="architecture" className="py-32 border-t border-saimor-forest-dark/30 relative overflow-hidden transition-colors duration-500">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center relative z-10">
            <div className="relative h-80 md:h-[500px] w-full glass-panel flex items-center justify-center overflow-hidden group">
              <div className="absolute top-4 left-4 font-sans opacity-50">FIG 2.1: NODE_GRAPH</div>
              <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0 transition-transform duration-[10s] ease-in-out group-hover:scale-105 artifact-visuals">
                <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6">
                  <path d="M200 200 Q 150 175 100 150" className="neural-path" />
                  <path d="M200 200 Q 250 160 300 120" className="neural-path" style={{ animationDelay: '-1s' }} />
                  <path d="M200 200 Q 190 250 180 300" className="neural-path" style={{ animationDelay: '-2s' }} />
                  <path d="M200 200 Q 240 240 280 280" className="neural-path" style={{ animationDelay: '-3s' }} />
                </g>
                <circle cx="200" cy="200" r="40" fill="rgba(26, 60, 52, 0.2)" stroke="#8C7548" strokeWidth="2" />
                <text x="200" y="205" textAnchor="middle" fill="currentColor" fontFamily="Space Mono" fontSize="10" fontWeight="bold">MORA</text>
                <rect x="90" y="140" width="20" height="20" fill="#f0f0f0" stroke="currentColor" className="group-hover:animate-pulse" />
                <rect x="290" y="110" width="20" height="20" fill="#f0f0f0" stroke="currentColor" />
                <rect x="170" y="290" width="20" height="20" fill="#f0f0f0" stroke="currentColor" />
              </svg>
            </div>
            <div>
              <div className="font-sans text-xl text-saimor-gold-retro mb-2">{copy.archEyebrow}</div>
              <h2 className="text-5xl font-light mb-8 font-sans leading-tight">{copy.archTitle}</h2>
              <p className="text-gray-600 leading-relaxed mb-10 font-light text-lg">
                {copy.archBody}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-2 border-saimor-forest-dark/30 pl-6 py-2 hover:border-saimor-forest-dark transition-colors">
                  <div className="font-mono text-xs text-saimor-teal mb-2 tracking-wider">{copy.archFeature1Label}</div>
                  <div className="font-sans text-2xl font-bold">{copy.archFeature1Value}</div>
                </div>
                <div className="border-l-2 border-saimor-forest-dark/30 pl-6 py-2 hover:border-saimor-forest-dark transition-colors">
                  <div className="font-mono text-xs text-saimor-teal mb-2 tracking-wider">{copy.archFeature2Label}</div>
                  <div className="font-sans text-2xl font-bold">{copy.archFeature2Value}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VHS Section (The Switch) */}
        <section id="vhs" className="py-32 px-6 md:px-20 relative overflow-hidden border-y border-saimor-forest-dark/30 transition-colors duration-500">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url(\'data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%221%22/%3E%3C/svg%3E\')' }}></div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            {/* Simple View Content (Default) */}
            <div id="vhs-simple-content">
              <span className="inline-block px-3 py-1 bg-saimor-forest-dark text-white font-sans text-xl mb-8 transform -rotate-2 shadow-md">{copy.vhsTagSimple}</span>
              <h2 className="text-6xl md:text-8xl font-sans font-bold mb-12 tracking-wide cursor-help">{copy.vhsTitleSimple}</h2>

              <div
                onClick={activateDeepView}
                className="glass-panel p-10 md:p-14 text-center max-w-3xl mx-auto border-t-4 border-t-saimor-forest-dark hover:border-t-saimor-gold-retro cursor-pointer transition-all"
              >
                <div className="text-2xl font-sans mb-4">{copy.vhsQuestion}</div>
                <p className="text-gray-600 mb-8 font-sans text-lg leading-relaxed font-light">
                  {copy.vhsBody}
                </p>
                <button className="group flex items-center gap-3 px-8 py-4 bg-saimor-forest-dark text-white hover:bg-saimor-gold-retro hover:text-black transition-all duration-300 uppercase font-bold tracking-wider clip-path-slant shadow-lg hover:shadow-2xl mx-auto">
                  <span className="vhs-toggle-status w-4 h-4 rounded-full bg-saimor-gold-retro animate-pulse-fast"></span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">{copy.vhsActivate}</span>
                </button>
              </div>
            </div>

            {/* Deep View Content (Hidden by default, shown after boot) */}
            <div id="vhs-deep-content-container" className="hidden">
              <span className="inline-block px-3 py-1 bg-saimor-teal text-black font-vcr text-xl mb-8 transform -rotate-2 transition-all duration-500">{copy.vhsTagDeep}</span>
              <h2 className="text-6xl md:text-8xl font-vcr text-white mb-12 tracking-wide glitch-hover cursor-help transition-all duration-500">{copy.vhsTitleDeep}</h2>
              <div className="glass-panel p-10 md:p-14 text-left max-w-3xl mx-auto border-t-4 border-t-saimor-gold-retro transition-all duration-500">
                <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
                    <span className="font-mono text-xs text-gray-400">PLAYBACK: SOURCE 1980-2000</span>
                  </div>
                  <div className="font-vcr text-xl text-saimor-gold-retro">SP - 02:34:12</div>
                </div>
                <p className="text-gray-300 mb-8 font-sans text-xl leading-relaxed font-light">
                  {copy.vhsBodyDeep}
                </p>
                <div className="font-mono text-sm text-saimor-teal bg-black/40 p-4 rounded border-l-2 border-saimor-teal">
                  {copy.vhsConsoleLines.map((line, i) => (
                    <div key={i} className="opacity-70">{line}</div>
                  ))}
                  <div className="text-white animate-pulse">{copy.vhsConsoleLines[copy.vhsConsoleLines.length - 1]}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Cards */}
        <section id="tech" className="py-32 px-6 md:px-20 transition-colors duration-500">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-saimor-forest-dark/50 pb-6 gap-4">
              <div>
                <div className="font-mono text-xs text-saimor-teal mb-2">{copy.techEyebrow}</div>
                <h2 className="text-5xl md:text-7xl font-sans uppercase font-bold transition-colors duration-500">{copy.techTitle}</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 group hover:bg-saimor-forest-dark/20 transition-all duration-500 hover:-translate-y-2">
                <div className="flex justify-between items-start mb-6">
                  <div className="font-sans text-5xl text-saimor-forest-dark/40 group-hover:text-saimor-forest-dark transition-colors font-bold">01</div>
                </div>
                <h3 className="font-sans text-lg mb-4 font-bold tracking-wide">{copy.techCard1Title}</h3>
                <p className="text-sm font-light leading-relaxed">{copy.techCard1Body}</p>
              </div>
              <div className="glass-panel p-8 group hover:bg-saimor-forest-dark/20 transition-all duration-500 hover:-translate-y-2 border-saimor-gold-retro/40 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saimor-gold-retro text-black px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">Kernfunktion</div>
                <div className="flex justify-between items-start mb-6">
                  <div className="font-sans text-5xl text-saimor-gold-retro/40 group-hover:text-saimor-gold-retro transition-colors font-bold">02</div>
                </div>
                <h3 className="font-sans text-lg mb-4 font-bold tracking-wide">{copy.techCard2Title}</h3>
                <p className="text-sm font-light leading-relaxed">{copy.techCard2Body}</p>
              </div>
              <div className="glass-panel p-8 group hover:bg-saimor-forest-dark/20 transition-all duration-500 hover:-translate-y-2">
                <div className="flex justify-between items-start mb-6">
                  <div className="font-sans text-5xl text-saimor-forest-dark/40 group-hover:text-saimor-forest-dark transition-colors font-bold">03</div>
                </div>
                <h3 className="font-sans text-lg mb-4 font-bold tracking-wide">{copy.techCard3Title}</h3>
                <p className="text-sm font-light leading-relaxed">{copy.techCard3Body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section id="future" className="py-24 px-6 md:px-20 text-center relative overflow-hidden transition-colors duration-500">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-saimor-forest-dark/20 blur-[100px] pointer-events-none"></div>
          <div className="max-w-2xl mx-auto z-10 relative">
            <div className="font-sans text-3xl text-saimor-gold-retro mb-6 animate-pulse">{copy.ctaBlink}</div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold mb-10">{copy.ctaTitle}</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
              <a href="mailto:partners@saimor.os" className="px-10 py-5 bg-saimor-forest-dark border-2 border-saimor-teal text-white font-sans text-2xl hover:bg-saimor-teal hover:text-black hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all uppercase tracking-widest clip-path-slant">
                Partnerprogramm
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Boot Screen Overlay */}
      <AnimatePresence>
        {bootVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black cursor-pointer"
            onClick={handleBootClick}
          >
            {!bootSequenceVisible ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 border-2 border-saimor-teal mx-auto mb-6 flex items-center justify-center animate-pulse">
                  <div className="w-12 h-12 bg-saimor-forest-dark"></div>
                </div>
                <div className="text-2xl md:text-3xl font-vcr text-saimor-teal animate-pulse">{copy.bootPromptTitle}</div>
                <div className="text-gray-500 text-sm font-sans tracking-widest uppercase">{copy.bootPromptSubtitle}</div>
              </motion.div>
            ) : (
              <div className="text-xl md:text-2xl font-vcr space-y-1 text-left text-saimor-teal">
                <div className="boot-line">&gt; SAIMÔR BIOS v2.6.1 DETECTED</div>
                <div className="boot-line">&gt; MOUNTING VOLUME: /DEV/VHS_ARCHIVE</div>
                <div className="boot-line">&gt; LOADING KERNEL: MORA_NEURAL_NET</div>
                <div className="boot-line">&gt; GENERATING AUDIO CONTEXT... [OK]</div>
                <div className="boot-line text-saimor-gold-retro">&gt; SYSTEM ONLINE.</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
