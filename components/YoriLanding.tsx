import YoriAmbientGarden from '@/components/YoriAmbientGarden';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';

  const copy = de
    ? {
        back: 'SAIMÔR',
        title: 'Ein ruhiger Ort\nfür Creator.',
        enter: 'Eintreten',
        profile: 'Mit deinem Profil',
        placeholder: 'deinusername',
        still: 'Alles an seinem Platz.',
        idea: 'Ideen',
        content: 'Content',
        deals: 'Kooperationen',
        today: 'Heute',
        quiet: 'Weniger Lärm. Mehr Raum.',
      }
    : {
        back: 'SAIMÔR',
        title: 'A quiet place\nfor creators.',
        enter: 'Enter',
        profile: 'With your profile',
        placeholder: 'yourusername',
        still: 'Everything in its place.',
        idea: 'Ideas',
        content: 'Content',
        deals: 'Collaborations',
        today: 'Today',
        quiet: 'Less noise. More room.',
      };

  return (
    <main className="overflow-hidden bg-[#06100a] text-[#f2eee3]">
      <section className="relative min-h-[100svh] overflow-hidden">
        <YoriAmbientGarden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,11,7,.84)_0%,rgba(4,11,7,.5)_35%,rgba(4,11,7,.08)_68%,rgba(4,11,7,.18)_100%),linear-gradient(180deg,rgba(2,6,4,.18),rgba(2,6,4,.03)_58%,rgba(2,6,4,.46))]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-8 pt-6 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between">
            <a href={de ? '/de' : '/en'} className="group flex items-center gap-3 text-[#d8c58b]">
              <YoriMark className="h-7 w-7" />
              <div>
                <div className="font-serif text-[15px] tracking-[.22em] text-[#efe9dc]">YORI</div>
                <div className="mt-1 font-mono text-[7px] tracking-[.22em] text-white/24">SAIMÔR</div>
              </div>
            </a>
            <a href={de ? '/de' : '/en'} className="font-mono text-[8px] tracking-[.18em] text-white/26 transition hover:text-white/60">
              {copy.back}
            </a>
          </header>

          <div className="flex flex-1 items-end pb-[11vh] pt-24 sm:pb-[13vh] lg:pb-[14vh]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 font-mono text-[8px] tracking-[.28em] text-[#d9c487]/64">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d9c487] shadow-[0_0_18px_rgba(217,196,135,.42)]" />
                YORI · 縁
              </div>

              <h1 className="mt-6 whitespace-pre-line font-serif text-[clamp(3.8rem,8vw,7.8rem)] font-light leading-[.87] tracking-[-.055em] text-[#f4f0e6]">
                {copy.title}
              </h1>

              <form action="https://yori.saimor.world/demo" method="get" className="mt-9 max-w-[500px]">
                <input type="hidden" name="platform" value="instagram" />
                <div className="flex items-stretch border-b border-[#d7c791]/22 bg-black/[.03] backdrop-blur-[2px] transition-colors focus-within:border-[#d7c791]/46">
                  <span className="flex items-center px-1 pr-2 text-sm text-white/24">@</span>
                  <input
                    name="creator"
                    required
                    maxLength={64}
                    autoComplete="off"
                    placeholder={copy.placeholder}
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#f4efe3] outline-none placeholder:text-white/18"
                  />
                  <button type="submit" className="px-4 font-mono text-[8px] tracking-[.18em] text-[#d8c58b]/72 transition hover:text-[#f2e3b6]">
                    {copy.enter} →
                  </button>
                </div>
                <div className="mt-3 font-mono text-[7px] tracking-[.18em] text-white/20">{copy.profile}</div>
              </form>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
            <div className="mx-auto h-8 w-px bg-gradient-to-b from-white/0 via-white/16 to-white/0" />
            <div className="mt-2 font-mono text-[6px] tracking-[.24em] text-white/16">SCROLL</div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[94svh] overflow-hidden border-t border-white/[.045] bg-[#09130d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_44%,rgba(138,158,111,.12),transparent_27%),radial-gradient(circle_at_30%_78%,rgba(52,83,55,.2),transparent_30%),linear-gradient(180deg,#0b150f_0%,#08110c_100%)]" />
        <div className="sand-field absolute inset-0 opacity-[.22]" />

        <div className="relative mx-auto grid min-h-[94svh] max-w-[1500px] items-center gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[.34fr_.66fr] lg:px-14">
          <div className="max-w-md self-center">
            <div className="font-mono text-[7px] tracking-[.24em] text-[#d7c991]/34">01</div>
            <h2 className="mt-5 font-serif text-[clamp(3.1rem,5.7vw,5.7rem)] font-light leading-[.91] tracking-[-.048em] text-[#eee9dc]">
              {copy.still}
            </h2>
            <p className="mt-6 text-sm text-white/28">{copy.quiet}</p>
          </div>

          <div className="relative mx-auto h-[590px] w-full max-w-[860px] sm:h-[650px]">
            <svg viewBox="0 0 860 650" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <radialGradient id="sandGlow" cx="50%" cy="50%" r="50%"><stop stopColor="#d8c990" stopOpacity=".09"/><stop offset="1" stopColor="#d8c990" stopOpacity="0"/></radialGradient>
              </defs>
              <ellipse cx="522" cy="346" rx="330" ry="260" fill="url(#sandGlow)" />
              <g fill="none" stroke="#d8c892" strokeOpacity=".13" strokeWidth="1.25" strokeLinecap="round">
                <path d="M64 480C184 367 287 428 405 324C506 235 590 282 765 130" />
                <path d="M72 499C195 386 300 445 418 342C523 251 606 302 786 151" />
                <path d="M92 520C219 416 329 467 449 379C549 305 638 327 804 213" />
                <ellipse cx="242" cy="420" rx="128" ry="68" />
                <ellipse cx="242" cy="420" rx="98" ry="50" />
                <ellipse cx="515" cy="323" rx="118" ry="61" />
                <ellipse cx="515" cy="323" rx="84" ry="42" />
                <ellipse cx="693" cy="179" rx="105" ry="54" />
                <ellipse cx="693" cy="179" rx="72" ry="36" />
                <ellipse cx="644" cy="482" rx="118" ry="60" />
                <ellipse cx="644" cy="482" rx="86" ry="42" />
              </g>
            </svg>

            <div className="stone-group group absolute left-[16%] top-[56%]">
              <div className="stone h-24 w-32 -rotate-6 rounded-[48%_52%_45%_55%/60%_58%_42%_40%] bg-[radial-gradient(circle_at_38%_27%,#626758_0%,#343a31_37%,#151d18_100%)] shadow-[0_28px_56px_rgba(0,0,0,.48)] transition duration-700 group-hover:-translate-y-1" />
              <div className="mt-5 font-mono text-[8px] tracking-[.16em] text-[#d9c487]/46 transition group-hover:text-[#d9c487]/72">{copy.deals}</div>
            </div>

            <div className="stone-group group absolute left-[51%] top-[39%]">
              <div className="stone h-[72px] w-[108px] rotate-3 rounded-[52%_48%_50%_50%/62%_58%_42%_38%] bg-[radial-gradient(circle_at_38%_28%,#606656_0%,#343a31_38%,#161e19_100%)] shadow-[0_24px_50px_rgba(0,0,0,.44)] transition duration-700 group-hover:-translate-y-1" />
              <div className="mt-5 font-mono text-[8px] tracking-[.16em] text-[#d9c487]/46 transition group-hover:text-[#d9c487]/72">{copy.idea}</div>
            </div>

            <div className="stone-group group absolute right-[7%] top-[15%] text-right">
              <div className="stone ml-auto h-28 w-36 -rotate-3 rounded-[54%_46%_48%_52%/58%_62%_38%_42%] bg-[radial-gradient(circle_at_38%_26%,#686c5d_0%,#363d33_38%,#171f1a_100%)] shadow-[0_30px_58px_rgba(0,0,0,.48)] transition duration-700 group-hover:-translate-y-1" />
              <div className="mt-5 font-mono text-[8px] tracking-[.16em] text-[#d9c487]/46 transition group-hover:text-[#d9c487]/72">{copy.content}</div>
            </div>

            <div className="stone-group group absolute right-[13%] bottom-[12%] text-right">
              <div className="stone ml-auto h-24 w-32 rotate-2 rounded-[50%_50%_48%_52%/62%_55%_45%_38%] bg-[radial-gradient(circle_at_40%_24%,#606756_0%,#333a30_38%,#151d18_100%)] shadow-[0_28px_54px_rgba(0,0,0,.46)] transition duration-700 group-hover:-translate-y-1" />
              <div className="mt-5 font-mono text-[8px] tracking-[.16em] text-[#d9c487]/46 transition group-hover:text-[#d9c487]/72">{copy.today}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[78svh] overflow-hidden border-t border-white/[.045] bg-[#07100a]">
        <YoriAmbientGarden compact />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,7,.72),rgba(4,11,7,.28)_46%,rgba(4,11,7,.7)),radial-gradient(circle_at_50%_48%,rgba(214,199,145,.07),transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[78svh] max-w-[1200px] flex-col items-center justify-center px-6 text-center">
          <YoriMark className="h-11 w-11 text-[#d9c487]/76" />
          <div className="mt-6 font-serif text-2xl tracking-[.16em] text-[#f0eadc]/82">YORI</div>
          <div className="mt-8 h-14 w-px bg-gradient-to-b from-[#d9c487]/0 via-[#d9c487]/28 to-[#d9c487]/0" />
          <a href="https://yori.saimor.world/demo" className="mt-8 border border-[#d9c487]/18 bg-black/10 px-6 py-3 font-mono text-[8px] tracking-[.2em] text-[#dfcf9e]/68 backdrop-blur-sm transition hover:border-[#d9c487]/34 hover:text-[#f0dfab]">
            {copy.enter}
          </a>
        </div>
      </section>

      <style>{`
        .sand-field{
          background-image:
            repeating-radial-gradient(ellipse at 72% 48%,rgba(218,204,155,.13) 0 1px,transparent 1px 15px),
            radial-gradient(circle at 70% 48%,rgba(255,255,255,.018),transparent 42%);
          filter:blur(.05px);
        }
        .stone{position:relative;isolation:isolate}
        .stone::after{content:'';position:absolute;inset:9% 12% 52% 15%;border-radius:999px;background:linear-gradient(180deg,rgba(225,221,190,.08),transparent);filter:blur(5px);opacity:.8}
        .stone-group{transition:opacity .7s ease}
        @media(max-width:640px){.stone-group{transform:scale(.82)}.stone-group:nth-of-type(2){margin-left:-4%}.sand-field{opacity:.15}}
      `}</style>
    </main>
  );
}
