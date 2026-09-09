import Link from "next/link";
import { ArrowLeft, ArrowRight, CircleDot, Hammer, House, Users, WalletCards } from "lucide-react";
import YoriMark from "@/components/YoriMark";

type Props = { locale: "de" | "en" };

const ROOM_BASE = "https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene/rooms";

const COPY = {
  de: {
    eyebrow: "YORI / CREATIVE HOUSE",
    titleA: "Deine kreative Arbeit",
    titleB: "braucht einen Ort.",
    intro: "YORI ist kein weiteres Creator-Dashboard. Es ist ein ruhiges digitales Haus, in dem Signale, Ideen, Arbeit, Menschen und Geschäft zusammenfinden — ohne dass aus Kreativität eine Tabellenwand wird.",
    truth: "Im aktiven Aufbau. Demo bleibt Demo. Live bleibt live.",
    open: "YORI öffnen",
    back: "Zurück zu Saimôr",
    houseEyebrow: "DAS HAUS",
    houseTitle: "Nicht vier Tabs. Vier Orte mit einer Aufgabe.",
    houseText: "Jeder Raum beantwortet eine andere Frage. Das Haus bleibt sichtbar, damit sich Arbeit wie ein zusammenhängender Weg anfühlt — nicht wie ein Sprung zwischen Werkzeugen.",
    rooms: [
      { name: "Schreibtisch", line: "Was braucht heute wirklich dich?", text: "Hier liegt nur Arbeit, die deine Aufmerksamkeit oder Entscheidung braucht. Kein KPI-Friedhof und kein künstliches Busy-Sein.", image: `${ROOM_BASE}/room-desk.png`, icon: House },
      { name: "Werkstatt", line: "Was wird gerade daraus?", text: "Signale und Ideen werden zu Vorgängen, Entwürfen und Produktion. Der Weg bleibt sichtbar: vom Anfang bis zur Freigabe.", image: `${ROOM_BASE}/room-workshop.png`, icon: Hammer },
      { name: "Crew", line: "Wer arbeitet wirklich woran?", text: "Rollen und Agenten werden dann sichtbar, wenn sie tatsächlich Arbeit tragen oder vorbereiten — nicht als erfundene Team-Show.", image: `${ROOM_BASE}/room-crew.png`, icon: Users },
      { name: "Cash", line: "Was passiert geschäftlich?", text: "Echte Buchungen, offene Vorgänge und Wertströme bekommen einen ruhigen Platz. Geschäft ist Teil der Arbeit, aber nicht ihre ganze Identität.", image: `${ROOM_BASE}/room-cash.png`, icon: WalletCards },
    ],
    flowEyebrow: "DER WEG DURCH YORI",
    flowTitle: "Von draußen kommt ein Signal. Drinnen wird daraus Arbeit.",
    flow: ["SIGNAL", "VERSTEHEN", "MACHEN", "FREIGEBEN", "ERGEBNIS", "LERNEN"],
    flowText: "YORI soll nicht mit Features beeindrucken. Entscheidend ist, ob aus einem echten Signal ein nachvollziehbarer Vorgang und am Ende ein echtes Ergebnis wird.",
    truthEyebrow: "PRODUKTWAHRHEIT",
    truthTitle: "Keine Kulisse als Funktion verkaufen.",
    truthText: "YORI darf schön, ruhig und fast märchenhaft wirken. Aber der Status darunter bleibt nüchtern: verbunden, leer, teilweise verfügbar oder Demo. Nichts wird als erledigt oder aktiv dargestellt, nur weil die Oberfläche es darstellen kann.",
    truthPoints: ["Echte Quellen werden als echte Quellen gezeigt.", "Leere Räume dürfen leer sein.", "Demo-Inhalte werden sichtbar als Demo behandelt.", "Externe Aktionen brauchen klare Freigaben und nachvollziehbaren Status."],
    finalEyebrow: "YORI / SAIMÔR",
    finalTitle: "Ein kleines Haus für große kreative Zusammenhänge.",
    finalText: "YORI entsteht als eigener Arbeitsraum innerhalb der Saimôr-Welt. Nicht als Ersatz für Kreativität — sondern als Ort, an dem sie Zusammenhang behält.",
  },
  en: {
    eyebrow: "YORI / CREATIVE HOUSE",
    titleA: "Creative work",
    titleB: "needs a place.",
    intro: "YORI is not another creator dashboard. It is a calm digital house where signals, ideas, work, people and business can meet without turning creativity into a wall of metrics.",
    truth: "In active development. Demo stays demo. Live stays live.",
    open: "Open YORI",
    back: "Back to Saimôr",
    houseEyebrow: "THE HOUSE",
    houseTitle: "Not four tabs. Four places with a purpose.",
    houseText: "Each room answers a different question. The house remains visible so work feels like one connected path rather than jumping between tools.",
    rooms: [
      { name: "Desk", line: "What genuinely needs you today?", text: "Only work that needs your attention or decision belongs here. No KPI graveyard and no artificial busyness.", image: `${ROOM_BASE}/room-desk.png`, icon: House },
      { name: "Workshop", line: "What is taking shape?", text: "Signals and ideas become work, drafts and production. The path remains visible from the first spark to approval.", image: `${ROOM_BASE}/room-workshop.png`, icon: Hammer },
      { name: "Crew", line: "Who is actually working on what?", text: "Roles and agents become visible when they carry or prepare real work — not as a fictional team display.", image: `${ROOM_BASE}/room-crew.png`, icon: Users },
      { name: "Cash", line: "What is happening in the business?", text: "Real bookings, open items and value flows get a calm place. Business belongs in the house without becoming its entire identity.", image: `${ROOM_BASE}/room-cash.png`, icon: WalletCards },
    ],
    flowEyebrow: "THE PATH THROUGH YORI",
    flowTitle: "A signal arrives from outside. Inside, it becomes work.",
    flow: ["SIGNAL", "UNDERSTAND", "MAKE", "APPROVE", "OUTCOME", "LEARN"],
    flowText: "YORI should not win by listing features. What matters is whether a real signal becomes traceable work and ultimately a real outcome.",
    truthEyebrow: "PRODUCT TRUTH",
    truthTitle: "Never sell scenery as function.",
    truthText: "YORI can feel beautiful, quiet and almost story-like. The state underneath stays sober: connected, empty, partially available or demo. Nothing is presented as active or complete just because the interface can depict it.",
    truthPoints: ["Real sources are shown as real sources.", "Empty rooms are allowed to stay empty.", "Demo content is visibly treated as demo.", "External actions require clear approval and traceable status."],
    finalEyebrow: "YORI / SAIMÔR",
    finalTitle: "A small house for large creative contexts.",
    finalText: "YORI is becoming its own workspace within the Saimôr world. Not a replacement for creativity — a place where it keeps its context.",
  },
} as const;

