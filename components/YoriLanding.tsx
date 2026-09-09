import { ArrowRight, CircleDot, Hammer, House, Users, WalletCards } from "lucide-react";
import YoriMark from "@/components/YoriMark";

type Props = { locale: "de" | "en" };

const ROOM_BASE = "https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene/rooms";
const GARDEN = "https://raw.githubusercontent.com/Saimor-world/yori/tomo-rebrand/public/scene/outside-day.png";

const COPY = {
  de: {
    houseEyebrow: "DEIN HAUS",
    houseTitle: "Alles, was du aufbaust, bekommt seinen Platz.",
    houseText:
      "Nicht noch eine App, die dir mehr zu beobachten gibt. YORI ordnet kreative Arbeit räumlich: Was dich braucht, liegt auf dem Schreibtisch. Was entsteht, lebt in der Werkstatt. Hilfe bekommt einen Platz in der Crew. Und das Geschäft verschwindet nicht in einer Tabelle irgendwo anders.",
    rooms: [
      {
        name: "Schreibtisch",
        line: "Nur das, was heute wirklich dich braucht.",
        text: "Eine Freigabe. Eine wichtige Nachricht. Ein Termin. Eine Entscheidung. Wenn nichts ansteht, darf der Tisch leer sein.",
        image: `${ROOM_BASE}/room-desk.png`,
        icon: House,
      },
      {
        name: "Werkstatt",
        line: "Hier wird aus einer Idee etwas Fertiges.",
        text: "Briefings, Entwürfe, Rohmaterial und nächste Schritte bleiben als ein zusammenhängender Vorgang sichtbar — vom ersten Signal bis zur Veröffentlichung.",
        image: `${ROOM_BASE}/room-workshop.png`,
        icon: Hammer,
      },
      {
        name: "Crew",
        line: "Hilfe ist sichtbar, wenn sie wirklich etwas trägt.",
        text: "Recherche, Text, Schnitt oder Organisation können unterstützt werden. Im Raum steht aber nur, wer tatsächlich an etwas arbeitet — kein künstliches Agenten-Theater.",
        image: `${ROOM_BASE}/room-crew.png`,
        icon: Users,
      },
      {
        name: "Cash",
        line: "Dein Business gehört dazu. Aber es übernimmt nicht das Haus.",
        text: "Kooperationen, Rechnungen, offene Beträge und Ausgaben haben einen ruhigen eigenen Ort, ohne deine kreative Arbeit in Finanzsoftware zu verwandeln.",
        image: `${ROOM_BASE}/room-cash.png`,
        icon: WalletCards,
      },
    ],
    storyEyebrow: "EIN TAG MIT YORI",
    storyTitle: "Draußen passiert etwas. Drinnen wird daraus Arbeit.",
    storyText:
      "Stell dir vor, eine Frage taucht wiederholt unter deinen Videos auf. YORI zeigt dir nicht einfach noch eine Zahl — es hält den Faden fest und bringt ihn dorthin, wo du etwas daraus machen kannst.",
    story: [
      ["01", "TikTok + Instagram", "Eine Frage aus der Community taucht mehrfach auf."],
      ["02", "Schreibtisch", "YORI legt nur den relevanten Zusammenhang zu dir: Frage, Resonanz und warum sie gerade wichtig sein könnte."],
      ["03", "Werkstatt", "Aus deiner Entscheidung entsteht ein Briefing, dann ein Entwurf mit Material und nächsten Schritten."],
      ["04", "Freigabe", "Nichts geht nach draußen, bevor du es gesehen und freigegeben hast."],
      ["05", "Ergebnis", "Nach der Veröffentlichung kommt zurück, was passiert ist — damit YORI beim nächsten Mal mehr Kontext hat."],
    ],
    sourcesEyebrow: "WAS INS HAUS DARF",
    sourcesTitle: "Du verbindest Quellen. YORI verbindet den Zusammenhang.",
    sourcesText:
      "In der aktuellen Vorschau sind diese Quellen bewusst simuliert. Sie zeigen, wie sich mehrere echte Verbindungen später gemeinsam anfühlen sollen — ohne so zu tun, als wären sie heute schon live.",
    sources: ["TikTok", "Instagram", "Mail", "Kalender", "Drive", "Cash"],
    demo: "DEMO SOURCE",
    gardenEyebrow: "DRAUSSEN / DRINNEN",
    gardenTitle: "Die Welt bleibt draußen in Bewegung. Im Haus bleibt es ruhig.",
    gardenText:
      "YORI soll nicht verlangen, dass du ständig alles beobachtest. Signale kommen von draußen. Du gehst nur dorthin, wo deine Aufmerksamkeit wirklich gebraucht wird.",
    finalEyebrow: "YORI · PRIVATE PREVIEW",
    finalTitle: "Vielleicht soll sich Arbeit nicht wie Software anfühlen.",
    finalText:
      "YORI ist noch im Aufbau. Die Vorschau ist eine klar markierte Demo — aber das Haus, die Räume und die Art, wie Arbeit darin fließen soll, sind die Richtung.",
    open: "Demo-Haus betreten",
  },
  en: {
    houseEyebrow: "YOUR HOUSE",
    houseTitle: "Everything you are building gets a place of its own.",
    houseText:
      "Not another app that gives you more things to watch. YORI organizes creative work spatially: what needs you sits on the desk. What is becoming something lives in the workshop. Help has a place in Crew. And the business side no longer disappears into a separate dashboard.",
    rooms: [
      {
        name: "Desk",
        line: "Only what genuinely needs you today.",
        text: "An approval. An important message. A meeting. A decision. If nothing needs you, the desk is allowed to stay empty.",
        image: `${ROOM_BASE}/room-desk.png`,
        icon: House,
      },
      {
        name: "Workshop",
        line: "This is where an idea becomes something finished.",
        text: "Briefs, drafts, raw material and next steps stay visible as one continuous piece of work — from the first signal to publication.",
        image: `${ROOM_BASE}/room-workshop.png`,
        icon: Hammer,
      },
      {
        name: "Crew",
        line: "Help becomes visible when it is actually carrying work.",
        text: "Research, writing, editing or organization can be supported. But only whoever is genuinely working on something appears in the room — no fictional agent theatre.",
        image: `${ROOM_BASE}/room-crew.png`,
        icon: Users,
      },
      {
        name: "Cash",
        line: "Your business belongs here. It does not take over the house.",
        text: "Collaborations, invoices, open amounts and expenses get a calm place of their own without turning your creative work into finance software.",
        image: `${ROOM_BASE}/room-cash.png`,
        icon: WalletCards,
      },
    ],
    storyEyebrow: "A DAY WITH YORI",
    storyTitle: "Something happens outside. Inside, it becomes work.",
    storyText:
      "Imagine the same question starts appearing under your videos. YORI does not just give you another metric — it keeps the thread and brings it to the place where you can turn it into something.",
    story: [
      ["01", "TikTok + Instagram", "A community question starts appearing repeatedly."],
      ["02", "Desk", "YORI brings you only the relevant context: the question, the response and why it may matter now."],
      ["03", "Workshop", "Your decision becomes a brief, then a draft with material and next steps."],
      ["04", "Approval", "Nothing leaves the house before you have seen and approved it."],
      ["05", "Outcome", "After publishing, the result comes back in — so YORI has more context next time."],
    ],
    sourcesEyebrow: "WHAT ENTERS THE HOUSE",
    sourcesTitle: "You connect sources. YORI connects the context.",
    sourcesText:
      "In the current preview these sources are deliberately simulated. They show how several real connections should eventually feel together without pretending they are already live today.",
    sources: ["TikTok", "Instagram", "Mail", "Calendar", "Drive", "Cash"],
    demo: "DEMO SOURCE",
    gardenEyebrow: "OUTSIDE / INSIDE",
    gardenTitle: "The world can keep moving outside. The house stays calm.",
    gardenText:
      "YORI should not require you to watch everything all the time. Signals arrive from outside. You only go where your attention is genuinely needed.",
    finalEyebrow: "YORI · PRIVATE PREVIEW",
    finalTitle: "Maybe work does not have to feel like software.",
    finalText:
      "YORI is still being built. The preview is a clearly marked demo — but the house, the rooms and the way work should flow through them are the direction.",
    open: "Enter the demo house",
  },
} as const;

