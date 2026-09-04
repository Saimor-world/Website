import { Check, FileText, Mail, Network, ShieldCheck } from 'lucide-react';

export default function MoraSystemPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a1112] shadow-[0_28px_90px_rgba(0,0,0,.42)]">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#78ceb7]" /><span className="font-mono text-xs tracking-[.16em] text-white/48">MÔRA / ARBEITSKONTEXT</span></div>
        <span className="text-xs text-white/28">Demo-Daten</span>
      </div>
      <div className={`grid ${compact ? 'md:grid-cols-[.82fr_1.18fr]' : 'lg:grid-cols-[.72fr_1.28fr]'}`}>
        <div className="border-b border-white/8 p-5 md:border-b-0 md:border-r">
          <p className="text-xs uppercase tracking-[.16em] text-white/30">Eingänge</p>
          <div className="mt-4 space-y-2">
            <div className="rounded-xl border border-white/8 bg-white/[.03] p-3"><Mail className="h-4 w-4 text-[#d6a848]" /><p className="mt-3 text-sm text-white/72">Angebot wartet auf Freigabe</p><p className="mt-1 text-xs text-white/30">Mail · vor 18 Min.</p></div>
            <div className="rounded-xl border border-white/8 bg-white/[.03] p-3"><FileText className="h-4 w-4 text-[#7fd4c1]" /><p className="mt-3 text-sm text-white/72">Leistungsumfang geändert</p><p className="mt-1 text-xs text-white/30">Dokument · heute</p></div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between"><p className="text-xs uppercase tracking-[.16em] text-white/30">Von Môra vorbereitet</p><Network className="h-4 w-4 text-[#7fd4c1]/65" /></div>
          <div className="mt-4 rounded-2xl border border-[#7fd4c1]/16 bg-[#7fd4c1]/[.045] p-5">
            <p className="text-base font-semibold text-white/86">Angebot aktualisieren</p>
            <p className="mt-2 text-sm leading-6 text-white/48">Die neue Leistungsbeschreibung betrifft Position 2 und den Liefertermin. Der Entwurf wurde angepasst, aber noch nicht versendet.</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-black/18 px-3 py-2.5 text-sm text-white/62"><Check className="h-4 w-4 text-[#7fd4c1]" />Änderungen prüfen</div>
              <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-black/18 px-3 py-2.5 text-sm text-white/62"><ShieldCheck className="h-4 w-4 text-[#d6a848]" />Freigabe erforderlich</div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-white/26">Nichts wird ohne sichtbare Freigabe versendet.</p>
        </div>
      </div>
    </div>
  );
}
