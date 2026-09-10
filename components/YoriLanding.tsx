import { ArrowRight } from 'lucide-react';
import YoriAmbientGarden from '@/components/YoriAmbientGarden';
import YoriMark from '@/components/YoriMark';

type Props = { locale: 'de' | 'en' };

export default function YoriLanding({ locale }: Props) {
  const de = locale === 'de';

  const words = de
    ? { title: 'Ein ruhiger Ort für Creator.', enter: 'Eintreten', profile: 'Mit deinem Profil', place: 'Alles an seinem Platz.', sub: 'Ideen. Content. Kooperationen. Heute.', entry: 'Mit deinem Profil eintreten.', note: 'Private Preview · keine erfundene Aktivität', back: 'Saimôr' }
    : { title: 'A quiet place for creators.', enter: 'Enter', profile: 'With your profile', place: 'Everything in its place.', sub: 'Ideas. Content. Collaborations. Today.', entry: 'Enter with your profile.', note: 'Private preview · no invented activity', back: 'Saimôr' };

  return (
    <main className="overflow-hidden bg-[#07100b] text-[#f2eee3]">
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <YoriAmbientGarden />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,7,.88)_0%,rgba(4,10,7,.62)_34%,rgba(4,10,7,.18)_62%,rgba(4,10,7,.08)_100%)]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-8 pt-6 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#d7c68d]">
              <YoriMark className="h-8 w-8" />
              <div>
                <div className="font-serif text-lg tracking-[.18em] text-[#f4efe3]">YORI</div>
                <div className="mt-1 font-mono text-[7px] tracking-[.22em] text-white/28">SAIMÔR</div>
              </div>
            </div>
            <a href={de ? '/de' : '/en'} className="font-mono text-[8px] uppercase tracking-[.2em] text-white/30 transition hover:text-white/65">
              {words.back}
            </a>
          </header>

          <div className="flex flex-1 items-center py-16">
            <div className="max-w-3xl pb-[6vh]">
              <div className="mb-5 flex items-center gap-3 text-[#d7c68d]/72">
                <span className="h-px w-8 bg-[#d7c68d]/48" />
                <span className="font-mono text-[8px] tracking-[.28em]">縁</span>
              </div>
              <h1 className="font-serif text-[clamp(5rem,11vw,10rem)] font-light leading-[.76] tracking-[-.06em] text-[#f5f0e5]">YORI</h1>
              <p className="mt-7 max-w-2xl font-serif text-[clamp(1.8rem,3.4vw,3.8rem)] font-light leading-[1.02] tracking-[-.035em] text-[#eee7d7]/92">
                {words.title}
              </p>

              <a href="#entry" className="group mt-10 inline-flex min-h-12 items-center gap-8 rounded-full border border-[#d3bd77]/46 bg-[#0b1710]/36 px-6 font-mono text-[9px] uppercase tracking-[.18em] text-[#e8ddb8]/78 backdrop-blur-sm transition hover:border-[#e2cc86]/72 hover:bg-[#112017]/56 hover:text-[#fff3cf]">
                {words.enter}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="mt-4 font-mono text-[8px] tracking-[.18em] text-white/25">{words.profile}</p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-8 border-t border-white/[.06] pt-5 font-mono text-[7px] uppercase tracking-[.2em] text-white/22">
            <span>{de ? 'KLARER DENKEN · GRÖSSER SCHAFFEN' : 'THINK CLEARER · CREATE BIGGER'}</span>
            <span className="hidden sm:block">IDEEN · MENSCHEN · PROJEKTE</span>
          </div>
        </div>
      </section>

      <section className="relative min-h-[88svh] overflow-hidden border-y border-white/[.06] bg-[#0a130e] px-6 py-20 sm:px-10 lg:px-14">
        <div className="absolute inset-0 opacity-70"><YoriAmbientGarden compact /></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,8,.94)_0%,rgba(5,11,8,.78)_37%,rgba(5,11,8,.22)_68%,rgba(5,11,8,.12)_100%)]" />

        <div className="relative mx-auto grid min-h-[72svh] max-w-[1500px] items-center gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div className="max-w-xl">
            <p className="font-mono text-[8px] tracking-[.22em] text-[#b5c3a2]/48">YORI / GARDEN</p>
            <h2 className="mt-5 font-serif text-[clamp(3.4rem,6.4vw,6.4rem)] font-light leading-[.9] tracking-[-.05em] text-[#f0eadc]">{words.place}</h2>
            <p className="mt-6 font-mono text-[8px] uppercase tracking-[.22em] text-white/28">{words.sub}</p>
          </div>

          <div className="relative mx-auto aspect-[1.25/1] w-full max-w-[780px]">
            <svg viewBox="0 0 900 700" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <g fill="none" stroke="#7f8e74" strokeLinecap="round" opacity=".42">
                <path d="M62 528C179 418 269 457 358 514C449 573 560 567 648 500C727 440 803 436 858 471" strokeWidth="3"/>
                <path d="M55 548C176 438 270 477 359 535C451 594 562 588 651 520C730 460 808 456 866 490" strokeWidth="2.5"/>
                <path d="M49 568C174 458 271 497 360 555C453 615 565 609 654 541C734 481 812 477 873 510" strokeWidth="2"/>
                <ellipse cx="282" cy="392" rx="112" ry="68" strokeWidth="2.6"/>
                <ellipse cx="282" cy="392" rx="130" ry="83" strokeWidth="2.2"/>
                <ellipse cx="646" cy="424" rx="116" ry="70" strokeWidth="2.6"/>
                <ellipse cx="646" cy="424" rx="137" ry="87" strokeWidth="2.2"/>
              </g>
            </svg>

            {[
              ['Ideen', 'left-[22%] top-[28%]', 'h-20 w-28'],
              ['Content', 'right-[13%] top-[32%]', 'h-24 w-32'],
              [de ? 'Kooperationen' : 'Collaborations', 'left-[10%] bottom-[16%]', 'h-20 w-28'],
              [de ? 'Heute' : 'Today', 'right-[20%] bottom-[14%]', 'h-24 w-32'],
            ].map(([label, pos, size], index) => (
              <div key={label} className={`absolute ${pos}`}>
                <div className={`${size} rounded-[48%_52%_45%_55%] border border-white/[.07] bg-[radial-gradient(circle_at_32%_24%,#596052_0%,#2b332c_48%,#131a15_100%)] shadow-[0_22px_40px_rgba(0,0,0,.36),inset_0_1px_0_rgba(255,255,255,.06)] ${index === 2 || index === 3 ? 'after:absolute after:inset-x-[18%] after:top-[10%] after:h-[16%] after:rounded-full after:bg-[#5a7248]/28' : ''}`} />
                <div className="absolute -right-3 -top-7 whitespace-nowrap font-serif text-sm text-[#eee5ce]/76">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#d5b968]/80" />{label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="entry" className="relative bg-[#e8e0cf] px-6 py-24 text-[#1a211a] sm:px-10 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <YoriMark className="h-8 w-8 text-[#415640]" />
            <h2 className="mt-6 max-w-xl font-serif text-[clamp(3rem,5.6vw,5.6rem)] font-light leading-[.92] tracking-[-.045em]">{words.entry}</h2>
          </div>

          <form action="https://yori.saimor.world/demo" method="get" className="border-t border-[#253126]/18 pt-6">
            <div className="grid gap-3 sm:grid-cols-[120px_1fr_auto]">
              <select name="platform" aria-label={de ? 'Plattform' : 'Platform'} defaultValue="instagram" className="min-h-12 border-b border-[#29362c]/22 bg-transparent px-1 text-sm outline-none">
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
              <label className="flex min-h-12 items-center border-b border-[#29362c]/22 px-1 focus-within:border-[#415640]/60">
                <span className="mr-1 text-[#2d382f]/42">@</span>
                <input name="creator" required maxLength={64} autoComplete="off" placeholder={de ? 'deinname' : 'yourname'} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#2d382f]/34" />
              </label>
              <button type="submit" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#354635]/28 px-5 text-sm transition hover:bg-[#273729] hover:text-[#f3ecdd]">
                {words.enter}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="mt-4 font-mono text-[7px] uppercase tracking-[.18em] text-[#2b382d]/36">{words.note}</p>
          </form>
        </div>
      </section>
    </main>
  );
}
