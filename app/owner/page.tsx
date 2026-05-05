import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Shield, Users, Activity, AlertTriangle, ChevronRight, Search, Mail, Download, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';
import { CORE_BASE_URL, OWNER_CONSOLE_CORE_TOKEN, fetchCoreJson, fetchCoreOwnerJson } from '@/lib/core-owner';
import { buildOsAuditUrl } from '@/lib/os-links';
import { signWebsiteEntryToken } from '@/lib/entry-token';

export const dynamic = 'force-dynamic';

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
}

function fmtDate(value: Date | string | null | undefined) {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString('de-DE');
}

function ownerNextAction(audit: { userId?: string | null; wallEntry?: { status?: string | null } | null }) {
  if (audit.userId) return 'Account betreuen';
  if (audit.wallEntry?.status === 'pending_review') return 'Wall freigeben';
  if (audit.wallEntry?.status === 'published') return 'HQ Follow-up';
  return 'Dossier qualifizieren';
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
  const [securityAudits, userCount, waitlistCount, contacts, wallEntries] = await Promise.all([
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
  ]);
  return { securityAudits, userCount, waitlistCount, contacts, wallEntries };
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

  return (
    <main className="min-h-screen bg-[#060a09] text-white p-8 md:p-16">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 font-bold">Owner Control Plane</p>
            <h1 className="text-5xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              External <span className="italic">Awareness</span> Dashboard
            </h1>
          </div>
          <div className="flex gap-4">
             <Link href="/systems/control" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs hover:bg-white/10 transition-colors">System Health</Link>
             <Link href="/api/owner/leads/export" className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
               <Download size={14} />
               Leads CSV
             </Link>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <StatCard label="Security Leads" value={data.securityAudits.length} icon={<Shield size={20}/>} />
           <StatCard label="Kunden (Users)" value={data.userCount} icon={<Users size={20}/>} />
           <StatCard label="Wall Review" value={pendingWall} icon={<Activity size={20}/>} />
        </div>

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
          <div className="grid gap-3 md:grid-cols-3">
            <MiniMetric label="Wall live" value={liveWall} />
            <MiniMetric label="Wall Review" value={pendingWall} />
            <MiniMetric label="Warteliste" value={data.waitlistCount} />
          </div>
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
              {data.securityAudits.map((audit: any) => (
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
                         <span className="px-2 py-1 rounded bg-emerald-500/10 text-[9px] uppercase tracking-widest text-emerald-200">{ownerNextAction(audit)}</span>
                      </div>
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
              ))}
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

function StatCard({ label, value, icon }: { label: string, value: number | string, icon: React.ReactNode }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-4 transition-all hover:border-emerald-500/30 group">
       <div className="flex items-center justify-between text-white/30 group-hover:text-emerald-400 transition-colors">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{label}</p>
          {icon}
       </div>
       <p className="text-4xl font-light tabular-nums">{value}</p>
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
