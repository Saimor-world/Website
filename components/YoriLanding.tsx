import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };

const COPY = {
  de: {
    back: 'SAIMÔR',
    eyebrow: 'YORI · EIN ANDERER WEG',
    title: 'Mehr Raum.\nWeniger Lärm.',
    lead: 'Ein ruhiger Arbeitsraum für Creator – Content, Ideen, Kooperationen und Termine, ohne dass alles gleichzeitig Aufmerksamkeit verlangt.',
    enter: 'Eintreten',
    profile: 'Starte mit deinem Profil',
    placeholder: 'deinusername',
    gardenEyebrow: 'DER GARTEN',
    gardenTitle: 'Alles bekommt seinen Platz.',
    gardenText: 'YORI ordnet nicht wie ein Dashboard. Es hält Dinge ruhig nebeneinander, bis sie wieder wichtig werden.',
    stones: [['Ideen', 'noch nicht fertig'], ['Content', 'in Bewegung'], ['Kooperationen', 'wenn sie dran sind'], ['Heute', 'nur was jetzt zählt']],
    closing: 'Ein Gedanke nach dem anderen.',
    closingSub: 'Kein Feed. Kein Druck. Nur der nächste klare Schritt.',
  },
  en: {
    back: 'SAIMÔR',
    eyebrow: 'YORI · ANOTHER WAY',
    title: 'More space.\nLess noise.',
    lead: 'A calm workspace for creators – content, ideas, collaborations and meetings without everything demanding attention at once.',
    enter: 'Enter',
    profile: 'Start with your profile',
    placeholder: 'yourusername',
    gardenEyebrow: 'THE GARDEN',
    gardenTitle: 'Everything gets its place.',
    gardenText: 'YORI does not arrange your work like a dashboard. It keeps things quietly beside each other until they matter again.',
    stones: [['Ideas', 'not finished yet'], ['Content', 'in motion'], ['Collaborations', 'when their time comes'], ['Today', 'only what matters now']],
    closing: 'One thought at a time.',
    closingSub: 'No feed. No pressure. Just the next clear step.',
  },
} as const;

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';
  const c = COPY[locale];
  const homeHref = de ? '/de' : '/en';

  return (
    <main className="overflow-hidden bg-[#f3f0e7] text-[#173529]">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-[#264d3a]/10">
        <ZenGardenScene hero />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1480px] flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between">
            <a href={homeHref} className="group flex items-center gap-3 text-[#1c4937]">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#274c3a]/14 bg-white/45 shadow-[0_8px_30px_rgba(43,72,55,.06)]"><YoriMark className="h-6 w-6" /></span>
              <div><div className="font-serif text-[16px] tracking-[.22em] text-[#183c2e]">YORI</div><div className="mt-1 font-mono text-[7px] tracking-[.22em] text-[#365846]/45">縁 · SAIMÔR</div></div>
            </a>
            <a href={homeHref} className="font-mono text-[8px] tracking-[.2em] text-[#294a39]/45 transition hover:text-[#173529]">{c.back}</a>
          </header>

          <div className="grid flex-1 items-center gap-12 pb-12 pt-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 font-mono text-[8px] tracking-[.29em] text-[#3b624d]/58"><span className="h-px w-8 bg-[#52745e]/45" />{c.eyebrow}</div>
              <h1 className="mt-7 whitespace-pre-line font-serif text-[clamp(4rem,8vw,8rem)] font-light leading-[.84] tracking-[-.058em] text-[#17392c]">{c.title}</h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#365444]/68 sm:text-lg sm:leading-8">{c.lead}</p>

              <form action="https://yori.saimor.world/demo" method="get" className="mt-10 max-w-[520px]">
                <input type="hidden" name="platform" value="instagram" />
                <div className="flex items-stretch border-b border-[#284d3a]/22 bg-white/30 transition focus-within:border-[#284d3a]/55">
                  <span className="flex items-center pl-1 pr-2 text-sm text-[#284d3a]/38">@</span>
                  <input name="creator" required maxLength={64} autoComplete="off" placeholder={c.placeholder} className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#173529] outline-none placeholder:text-[#284d3a]/28" />
                  <button type="submit" className="px-4 font-mono text-[8px] tracking-[.18em] text-[#244c38]/65 transition hover:text-[#173529]">{c.enter} →</button>
                </div>
                <div className="mt-3 font-mono text-[7px] tracking-[.18em] text-[#315441]/35">{c.profile}</div>
              </form>
            </div>

            <div className="relative hidden h-[650px] lg:block" aria-hidden="true">
              <div className="absolute bottom-[13%] left-[12%] h-[110px] w-[170px] rotate-[-7deg] rounded-[48%_52%_45%_55%/58%_54%_46%_42%] bg-[radial-gradient(circle_at_36%_25%,#fff_0%,#e7e5dc_42%,#cbc9bf_100%)] shadow-[0_25px_55px_rgba(49,67,53,.12),inset_0_1px_0_rgba(255,255,255,.9)]" />
              <div className="absolute bottom-[31%] right-[22%] h-[78px] w-[118px] rotate-[5deg] rounded-[53%_47%_56%_44%/48%_59%_41%_52%] bg-[radial-gradient(circle_at_35%_26%,#fff_0%,#ece9df_46%,#cfcdc3_100%)] shadow-[0_22px_48px_rgba(49,67,53,.1)]" />
              <div className="absolute right-[6%] top-[17%] h-[62px] w-[91px] rotate-[-4deg] rounded-[48%_52%_46%_54%/58%_52%_48%_42%] bg-[radial-gradient(circle_at_36%_24%,#fff_0%,#ebe8df_48%,#cbc9bf_100%)] shadow-[0_18px_44px_rgba(49,67,53,.09)]" />
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center"><div className="mx-auto h-8 w-px bg-gradient-to-b from-[#244b38]/0 via-[#244b38]/22 to-[#244b38]/0" /><div className="mt-2 font-mono text-[6px] tracking-[.24em] text-[#244b38]/30">SCROLL</div></div>
        </div>
      </section>

      <section className="relative min-h-[94svh] overflow-hidden bg-[#f7f4eb] px-6 py-20 sm:px-10 lg:px-14 md:py-28">
        <ZenGardenScene />
        <div className="relative z-10 mx-auto grid min-h-[72svh] max-w-[1380px] gap-16 lg:grid-cols-[.42fr_.58fr] lg:items-center">
          <div className="max-w-lg">
            <p className="font-mono text-[8px] tracking-[.28em] text-[#345945]/48">{c.gardenEyebrow}</p>
            <h2 className="mt-6 font-serif text-[clamp(3.4rem,6vw,6.5rem)] font-light leading-[.9] tracking-[-.05em] text-[#17392c]">{c.gardenTitle}</h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-[#365444]/58 sm:text-base">{c.gardenText}</p>
          </div>

          <div className="relative h-[620px] sm:h-[720px]" aria-label={c.gardenTitle}>
            <div className="absolute inset-[5%] rounded-[50%] border border-[#41624d]/[.055]" />
            <div className="absolute inset-[15%_9%] rounded-[50%] border border-[#41624d]/[.05]" />
            {c.stones.map(([title, sub], index) => {
              const positions = ['left-[6%] bottom-[12%]', 'left-[39%] top-[39%]', 'right-[5%] top-[13%]', 'right-[12%] bottom-[12%]'];
              const sizes = ['h-28 w-40', 'h-20 w-28', 'h-32 w-44', 'h-24 w-36'];
              const rotations = ['-rotate-6', 'rotate-3', '-rotate-3', 'rotate-2'];
              return <div key={title} className={`group absolute ${positions[index]}`}>
                <div className={`${sizes[index]} ${rotations[index]} rounded-[49%_51%_46%_54%/56%_59%_41%_44%] bg-[radial-gradient(circle_at_35%_24%,#fff_0%,#e9e6dc_47%,#cfcdc3_100%)] shadow-[0_24px_55px_rgba(45,67,52,.12)] transition-transform duration-700 group-hover:-translate-y-1`} />
                <div className="mt-5 font-serif text-xl text-[#1a3e2f]/78">{title}</div><div className="mt-1 font-mono text-[7px] tracking-[.15em] text-[#355744]/38">{sub}</div>
              </div>;
            })}
          </div>
        </div>
      </section>

      <section className="relative min-h-[72svh] overflow-hidden border-t border-[#294e3a]/10 bg-[#f0ede3] px-6 py-20 sm:px-10 lg:px-14">
        <div className="absolute left-[-12%] top-[-30%] h-[720px] w-[720px] rounded-full bg-[#204f38]/[.035] blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[58svh] max-w-5xl flex-col items-center justify-center text-center">
          <YoriMark className="h-11 w-11 text-[#214a36]/70" />
          <p className="mt-8 font-serif text-[clamp(3rem,6vw,6rem)] font-light leading-[.94] tracking-[-.045em] text-[#17392c]">{c.closing}</p>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#365444]/52 sm:text-base">{c.closingSub}</p>
          <a href="https://yori.saimor.world/demo" className="mt-9 inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#294e3a]/20 bg-white/38 px-7 py-3 font-mono text-[8px] tracking-[.2em] text-[#214a36]/70 transition hover:border-[#294e3a]/38 hover:bg-white/70 hover:text-[#173529]">{c.enter} →</a>
        </div>
      </section>
    </main>
  );
}

function ZenGardenScene({ hero = false }: { hero?: boolean }) {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,.88),transparent_27%),linear-gradient(180deg,rgba(255,255,255,.28),transparent_58%)]" />
    <div className={`tree-haze absolute ${hero ? '-right-[8%] -top-[8%] h-[88%] w-[46%]' : '-right-[12%] -top-[12%] h-[78%] w-[42%]'} opacity-80`} />
    <div className={`tree-haze tree-haze-left absolute ${hero ? '-left-[17%] bottom-[-8%] h-[55%] w-[35%]' : '-left-[14%] bottom-[-13%] h-[52%] w-[34%]'} opacity-45`} />
    <svg viewBox="0 0 1200 720" preserveAspectRatio="none" className="sand-lines absolute inset-x-[-4%] bottom-[-4%] h-[65%] w-[108%]">
      {Array.from({ length: 14 }).map((_, index) => <path key={index} d={`M-40 ${90 + index * 34} C190 ${25 + index * 31}, 315 ${150 + index * 26}, 520 ${95 + index * 32} S860 ${55 + index * 34}, 1240 ${105 + index * 32}`} fill="none" stroke="#315945" strokeOpacity={0.06 + index * 0.002} strokeWidth="1" />)}
    </svg>
    <svg viewBox="0 0 420 650" className="branch-lines absolute right-[-2%] top-[-4%] h-[72%] w-[36%] opacity-35">
      <path d="M320 0 C300 120 286 206 304 334 C315 420 284 515 248 650" fill="none" stroke="#17462f" strokeWidth="3" strokeOpacity=".45" />
      <path d="M301 170 C235 155 198 119 156 70 M304 278 C354 245 382 212 412 160 M293 390 C226 365 180 330 141 273 M281 492 C333 470 366 438 401 397" fill="none" stroke="#17462f" strokeWidth="1.4" strokeOpacity=".38" />
      <path d="M153 70 C121 84 104 106 88 136 M141 273 C110 287 91 311 73 340 M401 397 C377 406 360 424 346 447" fill="none" stroke="#17462f" strokeWidth="1" strokeOpacity=".24" />
    </svg>
    <style>{`
      .tree-haze{background:radial-gradient(ellipse at 70% 35%,rgba(20,73,48,.44),rgba(35,92,62,.18) 36%,transparent 68%);filter:blur(18px)}
      .tree-haze-left{background:radial-gradient(ellipse at 30% 58%,rgba(21,69,47,.35),rgba(43,94,67,.12) 40%,transparent 70%)}
      .sand-lines{animation:yoriSand 18s ease-in-out infinite alternate}
      .branch-lines{animation:yoriBranches 14s ease-in-out infinite alternate;transform-origin:80% 8%}
      @keyframes yoriSand{from{transform:translate3d(-.8%,0,0)}to{transform:translate3d(.9%,.5%,0)}}
      @keyframes yoriBranches{from{transform:rotate(-.35deg) translateY(0)}to{transform:rotate(.55deg) translateY(3px)}}
      @media(prefers-reduced-motion:reduce){.sand-lines,.branch-lines{animation:none!important}}
    `}</style>
  </div>;
}
