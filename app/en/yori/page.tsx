import type { Metadata } from "next";
import YoriMark from "@/components/YoriMark";
import YoriSection from "@/components/YoriSection";

export const metadata: Metadata = {
  title: "YORI — Creative Operating System by Saimôr",
  description: "A calm, AI-first workspace for ideas, content, publishing and learning. Create in Flow.",
};

export default function YoriPage() {
  return <main className="min-h-screen bg-[var(--yori-paper)] text-[var(--yori-ink)]">
    <section className="relative flex min-h-[88vh] items-center overflow-hidden px-6 pb-24 pt-36"><div className="absolute inset-x-0 top-0 z-[1] h-28 bg-[linear-gradient(180deg,rgba(7,11,12,.96),rgba(7,11,12,.72)_62%,transparent)]"/><div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(98,191,192,.22),transparent_31%),radial-gradient(circle_at_20%_86%,rgba(52,78,134,.10),transparent_34%)]"/><div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><div><p className="font-mono text-[10px] font-bold tracking-[.24em] text-[var(--yori-jade)]">CREATIVE OPERATING SYSTEM / SAIMÔR</p><h1 className="mt-7 text-[clamp(5rem,15vw,11rem)] font-semibold leading-[.78] tracking-[.06em]">YORI</h1><p className="mt-8 font-serif text-3xl italic text-[var(--yori-indigo)] md:text-5xl">Create in Flow.</p><p className="mt-8 max-w-2xl text-lg leading-8 text-[#5f6d69]">A quiet place where research, ideas, assets, agents, editing, publishing and real outcomes become creative work.</p><a href="https://frnt.saimor.world" className="mt-9 inline-flex rounded-full bg-[var(--yori-jade)] px-8 py-4 text-sm font-bold text-white transition hover:bg-[var(--yori-jade-deep)]">Open YORI</a></div><div className="relative mx-auto grid aspect-square w-full max-w-xl place-items-center"><div className="absolute h-[78%] w-[78%] rounded-full border border-[var(--yori-jade)]/18"/><div className="absolute h-[58%] w-[58%] rounded-full border border-[var(--yori-indigo)]/16"/><div className="grid h-56 w-56 place-items-center rounded-full bg-[#e2ede8] text-[var(--yori-jade)] shadow-[16px_18px_0_rgba(217,207,189,.42)]"><YoriMark className="h-36 w-36"/></div></div></div></section>
    <YoriSection locale="en" />
  </main>;
}
