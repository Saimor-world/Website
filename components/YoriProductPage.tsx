import { ArrowUpRight, Check } from 'lucide-react';
import YoriWorkspacePreview from '@/components/YoriWorkspacePreview';

const COPY = {
  de: { label: 'YORI / CREATIVE WORKSPACE', title: 'Produktion ohne Medienbruch.', body: 'Recherche, Entwurf, Assets und Freigabe liegen in einem Projekt. YORI zeigt den Arbeitsstand und bereitet den nächsten Schritt vor.', cta: 'Prototyp öffnen', status: 'PROTOTYP', flow: ['Recherche', 'Entwurf', 'Freigabe', 'Publishing'], note: 'YORI wird derzeit als begrenzter Prototyp weiterentwickelt.' },
  en: { label: 'YORI / CREATIVE WORKSPACE', title: 'Production without broken context.', body: 'Research, drafts, assets and approvals live in one project. YORI shows the current state and prepares the next step.', cta: 'Open prototype', status: 'PROTOTYPE', flow: ['Research', 'Draft', 'Approval', 'Publishing'], note: 'YORI is currently being developed as a limited prototype.' },
} as const;

export default function YoriProductPage({ locale }: { locale: 'de' | 'en' }) {
  const copy = COPY[locale];
  return <main className="min-h-screen bg-[var(--yori-paper)] text-[var(--yori-ink)]">
    <section className="px-5 pb-16 pt-32 sm:px-7 md:pb-24 md:pt-40"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
      <div><div className="flex flex-wrap items-center gap-3"><p className="font-mono text-xs font-bold tracking-[.2em] text-[var(--yori-jade)]">{copy.label}</p><span className="rounded-full border border-[var(--yori-jade)]/18 px-3 py-1 text-[10px] font-bold tracking-[.14em] text-[var(--yori-jade)]">{copy.status}</span></div><h1 className="mt-7 font-serif text-[clamp(3.8rem,8vw,7rem)] leading-[.88] tracking-[-.045em]">{copy.title}</h1><p className="mt-7 max-w-xl text-base leading-7 text-[#4f605c] sm:text-lg">{copy.body}</p><a href="https://yori.saimor.world" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--yori-jade)] px-6 py-3 text-sm font-bold text-white">{copy.cta}<ArrowUpRight className="h-4 w-4" /></a></div>
      <YoriWorkspacePreview />
    </div></section>
    <section className="border-y border-[#17201e]/10 bg-white/28 px-5 py-14 sm:px-7 md:py-20"><div className="mx-auto max-w-7xl"><div className="grid gap-3 sm:grid-cols-4">{copy.flow.map((item,index) => <div key={item} className="flex items-center justify-between rounded-xl border border-[#17201e]/9 bg-white/45 px-4 py-4"><span className="text-sm font-semibold">{item}</span>{index < copy.flow.length - 1 ? <span className="text-[var(--yori-jade)]">→</span> : <Check className="h-4 w-4 text-[var(--yori-jade)]" />}</div>)}</div><p className="mt-6 text-sm text-[#4f605c]">{copy.note}</p></div></section>
  </main>;
}
