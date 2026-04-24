import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Shield, Users, Activity, Globe, AlertTriangle, ChevronRight, Search, Mail, Download } from 'lucide-react';
import { CORE_BASE_URL, OWNER_CONSOLE_CORE_TOKEN, fetchCoreJson, fetchCoreOwnerJson } from '@/lib/core-owner';

export const dynamic = 'force-dynamic';

function fmtDate(value: Date | string | null | undefined) {
  if (!value) return '-';
  const date = typeof value === 'string' ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleString('de-DE');
}

async function getOwnerData() {
  const [securityAudits, userCount, waitlistCount, contacts] = await Promise.all([
    prisma.securityAudit.findMany({ 
      orderBy: { createdAt: 'desc' }, 
      take: 20,
      include: { user: true } 
    }),
    prisma.user.count(),
    prisma.waitlist.count(),
    prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
  ]);
  return { securityAudits, userCount, waitlistCount, contacts };
}

export default async function OwnerDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== 'owner') {
    redirect('/owner/login');
  }

  const data = await getOwnerData();

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
             <button className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300">Live View</button>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <StatCard label="Security Leads" value={data.securityAudits.length} icon={<Shield size={20}/>} />
           <StatCard label="Kunden (Users)" value={data.userCount} icon={<Users size={20}/>} />
           <StatCard label="Warteliste" value={data.waitlistCount} icon={<Activity size={20}/>} />
        </div>

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
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                       <p className="text-[10px] text-white/20">{fmtDate(audit.createdAt)}</p>
                       <button className="flex items-center gap-2 ml-auto text-[10px] uppercase tracking-widest text-emerald-400 hover:text-white transition-colors">
                          Details öffnen <ChevronRight size={12}/>
                       </button>
                    </div>
                  </div>

                  {/* Attacker Path Preview (Hidden by default, shown on group-hover or click) */}
                  {audit.attackerPath && (
                    <div className="mt-6 p-4 rounded-xl bg-rose-500/[0.03] border border-rose-500/10 space-y-2">
                       <p className="text-[9px] uppercase tracking-[0.2em] text-rose-400 font-bold">Hypothetischer Angriffsweg</p>
                       <p className="text-xs text-white/60 leading-relaxed italic line-clamp-2">"{audit.attackerPath}"</p>
                    </div>
                  )}
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
               <button className="w-full py-3 rounded-xl bg-white/10 text-xs font-bold hover:bg-white/20 transition-all">CSV Herunterladen</button>
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
