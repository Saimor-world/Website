import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { buildOsSsoUrl } from '@/lib/os-links';
import { ArrowRight, ShieldCheck, PlayCircle, LogIn, Sparkles, Network, LayoutDashboard, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Portal – Dein Arbeitsbereich',
  description:
    'Eine Tür in deinen SAIMÔR-Arbeitsbereich: Môra, Analysen und Dashboards im echten OS. Ehrlich, EU-gehostet, ohne zweiten Login.',
};

type Locale = 'de' | 'en';

const T = {
  de: {
    eyebrow: 'Portal',
    title: 'Dein Arbeitsbereich',
    lead: 'Ein Ort für deine Daten, deine Analysen und dein Môra – im echten OS. Kein zweites Dashboard, keine Attrappe.',
    backTitle: (name: string) => `Willkommen zurück, ${name}.`,
    backLead: 'Dein Arbeitsbereich ist bereit. Du wirst ohne zweiten Login direkt ins OS geführt.',
    enterOs: 'In deinen Arbeitsbereich',
    accountDash: 'Website-Übersicht (Audits & Reports)',
    ownerDash: 'Kommandozentrale öffnen',
    doorsTitle: 'So kommst du rein',
    doorsLead: 'Drei ehrliche Wege – keiner davon ist eine Sackgasse.',
    doors: [
      {
        icon: 'shield',
        tag: 'Empfohlen',
        title: 'Security-Check',
        body: 'In wenigen Minuten eine echte Analyse deiner Domain. Daraus entsteht automatisch ein Preview-Arbeitsbereich – den du später zum Account machen kannst.',
        cta: 'Check starten',
        href: '/de/einstieg/security-check',
      },
      {
        icon: 'play',
        tag: 'Ohne Anmeldung',
        title: 'Live-Demo',
        body: 'Das Mora Lab direkt ausprobieren – ohne Konto, ohne Verpflichtung. Sieh, wie Signale zu Klarheit werden.',
        cta: 'Demo ansehen',
        href: '/demo',
      },
      {
        icon: 'login',
        tag: 'Du hast schon Zugang',
        title: 'Anmelden',
        body: 'Melde dich an und wir bringen dich nahtlos in deinen echten Arbeitsbereich im OS.',
        cta: 'Anmelden',
        href: '/login?callbackUrl=/portal',
      },
    ],
    insideTitle: 'Was dich im Arbeitsbereich erwartet',
    insideLead: 'Das echte OS – nichts Erfundenes. Wir befinden uns in aktivem Aufbau (Early Access).',
    inside: [
      { icon: 'spark', title: 'Môra', body: 'Die semantische Ebene: erkennt Zusammenhänge in deinen Daten, statt sie nur zu speichern.' },
      { icon: 'net', title: 'Kontext-Netz', body: 'Dokumente, Analysen und Signale werden vernetzt – im Finder navigierbar.' },
      { icon: 'dash', title: 'Dashboards', body: 'Deine Lage auf einen Blick: Befunde aus dem Check, Status, nächste Schritte.' },
      { icon: 'lock', title: 'Souverän', body: 'EU-gehostet (Hetzner, DE), DSGVO by Design, keine Werbe-Tracker.' },
    ],
    trust: 'EU-gehostet · DSGVO-konform · Öffentliche Demo und echtes HQ sind technisch getrennt.',
    switch: 'English',
  },
  en: {
    eyebrow: 'Portal',
    title: 'Your workspace',
    lead: 'One place for your data, your analyses and your Môra – inside the real OS. No second dashboard, no mock-up.',
    backTitle: (name: string) => `Welcome back, ${name}.`,
    backLead: 'Your workspace is ready. You are taken straight into the OS – no second login.',
    enterOs: 'Enter your workspace',
    accountDash: 'Website overview (audits & reports)',
    ownerDash: 'Open command center',
    doorsTitle: 'How to get in',
    doorsLead: 'Three honest paths – none of them a dead end.',
    doors: [
      {
        icon: 'shield',
        tag: 'Recommended',
        title: 'Security Check',
        body: 'A real analysis of your domain in minutes. It automatically creates a preview workspace – which you can later turn into an account.',
        cta: 'Start the check',
        href: '/en/entry/security-check',
      },
      {
        icon: 'play',
        tag: 'No sign-up',
        title: 'Live demo',
        body: 'Try the Mora Lab right away – no account, no commitment. See how signals turn into clarity.',
        cta: 'View demo',
        href: '/demo',
      },
      {
        icon: 'login',
        tag: 'You already have access',
        title: 'Sign in',
        body: 'Sign in and we take you seamlessly into your real workspace inside the OS.',
        cta: 'Sign in',
        href: '/login?callbackUrl=/portal',
      },
    ],
    insideTitle: 'What awaits you in the workspace',
    insideLead: 'The real OS – nothing invented. We are in active development (early access).',
    inside: [
      { icon: 'spark', title: 'Môra', body: 'The semantic layer: it understands connections in your data instead of just storing it.' },
      { icon: 'net', title: 'Context web', body: 'Documents, analyses and signals are linked – navigable in the Finder.' },
      { icon: 'dash', title: 'Dashboards', body: 'Your situation at a glance: findings from the check, status, next steps.' },
      { icon: 'lock', title: 'Sovereign', body: 'EU-hosted (Hetzner, DE), GDPR by design, no ad trackers.' },
    ],
    trust: 'EU-hosted · GDPR-compliant · Public demo and real HQ are technically separated.',
    switch: 'Deutsch',
  },
} as const;

