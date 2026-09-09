import Link from 'next/link';
import { ArrowLeft, ArrowRight, Circle } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

const GARDEN = 'https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene/outside-golden-hour.png';

export default function YoriGardenArrival({ locale }: { locale: 'de' | 'en' }) {
  const de = locale === 'de';
  const home = de ? '/de' : '/en';
  const rooms = de
    ? [
        ['01', 'Schreibtisch', 'Entscheiden'],
        ['02', 'Werkstatt', 'Machen'],
        ['03', 'Crew', 'Unterstützen'],
        ['04', 'Cash', 'Verstehen'],
      ]
    : [
        ['01', 'Desk', 'Decide'],
        ['02', 'Workshop', 'Make'],
        ['03', 'Crew', 'Support'],
        ['04', 'Cash', 'Understand'],
      ];

  return (
    <section className="yori-arrival relative min-h-[100svh] overflow-hidden bg-[#0c1712] text-[#f6f0df]">
      <div className="yori-garden absolute inset-0 scale-[1.06] bg-cover bg-[62%_50%] sm:bg-center" style={{ backgroundImage: `url(${GARDEN})` }} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,14,10,.91)_0%,rgba(8,16,12,.73)_28%,rgba(8,17,12,.28)_58%,rgba(8,17,12,.08)_78%,rgba(7,14,10,.36)_100%),linear-gradient(180deg,rgba(5,10,8,.36),transparent_42%,rgba(5,10,8,.64))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_38%,rgba(244,205,128,.18),transparent_22%),radial-gradient(circle_at_24%_80%,rgba(55,112,79,.22),transparent_30%)]" />
      <div className="yori-grain pointer-events-none absolute inset-0 opacity-[.11] [background-image:radial-gradient(rgba(255,255,255,.7)_0.5px,transparent_.7px)] [background-size:5px_5px]" />

      <div className="shoji-left pointer-events-none absolute inset-y-0 left-0 w-[9%] border-r border-[#e7ddc4]/14 bg-[linear-gradient(90deg,rgba(29,21,15,.88),rgba(63,43,28,.34))] shadow-[26px_0_80px_rgba(0,0,0,.24)] sm:w-[7%]" />
      <div className="shoji-right pointer-events-none absolute inset-y-0 right-0 w-[9%] border-l border-[#e7ddc4]/14 bg-[linear-gradient(270deg,rgba(29,21,15,.88),rgba(63,43,28,.30))] shadow-[-26px_0_80px_rgba(0,0,0,.24)] sm:w-[7%]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(244,235,216,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(244,235,216,.13)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:linear-gradient(90deg,black,transparent_20%,transparent_80%,black)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-5 pb-8 pt-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link href={home} className="inline-flex items-center gap-2 font-mono text-[9px] font-semibold tracking-[.18em] text-white/46 transition hover:text-white/88">
            <ArrowLeft className="h-3.5 w-3.5" /> {de ? 'zurück in den Wald' : 'back to the forest'}
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[8px] tracking-[.18em] text-white/32 sm:inline">SAIMÔR / HIDDEN WORLD</span>
            <span className="rounded-full border border-[#efd797]/22 bg-black/10 px-3 py-1.5 font-mono text-[8px] font-bold tracking-[.2em] text-[#efd797]/78 backdrop-blur-sm">YORI · PRIVATE PREVIEW</span>
          </div>
        </div>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[.93fr_1.07fr] lg:py-8">
          <div className="yori-copy relative z-10 max-w-[760px]">
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-[#efe5ca]/18 bg-[#e8dfc9]/8 text-[#e9d595] shadow-[0_14px_55px_rgba(0,0,0,.2)] backdrop-blur-md">
                <YoriMark className="h-9 w-9" />
              </div>
              <div>
                <div className="text-lg font-semibold tracking-[.18em]">YORI</div>
                <div className="mt-1 font-mono text-[8px] tracking-[.24em] text-[#ead89c]/66">縁 · CREATIVE HOUSE</div>
              </div>
            </div>

            <p className="font-mono text-[9px] font-bold tracking-[.28em] text-[#d9c383]/76">{de ? 'EINE ANDERE ART ZU ARBEITEN' : 'A DIFFERENT WAY TO WORK'}</p>
            <h1 className="mt-5 font-serif text-[clamp(4.4rem,8.8vw,9rem)] font-light leading-[.79] tracking-[-.062em] text-[#fff9e9]">
              {de ? 'Nicht noch' : 'Not another'}<br />
              <em className="font-light text-[#e5c785]">{de ? 'eine App.' : 'app.'}</em>
            </h1>
            <p className="mt-7 max-w-[600px] text-base leading-7 text-[#f0eadb]/67 sm:text-lg sm:leading-8">
              {de
                ? 'YORI ist ein Haus für die Arbeit, die entsteht, wenn aus Content langsam etwas Eigenes wird. Signale kommen von draußen. Entscheidungen landen auf deinem Tisch. Ideen werden in der Werkstatt zu etwas Echtem.'
                : 'YORI is a house for the work that appears when content slowly becomes something of your own. Signals arrive from outside. Decisions land on your desk. Ideas become real in the workshop.'}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="https://yori.saimor.world" className="group inline-flex items-center gap-3 rounded-full bg-[#efe5c9] px-7 py-3.5 text-sm font-bold text-[#18382f] shadow-[0_18px_50px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:bg-[#fff6dc]">
                {de ? 'Haus betreten' : 'Enter the house'}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#house" className="inline-flex items-center gap-2 rounded-full border border-white/17 bg-black/10 px-6 py-3.5 text-sm font-semibold text-white/68 backdrop-blur-sm transition hover:border-white/26 hover:bg-black/20 hover:text-white">
                {de ? 'Erst verstehen' : 'Understand first'}<ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-11 grid max-w-[650px] grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-5 sm:grid-cols-4">
              {rooms.map(([number, room, verb]) => (
                <div key={room} className="group">
                  <span className="font-mono text-[7px] font-bold tracking-[.18em] text-[#e3c985]/40">{number}</span>
                  <p className="mt-1 text-sm font-medium text-white/78">{room}</p>
                  <small className="font-mono text-[8px] tracking-[.1em] text-white/34">{verb}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[620px] lg:block">
            <div className="yori-path absolute left-[54%] top-[8%] h-[72%] w-[1px] bg-gradient-to-b from-transparent via-[#efd797]/28 to-transparent" />
            <div className="absolute right-[4%] top-[9%] [writing-mode:vertical-rl] font-serif text-[4.6rem] font-light tracking-[.12em] text-white/[.055]">余白</div>

            <div className="yori-orbit absolute left-[44%] top-[24%] h-56 w-56 rounded-full border border-[#efd797]/12" />
            <div className="yori-orbit yori-orbit-b absolute left-[51%] top-[31%] h-32 w-32 rounded-full border border-white/10" />
            <div className="absolute left-[56%] top-[40%] grid h-3 w-3 place-items-center rounded-full border border-[#f0d58f]/35 bg-[#f0d58f]/12 shadow-[0_0_28px_rgba(240,213,143,.36)]"><Circle className="h-1.5 w-1.5 fill-[#f0d58f]/70 text-transparent" /></div>

            <div className="absolute bottom-[14%] left-[7%] max-w-[320px] border-l border-[#efd797]/18 pl-5">
              <span className="font-mono text-[8px] font-bold tracking-[.22em] text-[#e9ce8b]/70">{de ? 'DRAUSSEN → DRINNEN' : 'OUTSIDE → INSIDE'}</span>
              <p className="mt-3 font-serif text-3xl font-light leading-tight text-white/84">
                {de ? 'Die Welt bleibt laut. Das Haus nicht.' : 'The world stays loud. The house does not.'}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/42">
                {de ? 'TikTok, Instagram, Mail, Kalender, Drive, Kooperationen. YORI soll nicht alles zeigen — nur den nächsten sinnvollen Schritt.' : 'TikTok, Instagram, mail, calendar, Drive, collaborations. YORI should not show everything — only the next meaningful step.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-white/10 pt-4">
          <span className="font-serif text-sm italic text-white/40">Create in Flow.</span>
          <div className="flex items-center gap-3 font-mono text-[8px] tracking-[.18em] text-white/30">
            <span>{de ? 'JAPANISCHER GARTEN / EINGANG' : 'JAPANESE GARDEN / ENTRY'}</span>
            <span className="h-1 w-1 rounded-full bg-[#e4c983]/50" />
            <span>{de ? 'SCROLLEN ZUM HAUS' : 'SCROLL TO THE HOUSE'}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes yoriGardenSettle { from { transform: scale(1.12); filter: saturate(.8) brightness(.78); } to { transform: scale(1.06); filter: saturate(.96) brightness(.94); } }
        @keyframes yoriShojiLeft { from { transform: translateX(52%); } to { transform: translateX(0); } }
        @keyframes yoriShojiRight { from { transform: translateX(-52%); } to { transform: translateX(0); } }
        @keyframes yoriCopyIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes yoriOrbit { from { transform: rotate(0deg) scale(.98); } to { transform: rotate(360deg) scale(1.02); } }
        @keyframes yoriPath { 0%,100% { opacity:.25; } 50% { opacity:.75; } }
        .yori-garden { animation: yoriGardenSettle 1.7s cubic-bezier(.2,.8,.2,1) both; }
        .shoji-left { animation: yoriShojiLeft 1s cubic-bezier(.2,.8,.2,1) both; }
        .shoji-right { animation: yoriShojiRight 1s cubic-bezier(.2,.8,.2,1) both; }
        .yori-copy { animation: yoriCopyIn .9s ease .18s both; }
        .yori-orbit { animation: yoriOrbit 28s linear infinite; }
        .yori-orbit-b { animation-duration: 19s; animation-direction: reverse; }
        .yori-path { animation: yoriPath 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .yori-garden,.shoji-left,.shoji-right,.yori-copy,.yori-orbit,.yori-path { animation: none !important; } }
      `}</style>
    </section>
  );
}
