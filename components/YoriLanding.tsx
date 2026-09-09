import { ArrowRight } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };

const sourceColors = ['#ff8a6b', '#a58ad2', '#f0b66d', '#79b7a6', '#718ed3', '#d86f8e'];

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';
  const sources = de
    ? ['TikTok', 'Instagram', 'Mail', 'Kalender', 'Drive', 'Deals']
    : ['TikTok', 'Instagram', 'Mail', 'Calendar', 'Drive', 'Deals'];

  const rooms = de
    ? [
        ['Heute', 'Nur das, was wirklich Aufmerksamkeit braucht.', '#f0b66d'],
        ['Werkstatt', 'Aus Signalen werden Entwürfe, Inhalte und nächste Schritte.', '#79b7a6'],
        ['Crew', 'Unterstützung wird sichtbar, wenn sie tatsächlich Arbeit trägt.', '#a58ad2'],
        ['Cash', 'Kooperationen, offene Vorgänge und Geld ohne KPI-Wand.', '#ff8a6b'],
      ]
    : [
        ['Today', 'Only what genuinely needs attention.', '#f0b66d'],
        ['Workshop', 'Signals become drafts, content and next steps.', '#79b7a6'],
        ['Crew', 'Support appears when it is actually carrying work.', '#a58ad2'],
        ['Cash', 'Collaborations, open items and money without a KPI wall.', '#ff8a6b'],
      ];

  return (
    <main className="overflow-hidden bg-[#0c0b10] text-[#f7f1ea]">
      <section className="relative isolate min-h-[100svh] px-5 pb-10 pt-7 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,119,92,.24),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(126,108,208,.22),transparent_29%),radial-gradient(circle_at_74%_82%,rgba(75,153,126,.18),transparent_28%),linear-gradient(145deg,#0d0b11_0%,#151119_52%,#0c1112_100%)]" />
        <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#f0cf90]">
              <YoriMark className="h-7 w-7" />
              <span className="font-mono text-[8px] font-bold tracking-[.30em]">YORI · 縁</span>
            </div>
            <span className="font-mono text-[7px] tracking-[.24em] text-white/30">CREATIVE HOUSE · SAIMÔR</span>
          </header>

          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="max-w-3xl">
              <p className="font-mono text-[8px] font-bold tracking-[.25em] text-[#eab26d]/72">
                {de ? 'FÜR CREATOR, DIE NICHT NOCH EIN TOOL BRAUCHEN' : 'FOR CREATORS WHO DO NOT NEED ANOTHER TOOL'}
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(4rem,10vw,8.6rem)] font-light leading-[.80] tracking-[-.062em]">
                {de ? <><span>Eine Sache.</span><br/><em className="font-light text-[#f1c47d]">Statt sechs Apps.</em></> : <><span>One thing.</span><br/><em className="font-light text-[#f1c47d]">Instead of six apps.</em></>}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
                {de
                  ? 'YORI verbindet die Teile deiner Creator-Arbeit, hält den Zusammenhang und zeigt dir nur, was gerade wirklich wichtig ist.'
                  : 'YORI connects the parts of your creator work, keeps the context and shows only what genuinely matters right now.'}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://yori.saimor.world" className="group inline-flex items-center gap-3 rounded-full bg-[#f2d39a] px-6 py-3.5 text-sm font-bold text-[#171519] transition hover:bg-[#ffe7b7]">
                  {de ? 'YORI öffnen' : 'Open YORI'}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
                <a href="#inside" className="inline-flex items-center rounded-full border border-white/12 px-5 py-3.5 text-sm text-white/64 transition hover:bg-white/[.05]">
                  {de ? 'Was ist drin?' : 'What is inside?'}
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute inset-[14%] rounded-full bg-[conic-gradient(from_20deg,rgba(255,126,101,.22),rgba(162,132,210,.20),rgba(84,162,135,.20),rgba(241,182,109,.20),rgba(255,126,101,.22))] blur-3xl" />
              <div className="relative aspect-square rounded-[2.4rem] border border-white/10 bg-white/[.025] p-6 shadow-[0_32px_100px_rgba(0,0,0,.38)] backdrop-blur-2xl sm:p-8">
                <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#f0d39a]/20 bg-[#121015]/80 shadow-[0_0_70px_rgba(240,190,110,.12)]">
                  <div className="text-center">
                    <YoriMark className="mx-auto h-10 w-10 text-[#ebc77f]" />
                    <span className="mt-2 block font-mono text-[7px] tracking-[.24em] text-white/44">YORI</span>
                  </div>
                </div>
                {sources.map((source, index) => {
                  const positions = [
                    'left-[4%] top-[15%]', 'right-[3%] top-[12%]', 'left-[0%] bottom-[26%]',
                    'right-[1%] bottom-[23%]', 'left-[32%] top-[1%]', 'right-[29%] bottom-[1%]'
                  ];
                  return (
                    <div key={source} className={`absolute ${positions[index]} rounded-full border border-white/10 bg-[#17141c]/76 px-3 py-2 font-mono text-[7px] tracking-[.16em] text-white/58 backdrop-blur-xl`}>
                      <i className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ background: sourceColors[index] }} />
                      {source.toUpperCase()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="pb-2 font-mono text-[7px] tracking-[.16em] text-white/28">
            {de ? 'PRIVATE PREVIEW · DEMO-DATEN SIND ALS DEMO GEKENNZEICHNET · EXTERNE AKTIONEN NUR NACH FREIGABE' : 'PRIVATE PREVIEW · DEMO DATA IS MARKED AS DEMO · EXTERNAL ACTIONS REQUIRE APPROVAL'}
          </p>
        </div>
      </section>

      <section id="inside" className="border-y border-black/5 bg-[#eee1cf] px-5 py-20 text-[#1f1a20] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <p className="font-mono text-[8px] font-bold tracking-[.24em] text-[#7d5f50]">{de ? 'DAS PRINZIP' : 'THE PRINCIPLE'}</p>
              <h2 className="mt-4 font-serif text-[clamp(3.2rem,6vw,6rem)] font-light leading-[.88] tracking-[-.05em]">
                {de ? <>Draußen passiert alles.<br/><em className="font-light text-[#785d4d]">Drinnen wird es Arbeit.</em></> : <>Everything happens outside.<br/><em className="font-light text-[#785d4d]">Inside, it becomes work.</em></>}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#2e272d]/62 lg:justify-self-end">
              {de
                ? 'YORI ersetzt TikTok, Instagram oder deine Mailbox nicht. Es verbindet, was dort passiert, und hält daraus nur das fest, was zu einer Entscheidung, Aufgabe oder Gelegenheit wird.'
                : 'YORI does not replace TikTok, Instagram or your inbox. It connects what happens there and keeps only what turns into a decision, task or opportunity.'}
            </p>
          </div>

          <div className="mt-14 border-t border-[#2b2227]/12">
            {rooms.map(([name, text, color], index) => (
              <div key={name} className="grid gap-3 border-b border-[#2b2227]/12 py-6 sm:grid-cols-[52px_.55fr_1.45fr] sm:items-center sm:gap-6">
                <span className="font-mono text-[8px] tracking-[.18em] text-[#5f4f48]/45">0{index + 1}</span>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                  <h3 className="font-serif text-2xl font-light">{name}</h3>
                </div>
                <p className="text-sm leading-6 text-[#302930]/58 sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111015] px-5 py-24 sm:px-8 lg:px-12">
        <div className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#ff775e]/10 blur-3xl" />
        <div className="absolute -right-16 top-[20%] h-80 w-80 rounded-full bg-[#766bd1]/12 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-[8px] tracking-[.22em] text-[#79b7a6]">{de ? 'ECHT BLEIBT ECHT' : 'REAL STAYS REAL'}</p>
            <h3 className="mt-4 font-serif text-4xl font-light sm:text-5xl">{de ? 'Keine erfundene Aktivität.' : 'No invented activity.'}</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/46">
              {de
                ? 'Im Live-Modus zeigt YORI nur verbundene Quellen und echte Daten. Wenn nichts verbunden ist, bleibt es leer.'
                : 'In live mode, YORI shows only connected sources and real data. If nothing is connected, it stays empty.'}
            </p>
          </div>
          <div>
            <p className="font-mono text-[8px] tracking-[.22em] text-[#f0b66d]">{de ? 'DU BLEIBST AM STEUER' : 'YOU STAY IN CONTROL'}</p>
            <h3 className="mt-4 font-serif text-4xl font-light sm:text-5xl">{de ? 'Vorbereiten ja. Handeln nur mit dir.' : 'Prepare, yes. Act only with you.'}</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/46">
              {de
                ? 'Antworten, Veröffentlichen oder andere externe Aktionen passieren nicht still im Hintergrund.'
                : 'Replies, publishing and other external actions do not happen silently in the background.'}
            </p>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/7 bg-[#17131a] px-5 py-24 text-center sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(238,178,99,.15),transparent_38%)]" />
        <div className="relative mx-auto max-w-4xl">
          <YoriMark className="mx-auto h-9 w-9 text-[#efc47c]" />
          <h2 className="mt-6 font-serif text-[clamp(3.4rem,7vw,6.5rem)] font-light leading-[.87] tracking-[-.055em]">
            {de ? <>Weniger Oberfläche.<br/><em className="font-light text-[#efbd77]">Mehr Zusammenhang.</em></> : <>Less interface.<br/><em className="font-light text-[#efbd77]">More context.</em></>}
          </h2>
          <a href="https://yori.saimor.world" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#f1d39e] px-6 py-3.5 text-sm font-bold text-[#1a181c] transition hover:bg-[#ffe7b6]">
            {de ? 'Private Preview öffnen' : 'Open private preview'}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
