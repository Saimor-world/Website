import type { Metadata } from "next";
import Image from "next/image";
import FrntSection from "@/components/FrntSection";

export const metadata: Metadata = {
  title: "FRNT - Creator Operating Tool by Saimôr",
  description: "Signale, Clips, Creator-Agenten und Umsatz in einem Operating Tool.",
};

export default function FrntPage() {
  return (
    <main className="min-h-screen bg-[var(--world-ink)] text-[var(--world-paper)]">
      <section className="relative flex min-h-[82vh] items-center overflow-hidden border-b border-[var(--world-border)] px-6 pb-24 pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_22%,rgba(102,221,234,.12),transparent_32%),radial-gradient(circle_at_30%_28%,rgba(214,168,72,.13),transparent_30%),linear-gradient(180deg,var(--world-night),var(--world-ink))]" />
        <div className="absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(102,221,234,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(214,168,72,.10)_1px,transparent_1px)] [background-size:86px_86px]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[.24em] text-[var(--world-cyan)]">CREATOR OPERATING TOOL / 01</p>
            <h1 className="mt-7 text-[clamp(5rem,15vw,12rem)] font-black leading-[.72]">FRNT</h1>
            <p className="mt-8 text-sm font-bold tracking-[.25em] text-[var(--world-gold)]">BY SAIMÔR</p>
            <p className="mt-10 max-w-2xl text-2xl leading-tight text-white/74 md:text-4xl">Make it. Move it. Own it.</p>
          </div>
          <div className="relative">
            <div className="absolute inset-8 rounded-full bg-[var(--world-gold)]/12 blur-[80px]" />
            <Image src="/frnt-mark.png" alt="FRNT mark" width={720} height={720} priority className="relative w-full rounded-[2.5rem] border border-white/10 bg-white/[.025] shadow-[0_50px_160px_rgba(102,221,234,.14)]" />
          </div>
        </div>
      </section>
      <FrntSection locale="de" />
      <section className="border-t border-[var(--world-border)] bg-[var(--world-night)] px-6 py-28 text-center">
        <p className="font-mono text-[10px] font-bold tracking-[.2em] text-[var(--world-cyan)]">PRIVATE BETA</p>
        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-medium md:text-7xl">Baue deinen naechsten Clip nicht allein.</h2>
        <a href="https://frnt.saimor.world" className="mt-10 inline-flex rounded-full bg-[var(--world-paper)] px-8 py-4 text-sm font-black text-[var(--world-ink)]">FRNT oeffnen</a>
      </section>
    </main>
  );
}