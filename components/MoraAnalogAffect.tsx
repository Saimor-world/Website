'use client';

/**
 * Mora Journey — animated 3-act page that demonstrates how Mora thinks.
 *
 * Replaces the previous VHS/glitch "philosophical foundation" aesthetic.
 * Each act is a scroll-revealed section with a compact, honest mockup
 * of what's actually happening in the Real Mora architecture.
 *
 *   1. Sie hört zu.    — perception bundle assembles as user scrolls in
 *   2. Sie erinnert sich. — memory hits surface from the past
 *   3. Sie versteht.   — Mora composes a grounded reply with citations
 */

import { motion } from 'framer-motion';
import { Sparkles, Folder, Clock, Brain, ArrowRight } from 'lucide-react';

type Locale = 'de' | 'en';

type Props = {
  locale?: Locale;
};

const COPY = {
  de: {
    eyebrow: 'So denkt sie',
    intro:
      'Bevor sie antwortet, perzipiert sie. Sie kennt deine Lage, sie erinnert sich an Muster, sie verbindet beides zu einer ehrlichen Antwort. Drei Akte — gleicher Schritt.',
    act1Title: 'Sie hört zu.',
    act1Body:
      'Jeder Satz beginnt mit Wahrnehmung. Mora schaut sich an, wo du gerade bist, was du angeschaut hast, was du zuletzt geändert hast.',
    act2Title: 'Sie erinnert sich.',
    act2Body:
      'Nicht aus einer Cloud-Datenbank — aus dem, was diese Organisation in den Wochen vorher angesammelt hat. Relevante Spuren steigen nach oben.',
    act3Title: 'Sie versteht.',
    act3Body:
      'Sie verbindet das, was du fragst, mit dem was sie weiß. Mit Belegen, ohne Halluzination. Und wenn sie etwas nicht weiß, sagt sie das.',
    ctaTitle: 'Das ist die Architektur, an der wir gerade bauen.',
    ctaBody: 'Fertig ist sie noch nicht. Aber jeder Schritt im Gespräch funktioniert genau so.',
    ctaPrimary: 'Zur Mora-Übersicht',
    ctaSecondary: 'Saimôr OS',
    bundleLabel: 'Wahrnehmung',
    memoryLabel: 'Gedächtnis',
    answerLabel: 'Antwort',
    finderTitle: 'Finder · Q3 Plans',
    activityLabel: 'zuletzt geändert',
    activityTime: 'vor 14 Min.',
    memHits: [
      { score: 0.92, summary: 'Q3 wurde mit Vorlage "Planning Light" gestartet.' },
      { score: 0.81, summary: 'Marketing nutzt Quartalsordner statt Monatsordner.' },
      { score: 0.74, summary: 'Letzter Q3-Folder hat 8 Subfolder + 1 Briefing-Notiz.' },
    ],
    answerStream: 'Ich lege "Q4 Planning" in Marketing › Planning an. Möchtest du, dass ich die Struktur von Q3 übernehme?',
    citation: 'Quelle: Gedächtnisspur · Q3 Vorlage',
  },
  en: {
    eyebrow: 'How she thinks',
    intro:
      'Before she answers, she perceives. She knows where you are, she remembers patterns, she connects both into an honest reply. Three acts — one step.',
    act1Title: 'She listens.',
    act1Body:
      'Every sentence starts with perception. Mora looks at where you are right now, what you opened, what you last edited.',
    act2Title: 'She remembers.',
    act2Body:
      "Not from a cloud database — from what this organization has accumulated in the past weeks. Relevant traces rise to the top.",
    act3Title: 'She understands.',
    act3Body:
      "She connects what you're asking with what she knows. With citations, no hallucinations. And when she doesn't know, she says so.",
    ctaTitle: "This is the architecture we're building right now.",
    ctaBody: "It's not done yet. But every step in the conversation works exactly like this.",
    ctaPrimary: 'Back to Mora overview',
    ctaSecondary: 'Saimôr OS',
    bundleLabel: 'Perception',
    memoryLabel: 'Memory',
    answerLabel: 'Reply',
    finderTitle: 'Finder · Q3 Plans',
    activityLabel: 'last edited',
    activityTime: '14 min ago',
    memHits: [
      { score: 0.92, summary: 'Q3 was started with the "Planning Light" template.' },
      { score: 0.81, summary: 'Marketing uses quarterly folders, not monthly.' },
      { score: 0.74, summary: 'Last Q3 folder had 8 subfolders + 1 briefing note.' },
    ],
    answerStream: "I'll create \"Q4 Planning\" in Marketing › Planning. Do you want me to mirror Q3's structure?",
    citation: 'Source: Memory trace · Q3 template',
  },
};