export default function YoriLanding({ locale }: Props) {
  const c = COPY[locale];

  return (
    <main className="overflow-hidden bg-[#f0e8d8] text-[#17211d] selection:bg-[#244f44] selection:text-white">
      <section id="house" className="relative border-b border-[#183229]/10 bg-[#f3ecdf] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(53,73,62,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(53,73,62,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-[.24em] text-[#376452]">{c.houseEyebrow}</p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl font-light leading-[.94] tracking-[-.045em] sm:text-7xl">{c.houseTitle}</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#31413b]/72 sm:text-lg sm:leading-8 lg:justify-self-end">{c.houseText}</p>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-2">
            {c.rooms.map((room, index) => {
              const Icon = room.icon;
              return (
                <article key={room.name} className="group overflow-hidden rounded-[2rem] border border-[#183229]/10 bg-[#e7dcc8] shadow-[0_22px_65px_rgba(54,42,25,.07)]">
                  <div className="relative overflow-hidden bg-[#17211d]">
                    <img src={room.image} alt={room.name} className="aspect-[16/9] w-full object-cover opacity-[.94] transition duration-700 group-hover:scale-[1.018] group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-white backdrop-blur-md">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="font-mono text-[9px] font-bold tracking-[.16em]">0{index + 1} / {room.name.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="p-7 sm:p-9">
                    <h3 className="font-serif text-3xl font-light leading-tight tracking-[-.03em] sm:text-4xl">{room.line}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-[#31413b]/70 sm:text-base sm:leading-7">{room.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-[#09130f] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(91,160,126,.13),transparent_27%),radial-gradient(circle_at_15%_80%,rgba(208,170,99,.09),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-[10px] font-bold tracking-[.24em] text-[#84bda7]">{c.storyEyebrow}</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <h2 className="max-w-4xl font-serif text-5xl font-light leading-[.94] tracking-[-.045em] sm:text-7xl">{c.storyTitle}</h2>
            <p className="max-w-xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">{c.storyText}</p>
          </div>

          <div className="mt-16 border-t border-white/12">
            {c.story.map(([number, place, text]) => (
              <div key={number} className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[70px_.55fr_1.45fr] sm:items-start sm:gap-6">
                <span className="font-mono text-[9px] font-bold tracking-[.18em] text-[#d8bb78]/55">{number}</span>
                <div className="flex items-center gap-3 text-lg font-medium text-white/92 sm:text-xl"><CircleDot className="h-4 w-4 text-[#74b39c]" />{place}</div>
                <p className="max-w-2xl text-sm leading-6 text-white/55 sm:text-base sm:leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-[#183229]/10 bg-[#e8decb] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-mono text-[10px] font-bold tracking-[.24em] text-[#376452]">{c.sourcesEyebrow}</p>
            <h2 className="mt-5 max-w-2xl font-serif text-5xl font-light leading-[.94] tracking-[-.045em] sm:text-7xl">{c.sourcesTitle}</h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#31413b]/70 sm:text-lg sm:leading-8">{c.sourcesText}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {c.sources.map((source, index) => (
              <div key={source} className="min-h-36 rounded-[1.5rem] border border-[#183229]/10 bg-[#f5efe3]/75 p-5 shadow-[7px_8px_0_rgba(95,70,40,.05)]">
                <span className="font-mono text-[8px] font-bold tracking-[.16em] text-[#89663e]/55">0{index + 1}</span>
                <p className="mt-8 text-lg font-semibold text-[#263b33]">{source}</p>
                <span className="mt-2 inline-block font-mono text-[7px] font-bold tracking-[.16em] text-[#3d715f]/65">{c.demo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[72svh] overflow-hidden bg-[#15251d] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-75" style={{ backgroundImage: `url(${GARDEN})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,19,14,.84),rgba(8,19,14,.52)_48%,rgba(8,19,14,.25)),linear-gradient(180deg,rgba(8,19,14,.18),rgba(8,19,14,.58))]" />
        <div className="absolute inset-0 opacity-[.15] [background-image:linear-gradient(rgba(244,235,216,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(244,235,216,.16)_1px,transparent_1px)] [background-size:92px_92px] [mask-image:linear-gradient(90deg,black,transparent_65%)]" />
        <div className="relative mx-auto flex min-h-[52svh] max-w-7xl items-end">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] font-bold tracking-[.24em] text-[#e4cc8b]">{c.gardenEyebrow}</p>
            <h2 className="mt-5 font-serif text-5xl font-light leading-[.94] tracking-[-.045em] sm:text-7xl">{c.gardenTitle}</h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/66 sm:text-lg sm:leading-8">{c.gardenText}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f3ecdf] px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <YoriMark className="mx-auto h-16 w-16 text-[#376452]" />
          <p className="mt-7 font-mono text-[10px] font-bold tracking-[.24em] text-[#376452]">{c.finalEyebrow}</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-5xl font-light leading-[.94] tracking-[-.045em] sm:text-7xl">{c.finalTitle}</h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#31413b]/70 sm:text-lg sm:leading-8">{c.finalText}</p>
          <a href="https://yori.saimor.world" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#234f43] px-8 py-4 text-sm font-bold text-[#f7f2e8] shadow-[0_14px_40px_rgba(35,79,67,.14)] transition hover:-translate-y-0.5 hover:bg-[#193d34]">
            {c.open}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-10 font-serif text-sm italic text-[#765735]/55">Create in Flow.</p>
        </div>
      </section>
    </main>
  );
}
