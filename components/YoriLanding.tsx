import { ArrowRight } from 'lucide-react';
import YoriMark from '@/components/YoriMark';
import YoriAmbientGarden from '@/components/YoriAmbientGarden';

type Props = { locale: 'de' | 'en' };

const ROOMS = [
  ['Schreibtisch','Desk','Was heute wirklich deine Aufmerksamkeit braucht.','What genuinely needs your attention today.','desk'],
  ['Werkstatt','Workshop','Wo aus Ideen Arbeit wird.','Where ideas become work.','workshop'],
  ['Crew','Crew','Wer gerade wirklich etwas trägt.','Who is genuinely carrying something right now.','crew'],
  ['Cash','Cash','Was reinkommt, rausgeht und Bedeutung hat.','What comes in, goes out and matters.','cash'],
] as const;

function RoomVisual({ kind }: { kind: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#17130f]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#2a1c14,#17130f_70%)]" />
      <div className="absolute inset-y-0 right-0 w-[44%] border-l border-[#c9a56b]/10 bg-[#3a2417]" />
      <div className="absolute right-[7%] top-[12%] h-[53%] w-[30%] border border-[#4e3422] bg-[#d3b271]/30 shadow-[0_0_46px_rgba(218,169,91,.11)]">
        <div className="absolute inset-y-0 left-1/2 w-px bg-[#4d3321]"/><div className="absolute inset-x-0 top-1/3 h-px bg-[#4d3321]"/><div className="absolute inset-x-0 top-2/3 h-px bg-[#4d3321]"/>
      </div>
      {kind === 'desk' && <><div className="absolute bottom-[16%] left-[9%] h-[8%] w-[54%] bg-[#5a3923]"/><div className="absolute bottom-[24%] left-[15%] h-[18%] w-[28%] rotate-[-3deg] bg-[#d6c39b]/35"/><div className="absolute bottom-[23%] left-[46%] h-[20%] w-[14%] rounded-full bg-[#1f2d20]"/></>}
      {kind === 'workshop' && <><div className="absolute bottom-[13%] left-[9%] h-[10%] w-[57%] bg-[#5b3821]"/><div className="absolute bottom-[27%] left-[17%] h-[24%] w-[18%] bg-[#30251e]"/><div className="absolute bottom-[26%] left-[41%] h-[26%] w-[21%] border border-[#b58e54]/15 bg-[#261c15]"/></>}
      {kind === 'crew' && <><div className="absolute bottom-[15%] left-[11%] h-[18%] w-[52%] rounded-t-[45%] bg-[#2a2b20]"/><div className="absolute bottom-[30%] left-[22%] h-[20%] w-[13%] rounded-full bg-[#243124]"/><div className="absolute bottom-[29%] left-[43%] h-[18%] w-[12%] rounded-full bg-[#2d382a]"/></>}
      {kind === 'cash' && <><div className="absolute bottom-[14%] left-[10%] h-[9%] w-[52%] bg-[#563821]"/><div className="absolute bottom-[27%] left-[18%] h-[16%] w-[25%] rounded-sm border border-[#c19a5c]/15 bg-[#252018]"/><div className="absolute bottom-[25%] left-[49%] h-[18%] w-[10%] rounded-t-full bg-[#263427]"/></>}
      <div className="absolute bottom-[13%] right-[11%] h-8 w-8 rounded-sm border border-[#c89a56]/25 bg-[#b97c35]/10 shadow-[0_0_28px_rgba(225,166,77,.13)]"/>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(5,6,5,.48))]"/>
    </div>
  );
}

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';
  return (
    <main id="house" className="overflow-hidden bg-[#0e120e] text-[#efe7d8]">
      <section className="relative min-h-[78svh] overflow-hidden border-b border-white/5">
        <YoriAmbientGarden compact />
        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-end px-6 pb-14 pt-16 sm:px-10 lg:px-14">
          <div className="max-w-xl rounded-[1.25rem] border border-[#d2b279]/10 bg-[#11150f]/52 p-6 backdrop-blur-md sm:p-8">
            <p className="font-mono text-[8px] tracking-[.26em] text-[#d7bb7c]/68">{de?'YORI · EIN ORT FÜR DEINE ARBEIT':'YORI · A PLACE FOR YOUR WORK'}</p>
            <h2 className="mt-4 font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[.92] tracking-[-.045em]">{de?'Nicht mehr zwischen allem springen.':'Stop jumping between everything.'}</h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-white/55 sm:text-base">{de?'YORI ordnet nicht dein Leben neu. Es gibt deiner Arbeit nur einen ruhigen Platz, an dem Zusammenhänge sichtbar bleiben.':'YORI does not reorganize your life. It simply gives your work a calm place where context stays visible.'}</p>
          </div>
        </div>
      </section>

      <section id="rooms" className="bg-[#151713] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-8">
            <div><p className="font-mono text-[8px] tracking-[.26em] text-[#c6a76d]/62">{de?'DAS HAUS':'THE HOUSE'}</p><h2 className="mt-3 font-serif text-4xl font-light tracking-[-.04em] sm:text-6xl">{de?'Vier Räume. Kein Dashboard.':'Four rooms. No dashboard.'}</h2></div>
            <p className="hidden max-w-md text-sm leading-6 text-white/40 md:block">{de?'Jeder Raum hat genau eine Aufgabe. Zusammen entsteht ein ruhiger Arbeitsfluss.':'Each room has exactly one job. Together they create a calm work flow.'}</p>
          </div>

          <div className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {ROOMS.map(([deName,enName,deText,enText,kind],i)=><article key={kind} className="w-[82vw] max-w-[390px] shrink-0 snap-center overflow-hidden rounded-[1.15rem] border border-[#c9aa70]/10 bg-[#181a16] shadow-[0_24px_70px_rgba(0,0,0,.18)] sm:w-[42vw] lg:w-[23%]">
              <div className="aspect-[5/4]"><RoomVisual kind={kind}/></div>
              <div className="border-t border-white/5 p-5 sm:p-6"><span className="font-mono text-[7px] tracking-[.22em] text-[#c7aa70]/52">0{i+1}</span><h3 className="mt-2 font-serif text-3xl font-light">{de?deName:enName}</h3><p className="mt-3 text-sm leading-6 text-white/45">{de?deText:enText}</p></div>
            </article>)}
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[7px] tracking-[.2em] text-white/24"><span>{de?'WISCHEN':'SWIPE'}</span><span>01 — 04</span></div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5 bg-[#10140f] px-6 py-18 sm:px-10 sm:py-24 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(77,104,71,.12),transparent_26%),radial-gradient(circle_at_20%_80%,rgba(177,132,68,.08),transparent_28%)]"/>
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div><p className="font-mono text-[8px] tracking-[.26em] text-[#c8a96d]/60">MINA · DEMO</p><h2 className="mt-3 font-serif text-4xl font-light leading-[.94] tracking-[-.04em] sm:text-6xl">{de?'Ein Faden statt zehn Tabs.':'One thread instead of ten tabs.'}</h2><p className="mt-5 max-w-md text-sm leading-6 text-white/45">{de?'Eine wiederkehrende Frage aus der Community wird relevant. YORI bringt sie auf den Schreibtisch. Daraus entsteht in der Werkstatt ein Entwurf. Mina entscheidet.':'A recurring community question becomes relevant. YORI brings it to the desk. It becomes a draft in the workshop. Mina decides.'}</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[[de?'Signal draußen':'Signal outside',de?'Eine Frage taucht immer wieder auf.':'A question keeps appearing.'],[de?'Auf dem Schreibtisch':'On the desk',de?'Nur das Relevante kommt rein.':'Only what matters comes in.'],[de?'In der Werkstatt':'In the workshop',de?'Aus Kontext wird ein Entwurf.':'Context becomes a draft.'],[de?'Zurück zu Mina':'Back to Mina',de?'Sie sieht, ändert und entscheidet.':'She sees, changes and decides.']].map(([title,text],i)=><div key={title} className="rounded-[1rem] border border-[#c9aa70]/9 bg-[#171a15] p-5"><span className="font-mono text-[7px] tracking-[.2em] text-[#c9aa70]/46">0{i+1}</span><h3 className="mt-2 font-serif text-2xl font-light">{title}</h3><p className="mt-2 text-sm leading-6 text-white/40">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="relative min-h-[64svh] overflow-hidden">
        <YoriAmbientGarden compact />
        <div className="relative mx-auto flex min-h-[64svh] max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
          <YoriMark className="h-10 w-10 text-[#dec583]" />
          <p className="mt-4 font-mono text-[8px] tracking-[.28em] text-[#dec583]/62">YORI · PRIVATE PREVIEW</p>
          <h2 className="mt-4 font-serif text-[clamp(2.8rem,6vw,5rem)] font-light leading-[.9] tracking-[-.045em]">{de?'Das Haus ist offen.':'The house is open.'}</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/48">{de?'Die Demo ist simuliert. Die Räume und der Ablauf zeigen die echte Produktidee.':'The demo is simulated. The rooms and flow show the real product idea.'}</p>
          <a href="https://yori.saimor.world" className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[#d7bb7a]/18 bg-[#d9c18e]/88 px-6 py-3 text-sm font-bold text-[#18251d] transition hover:bg-[#ead5a4]">{de?'Haus betreten':'Enter the house'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></a>
        </div>
      </section>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </main>
  );
}
