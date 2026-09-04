import { FileText, Lightbulb, Search, Send, WandSparkles } from 'lucide-react';

export default function YoriWorkspacePreview() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[#2f7f78]/16 bg-[#f2efe7] text-[#17201e] shadow-[0_26px_70px_rgba(31,46,43,.18)]">
      <div className="flex items-center justify-between border-b border-[#17201e]/8 px-5 py-4"><span className="font-mono text-xs tracking-[.18em] text-[#2f7f78]">YORI / STUDIO</span><span className="rounded-full border border-[#2f7f78]/15 bg-[#2f7f78]/6 px-3 py-1 text-xs text-[#2f7f78]">Prototyp</span></div>
      <div className="grid md:grid-cols-[.68fr_1.32fr]">
        <aside className="border-b border-[#17201e]/8 p-5 md:border-b-0 md:border-r"><p className="text-xs uppercase tracking-[.14em] text-[#17201e]/38">Projekt</p><p className="mt-3 text-lg font-semibold">Launch-Serie</p><div className="mt-5 space-y-2">{[[Lightbulb,'Ideen'],[Search,'Recherche'],[FileText,'Skript'],[WandSparkles,'Assets']].map(([Icon,label]) => { const ItemIcon = Icon as typeof Lightbulb; return <div key={String(label)} className="flex items-center gap-3 rounded-xl bg-white/55 px-3 py-2.5 text-sm text-[#17201e]/68"><ItemIcon className="h-4 w-4 text-[#2f7f78]" />{String(label)}</div>; })}</div></aside>
        <div className="p-5"><p className="text-xs uppercase tracking-[.14em] text-[#17201e]/38">Heute</p><div className="mt-4 rounded-2xl border border-[#17201e]/8 bg-white/60 p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-base font-semibold">Drei Hooks vergleichen</p><p className="mt-2 text-sm leading-6 text-[#17201e]/52">Recherche und bisherige Entwürfe liegen daneben. YORI markiert, welche Aussage bereits belegt ist.</p></div><span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#2f7f78]" /></div><div className="mt-5 grid gap-2 sm:grid-cols-3">{['Direkt','Kontrast','Geschichte'].map((item,index)=><div key={item} className={`rounded-xl border p-3 text-sm ${index===1?'border-[#2f7f78]/25 bg-[#2f7f78]/8 text-[#245f5a]':'border-[#17201e]/8 bg-white/55 text-[#17201e]/55'}`}>{item}</div>)}</div></div><div className="mt-3 flex items-center justify-between rounded-xl border border-[#17201e]/8 bg-white/40 px-4 py-3 text-sm text-[#17201e]/42"><span>Nächsten Schritt vorbereiten</span><Send className="h-4 w-4 text-[#2f7f78]" /></div></div>
      </div>
    </div>
  );
}
