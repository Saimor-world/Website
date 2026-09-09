import { ArrowRight, Play, Sparkles } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };

const tones = ['#ff8b6b','#f0b66d','#7db7a6','#9e8ad0','#6f8ed4','#d56e8c'];

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';
  const sources = de ? ['TikTok','Instagram','Mail','Kalender','Drive','Deals'] : ['TikTok','Instagram','Mail','Calendar','Drive','Deals'];
  const flow = de
    ? [['Signal','„Warum redest du nie über den Anfang?“ taucht 3× unter deinem Video auf.'],['YORI','merkt: wiederkehrendes Thema + passt zu deinem Content-Block heute.'],['Du','siehst eine Sache auf dem Schreibtisch — nicht sechs Benachrichtigungen.'],['Werkstatt','Briefing, Material und Entwurf entstehen aus demselben Faden.'],['Freigabe','Du entscheidest. Erst dann geht etwas raus.']]
    : [['Signal','“Why do you never talk about the beginning?” appears three times under your video.'],['YORI','notices: recurring theme + fits today’s content block.'],['You','see one thing on your desk — not six notifications.'],['Workshop','brief, material and draft grow from the same thread.'],['Approval','you decide. Only then does anything go out.']];

  return (
    <main className="overflow-hidden bg-[#0d0c11] text-[#f7f1ea]">
      <section className="relative isolate min-h-[100svh] overflow-hidden px-5 pb-8 pt-7 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,111,94,.28),transparent_26%),radial-gradient(circle_at_88%_16%,rgba(112,102,211,.30),transparent_30%),radial-gradient(circle_at_78%_82%,rgba(62,151,123,.24),transparent_27%),radial-gradient(circle_at_20%_85%,rgba(244,170,86,.22),transparent_26%),linear-gradient(145deg,#100d13_0%,#14111a_46%,#0d1214_100%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.028)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-7xl flex-col">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#f2d7a1]"><YoriMark className="h-7 w-7"/><span className="font-mono text-[8px] font-bold tracking-[.3em]">YORI · 縁</span></div>
            <span className="font-mono text-[7px] tracking-[.24em] text-white/32">CREATIVE HOUSE</span>
          </header>

          <div className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="font-mono text-[8px] font-bold tracking-[.26em] text-[#f0b26f]/72">{de?'DEIN INTERNET IST ÜBERALL. DEINE ARBEIT SOLLTE ES NICHT SEIN.':'YOUR INTERNET IS EVERYWHERE. YOUR WORK SHOULD NOT BE.'}</p>
              <h1 className="mt-5 font-serif text-[clamp(3.8rem,10vw,8.2rem)] font-light leading-[.81] tracking-[-.06em]">
                {de?<>Alles kommt rein.<br/><em className="font-light text-[#f0c17e]">Nur das Wichtige bleibt.</em></>:<>Everything comes in.<br/><em className="font-light text-[#f0c17e]">Only what matters stays.</em></>}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">{de?'YORI verbindet deine Creator-Welt und macht daraus genau die Arbeit, die jetzt Sinn ergibt — statt noch einen Feed, noch ein Dashboard, noch eine Inbox.':'YORI connects your creator world and turns it into the work that makes sense now — instead of another feed, another dashboard, another inbox.'}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://yori.saimor.world" className="group inline-flex items-center gap-3 rounded-full bg-[#f3d7a0] px-6 py-3.5 text-sm font-bold text-[#19171b] transition hover:scale-[1.01] hover:bg-[#ffe8b8]">{de?'Demo öffnen':'Open demo'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></a>
                <a href="#moment" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.035] px-5 py-3.5 text-sm text-white/70 backdrop-blur transition hover:bg-white/[.07]"><Play className="h-3.5 w-3.5"/>{de?'20 Sekunden verstehen':'Understand in 20 seconds'}</a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[520px] py-6">
              <div className="absolute inset-12 rounded-[40%] bg-[conic-gradient(from_30deg,rgba(255,112,91,.18),rgba(132,108,214,.18),rgba(72,151,123,.18),rgba(240,174,92,.18),rgba(255,112,91,.18))] blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-[#15131a]/72 p-4 shadow-[0_30px_90px_rgba(0,0,0,.34)] backdrop-blur-2xl sm:p-5">
                <div className="flex items-center justify-between border-b border-white/8 pb-4"><span className="font-mono text-[8px] tracking-[.22em] text-white/38">HEUTE · 14:32</span><span className="h-2 w-2 rounded-full bg-[#78b59f] shadow-[0_0_18px_rgba(120,181,159,.7)]"/></div>
                <div className="mt-4 rounded-[1.4rem] border border-[#efb16e]/18 bg-[#f0b66d]/[.055] p-5">
                  <span className="font-mono text-[7px] tracking-[.2em] text-[#f1bf7f]/70">COMMUNITY SIGNAL</span>
                  <h2 className="mt-3 font-serif text-3xl font-light leading-[1.02] text-white/92">{de?'Eine Frage taucht gerade zum dritten Mal auf.':'The same question just appeared for the third time.'}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/48">{de?'Passt zu deinem Content-Block heute um 16:00. Soll daraus ein Thema werden?':'It fits your content block at 16:00. Turn it into a topic?'}</p>
                  <div className="mt-5 flex gap-2"><span className="rounded-full bg-[#f1d39e] px-3 py-2 text-xs font-semibold text-[#19171a]">{de?'Ja, vorbereiten':'Prepare it'}</span><span className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/48">{de?'Später':'Later'}</span></div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/[.025] p-4"><span className="font-mono text-[7px] text-white/30">MAIL</span><p className="mt-2 text-sm text-white/55">{de?'Kooperation wartet':'Collab waiting'}</p></div>
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/[.025] p-4"><span className="font-mono text-[7px] text-white/30">KALENDER</span><p className="mt-2 text-sm text-white/55">16:00 · Content</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 pb-2">{sources.map((s,i)=><span key={s} className="font-mono text-[7px] tracking-[.16em] text-white/34"><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{background:tones[i]}}/>{s.toUpperCase()}</span>)}</div>
        </div>
      </section>

      <section id="moment" className="relative border-y border-white/7 bg-[#f1e4d2] px-5 py-20 text-[#1c1820] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-10">
              <p className="font-mono text-[8px] font-bold tracking-[.25em] text-[#815c4d]">{de?'EIN MOMENT. EIN FADEN.':'ONE MOMENT. ONE THREAD.'}</p>
              <h2 className="mt-4 font-serif text-[clamp(3.1rem,6vw,5.8rem)] font-light leading-[.9] tracking-[-.05em]">{de?'So fühlt sich YORI an.':'This is what YORI feels like.'}</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-[#2e2930]/58">{de?'Nicht vier Räume erklären. Nicht zwölf Features zeigen. Einfach eine Sache von draußen bis fertig begleiten.':'Not explaining four rooms. Not showing twelve features. Just carrying one thing from outside to done.'}</p>
            </div>
            <div className="space-y-0 border-t border-[#2a2026]/12">
              {flow.map(([title,text],i)=><div key={title} className="grid gap-3 border-b border-[#2a2026]/12 py-6 sm:grid-cols-[56px_.55fr_1.45fr] sm:gap-6"><span className="font-mono text-[8px] tracking-[.2em] text-[#7f685d]/55">0{i+1}</span><h3 className="font-serif text-2xl font-light">{title}</h3><p className="text-sm leading-6 text-[#302a31]/58 sm:text-base">{text}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#111015] px-5 py-20 sm:px-8 lg:px-12">
        <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#ff745e]/10 blur-3xl"/><div className="absolute -right-16 top-[25%] h-72 w-72 rounded-full bg-[#746bd0]/12 blur-3xl"/>
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[1.8rem] border border-white/8 bg-white/[.025] p-7 sm:p-9"><span className="font-mono text-[8px] tracking-[.22em] text-[#7db7a6]">YOU</span><h3 className="mt-4 font-serif text-4xl font-light">{de?'Du entscheidest.':'You decide.'}</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/48">{de?'YORI darf finden, verbinden und vorbereiten. Veröffentlichen, antworten oder Geld bewegen passiert nicht still im Hintergrund.':'YORI can find, connect and prepare. Publishing, replying or moving money does not happen silently in the background.'}</p></div>
            <div className="rounded-[1.8rem] border border-white/8 bg-white/[.025] p-7 sm:p-9"><span className="font-mono text-[8px] tracking-[.22em] text-[#d69a79]">YORI</span><h3 className="mt-4 font-serif text-4xl font-light">{de?'Der Zusammenhang bleibt.':'The context stays.'}</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/48">{de?'Was aus einem Signal wurde, wer daran gearbeitet hat und was danach passiert ist, bleibt am selben Faden.':'What a signal became, who worked on it and what happened afterwards stays on the same thread.'}</p></div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/7 bg-[#17131a] px-5 py-24 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(238,178,99,.16),transparent_38%)]"/>
        <div className="relative mx-auto max-w-4xl text-center"><Sparkles className="mx-auto h-5 w-5 text-[#efc47c]"/><p className="mt-5 font-mono text-[8px] tracking-[.24em] text-white/34">YORI · PRIVATE PREVIEW</p><h2 className="mt-5 font-serif text-[clamp(3.4rem,7vw,6.5rem)] font-light leading-[.87] tracking-[-.055em]">{de?<>Deine Welt bleibt groß.<br/><em className="font-light text-[#efbd77]">Dein Kopf nicht voll.</em></>:<>Your world stays big.<br/><em className="font-light text-[#efbd77]">Your head does not stay full.</em></>}</h2><a href="https://yori.saimor.world" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#f1d39e] px-6 py-3.5 text-sm font-bold text-[#1a181c] transition hover:bg-[#ffe7b6]">{de?'YORI öffnen':'Open YORI'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></a></div>
      </section>
    </main>
  );
}
