import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import BrainGraph from '@/components/BrainGraph';
import { Sparkles, LayoutDashboard, Shield, BarChart3, Zap, Calendar, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';

export default async function MoraDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect('/login?callbackUrl=/account/dashboard');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      securityAudits: { orderBy: { createdAt: 'desc' }, take: 5 },
      digitalBlueprints: { orderBy: { createdAt: 'desc' }, take: 5 },
      facts: { orderBy: { createdAt: 'desc' }, take: 10 },
    },
  });

  if (!user) {
    // If user doesn't exist in DB yet, create them (first time login)
    await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name,
        role: (session.user as any).role || 'free',
      }
    });
    redirect('/account/dashboard');
  }

  const audits = user.securityAudits || [];
  const blueprints = user.digitalBlueprints || [];
  const facts = user.facts || [];
  const isOwner = user.role === 'owner';
  const hasPassword = !!user.password;

  // Derived Product Insight Extraction (from stored blueprint/audit data)
  const latestBlueprint = blueprints[0];
  const automationCount = latestBlueprint ? (((latestBlueprint.automations as string[]) || []).length) : 0;
  const baselineFromAudit = audits[0]?.score ? Math.max(0, 100 - audits[0].score) : 30;
  const efficiencyBoostValue = latestBlueprint
    ? Math.min(45, Math.max(8, Math.round(automationCount * 6 + baselineFromAudit * 0.15)))
    : 0;
  const efficiencyPotential = `${efficiencyBoostValue}%`;

  return (
    <div className="min-h-screen bg-[#060d0b] text-white p-6 sm:p-10 lg:p-16">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
              <LayoutDashboard className="w-3 h-3" />
              <span>{isOwner ? 'Mora Operator Suite' : 'Mora Core Interface'}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Willkommen, <span className="italic">{user.name || user.email?.split('@')[0]}</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              {isOwner 
                ? 'Vollzugriff auf Operator-Metriken und globale System-Steuerung.' 
                : 'Zentraler Zugriff auf deine Sicherheits-Audits, KI-Blueprints und dein digitales Gedaechtnis.'}
            </p>
          </div>
          <div className="flex gap-4">
             <Link 
              href="/de/einstieg"
              className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-emerald-300 transition-all flex items-center gap-2"
            >
              <span>Neuer Scan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Security Alert: No Password */}
        {!hasPassword && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-amber-400" />
              <p className="text-sm text-amber-200/80">
                Du nutzt aktuell nur Magic Links. Setze ein Passwort fuer den direkten CORE-Zugriff.
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-amber-500 text-black text-xs font-bold hover:bg-amber-400 transition-all">
              Passwort setzen
            </button>
          </div>
        )}

        {/* Main Stats Row - REAL PRODUCT METRICS */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
               <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Resilienz Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{audits[0]?.score || '--'}</span>
              <span className="text-sm text-emerald-400">/ 100</span>
            </div>
            <p className="text-[10px] text-emerald-400/60 font-mono italic">Basierend auf SSL & Passive Recon</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 space-y-2 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
               <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Effizienz Boost</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-cyan-400">{efficiencyPotential}</span>
            </div>
            <p className="text-[10px] text-white/30 font-mono italic">Durch KI-gestuetzte Prozesse</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 space-y-2 relative overflow-hidden group">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 font-bold">System Status</p>
            <div className="flex items-center gap-2 text-emerald-400 pt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-lg font-medium">CORE Linked</span>
            </div>
            <p className="text-[10px] text-white/30 font-mono italic">Node: DE-FRA-01</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 space-y-2 relative overflow-hidden group">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 font-bold">Account Tier</p>
            <span className="text-2xl font-bold uppercase tracking-wider text-saimor-gold pt-1 block">{user.role}</span>
            <p className="text-[10px] text-white/30 font-mono italic">UID: {user.id.substring(0, 8)}</p>
          </div>
        </section>

        {/* Operator Field Suite (Only for Owner) */}
        {isOwner && (
          <section className="rounded-[2.5rem] border border-saimor-gold/30 bg-gradient-to-br from-saimor-gold/10 to-transparent p-10 space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-light text-saimor-gold" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Operator Field Suite</h2>
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-saimor-gold/10 border border-saimor-gold/20 text-saimor-gold text-[10px] font-bold uppercase tracking-widest animate-pulse">
                Live System Access
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Node Monitoring</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-mono text-emerald-400">99.8%</span>
                  <BarChart3 className="w-5 h-5 text-white/20" />
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Active Threads</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-mono text-cyan-400">12</span>
                  <Zap className="w-5 h-5 text-white/20" />
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">API Traffic</p>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-mono text-emerald-400">LOW</span>
                  <CheckCircle2 className="w-5 h-5 text-white/20" />
                </div>
              </div>
            </div>
            <p className="text-sm text-white/40 italic">Hinweis: Die Field Suite kommuniziert direkt mit dem parallelen OS-Backbone via API-V3.</p>
          </section>
        )}

        {/* Knowledge Graph / Memory Section */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-light italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Digitales Bewusstsein</h2>
            <Sparkles className="w-5 h-5 text-cyan-400/50" />
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <BrainGraph facts={facts} />
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-[2rem] border border-white/10 bg-white/5 space-y-4">
                <h3 className="text-sm uppercase tracking-widest text-white/40 font-bold">Zuletzt gelernt</h3>
                <div className="space-y-3">
                  {facts.slice(0, 5).map((fact) => (
                    <div key={fact.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-xs text-white/60">{fact.key}</span>
                      <span className="text-xs text-cyan-400 font-mono">{fact.value}</span>
                    </div>
                  ))}
                  {facts.length === 0 && <p className="text-xs text-white/20 italic">Noch keine Daten verfuegbar.</p>}
                </div>
              </div>
              <div className="p-6 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5">
                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-2">Efficiency Boost</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  Basierend auf deinem Tech-Stack ({facts.find(f => f.key === 'tech_stack')?.value || 'unbekannt'}) kann Môra Automations-Skripte optimieren.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Recent Audits */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-light italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Sicherheits-Historie</h2>
              <div className="flex items-center gap-3">
                <Link href="/wall" className="text-[10px] uppercase tracking-widest text-emerald-400/70 hover:text-emerald-300 transition-colors">
                  Wall ansehen →
                </Link>
                <Shield className="w-5 h-5 text-emerald-500/50" />
              </div>
            </div>
            <div className="space-y-4">
              {audits.length > 0 ? audits.map((audit) => (
                <div key={audit.id} className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs text-white/40 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {audit.createdAt.toLocaleDateString('de-DE')}
                      </p>
                      <h3 className="text-xl font-medium">{audit.industry || 'Allgemeines Audit'}</h3>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      audit.score > 70 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      audit.score > 40 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      Score: {audit.score}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/60 line-clamp-2">{audit.analysis}</p>
                  <Link href={`/account/dashboard/audit/${audit.id}`} className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Details ansehen</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center space-y-4">
                  <p className="text-white/40">Noch keine Audits durchgefuehrt.</p>
                  <Link href="/de/einstieg/security-check" className="text-emerald-400 text-sm font-bold hover:underline">Jetzt ersten Scan starten</Link>
                </div>
              )}
            </div>
          </section>

          {/* Recent Blueprints */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-light italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>KI-Blueprints</h2>
              <Zap className="w-5 h-5 text-cyan-500/50" />
            </div>
            <div className="space-y-4">
              {blueprints.length > 0 ? blueprints.map((bp) => (
                <div key={bp.id} className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-xs text-white/40 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {bp.createdAt.toLocaleDateString('de-DE')}
                      </p>
                      <h3 className="text-xl font-medium">{bp.focus}</h3>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold uppercase tracking-widest">
                      {bp.goal}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {((bp.automations as string[]) || []).slice(0, 2).map((a, i) => (
                      <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/50">{a}</span>
                    ))}
                  </div>
                  <Link href={`/account/dashboard/blueprint/${bp.id}`} className="mt-4 inline-flex items-center gap-2 text-xs text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Vollstaendiger Blueprint</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              )) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center space-y-4">
                  <p className="text-white/40">Noch keine Digital-Self Blueprints erstellt.</p>
                  <Link href="/de/einstieg/digital-self" className="text-cyan-400 text-sm font-bold hover:underline">Jetzt Blueprint generieren</Link>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Intelligence / Context Footer */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
            <BarChart3 className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="space-y-4 flex-grow text-center md:text-left">
            <h3 className="text-2xl font-medium">Mora Intelligence Center</h3>
            <p className="text-white/60 leading-relaxed max-w-3xl">
              Dein Interface lernt mit jeder Interaktion. Zukuenftig werden hier aggregierte Daten aus deinen Systemen (Slack, M365, Notion) direkt mit deinem Security-Score und deinem Digital-Self Blueprint korreliert.
            </p>
          </div>
          <div className="shrink-0">
            <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-all text-sm font-bold">
              Metriken konfigurieren
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
