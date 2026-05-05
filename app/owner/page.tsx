import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Shield, Users, Activity, AlertTriangle, ChevronRight, Search, Mail, Download, CheckCircle2, XCircle, ExternalLink, LayoutDashboard, Zap, Server, HardDrive, FolderTree, Database, GitBranch, KeyRound, ListChecks } from 'lucide-react';
import { CORE_BASE_URL, OWNER_CONSOLE_CORE_TOKEN, fetchCoreOwnerJson } from '@/lib/core-owner';
import { buildOsAuditUrl } from '@/lib/os-links';
import { signWebsiteEntryToken } from '@/lib/entry-token';

export const dynamic = 'force-dynamic';

type CoreWebsitePreview = {
  id?: string | null;
  tenant_id?: string | null;
  company_name?: string | null;
  status?: string | null;
  claimed?: boolean | null;
  owner_email?: string | null;
  preview_email?: string | null;
  claim_email?: string | null;
  contact_email?: string | null;
  domain?: string | null;
  score?: number | string | null;
  website_entry_id?: string | null;
  dossier_node_id?: string | null;
  dossier_title?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  source?: string | null;
};

type CorePreviewLedger = {
  previews?: CoreWebsitePreview[];
  count?: number;
};

type CoreHostDisk = {
  path?: string;
  total_bytes?: number;
  used_bytes?: number;
  free_bytes?: number;
  used_percent?: number;
  status?: string;
};

type CoreHostInventoryItem = {
  name?: string;
  path?: string;
  kind?: string;
  size_bytes?: number | null;
  modified_at?: string | null;
};

type CoreHostOverview = {
  node?: {
    provider?: string;
    region?: string;
    hostname?: string;
    platform?: string;
    uptime_seconds?: number | null;
    load_average?: number[] | null;
  };
  storage?: {
    disks?: CoreHostDisk[];
    inventory?: Record<string, CoreHostInventoryItem[]>;
  };
  services?: Record<string, string>;
};

const LEAD_STATUSES = [
  { value: 'new', label: 'Neu', tone: 'bg-white/5 text-white/45', next: 'Dossier qualifizieren' },
  { value: 'qualified', label: 'Qualifiziert', tone: 'bg-cyan-500/10 text-cyan-200', next: 'HQ vorbereiten' },
  { value: 'contacted', label: 'Kontaktiert', tone: 'bg-amber-500/10 text-amber-200', next: 'Follow-up pruefen' },
  { value: 'demo_ready', label: 'HQ bereit', tone: 'bg-violet-500/10 text-violet-200', next: 'Kunde ins HQ holen' },
  { value: 'customer', label: 'Kunde', tone: 'bg-emerald-500/10 text-emerald-200', next: 'Account betreuen' },
  { value: 'archived', label: 'Archiv', tone: 'bg-white/5 text-white/30', next: 'Archiviert' },
] as const;

function leadStatusMeta(status?: string | null) {
  return LEAD_STATUSES.find((item) => item.value === status) || LEAD_STATUSES[0];
}

function wallStatusLabel(audit: { userId?: string | null; wallEntry?: { status?: string | null } | null }) {
  if (audit.userId) return 'Account verbunden';
  if (audit.wallEntry?.status === 'pending_review') return 'Wall Review';
  if (audit.wallEntry?.status === 'private') return 'Wall privat';
  if (audit.wallEntry) return 'Wall live';
  return 'Privates Dossier';
}

async function updateWallStatus(formData: FormData) {
  'use server';

  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'owner') {
    redirect('/owner/login');
  }

  const entryId = String(formData.get('entryId') || '');
  const status = String(formData.get('status') || '');
  if (!entryId || !['published', 'private', 'pending_review'].includes(status)) return;

  await prisma.wallEntry.update({
    where: { id: entryId },
    data: {
      status,
      approvedAt: status === 'published' ? new Date() : null,
    },
  });

  revalidatePath('/owner');
}

async function updateLeadLifecycle(formData: FormData) {
  'use server';

  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'owner') {
    redirect('/owner/login');
  }

  const auditId = String(formData.get('auditId') || '');
  const ownerStatus = String(formData.get('ownerStatus') || 'new');
  const ownerNote = String(formData.get('ownerNote') || '').trim().slice(0, 1200);
  const allowedStatuses = new Set(LEAD_STATUSES.map((item) => item.value));

  if (!auditId || !allowedStatuses.has(ownerStatus as any)) return;

  await prisma.securityAudit.update({
    where: { id: auditId },
    data: {
      ownerStatus,
      ownerNote: ownerNote || null,
      ownerUpdatedAt: new Date(),
    },
  });

  revalidatePath('/owner');
}

function fmtDate(value: Date | string | null | undefined) {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString('de-DE');
}

function formatBytes(value?: number | null) {
  if (!value || value < 0) return '-';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let next = value;
  let unit = 0;
  while (next >= 1024 && unit < units.length - 1) {
    next /= 1024;
    unit += 1;
  }
  return `${next >= 10 || unit === 0 ? next.toFixed(0) : next.toFixed(1)} ${units[unit]}`;
}

