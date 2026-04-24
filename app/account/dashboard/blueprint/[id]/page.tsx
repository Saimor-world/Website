import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { Zap, ArrowLeft, Download, Shield, Sparkles, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { buildOsBlueprintUrl } from '@/lib/os-links';

export default async function BlueprintDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ print?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const blueprint = await prisma.digitalSelfBlueprint.findUnique({
    where: { id: resolvedParams.id },
    include: { user: true }
  });

  const sessionEmail = session.user?.email?.toLowerCase();
  const ownerEmail = blueprint?.user?.email?.toLowerCase();
  const blueprintEmail = blueprint?.email?.toLowerCase();
  const isAllowed =
    !!blueprint &&
    (!!blueprint.userId ? ownerEmail === sessionEmail : blueprintEmail === sessionEmail);

  if (!isAllowed) {
    notFound();
  }

  const automations = (blueprint.automations as string[]) || [];
  const guardrails = (blueprint.guardrails as string[]) || [];
  const roadmap = (blueprint.roadmap as string[]) || [];
  const printHref = `/account/dashboard/blueprint/${resolvedParams.id}?print=true`;
  const osHref = buildOsBlueprintUrl(resolvedParams.id);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 p-8 sm:p-16 print:p-0">
      <div className="max-w-4xl mx-auto space-y-12">
        <nav className="flex flex-wrap justify-between items-center gap-3 print:hidden border-b border-slate-200 pb-8">
          <Link href="/account/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Zurueck zur Core Suite</span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={osHref}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Im OS oeffnen</span>
            </a>
            <Link
              href={printHref}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-900/10"
            >
              <Download className="w-4 h-4" />
              <span>Blueprint exportieren</span>
            </Link>
          </div>
        </nav>

        <header className="relative p-10 rounded-[2.5rem] bg-slate-900 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px]" />
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Mora Digital Twin Architecture</p>
                </div>
                <h1 className="text-5xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  Digital AI Self <span className="italic">Blueprint</span>
                </h1>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                 <Zap className="w-8 h-8 text-cyan-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-[10px] uppercase text-white/40 font-bold mb-1">Identitaet</p>
                <p className="text-lg font-medium">{blueprint.name}</p>
                <p className="text-white/50 text-sm">{blueprint.email}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase text-white/40 font-bold mb-1">Primaerziel</p>
                <p className="text-lg font-medium capitalize text-cyan-400">{blueprint.goal}</p>
                <p className="text-white/50 text-sm italic">{blueprint.createdAt.toLocaleDateString('de-DE')}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl uppercase tracking-widest text-slate-400 font-bold flex items-center gap-3">
             <div className="w-8 h-px bg-slate-200" />
             Strategischer Fokus
          </h2>
          <div className="p-8 rounded-[2rem] border-2 border-cyan-500/10 bg-white shadow-sm italic text-2xl text-slate-700 leading-relaxed font-serif">
            "{blueprint.focus}"
          </div>
        </section>

        <div className="grid sm:grid-cols-2 gap-8">
          <section className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-500" />
              <span>Automationen</span>
            </h3>
            <div className="space-y-3">
              {automations.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 font-medium">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span>Guardrails</span>
            </h3>
            <div className="space-y-3">
              {guardrails.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 font-medium">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="space-y-8 pt-8">
          <header className="flex justify-between items-end">
            <h2 className="text-2xl font-medium text-slate-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Implementierungs-Roadmap</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              <span>Dauer: 4 Wochen</span>
            </div>
          </header>

          <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {roadmap.map((step, idx) => (
              <div key={idx} className="relative flex items-center gap-6 pl-1">
                <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center text-cyan-600 font-bold shadow-sm">
                  {idx + 1}
                </div>
                <div className="flex-grow p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-cyan-500/30 transition-colors">
                  <p className="text-slate-800 font-medium">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {blueprint.techStack && (
          <section className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-4">
             <p className="text-[10px] uppercase text-slate-400 font-bold">Vorausgesetztes Tooling</p>
             <p className="text-slate-700 text-sm font-mono">{blueprint.techStack}</p>
          </section>
        )}

        <footer className="pt-16 border-t border-slate-200 text-center space-y-6">
          <div className="flex justify-center gap-4">
             <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center opacity-50">
               <Zap className="w-6 h-6" />
             </div>
             <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center opacity-50">
               <Sparkles className="w-6 h-6" />
             </div>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.5em]">Mora Core Framework &bull; 2026</p>
        </footer>
      </div>

      {resolvedSearchParams?.print === 'true' ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.print();
              }
            `,
          }}
        />
      ) : null}
    </div>
  );
}
