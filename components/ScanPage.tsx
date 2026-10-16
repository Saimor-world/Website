'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Printer, HelpCircle, Info, ExternalLink, Download, Mail, Sparkles } from 'lucide-react';
import DemoHqPreview from './DemoHqPreview';
import WallRequestCard from './WallRequestCard';
import { SCAN_EN } from '@/lib/scan-copy';
import { buildDemoCompanyProfile } from '@/lib/demo-company';
import { buildContextToken } from '@/lib/entry-token';

const LOADING_STEPS = [
  { id: 'dns',        label: 'Digitale Wegweiser prüfen (DNS)',    desc: 'Wir schauen, ob deine Adressen sicher geroutet werden.' },
  { id: 'tls',        label: 'Verschlüsselungs-Check (TLS)',       desc: 'Ist die Verbindung zu deinen Servern zeitgemäß gesichert?' },
  { id: 'headers',    label: 'Schutzschilde analysieren (HTTP)',    desc: 'Prüfung der Sicherheits-Header deiner Webseite.' },
  {
    id: 'publicFiles',
    label: 'Öffentliche Spuren prüfen',
    desc: 'Der Audit-Agent prüft security.txt, robots.txt, sitemap und sensible Standardpfade.',
  },
  { id: 'subdomains', label: 'Nachbargebäude finden (Subdomains)', desc: 'Was ist im Umfeld deiner Domain noch alles sichtbar?' },
  {
    id: 'report',
    label: 'Report-Card bauen',
    desc: 'Die Befunde werden in technische Teilnoten und konkrete Maßnahmen übersetzt.',
  },
];

function scoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-red-400';
}

function scoreStroke(score: number): string {
  if (score >= 80) return '#34d399';
  if (score >= 50) return '#fbbf24';
  return '#f87171';
}

function scoreLabel(score: number): string {
  if (score >= 80) return 'Sicher';
  if (score >= 50) return 'Mittel';
  return 'Kritisch';
}

const CATEGORY_LABELS: Record<string, string> = {
  encryption: 'Verschlüsselung',
  headers: 'Browser-Schutz',
  informationHygiene: 'Informationshygiene',
  infrastructure: 'Infrastruktur',
};

function domainToCompanyName(value: string) {
  const host = value
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')[0]
    .split('.')[0]
    ?.replaceAll('-', ' ');
  if (!host) return 'Deine Firma';
  return host
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function buildHqUrl(results: any) {
  const base = process.env.NEXT_PUBLIC_OS_HOME_URL || 'https://hq.saimor.world';
  const url = new URL(base);
  if (!url.pathname || url.pathname === '/') url.pathname = '/entry';

  const ct = results.entryToken || buildContextToken({
    id: results.id || `local-preview-${Date.now()}`,
    company: results.companyName,
    email: results.email || '',
    domain: results.recon?.domain || results.target || '',
    score: results.score,
    level: scoreLabel(results.score),
    grade: results.grade ?? null,
    summary: results.summary ? String(results.summary).slice(0, 420) : null,
    actions: (results.recommendations ?? [])
      .slice(0, 3)
      .map((rec: any) => rec?.title)
      .filter(Boolean),
  });

  url.searchParams.set('ct', ct);
  // Keep the handoff in the isolated demo experience. The HQ uses this marker
  // to suppress account creation and other production-only actions.
  url.searchParams.set('mode', 'demo');
  return url.toString();
}

export default function ScanPage({ locale = 'de' }: { locale: string }) {
  const t = (text: string) => locale === 'en' ? SCAN_EN[text] ?? text : text;
  const [step, setStep]               = useState(1);
  const [target, setTarget]           = useState('');
  const [email, setEmail]             = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [industry, setIndustry]       = useState('');
  const [companySize, setCompanySize] = useState('');
  const [workIntent, setWorkIntent]   = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [results, setResults]         = useState<any>(null);
  const [error, setError]             = useState<string | null>(n…12206 tokens truncated…We are exploring responsible AI use.', 'We want to test an idea before investing.'],
        outcomes: ['A clearer view of your situation', 'Priorities and potential next steps', 'A comprehensible proposal without buzzwords'],
        action: 'Discuss consulting',
      },
      {
        id: 'workshops', number: '02', eyebrow: 'LEARN TOGETHER', title: 'Workshops', lead: 'Fewer slides. More understanding.',
        description: 'AI and modern workflows become clearer when people try them for themselves. We shape a format around your team’s questions, real tasks and starting point.',
        cases: ['What can AI do – and where are the limits?', 'What does an AI-assisted workflow look like?', 'How do we move from theory to practice together?'],
        outcomes: ['Shared understanding', 'Practical exercises with relevant examples', 'Concrete ideas for what to try next'],
        action: 'Ask about a workshop',
      },
      {
        id: 'umsetzung', number: '03', eyebrow: 'IDEA TO OBJECT', title: 'Implementation', lead: 'Build only what matters.',
        description: 'When the direction is clear, that can become connected processes, a small digital tool or a limited pilot. Sources, permissions and practical value are considered from the start.',
        cases: ['Existing tools need to exchange information.', 'We need a more connected workspace.', 'A small pilot should make an idea testable.'],
        outcomes: ['A focused solution approach', 'Clearly defined capabilities and boundaries', 'A discussable prototype or implementation plan'],
        action: 'Share a project idea',
      },
    ],
    noteEyebrow: 'NO ONE-SIZE-FITS-ALL PACKAGES',
    noteTitle: 'The right first step may be smaller than you think.',
    noteText: 'No invented fixed guarantees or standard prices here. We first discuss scope, goals and feasibility, then choose the format that actually fits.',
    footerTitle: 'Tell us what is on your mind.',
    footerBody: 'A short message is enough. You do not need a complete brief.',
    footerCTA: 'Get in touch',
    home: 'Back to home',
  },
} as const;

