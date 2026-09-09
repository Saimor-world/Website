import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

const GARDEN = 'https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene/outside-golden-hour.png';

export default function YoriGardenArrival({ locale }: { locale: 'de' | 'en' }) {
  const de = locale === 'de';
  const home = de ? '/de' : '/en';

  return (
    <section className="yori-arrival relative min-h-[100svh] overflow-hidden bg-[#16251d] text-[#f6f0df]">
      <div className="yori-garden absolute inset-0 scale-[1.035] bg-cover bg-center" style={{ backgroundImage: `url(${GARDEN})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,22,17,.76)_0%,rgba(11,22,17,.46)_42%,rgba(11,22,17,.16)_72%,rgba(11,22,17,.32)_100%),linear-gradient(180deg,rgba(8,17,13,.34),transparent_38%,rgba(7,14,11,.48))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(248,213,142,.14),transparent_25%),radial-gradient(circle_at_15%_75%,rgba(74,122,84,.15),transparent_32%)]" />

      <div className="shoji-left pointer-events-none absolute inset-y-0 left-0 w-[12%] border-r border-[#e7ddc4]/18 bg-[linear-gradient(90deg,rgba(34,25,18,.76),rgba(63,43,28,.38))] shadow-[22px_0_70px_rgba(0,0,0,.18)] sm:w-[9%]" />
      <div className="shoji-right pointer-events-none absolute inset-y-0 right-0 w-[12%] border-l border-[#e7ddc4]/18 bg-[linear-gradient(270deg,rgba(34,25,18,.76),rgba(63,43,28,.38))] shadow-[-22px_0_70px_rgba(0,0,0,.18)] sm:w-[9%]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(244,235,216,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(244,235,216,.13)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:linear-gradient(90deg,black,transparent_22%,transparent_78%,black)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-10 pt-7 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between border-b border-white/12 pb-4">
          <Link href={home} className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.18em] text-white/52 transition hover:text-white/88">
            <ArrowLeft className="h-3.5 w-3.5" /> {de ? 'zurück' : 'back'}
          </Link>
          <span className="font-mono text-[8px] font-bold tracking-[.2em] text-[#efd797]/72">PRIVATE PREVIEW · YORI</span>
        </div>

        <div className="grid flex-1 items-center py-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="yori-copy relative z-10 max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-[#efe5ca]/22 bg-[#e8dfc9]/10 text-[#e9d595] backdrop-blur-md">
                <YoriMark className="h-9 w-9" />
              </div>
              <div>
                <div className="text-xl font-semibold tracking-[.14em]">YORI</div>
                <div className="mt-1 font-mono text-[8px] tracking-[.22em] text-[#ead89c]/68">縁 · CREATE IN FLOW</div>
              </div>
            </div>

            <p className="font-mono text-[9px] font-bold tracking-[.24em] text-[#d9c383]/82">CREATIVE HOUSE</p>
            <h1 className="mt-5 font-serif text-[clamp(4rem,9vw,8.4rem)] font-light leading-[.82] tracking-[-.055em] text-[#fff9e9]">
              {de ? 'Du baust dir' : "You're building"}<br />
              <em className="font-light text-[#e5c785]">{de ? 'etwas Eigenes auf.' : 'something of your own.'}</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#f0eadb]/68 sm:text-lg sm:leading-8">
              {de
                ? 'Content, Ideen, Nachrichten, Material, Kooperationen, Website, Geld — irgendwann liegt alles gleichzeitig auf deinem Tisch. YORI gibt dieser Arbeit ein Zuhause.'
                : 'Content, ideas, messages, assets, collaborations, website, money — eventually everything lands on your desk at once. YORI gives that work a home.'}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="https://yori.saimor.world" className="group inline-flex items-center gap-3 rounded-full bg-[#ece3c8] px-7 py-3.5 text-sm font-bold text-[#203c31] shadow-[0_16px_45px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5 hover:bg-[#fff7df]">
                {de ? 'Haus betreten' : 'Enter the house'}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#house" className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-black/10 px-7 py-3.5 text-sm font-semibold text-white/78 backdrop-blur-sm transition hover:bg-black/20 hover:text-white">
                {de ? 'Räume ansehen' : 'See the rooms'}<ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
          <span className="font-serif text-sm italic text-white/44">Create in Flow.</span>
          <span className="font-mono text-[8px] tracking-[.18em] text-white/34">{de ? 'JAPANISCHER GARTEN / EINGANG' : 'JAPANESE GARDEN / ENTRY'}</span>
        </div>
      </div>

      <style>{`
        @keyframes yoriGardenSettle { from { transform: scale(1.08); filter: saturate(.88) brightness(.9); } to { transform: scale(1.035); filter: saturate(1) brightness(1); } }
        @keyframes yoriShojiLeft { from { transform: translateX(34%); } to { transform: translateX(0); } }
        @keyframes yoriShojiRight { from { transform: translateX(-34%); } to { transform: translateX(0); } }
        @keyframes yoriCopyIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .yori-garden { animation: yoriGardenSettle 1.2s cubic-bezier(.2,.8,.2,1) both; }
        .shoji-left { animation: yoriShojiLeft .8s cubic-bezier(.2,.8,.2,1) both; }
        .shoji-right { animation: yoriShojiRight .8s cubic-bezier(.2,.8,.2,1) both; }
        .yori-copy { animation: yoriCopyIn .7s ease .18s both; }
        @media (prefers-reduced-motion: reduce) { .yori-garden,.shoji-left,.shoji-right,.yori-copy { animation: none !important; } }
      `}</style>
    </section>
  );
}
