import YoriMark from "@/components/YoriMark";

type Props = { locale: "de" | "en" };

const COPY = {
  de: {
    eyebrow: "NEU IM SAIMÔR ÖKOSYSTEM",
    title: "YORI ist der ruhige Raum, in dem Ideen Form annehmen.",
    body: "Research, Signale, Ideen, Assets, Agenten, Schnitt, Publishing und Lernen fließen in einem Creative Operating System zusammen. Nicht schneller um jeden Preis — klarer, bewusster und mit dir in der Mitte.",
    primary: "YORI entdecken",
    secondary: "Workspace öffnen",
    cards: [
      ["01 / FLOW", "Nur das Wesentliche sehen und den nächsten ruhigen Schritt finden."],
      ["02 / STUDIO", "Ideen, Hooks, Skripte, Assets und Schnitte an einem Ort formen."],
      ["03 / AGENTEN", "KI arbeitet im Kontext, du behältst Freigabe und Richtung."],
      ["04 / LERNEN", "Aus echten Outcomes wird ein besserer nächster kreativer Zyklus."],
    ],
  },
  en: {
    eyebrow: "NEW IN THE SAIMÔR ECOSYSTEM",
    title: "YORI is the quiet space where ideas take shape.",
    body: "Research, signals, ideas, assets, agents, editing, publishing and learning flow through one Creative Operating System. Not speed at any cost — more clarity, intention and you at the center.",
    primary: "Discover YORI",
    secondary: "Open workspace",
    cards: [
      ["01 / FLOW", "See what matters and find the next calm step."],
      ["02 / STUDIO", "Shape ideas, hooks, scripts, assets and edits in one place."],
      ["03 / AGENTS", "AI works in context while direction and approval stay yours."],
      ["04 / LEARN", "Turn real outcomes into a better next creative cycle."],
    ],
  },
} as const;

export default function YoriSection({ locale }: Props) {
  const copy = COPY[locale];
  return (
    <section className="relative overflow-hidden border-t border-[#d5ddd7] bg-[var(--yori-paper)] px-6 py-24 text-[var(--yori-ink)] md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(98,191,192,.18),transparent_30%),radial-gradient(circle_at_12%_88%,rgba(52,78,134,.09),transparent_34%)]" />
      <div className="yori-paper-noise pointer-events-none absolute inset-0 opacity-[.12]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.86fr_1.14fr] lg:items-center">
        <div>
          <div className="mb-9 flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-full border border-[#bfd2cc] bg-[#e6efeb] text-[var(--yori-jade)]">
              <YoriMark className="h-12 w-12" />
            </div>
            <div><p className="text-3xl font-semibold tracking-[.12em]">YORI</p><p className="text-[10px] font-bold tracking-[.22em] text-[var(--yori-indigo)]">A SAIMÔR CREATION</p></div>
          </div>
          <p className="mb-5 font-mono text-[10px] font-bold tracking-[.22em] text-[var(--yori-jade)]">{copy.eyebrow}</p>
          <h2 className="max-w-2xl text-5xl font-medium leading-[.96] tracking-[-.04em] md:text-7xl">{copy.title}</h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#596664] md:text-lg">{copy.body}</p>
          <p className="mt-6 font-serif text-2xl italic text-[var(--yori-indigo)]">Create in Flow.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={locale === "de" ? "/yori" : "/en/yori"} className="rounded-full bg-[var(--yori-jade)] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[var(--yori-jade-deep)]">{copy.primary}</a>
            <a href="https://frnt.saimor.world" className="rounded-full border border-[var(--yori-indigo)]/28 px-6 py-3 text-sm font-bold text-[var(--yori-indigo)] transition hover:border-[var(--yori-indigo)]">{copy.secondary}</a>
          </div>
        </div>
        <div className="grid overflow-hidden rounded-[2rem_1rem_2.2rem_1.2rem] border border-[#d0dad4] bg-[#f9f7f1] shadow-[12px_14px_0_rgba(217,207,189,.42)] sm:grid-cols-2">
          {copy.cards.map(([label, text], index) => <article key={label} className="min-h-52 border-b border-r border-[#d7ded8] p-7 transition hover:bg-[#e8f0ec]"><p className={index === 2 ? "font-mono text-[10px] font-bold tracking-[.16em] text-[var(--yori-indigo)]" : "font-mono text-[10px] font-bold tracking-[.16em] text-[var(--yori-jade)]"}>{label}</p><p className="mt-16 max-w-xs text-xl font-medium leading-tight text-[#243130]">{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}