export default function StudioWorld({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const contactHref = locale === 'de' ? '/de/kontakt' : '/en/contact';
  const homeHref = locale === 'de' ? '/de' : '/en';

  return (
    <div className={styles.world}>
      <section className={styles.hero} aria-labelledby="studio-title">
        <div className={styles.ambient} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h1 id="studio-title">{c.title}<span>{c.titleAccent}</span></h1>
          <p className={styles.lead}>{c.intro}</p>
          <div className={styles.heroActions}>
            <a href="#wege" className={styles.primary}>{c.explore}<ArrowDown size={17} aria-hidden="true" /></a>
            <Link href={contactHref} className={styles.secondary}>{c.talk}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className={styles.process} aria-label={locale === 'de' ? 'Unser Prozess' : 'Our process'}>
            {c.process.map((step,index) => <div key={step}><span>0{index+1}</span><strong>{step}</strong></div>)}
          </div>
        </div>
      </section>
      <section id="wege" className={styles.paths} aria-labelledby="ways-title">
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>{c.stepsLabel}</p>
          <div className={styles.pathsIntro}>
            <h2 id="ways-title">{c.stepsTitle}</h2>
            <p>{c.stepsIntro}</p>
          </div>
          <div className={styles.services}>
            {c.topics.map((topic, index) => {
              const Icon = index === 0 ? Compass : index === 1 ? MessagesSquare : Layers3;
              return (
                <article id={topic.id} className={styles.service} key={topic.id}>
                  <div className={styles.serviceNumber}><span>{topic.number}</span><Icon size={31} strokeWidth={1.1} aria-hidden="true" /></div>
                  <div className={styles.serviceMain}>
                    <p className={styles.sectionLabel}>{topic.eyebrow}</p>
                    <h3>{topic.title}</h3>
                    <p className={styles.serviceLead}>{topic.lead}</p>
                    <p className={styles.description}>{topic.description}</p>
                    <details className={styles.details}>
                      <summary>{c.detailsLabel}<ChevronDown size={17} aria-hidden="true" /></summary>
                      <div className={styles.detailBody}>
                        <div><h4>{c.casesLabel}</h4><ul>{topic.cases.map(item => <li key={item}>{item}</li>)}</ul></div>
                        <div><h4>{c.outcomeLabel}</h4><ul>{topic.outcomes.map(item => <li key={item}><CheckCircle2 size={16} aria-hidden="true" />{item}</li>)}</ul></div>
                      </div>
                    </details>
                    <Link href={contactHref} className={styles.serviceLink}>{topic.action}<ArrowUpRight size={17} aria-hidden="true" /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.note}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>{c.noteEyebrow}</p>
          <h2>{c.noteTitle}</h2>
          <p>{c.noteText}</p>
        </div>
      </section>
      <section className={styles.contact}>
        <div className={styles.inner}>
          <h2>{c.footerTitle}</h2>
          <p>{c.footerBody}</p>
          <div className={styles.endActions}>
            <Link href={contactHref} className={styles.primary}>{c.footerCTA}<ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href={homeHref} className={styles.endBack}>{c.home}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
