import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  createOwnerCompanyAction,
  createOwnerUserAction,
  updateOwnerCompanyAction,
  updateOwnerUserAction,
} from './actions';
import { CORE_BASE_URL, OWNER_CONSOLE_CORE_TOKEN, fetchCoreJson, fetchCoreOwnerJson } from '@/lib/core-owner';

export const dynamic = 'force-dynamic';

type OwnerPageProps = {
  searchParams: Promise<{
    q?: string;
    notice?: string;
    error?: string;
  }>;
};

type InstancePolicy = {
  deployment_model: string;
  company_model: string;
  public_registration_enabled: boolean;
  invite_only: boolean;
  bootstrap_owner_enabled: boolean;
  bootstrap_available: boolean;
  tenant_self_service_enabled: boolean;
  demo_exception_enabled: boolean;
  owner_console_enabled: boolean;
  surfaces?: {
    website?: string;
    hq?: string;
    owner?: string;
  };
  guidance?: string[];
};

type CoreHealth = {
  status?: string;
  environment?: string;
  awareness_status?: string;
  timestamp?: string;
  build?: {
    sha?: string;
    commit?: string;
    version?: string;
  };
};

type OwnerOverview = {
  generated_at?: string;
  counts?: {
    tenants?: number;
    companies?: number;
    demo_companies?: number;
    users?: number;
    owner_users?: number;
    admin_users?: number;
    active_sessions?: number;
    api_keys?: number;
    owner_console_tokens?: number;
    personal_spaces?: number;
  };
  system?: {
    service?: string;
    environment?: string;
    owner_console_enabled?: boolean;
    owner_bridge?: {
      env_var?: string;
      configured?: boolean;
      active_count?: number;
      default_expires_days?: number;
      latest?: {
        key_prefix?: string;
        created_at?: string;
        expires_at?: string;
        last_used_at?: string | null;
        is_active?: boolean;
      } | null;
    };
  };
  tenants?: Array<{
    tenant_id: string;
    company_count: number;
    demo_company_count: number;
    user_count: number;
  }>;
  companies?: Array<{
    id: string;
    tenant_id: string;
    owner_id?: string;
    name: string;
    slug?: string;
    is_demo?: boolean;
    created_at?: string;
  }>;
  users?: Array<{
    id: string;
    email: string;
    role: string;
    tenant_id: string;
  }>;
  notices?: string[];
};

type OwnerCompanyRecord = {
  id: string;
  tenant_id: string;
  owner_id?: string;
  name: string;
  slug?: string;
  description?: string | null;
  logo_url?: string | null;
  is_demo?: boolean;
  created_at?: string;
};

type OwnerUserRecord = {
  id: string;
  tenant_id: string;
  email: string;
  full_name?: string | null;
  role: string;
  is_active: boolean;
  email_verified: boolean;
  default_company_id?: string | null;
  default_company_name?: string | null;
  last_login_at?: string | null;
  created_at?: string;
};

function fmtDate(value: Date | string | null | undefined) {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString('de-DE');
}

function describeFeedback(kind: 'notice' | 'error', value?: string | null) {
  if (!value) return null;

  const [code, ...detailParts] = value.split(':');
  const detail = detailParts.join(':');

  switch (code) {
    case 'company-created':
      return { kind, text: `Company erstellt: ${detail}` };
    case 'company-updated':
      return { kind, text: 'Company aktualisiert.' };
    case 'user-created':
      return { kind, text: `User erstellt: ${detail}` };
    case 'user-updated':
      return { kind, text: 'User aktualisiert.' };
    case 'owner-access-required':
      return { kind, text: 'Owner-Rechte sind erforderlich.' };
    default:
      return {
        kind,
        text: value.replaceAll('-', ' '),
      };
  }
}

