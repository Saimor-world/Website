'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowRight, CheckCircle2, Loader2, Shield, Sparkles, Zap, User } from 'lucide-react';
import type { EntryActionKind, EntryLocale } from '@/lib/entry-content';

type Props = {
  kind: EntryActionKind;
  locale: EntryLocale;
};

type SecurityResult = {
  id?: string | null;
  score: number;
  level: 'high' | 'medium' | 'low';
  levelLabel: string;
  analysis: string;
  recommendations: Array<{ title: string; text: string; priority: 'high' | 'medium' | 'low' }>;
  recon: {
    domain: string;
    ip: string | null;
    ssl: { valid: boolean; issuer: string | null; validTo: string | null; protocol: string | null } | null;
    headers: { hsts: boolean; csp: boolean; xFrameOptions: boolean };
    subdomains: string[];
  } | null;
};

type DigitalBlueprint = {
  focus: string;
  automations: string[];
  guardrails: string[];
  roadmap: string[];
  aiInsight?: {
    personaDescription?: string;
    efficiencyPotential?: string | number;
    topAutomation?: string;
    strategicAdvice?: string;
  } | null;
};

export default function EntryActionPanel({ kind, locale }: Props) {
  if (kind === 'security-check-form') return <SecurityCheckInline locale={locale} />;
  if (kind === 'digital-self-form') return <DigitalSelfInline locale={locale} />;
  return <DemoTrackInline locale={locale} />;
}