function formatUptime(seconds?: number | null) {
  if (!seconds || seconds < 0) return '-';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function primaryDisk(host?: CoreHostOverview | null) {
  return host?.storage?.disks?.find((disk) => disk.status === 'ok' && disk.path === '/')
    || host?.storage?.disks?.find((disk) => disk.status === 'ok')
    || null;
}

function normalizeDomain(value?: string | null) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0]
    .replace(/\.$/, '');
}

function normalizeName(value?: string | null) {
  return (value || '')
    .trim()
    .toLowerCase()
    .replace(/\b(gmbh|ug|ag|ltd|llc|inc|co|company)\b/g, '')
    .replace(/[^a-z0-9]+/g, '');
}

function auditDomain(audit: { targetDomain?: string | null; domain?: string | null }) {
  return normalizeDomain(audit.targetDomain || audit.domain);
}

function matchCorePreview(
  audit: { id: string; name: string; targetDomain?: string | null; domain?: string | null; score?: number | null },
  previews: CoreWebsitePreview[],
) {
  const byEntryId = previews.find((preview) => preview.website_entry_id === audit.id);
  if (byEntryId) return byEntryId;

  const domain = auditDomain(audit);
  if (domain) {
    const byDomain = previews.find((preview) => {
      if (normalizeDomain(preview.domain) !== domain) return false;
      if (preview.score == null || audit.score == null) return true;
      return Number(preview.score) === Number(audit.score);
    });
    if (byDomain) return byDomain;
  }

  const name = normalizeName(audit.name);
  return previews.find((preview) => name && normalizeName(preview.company_name) === name) || null;
}

function hqStatusLabel(preview?: CoreWebsitePreview | null) {
  if (!preview) return 'HQ nicht geoeffnet';
  if (preview.claimed || preview.status === 'claimed') return 'Kundenaccount';
  return 'Preview aktiv';
}

function hqStatusClass(preview?: CoreWebsitePreview | null) {
  if (!preview) return 'bg-white/5 text-white/40';
  if (preview.claimed || preview.status === 'claimed') return 'bg-emerald-500/10 text-emerald-200';
  return 'bg-cyan-500/10 text-cyan-200';
}

function ownerLifecycleStatus(audit: { ownerStatus?: string | null }) {
  return audit.ownerStatus || 'new';
}

function ownerNextAction(audit: { userId?: string | null; ownerStatus?: string | null; wallEntry?: { status?: string | null } | null }) {
  const manualNext = leadStatusMeta(audit.ownerStatus).next;
  if (audit.ownerStatus && audit.ownerStatus !== 'new') return manualNext;
  if (audit.userId) return 'Account betreuen';
  if (audit.wallEntry?.status === 'pending_review') return 'Wall freigeben';
  if (audit.wallEntry?.status === 'published') return 'HQ Follow-up';
  return manualNext;
}

