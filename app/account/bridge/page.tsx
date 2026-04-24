import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getOsBaseUrl, buildOsSsoUrl } from '@/lib/os-links';

function getOsHomeUrl() {
  return getOsBaseUrl();
}

type BridgeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

function firstValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function AccountBridgePage({ searchParams }: BridgeProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/account/bridge');
  }

  const query = await Promise.resolve(searchParams || {});
  const claimType = firstValue(query.claimType);
  const claimId = firstValue(query.claimId);
  const next = firstValue(query.next);
  const email = session.user.email.toLowerCase();
  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true },
  });

  let claimStatus: 'none' | 'linked' | 'already_linked' | 'mismatch' | 'not_found' = 'none';

  if (claimType && claimId) {
    if (claimType === 'audit') {
      const audit = await prisma.securityAudit.findUnique({
        where: { id: claimId },
        include: { user: true },
      });
      if (!audit) {
        claimStatus = 'not_found';
      } else if (!audit.userId) {
        if (audit.email.toLowerCase() === email) {
          await prisma.securityAudit.update({
            where: { id: claimId },
            data: { userId: currentUser?.id },
          });
          claimStatus = 'linked';
        } else {
          claimStatus = 'mismatch';
        }
      } else if (audit.user?.email?.toLowerCase() === email) {
        claimStatus = 'already_linked';
      } else {
        claimStatus = 'mismatch';
      }
    }

    if (claimType === 'blueprint') {
      const blueprint = await prisma.digitalSelfBlueprint.findUnique({
        where: { id: claimId },
        include: { user: true },
      });
      if (!blueprint) {
        claimStatus = 'not_found';
      } else if (!blueprint.userId) {
        if (blueprint.email.toLowerCase() === email) {
          await prisma.digitalSelfBlueprint.update({
            where: { id: claimId },
            data: { userId: currentUser?.id },
          });
          claimStatus = 'linked';
        } else {
          claimStatus = 'mismatch';
        }
      } else if (blueprint.user?.email?.toLowerCase() === email) {
        claimStatus = 'already_linked';
      } else {
        claimStatus = 'mismatch';
      }
    }
  }

  if (next && next.startsWith('/') && (claimStatus === 'linked' || claimStatus === 'already_linked')) {
    redirect(next);
  }

  const osHomeUrl = getOsHomeUrl();
  const osSsoUrl = buildOsSsoUrl(session.user.email);
  const hasClaim = claimStatus !== 'none';

  const stepState = {
    received: hasClaim ? 'done' : 'idle',
    checked: hasClaim ? 'done' : 'idle',
    linked:
      claimStatus === 'linked' || claimStatus === 'already_linked'
        ? 'done'
        : claimStatus === 'mismatch' || claimStatus === 'not_found'
          ? 'error'
          : 'idle',
  } as const;

  const stepClass = (state: 'done' | 'error' | 'idle') => {
    if (state === 'done') return 'bg-emerald-500 border-emerald-400 text-black';
    if (state === 'error') return 'bg-red-500/20 border-red-400 text-red-200';
    return 'bg-white/5 border-white/20 text-white/50';
  };

  return (
    <main className="min-h-screen bg-[#060d0b] text-white px-6 py-20">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-saimor-gold">Bridge</p>
          <h1 className="text-5xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Website und OS verbinden
          </h1>
          <p className="text-white/65 max-w-2xl mx-auto">
            Du bist eingeloggt als {session.user.email}. Waehle jetzt bewusst dein Ziel: Website-Workspace
            (Audits/Blueprints) oder OS-Workspace.
          </p>
          {hasClaim ? (
            <div className="space-y-4">
              <p className="text-sm text-emerald-300/85">
                {claimStatus === 'linked' && 'Ergebnis wurde erfolgreich mit deinem Konto verknuepft.'}
                {claimStatus === 'already_linked' && 'Ergebnis ist bereits mit deinem Konto verknuepft.'}
                {claimStatus === 'mismatch' && 'Ergebnis konnte nicht verknuepft werden (E-Mail passt nicht zum Login).'}
                {claimStatus === 'not_found' && 'Ergebnis nicht gefunden.'}
              </p>
              <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3 text-left">
                <div className={`rounded-xl border px-4 py-3 ${stepClass(stepState.received)}`}>
                  <p className="text-[10px] uppercase tracking-[0.18em]">Step 1</p>
                  <p className="text-sm mt-1">Result erkannt</p>
                </div>
                <div className={`rounded-xl border px-4 py-3 ${stepClass(stepState.checked)}`}>
                  <p className="text-[10px] uppercase tracking-[0.18em]">Step 2</p>
                  <p className="text-sm mt-1">Konto geprueft</p>
                </div>
                <div className={`rounded-xl border px-4 py-3 ${stepClass(stepState.linked)}`}>
                  <p className="text-[10px] uppercase tracking-[0.18em]">Step 3</p>
                  <p className="text-sm mt-1">
                    {stepState.linked === 'error' ? 'Verknuepfung fehlgeschlagen' : 'Verknuepfung ok'}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </header>

        <section className="grid md:grid-cols-2 gap-6">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80">Website Workspace</p>
            <h2 className="text-3xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Account Dashboard
            </h2>
            <p className="text-white/70">
              Security Audits, Digital-Self Blueprints, Reports und Verlauf innerhalb der Website.
            </p>
            <Link
              href="/account/dashboard"
              className="inline-flex items-center rounded-xl bg-white text-black px-5 py-3 font-bold hover:bg-emerald-300 transition-colors"
            >
              Dashboard oeffnen
            </Link>
          </article>

          <article className="rounded-3xl border border-cyan-500/25 bg-cyan-500/10 p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">OS Workspace</p>
            <h2 className="text-3xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Parallel OS
            </h2>
            <p className="text-white/75">
              Direkter Sprung in dein OS Home. Diese Flaeche ist getrennt von der Website.
            </p>
            <a
              href={osSsoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-200/15 px-5 py-3 font-bold text-cyan-100 hover:bg-cyan-200/25 transition-colors"
            >
              OS Home oeffnen
            </a>
            <p className="text-xs text-cyan-100/70 font-mono break-all">{osHomeUrl}</p>
          </article>
        </section>
      </div>
    </main>
  );
}
