import Link from 'next/link';
import { Shield, TrendingUp, Users, CheckCircle, Pin, Trophy, Info } from 'lucide-react';

export const metadata = {
  title: 'Besucher-Wall | Saimor',
  description: 'Die sichersten Unternehmen im Saimor Universum.',
};

type WallEntry = {
  id: string;
  name: string;
  company: string | null;
  tag: string | null;
  domain: string | null;
  score: number;
  createdAt: string;
};

function scoreMeta(score: number) {
  if (score >= 80) return { label: 'Safe', color: '#34d399', pin: '#10b981', mood: '😊' };
  if (score >= 50) return { label: 'Warn', color: '#fbbf24', pin: '#f59e0b', mood: '😐' };
  return { label: 'Risk', color: '#f87171', pin: '#ef4444', mood: '😰' };
}

async function getEntries(): Promise<WallEntry[]> {
  try {
    const base = process.env.NEXTAUTH_URL || 'http://localhost:3001';
    const res = await fetch(`${base}/api/wall`, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries ?? [];
  } catch {
    return [];
  }
}

export default async function WallPage() {
  const entries = await getEntries();
  const sortedByScore = [...entries].sort((a, b) => b.score - a.score);
  const top3 = sortedByScore.slice(0, 3);
  const remaining = sortedByScore.slice(3);

  return (
    <main className="min-h-screen bg-[#0a0f0d] text-white overflow-x-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-24">
          <p className="text-[10px] uppercase tracking-[0.5em] text-emerald-500/60 font-bold">Community Leaderboard</p>
          <h1 className="text-7xl font-light tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            The <span className="italic">Wall</span> of Fame
          </h1>
          <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
            Echte Audits. Echte Sicherheit. Ein sympathischer Wettlauf um die sauberste digitale Weste.
          </p>
        </div>

        {/* Podium / Hall of Fame */}
        {top3.length > 0 && (
          <div className="flex flex-wrap justify-center items-end gap-6 mb-32">
            {/* Silber (2.) */}
            {top3[1] && <PodiumPlace entry={top3[1]} rank={2} height="h-48" color="text-slate-400" />}
            {/* Gold (1.) */}
            {top3[0] && <PodiumPlace entry={top3[0]} rank={1} height="h-64" color="text-yellow-400" glow />}
            {/* Bronze (3.) */}
            {top3[2] && <PodiumPlace entry={top3[2]} rank={3} height="h-40" color="text-amber-700" />}
          </div>
        )}

        {/* The Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {remaining.map((entry, i) => (
            <Polaroid key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        {/* Action CTA */}
        <div className="mt-40 text-center space-y-6">
          <div className="inline-block p-1 rounded-full bg-white/5 border border-white/10">
            <Link
              href="/de/einstieg/security-check"
              className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-bold transition-all hover:bg-emerald-300 hover:scale-105"
            >
              <Shield size={20} />
              Jetzt Audit starten & anpinnen
            </Link>
          </div>
          <p className="text-xs text-white/20 italic">Alle Berichte werden anonymisiert dargestellt.</p>
        </div>
      </div>
    </main>
  );
}

function PodiumPlace({ entry, rank, height, color, glow }: { entry: WallEntry, rank: number, height: string, color: string, glow?: boolean }) {
  return (
    <div className="flex flex-col items-center group">
      <div className={`w-24 h-24 rounded-2xl bg-white/5 border border-white/10 mb-4 flex items-center justify-center relative ${glow ? 'shadow-[0_0_50px_rgba(250,204,21,0.1)]' : ''}`}>
        <span className={`text-4xl font-bold ${color}`}>{rank}.</span>
        <Trophy size={16} className={`absolute -top-2 -right-2 ${color}`} />
      </div>
      <div className={`w-40 ${height} bg-white/[0.03] border-x border-t border-white/10 rounded-t-2xl flex flex-col items-center p-4 text-center transition-all group-hover:bg-white/[0.06]`}>
        <p className="text-sm font-bold truncate w-full">{entry.name}</p>
        <p className="text-xs text-white/40 truncate w-full mb-4">{entry.company || 'Business'}</p>
        <div className={`text-3xl font-bold tabular-nums ${color}`}>{entry.score}</div>
        <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">Score</p>
      </div>
    </div>
  );
}

function Polaroid({ entry, index }: { entry: WallEntry; index: number }) {
  const meta = scoreMeta(entry.score);
  const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2'];
  const rotation = rotations[index % rotations.length];

  return (
    <div className={`relative transition-all duration-300 hover:scale-105 group`}>
      {/* The Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
         <div className="w-2.5 h-2.5 rounded-full" style={{ background: meta.pin }} />
      </div>

      <div className={`bg-[#fdfdfd] p-3 pb-10 shadow-2xl ${rotation} transition-transform cursor-pointer`}>
        <div className="bg-[#121212] aspect-square mb-3 flex flex-col items-center justify-center relative overflow-hidden">
          <span className="text-4xl font-bold tabular-nums z-10" style={{ color: meta.color }}>
            {entry.score}
          </span>
          <span className="text-[2rem] z-10 mt-1">{meta.mood}</span>
          <div className="absolute bottom-2 right-2 text-white/5">
             <Info size={40} />
          </div>
        </div>

        <div className="text-black/80 space-y-0.5 px-1">
          <p className="text-sm font-bold truncate" style={{ fontFamily: 'Permanent Marker, cursive' }}>{entry.name}</p>
          <div className="flex justify-between items-center opacity-40 text-[9px] font-mono">
            <span>{entry.tag || 'Scan'}</span>
            <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
