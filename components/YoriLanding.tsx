import { ArrowRight } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };
const BASE = 'https://yori-pm0i.onrender.com/scene';
const ROOMS = [
  ['desk','Schreibtisch','Desk','Was heute wirklich dich braucht.','Only what genuinely needs you today.'],
  ['workshop','Werkstatt','Workshop','Hier werden Ideen zu Arbeit.','This is where ideas become work.'],
  ['crew','Crew','Crew','Unterstützung hat einen sichtbaren Platz.','Support has a visible place.'],
  ['cash','Cash','Cash','Das Geschäft gehört dazu — ruhig, nicht dominant.','Business belongs here — calm, not dominant.'],
] as const;

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';

  return (
    <main id="house" className="overflow-hidden bg-[#0c1510] text-[#f5efdf]">
      <section className="relative px-6 pb-12 pt-16 sm:px-10 sm:pb-16 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="font-mono text-[9px] font-bold tracking-[.28em] text-[#dfc681]/68">{de?'DAS HAUS':'THE HOUSE'}</p>
              <h2 className="mt-4 font-serif text-[clamp(3rem,7vw,6rem)] font-light leading-[.9] tracking-[-.045em]">{de?'Vier Räume. Ein Zusammenhang.':'Four rooms. One connected flow.'}</h2>
            </div>
            <p className="hidden max-w-md text-sm leading-6 text-white/48 md:block">{de?'Du springst nicht zwischen Tools. Arbeit bewegt sich durchs Haus.':'You do not jump between tools. Work moves through the house.'}</p>
          </div>
        </div>
      </section>

      <section className="pb-14 sm:pb-20">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-1500px)/2))]">
          {ROOMS.map(([slug,deName,enName,deText,enText],i)=>(
            <article key={slug} className="group relative min-h-[68svh] w-[86vw] max-w-[760px] shrink-0 snap-center overflow-hidden rounded-[2px] border border-white/10 bg-black sm:w-[72vw] lg:w-[52vw]">
              <div className="absolute inset-0 bg-cover bg-center transition duration-[1200ms] group-hover:scale-[1.015]" style={{backgroundImage:`url(${BASE}/rooms/room-${slug}.png)`}} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,7,.02)_20%,rgba(5,10,7,.18)_55%,rgba(5,10,7,.82))]" />
              <div className="relative flex min-h-[68svh] flex-col justify-end p-6 sm:p-9 lg:p-11">
                <span className="font-mono text-[8px] font-bold tracking-[.24em] text-[#e1c77f]/72">0{i+1} / {de?deName.toUpperCase():enName.toUpperCase()}</span>
                <h3 className="mt-3 font-serif text-[clamp(2.8rem,7vw,5.8rem)] font-light leading-[.88] tracking-[-.045em] text-[#fff8e7]">{de?deName:enName}</h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-white/62 sm:text-base">{de?deText:enText}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between px-6 font-mono text-[8px] tracking-[.18em] text-white/30 sm:px-10 lg:px-14">
          <span>{de?'WISCHEN':'SWIPE'}</span><span>01 — 04</span>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#142019] px-6 py-20 sm:px-10 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div>
              <p className="font-mono text-[9px] font-bold tracking-[.28em] text-[#dfc681]/64">{de?'DRAUSSEN → DRINNEN':'OUTSIDE → INSIDE'}</p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-[.94] tracking-[-.04em] sm:text-6xl">{de?'Nicht alles darf ins Haus.':'Not everything gets to enter.'}</h2>
            </div>
            <div className="space-y-8 border-l border-[#dfc681]/18 pl-6 sm:pl-8">
              <div><span className="font-mono text-[8px] tracking-[.2em] text-white/34">01</span><h3 className="mt-2 font-serif text-2xl font-light">{de?'Signal':'Signal'}</h3><p className="mt-2 text-sm leading-6 text-white/50">{de?'Eine wiederkehrende Frage unter Minas Videos fällt auf.':'A recurring question under Mina’s videos stands out.'}</p></div>
              <div><span className="font-mono text-[8px] tracking-[.2em] text-white/34">02</span><h3 className="mt-2 font-serif text-2xl font-light">{de?'Schreibtisch':'Desk'}</h3><p className="mt-2 text-sm leading-6 text-white/50">{de?'Nur der relevante Zusammenhang landet bei ihr.':'Only the relevant context lands with her.'}</p></div>
              <div><span className="font-mono text-[8px] tracking-[.2em] text-white/34">03</span><h3 className="mt-2 font-serif text-2xl font-light">{de?'Werkstatt':'Workshop'}</h3><p className="mt-2 text-sm leading-6 text-white/50">{de?'Aus der Entscheidung werden Briefing, Material und Entwurf.':'The decision becomes a brief, material and a draft.'}</p></div>
              <div><span className="font-mono text-[8px] tracking-[.2em] text-white/34">04</span><h3 className="mt-2 font-serif text-2xl font-light">{de?'Freigabe':'Approval'}</h3><p className="mt-2 text-sm leading-6 text-white/50">{de?'Nichts geht raus, bevor Mina es gesehen hat.':'Nothing leaves before Mina has seen it.'}</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[78svh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${BASE}/outside-golden-hour.png)`}} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,10,.28),rgba(8,14,10,.70))]" />
        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
          <YoriMark className="h-12 w-12 text-[#e7cf8c]" />
          <p className="mt-5 font-mono text-[9px] font-bold tracking-[.28em] text-[#e7cf8c]/70">YORI · PRIVATE PREVIEW</p>
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,7vw,6rem)] font-light leading-[.9] tracking-[-.045em] text-[#fff8e8]">{de?'Jetzt ins Haus.':'Enter the house.'}</h2>
          <p className="mt-5 max-w-lg text-sm leading-6 text-white/56 sm:text-base">{de?'Die Demo-Daten gehören Mina. Die Räume, der Ablauf und das Gefühl sind YORI.':'The demo data belongs to Mina. The rooms, flow and feeling are YORI.'}</p>
          <a href="https://yori.saimor.world" className="group mt-8 inline-flex items-center gap-3 border border-[#f0dfb4]/30 bg-[#ead9ad]/92 px-7 py-3.5 text-sm font-bold text-[#173129] transition hover:bg-[#fff1cc]">{de?'Schiebetür öffnen':'Open the sliding door'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></a>
        </div>
      </section>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </main>
  );
}
