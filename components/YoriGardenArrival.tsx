import Link from 'next/link';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import YoriMark from '@/components/YoriMark';
import YoriAmbientGarden from '@/components/YoriAmbientGarden';

export default function YoriGardenArrival({ locale }: { locale: 'de' | 'en' }) {
  const de = locale === 'de';
  const home = de ? '/de' : '/en';

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0a120e] text-[#f4eddb]">
      <YoriAmbientGarden />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 border-r border-[#eadfca]/8 bg-[#21170f]/28 sm:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 border-l border-[#eadfca]/8 bg-[#21170f]/24 sm:w-12" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-8 pt-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between">
          <Link href={home} className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[.18em] text-white/50 transition hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> {de ? 'WALD' : 'FOREST'}
          </Link>
          <span className="font-mono text-[8px] tracking-[.22em] text-white/40">SAIMÔR / ?</span>
        </header>

        <div className="flex flex-1 items-end pb-[19vh] pt-16 sm:pb-[16vh]">
          <div className="yori-reveal max-w-xl">
            <div className="flex items-center gap-3 text-[#e4c984]">
              <YoriMark className="h-8 w-8" />
              <span className="font-mono text-[8px] font-bold tracking-[.3em]">YORI · 縁</span>
            </div>
            <h1 className="mt-5 max-w-xl font-serif text-[clamp(2.9rem,7.6vw,6rem)] font-light leading-[.9] tracking-[-.045em] text-[#fff7e5]">
              {de ? <>Ein Haus für das,<br/><em className="font-light text-[#e2c17b]">was du aufbaust.</em></> : <>A house for<br/><em className="font-light text-[#e2c17b]">what you are building.</em></>}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/58 sm:text-base sm:leading-7">
              {de ? 'Ein ruhiger Ort für Ideen, Arbeit und die Menschen darum herum.' : 'A quiet place for ideas, work and the people around it.'}
            </p>
          </div>
        </div>

        <a href="#house" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[8px] tracking-[.2em] text-white/48 transition hover:text-white/80">
          <span>{de ? 'INS HAUS' : 'ENTER THE HOUSE'}</span>
          <ArrowDown className="path-arrow h-4 w-4" />
        </a>
      </div>

      <style>{`
        @keyframes reveal { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        @keyframes arrow { 0%,100% { transform:translateY(0); opacity:.45; } 50% { transform:translateY(5px); opacity:1; } }
        .yori-reveal { animation:reveal .9s ease .2s both; }
        .path-arrow { animation:arrow 2s ease-in-out infinite; }
        @media(prefers-reduced-motion:reduce){.yori-reveal,.path-arrow{animation:none!important}}
      `}</style>
    </section>
  );
}