function SecurityCheckInline({ locale }: { locale: EntryLocale }) {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: '',
    email: '',
    industry: '',
    companySize: '',
    targetDomain: '',
    backups: 'unsicher' as 'unsicher' | 'ok' | 'redundant',
    mfa: 'keins' as 'keins' | 'teilweise' | 'voll',
    updates: 'unklar' as 'unklar' | 'regelmaessig' | 'automatisiert',
    training: 'nein' as 'nein' | 'gelegentlich' | 'zertifiziert',
  });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<SecurityResult | null>(null);
  const [emailed, setEmailed] = useState(false);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [magicState, setMagicState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const t = {
    de: {
      title: 'Security-Audit direkt starten',
      subtitle: 'Echter Domain-Recon + Audit-Scoring. Sofort-Report statt Mock.',
      submit: 'Audit ausfuehren',
      success: 'Audit erfolgreich abgeschlossen.',
      error: 'Audit konnte nicht fertiggestellt werden.',
      score: 'Resilienz-Score',
      level: 'Risiko-Level',
      analysis: 'Analyse',
      rec: 'Priorisierte Massnahmen',
      emailed: 'Detaillierter Report wurde per Mail versendet.',
      notEmailed: 'Ergebnis registriert (Mailversand inaktiv).',
    },
    en: {
      title: 'Start Security Audit now',
      subtitle: 'Real domain recon + audit scoring. Instant report, no mock.',
      submit: 'Run Audit',
      success: 'Audit successfully completed.',
      error: 'Audit could not be completed.',
      score: 'Resilience Score',
      level: 'Risk Level',
      analysis: 'Analysis',
      rec: 'Prioritized Actions',
      emailed: 'Detailed report was sent by email.',
      notEmailed: 'Result registered (Email delivery inactive).',
    },
  }[locale];

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState('loading');
    setResult(null);
    try {
      const response = await fetch('/api/security-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          industry: form.industry,
          companySize: form.companySize,
          targetDomain: form.targetDomain,
          locale,
          answers: {
            backups: form.backups,
            mfa: form.mfa,
            updates: form.updates,
            training: form.training,
          },
        }),
      });
      if (!response.ok) {
        setState('error');
        return;
      }
      const data = await response.json();
      setResult(data.result);
      setEmailed(!!data.emailed);
      setAuditId(data.result?.id || null);
      setState('success');
    } catch {
      setState('error');
    }
  };

  const sendMagicLink = async () => {
    if (!form.email || !auditId) return;
    setMagicState('loading');
    try {
      const callbackUrl = `/account/bridge?claimType=audit&claimId=${auditId}&next=/account/dashboard/audit/${auditId}`;
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          callbackUrl,
          locale,
        }),
      });
      if (!response.ok) {
        setMagicState('error');
        return;
      }
      const payload = await response.json().catch(() => ({} as any));
      if (payload?.debugUrl) {
        window.location.href = payload.debugUrl;
        return;
      }
      setMagicState('sent');
    } catch {
      setMagicState('error');
    }
  };

  return (
    <section className="rounded-[1.8rem] border border-emerald-500/35 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-7 sm:p-8 space-y-5">
      <header className="space-y-2">
        <h3 className="text-3xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{t.title}</h3>
        <p className="text-white/70">{t.subtitle}</p>
      </header>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        <input required value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="Name" className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white" />
        <input type="email" required value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} placeholder="Email" className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white" />
        <input value={form.industry} onChange={(e) => setForm((v) => ({ ...v, industry: e.target.value }))} placeholder={locale === 'de' ? 'Branche (optional)' : 'Industry (optional)'} className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white" />
        <select value={form.companySize} onChange={(e) => setForm((v) => ({ ...v, companySize: e.target.value }))} className="rounded-xl bg-[#0d1b16] border border-white/15 px-4 py-3 text-white">
          <option value="">{locale === 'de' ? 'Unternehmensgroesse' : 'Company size'}</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-250">51-250</option>
          <option value="250+">250+</option>
        </select>
        <input value={form.targetDomain} onChange={(e) => setForm((v) => ({ ...v, targetDomain: e.target.value }))} placeholder={locale === 'de' ? 'Ziel-Domain (z.B. firma.de)' : 'Target domain (e.g. company.com)'} className="md:col-span-2 rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white" />

        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          <select value={form.backups} onChange={(e) => setForm((v) => ({ ...v, backups: e.target.value as any }))} className="rounded-xl bg-[#0d1b16] border border-white/15 px-4 py-3 text-white">
            <option value="unsicher">{locale === 'de' ? 'Backups: unklar' : 'Backups: unclear'}</option>
            <option value="ok">{locale === 'de' ? 'Backups: regelmaessig' : 'Backups: regular'}</option>
            <option value="redundant">{locale === 'de' ? 'Backups: redundant/offsite' : 'Backups: redundant/offsite'}</option>
          </select>
          <select value={form.mfa} onChange={(e) => setForm((v) => ({ ...v, mfa: e.target.value as any }))} className="rounded-xl bg-[#0d1b16] border border-white/15 px-4 py-3 text-white">
            <option value="keins">{locale === 'de' ? 'MFA: keins' : 'MFA: none'}</option>
            <option value="teilweise">{locale === 'de' ? 'MFA: teilweise' : 'MFA: partial'}</option>
            <option value="voll">{locale === 'de' ? 'MFA: voll' : 'MFA: full'}</option>
          </select>
          <select value={form.updates} onChange={(e) => setForm((v) => ({ ...v, updates: e.target.value as any }))} className="rounded-xl bg-[#0d1b16] border border-white/15 px-4 py-3 text-white">
            <option value="unklar">{locale === 'de' ? 'Updates: unklar' : 'Updates: unclear'}</option>
            <option value="regelmaessig">{locale === 'de' ? 'Updates: regelmaessig' : 'Updates: regular'}</option>
            <option value="automatisiert">{locale === 'de' ? 'Updates: automatisiert' : 'Updates: automated'}</option>
          </select>
          <select value={form.training} onChange={(e) => setForm((v) => ({ ...v, training: e.target.value as any }))} className="rounded-xl bg-[#0d1b16] border border-white/15 px-4 py-3 text-white">
            <option value="nein">{locale === 'de' ? 'Training: nein' : 'Training: none'}</option>
            <option value="gelegentlich">{locale === 'de' ? 'Training: gelegentlich' : 'Training: occasional'}</option>
            <option value="zertifiziert">{locale === 'de' ? 'Training: zertifiziert' : 'Training: certified'}</option>
          </select>
        </div>

        <button type="submit" disabled={state === 'loading'} className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#0c1613] font-bold px-5 py-4 hover:bg-emerald-300 transition-colors disabled:opacity-60">
          {state === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
          <span>{t.submit}</span>
        </button>
      </form>

      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm">
        <User className="w-4 h-4 text-white/40" />
        {session ? (
          <p className="text-white/60">{locale === 'de' ? `Eingeloggt als ${session.user?.email}. Ergebnis wird gespeichert.` : `Logged in as ${session.user?.email}. Result will be saved.`}</p>
        ) : (
          <p className="text-white/40">{locale === 'de' ? 'Nicht eingeloggt. Ergebnis wird nur angezeigt. ' : 'Not logged in. Result is shown only. '}<Link href="/login" className="text-emerald-400 hover:underline">{locale === 'de' ? 'Jetzt anmelden' : 'Login now'}</Link></p>
        )}
      </div>

      {state === 'error' ? <p className="text-red-300">{t.error}</p> : null}

      {state === 'success' && result ? (
        <div className="rounded-2xl border border-white/15 bg-black/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
            <p className="text-lg font-medium">{t.success}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{t.score}</p>
              <p className={`text-4xl font-bold mt-2 ${result.score > 70 ? 'text-emerald-400' : result.score > 40 ? 'text-amber-400' : 'text-red-400'}`}>{result.score}/100</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">{t.level}</p>
              <p className="text-4xl text-white font-bold mt-2">{result.levelLabel}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-emerald-500/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/60 mb-3">{t.analysis}</p>
            <p className="text-white/90 leading-relaxed italic">"{result.analysis}"</p>
          </div>
          {result.recon ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Recon</p>
              <p className="text-sm text-white/75">Domain: {result.recon.domain}</p>
              <p className="text-sm text-white/75">IP: {result.recon.ip || 'n/a'}</p>
              <p className="text-sm text-white/75">TLS: {result.recon.ssl?.protocol || 'n/a'} ({result.recon.ssl?.valid ? 'valid' : 'invalid'})</p>
              <p className="text-sm text-white/75">Headers: HSTS={String(result.recon.headers.hsts)} / CSP={String(result.recon.headers.csp)} / XFO={String(result.recon.headers.xFrameOptions)}</p>
            </div>
          ) : null}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">{t.rec}</p>
            <div className="grid gap-3">
              {result.recommendations.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <div>
                    <p className="text-white font-semibold text-sm uppercase tracking-wide">{item.title}</p>
                    <p className="text-white/70 text-sm mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">{emailed ? t.emailed : t.notEmailed}</p>
            {session ? (
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={auditId ? `/account/dashboard/audit/${auditId}` : '/account/dashboard'}
                  className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-2"
                >
                  <span>{locale === 'de' ? 'Report im Dashboard' : 'Open report in dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {auditId ? (
                  <Link
                    href={`/account/dashboard/audit/${auditId}?print=true`}
                    className="text-cyan-300 font-bold hover:underline inline-flex items-center gap-2"
                  >
                    <span>{locale === 'de' ? 'Direkt als PDF' : 'Open PDF now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : null}
              </div>
            ) : auditId ? (
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/account/bridge?claimType=audit&claimId=${auditId}&next=/account/dashboard/audit/${auditId}`)}`}
                  className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-2"
                >
                  <span>{locale === 'de' ? 'Einloggen und Report speichern' : 'Login to save report'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/account/bridge?claimType=audit&claimId=${auditId}&next=/account/dashboard/audit/${auditId}?print=true`)}`}
                  className="text-cyan-300 font-bold hover:underline inline-flex items-center gap-2"
                >
                  <span>{locale === 'de' ? 'Einloggen und direkt PDF' : 'Login and open PDF'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={sendMagicLink}
                  disabled={magicState === 'loading' || magicState === 'sent'}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/50 bg-emerald-300/10 px-4 py-2 text-emerald-200 font-bold hover:bg-emerald-300/20 transition-colors disabled:opacity-60"
                >
                  <span>
                    {magicState === 'loading'
                      ? locale === 'de'
                        ? 'Sende Link...'
                        : 'Sending link...'
                      : locale === 'de'
                        ? '1-Click Magic Link senden'
                        : 'Send 1-click magic link'}
                  </span>
                </button>
              </div>
            ) : (
              <a href="https://cal.com/saimor/30min" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-2">
                <span>{locale === 'de' ? 'Audit-Gespraech buchen' : 'Book Audit Call'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
          {!session && auditId && magicState === 'sent' ? (
            <p className="text-sm text-emerald-300">
              {locale === 'de'
                ? 'Magic Link wurde gesendet. Nach Klick wird dein Report automatisch geclaimed.'
                : 'Magic link sent. After clicking it, your report will be claimed automatically.'}
            </p>
          ) : null}
          {!session && auditId && magicState === 'error' ? (
            <p className="text-sm text-red-300">
              {locale === 'de'
                ? 'Magic Link konnte nicht gesendet werden (SMTP oder Limit).'
                : 'Could not send magic link (SMTP or rate limit).'}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function DigitalSelfInline({ locale }: { locale: EntryLocale }) {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: '',
    email: '',
    goal: 'struktur' as 'struktur' | 'kommunikation' | 'priorisierung' | 'automatisierung',
    painPoints: '',
    techStack: '',
  });
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [blueprint, setBlueprint] = useState<DigitalBlueprint | null>(null);
  const [blueprintId, setBlueprintId] = useState<string | null>(null);
  const [emailed, setEmailed] = useState(false);
  const [magicState, setMagicState] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const t = {
    de: {
      title: 'Digital AI Self implementieren',
      subtitle: 'Individueller Blueprint aus Ziel, Pain Points und Toolstack.',
      submit: 'Blueprint erstellen',
      success: 'Blueprint erfolgreich generiert.',
      error: 'Erstellung fehlgeschlagen.',
      focus: 'Strategischer Fokus',
      automations: 'Kern-Automationen',
      guardrails: 'Sicherheits-Leitplanken',
      roadmap: '4-Wochen Implementierung',
    },
    en: {
      title: 'Implement Digital AI Self',
      subtitle: 'Custom blueprint from your goals, pain points and tool stack.',
      submit: 'Generate Blueprint',
      success: 'Blueprint successfully generated.',
      error: 'Generation failed.',
      focus: 'Strategic Focus',
      automations: 'Core Automations',
      guardrails: 'Safety Guardrails',
      roadmap: '4-Week Implementation',
    },
  }[locale];

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState('loading');
    setBlueprint(null);
    try {
      const response = await fetch('/api/digital-self', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          goal: form.goal,
          painPoints: form.painPoints,
          techStack: form.techStack,
          locale,
        }),
      });
      if (!response.ok) {
        setState('error');
        return;
      }
      const data = await response.json();
      setBlueprint(data.blueprint);
      setBlueprintId(data.id || null);
      setEmailed(!!data.emailed);
      setState('success');
    } catch {
      setState('error');
    }
  };

  const sendMagicLink = async () => {
    if (!form.email || !blueprintId) return;
    setMagicState('loading');
    try {
      const callbackUrl = `/account/bridge?claimType=blueprint&claimId=${blueprintId}&next=/account/dashboard/blueprint/${blueprintId}`;
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          callbackUrl,
          locale,
        }),
      });
      if (!response.ok) {
        setMagicState('error');
        return;
      }
      const payload = await response.json().catch(() => ({} as any));
      if (payload?.debugUrl) {
        window.location.href = payload.debugUrl;
        return;
      }
      setMagicState('sent');
    } catch {
      setMagicState('error');
    }
  };

  return (
    <section className="rounded-[1.8rem] border border-cyan-500/35 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 p-7 sm:p-8 space-y-5">
      <header className="space-y-2">
        <h3 className="text-3xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{t.title}</h3>
        <p className="text-white/70">{t.subtitle}</p>
      </header>

      <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
        <input required value={form.name} onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))} placeholder="Name" className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white" />
        <input type="email" required value={form.email} onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))} placeholder="Email" className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white" />
        <select value={form.goal} onChange={(e) => setForm((v) => ({ ...v, goal: e.target.value as any }))} className="rounded-xl bg-[#0d1b16] border border-white/15 px-4 py-3 text-white md:col-span-2">
          <option value="struktur">{locale === 'de' ? 'Ziel: Struktur & Mental Load' : 'Goal: Structure & Mental Load'}</option>
          <option value="kommunikation">{locale === 'de' ? 'Ziel: Skalierbare Kommunikation' : 'Goal: Scalable Communication'}</option>
          <option value="priorisierung">{locale === 'de' ? 'Ziel: Strategische Priorisierung' : 'Goal: Strategic Prioritization'}</option>
          <option value="automatisierung">{locale === 'de' ? 'Ziel: Workflow-Automatisierung' : 'Goal: Workflow Automation'}</option>
        </select>
        <textarea value={form.painPoints} onChange={(e) => setForm((v) => ({ ...v, painPoints: e.target.value }))} placeholder={locale === 'de' ? 'Groesste Pain Points...' : 'Biggest pain points...'} className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white md:col-span-2 min-h-[100px]" />
        <input value={form.techStack} onChange={(e) => setForm((v) => ({ ...v, techStack: e.target.value }))} placeholder={locale === 'de' ? 'Toolstack (Slack, M365, Notion...)' : 'Tool stack (Slack, M365, Notion...)'} className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white md:col-span-2" />
        <button type="submit" disabled={state === 'loading'} className="md:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-[#0c1613] font-bold px-5 py-4 hover:bg-cyan-300 transition-colors disabled:opacity-60">
          {state === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          <span>{t.submit}</span>
        </button>
      </form>

      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm">
        <User className="w-4 h-4 text-white/40" />
        {session ? (
          <p className="text-white/60">{locale === 'de' ? `Eingeloggt als ${session.user?.email}. Blueprint wird gespeichert.` : `Logged in as ${session.user?.email}. Blueprint will be saved.`}</p>
        ) : (
          <p className="text-white/40">{locale === 'de' ? 'Nicht eingeloggt. Ergebnis wird nur angezeigt. ' : 'Not logged in. Result is shown only. '}<Link href="/login" className="text-emerald-400 hover:underline">{locale === 'de' ? 'Jetzt anmelden' : 'Login now'}</Link></p>
        )}
      </div>

      {state === 'error' ? <p className="text-red-300">{t.error}</p> : null}

      {state === 'success' && blueprint ? (
        <div className="rounded-2xl border border-white/15 bg-black/40 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 text-cyan-400">
            <CheckCircle2 className="w-6 h-6" />
            <p className="text-lg font-medium">{t.success}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-cyan-500/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/60 mb-2">{t.focus}</p>
            <p className="text-xl text-white font-medium">{blueprint.focus}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-3">{t.automations}</p>
              <ul className="space-y-2 text-white/80 text-sm">
                {blueprint.automations.map((item) => (
                  <li key={item} className="flex gap-2"><Zap className="w-4 h-4 text-cyan-400 shrink-0" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-3">{t.guardrails}</p>
              <ul className="space-y-2 text-white/80 text-sm">
                {blueprint.guardrails.map((item) => (
                  <li key={item} className="flex gap-2"><Shield className="w-4 h-4 text-emerald-400 shrink-0" /><span>{item}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-4">{t.roadmap}</p>
            <div className="space-y-3">
              {blueprint.roadmap.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold">{idx + 1}</div>
                  <p className="text-white/80 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
          {blueprint.aiInsight?.efficiencyPotential ? (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-400/60 mb-2">AI Insight</p>
              <p className="text-white/80">Efficiency Potential: {blueprint.aiInsight.efficiencyPotential}%</p>
              {blueprint.aiInsight.topAutomation ? <p className="text-white/70 mt-1">Top Automation: {blueprint.aiInsight.topAutomation}</p> : null}
            </div>
          ) : null}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              {emailed
                ? (locale === 'de' ? 'Blueprint wurde per Mail versendet.' : 'Blueprint was sent by email.')
                : (locale === 'de' ? 'Blueprint registriert (Mailversand inaktiv).' : 'Blueprint registered (email delivery inactive).')}
            </p>
            {session ? (
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={blueprintId ? `/account/dashboard/blueprint/${blueprintId}` : '/account/dashboard'}
                  className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-2"
                >
                  <span>{locale === 'de' ? 'Blueprint im Dashboard' : 'Open blueprint in dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {blueprintId ? (
                  <Link
                    href={`/account/dashboard/blueprint/${blueprintId}?print=true`}
                    className="text-emerald-300 font-bold hover:underline inline-flex items-center gap-2"
                  >
                    <span>{locale === 'de' ? 'Direkt als PDF' : 'Open PDF now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : null}
              </div>
            ) : blueprintId ? (
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/account/bridge?claimType=blueprint&claimId=${blueprintId}&next=/account/dashboard/blueprint/${blueprintId}`)}`}
                  className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-2"
                >
                  <span>{locale === 'de' ? 'Einloggen und Blueprint speichern' : 'Login to save blueprint'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(`/account/bridge?claimType=blueprint&claimId=${blueprintId}&next=/account/dashboard/blueprint/${blueprintId}?print=true`)}`}
                  className="text-emerald-300 font-bold hover:underline inline-flex items-center gap-2"
                >
                  <span>{locale === 'de' ? 'Einloggen und direkt PDF' : 'Login and open PDF'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={sendMagicLink}
                  disabled={magicState === 'loading' || magicState === 'sent'}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/50 bg-emerald-300/10 px-4 py-2 text-emerald-200 font-bold hover:bg-emerald-300/20 transition-colors disabled:opacity-60"
                >
                  <span>
                    {magicState === 'loading'
                      ? locale === 'de'
                        ? 'Sende Link...'
                        : 'Sending link...'
                      : locale === 'de'
                        ? '1-Click Magic Link senden'
                        : 'Send 1-click magic link'}
                  </span>
                </button>
              </div>
            ) : null}
          </div>
          {!session && blueprintId && magicState === 'sent' ? (
            <p className="text-sm text-emerald-300">
              {locale === 'de'
                ? 'Magic Link wurde gesendet. Nach Klick wird dein Blueprint automatisch geclaimed.'
                : 'Magic link sent. After clicking it, your blueprint will be claimed automatically.'}
            </p>
          ) : null}
          {!session && blueprintId && magicState === 'error' ? (
            <p className="text-sm text-red-300">
              {locale === 'de'
                ? 'Magic Link konnte nicht gesendet werden (SMTP oder Limit).'
                : 'Could not send magic link (SMTP or rate limit).'}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function DemoTrackInline({ locale }: { locale: EntryLocale }) {
  const links = [
    { label: locale === 'de' ? 'Security Softwarepfad' : 'Security software track', href: '/demo?track=security' },
    { label: locale === 'de' ? 'Digital Self Softwarepfad' : 'Digital Self software track', href: '/demo?track=digital-self' },
    { label: locale === 'de' ? 'AI Business Softwarepfad' : 'AI Business software track', href: '/demo?track=ai-business' },
  ];

  return (
    <section className="rounded-[1.8rem] border border-amber-500/35 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 p-7 sm:p-8 space-y-4">
      <h3 className="text-3xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        {locale === 'de' ? 'Direkt in die Softwareansicht' : 'Jump directly into software view'}
      </h3>
      <p className="text-white/70">
        {locale === 'de' ? 'Waehle den passenden Track. Die Demo zeigt den entsprechenden Einstiegspfad.' : 'Pick a track. The demo opens the matching entry path.'}
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors">
            <span>{item.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ))}
      </div>
    </section>
  );
}