export default function YoriLanding({ locale }: Props) {
  const c = COPY[locale];
  const home = locale === "de" ? "/de" : "/en";

  return (
    <main className="min-h-screen overflow-hidden bg-[#efe8da] text-[#17211d] selection:bg-[#244f44] selection:text-white">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-[#183229]/10 px-5 pb-16 pt-28 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(72,128,110,.17),transparent_30%),radial-gradient(circle_at_14%_84%,rgba(174,126,67,.13),transparent_34%),linear-gradient(145deg,#f4eee3_0%,#e9e0d0_58%,#e7ddca_100%)]" />
        <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(38,67,57,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(38,67,57,.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
        <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl flex-col">
          <div className="flex items-center justify-between gap-4">
            <Link href={home} className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[.17em] text-[#26483d]/60 transition hover:text-[#26483d]"><ArrowLeft className="h-3.5 w-3.5" /> {c.back}</Link>
            <span className="rounded-full border border-[#244f44]/15 bg-white/30 px-3 py-1.5 font-mono text-[9px] font-bold tracking-[.15em] text-[#244f44]/65 backdrop-blur">{c.truth}</span>
          </div>
          <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[.84fr_1.16fr] lg:gap-12">
            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-[#244f44]/15 bg-[#dce6df] text-[#286253] shadow-[8px_10px_0_rgba(145,117,78,.11)]"><YoriMark className="h-10 w-10" /></div>
                <div><p className="text-2xl font-semibold tracking-[.12em]">YORI</p><p className="font-mono text-[9px] font-bold tracking-[.2em] text-[#835e32]/70">A SAIMÔR CREATION</p></div>
              </div>
              <p className="font-mono text-[10px] font-bold tracking-[.22em] text-[#286253]">{c.eyebrow}</p>
              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3.8rem,9vw,7.8rem)] font-light leading-[.83] tracking-[-.055em]">{c.titleA}<br /><em className="font-light text-[#7c5b32]">{c.titleB}</em></h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-[#31413b]/75 sm:text-lg sm:leading-8">{c.intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="https://yori.saimor.world" className="group inline-flex items-center gap-3 rounded-full bg-[#234f43] px-7 py-3.5 text-sm font-bold text-[#f7f2e8] shadow-[0_15px_40px_rgba(35,79,67,.16)] transition hover:-translate-y-0.5 hover:bg-[#193d34]">{c.open}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
                <a href="#house" className="inline-flex items-center gap-2 rounded-full border border-[#244f44]/20 bg-white/25 px-7 py-3.5 text-sm font-semibold text-[#244f44] transition hover:bg-white/45">{c.houseEyebrow}<ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[760px]">
              <div className="absolute inset-[8%] rounded-full bg-[#d3b778]/18 blur-[70px]" />
              <div className="relative grid grid-cols-2 gap-2.5 rotate-[-1.5deg] rounded-[2.1rem] border border-[#234f43]/10 bg-[#d7cab5]/60 p-3 shadow-[18px_22px_0_rgba(93,70,41,.12)] sm:gap-3.5 sm:p-4">
                {c.rooms.map((room, index) => <div key={room.name} className={`group relative overflow-hidden rounded-[1.35rem] border border-[#183229]/12 bg-[#17211d] ${index === 0 ? "translate-y-2" : index === 3 ? "-translate-y-2" : ""}`}><img src={room.image} alt={room.name} className="aspect-[16/10] h-full w-full object-cover opacity-[.9] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06100c]/90 via-[#06100c]/35 to-transparent px-3 pb-3 pt-10 text-white sm:px-4 sm:pb-4"><span className="font-mono text-[8px] font-bold tracking-[.2em] text-[#cfc092]">0{index + 1}</span><p className="mt-1 text-sm font-semibold sm:text-base">{room.name}</p></div></div>)}
              </div>
              <p className="mt-5 text-center font-serif text-lg italic text-[#765735]/70">Create in Flow.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="house" className="border-b border-[#183229]/10 bg-[#f4eee3] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="font-mono text-[10px] font-bold tracking-[.22em] text-[#286253]">{c.houseEyebrow}</p><h2 className="mt-5 max-w-xl font-serif text-5xl font-light leading-[.96] tracking-[-.04em] sm:text-7xl">{c.houseTitle}</h2></div><p className="max-w-2xl text-base leading-7 text-[#31413b]/70 sm:text-lg sm:leading-8 lg:justify-self-end">{c.houseText}</p></div>
          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {c.rooms.map((room, index) => { const Icon = room.icon; return <article key={room.name} className="group overflow-hidden rounded-[2rem] border border-[#183229]/10 bg-[#e9dfcf] shadow-[0_20px_60px_rgba(54,42,25,.06)]"><div className="relative overflow-hidden border-b border-[#183229]/10 bg-[#17211d]"><img src={room.image} alt={room.name} className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-[1.02]" /><div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-white backdrop-blur-md"><Icon className="h-3.5 w-3.5" /><span className="font-mono text-[9px] font-bold tracking-[.16em]">0{index + 1} / {room.name.toUpperCase()}</span></div></div><div className="p-7 sm:p-9"><h3 className="font-serif text-3xl font-light tracking-[-.025em] sm:text-4xl">{room.line}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-[#31413b]/70 sm:text-base sm:leading-7">{room.text}</p></div></article>; })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-[#07110e] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(81,168,139,.12),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(199,154,86,.09),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl"><p className="font-mono text-[10px] font-bold tracking-[.22em] text-[#79b8a4]">{c.flowEyebrow}</p><h2 className="mt-5 max-w-4xl font-serif text-5xl font-light leading-[.95] tracking-[-.045em] sm:text-7xl">{c.flowTitle}</h2><p className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">{c.flowText}</p><div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">{c.flow.map((step, index) => <div key={step} className="relative min-h-36 rounded-2xl border border-white/10 bg-white/[.035] p-5"><span className="font-mono text-[9px] font-bold tracking-[.18em] text-[#d3b370]/65">0{index + 1}</span><CircleDot className="mt-8 h-4 w-4 text-[#78b6a2]" /><p className="mt-3 text-xs font-bold tracking-[.13em] text-white/80">{step}</p>{index < c.flow.length - 1 ? <ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-white/20 lg:block" /> : null}</div>)}</div></div>
      </section>

      <section className="border-b border-[#183229]/10 bg-[#e8decd] px-5 py-24 sm:px-8 sm:py-32 lg:px-10"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start"><div><p className="font-mono text-[10px] font-bold tracking-[.22em] text-[#286253]">{c.truthEyebrow}</p><h2 className="mt-5 max-w-2xl font-serif text-5xl font-light leading-[.96] tracking-[-.04em] sm:text-7xl">{c.truthTitle}</h2><p className="mt-7 max-w-xl text-base leading-7 text-[#31413b]/70 sm:text-lg sm:leading-8">{c.truthText}</p></div><div className="rounded-[2rem] border border-[#183229]/10 bg-[#f5efe4] p-7 shadow-[12px_14px_0_rgba(94,72,43,.08)] sm:p-10">{c.truthPoints.map((point, index) => <div key={point} className="flex gap-5 border-b border-[#183229]/10 py-6 first:pt-0 last:border-0 last:pb-0"><span className="font-mono text-[9px] font-bold tracking-[.15em] text-[#84613a]/60">0{index + 1}</span><p className="text-lg leading-7 text-[#26362f] sm:text-xl">{point}</p></div>)}</div></div></section>

      <section className="bg-[#f4eee3] px-5 py-24 sm:px-8 sm:py-32 lg:px-10"><div className="mx-auto max-w-5xl text-center"><YoriMark className="mx-auto h-16 w-16 text-[#286253]" /><p className="mt-7 font-mono text-[10px] font-bold tracking-[.22em] text-[#286253]">{c.finalEyebrow}</p><h2 className="mx-auto mt-5 max-w-4xl font-serif text-5xl font-light leading-[.95] tracking-[-.045em] sm:text-7xl">{c.finalTitle}</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#31413b]/70 sm:text-lg sm:leading-8">{c.finalText}</p><a href="https://yori.saimor.world" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#234f43] px-8 py-4 text-sm font-bold text-[#f7f2e8] transition hover:-translate-y-0.5 hover:bg-[#193d34]">{c.open}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a></div></section>
    </main>
  );
}
