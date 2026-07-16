import Image from "next/image";

type Props = { locale: "de" | "en" };

const COPY = {
  de: {
    eyebrow: "NEU IM SAIMÔR ÖKOSYSTEM",
    title: "Dein Content hat jetzt ein Operating System.",
    body: "FRNT verbindet Signale, Clips, Creator-Agenten und Umsatz in einem klaren Workspace. Von der ersten Idee bis zur Auswertung — mit dir in Kontrolle.",
    primary: "FRNT entdecken",
    secondary: "Workspace öffnen",
    cards: [
      ["01 / SIGNAL", "Finde, was gerade Aufmerksamkeit gewinnt."],
      ["02 / CLIP", "Schneide Material zu klaren, plattformgerechten Stories."],
      ["03 / AGENTS", "Arbeite mit spezialisierten Creator-Agenten."],
      ["04 / REVENUE", "Sieh, was Content wirklich bewegt und verdient."],
    ],
  },
  en: {
    eyebrow: "NEW IN THE SAIMÔR ECOSYSTEM",
    title: "Your content has an operating system now.",
    body: "FRNT connects signals, clips, creator agents and revenue in one clear workspace. From the first idea to performance — with you in control.",
    primary: "Discover FRNT",
    secondary: "Open workspace",
    cards: [
      ["01 / SIGNAL", "Find what is earning attention right now."],
      ["02 / CLIP", "Turn material into clear, platform-ready stories."],
      ["03 / AGENTS", "Work with specialized creator agents."],
      ["04 / REVENUE", "See what your content actually moves and earns."],
    ],
  },
} as const;

export default function FrntSection({ locale }: Props) {
  const copy = COPY[locale];

  return (
    <section className="relative overflow-hidden bg-[#101326] px-6 py-24 text-[var(--world-paper)] md:py-36">
      <div className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-[#E7C46A]/12 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-20 h-[30rem] w-[30rem] rounded-full bg-[#A7E9E2]/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <Image src="/frnt-mark.png" width={76} height={76} alt="FRNT" className="rounded-2xl border border-white/10" />
            <div>
              <p className="text-2xl font-black tracking-[-.08em]">FRNT</p>
              <p className="text-[9px] font-bold tracking-[.24em] text-[var(--world-lilac)]">BY SAIMÔR</p>
            </div>
          </div>
          <p className="mb-5 font-mono text-[10px] font-bold tracking-[.22em] text-[var(--world-cyan)]">{copy.eyebrow}</p>
          <h2 className="max-w-2xl text-5xl font-medium leading-[.93] tracking-[-.055em] md:text-7xl">{copy.title}</h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/58 md:text-lg">{copy.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={locale === "de" ? "/frnt" : "/en/frnt"} className="rounded-full bg-[#F5F2FF] px-6 py-3 text-sm font-bold text-[#101326] transition hover:-translate-y-0.5">{copy.primary}</a>
            <a href="https://frnt.saimor.world" className="rounded-full border border-[#D6A848]/30 px-6 py-3 text-sm font-bold text-white/78 transition hover:border-[#E7C46A] hover:text-white">{copy.secondary}</a>
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2">
          {copy.cards.map(([label, text], index) => (
            <article key={label} className="min-h-52 bg-[#151B31]/95 p-7 transition hover:bg-[#202845]">
              <p className={index === 2 ? "font-mono text-[10px] font-bold tracking-[.16em] text-[var(--world-cyan)]" : "font-mono text-[10px] font-bold tracking-[.16em] text-[var(--world-lilac)]"}>{label}</p>
              <p className="mt-16 max-w-xs text-xl font-medium leading-tight tracking-[-.025em]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}