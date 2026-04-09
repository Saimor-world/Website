import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { fetchCoreJson, fetchCoreOwnerJson } from '@/lib/core-owner';

export const dynamic = 'force-dynamic';

type CoreHealth = {
  status?: string;
  environment?: string;
  timestamp?: string;
  build?: {
    sha?: string;
    commit?: string;
    version?: string;
  };
};

type ProviderMeta = {
  healthy?: boolean;
  available?: boolean;
  priority?: number;
  error?: string;
};

type OwnerRuntime = {
  assistant?: {
    status?: string;
    recommended_provider?: string | null;
    routing_profile?: string | null;
    providers?: Record<string, ProviderMeta>;
  };
  mail?: {
    configured?: boolean;
    enabled?: boolean;
    provider?: string;
    email?: string;
    status?: string;
    error?: string;
  };
  calendar?: {
    configured?: boolean;
    provider?: string;
    email?: string;
    calendar_id?: string;
    status?: string;
    error?: string;
  };
  runtime?: {
    local_truth?: {
      preferred_provider?: string;
      configured_model?: string;
      recommended_model?: string;
      ollama_api_url?: string;
      startup_script?: string;
      startup_command?: string;
      routing_profile?: string;
      available?: boolean;
    };
    cloud_mirror?: {
      recommended_provider?: string | null;
      routing_profile?: string | null;
      gemini_model?: string;
      anthropic_model?: string;
      openai_model?: string;
    };
    surfaces?: {
      local_truth?: string;
      demo_mirror?: string;
      owner_console?: string;
      operations_console?: string;
    };
  };
  capabilities?: {
    real_email_enabled?: boolean;
    mail_local_mode?: boolean;
    calendar_oauth_enabled?: boolean;
    owner_console_enabled?: boolean;
    assistant_available?: boolean;
  };
};

