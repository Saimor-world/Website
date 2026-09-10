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
        quiet: 'Weniger Lärm. Mehr Raum für das, was du aufbaust.',
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
        quiet: 'Less noise. More room for what you are building.',
      };

  return (
    <main className="overflow-hidden bg-[#07100b] text-[#f2eee3]">
      <section className="relative min-h-[100svh] overflow-hidden">
        <YoriAmbientGarden />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,11,7,.82)_0%,rgba(4,11,7,.48)_38%,rgba(4,11,7,.08)_69%,rgba(4,11,7,.22)_100%),linear-gradient(180deg,rgba(2,6,4,.2),rgba(2,6,4,.05)_58%,rgba(2,6,4,.42))]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-8 pt-6 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between">
            <a href={de ? '/de' : '/en'} className="group flex items-center gap-3 text-[#d8c58b]">
              <YoriMark className="h-7 w-7" />
              <div>
                <div className="font-serif text-[15px] tracking-[.22em] text-[#efe9dc]">YORI</div>
                <div className="mt-1 font-mono text-[7px] tracking-[.22em] text-white/28">SAIMÔR</div>
              </div>
            </a>
            <a href={de ? '/de' : '/en'} className="font-mono text-[8px] tracking-[.18em] text-white/30 transition hover:text-white/64">
              {copy.back}
            </a>
          </header>

          <div className="flex flex-1 items-end pb-[10vh] pt-24 sm:pb-[12vh] lg:pb-[14vh]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 font-mono text-[8px] tracking-[.28em] text-[#d9c487]/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d9c487] shadow-[0_0_18px_rgba(217,196,135,.46)]" />
                YORI · 縁
              </div>

              <h1 className="mt-6 whitespace-pre-line font-serif text-[clamp(3.8rem,8vw,7.8rem)] font-light leading-[.87] tracking-[-.055em] text-[#f4f0e6]">
                {copy.title}
              </h1>

              <form action="https://yori.saimor.world/demo" method="get" className="mt-8 max-w-[520px]">
                <input type="hidden" name="platform" value="instagram" />
                <div className="flex items-stretch border-b border-[#d7c791]/24 bg-black/5 backdrop-blur-[2px]">
                  <span className="flex items-center px-1 pr-2 text-sm text-white/26">@</span>
                  <input
                    name="creator"
                    required
                    maxLength={64}
                    autoComplete="off"
                    placeholder={copy.placeholder}
                    className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#f4efe3] outline-none placeholder:text-white/20"
                  />
                  <button type="submit" className="px-4 font-mono text-[8px] tracking-[.18em] text-[#d8c58b]/78 transition hover:text-[#f2e3b6]">
                    {copy.enter} →
                  </button>
                </div>
                <div className="mt-3 font-mono text-[7px] tracking-[.18em] text-white/24">{copy.profile}</div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[88svh] overflow-hidden border-t border-white/[.055] bg-[#0a130d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_48%,rgba(126,151,105,.12),transparent_28%),linear-gradient(180deg,#0b140e_0%,#09110c_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[.12] [background-image:repeating-radial-gradient(ellipse_at_68%_52%,rgba(221,210,174,.28)_0_1px,transparent_1px_14px)]" />

        <div className="relative mx-auto grid min-h-[88svh] max-w-[1500px] items-center gap-10 px-6 py-20 sm:px-10 lg:grid-cols-[.36fr_.64fr] lg:px-14">
          <div className="max-w-md">
            <h2 className="font-serif text-[clamp(3.1rem,5.7vw,5.7rem)] font-light leading-[.91] tracking-[-.048em] text-[#eee9dc]">
              {copy.still}
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-6 text-white/35">{copy.quiet}</p>
          </div>

          <div className="relative mx-auto h-[560px] w-full max-w-[820px] sm:h-[620px]">
            <svg viewBox="0 0 820 620" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <g fill="none" stroke="#d8c892" strokeOpacity=".16" strokeWidth="1.2">
                <path d="M105 432 C218 326 300 394 405 306 C493 231 560 262 695 142" />
                <path d="M114 448 C226 345 310 410 417 324 C506 253 579 283 714 159" />
                <path d="M144 468 C258 392 347 435 458 368 C546 315 621 313 736 240" />
                <ellipse cx="235" cy="390" rx="116" ry="60" />
                <ellipse cx="235" cy="390" rx="86" ry="42" />
                <ellipse cx="500" cy="312" rx="108" ry="56" />
                <ellipse cx="500" cy="312" rx="78" ry="39" />
                <ellipse cx="663" cy="182" rx="94" ry="48" />
                <ellipse cx="663" cy="182" rx="66" ry="32" />
                <ellipse cx="616" cy="448" rx="110" ry="56" />
                <ellipse cx="616" cy="448" rx="80" ry="40" />
              </g>
            </svg>

            <div className="absolute left-[18%] top-[55%] h-20 w-28 -rotate-6 rounded-[48%_52%_45%_55%/60%_58%_42%_40%] bg-[radial-gradient(circle_at_38%_28%,#5b5f4e_0%,#31372e_36%,#161d18_100%)] shadow-[0_22px_45px_rgba(0,0,0,.42)]" />
            <div className="absolute left-[52%] top-[40%] h-16 w-24 rotate-3 rounded-[52%_48%_50%_50%/62%_58%_42%_38%] bg-[radial-gradient(circle_at_38%_28%,#5a604f_0%,#32392f_38%,#171d19_100%)] shadow-[0_20px_42px_rgba(0,0,0,.38)]" />
            <div className="absolute right-[10%] top-[18%] h-24 w-32 -rotate-3 rounded-[54%_46%_48%_52%/58%_62%_38%_42%] bg-[radial-gradient(circle_at_38%_26%,#626655_0%,#343a31_38%,#171d19_100%)] shadow-[0_25px_50px_rgba(0,0,0,.42)]" />
            <div className="absolute right-[15%] bottom-[16%] h-20 w-28 rotate-2 rounded-[50%_50%_48%_52%/62%_55%_45%_38%] bg-[radial-gradient(circle_at_40%_24%,#59604e_0%,#31372d_38%,#161c18_100%)] shadow-[0_24px_48px_rgba(0,0,0,.4)]" />

            <div className="absolute left-[20%] top-[49%] font-mono text-[8px] tracking-[.16em] text-[#d9c487]/62">{copy.deals}</div>
            <div className="absolute left-[54%] top-[34%] font-mono text-[8px] tracking-[.16em] text-[#d9c487]/62">{copy.idea}</div>
            <div className="absolute right-[9%] top-[11%] font-mono text-[8px] tracking-[.16em] text-[#d9c487]/62">{copy.content}</div>
            <div className="absolute right-[14%] bottom-[10%] font-mono text-[8px] tracking-[.16em] text-[#d9c487]/62">{copy.today}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
