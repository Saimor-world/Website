type Recommendation = {
  title?: string;
  text?: string;
  priority?: 'high' | 'medium' | 'low' | string;
};

type AuditLike = {
  id: string;
  name: string;
  email: string;
  industry?: string | null;
  companySize?: string | null;
  domain?: string | null;
  targetDomain?: string | null;
  score: number;
  level: string;
  analysis: string;
  recommendations?: unknown;
  reconData?: unknown;
};

export type DemoCompanyProfile = {
  companyName: string;
  domain: string | null;
  industry: string;
  sizeLabel: string;
  riskLevel: string;
  rooms: Array<{ name: string; purpose: string; signal: 'risk' | 'setup' | 'growth' }>;
  documents: Array<{ title: string; type: string; summary: string }>;
  tasks: Array<{ title: string; priority: 'high' | 'medium' | 'low'; source: string }>;
  nightwatchSignals: Array<{ label: string; value: string }>;
  dashboardMemory: Array<{ label: string; value: string }>;
  moraBriefing: string;
};

export function buildDemoCompanyProfile(audit: AuditLike): DemoCompanyProfile {
  const domain = audit.targetDomain || audit.domain || emailDomain(audit.email);
  const companyName = deriveCompanyName(audit.name, audit.email, domain);
  const industry = audit.industry || inferIndustry(domain) || 'Lokales Unternehmen';
  const sizeLabel = audit.companySize || 'Teamgroesse noch unbekannt';
  const recommendations = normalizeRecommendations(audit.recommendations);
  const highPriority = recommendations.filter((item) => item.priority === 'high');
  const tasks = recommendations.slice(0, 5).map((item) => ({
    title: item.title || 'Massnahme pruefen',
    priority: normalizePriority(item.priority),
    source: item.text || 'Aus dem Digital Risk Check abgeleitet.',
  }));

  if (tasks.length === 0) {
    tasks.push({
      title: 'Digitalen Basis-Check abschliessen',
      priority: audit.score < 60 ? 'high' : 'medium',
      source: 'Aus dem ersten Audit vorbereitet.',
    });
  }

  return {
    companyName,
    domain,
    industry,
    sizeLabel,
    riskLevel: audit.level,
    rooms: [
      {
        name: 'Security',
        purpose: `${highPriority.length || tasks.length} priorisierte Massnahmen aus dem Check.`,
        signal: audit.score < 70 ? 'risk' : 'setup',
      },
      {
        name: 'Betrieb',
        purpose: 'Dokumente, Verantwortlichkeiten und wiederkehrende Routinen vorbereiten.',
        signal: 'setup',
      },
      {
        name: 'Wachstum',
        purpose: 'Naechste Automationen und Kundenkontakt-Flaechen ableiten.',
        signal: 'growth',
      },
    ],
    documents: [
      {
        title: `${companyName} - Nightwatch Dossier`,
        type: 'Security Signal',
        summary: audit.analysis,
      },
      {
        title: 'Massnahmenplan 14 Tage',
        type: 'Plan',
        summary: tasks.slice(0, 3).map((task) => task.title).join(' / '),
      },
      {
        title: 'Simulierte Betriebsmappe',
        type: 'Workspace',
        summary: `${industry}, ${sizeLabel}, ${domain || 'ohne Domain'} - vorbereitet fuer HQ-Demo.`,
      },
    ],
    tasks,
    nightwatchSignals: [
      { label: 'Domain', value: domain || 'Noch offen' },
      { label: 'Risiko', value: `${audit.score}/100 - ${audit.level}` },
      { label: 'Quelle', value: 'Oeffentliche Web-Signale' },
    ],
    dashboardMemory: [
      { label: 'Firma', value: companyName },
      { label: 'Kontakt', value: audit.email },
      { label: 'Absicht', value: tasks[0]?.title || 'Ersten Check fortsetzen' },
    ],
    moraBriefing:
      `Nightwatch hat aus oeffentlichen Signalen ein erstes Dossier fuer ${companyName} gebaut. ` +
      `Das Dashboard merkt den Check; Mora OS macht daraus Raeume, Aufgaben und Finder-Kontext, bis echte Tools verbunden werden.`,
  };
}

function normalizeRecommendations(value: unknown): Recommendation[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Recommendation => typeof item === 'object' && item !== null)
    .map((item) => ({
      title: typeof item.title === 'string' ? item.title : undefined,
      text: typeof item.text === 'string' ? item.text : undefined,
      priority: typeof item.priority === 'string' ? item.priority : undefined,
    }));
}

function normalizePriority(value: unknown): 'high' | 'medium' | 'low' {
  if (value === 'high' || value === 'medium' || value === 'low') return value;
  return 'medium';
}

function emailDomain(email: string) {
  return email.includes('@') ? email.split('@')[1]?.toLowerCase() || null : null;
}

function deriveCompanyName(name: string, email: string, domain: string | null) {
  if (name && name.toLowerCase() !== 'anonym') return name;
  if (domain) {
    const root = domain.replace(/^www\./, '').split('.')[0];
    return root ? titleCase(root.replaceAll('-', ' ')) : domain;
  }
  return email.split('@')[0] || 'Dein Unternehmen';
}

function inferIndustry(domain: string | null) {
  if (!domain) return null;
  if (domain.includes('cafe') || domain.includes('coffee')) return 'Gastronomie';
  if (domain.includes('shop') || domain.includes('store')) return 'Handel';
  if (domain.includes('studio')) return 'Dienstleistung';
  return null;
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