async function getOwnerConsoleSnapshot() {
  const [policy, health, overview, companies, users] = await Promise.all([
    fetchCoreJson<InstancePolicy>('/v3/auth/instance-policy'),
    fetchCoreJson<CoreHealth>('/v3/health?raw=true'),
    fetchCoreOwnerJson<OwnerOverview>('/v3/system/owner/overview?raw=true'),
    fetchCoreOwnerJson<OwnerCompanyRecord[]>('/v3/system/owner/companies?raw=true&limit=8'),
    fetchCoreOwnerJson<OwnerUserRecord[]>('/v3/system/owner/users?raw=true&limit=10'),
  ]);

  return { policy, health, overview, companies, users };
}

export default async function OwnerPage({ searchParams }: OwnerPageProps) {
  const session = await getServerSession(authOptions);
  const { q, notice, error } = await searchParams;
  const query = q?.trim().toLowerCase();
  const feedback = describeFeedback('notice', notice) || describeFeedback('error', error);

  if (!session?.user) {
    redirect('/owner/login?callbackUrl=/owner');
  }

  if (session.user.role !== 'owner') {
    return (
      <main className="min-h-screen bg-[#081410] text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 space-y-6">
          <h1 className="text-3xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Owner Console
          </h1>
          <p className="text-white/70">
            Du bist angemeldet als <span className="text-white">{session.user.email}</span>, aber hast keine
            Owner-Rechte.
          </p>
          <div className="flex gap-3">
            <Link
              href="https://www.saimor.world/de"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-saimor-gold"
            >
              Zur Website
            </Link>
            <Link
              href="/owner/login"
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm hover:border-saimor-gold"
            >
              Anderer Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const ownerConsole = await getOwnerConsoleSnapshot();
  const whereClause = query
    ? {
        OR: [
          { email: { contains: query, mode: 'insensitive' } as any },
          { name: { contains: query, mode: 'insensitive' } as any },
        ],
      }
    : {};

  let waitlistCount: number | null = null;
  let contactCount: number | null = null;
  let sessionCount: number | null = null;
  let messageCount: number | null = null;
  let waitlist: any[] = [];
  let contacts: any[] = [];
  let chatSessions: any[] = [];
  let stats: any = null;
  let websiteDataError: string | null = null;

  try {
    [
      waitlistCount,
      contactCount,
      sessionCount,
      messageCount,
      waitlist,
      contacts,
      chatSessions,
      stats,
    ] = await Promise.all([
      prisma.waitlist.count(),
      prisma.contactMessage.count(),
      prisma.chatSession.count(),
      prisma.message.count(),
      prisma.waitlist.findMany({
        where: whereClause,
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactMessage.findMany({
        where: whereClause,
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.chatSession.findMany({ take: 10, orderBy: { lastActivity: 'desc' } }),
      prisma.dashboardStats.findFirst({ orderBy: { updatedAt: 'desc' } }),
    ]);
  } catch (err) {
    websiteDataError = String(err);
  }

  return (
    <main className="min-h-screen bg-[#081410] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-10">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.32em] text-saimor-gold">Owner Console</p>
              <h1 className="text-4xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                External instance control
              </h1>
              <p className="text-white/70 text-sm max-w-3xl">
                Eingeloggt als <span className="text-white">{session.user.email}</span>. Diese Flaeche bleibt bewusst
                ausserhalb des HQ-OS und verbindet Website, Core und spaeter die eigentliche Instanzverwaltung.
              </p>
            </div>

            <form action="/owner" className="flex items-center gap-2">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Email oder Name suchen..."
                className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-saimor-gold min-w-[240px]"
              />
              <button
                type="submit"
                className="rounded-xl bg-saimor-gold/10 border border-saimor-gold/20 px-4 py-2 text-sm hover:bg-saimor-gold/20 text-saimor-gold"
              >
                Suchen
              </button>
              {query && (
                <Link href="/owner" className="text-xs text-white/30 hover:text-white/60 ml-2 underline underline-offset-4">
                  Reset
                </Link>
              )}
            </form>
          </header>

          {feedback && (
            <section
              className={`rounded-2xl border p-4 text-sm ${
                feedback.kind === 'error'
                  ? 'border-rose-500/30 bg-rose-500/10 text-rose-100'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100'
              }`}
            >
              {feedback.text}
            </section>
          )}

          {websiteDataError && (
            <section className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-white/80">
              Website-CRM-Daten sind auf dieser Surface gerade nicht verfuegbar. Die Owner Console bleibt trotzdem
              nutzbar, weil Policy, Health, Bridge-Status und Instanzverwaltung direkt aus dem Core geladen werden.
            </section>
          )}

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">Surface Model</p>
                <h2 className="mt-2 text-xl font-semibold">Website / HQ / Owner</h2>
              </div>
              <div className="space-y-3 text-sm text-white/80">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/45">Public Website</div>
                  <div className="mt-2 font-medium">www.saimor.world</div>
                  <div className="mt-1 text-white/60">Entry, trust, story, contact and waitlist.</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/45">HQ / OS</div>
                  <div className="mt-2 font-medium">hq.saimor.world</div>
                  <div className="mt-1 text-white/60">Operational work, collaboration, spaces, folders and content.</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/45">Owner Console</div>
                  <div className="mt-2 font-medium">separate management plane</div>
                  <div className="mt-1 text-white/60">Instance policy, system oversight and owner-only control.</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">Instance Policy</p>
                <h2 className="mt-2 text-xl font-semibold">Core-backed product mode</h2>
              </div>
              {ownerConsole.policy ? (
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">deployment_model</span>
                    <span className="font-mono">{ownerConsole.policy.deployment_model}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">company_model</span>
                    <span className="font-mono">{ownerConsole.policy.company_model}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">public_registration</span>
                    <span className="font-mono">
                      {ownerConsole.policy.public_registration_enabled ? 'enabled' : 'disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">bootstrap_owner</span>
                    <span className="font-mono">{ownerConsole.policy.bootstrap_available ? 'available' : 'closed'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">tenant_self_service</span>
                    <span className="font-mono">
                      {ownerConsole.policy.tenant_self_service_enabled ? 'enabled' : 'disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">demo_exception</span>
                    <span className="font-mono">{ownerConsole.policy.demo_exception_enabled ? 'enabled' : 'disabled'}</span>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-white/80">
                    <div className="text-xs uppercase tracking-[0.22em] text-emerald-300">Current Guidance</div>
                    <ul className="mt-3 space-y-2 text-sm">
                      {(ownerConsole.policy.guidance || []).slice(0, 4).map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-sm">
                  Core policy konnte nicht geladen werden. Die Owner Console bleibt aber als getrennte Ebene bestehen.
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">Live System</p>
                <h2 className="mt-2 text-xl font-semibold">Core pulse</h2>
              </div>
              {ownerConsole.health ? (
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">status</span>
                    <span className="font-mono">{ownerConsole.health.status || 'ok'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">environment</span>
                    <span className="font-mono">{ownerConsole.health.environment || '-'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">awareness</span>
                    <span className="font-mono">{ownerConsole.health.awareness_status || '-'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">build</span>
                    <span className="font-mono">
                      {ownerConsole.health.build?.sha ||
                        ownerConsole.health.build?.commit ||
                        ownerConsole.health.build?.version ||
                        '-'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">timestamp</span>
                    <span className="font-mono">{fmtDate(ownerConsole.health.timestamp)}</span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-white/65">
                    Dies ist bewusst kein komplettes DevOps-Panel. Es zeigt nur die noetigen Instanzsignale fuer
                    Owner-Entscheidungen.
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-sm">Core health konnte nicht geladen werden.</p>
              )}
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60 uppercase tracking-[0.28em]">Waitlist</p>
              <p className="mt-2 text-3xl font-semibold">{waitlistCount ?? '—'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60 uppercase tracking-[0.28em]">Kontakt</p>
              <p className="mt-2 text-3xl font-semibold">{contactCount ?? '—'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60 uppercase tracking-[0.28em]">Chat Sessions</p>
              <p className="mt-2 text-3xl font-semibold">{sessionCount ?? '—'}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs text-white/60 uppercase tracking-[0.28em]">Messages</p>
              <p className="mt-2 text-3xl font-semibold">{messageCount ?? '—'}</p>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 lg:col-span-2">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/50">Instance Overview</p>
                  <h2 className="mt-2 text-xl font-semibold">Owner-only system snapshot</h2>
                </div>
                <div className="text-xs text-white/40 font-mono">
                  {ownerConsole.overview?.generated_at ? fmtDate(ownerConsole.overview.generated_at) : 'Token fehlt'}
                </div>
              </div>

              {ownerConsole.overview ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">Tenants</div>
                      <div className="mt-2 text-2xl font-semibold">{ownerConsole.overview.counts?.tenants ?? 0}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">Companies</div>
                      <div className="mt-2 text-2xl font-semibold">{ownerConsole.overview.counts?.companies ?? 0}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">Users</div>
                      <div className="mt-2 text-2xl font-semibold">{ownerConsole.overview.counts?.users ?? 0}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">Owner Bridge</div>
                      <div className="mt-2 text-2xl font-semibold">{ownerConsole.overview.counts?.owner_console_tokens ?? 0}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4 space-y-3">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45">Owner notices</div>
                    <div className="space-y-2 text-sm text-white/75">
                      {(ownerConsole.overview.notices || []).map((notice, index) => (
                        <div key={index}>{notice}</div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/10 p-4 space-y-3">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">Tenant layout</div>
                      <div className="space-y-2 text-sm">
                        {(ownerConsole.overview.tenants || []).slice(0, 6).map((tenant) => (
                          <div key={tenant.tenant_id} className="flex justify-between gap-4 text-white/75">
                            <span className="font-mono">{tenant.tenant_id}</span>
                            <span>{tenant.company_count} companies / {tenant.user_count} users</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/10 p-4 space-y-3">
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">Recent companies</div>
                      <div className="space-y-2 text-sm">
                        {(ownerConsole.overview.companies || []).slice(0, 6).map((company) => (
                          <div key={company.id} className="flex justify-between gap-4 text-white/75">
                            <span>
                              {company.name}
                              {company.is_demo ? ' (Demo)' : ''}
                            </span>
                            <span className="font-mono">{company.tenant_id}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-white/75">
                  Fuer den echten System-Snapshot fehlt aktuell `OWNER_CONSOLE_CORE_TOKEN` auf der Website-Seite
                  oder der Core lehnt den Zugriff noch ab. Die Console zeigt bis dahin nur oeffentliche Policy- und Health-Daten.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">Auth Bridge</p>
                <h2 className="mt-2 text-xl font-semibold">Owner console wiring</h2>
              </div>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">core base url</span>
                  <span className="font-mono">{CORE_BASE_URL}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">website owner login</span>
                  <span className="font-mono">active</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">core owner token</span>
                  <span className="font-mono">{OWNER_CONSOLE_CORE_TOKEN ? 'configured' : 'missing'}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">bridge tokens in core</span>
                  <span className="font-mono">{ownerConsole.overview?.system?.owner_bridge?.active_count ?? 0}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">bridge env var</span>
                  <span className="font-mono">{ownerConsole.overview?.system?.owner_bridge?.env_var || 'OWNER_CONSOLE_CORE_TOKEN'}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">policy endpoint</span>
                  <span className="font-mono">/v3/auth/instance-policy</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">owner overview</span>
                  <span className="font-mono">/v3/system/owner/overview</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">rotate endpoint</span>
                  <span className="font-mono">/v3/system/owner/rotate-token</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-white/60">owner management</span>
                  <span className="font-mono">/v3/system/owner/companies + /users</span>
                </div>
                {ownerConsole.overview?.system?.owner_bridge?.latest && (
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-white/70 space-y-2">
                    <div className="text-xs uppercase tracking-[0.22em] text-white/45">Latest bridge token</div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">prefix</span>
                      <span className="font-mono">{ownerConsole.overview.system.owner_bridge.latest.key_prefix || '-'}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">created</span>
                      <span className="font-mono">{fmtDate(ownerConsole.overview.system.owner_bridge.latest.created_at)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-white/55">expires</span>
                      <span className="font-mono">{fmtDate(ownerConsole.overview.system.owner_bridge.latest.expires_at)}</span>
                    </div>
                  </div>
                )}
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-white/65">
                  Zielbild: Website-Owner-Login vorne, dedizierter Owner-Bridge-Token gegen Core hinten. Rotation
                  laeuft ueber einen eigenen Core-Endpoint statt ueber ad-hoc System-Credentials.
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">Owner Actions</p>
                <h2 className="mt-2 text-xl font-semibold">Company creation</h2>
                <p className="mt-2 text-sm text-white/60">
                  Standardmodell bleibt single-company. Weitere Companies sind bewusst Owner-Ausnahmen, z. B. fuer Demo-Kontexte.
                </p>
              </div>

              <form action={createOwnerCompanyAction} className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Company name"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm"
                  required
                />
                <input
                  type="text"
                  name="tenant_id"
                  placeholder="tenant_id optional"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-mono"
                />
                <input
                  type="text"
                  name="owner_id"
                  placeholder="owner_id optional"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-mono"
                />
                <input
                  type="url"
                  name="logo_url"
                  placeholder="logo_url optional"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm"
                />
                <textarea
                  name="description"
                  placeholder="Description optional"
                  className="min-h-[110px] rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm md:col-span-2"
                />
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm">
                  <input type="checkbox" name="is_demo" className="accent-emerald-400" />
                  Demo company markieren
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm">
                  <input type="checkbox" name="allow_exception" className="accent-amber-400" />
                  Exception explizit erlauben
                </label>
                <button
                  type="submit"
                  className="rounded-2xl border border-saimor-gold/30 bg-saimor-gold/10 px-4 py-3 text-sm text-saimor-gold hover:bg-saimor-gold/20 md:col-span-2"
                >
                  Company anlegen
                </button>
              </form>

              <div className="space-y-3">
                <div className="text-xs uppercase tracking-[0.22em] text-white/45">Managed companies</div>
                {ownerConsole.companies && ownerConsole.companies.length > 0 ? (
                  <div className="space-y-3">
                    {ownerConsole.companies.map((company) => (
                      <form
                        key={company.id}
                        action={updateOwnerCompanyAction}
                        className="rounded-2xl border border-white/10 bg-black/10 p-4 space-y-3"
                      >
                        <input type="hidden" name="company_id" value={company.id} />
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-medium text-white">
                              {company.name}
                              {company.is_demo ? ' (Demo)' : ''}
                            </div>
                            <div className="text-xs text-white/45 font-mono">{company.tenant_id}</div>
                          </div>
                          <div className="text-xs text-white/40">{fmtDate(company.created_at)}</div>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <input
                            type="text"
                            name="name"
                            defaultValue={company.name}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                          />
                          <input
                            type="text"
                            name="owner_id"
                            defaultValue={company.owner_id || ''}
                            placeholder="owner_id"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-mono"
                          />
                          <input
                            type="url"
                            name="logo_url"
                            defaultValue={company.logo_url || ''}
                            placeholder="logo_url"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm md:col-span-2"
                          />
                          <textarea
                            name="description"
                            defaultValue={company.description || ''}
                            placeholder="Description"
                            className="min-h-[84px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm md:col-span-2"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <label className="flex items-center gap-2 text-sm text-white/75">
                            <input type="checkbox" name="is_demo" defaultChecked={Boolean(company.is_demo)} className="accent-emerald-400" />
                            Demo
                          </label>
                          <button
                            type="submit"
                            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:border-saimor-gold"
                          >
                            Company speichern
                          </button>
                        </div>
                      </form>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-white/60">
                    Keine Company-Liste verfuegbar. Entweder fehlt der Core-Owner-Token oder der Core laeuft noch nicht mit den neuen Endpunkten.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">Owner Actions</p>
                <h2 className="mt-2 text-xl font-semibold">User provisioning</h2>
                <p className="mt-2 text-sm text-white/60">
                  Nutzer werden hier kontrolliert angelegt. Kein offenes Self-Service, sondern bewusstes Owner-/Admin-Provisioning.
                </p>
              </div>

              <form action={createOwnerUserAction} className="grid gap-3 md:grid-cols-2">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm"
                  required
                />
                <input
                  type="text"
                  name="full_name"
                  placeholder="full_name optional"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm"
                />
                <select name="role" defaultValue="member" className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm">
                  <option value="member">member</option>
                  <option value="manager">manager</option>
                  <option value="admin">admin</option>
                  <option value="owner">owner</option>
                  <option value="demo">demo</option>
                  <option value="system_owner">system_owner</option>
                </select>
                <input
                  type="text"
                  name="tenant_id"
                  placeholder="tenant_id or use default_company_id"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-mono"
                />
                <input
                  type="text"
                  name="default_company_id"
                  placeholder="default_company_id optional"
                  className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-mono"
                />
                <select name="is_active" defaultValue="true" className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm">
                  <option value="true">active</option>
                  <option value="false">inactive</option>
                </select>
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm">
                  <input type="checkbox" name="email_verified" className="accent-emerald-400" />
                  Email bereits verifiziert
                </label>
                <button
                  type="submit"
                  className="rounded-2xl border border-saimor-gold/30 bg-saimor-gold/10 px-4 py-3 text-sm text-saimor-gold hover:bg-saimor-gold/20 md:col-span-2"
                >
                  User anlegen
                </button>
              </form>

              <div className="space-y-3">
                <div className="text-xs uppercase tracking-[0.22em] text-white/45">Managed users</div>
                {ownerConsole.users && ownerConsole.users.length > 0 ? (
                  <div className="space-y-3">
                    {ownerConsole.users.map((user) => (
                      <form
                        key={user.id}
                        action={updateOwnerUserAction}
                        className="rounded-2xl border border-white/10 bg-black/10 p-4 space-y-3"
                      >
                        <input type="hidden" name="user_id" value={user.id} />
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-medium text-white">{user.full_name || user.email}</div>
                            <div className="text-xs text-white/45 font-mono">{user.email}</div>
                          </div>
                          <div className="text-xs text-white/40">{fmtDate(user.created_at)}</div>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <input
                            type="text"
                            name="full_name"
                            defaultValue={user.full_name || ''}
                            placeholder="full_name"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                          />
                          <input
                            type="text"
                            name="default_company_id"
                            defaultValue={user.default_company_id || ''}
                            placeholder="default_company_id"
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-mono"
                          />
                          <select name="role" defaultValue={user.role} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm">
                            <option value="member">member</option>
                            <option value="manager">manager</option>
                            <option value="admin">admin</option>
                            <option value="owner">owner</option>
                            <option value="demo">demo</option>
                            <option value="system_owner">system_owner</option>
                          </select>
                          <select
                            name="is_active"
                            defaultValue={user.is_active ? 'true' : 'false'}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                          >
                            <option value="true">active</option>
                            <option value="false">inactive</option>
                          </select>
                          <select
                            name="email_verified"
                            defaultValue={user.email_verified ? 'true' : 'false'}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                          >
                            <option value="true">email verified</option>
                            <option value="false">email not verified</option>
                          </select>
                          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/55">
                            <div className="font-mono">{user.tenant_id}</div>
                            <div>{user.default_company_name || 'No default company'}</div>
                            <div>last login: {fmtDate(user.last_login_at)}</div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:border-saimor-gold"
                        >
                          User speichern
                        </button>
                      </form>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-sm text-white/60">
                    Keine User-Liste verfuegbar. Sobald der Core-Owner-Token gesetzt ist, erscheint hier die Instanzverwaltung.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <h2 className="text-xl font-semibold">Website signal</h2>
              {websiteDataError ? (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-white/75 space-y-2">
                  <div>Website-Datenbank ist auf dieser Production-Surface aktuell nicht erreichbar.</div>
                  <div className="text-xs text-white/55 font-mono break-all">{websiteDataError}</div>
                </div>
              ) : stats ? (
                <div className="text-sm text-white/80 space-y-2">
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">facts</span>
                    <span className="font-mono">{stats.facts}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">callsToday</span>
                    <span className="font-mono">{stats.callsToday}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">costsToday</span>
                    <span className="font-mono">{stats.costsToday.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-white/60">updatedAt</span>
                    <span className="font-mono">{fmtDate(stats.updatedAt)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-sm">Keine Stats gefunden (wird automatisch erstellt, sobald APIs laufen).</p>
              )}
              <div className="text-xs text-white/50">
                Website/CRM-Daten bleiben hier getrennt von der HQ-Instanzlogik.
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <h2 className="text-xl font-semibold">Letzte Waitlist</h2>
              <div className="space-y-3 text-sm">
                {websiteDataError ? (
                  <p className="text-white/60">Website-Datenbank derzeit nicht verfuegbar.</p>
                ) : waitlist.length === 0 ? (
                  <p className="text-white/60">Noch keine Eintraege.</p>
                ) : (
                  waitlist.map((row: any) => (
                    <div key={row.id} className="rounded-2xl border border-white/10 bg-black/10 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="truncate">
                          <div className="text-white font-medium truncate">{row.name}</div>
                          <div className="text-white/60 font-mono text-xs truncate">{row.email}</div>
                        </div>
                        <div className="text-white/50 text-xs font-mono">{fmtDate(row.createdAt)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
              <h2 className="text-xl font-semibold">Letzte Kontakte</h2>
              <div className="space-y-3 text-sm">
                {websiteDataError ? (
                  <p className="text-white/60">Website-Datenbank derzeit nicht verfuegbar.</p>
                ) : contacts.length === 0 ? (
                  <p className="text-white/60">Noch keine Nachrichten.</p>
                ) : (
                  contacts.map((row: any) => (
                    <div key={row.id} className="rounded-2xl border border-white/10 bg-black/10 p-3 space-y-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="truncate">
                          <div className="text-white font-medium truncate">{row.name}</div>
                          <div className="text-white/60 font-mono text-xs truncate">{row.email}</div>
                        </div>
                        <div className="text-white/50 text-xs font-mono">{fmtDate(row.createdAt)}</div>
                      </div>
                      <div className="text-white/75 text-xs">
                        {row.message.length > 120 ? `${row.message.slice(0, 120)}...` : row.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4">
            <h2 className="text-xl font-semibold">Letzte Chat Sessions</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {websiteDataError ? (
                <p className="text-white/60">Website-Datenbank derzeit nicht verfuegbar.</p>
              ) : chatSessions.length === 0 ? (
                <p className="text-white/60">Noch keine Sessions.</p>
              ) : (
                chatSessions.map((row: any) => (
                  <Link
                    key={row.id}
                    href={`/owner/chat/${row.id}`}
                    className="group rounded-2xl border border-white/10 bg-black/10 p-4 space-y-1 hover:border-saimor-gold hover:bg-white/5 transition-all block"
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-xs text-white/50 uppercase tracking-[0.22em] group-hover:text-saimor-gold transition-colors">
                        externalId
                      </div>
                      <div className="text-[10px] text-white/30 font-mono">DETAIL -&gt;</div>
                    </div>
                    <div className="font-mono text-sm text-white truncate">{row.externalId}</div>
                    <div className="text-xs text-white/60">lastActivity: {fmtDate(row.lastActivity)}</div>
                    <div className="text-xs text-white/60">userId: {row.userId || '-'}</div>
                  </Link>
                ))
              )}
            </div>
          </section>
      </div>
    </main>
  );
}