function followUpMailto(audit: { email: string; name: string; score: number; level: string; targetDomain?: string | null; domain?: string | null }) {
  const domain = audit.targetDomain || audit.domain || 'deine Domain';
  const subject = `Saimor Check: ${audit.name}`;
  const body = [
    'Hi,',
    '',
    `ich habe mir euren Saimor Security Check fuer ${domain} angesehen.`,
    `Score: ${audit.score}/100 (${audit.level}).`,
    '',
    'Wenn du willst, bereite ich daraus den naechsten HQ-Schritt vor: Dossier, 14-Tage-Plan und Owner-Ansicht.',
    '',
    'Viele Gruesse',
  ].join('\n');
  return `mailto:${encodeURIComponent(audit.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function duplicateLeadGroups(audits: any[]) {
  const groups = new Map<string, { label: string; source: string; items: any[] }>();

  for (const audit of audits) {
    const domain = auditDomain(audit);
    const email = String(audit.email || '').trim().toLowerCase();
    const name = normalizeName(audit.name);
    const key = domain ? `domain:${domain}` : email ? `email:${email}` : name ? `name:${name}` : '';
    if (!key) continue;

    const label = domain || email || audit.name || 'Unbekannt';
    const source = domain ? 'Domain' : email ? 'E-Mail' : 'Name';
    const existing: { label: string; source: string; items: any[] } = groups.get(key) || { label, source, items: [] };
    existing.items.push(audit);
    groups.set(key, existing);
  }

  return Array.from(groups.values())
    .filter((group) => group.items.length > 1)
    .sort((a, b) => b.items.length - a.items.length || a.label.localeCompare(b.label))
    .slice(0, 6);
}

function buildPriorityLeads(items: Array<{ audit: any; preview: CoreWebsitePreview | null }>) {
  return items
    .map(({ audit, preview }) => {
      const reasons: string[] = [];
      let weight = 0;
      const score = Number(audit.score || 0);
      const status = ownerLifecycleStatus(audit);

      if (!preview) {
        weight += 35;
        reasons.push('HQ fehlt');
      }
      if (score >= 80) {
        weight += 25;
        reasons.push('hoher Score');
      } else if (score >= 60) {
        weight += 14;
        reasons.push('brauchbarer Einstieg');
      }
      if (status === 'new') {
        weight += 16;
        reasons.push('neu');
      }
      if (status === 'qualified' || status === 'demo_ready') {
        weight += 14;
        reasons.push(leadStatusMeta(status).label);
      }
      if (audit.wallEntry?.status === 'pending_review') {
        weight += 18;
        reasons.push('Wall Review');
      }
      if (audit.userId) {
        weight -= 12;
        reasons.push('Account existiert');
      }

      return { audit, preview, weight, reasons };
    })
    .filter((item) => item.weight > 0)
    .sort((a, b) => b.weight - a.weight || new Date(b.audit.createdAt).getTime() - new Date(a.audit.createdAt).getTime())
    .slice(0, 5);
}

function auditRecommendations(audit: { recommendations?: any }) {
  return Array.isArray(audit.recommendations) ? audit.recommendations : [];
}

function auditHqUrl(audit: {
  id: string;
  name: string;
  email: string;
  targetDomain?: string | null;
  domain?: string | null;
  score: number;
  level: string;
  analysis?: string | null;
  recommendations?: any;
}) {
  const domain = audit.targetDomain || audit.domain || '';
  const actions = auditRecommendations(audit)
    .slice(0, 3)
    .map((recommendation: any) => recommendation?.title)
    .filter(Boolean)
    .join('|');

  let entryToken: string | undefined;
  try {
    entryToken = signWebsiteEntryToken({
      id: audit.id,
      company: audit.name,
      email: audit.email,
      domain,
      score: audit.score,
      level: audit.level,
      summary: audit.analysis,
      actions: actions ? actions.split('|') : [],
    });
  } catch {
    entryToken = undefined;
  }

  return buildOsAuditUrl(audit.id, {
    company: audit.name,
    email: audit.email,
    domain,
    score: String(audit.score),
    level: audit.level,
    summary: audit.analysis ? audit.analysis.slice(0, 420) : undefined,
    entry_token: entryToken,
    actions,
  });
}

function hasEnv(key: string) {
  return Boolean(process.env[key]?.trim());
}

function readinessItems() {
  const isLocalDb = (process.env.DATABASE_URL || '').includes('localhost');
  const nextAuthUrl = process.env.NEXTAUTH_URL || '';
  const osUrl = process.env.NEXT_PUBLIC_OS_HOME_URL || process.env.OS_HOME_URL || '';
  const smtpReady = hasEnv('SMTP_HOST') && hasEnv('SMTP_USER') && hasEnv('SMTP_PASS');
  const ownerReady = hasEnv('OWNER_EMAILS') && hasEnv('OWNER_PASSWORD');

  return [
    {
      label: 'Owner Login',
      ok: ownerReady,
      detail: ownerReady ? 'OWNER_EMAILS und OWNER_PASSWORD gesetzt' : 'OWNER_EMAILS oder OWNER_PASSWORD fehlt',
    },
    {
      label: 'Database',
      ok: hasEnv('DATABASE_URL'),
      detail: hasEnv('DATABASE_URL') ? (isLocalDb ? 'lokale Postgres URL aktiv' : 'externe Postgres URL aktiv') : 'DATABASE_URL fehlt',
      warn: isLocalDb,
    },
    {
      label: 'Auth URL',
      ok: hasEnv('NEXTAUTH_URL') && nextAuthUrl.startsWith('http'),
      detail: nextAuthUrl || 'NEXTAUTH_URL fehlt',
      warn: nextAuthUrl.includes('localhost'),
    },
    {
      label: 'SMTP Mail',
      ok: smtpReady,
      detail: smtpReady ? `${process.env.SMTP_HOST} / ${process.env.SMTP_FROM || process.env.SMTP_USER}` : 'SMTP_HOST, SMTP_USER oder SMTP_PASS fehlt',
    },
    {
      label: 'Wall Tokens',
      ok: hasEnv('SAIMOR_WALL_SECRET') || hasEnv('SAIMOR_ENTRY_SECRET') || hasEnv('NEXTAUTH_SECRET'),
      detail: hasEnv('SAIMOR_WALL_SECRET') && hasEnv('SAIMOR_ENTRY_SECRET') ? 'eigene Wall/Entry Secrets gesetzt' : 'Fallback aktiv, fuer Go-Live eigene Secrets setzen',
      warn: !(hasEnv('SAIMOR_WALL_SECRET') && hasEnv('SAIMOR_ENTRY_SECRET')),
    },
    {
      label: 'AI Analyse',
      ok: hasEnv('ANTHROPIC_API_KEY') || hasEnv('GEMINI_API_KEY'),
      detail: hasEnv('ANTHROPIC_API_KEY') ? 'Anthropic aktiv' : hasEnv('GEMINI_API_KEY') ? 'Gemini aktiv' : 'kein AI Key gesetzt, Scan nutzt Fallback',
      warn: !hasEnv('ANTHROPIC_API_KEY'),
    },
    {
      label: 'HQ Ziel',
      ok: Boolean(osUrl),
      detail: osUrl || 'NEXT_PUBLIC_OS_HOME_URL fehlt',
      warn: osUrl.includes('localhost'),
    },
    {
      label: 'Core Owner Bridge',
      ok: Boolean(OWNER_CONSOLE_CORE_TOKEN),
      detail: OWNER_CONSOLE_CORE_TOKEN ? `Token gesetzt -> ${CORE_BASE_URL}` : 'OWNER_CONSOLE_CORE_TOKEN fehlt, externe Core-Daten deaktiviert',
      warn: !OWNER_CONSOLE_CORE_TOKEN,
    },
  ];
}

async function getOwnerData() {
  const [securityAudits, userCount, waitlistCount, contacts, wallEntries, corePreviewLedger, coreHost] = await Promise.all([
    prisma.securityAudit.findMany({ 
      orderBy: { createdAt: 'desc' }, 
      take: 20,
      include: { user: true, wallEntry: true } 
    }),
    prisma.user.count(),
    prisma.waitlist.count(),
    prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.wallEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: { status: true },
    }),
    fetchCoreOwnerJson<CorePreviewLedger>('/v3/entry/website-previews?raw=true&limit=50'),
    fetchCoreOwnerJson<CoreHostOverview>('/v3/system/owner/host?raw=true'),
  ]);
  return {
    securityAudits,
    userCount,
    waitlistCount,
    contacts,
    wallEntries,
    corePreviews: corePreviewLedger?.previews || [],
    corePreviewCount: corePreviewLedger?.count || corePreviewLedger?.previews?.length || 0,
    coreHost,
  };
}

export default async function OwnerDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== 'owner') {
    redirect('/owner/login');
  }

  const data = await getOwnerData();
  const readiness = readinessItems();
  const readyCount = readiness.filter((item) => item.ok && !item.warn).length;
  const pendingWall = data.wallEntries.filter((entry) => entry.status === 'pending_review').length;
  const liveWall = data.wallEntries.filter((entry) => !entry.status || entry.status === 'published').length;
  const disk = primaryDisk(data.coreHost);
  const healthyServiceCount = data.coreHost?.services ? Object.keys(data.coreHost.services).length : 0;
  const auditsWithPreview = data.securityAudits.map((audit: any) => ({
    audit,
    preview: matchCorePreview(audit, data.corePreviews),
  }));
  const matchedPreviewCount = auditsWithPreview.filter((item) => item.preview).length;
  const orphanLeadCount = Math.max(0, data.securityAudits.length - matchedPreviewCount);
  const claimedPreviewCount = data.corePreviews.filter((preview) => preview.claimed || preview.status === 'claimed').length;
  const previewOnlyCount = Math.max(0, data.corePreviewCount - claimedPreviewCount);
  const lifecycleCounts = LEAD_STATUSES.map((status) => ({
    ...status,
    count: data.securityAudits.filter((audit: any) => ownerLifecycleStatus(audit) === status.value).length,
  }));
  const duplicateGroups = duplicateLeadGroups(data.securityAudits);
  const priorityLeads = buildPriorityLeads(auditsWithPreview);

  return (
    <main className="min-h-screen bg-[#060a09] text-white p-8 md:p-16">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header */}
        <header className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] via-emerald-400/[0.035] to-transparent p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
              <LayoutDashboard size={13} />
              Mora Operator Command
            </div>
            <h1 className="max-w-4xl text-5xl font-light md:text-6xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Saimor <span className="italic">Kommandozentrale</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-white/55">
              Leads, HQ-Previews, Core-Bridge und Hetzner-Betrieb in einer Owner-Sicht. Keine zweite Dashboard-Welt mehr.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
             <Link href="/de/einstieg/security-check" className="px-4 py-3 rounded-xl bg-white text-black text-xs font-bold hover:bg-emerald-200 transition-colors">Neuer Scan</Link>
             <Link href="/systems/control" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors">System Health</Link>
             <Link href="/api/owner/leads/export" className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
               <Download size={14} />
               Leads CSV
             </Link>
          </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
           <StatCard
             label="Security Leads"
             value={data.securityAudits.length}
             icon={<Shield size={20}/>}
             source="WORLD.SecurityAudit"
             detail="Jeder abgeschlossene Website-Check. Noch kein Account."
           />
           <StatCard
             label="HQ Previews"
             value={data.corePreviewCount}
             icon={<ExternalLink size={20}/>}
             source="CORE.EntryTenant"
             detail="Temporare HQ-Dossiers aus Website-Entry-Tokens."
           />
           <StatCard
             label="Kunden (Users)"
             value={data.userCount}
             icon={<Users size={20}/>}
             source="WORLD.User"
             detail="Echte eingeloggte Website-Accounts, nicht alle Leads."
           />
           <StatCard
             label="Hetzner Disk"
             value={disk ? `${disk.used_percent ?? '-'}%` : '--'}
             icon={<HardDrive size={20}/>}
             source="CORE Host"
             detail="Live Snapshot vom Server hinter api/hq."
           />
           <StatCard
             label="Wall Review"
             value={pendingWall}
             icon={<Activity size={20}/>}
             source="WORLD.WallEntry"
             detail="Nur Eintraege, die bewusst freigegeben werden muessen."
           />
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-200/55">Daten-Wahrheit</p>
              <h2 className="mt-2 text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Was zaehlt wo?
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/48">
              Lead != Preview != User != Wall
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            <TruthStep
              icon={<Database size={17} />}
              step="01"
              title="Website Lead"
              value={data.securityAudits.length}
              body="Entsteht sofort nach einem Security Check. Privat, intern, verkaufsrelevant."
            />
            <TruthStep
              icon={<GitBranch size={17} />}
              step="02"
              title="HQ Preview"
              value={data.corePreviewCount}
              body="Entsteht erst, wenn aus dem Lead ein OS-Dossier mit Entry-Token geoeffnet wird."
            />
            <TruthStep
              icon={<KeyRound size={17} />}
              step="03"
              title="Kundenaccount"
              value={data.userCount}
              body="Entsteht erst durch Login/Magic Link/Passwort. Das ist die echte Account-Ebene."
            />
            <TruthStep
              icon={<ListChecks size={17} />}
              step="04"
              title="Wall Review"
              value={pendingWall}
              body="Oeffentliche Wall passiert nur nach Zustimmung und Review. Nicht jeder Check landet dort."
            />
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-emerald-400/10 bg-emerald-400/[0.035] p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-200/55">Command Briefing</p>
                <h2 className="mt-2 text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Heute zuerst bearbeiten
                </h2>
              </div>
              <span className="rounded-full border border-emerald-300/15 bg-black/20 px-4 py-2 text-xs text-emerald-100/65">
                {priorityLeads.length} Prioritaeten
              </span>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-4">
              <MiniMetric label="Leads ohne HQ" value={orphanLeadCount} />
              <MiniMetric label="Preview ohne Claim" value={previewOnlyCount} />
              <MiniMetric label="Duplikat-Gruppen" value={duplicateGroups.length} />
              <MiniMetric label="Kundenaccounts" value={data.userCount} />
            </div>
            <div className="mt-6 space-y-3">
              {priorityLeads.map((item, index) => (
                <PriorityLeadRow key={item.audit.id} item={item} index={index + 1} />
              ))}
              {!priorityLeads.length ? (
                <p className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-white/45">
                  Keine kritische Queue. Neue Leads, Wall Reviews oder fehlende HQ-Previews erscheinen hier automatisch.
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.028] p-6 md:p-8 space-y-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/38">Lead Lifecycle</p>
              <h2 className="mt-2 text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Pipeline-Zustand
              </h2>
            </div>
            <div className="space-y-2">
              {lifecycleCounts.map((status) => (
                <LifecycleRow key={status.value} label={status.label} count={status.count} tone={status.tone} />
              ))}
            </div>
            <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.035] p-4 text-xs leading-relaxed text-cyan-50/58">
              HQ oeffnen erzeugt einen frischen, signierten Entry-Token. Damit wird der konkrete Lead im OS geladen, ohne deinen normalen HQ-Home-State dauerhaft zu ueberschreiben.
            </div>
          </div>
        </section>

        {duplicateGroups.length ? (
          <section className="rounded-3xl border border-amber-400/15 bg-amber-400/[0.045] p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-amber-200/55">Dedupe Watch</p>
                <h2 className="mt-2 text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Mehrere Wahrheiten zum selben Kontakt
                </h2>
              </div>
              <span className="rounded-full border border-amber-300/15 bg-black/20 px-4 py-2 text-xs text-amber-100/65">
                {duplicateGroups.length} Gruppen
              </span>
            </div>
            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              {duplicateGroups.map((group) => (
                <DuplicateGroupCard key={`${group.source}-${group.label}`} group={group} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-[2.5rem] border border-saimor-gold/30 bg-gradient-to-br from-saimor-gold/10 to-transparent p-8 md:p-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-saimor-gold/70">Operator Field Suite</p>
              <h2 className="mt-2 text-3xl font-light text-saimor-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Live System Access
              </h2>
            </div>
            <div className="rounded-full border border-saimor-gold/20 bg-saimor-gold/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-saimor-gold">
              {data.coreHost?.node?.provider || 'Hetzner'} · {data.coreHost?.node?.region || 'DE'}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <OperatorMetric label="Node" value={data.coreHost?.node?.hostname || 'api.saimor.world'} detail={`Uptime ${formatUptime(data.coreHost?.node?.uptime_seconds)}`} icon={<Server size={18} />} />
            <OperatorMetric label="Kapazitaet" value={disk ? `${formatBytes(disk.free_bytes)} frei` : 'nicht verfuegbar'} detail={disk ? `${formatBytes(disk.used_bytes)} von ${formatBytes(disk.total_bytes)} genutzt` : 'Core Host Snapshot fehlt'} icon={<HardDrive size={18} />} />
            <OperatorMetric label="Services" value={healthyServiceCount ? `${healthyServiceCount} verknuepft` : 'Bridge pruefen'} detail={`Load ${data.coreHost?.node?.load_average?.slice(0, 3).map((v) => v.toFixed(2)).join(' / ') || '-'}`} icon={<Zap size={18} />} />
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {Object.entries(data.coreHost?.storage?.inventory || {}).map(([scope, items]) => (
              <div key={scope} className="rounded-2xl border border-white/8 bg-black/28 p-4">
                <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/38">
                  <FolderTree size={14} />
                  {scope.replace(/_/g, ' ')}
                </div>
                <div className="space-y-2">
                  {items.slice(0, 7).map((item) => (
                    <div key={`${scope}-${item.path || item.name}`} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.025] px-3 py-2 text-xs">
                      <span className="min-w-0 truncate text-white/68">{item.name}</span>
                      <span className="shrink-0 font-mono text-white/32">{formatBytes(item.size_bytes)}</span>
                    </div>
                  ))}
                  {!items.length ? <p className="text-xs text-white/28">Keine Inventardaten sichtbar.</p> : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-200/55">Go-Live Readiness</p>
              <h2 className="mt-2 text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Was ist wirklich bereit?
              </h2>
            </div>
            <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70">
              {readyCount}/{readiness.length} sauber
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {readiness.map((item) => (
              <ReadinessCard key={item.label} {...item} />
            ))}
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            <MiniMetric label="Wall live" value={liveWall} />
            <MiniMetric label="Wall Review" value={pendingWall} />
            <MiniMetric label="HQ Previews" value={data.corePreviewCount} />
            <MiniMetric label="Warteliste" value={data.waitlistCount} />
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.035] p-6 space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/55">HQ Preview Ledger</p>
              <h2 className="mt-2 text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Website-Leads im OS
              </h2>
            </div>
            <div className="rounded-full border border-cyan-300/15 bg-black/20 px-4 py-2 text-sm text-cyan-100/70">
              {data.corePreviewCount} Core-Tenants
            </div>
          </div>
          {data.corePreviews.length ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {data.corePreviews.slice(0, 6).map((preview) => (
                <div key={preview.id || preview.tenant_id || preview.company_name || preview.created_at} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white/88">{preview.company_name || 'Unbenannter Preview-Tenant'}</p>
                      <p className="mt-1 truncate text-xs text-white/42">{preview.domain || preview.contact_email || preview.preview_email || '-'}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[9px] uppercase tracking-widest ${hqStatusClass(preview)}`}>
                      {hqStatusLabel(preview)}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-2 text-[11px] text-white/45 sm:grid-cols-2">
                    <p className="truncate">Tenant: <span className="font-mono text-white/65">{preview.tenant_id || '-'}</span></p>
                    <p className="truncate">Dossier: <span className="text-white/65">{preview.dossier_title || '-'}</span></p>
                    <p className="truncate">Kontakt: <span className="text-white/65">{preview.claim_email || preview.contact_email || '-'}</span></p>
                    <p>Aktualisiert: <span className="text-white/65">{fmtDate(preview.updated_at || preview.created_at)}</span></p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-black/20 p-5 text-sm text-white/50">
              Noch keine HQ-Previews aus Core sichtbar. Wenn gerade lokale Tests laufen, wird diese Liste erst nach dem Website-Einstieg ins HQ gefuellt.
            </div>
          )}
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Column: Security Audits */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-light italic">Neueste Security Audits</h2>
               <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                  <input type="text" placeholder="Leads filtern..." className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs outline-none focus:border-emerald-500/50" />
               </div>
            </div>

            <div className="grid gap-4">
              {data.securityAudits.map((audit: any) => {
                const hqPreview = matchCorePreview(audit, data.corePreviews);
                const leadStatus = leadStatusMeta(audit.ownerStatus);
                return (
                <div key={audit.id} className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/[0.04]">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${audit.score >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                            {audit.score}
                         </div>
                         <div>
                            <h3 className="font-bold text-white/90">{audit.name}</h3>
                            <p className="text-xs text-white/40">{audit.email}</p>
                         </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         <span className="px-2 py-1 rounded bg-white/5 text-[9px] uppercase tracking-widest text-white/50">{audit.industry || 'Keine Branche'}</span>
                         <span className="px-2 py-1 rounded bg-cyan-500/10 text-[9px] uppercase tracking-widest text-cyan-300 font-mono">{audit.targetDomain || audit.domain}</span>
                         <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-widest ${audit.userId ? 'bg-cyan-500/10 text-cyan-200' : audit.wallEntry?.status === 'published' ? 'bg-emerald-500/10 text-emerald-200' : audit.wallEntry ? 'bg-amber-500/10 text-amber-200' : 'bg-white/5 text-white/40'}`}>
                           {wallStatusLabel(audit)}
                         </span>
                         <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-widest ${hqStatusClass(hqPreview)}`}>
                           {hqStatusLabel(hqPreview)}
                         </span>
                         <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-widest ${leadStatus.tone}`}>
                           {leadStatus.label}
                         </span>
                         <span className="px-2 py-1 rounded bg-emerald-500/10 text-[9px] uppercase tracking-widest text-emerald-200">{ownerNextAction(audit)}</span>
                         <span className="px-2 py-1 rounded border border-white/8 bg-black/18 text-[9px] uppercase tracking-widest text-white/34">Quelle: Website</span>
                         {hqPreview ? (
                           <span className="px-2 py-1 rounded border border-cyan-300/12 bg-cyan-300/[0.045] text-[9px] uppercase tracking-widest text-cyan-100/55">OS verknuepft</span>
                         ) : null}
                      </div>
                      {hqPreview ? (
                        <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.035] px-3 py-2 text-[11px] text-cyan-50/62">
                          <span className="font-mono text-cyan-100/72">{hqPreview.tenant_id}</span>
                          {hqPreview.dossier_title ? <span> · {hqPreview.dossier_title}</span> : null}
                          {hqPreview.claim_email || hqPreview.contact_email ? (
                            <span> · {hqPreview.claim_email || hqPreview.contact_email}</span>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-right space-y-2">
                       <p className="text-[10px] text-white/20">{fmtDate(audit.createdAt)}</p>
                       <Link href={`/account/dashboard/audit/${audit.id}`} className="flex items-center gap-2 ml-auto text-[10px] uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                          Details öffnen <ChevronRight size={12}/>
                       </Link>
                       <a
                         href={auditHqUrl(audit)}
                         target="_blank"
                         rel="noreferrer noopener"
                         className="flex items-center gap-2 ml-auto text-[10px] uppercase tracking-widest text-cyan-300/80 hover:text-white transition-colors"
                       >
                         HQ öffnen <ExternalLink size={12}/>
                       </a>
                       <a href={followUpMailto(audit)} className="flex items-center gap-2 ml-auto text-[10px] uppercase tracking-widest text-white/45 hover:text-white transition-colors">
                         Mail-Entwurf <Mail size={12}/>
                       </a>
                    </div>
                  </div>

                  {/* Attacker Path Preview (Hidden by default, shown on group-hover or click) */}
                  {audit.attackerPath && (
                    <div className="mt-6 p-4 rounded-xl bg-rose-500/[0.03] border border-rose-500/10 space-y-2">
                       <p className="text-[9px] uppercase tracking-[0.2em] text-rose-400 font-bold">Hypothetischer Angriffsweg</p>
                       <p className="text-xs text-white/60 leading-relaxed italic line-clamp-2">"{audit.attackerPath}"</p>
                    </div>
                  )}
                  <form action={updateLeadLifecycle} className="mt-4 grid gap-3 rounded-xl border border-white/5 bg-black/16 p-4 md:grid-cols-[180px_1fr_auto]">
                    <input type="hidden" name="auditId" value={audit.id} />
                    <label className="space-y-2">
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-white/35">Lead Status</span>
                      <select
                        name="ownerStatus"
                        defaultValue={audit.ownerStatus || 'new'}
                        className="w-full rounded-lg border border-white/10 bg-[#070b0a] px-3 py-2 text-xs text-white/75 outline-none focus:border-emerald-400/40"
                      >
                        {LEAD_STATUSES.map((status) => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </label>
                    <label className="space-y-2">
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-white/35">Owner Notiz</span>
                      <textarea
                        name="ownerNote"
                        defaultValue={audit.ownerNote || ''}
                        rows={2}
                        placeholder="Naechster Schritt, Kontext, Risiko oder Zusage..."
                        className="w-full resize-none rounded-lg border border-white/10 bg-[#070b0a] px-3 py-2 text-xs text-white/75 outline-none placeholder:text-white/20 focus:border-emerald-400/40"
                      />
                    </label>
                    <div className="flex items-end">
                      <button className="w-full rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-[10px] uppercase tracking-widest text-emerald-200 hover:bg-emerald-400/15 md:w-auto">
                        Speichern
                      </button>
                    </div>
                    {audit.ownerUpdatedAt ? (
                      <p className="md:col-span-3 text-[10px] text-white/28">Zuletzt bearbeitet: {fmtDate(audit.ownerUpdatedAt)}</p>
                    ) : null}
                  </form>
                  {audit.wallEntry ? (
                    <form action={updateWallStatus} className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                      <input type="hidden" name="entryId" value={audit.wallEntry.id} />
                      <button name="status" value="published" className="rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-[10px] uppercase tracking-widest text-emerald-200 hover:bg-emerald-400/15">
                        Veröffentlichen
                      </button>
                      <button name="status" value="private" className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-widest text-white/55 hover:bg-white/[0.08]">
                        Privat halten
                      </button>
                      <button name="status" value="pending_review" className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-[10px] uppercase tracking-widest text-amber-200 hover:bg-amber-400/15">
                        Review
                      </button>
                    </form>
                  ) : null}
                </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar: Notifications & Messages */}
          <div className="space-y-10">
            <section className="space-y-6">
               <h2 className="text-xl font-light italic border-b border-white/5 pb-4">Kontaktanfragen</h2>
               <div className="space-y-4">
                  {data.contacts.map((c: any) => (
                    <div key={c.id} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                       <div className="flex justify-between items-center">
                          <p className="text-xs font-bold">{c.name}</p>
                          <p className="text-[9px] text-white/30">{fmtDate(c.createdAt)}</p>
                       </div>
                       <p className="text-[11px] text-white/50 line-clamp-2">{c.message}</p>
                    </div>
                  ))}
               </div>
            </section>

            <section className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
               <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <Mail size={16}/> Lead-Export
               </h3>
               <p className="text-[11px] text-white/40 leading-relaxed">Alle Security-Audits als CSV exportieren für dein CRM oder zur manuellen Nachverfolgung.</p>
               <Link href="/api/owner/leads/export" className="block w-full py-3 rounded-xl bg-white/10 text-center text-xs font-bold hover:bg-white/20 transition-all">
                 CSV herunterladen
               </Link>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
  source,
  detail,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  source?: string;
  detail?: string;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-4 transition-all hover:border-emerald-500/30 group">
       <div className="flex items-center justify-between text-white/30 group-hover:text-emerald-400 transition-colors">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{label}</p>
          {icon}
       </div>
       <p className="text-4xl font-light tabular-nums">{value}</p>
       {source ? <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200/45">{source}</p> : null}
       {detail ? <p className="text-[11px] leading-relaxed text-white/36">{detail}</p> : null}
    </div>
  );
}

function TruthStep({
  icon,
  step,
  title,
  value,
  body,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  value: number | string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
      <div className="flex items-center justify-between gap-3 text-white/35">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{step}</span>
        {icon}
      </div>
      <div className="mt-5 flex items-end justify-between gap-4">
        <h3 className="text-lg font-semibold text-white/86">{title}</h3>
        <span className="text-3xl font-light tabular-nums text-white">{value}</span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-white/42">{body}</p>
    </div>
  );
}

function PriorityLeadRow({
  item,
  index,
}: {
  item: { audit: any; preview: CoreWebsitePreview | null; weight: number; reasons: string[] };
  index: number;
}) {
  return (
    <div className="grid gap-4 rounded-2xl border border-white/8 bg-black/22 p-4 md:grid-cols-[40px_1fr_auto] md:items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/15 bg-emerald-300/10 font-mono text-sm text-emerald-100">
        {index}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-semibold text-white/88">{item.audit.name}</p>
          <span className={`rounded-full px-2 py-1 text-[9px] uppercase tracking-widest ${hqStatusClass(item.preview)}`}>
            {hqStatusLabel(item.preview)}
          </span>
        </div>
        <p className="mt-1 truncate text-xs text-white/42">{item.audit.email} - {item.audit.targetDomain || item.audit.domain || 'keine Domain'}</p>
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end">
        {item.reasons.slice(0, 3).map((reason) => (
          <span key={reason} className="rounded-full border border-white/8 bg-white/[0.045] px-2 py-1 text-[9px] uppercase tracking-widest text-white/48">
            {reason}
          </span>
        ))}
        <span className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-2 py-1 text-[9px] uppercase tracking-widest text-emerald-100">
          P{item.weight}
        </span>
      </div>
    </div>
  );
}

function LifecycleRow({ label, count, tone }: { label: string; count: number; tone: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-black/18 px-4 py-3">
      <span className={`rounded-full px-2 py-1 text-[9px] uppercase tracking-widest ${tone}`}>{label}</span>
      <span className="font-mono text-lg tabular-nums text-white/80">{count}</span>
    </div>
  );
}

function DuplicateGroupCard({ group }: { group: { label: string; source: string; items: any[] } }) {
  return (
    <div className="rounded-2xl border border-amber-300/12 bg-black/22 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-white/86">{group.label}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-amber-100/45">{group.source}</p>
        </div>
        <span className="rounded-full border border-amber-300/15 bg-amber-300/10 px-2 py-1 text-[10px] text-amber-100">
          {group.items.length}x
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {group.items.slice(0, 3).map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg bg-white/[0.035] px-3 py-2 text-[11px]">
            <span className="min-w-0 truncate text-white/58">{item.name}</span>
            <span className="shrink-0 text-white/32">{fmtDate(item.createdAt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperatorMetric({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/32 p-6 space-y-3">
      <div className="flex items-center justify-between text-white/35">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{label}</p>
        {icon}
      </div>
      <p className="text-2xl font-mono text-emerald-300">{value}</p>
      <p className="text-[11px] leading-relaxed text-white/38">{detail}</p>
    </div>
  );
}

function ReadinessCard({
  label,
  ok,
  warn,
  detail,
}: {
  label: string;
  ok: boolean;
  warn?: boolean;
  detail: string;
}) {
  const tone = !ok
    ? 'border-red-400/20 bg-red-400/[0.06] text-red-200'
    : warn
      ? 'border-amber-400/20 bg-amber-400/[0.06] text-amber-200'
      : 'border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200';
  const Icon = !ok ? XCircle : warn ? AlertTriangle : CheckCircle2;

  return (
    <div className={`rounded-2xl border p-4 ${tone}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold">{label}</p>
        <Icon size={16} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-white/52">{detail}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/18 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">{label}</p>
      <p className="mt-1 text-2xl font-light tabular-nums">{value}</p>
    </div>
  );
}
