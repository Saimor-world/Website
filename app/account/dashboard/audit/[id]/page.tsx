import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { Shield, ArrowLeft, Download, AlertTriangle, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { buildOsAuditUrl } from '@/lib/os-links';

export default async function AuditReportPage({
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

  const audit = await prisma.securityAudit.findUnique({
    where: { id: resolvedParams.id },
    include: { user: true }
  });

  const sessionEmail = session.user?.email?.toLowerCase();
  const ownerEmail = audit?.user?.email?.toLowerCase();
  const auditEmail = audit?.email?.toLowerCase();
  const isAllowed =
    !!audit &&
    (!!audit.userId ? ownerEmail === sessionEmail : auditEmail === sessionEmail);

  if (!isAllowed) {
    notFound();
  }

  const recommendations = audit.recommendations as any[] || [];
  const printHref = `/account/dashboard/audit/${resolvedParams.id}?print=true`;
  const osHref = buildOsAuditUrl(resolvedParams.id);

  return (
    <div className="min-h-screen bg-white text-slate-900 p-8 sm:p-16 print:p-0">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation / Actions (Hidden in Print) */}
        <nav className="flex flex-wrap justify-between items-center gap-3 print:hidden border-b border-slate-100 pb-8">
          <Link href="/account/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Zurueck zum Dashboard</span>
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
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-700 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Bericht als PDF speichern</span>
            </Link>
          </div>
        </nav>

        {/* Report Header */}
        <header className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">Saimor Security Audit</p>
              <h1 className="text-5xl font-light text-slate-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Resilienz-Bericht
              </h1>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center">
               <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-100">
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Ausgestellt fuer</p>
              <p className="text-lg font-medium">{audit.name}</p>
              <p className="text-slate-500">{audit.email}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Datum der Analyse</p>
              <p className="text-lg font-medium">{audit.createdAt.toLocaleDateString('de-DE')}</p>
              <p className="text-slate-500">{audit.industry || 'Allgemeine Branche'}</p>
            </div>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="space-y-6">
          <h2 className="text-2xl font-medium border-l-4 border-slate-900 pl-6 italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Executive Summary</h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 space-y-2">
              <p className="text-[10px] uppercase text-slate-400 font-bold">Gesamt-Score</p>
              <p className={`text-4xl font-bold ${audit.score > 70 ? 'text-emerald-600' : audit.score > 40 ? 'text-amber-600' : 'text-red-600'}`}>
                {audit.score}<span className="text-lg text-slate-300 ml-1">/100</span>
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 space-y-2">
              <p className="text-[10px] uppercase text-slate-400 font-bold">Risiko-Level</p>
              <p className="text-2xl font-bold uppercase tracking-wide">{audit.level}</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 space-y-2">
              <p className="text-[10px] uppercase text-slate-400 font-bold">Status</p>
              <p className="text-lg font-medium text-slate-600">Validiert via CORE</p>
            </div>
          </div>

          <div className="p-8 rounded-[2rem] border border-slate-100 bg-slate-50/50 leading-relaxed text-slate-700 italic">
            "{audit.analysis}"
          </div>
        </section>

        {/* Detailed Findings */}
        <section className="space-y-8 pt-8">
          <h2 className="text-2xl font-medium" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Handlungsempfehlungen</h2>
          
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-100 flex gap-6">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                  rec.priority === 'high' ? 'bg-red-50 text-red-600' : 
                  rec.priority === 'medium' ? 'bg-amber-50 text-amber-600' : 
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  {rec.priority === 'high' ? <AlertTriangle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wide text-sm">{rec.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{rec.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 border-t border-slate-100 text-center space-y-4">
          <p className="text-xs text-slate-400 uppercase tracking-[0.4em]">Saimor Core &copy; 2026</p>
          <div className="text-[10px] text-slate-300 max-w-lg mx-auto">
            Dieser Bericht wurde automatisch generiert. Fuer eine verbindliche Haftungspruefung oder Implementierungsbegleitung wenden Sie sich bitte an Ihren Saimor Consultant.
          </div>
        </footer>

      </div>

      {/* Script for printing only on client side if needed */}
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
