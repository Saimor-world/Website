import Image from "next/image";

type Props = { locale: "de" | "en" };

const COPY = {
  de: {
    eyebrow: "NEU IM SAIMÔR OEKOSYSTEM",
    title: "FRNT gibt Creator-Arbeit ein echtes Betriebssystem.",
    body: "Signale, Clips, Canvas, Agenten und Umsatz laufen in einem ruhigen Workspace zusammen. Nicht als Dashboard-Deko, sondern als Werkzeugkasten fuer reale Content-Produktion.",
    primary: "FRNT ansehen",
    secondary: "Workspace oeffnen",
    cards: [
      ["01 / SIGNAL", "Erkennen, was gerade Aufmerksamkeit bekommt."],
      ["02 / CANVAS", "Ideen, Hooks, Skripte und Schnitte an einem Ort bewegen."],
      ["03 / AGENTS", "Spezialisierte Creator-Agenten schlagen naechste Schritte vor."],
      ["04 / REVENUE", "Auswertung, Deals und Wirkung bleiben im Blick."],
    ],
  },
  en: {
    eyebrow: "NEW IN THE SAIMÔR ECOSYSTEM",
    title: "FRNT gives creator work a real operating system.",
    body: "Signals, clips, canvas, agents and revenue meet in one calm workspace. Not dashboard decoration, but a toolkit for real content production.",
    primary: "Explore FRNT",
    secondary: "Open workspace",
    cards: [
      ["01 / SIGNAL", "See what is earning attention right now."],
      ["02 / CANVAS", "Move ideas, hooks, scripts and edits in one place."],
      ["03 / AGENTS", "Specialized creator agents suggest the next moves."],
      ["04 / REVENUE", "Keep performance, deals and outcomes visible."],
    ],
  },
} as const;

export default function FrntSection({ locale }: Props) {
  const copy = COPY[locale];

  return (
    <section className="relative overflow-hidden border-t border-[var(--world-border)] bg-[var(--world-night)] px-6 py-24 text-[var(--world-paper)] md:py-34">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,168,72,.10),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(102,221,234,.10),transparent_28%),linear-gradient(180deg,rgba(7,11,22,.20),rgba(12,16,32,.96))]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(102,221,234,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(214,168,72,.12)_1px,transparent_1px)] [background-size:90px_90px]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-white/[.035] shadow-[0_24px_70px_rgba(0,0,0,.28)]">
              <Image src="/frnt-mark.png" width={64} height={64} alt="FRNT" className="rounded-2xl" />
            </div>
            <div>
              <p className="text-3xl font-black">FRNT</p>
              <p className="text-[10px] font-bold tracking-[.22em] text-[var(--world-gold)]">BY SAIMÔR</p>
            </div>
          </div>
          <p className="mb-5 font-mono text-[10px] font-bold tracking-[.22em] text-[var(--world-cyan)]">{copy.eyebrow}</p>
          <h2 className="max-w-2xl text-5xl font-medium leading-none md:text-7xl">{copy.title}</h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/62 md:text-lg">{copy.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={locale === "de" ? "/frnt" : "/en/frnt"} className="rounded-full bg-[var(--world-paper)] px-6 py-3 text-sm font-bold text-[var(--world-ink)] transition hover:-translate-y-0.5">{copy.primary}</a>
            <a href="https://frnt.saimor.world" className="rounded-full border border-[var(--world-gold)]/35 px-6 py-3 text-sm font-bold text-white/82 transition hover:border-[var(--world-gold)] hover:text-white">{copy.secondary}</a>
          </div>
        </div>
        <div className="grid overflow-hidden rounded-[2rem] border border-[var(--world-border)] bg-white/[.035] shadow-[0_34px_110px_rgba(0,0,0,.28)] sm:grid-cols-2">
          {copy.cards.map(([label, text], index) => (
            <article key={label} className="min-h-52 border-b border-r border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,.055),rgba(17,26,45,.82))] p-7 transition hover:bg-white/[.07]">
              <p className={index === 2 ? "font-mono text-[10px] font-bold tracking-[.16em] text-[var(--world-cyan)]" : "font-mono text-[10px] font-bold tracking-[.16em] text-[var(--world-gold)]"}>{label}</p>
              <p className="mt-16 max-w-xs text-xl font-medium leading-tight text-white/90">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}