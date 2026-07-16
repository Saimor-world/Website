import type { Metadata } from "next";
import Image from "next/image";
import FrntSection from "@/components/FrntSection";

export const metadata: Metadata = {
  title: "FRNT — Creator Operating Tool by Saimôr",
  description: "Signale, Clips, Creator-Agenten und Umsatz in einem Operating Tool.",
};

export default function FrntPage() {
  return (
    <main className="min-h-screen bg-[#101326] text-[#f4f0ff]">
      <section className="relative flex min-h-[82vh] items-center overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(200,188,255,.16),transparent_34%),radial-gradient(circle_at_20%_85%,rgba(231,196,106,.10),transparent_32%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[.24em] text-[#6fe3ff]">CREATOR OPERATING TOOL / 01</p>
            <h1 className="mt-7 text-[clamp(5rem,15vw,12rem)] font-black leading-[.72] tracking-[-.1em]">FRNT</h1>
            <p className="mt-8 text-sm font-bold tracking-[.25em] text-[#E7C46A]">BY SAIMÔR</p>
            <p className="mt-10 max-w-2xl text-2xl leading-tight tracking-[-.03em] text-white/72 md:text-4xl">Make it. Move it. Own it.</p>
          </div>
          <Image src="/frnt-mark.png" alt="FRNT mark" width={720} height={720} priority className="w-full rounded-[2.5rem] border border-white/10 shadow-[0_50px_160px_rgba(200,188,255,.20)]" />
        </div>
      </section>
      <FrntSection locale="de" />
      <section className="border-t border-white/10 px-6 py-28 text-center">
        <p className="font-mono text-[10px] font-bold tracking-[.2em] text-[#6fe3ff]">PRIVATE BETA</p>
        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-medium tracking-[-.05em] md:text-7xl">Baue deinen nächsten Clip nicht allein.</h2>
        <a href="https://frnt.saimor.world" className="mt-10 inline-flex rounded-full bg-[#F5F2FF] px-8 py-4 text-sm font-black text-[#101326]">FRNT öffnen</a>
      </section>
    </main>
  );
}