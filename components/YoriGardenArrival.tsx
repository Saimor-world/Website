import Link from 'next/link';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

const GARDEN = 'https://yori-pm0i.onrender.com/scene/outside-golden-hour.png';

export default function YoriGardenArrival({ locale }: { locale: 'de' | 'en' }) {
  const de = locale === 'de';
  const home = de ? '/de' : '/en';

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0a120e] text-[#f4eddb]">
      <div className="yori-garden absolute inset-0 bg-cover bg-[58%_50%] sm:bg-center" style={{ backgroundImage: `url(${GARDEN})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,7,.18),rgba(5,10,7,.04)_44%,rgba(5,10,7,.72)),linear-gradient(90deg,rgba(5,10,7,.46),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 border-r border-[#eadfca]/10 bg-[#21170f]/45 sm:w-14" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 border-l border-[#eadfca]/10 bg-[#21170f]/38 sm:w-14" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-8 pt-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between">
          <Link href={home} className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[.18em] text-white/50 transition hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> {de ? 'WALD' : 'FOREST'}
          </Link>
          <span className="font-mono text-[8px] tracking-[.22em] text-white/40">SAIMÔR / ?</span>
        </header>

        <div className="flex flex-1 items-center justify-center pb-10 pt-14 text-center">
          <div className="yori-reveal max-w-3xl">
            <YoriMark className="mx-auto h-12 w-12 text-[#e5cc8b] sm:h-14 sm:w-14" />
            <p className="mt-5 font-mono text-[9px] font-bold tracking-[.32em] text-[#e5cc8b]/78">YORI · 縁</p>
            <h1 className="mt-5 font-serif text-[clamp(3rem,8vw,6.8rem)] font-light leading-[.9] tracking-[-.045em] text-[#fff8e8]">
              {de ? <>Ein Haus für das,<br/><em className="font-light text-[#e4c984]">was du aufbaust.</em></> : <>A house for<br/><em className="font-light text-[#e4c984]">what you are building.</em></>}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
              {de ? 'Nicht noch ein Dashboard. Ein ruhiger Ort, an dem Arbeit ihren Platz bekommt.' : 'Not another dashboard. A quiet place where work gets a place of its own.'}
            </p>
          </div>
        </div>

        <a href="#house" className="mx-auto flex flex-col items-center gap-2 font-mono text-[8px] tracking-[.2em] text-white/48 transition hover:text-white/80">
          <span>{de ? 'INS HAUS' : 'ENTER THE HOUSE'}</span>
          <ArrowDown className="path-arrow h-4 w-4" />
        </a>
      </div>

      <style>{`
        @keyframes gardenIn { from { transform:scale(1.09); filter:saturate(.8) brightness(.8); } to { transform:scale(1.025); filter:saturate(1) brightness(.98); } }
        @keyframes reveal { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        @keyframes arrow { 0%,100% { transform:translateY(0); opacity:.45; } 50% { transform:translateY(5px); opacity:1; } }
        .yori-garden { transform:scale(1.025); animation:gardenIn 1.8s cubic-bezier(.2,.8,.2,1) both; }
        .yori-reveal { animation:reveal .9s ease .22s both; }
        .path-arrow { animation:arrow 2s ease-in-out infinite; }
        @media(prefers-reduced-motion:reduce){.yori-garden,.yori-reveal,.path-arrow{animation:none!important}}
      `}</style>
    </section>
  );
}