export default function MoraAnalogAffect({ locale = 'de' }: Props) {
  const c = COPY[locale];

  return (
    <main
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        background:
          'radial-gradient(circle at 15% 0%, rgba(52, 211, 153, 0.10) 0%, transparent 45%),' +
          'radial-gradient(circle at 85% 100%, rgba(34, 211, 238, 0.08) 0%, transparent 50%),' +
          'linear-gradient(180deg, #060A09 0%, #0A1410 50%, #060A09 100%)',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}
    >
      <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32">

        {/* ── Intro ──────────────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-32 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.04]">
            <Sparkles size={12} className="text-emerald-400" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-400/80" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {c.eyebrow}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05]">
            <span className="block opacity-90">{c.act1Title.replace('.', ',')} </span>
            <span className="block italic" style={{ color: '#34D399' }}>{c.act2Title.replace('.', ',')} </span>
            <span className="block italic" style={{ background: 'linear-gradient(135deg, #D4A857 0%, #E6C897 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {c.act3Title}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed italic">
            {c.intro}
          </p>
        </motion.header>

        {/* ── Act 1: Sie hört zu ─────────────────────────────────────────── */}
        <Act number={1} title={c.act1Title} body={c.act1Body} accent="#34D399">
          <PerceptionMockup
            label={c.bundleLabel}
            finderTitle={c.finderTitle}
            activityLabel={c.activityLabel}
            activityTime={c.activityTime}
          />
        </Act>

        {/* ── Act 2: Sie erinnert sich ───────────────────────────────────── */}
        <Act number={2} title={c.act2Title} body={c.act2Body} accent="#22D3EE">
          <MemoryMockup label={c.memoryLabel} hits={c.memHits} />
        </Act>

        {/* ── Act 3: Sie versteht ────────────────────────────────────────── */}
        <Act number={3} title={c.act3Title} body={c.act3Body} accent="#D4A857">
          <AnswerMockup label={c.answerLabel} text={c.answerStream} citation={c.citation} />
        </Act>

        {/* ── Closing ────────────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mt-32 text-center max-w-2xl mx-auto space-y-6"
        >
          <p className="text-2xl md:text-3xl font-light leading-relaxed">
            {c.ctaTitle}
          </p>
          <p className="text-base text-white/50 italic">
            {c.ctaBody}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <a
              href={locale === 'de' ? '/mora' : '/en/mora'}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium transition-all hover:scale-[1.02]"
              style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14 }}
            >
              {c.ctaPrimary}
              <ArrowRight size={14} />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-white/15 text-white/80 hover:bg-white/5 transition-all"
              style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14 }}
            >
              {c.ctaSecondary}
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

// ─── Act wrapper ────────────────────────────────────────────────────────────

function Act({
  number,
  title,
  body,
  accent,
  children,
}: {
  number: number;
  title: string;
  body: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8 }}
      className="grid md:grid-cols-2 gap-12 items-center mb-32"
    >
      {/* Text side */}
      <div className="space-y-5">
        <div
          className="text-xs uppercase tracking-[0.4em]"
          style={{ color: accent, opacity: 0.7, fontFamily: 'system-ui, sans-serif' }}
        >
          Akt {number}
        </div>
        <h2 className="text-4xl md:text-5xl font-light leading-tight">
          <em className="italic" style={{ color: accent }}>{title}</em>
        </h2>
        <p className="text-base md:text-lg text-white/55 leading-relaxed italic">
          {body}
        </p>
      </div>

      {/* Mockup side */}
      <div className="relative">{children}</div>
    </motion.section>
  );
}

// ─── Mockup: Perception bundle ──────────────────────────────────────────────

function PerceptionMockup({
  label,
  finderTitle,
  activityLabel,
  activityTime,
}: {
  label: string;
  finderTitle: string;
  activityLabel: string;
  activityTime: string;
}) {
  const items = [
    { icon: Folder, label: 'Marketing › Planning › Q3 Plans' },
    { icon: Clock, label: `${activityLabel}: ${activityTime}` },
    { icon: Brain, label: '3 offene Panes · 1 Entwurf' },
  ];
  return (
    <div
      className="relative rounded-2xl border border-emerald-500/15 p-5"
      style={{ background: 'rgba(10, 20, 16, 0.6)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-emerald-400/70"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {label}
        </span>
        <span className="text-[10px] text-white/30 font-mono">v1</span>
      </div>
      <div className="text-sm font-medium text-white/85 mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
        {finderTitle}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
            className="flex items-center gap-2.5 text-sm text-white/60"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            <item.icon size={14} className="text-emerald-400/60 shrink-0" />
            <span>{item.label}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// ─── Mockup: Memory hits ────────────────────────────────────────────────────

function MemoryMockup({
  label,
  hits,
}: {
  label: string;
  hits: { score: number; summary: string }[];
}) {
  return (
    <div
      className="relative rounded-2xl border border-cyan-500/15 p-5"
      style={{ background: 'rgba(10, 16, 22, 0.6)', backdropFilter: 'blur(8px)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/70"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {label}
        </span>
        <span className="text-[10px] text-white/30 font-mono">{hits.length} Treffer</span>
      </div>
      <ul className="space-y-3">
        {hits.map((hit, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.5 }}
            className="flex gap-3 text-sm"
          >
            <span
              className="shrink-0 tabular-nums"
              style={{
                color: '#22D3EE',
                opacity: 0.6 + hit.score * 0.4,
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 18,
              }}
            >
              {Math.round(hit.score * 100)}%
            </span>
            <span className="text-white/65" style={{ fontFamily: 'system-ui, sans-serif' }}>
              {hit.summary}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// ─── Mockup: Streaming answer ───────────────────────────────────────────────

function AnswerMockup({
  label,
  text,
  citation,
}: {
  label: string;
  text: string;
  citation: string;
}) {
  return (
    <div
      className="relative rounded-2xl border p-5"
      style={{
        background: 'rgba(20, 16, 8, 0.55)',
        borderColor: 'rgba(212, 168, 87, 0.18)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: '#D4A857', opacity: 0.7, fontFamily: 'system-ui, sans-serif' }}
        >
          {label}
        </span>
        <span className="text-[10px] text-white/30 font-mono">Mora</span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="text-base leading-relaxed text-white/85 mb-3"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {text}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-[11px] italic"
        style={{ color: '#D4A857', opacity: 0.7 }}
      >
        ↪ {citation}
      </motion.div>
    </div>
  );
}
