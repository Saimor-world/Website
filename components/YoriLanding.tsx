import { ArrowRight } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };
const RAW = 'https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene';
const ROOMS = [
  ['desk','Schreibtisch','Desk','Fokus für das, was heute zählt.','Focus for what matters today.'],
  ['workshop','Werkstatt','Workshop','Aus Ideen wird Material. Aus Material wird etwas Echtes.','Ideas become material. Material becomes something real.'],
  ['crew','Crew','Crew','Die richtigen Menschen und Hilfen zur richtigen Zeit.','The right people and support at the right time.'],
  ['cash','Cash','Cash','Das Geschäft hat seinen Platz, ohne die Ruhe zu verlieren.','Business has its place without taking over the calm.'],
] as const;

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';
  return (
    <main id="house" className="overflow-hidden bg-[#0b100d] text-[#eee7d8]">
      <section className="relative isolate min-h-[88svh] overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_68%,rgba(205,154,78,.16),transparent_26%),linear-gradient(180deg,#101712_0%,#0c120e_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] opacity-90 [background:linear-gradient(180deg,transparent,rgba(0,0,0,.36)),radial-gradient(circle_at_54%_70%,rgba(51,83,57,.22),transparent_35%)]" />
        <div className="absolute bottom-[10%] left-[-8%] h-[42%] w-[70%] rounded-[48%_52%_44%_56%/62%_48%_52%_38%] bg-[#121b14] shadow-[inset_-30px_-20px_80px_rgba(0,0,0,.38)]" />
        <div className="absolute bottom-[7%] right-[-14%] h-[28%] w-[68%] rounded-[50%] bg-[#101913] shadow-[inset_20px_10px_60px_rgba(0,0,0,.45)]" />
        <div className="absolute bottom-[8%] left-[38%] h-[18%] w-[38%] rounded-[50%] border border-[#9d7b45]/18 bg-[radial-gradient(circle_at_50%_45%,rgba(182,141,75,.14),rgba(8,14,10,.18)_68%)] shadow-[0_20px_80px_rgba(0,0,0,.34)]" />
        <div className="absolute bottom-[17%] left-[52%] h-8 w-8 rounded-full border border-[#c7a467]/30 bg-[#171f18] shadow-[0_0_26px_rgba(214,174,98,.10)]" />
        <div className="absolute bottom-[23%] right-[12%] h-[34%] w-[36%] border-l border-t border-[#b99962]/14 bg-[linear-gradient(135deg,rgba(89,58,35,.14),rgba(20,28,22,.02))]" />
        <div className="absolute bottom-[28%] right-[18%] h-[18%] w-[12%] rounded-t-[70%] bg-[#152017] shadow-[0_0_32px_rgba(45,74,52,.18)]" />
        <div className="absolute bottom-[30%] right-[20.5%] h-[10%] w-[7%] rounded-[50%] bg-[#223326]" />
        <div className="absolute bottom-[12%] right-[17%] h-[22%] w-px bg-[#b68d53]/16" />
        <div className="absolute bottom-[12%] right-[15.5%] h-7 w-7 rounded-sm border border-[#d1af73]/28 bg-[#b88a45]/10 shadow-[0_0_26px_rgba(216,167,87,.16)]" />

        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-between px-6 py-14 sm:px-10 lg:px-14">
          <div className="max-w-2xl pt-8 sm:pt-14">
            <div className="flex items-center gap-3 text-[#d9bd7a]">
              <YoriMark className="h-7 w-7" />
              <span className="font-mono text-[8px] font-bold tracking-[.3em]">YORI · 縁</span>
            </div>
            <h2 className="mt-7 max-w-3xl font-serif text-[clamp(3.2rem,8vw,6.7rem)] font-light leading-[.88] tracking-[-.05em] text-[#f5eedf]">
              {de ? <>Ein ruhiger Ort<br/>für <em className="font-light text-[#d5b36f]">laute Ideen.</em></> : <>A quiet place<br/>for <em className="font-light text-[#d5b36f]">loud ideas.</em></>}
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-6 text-white/56 sm:text-base sm:leading-7">
              {de ? 'YORI verbindet Signale, Ideen, Menschen und Arbeit an einem Ort. Nicht lauter. Sondern klarer.' : 'YORI brings signals, ideas, people and work into one place. Not louder. Clearer.'}
            </p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <a href="#rooms" className="group inline-flex items-center gap-3 rounded-full border border-[#dcc58f]/24 bg-[#111912]/60 px-5 py-3 text-xs font-semibold text-[#eee4cc] backdrop-blur-md transition hover:bg-[#171f18]">{de?'Haus ansehen':'See the house'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></a>
            <span className="hidden font-mono text-[7px] tracking-[.24em] text-white/28 sm:block">WOOD · WATER · STONE · QUIET</span>
          </div>
        </div>
      </section>

      <section id="rooms" className="border-b border-white/6 bg-[#111712] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="font-mono text-[8px] font-bold tracking-[.28em] text-[#c7a96e]/60">{de?'DAS HAUS':'THE HOUSE'}</p>
              <h2 className="mt-4 font-serif text-4xl font-light tracking-[-.04em] sm:text-6xl">{de?'Vier Räume. Ein Rhythmus.':'Four rooms. One rhythm.'}</h2>
            </div>
            <p className="hidden max-w-md text-sm leading-6 text-white/42 md:block">{de?'Jeder Raum hat eine Aufgabe. Zusammen fühlt es sich nicht wie Software an, sondern wie ein Ort.':'Each room has one purpose. Together it feels less like software and more like a place.'}</p>
          </div>

          <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
            {ROOMS.map(([slug,deName,enName,deText,enText],i)=>(
              <article key={slug} className="group relative w-[78vw] max-w-[420px] shrink-0 snap-start overflow-hidden rounded-[1.35rem] border border-[#c7a96e]/12 bg-[#171c17] shadow-[0_18px_60px_rgba(0,0,0,.18)] sm:w-[42vw] lg:w-[23%]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#141914]">
                  <img src={`${RAW}/rooms/room-${slug}.png`} alt="" className="h-full w-full object-cover opacity-75 saturate-[.78] brightness-[.82] transition duration-700 group-hover:scale-[1.02] group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(9,13,10,.36))]" />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="font-mono text-[7px] font-bold tracking-[.24em] text-[#cdb174]/54">0{i+1}</span>
                  <h3 className="mt-2 font-serif text-3xl font-light tracking-[-.03em] text-[#f2ebdd]">{de?deName:enName}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/46">{de?deText:enText}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#0d130f] px-6 py-20 sm:px-10 sm:py-24 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_30%,rgba(77,112,76,.10),transparent_28%),radial-gradient(circle_at_20%_72%,rgba(178,133,67,.08),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="font-mono text-[8px] font-bold tracking-[.28em] text-[#c7a96e]/58">MINA · DEMO</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-[.94] tracking-[-.04em] sm:text-6xl">{de?'Nicht mehr Apps. Mehr Zusammenhang.':'Fewer apps. More continuity.'}</h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/48 sm:text-base">{de?'Eine Frage aus der Community wird zum Thema auf dem Schreibtisch, dann zum Entwurf in der Werkstatt. Mina entscheidet. YORI hält den Faden zusammen.':'A community question becomes a desk item, then a draft in the workshop. Mina decides. YORI keeps the thread together.'}</p>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#121813] p-7 shadow-[0_24px_80px_rgba(0,0,0,.22)] sm:p-9">
            <div className="absolute inset-0 opacity-35 [background:linear-gradient(135deg,transparent_0_56%,rgba(180,139,75,.06)_56%_57%,transparent_57%),radial-gradient(circle_at_72%_28%,rgba(52,92,61,.18),transparent_26%)]" />
            <div className="relative space-y-7">
              {[[de?'Draußen':'Outside',de?'Frage taucht wiederholt auf.':'A question keeps appearing.'],[de?'Schreibtisch':'Desk',de?'Nur das Relevante kommt rein.':'Only what matters comes in.'],[de?'Werkstatt':'Workshop',de?'Aus dem Signal wird etwas Konkretes.':'The signal becomes something concrete.'],[de?'Freigabe':'Approval',de?'Mina entscheidet.':'Mina decides.']].map(([title,text],i)=><div key={title} className="grid grid-cols-[28px_1fr] gap-4 border-b border-white/7 pb-6 last:border-0 last:pb-0"><span className="font-mono text-[7px] tracking-[.2em] text-[#c6a96e]/46">0{i+1}</span><div><h3 className="font-serif text-2xl font-light text-[#efe8db]">{title}</h3><p className="mt-1 text-sm leading-6 text-white/40">{text}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[66svh] overflow-hidden border-t border-white/6 bg-[#111710]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_78%,rgba(191,147,73,.10),transparent_24%),linear-gradient(180deg,#111710,#0a0f0c)]" />
        <div className="absolute bottom-[14%] left-1/2 h-[18%] w-[56%] -translate-x-1/2 rounded-[50%] border border-[#9f7c49]/16 bg-[#101610]" />
        <div className="absolute bottom-[19%] left-[48%] h-10 w-10 rounded-full border border-[#cab07a]/22 bg-[#171f18]" />
        <div className="relative mx-auto flex min-h-[66svh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
          <YoriMark className="h-11 w-11 text-[#d7bb7a]" />
          <p className="mt-5 font-mono text-[8px] font-bold tracking-[.28em] text-[#d7bb7a]/58">YORI · PRIVATE PREVIEW</p>
          <h2 className="mt-4 font-serif text-[clamp(3rem,7vw,5.5rem)] font-light leading-[.9] tracking-[-.045em] text-[#f3ecdf]">{de?'Komm rein.':'Come inside.'}</h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/44">{de?'Die Demo ist simuliert. Das Haus, die Räume und der Ablauf sind die Richtung.':'The demo is simulated. The house, rooms and flow are the direction.'}</p>
          <a href="https://yori.saimor.world" className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#d7bb7a]/22 bg-[#d9c18e]/90 px-6 py-3 text-sm font-bold text-[#18251d] transition hover:bg-[#ead5a4]">{de?'Haus betreten':'Enter the house'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></a>
        </div>
      </section>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </main>
  );
}
