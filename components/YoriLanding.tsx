import { ArrowRight } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };
const RAW = 'https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene';
const ROOMS = [
  ['desk','Schreibtisch','Desk','Was heute wirklich dich braucht.','Only what genuinely needs you today.'],
  ['workshop','Werkstatt','Workshop','Wo Signale, Ideen und Material zu etwas Fertigem werden.','Where signals, ideas and material become something finished.'],
  ['crew','Crew','Crew','Unterstützung erscheint erst, wenn sie wirklich Arbeit trägt.','Support appears only when it is genuinely carrying work.'],
  ['cash','Cash','Cash','Das Geschäft hat seinen Platz, ohne das Haus zu übernehmen.','The business has its place without taking over the house.'],
] as const;

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';
  const sources = de ? ['TikTok','Instagram','Mail','Kalender','Drive','Cash'] : ['TikTok','Instagram','Mail','Calendar','Drive','Cash'];
  const flow = de
    ? [['01','Draußen','Eine Frage taucht wiederholt unter Minas Videos auf.'],['02','Schreibtisch','YORI bringt nur den relevanten Faden ins Haus.'],['03','Werkstatt','Aus der Entscheidung werden Briefing, Material und Entwurf.'],['04','Freigabe','Mina sieht, ändert und entscheidet. Nichts geht ungefragt raus.'],['05','Zurück ins Haus','Ergebnis und Kontext bleiben für den nächsten Schritt erhalten.']]
    : [['01','Outside','A question keeps appearing under Mina’s videos.'],['02','Desk','YORI brings only the relevant thread into the house.'],['03','Workshop','The decision becomes a brief, material and a draft.'],['04','Approval','Mina sees, changes and decides. Nothing leaves unapproved.'],['05','Back home','Outcome and context remain for the next step.']];

  return (
    <main id="house" className="overflow-hidden bg-[#101812] text-[#f4eddd]">
      <section className="relative min-h-[92svh] border-t border-white/8">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${RAW}/outside-day.png)`}} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,15,11,.18),rgba(9,15,11,.72)_78%,#101812)]" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-between px-6 py-16 sm:px-10 lg:px-14">
          <div className="max-w-2xl">
            <p className="font-mono text-[9px] font-bold tracking-[.28em] text-[#e4ca8b]/72">{de?'DRAUSSEN':'OUTSIDE'}</p>
            <h2 className="mt-5 font-serif text-[clamp(3.5rem,7vw,7rem)] font-light leading-[.86] tracking-[-.05em]">{de?<>Hier passiert<br/><em className="font-light text-[#e5cb8c]">das Leben.</em></>:<>This is where<br/><em className="font-light text-[#e5cb8c]">life happens.</em></>}</h2>
          </div>
          <div className="ml-auto max-w-xl rounded-[2px] border-l border-[#e6cf94]/30 bg-[#0c1510]/45 p-6 backdrop-blur-md sm:p-8">
            <p className="text-base leading-7 text-white/68">{de?'TikTok läuft. Eine Mail kommt rein. Im Kalender rückt etwas näher. Jemand fragt zum dritten Mal dasselbe unter einem Video. YORI versucht nicht, daraus noch einen Feed zu machen.':'TikTok moves. An email arrives. Something gets closer on the calendar. Someone asks the same thing under a video for the third time. YORI does not turn that into another feed.'}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {sources.map(s=><span key={s} className="font-mono text-[8px] font-bold tracking-[.16em] text-white/45">○ {s.toUpperCase()} <i className="not-italic text-[#e4ca8b]/50">DEMO</i></span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#d8ccb5] px-6 py-24 text-[#1c2923] sm:px-10 sm:py-32 lg:px-14">
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(76,54,32,.12)_1px,transparent_1px)] [background-size:12.5%_100%]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="font-mono text-[9px] font-bold tracking-[.28em] text-[#456455]">{de?'DIE SCHWELLE':'THE THRESHOLD'}</p><h2 className="mt-5 font-serif text-5xl font-light leading-[.92] tracking-[-.045em] sm:text-7xl">{de?'Nur was Bedeutung bekommt, kommt hinein.':'Only what gains meaning comes inside.'}</h2></div>
            <p className="max-w-xl text-base leading-7 text-[#2b3b34]/68 lg:justify-self-end">{de?'Die Außenwelt bleibt draußen. Im Haus landen keine sechs Dashboards, sondern Zusammenhänge: Was ist passiert? Warum könnte es wichtig sein? Braucht es dich — oder kann es warten?':'The outside world stays outside. Six dashboards do not enter the house. Context does: what happened, why might it matter, does it need you — or can it wait?'}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0d1511] py-8 sm:py-14">
        <div className="mx-auto max-w-[1500px] space-y-5 px-3 sm:px-6">
          {ROOMS.map(([slug,deName,enName,deText,enText],i)=>(
            <article key={slug} className="group relative min-h-[68svh] overflow-hidden border border-white/8 bg-black">
              <img src={`${RAW}/rooms/room-${slug}.png`} alt={de?deName:enName} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-[1400ms] group-hover:scale-[1.015] group-hover:opacity-95" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,7,.82),rgba(5,10,7,.30)_52%,rgba(5,10,7,.05)),linear-gradient(180deg,transparent_45%,rgba(5,10,7,.58))]" />
              <div className="relative flex min-h-[68svh] max-w-2xl flex-col justify-end p-7 sm:p-12 lg:p-16">
                <span className="font-mono text-[9px] font-bold tracking-[.25em] text-[#e3c985]/70">0{i+1} / {de?deName.toUpperCase():enName.toUpperCase()}</span>
                <h3 className="mt-4 font-serif text-[clamp(3rem,6vw,6.5rem)] font-light leading-[.86] tracking-[-.05em] text-[#fff7e6]">{de?deName:enName}</h3>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/62 sm:text-lg">{de?deText:enText}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative bg-[#17231c] px-6 py-28 sm:px-10 sm:py-36 lg:px-14">
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#dfc583]/18 to-transparent" />
        <div className="relative mx-auto max-w-6xl">
          <p className="font-mono text-[9px] font-bold tracking-[.28em] text-[#e0c580]/65">{de?'MINA · EIN DEMO-TAG':'MINA · A DEMO DAY'}</p>
          <h2 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-[.92] tracking-[-.045em] sm:text-7xl">{de?'Nicht klicken, klicken, klicken. Ein Faden durchs Haus.':'Not click, click, click. One thread through the house.'}</h2>
          <div className="mt-16 space-y-0 border-t border-white/10">
            {flow.map(([n,place,text])=><div key={n} className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[70px_.6fr_1.4fr] sm:gap-8"><span className="font-mono text-[8px] tracking-[.2em] text-[#e0c580]/45">{n}</span><strong className="font-serif text-2xl font-light text-white/88">{place}</strong><p className="max-w-xl text-sm leading-6 text-white/48 sm:text-base">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="relative min-h-[88svh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:`url(${RAW}/outside-golden-hour.png)`}} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#17231c,rgba(8,14,10,.25)_32%,rgba(8,14,10,.72))]" />
        <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
          <YoriMark className="h-14 w-14 text-[#e8d194]" />
          <p className="mt-6 font-mono text-[9px] font-bold tracking-[.28em] text-[#e8d194]/68">YORI · PRIVATE PREVIEW</p>
          <h2 className="mt-5 max-w-4xl font-serif text-[clamp(3.4rem,7vw,7rem)] font-light leading-[.88] tracking-[-.05em] text-[#fff7e5]">{de?'Deine Arbeit. Als Ort.':'Your work. As a place.'}</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/58">{de?'Die Daten in der Vorschau gehören Mina und sind Demo. Das Haus ist die Produktidee — und genau dort geht es jetzt weiter.':'The preview data belongs to Mina and is demo data. The house is the product idea — and that is where the journey continues.'}</p>
          <a href="https://yori.saimor.world" className="group mt-9 inline-flex items-center gap-3 border border-[#f0dfb4]/32 bg-[#ead9ad]/90 px-7 py-3.5 text-sm font-bold text-[#183128] transition hover:bg-[#fff1cc]">{de?'Schiebetür öffnen':'Open the sliding door'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></a>
        </div>
      </section>
    </main>
  );
}