function DoorIcon({ name }: { name: string }) {
  const cls = 'w-6 h-6';
  if (name === 'shield') return <ShieldCheck className={cls} />;
  if (name === 'play') return <PlayCircle className={cls} />;
  if (name === 'login') return <LogIn className={cls} />;
  return <ArrowRight className={cls} />;
}

function InsideIcon({ name }: { name: string }) {
  const cls = 'w-5 h-5';
  if (name === 'spark') return <Sparkles className={cls} />;
  if (name === 'net') return <Network className={cls} />;
  if (name === 'dash') return <LayoutDashboard className={cls} />;
  return <Lock className={cls} />;
}

type PortalProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PortalPage({ searchParams }: PortalProps) {
  const params = searchParams ? await searchParams : {};
  const rawLang = Array.isArray(params.lang) ? params.lang[0] : params.lang;
  const locale: Locale = rawLang === 'en' ? 'en' : 'de';
  const t = T[locale];

  const session = await getServerSession(authOptions);
  const email = session?.user?.email || null;
  const role = (session?.user as { role?: string } | undefined)?.role;
  const isOwner = role === 'owner';
  const name = session?.user?.name?.split(' ')[0] || email?.split('@')[0] || '';
  const osUrl = email ? buildOsSsoUrl(email, { surface: 'website' }) : null;
  const switchHref = `/portal?lang=${locale === 'de' ? 'en' : 'de'}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#060d0b] via-[#081410] to-[#060d0b] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28 space-y-20">
        {/* Header */}
        <header className="space-y-6 text-center">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-300">
              {t.eyebrow}
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {t.title}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">{t.lead}</p>
          <div className="flex justify-center pt-2">
            <Link href={switchHref} className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
              {t.switch}
            </Link>
          </div>
        </header>

        {/* Primary state-aware panel */}
        {email ? (
          <section className="rounded-[2rem] border border-cyan-400/25 bg-gradient-to-br from-cyan-500/10 via-emerald-400/[0.04] to-transparent p-8 sm:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3 max-w-xl">
                <h2 className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {t.backTitle(name)}
                </h2>
                <p className="text-white/70 leading-relaxed">{t.backLead}</p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <a
                  href={osUrl || '#'}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40"
                >
                  {t.enterOs}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href={isOwner ? '/owner' : '/account/dashboard'}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
                >
                  {isOwner ? t.ownerDash : t.accountDash}
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {t.doorsTitle}
              </h2>
              <p className="mx-auto max-w-xl text-white/55">{t.doorsLead}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {t.doors.map((door) => (
                <Link
                  key={door.title}
                  href={door.href}
                  className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:border-emerald-400/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between text-emerald-300">
                    <DoorIcon name={door.icon} />
                    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                      {door.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white/90">{door.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{door.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 group-hover:gap-3 transition-all">
                    {door.cta}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* What's really inside */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {t.insideTitle}
            </h2>
            <p className="mx-auto max-w-xl text-white/55">{t.insideLead}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.inside.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/8 bg-black/20 p-6 space-y-3">
                <div className="text-emerald-300/80">
                  <InsideIcon name={item.icon} />
                </div>
                <h3 className="text-lg font-semibold text-white/85">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust line */}
        <footer className="border-t border-white/8 pt-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/35">{t.trust}</p>
        </footer>
      </div>
    </main>
  );
}
