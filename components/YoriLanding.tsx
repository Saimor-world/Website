import { ArrowRight, Sparkles } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };

const rooms = [
  ['desk', '#e0a86b', 'Schreibtisch', 'Desk', 'Was heute deine Aufmerksamkeit braucht.', 'What needs your attention today.'],
  ['workshop', '#7aa59a', 'Werkstatt', 'Workshop', 'Wo aus Signalen und Ideen etwas Fertiges wird.', 'Where signals and ideas become something finished.'],
  ['crew', '#9987ba', 'Crew', 'Crew', 'Unterstützung nur dann, wenn sie wirklich trägt.', 'Support only when it is actually carrying work.'],
  ['cash', '#cc745d', 'Cash', 'Cash', 'Kooperationen, Geld und offene Vorgänge ohne KPI-Wand.', 'Deals, money and open items without a KPI wall.'],
] as const;

const signalRows = [
  ['TikTok', '3× dieselbe Frage unter deinem neuen Video', '#f08b71'],
  ['Mail', 'Kooperationsanfrage wartet auf Antwort', '#d7ad63'],
  ['Kalender', 'Content-Block beginnt in 40 Minuten', '#6eaaa0'],
] as const;

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';
  const sourceLabels = de ? ['TikTok', 'Instagram', 'Mail', 'Kalender', 'Drive', 'Deals'] : ['TikTok', 'Instagram', 'Mail', 'Calendar', 'Drive', 'Deals'];

  return (
    <main className="overflow-hidden bg-[#120f13] text-[#f6efe8]">
      <section className="relative isolate min-h-[100svh] overflow-hidden px-5 pb-10 pt-8 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(189,72,63,.28),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(93,87,169,.30),transparent_28%),radial-gradient(circle_at_68%_74%,rgba(50,132,111,.24),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(222,150,76,.20),transparent_25%),linear-gradient(135deg,#130f13_0%,#151319_45%,#101518_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="yori-blob yori-blob-a absolute -left-20 top-[24%] h-64 w-64 rounded-full bg-[#d9765b]/18 blur-3xl" />
        <div className="yori-blob yori-blob-b absolute -right-16 top-[38%] h-72 w-72 rounded-full bg-[#6b64ae]/18 blur-3xl" />
        <div className="yori-blob yori-blob-c absolute bottom-[8%] left-[24%] h-56 w-56 rounded-full bg-[#4b8f7f]/16 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl flex-col">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#f2d8aa]">
              <YoriMark className="h-7 w-7" />
              <span className="font-mono text-[8px] font-bold tracking-[.30em]">YORI · 縁</span>
            </div>
            <span className="font-mono text-[7px] tracking-[.26em] text-white/34">CREATIVE HOUSE · SAIMÔR</span>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-14 lg:py-10">
            <div className="max-w-2xl">
              <p className="font-mono text-[8px] font-bold tracking-[.26em] text-[#e2b56f]/68">{de ? 'FÜR CREATOR, DIE ALLES SELBST ZUSAMMENHALTEN' : 'FOR CREATORS HOLDING EVERYTHING TOGETHER'}</p>
              <h1 className="mt-5 max-w-3xl font-serif text-[clamp(3.55rem,9vw,7.6rem)] font-light leading-[.84] tracking-[-.055em]">
                {de ? <>Dein Creator-Leben.<br/><em className="font-light text-[#e8bf78]">Ein Ort.</em></> : <>Your creator life.<br/><em className="font-light text-[#e8bf78]">One place.</em></>}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
                {de ? 'TikTok, Ideen, DMs, Kooperationen, Website und Geld — YORI hält den Zusammenhang, damit du nicht sechs Apps gleichzeitig führen musst.' : 'TikTok, ideas, DMs, collaborations, website and money — YORI keeps the context so you do not have to run six apps at once.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://yori.saimor.world" className="group inline-flex items-center gap-3 rounded-full bg-[#f0d7a2] px-6 py-3.5 text-sm font-bold text-[#1c1a1d] transition hover:bg-[#ffe5ae]">{de ? 'Demo öffnen' : 'Open demo'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
                <a href="#why" className="inline-flex items-center rounded-full border border-white/14 bg-white/[.035] px-5 py-3.5 text-sm font-medium text-white/72 backdrop-blur transition hover:bg-white/[.07]">{de ? 'Warum YORI?' : 'Why YORI?'}</a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                {sourceLabels.map((label, index) => <span key={label} className="font-mono text-[7px] tracking-[.17em] text-white/34"><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{background: ['#e66f60','#a883c0','#d5ad65','#66a89b','#7f8fc5','#d27e5d'][index]}} />{label.toUpperCase()}</span>)}
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <div className="absolute inset-[8%] rounded-[38%_62%_55%_45%/44%_43%_57%_56%] border border-white/10 bg-[radial-gradient(circle_at_50%_48%,rgba(239,206,143,.20),rgba(255,255,255,.025)_46%,rgba(255,255,255,.015)_64%,transparent_65%)] shadow-[inset_0_0_80px_rgba(255,255,255,.02),0_30px_90px_rgba(0,0,0,.35)] backdrop-blur-xl" />
              <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#efd69d]/24 bg-[#18161a]/80 shadow-[0_0_70px_rgba(233,187,108,.16)] backdrop-blur-xl">
                <div className="text-center"><YoriMark className="mx-auto h-9 w-9 text-[#e9c885]"/><span className="mt-2 block font-mono text-[7px] tracking-[.24em] text-white/50">YORI</span></div>
              </div>
              {sourceLabels.map((label, index) => {
                const positions = [
                  'left-[3%] top-[18%]', 'right-[0%] top-[12%]', 'left-[0%] bottom-[22%]',
                  'right-[2%] bottom-[18%]', 'left-[34%] top-[0%]', 'right-[31%] bottom-[0%]'
                ];
                return <div key={label} className={`signal-chip absolute ${positions[index]} rounded-full border border-white/10 bg-white/[.055] px-3 py-2 font-mono text-[7px] tracking-[.16em] text-white/56 shadow-[0_10px_35px_rgba(0,0,0,.18)] backdrop-blur-lg`}><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{background: ['#e66f60','#a883c0','#d5ad65','#66a89b','#7f8fc5','#d27e5d'][index]}} />{label.toUpperCase()}</div>;
              })}
              <div className="absolute left-[15%] top-[42%] h-px w-[30%] rotate-[18deg] bg-gradient-to-r from-[#e66f60]/0 via-[#e66f60]/25 to-[#e8d5a5]/0" />
              <div className="absolute right-[14%] top-[40%] h-px w-[28%] -rotate-[18deg] bg-gradient-to-r from-[#e8d5a5]/0 via-[#8e81be]/25 to-[#8e81be]/0" />
              <div className="absolute bottom-[23%] left-[19%] h-px w-[30%] -rotate-[12deg] bg-gradient-to-r from-[#67a99a]/0 via-[#67a99a]/24 to-[#e8d5a5]/0" />
              <div className="absolute bottom-[22%] right-[18%] h-px w-[28%] rotate-[12deg] bg-gradient-to-r from-[#e8d5a5]/0 via-[#d17e5e]/24 to-[#d17e5e]/0" />
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="border-y border-white/7 bg-[#17151a] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="font-mono text-[8px] font-bold tracking-[.26em] text-[#7fb3a7]/70">{de ? 'WAS YORI ANDERS MACHT' : 'WHAT YORI CHANGES'}</p>
              <h2 className="mt-4 font-serif text-[clamp(2.9rem,6vw,5.8rem)] font-light leading-[.9] tracking-[-.045em]">{de ? <>Du öffnest YORI.<br/>Und weißt <em className="font-light text-[#9ec0b8]">was zählt.</em></> : <>You open YORI.<br/>And know <em className="font-light text-[#9ec0b8]">what matters.</em></>}</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-white/50 lg:justify-self-end">{de ? 'Kein Dashboard voller Zahlen. Kein zweiter Feed. YORI zieht nur die Dinge zusammen, aus denen gerade Arbeit, Entscheidung oder Gelegenheit wird.' : 'No dashboard packed with numbers. No second feed. YORI only brings together what is turning into work, a decision or an opportunity.'}</p>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {signalRows.map(([source, text, color], index) => <article key={source} className="rounded-[1.4rem] border border-white/8 bg-white/[.025] p-5 sm:p-6"><div className="flex items-center justify-between"><span className="font-mono text-[7px] tracking-[.2em] text-white/38">0{index+1}</span><span className="h-2 w-2 rounded-full" style={{background: color}} /></div><h3 className="mt-8 font-serif text-2xl font-light text-white/88">{source}</h3><p className="mt-2 text-sm leading-6 text-white/45">{de ? text : index===0 ? 'The same question appears under your new video three times' : index===1 ? 'A collaboration request is waiting for your reply' : 'Your content block starts in 40 minutes'}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#111015] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[8px] font-bold tracking-[.26em] text-[#d49b75]/68">{de ? 'EIN HAUS, KEINE FEATURE-LISTE' : 'A HOUSE, NOT A FEATURE LIST'}</p>
            <h2 className="mt-4 font-serif text-[clamp(3rem,6vw,6rem)] font-light leading-[.9] tracking-[-.045em]">{de ? 'Vier Räume. Jeder mit einem klaren Job.' : 'Four rooms. Each with one clear job.'}</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.8rem] border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map(([id, color, deName, enName, deText, enText], index) => <article key={id} className="group relative min-h-[280px] bg-[#17151a] p-6 sm:p-7"><div className="absolute inset-x-0 top-0 h-1 opacity-75" style={{background: color}}/><div className="flex items-center justify-between"><span className="font-mono text-[7px] tracking-[.2em] text-white/30">0{index+1}</span><span className="h-12 w-12 rounded-[44%_56%_60%_40%/46%_50%_50%_54%] opacity-70 blur-[.3px] transition group-hover:scale-110" style={{background: `${color}33`, boxShadow:`0 0 42px ${color}22`}} /></div><div className="mt-20"><h3 className="font-serif text-3xl font-light text-white/90">{de ? deName : enName}</h3><p className="mt-3 text-sm leading-6 text-white/42">{de ? deText : enText}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/7 bg-[#151218] px-5 py-24 sm:px-8 lg:px-12">
        <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#b55c4a]/12 blur-3xl" />
        <div className="absolute -right-16 top-[30%] h-72 w-72 rounded-full bg-[#5d6fa4]/14 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <Sparkles className="mx-auto h-5 w-5 text-[#e8c582]" />
          <p className="mt-5 font-mono text-[8px] font-bold tracking-[.26em] text-white/38">YORI · PRIVATE PREVIEW</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(3.2rem,7vw,6.6rem)] font-light leading-[.88] tracking-[-.05em]">{de ? <>Weniger Apps.<br/><em className="font-light text-[#d9aa78]">Mehr Flow.</em></> : <>Fewer apps.<br/><em className="font-light text-[#d9aa78]">More flow.</em></>}</h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-white/50">{de ? 'Die Demo ist simuliert. Aber das Problem ist real: Creator-Arbeit verteilt sich heute über zu viele Orte.' : 'The demo is simulated. But the problem is real: creator work is spread across too many places today.'}</p>
          <a href="https://yori.saimor.world" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#f0d7a2] px-6 py-3.5 text-sm font-bold text-[#1b191c] transition hover:bg-[#ffe6b0]">{de ? 'YORI ausprobieren' : 'Try YORI'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
        </div>
      </section>

      <style>{`
        @keyframes driftA{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(22px,-16px,0) scale(1.08)}}
        @keyframes driftB{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-18px,18px,0) scale(1.05)}}
        @keyframes chipFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .yori-blob-a{animation:driftA 11s ease-in-out infinite}.yori-blob-b{animation:driftB 13s ease-in-out infinite}.yori-blob-c{animation:driftA 15s ease-in-out infinite reverse}.signal-chip{animation:chipFloat 5s ease-in-out infinite}.signal-chip:nth-of-type(2n){animation-delay:-1.4s}.signal-chip:nth-of-type(3n){animation-delay:-2.7s}
        @media(prefers-reduced-motion:reduce){.yori-blob-a,.yori-blob-b,.yori-blob-c,.signal-chip{animation:none!important}}
      `}</style>
    </main>
  );
}
