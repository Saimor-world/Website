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
      };

  return (
    <main className="overflow-hidden bg-[#06100a] text-[#f2eee3]">
      <section className="relative min-h-[100svh] overflow-hidden">
        <YoriAmbientGarden />
        <div className="hero-veil pointer-events-none absolute inset-0" />
        <div className="sun-thread pointer-events-none absolute right-[17%] top-[-8%] h-[78vh] w-px rotate-[17deg] bg-gradient-to-b from-[#ead8a0]/0 via-[#ead8a0]/25 to-[#ead8a0]/0 blur-[.2px]" />
        <div className="sun-thread sun-thread-b pointer-events-none absolute right-[28%] top-[-4%] h-[70vh] w-px rotate-[12deg] bg-gradient-to-b from-[#ead8a0]/0 via-[#ead8a0]/14 to-[#ead8a0]/0 blur-[.2px]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-8 pt-6 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between">
            <a href={de ? '/de' : '/en'} className="group flex items-center gap-3 text-[#d8c58b]">
              <YoriMark className="h-7 w-7" />
              <div>
                <div className="font-serif text-[15px] tracking-[.22em] text-[#efe9dc]">YORI</div>
                <div className="mt-1 font-mono text-[7px] tracking-[.22em] text-white/24">SAIMÔR</div>
              </div>
            </a>
            <a href={de ? '/de' : '/en'} className="font-mono text-[8px] tracking-[.18em] text-white/26 transition hover:text-white/60">{copy.back}</a>
          </header>

          <div className="flex flex-1 items-end pb-[11vh] pt-24 sm:pb-[13vh] lg:pb-[14vh]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 font-mono text-[8px] tracking-[.28em] text-[#d9c487]/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d9c487] shadow-[0_0_18px_rgba(217,196,135,.42)]" />
                YORI · 縁
              </div>
              <h1 className="mt-6 whitespace-pre-line font-serif text-[clamp(3.8rem,8vw,7.8rem)] font-light leading-[.87] tracking-[-.055em] text-[#f4f0e6] drop-shadow-[0_14px_42px_rgba(0,0,0,.22)]">
                {copy.title}
              </h1>
              <form action="https://yori.saimor.world/demo" method="get" className="mt-9 max-w-[500px]">
                <input type="hidden" name="platform" value="instagram" />
                <div className="profile-line flex items-stretch border-b border-[#d7c791]/22 bg-black/[.035] backdrop-blur-[3px] transition-colors focus-within:border-[#d7c791]/48">
                  <span className="flex items-center px-1 pr-2 text-sm text-white/24">@</span>
                  <input name="creator" required maxLength={64} autoComplete="off" placeholder={copy.placeholder} className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#f4efe3] outline-none placeholder:text-white/18" />
                  <button type="submit" className="px-4 font-mono text-[8px] tracking-[.18em] text-[#d8c58b]/72 transition hover:text-[#f2e3b6]">{copy.enter} →</button>
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

      <section className="relative min-h-[96svh] overflow-hidden border-t border-white/[.045] bg-[#08110c]">
        <YoriAmbientGarden compact />
        <div className="garden-second absolute inset-0" />
        <div className="raked-sand absolute inset-x-[-10%] bottom-[-17%] h-[72%] rounded-[50%] opacity-80" />

        <div className="relative mx-auto grid min-h-[96svh] max-w-[1500px] items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[.34fr_.66fr] lg:px-14">
          <div className="max-w-md self-center">
            <h2 className="font-serif text-[clamp(3.15rem,5.7vw,5.8rem)] font-light leading-[.91] tracking-[-.048em] text-[#eee9dc]">{copy.still}</h2>
          </div>

          <div className="relative mx-auto h-[610px] w-full max-w-[900px] sm:h-[680px]">
            <div className="stone-orbit orbit-a absolute left-[6%] top-[46%] h-[220px] w-[330px] rounded-[50%] border border-[#d8c892]/10" />
            <div className="stone-orbit orbit-b absolute right-[14%] top-[8%] h-[240px] w-[350px] rounded-[50%] border border-[#d8c892]/10" />
            <div className="stone-orbit orbit-c absolute right-[3%] bottom-[5%] h-[210px] w-[320px] rounded-[50%] border border-[#d8c892]/10" />

            <div className="stone-group group absolute left-[14%] top-[55%]">
              <div className="stone stone-a h-24 w-32 -rotate-6" />
              <div className="mt-5 font-mono text-[8px] tracking-[.16em] text-[#d9c487]/42 transition group-hover:text-[#d9c487]/72">{copy.deals}</div>
            </div>
            <div className="stone-group group absolute left-[48%] top-[39%]">
              <div className="stone stone-b h-[72px] w-[108px] rotate-3" />
              <div className="mt-5 font-mono text-[8px] tracking-[.16em] text-[#d9c487]/42 transition group-hover:text-[#d9c487]/72">{copy.idea}</div>
            </div>
            <div className="stone-group group absolute right-[6%] top-[14%] text-right">
              <div className="stone stone-c ml-auto h-28 w-36 -rotate-3" />
              <div className="mt-5 font-mono text-[8px] tracking-[.16em] text-[#d9c487]/42 transition group-hover:text-[#d9c487]/72">{copy.content}</div>
            </div>
            <div className="stone-group group absolute right-[12%] bottom-[10%] text-right">
              <div className="stone stone-d ml-auto h-24 w-32 rotate-2" />
              <div className="mt-5 font-mono text-[8px] tracking-[.16em] text-[#d9c487]/42 transition group-hover:text-[#d9c487]/72">{copy.today}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[82svh] overflow-hidden border-t border-white/[.045] bg-[#06100a]">
        <YoriAmbientGarden compact />
        <div className="final-veil absolute inset-0" />
        <div className="relative mx-auto flex min-h-[82svh] max-w-[1200px] flex-col items-center justify-center px-6 text-center">
          <YoriMark className="h-12 w-12 text-[#d9c487]/78 drop-shadow-[0_0_28px_rgba(217,196,135,.15)]" />
          <div className="mt-6 font-serif text-2xl tracking-[.16em] text-[#f0eadc]/82">YORI</div>
          <div className="mt-8 h-14 w-px bg-gradient-to-b from-[#d9c487]/0 via-[#d9c487]/28 to-[#d9c487]/0" />
          <a href="https://yori.saimor.world/demo" className="mt-8 border border-[#d9c487]/18 bg-black/10 px-6 py-3 font-mono text-[8px] tracking-[.2em] text-[#dfcf9e]/68 backdrop-blur-sm transition hover:border-[#d9c487]/34 hover:bg-black/15 hover:text-[#f0dfab]">{copy.enter}</a>
        </div>
      </section>

      <style>{`
        .hero-veil{background:linear-gradient(90deg,rgba(3,8,5,.84) 0%,rgba(3,8,5,.52) 34%,rgba(3,8,5,.07) 68%,rgba(3,8,5,.2) 100%),linear-gradient(180deg,rgba(2,6,4,.12),transparent 55%,rgba(2,6,4,.5))}
        .sun-thread{animation:sunDrift 13s ease-in-out infinite alternate}.sun-thread-b{animation-delay:-4s}
        .garden-second{background:linear-gradient(90deg,rgba(5,12,8,.68),rgba(5,12,8,.16) 50%,rgba(5,12,8,.32)),linear-gradient(180deg,rgba(5,12,8,.26),rgba(5,12,8,.08) 40%,rgba(5,12,8,.52))}
        .raked-sand{background:repeating-radial-gradient(ellipse at 58% 52%,rgba(225,211,160,.11) 0 1px,transparent 1px 15px);filter:blur(.05px);transform:rotate(-7deg)}
        .stone{position:relative;border-radius:50% 50% 46% 54%/58% 60% 40% 42%;box-shadow:0 26px 52px rgba(0,0,0,.5),inset 0 1px rgba(255,255,255,.05);transition:transform .75s cubic-bezier(.2,.7,.2,1),filter .75s ease;isolation:isolate}
        .stone::after{content:'';position:absolute;inset:10% 13% 52% 16%;border-radius:999px;background:linear-gradient(180deg,rgba(232,226,194,.09),transparent);filter:blur(5px)}
        .stone-a{background:radial-gradient(circle at 36% 25%,#6a7060 0%,#3a4137 37%,#171f1a 100%)}
        .stone-b{background:radial-gradient(circle at 39% 28%,#646b5c 0%,#353d34 39%,#161e19 100%)}
        .stone-c{background:radial-gradient(circle at 34% 24%,#707565 0%,#3c4339 38%,#18201b 100%)}
        .stone-d{background:radial-gradient(circle at 40% 23%,#626b59 0%,#343b31 39%,#151d18 100%)}
        .stone-group:hover .stone{transform:translateY(-5px) scale(1.015);filter:brightness(1.05)}
        .stone-orbit{box-shadow:0 0 70px rgba(217,196,135,.025);animation:orbitBreathe 12s ease-in-out infinite alternate}.orbit-b{animation-delay:-4s}.orbit-c{animation-delay:-7s}
        .final-veil{background:radial-gradient(circle at 50% 43%,rgba(221,204,143,.11),transparent 24%),linear-gradient(180deg,rgba(3,9,5,.72),rgba(3,9,5,.18) 44%,rgba(3,9,5,.72))}
        @keyframes sunDrift{from{opacity:.36;transform:translate3d(-8px,0,0) rotate(17deg)}to{opacity:.75;transform:translate3d(10px,5px,0) rotate(17deg)}}
        @keyframes orbitBreathe{from{opacity:.45;transform:scale(.98)}to{opacity:.9;transform:scale(1.03)}}
        @media(max-width:640px){.stone-group{transform:scale(.8)}.stone-group:nth-of-type(2){margin-left:-5%}.raked-sand{opacity:.52}.sun-thread{right:8%}}
        @media(prefers-reduced-motion:reduce){.sun-thread,.stone-orbit{animation:none!important}.stone-group:hover .stone{transform:none}}
      `}</style>
    </main>
  );
}