function Badge({ label, tone = 'neutral' }: { label: string; tone?: 'neutral' | 'emerald' | 'cyan' | 'amber' }) {
  const toneClass =
    tone === 'emerald'
      ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100'
      : tone === 'cyan'
        ? 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100'
        : tone === 'amber'
          ? 'border-amber-400/20 bg-amber-500/10 text-amber-100'
          : 'border-white/10 bg-white/[0.04] text-white/70';

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] ${toneClass}`}>
      {label}
    </span>
  );
}

function IntegrationBadge({ configured, label }: { configured?: boolean; label: string }) {
  return <Badge label={label} tone={configured ? 'emerald' : 'neutral'} />;
}

export default async function SystemsControlPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/owner/login?callbackUrl=/systems/control');
  }

  if (session.user.role !== 'owner') {
    redirect('/owner/login?callbackUrl=/systems/control');
  }

  const [health, runtime] = await Promise.all([
    fetchCoreJson<CoreHealth>('/v3/health?raw=true'),
    fetchCoreOwnerJson<OwnerRuntime>('/v3/system/owner/runtime?raw=true'),
  ]);

  const providerEntries = Object.entries(runtime?.assistant?.providers || {}).sort(
    (a, b) => (a[1].priority || 99) - (b[1].priority || 99),
  );

  return (
    <main className="min-h-screen bg-[#06110d] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge label="Operations Control" tone="cyan" />
              <Badge label="Local Truth" tone="emerald" />
              <Badge label="Demo Mirror" tone="amber" />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Betrieb, Integrationen und Runtime
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">
              Diese Flaeche ist bewusst getrennt von der Owner-Konsole. Hier geht es nicht um globale Instanzverwaltung,
              sondern um operative Laufzeit, lokale Wahrheit, Demo-Spiegel und die naechste Stufe echter Verbindungen.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/owner" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.08]">
              Owner Console
            </Link>
            <a href="https://hq.saimor.world/home" target="_blank" rel="noreferrer" className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/15">
              HQ Demo oeffnen
            </a>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-4">
              <p className="text-[10px] uppercase tracking-[0.26em] text-white/35">Local Truth Runtime</p>
              <h2 className="mt-2 text-xl font-medium text-white">Gemma / Ollama als Wahrheitsmodus</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Lokal arbeitet SAIMOR mit echten Regeln, echten Konten und echten Integrationen. HQ bleibt derselbe Look,
                aber als kontrollierter Demo-Spiegel.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr]">
              <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/[0.05] p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-white">Lokaler Startpfad</div>
                    <div className="mt-1 text-xs text-white/45">
                      {runtime?.runtime?.local_truth?.preferred_provider || 'ollama'} · {runtime?.runtime?.local_truth?.routing_profile || 'privacy'}
                    </div>
                  </div>
                  <Badge label={runtime?.runtime?.local_truth?.available ? 'bereit' : 'vorbereitet'} tone={runtime?.runtime?.local_truth?.available ? 'cyan' : 'neutral'} />
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-[12px] text-cyan-100/90">
                  {runtime?.runtime?.local_truth?.startup_command || 'cd C:\\saimor\\saimor-core; $env:OLLAMA_MODEL="gemma4:e2b"; .\\scripts\\Start-Core-Gemma.ps1'}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-black/20 px-3 py-3 text-xs text-white/55">
                    Empfohlenes Modell: <span className="text-white/85">{runtime?.runtime?.local_truth?.recommended_model || 'gemma4:e2b'}</span>
                  </div>
                  <div className="rounded-xl bg-black/20 px-3 py-3 text-xs text-white/55">
                    Konfiguriert: <span className="text-white/85">{runtime?.runtime?.local_truth?.configured_model || 'unbekannt'}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-[10px] uppercase tracking-[0.24em] text-white/35">Surfaces</div>
                <div className="mt-4 space-y-3 text-sm text-white/70">
                  <div>
                    <div className="text-white">Local Truth</div>
                    <div className="text-xs text-white/45">{runtime?.runtime?.surfaces?.local_truth || 'http://127.0.0.1:3000'}</div>
                  </div>
                  <div>
                    <div className="text-white">Demo Mirror</div>
                    <div className="text-xs text-white/45">{runtime?.runtime?.surfaces?.demo_mirror || 'https://hq.saimor.world'}</div>
                  </div>
                  <div>
                    <div className="text-white">Owner Console</div>
                    <div className="text-xs text-white/45">{runtime?.runtime?.surfaces?.owner_console || 'https://owner.saimor.world/login'}</div>
                  </div>
                  <div>
                    <div className="text-white">Operations Control</div>
                    <div className="text-xs text-white/45">{runtime?.runtime?.surfaces?.operations_console || 'https://www.saimor.world/systems/control'}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/35">Live Core</p>
            <h2 className="mt-2 text-xl font-medium text-white">Serverzustand</h2>
            <div className="mt-4 space-y-3 text-sm text-white/65">
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Status: <span className="text-white/85">{health?.status || 'unbekannt'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Umgebung: <span className="text-white/85">{health?.environment || 'unbekannt'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Build: <span className="text-white/85">{health?.build?.sha || health?.build?.commit || '-'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Timestamp: <span className="text-white/85">{health?.timestamp || '-'}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/35">Provider & Routing</p>
            <h2 className="mt-2 text-xl font-medium text-white">Assistant-Betrieb</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-black/20 px-4 py-3 text-sm text-white/60">
                Routing-Profil: <span className="text-white/85">{runtime?.assistant?.routing_profile || 'unbekannt'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3 text-sm text-white/60">
                Empfehlung: <span className="text-white/85">{runtime?.assistant?.recommended_provider || 'automatisch'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3 text-sm text-white/60">
                Assistant: <span className="text-white/85">{runtime?.capabilities?.assistant_available ? 'verfuegbar' : 'nicht verfuegbar'}</span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {providerEntries.length > 0 ? providerEntries.map(([provider, meta]) => (
                <div key={provider} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-white">{provider}</div>
                      <div className="mt-1 text-xs text-white/45">Prioritaet {meta.priority ?? '-'}</div>
                    </div>
                    <Badge label={meta.healthy ? 'gesund' : meta.available ? 'konfiguriert' : 'inaktiv'} tone={meta.healthy ? 'emerald' : meta.available ? 'amber' : 'neutral'} />
                  </div>
                  {meta.error ? <div className="mt-3 text-xs text-red-200/80">Fehler: {meta.error}</div> : null}
                </div>
              )) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/50">
                  Keine Provider-Daten verfuegbar.
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[10px] uppercase tracking-[0.26em] text-white/35">Integrationen</p>
            <h2 className="mt-2 text-xl font-medium text-white">Mail, Kalender und Browser</h2>
            <div className="mt-4 space-y-3 text-sm text-white/65">
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Mail-Modus: <span className="text-white/85">{runtime?.capabilities?.mail_local_mode ? 'lokal / intern' : 'extern / synchronisiert'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Kalender-OAuth: <span className="text-white/85">{runtime?.capabilities?.calendar_oauth_enabled ? 'aktivierbar' : 'noch nicht aktiviert'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Owner Console: <span className="text-white/85">{runtime?.capabilities?.owner_console_enabled ? 'aktiv' : 'deaktiviert'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Postfach: <span className="text-white/85">{runtime?.mail?.configured ? (runtime.mail.email || runtime.mail.provider || 'verbunden') : 'nicht verbunden'}</span>
              </div>
              <div className="rounded-2xl bg-black/20 px-4 py-3">
                Kalender: <span className="text-white/85">{runtime?.calendar?.configured ? (runtime.calendar.email || runtime.calendar.provider || 'verbunden') : 'nicht verbunden'}</span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <IntegrationBadge configured={runtime?.mail?.configured} label={runtime?.mail?.status || 'mail'} />
              <IntegrationBadge configured={runtime?.calendar?.configured} label={runtime?.calendar?.status || 'calendar'} />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="https://hq.saimor.world/home" target="_blank" rel="noreferrer" className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-500/15">
                HQ Integrationen pruefen
              </a>
              <a href="https://owner.saimor.world/login" target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.08]">
                Owner Login
              </a>
              <a href="http://127.0.0.1:3000" target="_blank" rel="noreferrer" className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/15">
                Local Truth oeffnen
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
