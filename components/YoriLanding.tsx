import { ArrowRight, Check, Sparkles } from 'lucide-react';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';

  const benefits = de
    ? [
        ['SIGNALS', 'Wichtige Nachrichten, Kommentare, Termine und offene Fäden an einem Ort.'],
        ['CONTENT', 'Ideen, Entwürfe und nächste Schritte bleiben mit dem Kontext verbunden.'],
        ['DEALS', 'Kooperationen, Zusagen und Follow-ups verschwinden nicht zwischen DMs und Mail.'],
        ['TODAY', 'YORI verdichtet alles auf das, was heute wirklich Aufmerksamkeit braucht.'],
      ]
    : [
        ['SIGNALS', 'Important messages, comments, dates and open threads in one place.'],
        ['CONTENT', 'Ideas, drafts and next steps stay attached to their context.'],
        ['DEALS', 'Collaborations, promises and follow-ups do not disappear between DMs and email.'],
        ['TODAY', 'YORI compresses everything down to what genuinely needs attention today.'],
      ];

  const steps = de
    ? [
        ['01', 'Profil zeigen', 'Starte mit deinem Instagram- oder TikTok-Namen. Keine Installation, kein neues System zum Lernen.'],
        ['02', 'Kontext verbinden', 'YORI sammelt nur die Quellen, die du freigibst, und hält Zusammenhänge über Zeit fest.'],
        ['03', 'Heute sehen', 'Statt sechs Apps zu prüfen, bekommst du eine klare Tageslage mit nächsten Schritten.'],
      ]
    : [
        ['01', 'Show your profile', 'Start with your Instagram or TikTok name. No install, no new system to learn.'],
        ['02', 'Connect context', 'YORI only uses sources you approve and keeps relationships over time.'],
        ['03', 'See today', 'Instead of checking six apps, you get one clear daily view with next steps.'],
      ];

  return (
    <main className="overflow-hidden bg-[#11130f] text-[#f3efe5]">
      <section className="relative min-h-[100svh] border-b border-white/[.08] px-5 pb-12 pt-8 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_30%,rgba(112,145,99,.16),transparent_30%),radial-gradient(circle_at_16%_4%,rgba(210,180,111,.08),transparent_22%),linear-gradient(180deg,#121610_0%,#0f120e_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[.08] [background-image:linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col">
          <header className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#d9c487]">
              <YoriMark className="h-7 w-7" />
              <div>
                <div className="font-mono text-[9px] font-bold tracking-[.28em]">YORI</div>
                <div className="mt-1 font-mono text-[7px] tracking-[.18em] text-white/30">CREATOR OS · SAIMÔR</div>
              </div>
            </div>
            <a href={de ? '/de' : '/en'} className="font-mono text-[8px] tracking-[.18em] text-white/34 transition hover:text-white/70">
              {de ? 'ZURÜCK ZU SAIMÔR' : 'BACK TO SAIMÔR'}
            </a>
          </header>

          <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="font-mono text-[9px] font-semibold tracking-[.24em] text-[#9fbd93]/76">
                {de ? 'FÜR CREATOR, DIE NICHT NOCH EIN DASHBOARD BRAUCHEN' : 'FOR CREATORS WHO DO NOT NEED ANOTHER DASHBOARD'}
              </p>
              <h1 className="mt-6 font-serif text-[clamp(3.9rem,8.6vw,8rem)] font-light leading-[.84] tracking-[-.058em] text-[#f7f2e8]">
                {de ? <>Dein Creator-Alltag.<br/><em className="font-light text-[#d9c487]">An einem Ort.</em></> : <>Your creator work.<br/><em className="font-light text-[#d9c487]">In one place.</em></>}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
                {de
                  ? 'YORI verbindet Content, Nachrichten, Kooperationen, Termine und Ideen zu einer einzigen Arbeitslage – damit du nicht jeden Morgen erst deine eigenen Apps zusammensuchen musst.'
                  : 'YORI connects content, messages, collaborations, dates and ideas into one working view, so you do not have to rebuild your day from separate apps every morning.'}
              </p>

              <form action="https://yori.saimor.world/demo" method="get" className="mt-9 max-w-xl border border-white/[.09] bg-[#171a15]/90 p-3 shadow-[0_24px_80px_rgba(0,0,0,.28)]">
                <p className="px-2 pb-2 font-mono text-[8px] font-semibold tracking-[.18em] text-[#cdbb85]/68">
                  {de ? 'DEIN PROFIL. DEINE PREVIEW.' : 'YOUR PROFILE. YOUR PREVIEW.'}
                </p>
                <div className="grid gap-2 sm:grid-cols-[122px_1fr_auto]">
                  <select name="platform" aria-label={de ? 'Plattform' : 'Platform'} defaultValue="instagram" className="min-h-12 border border-white/10 bg-[#10130f] px-3 text-sm text-white/72 outline-none">
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                  </select>
                  <label className="flex min-h-12 items-center border border-white/10 bg-[#10130f] px-3 focus-within:border-[#d9c487]/40">
                    <span className="mr-1 text-white/30">@</span>
                    <input name="creator" required maxLength={64} autoComplete="off" placeholder={de ? 'deinusername' : 'yourusername'} className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/22" />
                  </label>
                  <button type="submit" className="group inline-flex min-h-12 items-center justify-center gap-2 bg-[#e9dfc4] px-5 text-sm font-bold text-[#182016] transition hover:bg-white">
                    {de ? 'YORI ansehen' : 'See YORI'}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <p className="px-2 pt-2 text-[11px] leading-5 text-white/30">
                  {de ? 'Die Preview ist klar als Preview markiert. Nicht verbundene Daten werden nicht erfunden.' : 'The preview is clearly marked. Unconnected data is never invented.'}
                </p>
              </form>
            </div>

            <div className="relative mx-auto w-full max-w-[650px]">
              <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(116,151,102,.13),transparent_62%)] blur-3xl" />
              <div className="relative overflow-hidden border border-white/[.09] bg-[#0c100d] shadow-[0_40px_120px_rgba(0,0,0,.42)]">
                <div className="flex items-center justify-between border-b border-white/[.07] px-5 py-4">
                  <div>
                    <div className="font-mono text-[8px] tracking-[.2em] text-[#d1c18d]/62">YORI / TODAY</div>
                    <div className="mt-1 text-xs text-white/28">{de ? 'BEISPIELANSICHT' : 'EXAMPLE VIEW'}</div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-[#8eb985] shadow-[0_0_18px_rgba(142,185,133,.5)]" />
                </div>

                <div className="grid min-h-[520px] sm:grid-cols-[.34fr_.66fr]">
                  <aside className="border-b border-white/[.06] p-4 sm:border-b-0 sm:border-r">
                    <div className="font-mono text-[7px] tracking-[.18em] text-white/22">BEREICHE</div>
                    {['Heute', 'Content', 'Kooperationen', 'Nachrichten', 'Kalender'].map((item, i) => (
                      <div key={item} className={`mt-3 flex items-center justify-between px-3 py-2.5 text-xs ${i === 0 ? 'bg-[#1b251c] text-white/82' : 'text-white/34'}`}>
                        <span>{de ? item : ['Today','Content','Collaborations','Messages','Calendar'][i]}</span>
                        {i < 3 ? <span className="font-mono text-[8px] text-[#b9cdad]/44">0{i + 2}</span> : null}
                      </div>
                    ))}
                  </aside>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-end justify-between gap-4 border-b border-white/[.07] pb-5">
                      <div>
                        <div className="font-mono text-[8px] tracking-[.18em] text-white/28">{de ? 'HEUTE' : 'TODAY'}</div>
                        <h2 className="mt-2 font-serif text-3xl font-light text-white/90">{de ? '3 Dinge zählen.' : '3 things matter.'}</h2>
                      </div>
                      <Sparkles className="h-5 w-5 text-[#d4bd7c]/52" strokeWidth={1.4} />
                    </div>

                    <div className="divide-y divide-white/[.06]">
                      <div className="py-5">
                        <div className="flex items-center gap-2 font-mono text-[7px] tracking-[.16em] text-[#d5bc79]/56"><span className="h-1.5 w-1.5 rounded-full bg-[#d5bc79]" /> {de ? 'KOOPERATION' : 'COLLABORATION'}</div>
                        <p className="mt-2 text-sm leading-6 text-white/70">{de ? 'Antwort auf Briefing offen. Deadline morgen, 12:00.' : 'Briefing reply still open. Deadline tomorrow, 12:00.'}</p>
                        <p className="mt-2 text-xs text-white/28">{de ? 'YORI hält Mail, Termin und Deal zusammen.' : 'YORI keeps email, date and deal together.'}</p>
                      </div>
                      <div className="py-5">
                        <div className="flex items-center gap-2 font-mono text-[7px] tracking-[.16em] text-[#93b98a]/62"><span className="h-1.5 w-1.5 rounded-full bg-[#93b98a]" /> CONTENT</div>
                        <p className="mt-2 text-sm leading-6 text-white/70">{de ? 'Eine Idee taucht in mehreren Kommentaren wieder auf.' : 'One idea keeps resurfacing across comments.'}</p>
                        <p className="mt-2 text-xs text-white/28">{de ? 'Als Entwurf vormerken, ohne sie aus dem Kontext zu reißen.' : 'Keep it as a draft without losing the context.'}</p>
                      </div>
                      <div className="py-5">
                        <div className="flex items-center gap-2 font-mono text-[7px] tracking-[.16em] text-[#a9b9ad]/52"><span className="h-1.5 w-1.5 rounded-full bg-[#a9b9ad]" /> {de ? 'NÄCHSTER SCHRITT' : 'NEXT STEP'}</div>
                        <p className="mt-2 text-sm leading-6 text-white/70">{de ? 'Freitag 16:00: Veröffentlichung vorbereiten.' : 'Friday 16:00: prepare publishing.'}</p>
                        <p className="mt-2 text-xs text-white/28">{de ? 'Vorbereiten kann YORI. Veröffentlichen entscheidest du.' : 'YORI can prepare. You decide when to publish.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[.06] pt-5 font-mono text-[7px] tracking-[.16em] text-white/22">
            <span>PRIVATE PREVIEW</span>
            <span>{de ? 'ECHTE DATEN BLEIBEN ECHT' : 'REAL DATA STAYS REAL'}</span>
            <span>{de ? 'AKTIONEN NUR MIT FREIGABE' : 'ACTIONS REQUIRE APPROVAL'}</span>
          </div>
        </div>
      </section>

      <section className="bg-[#ebe5d8] px-5 py-20 text-[#1d211b] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="font-mono text-[8px] font-semibold tracking-[.22em] text-[#60715a]">{de ? 'WAS YORI ZUSAMMENZIEHT' : 'WHAT YORI BRINGS TOGETHER'}</p>
              <h2 className="mt-4 max-w-xl font-serif text-[clamp(3rem,6vw,5.8rem)] font-light leading-[.9] tracking-[-.045em]">
                {de ? 'Weniger Suchen. Mehr entscheiden.' : 'Less searching. More deciding.'}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#30372c]/62 lg:justify-self-end">
              {de ? 'YORI ersetzt deine Plattformen nicht. Es baut darüber eine ruhige Arbeitsebene, in der aus verstreuten Signalen konkrete nächste Schritte werden.' : 'YORI does not replace your platforms. It adds a calm work layer where scattered signals become concrete next steps.'}
            </p>
          </div>

          <div className="mt-14 grid border-t border-[#2b3028]/14 md:grid-cols-2">
            {benefits.map(([name, text], index) => (
              <div key={name} className={`border-b border-[#2b3028]/14 py-7 md:px-6 ${index % 2 === 0 ? 'md:border-r md:pl-0' : 'md:pr-0'}`}>
                <div className="font-mono text-[8px] tracking-[.2em] text-[#6e7c67]">0{index + 1} / {name}</div>
                <p className="mt-3 max-w-lg text-lg leading-7 text-[#22271f]/76">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#12150f] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-mono text-[8px] tracking-[.22em] text-[#a8bb9e]/52">{de ? 'SO STARTET ES' : 'HOW IT STARTS'}</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-white/92 sm:text-6xl">{de ? 'Kein Setup-Projekt.' : 'Not a setup project.'}</h2>
          </div>
          <div className="mt-12 grid border-t border-white/[.08] md:grid-cols-3">
            {steps.map(([no, title, text], index) => (
              <div key={no} className={`py-7 md:px-7 ${index < 2 ? 'border-b border-white/[.07] md:border-b-0 md:border-r' : ''} ${index === 0 ? 'md:pl-0' : ''}`}>
                <div className="font-mono text-[8px] tracking-[.2em] text-[#d0b977]/52">{no}</div>
                <h3 className="mt-4 font-serif text-3xl font-light text-white/90">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/42">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#171a14] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <YoriMark className="mx-auto h-9 w-9 text-[#d9c487]" />
          <p className="mt-5 font-mono text-[8px] tracking-[.22em] text-white/28">YORI · CREATOR OS</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(3rem,6vw,5.7rem)] font-light leading-[.92] tracking-[-.045em] text-white/94">
            {de ? 'Du sollst nicht mehr organisieren als erschaffen.' : 'You should not spend more time organizing than creating.'}
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="https://yori.saimor.world/demo" className="group inline-flex min-h-12 items-center gap-2 bg-[#e9dfc4] px-6 text-sm font-bold text-[#182016] transition hover:bg-white">
              {de ? 'YORI ausprobieren' : 'Try YORI'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="inline-flex items-center gap-2 text-xs text-white/34"><Check className="h-3.5 w-3.5 text-[#95b88c]" /> {de ? 'Keine erfundene Aktivität' : 'No invented activity'}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
