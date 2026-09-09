import Link from 'next/link';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

const GARDEN = 'https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene/outside-golden-hour.png';

export default function YoriGardenArrival({ locale }: { locale: 'de' | 'en' }) {
  const de = locale === 'de';
  const home = de ? '/de' : '/en';

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0a120e] text-[#f4eddb]">
      <div className="yori-garden absolute inset-0 bg-cover bg-[62%_50%] sm:bg-center" style={{ backgroundImage: `url(${GARDEN})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,7,.20),rgba(5,10,7,.02)_35%,rgba(5,10,7,.66)_100%),linear-gradient(90deg,rgba(5,11,8,.58),transparent_48%,rgba(5,11,8,.18))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(246,203,119,.18),transparent_20%),radial-gradient(circle_at_25%_75%,rgba(48,105,71,.22),transparent_32%)]" />

      <div className="shoji pointer-events-none absolute inset-y-0 left-0 w-[7vw] min-w-10 border-r border-[#eadfca]/12 bg-[linear-gradient(90deg,rgba(31,22,15,.92),rgba(63,43,28,.30))] shadow-[30px_0_80px_rgba(0,0,0,.22)]" />
      <div className="shoji-r pointer-events-none absolute inset-y-0 right-0 w-[7vw] min-w-10 border-l border-[#eadfca]/12 bg-[linear-gradient(270deg,rgba(31,22,15,.92),rgba(63,43,28,.26))] shadow-[-30px_0_80px_rgba(0,0,0,.22)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[18vh] border-t border-[#e9ddc2]/8 bg-[linear-gradient(180deg,rgba(44,30,19,.12),rgba(26,18,12,.58))] backdrop-blur-[1px]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-7 pt-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between">
          <Link href={home} className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[.18em] text-white/46 transition hover:text-white/85">
            <ArrowLeft className="h-3.5 w-3.5" /> {de ? 'WALD' : 'FOREST'}
          </Link>
          <span className="font-mono text-[8px] tracking-[.22em] text-white/38">SAIMÔR / ?</span>
        </header>

        <div className="flex flex-1 items-end pb-[18vh] sm:pb-[16vh]">
          <div className="yori-reveal max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-[#e7cf91]">
              <YoriMark className="h-8 w-8" />
              <span className="font-mono text-[9px] font-bold tracking-[.28em]">YORI · 縁</span>
            </div>
            <h1 className="font-serif text-[clamp(3.7rem,8vw,7.8rem)] font-light leading-[.84] tracking-[-.055em] text-[#fff8e8]">
              {de ? <>Du hast einen<br/><em className="font-light text-[#e4c984]">anderen Teil</em><br/>gefunden.</> : <>You found<br/><em className="font-light text-[#e4c984]">another part</em><br/>of the world.</>}
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-6 text-white/58 sm:text-base sm:leading-7">
              {de ? 'Für Menschen, die aus Ideen, Content und Community etwas Eigenes bauen.' : 'For people building something of their own from ideas, content and community.'}
            </p>
          </div>
        </div>

        <a href="#house" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[8px] tracking-[.2em] text-white/48 transition hover:text-white/80">
          <span>{de ? 'DEM PFAD FOLGEN' : 'FOLLOW THE PATH'}</span>
          <ArrowDown className="path-arrow h-4 w-4" />
        </a>
        <span className="absolute bottom-7 right-6 hidden font-serif text-sm italic text-white/32 sm:block sm:right-10 lg:right-14">Create in Flow.</span>
      </div>

      <style>{`
        @keyframes gardenIn { from { transform:scale(1.1); filter:saturate(.72) brightness(.72); } to { transform:scale(1.035); filter:saturate(1) brightness(.96); } }
        @keyframes reveal { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        @keyframes shojiL { from { transform:translateX(75%); } to { transform:none; } }
        @keyframes shojiR { from { transform:translateX(-75%); } to { transform:none; } }
        @keyframes arrow { 0%,100% { transform:translateY(0); opacity:.45; } 50% { transform:translateY(6px); opacity:1; } }
        .yori-garden { transform:scale(1.035); animation:gardenIn 2.2s cubic-bezier(.2,.8,.2,1) both; }
        .yori-reveal { animation:reveal 1s ease .45s both; }
        .shoji { animation:shojiL 1.25s cubic-bezier(.2,.8,.2,1) both; }
        .shoji-r { animation:shojiR 1.25s cubic-bezier(.2,.8,.2,1) both; }
        .path-arrow { animation:arrow 2s ease-in-out infinite; }
        @media(prefers-reduced-motion:reduce){.yori-garden,.yori-reveal,.shoji,.shoji-r,.path-arrow{animation:none!important}}
      `}</style>
    </section>
  );
}
