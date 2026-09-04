import ProductSection, { type ProductSectionCopy } from "./ProductSection";

type Props = { locale: "de" | "en" };

/**
 * Desk auf der Startseite.
 *
 * Es lief seit Tagen oeffentlich unter dash.saimor.world und kam auf
 * saimor.world mit keinem Wort vor - das Produkt mit der niedrigsten
 * Einstiegshuerde war das einzige ohne Schaufenster (Portfolio 24.08.2026).
 *
 * Der Satz, der es traegt: Moera allein, ohne dass man ein ganzes
 * Betriebssystem einfuehren muss.
 */

const ACCENT = "#d9a756";
const ACCENT_INK = "#241a0c";

const COPY: Record<Props["locale"], ProductSectionCopy> = {
  de: {
    mark: "D",
    name: "DESK",
    kicker: "FÜR SELBSTÄNDIGE UND KLEINE BETRIEBE",
    eyebrow: "MÔRA, OHNE DASS DU ETWAS EINFÜHREN MUSST",
    title: "Der Tag sortiert sich, bevor du ihn anfängst.",
    body: "Mail, Termine, Rechnungen und offene Vorgänge sollen in einer ruhigen Tagesansicht zusammenkommen. Desk ist die kompakte Saimôr-Oberfläche für Selbständige und kleine Teams — derzeit im Aufbau.",
    trust: "Zielbild: eigener Datenraum, nachvollziehbare Verbindungen und frei wählbare KI-Anbindung statt eines undurchsichtigen Sammelkontos.",
    primary: "Konzept ansehen",
    primaryHref: "/demo?track=ai-business",
    secondary: "Was Môra hier tut",
    sceneLabel: "MORGENS · 08:12",
    cards: [
      ["01 / MAIL", "Was Antwort braucht, steht oben. Was warten kann, wartet."],
      ["02 / GELD", "Offene Rechnungen, fällige Rücklagen — mit dem nächsten Schritt daneben."],
      ["03 / VORGÄNGE", "Was du angefangen hast, verliert sich nicht zwischen zwei Wochen."],
    ],
  },
  en: {
    mark: "D",
    name: "DESK",
    kicker: "FOR FREELANCERS AND SMALL TEAMS",
    eyebrow: "MÔRA, WITHOUT ADOPTING ANYTHING",
    title: "Your day sorts itself before you start it.",
    body: "Mail, calendar, invoices and open work are meant to meet in one calm daily view. Desk is Saimôr’s compact interface for freelancers and small teams — currently in development.",
    trust: "The goal: a dedicated data space, traceable connections and a freely chosen AI connection instead of an opaque shared account.",
    primary: "View concept",
    primaryHref: "/demo?track=ai-business",
    secondary: "What Môra does here",
    sceneLabel: "MORNING · 08:12",
    cards: [
      ["01 / MAIL", "What needs an answer is on top. What can wait, waits."],
      ["02 / MONEY", "Open invoices and due reserves — with the next step beside them."],
      ["03 / WORK", "What you started does not get lost between two weeks."],
    ],
  },
};

/** Ein Schreibtisch von oben: drei Blätter, eine Tasse, eine Lampe. */
function DeskScene({ label }: { label: string }) {
  const blaetter = [
    { x: 96, y: 150, w: 168, h: 214, r: -4, zeilen: 5 },
    { x: 250, y: 128, w: 168, h: 214, r: 2.5, zeilen: 4 },
    { x: 404, y: 158, w: 168, h: 214, r: -1.5, zeilen: 6 },
  ];

  return (
    <svg viewBox="0 0 640 460" role="img" aria-label={label} className="block w-full">
      <defs>
        <linearGradient id="desk-holz" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#241c14" />
          <stop offset="1" stopColor="#17110c" />
        </linearGradient>
        <radialGradient id="desk-licht" cx="0.5" cy="0.1" r="0.75">
          <stop offset="0" stopColor="#d9a756" stopOpacity=".22" />
          <stop offset="1" stopColor="#d9a756" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="640" height="460" fill="url(#desk-holz)" />
      <rect width="640" height="460" fill="url(#desk-licht)" />

      {blaetter.map((b, i) => (
        <g key={i} transform={`rotate(${b.r} ${b.x + b.w / 2} ${b.y + b.h / 2})`}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill="#efe7d8" opacity=".95" />
          <rect x={b.x} y={b.y} width={b.w} height="5" fill="#d9a756" opacity=".7" />
          {Array.from({ length: b.zeilen }).map((_, z) => (
            <rect
              key={z}
              x={b.x + 16}
              y={b.y + 34 + z * 22}
              width={b.w - 32 - (z % 3) * 26}
              height="5"
              rx="2.5"
              fill="#241a0c"
              opacity={z === 0 ? ".5" : ".22"}
            />
          ))}
        </g>
      ))}

      {/* Tasse */}
      <g transform="translate(548 372)">
        <ellipse cx="0" cy="0" rx="34" ry="12" fill="#000" opacity=".28" />
        <path d="M-26-34h52l-5 34a22 22 0 0 1-42 0z" fill="#e6ddcb" />
        <path d="M26-26c14 0 14 20 0 20" fill="none" stroke="#e6ddcb" strokeWidth="4" />
        <ellipse cx="0" cy="-34" rx="26" ry="8" fill="#4a3524" />
      </g>

      {/* Lampenschein von links oben */}
      <path d="M40 40 L214 40 L118 300 L18 262 Z" fill="#d9a756" opacity=".05" />
      <circle cx="72" cy="58" r="16" fill="#d9a756" opacity=".5" />
      <circle cx="72" cy="58" r="7" fill="#f3d9a4" />
    </svg>
  );
}

export default function DeskSection({ locale }: Props) {
  const copy = COPY[locale];
  return (
    <ProductSection
      id="desk"
      copy={copy}
      accent={ACCENT}
      accentInk={ACCENT_INK}
      scene={<DeskScene label={copy.sceneLabel} />}
    />
  );
}
