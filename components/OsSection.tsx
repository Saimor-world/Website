import ProductSection, { type ProductSectionCopy } from "./ProductSection";

type Props = { locale: "de" | "en" };

/**
 * Das OS auf der Startseite.
 *
 * Es ist das groesste Stueck des Hauses - 1450 Commits, das Produkt mit der
 * meisten Substanz - und hatte auf saimor.world keinen eigenen Abschnitt. YORI
 * hatte einen, Vicini hatte einen, das OS nicht.
 *
 * Der Satz, der es traegt: die Firma als Ort, in dem Moera lebt. Nicht ein
 * Werkzeug, das man oeffnet, sondern ein Raum, in dem jemand arbeitet.
 */

const ACCENT = "#7fd4c1";
const ACCENT_INK = "#0b1f1b";

const COPY: Record<Props["locale"], ProductSectionCopy> = {
  de: {
    mark: "◎",
    name: "DAS OS",
    kicker: "FÜR BETRIEBE MIT STRUKTUR",
    eyebrow: "DEINE FIRMA ALS ORT, NICHT ALS FORMULAR",
    title: "Ein Raum, in dem Môra mitarbeitet.",
    body: "Abteilungen sind Räume, Vorgänge liegen dort, wo sie hingehören, und Môra sieht alles davon. Du fragst sie etwas und sie antwortet aus dem, was wirklich in deiner Firma liegt — nicht aus dem Internet.",
    trust: "Eine Installation, ein Server, eine Firma. Kein geteilter Speicher mit anderen Kunden.",
    primary: "Das OS ansehen",
    primaryHref: "https://hq.saimor.world",
    secondary: "Wie es aufgebaut ist",
    sceneLabel: "HQ · DER RAUM IST BEREIT",
    cards: [
      ["01 / RÄUME", "Jede Abteilung ein Ort. Was dort liegt, gehört dorthin."],
      ["02 / MÔRA", "Sie wohnt im Haus und kennt es. Kein Hochladen, kein Erklären."],
      ["03 / ZUSAMMENHANG", "Was zusammengehört, hängt sichtbar zusammen — gesetzt oder vermutet."],
    ],
  },
  en: {
    mark: "◎",
    name: "THE OS",
    kicker: "FOR COMPANIES WITH STRUCTURE",
    eyebrow: "YOUR COMPANY AS A PLACE, NOT A FORM",
    title: "A room where Môra works alongside you.",
    body: "Departments are rooms, work sits where it belongs, and Môra sees all of it. You ask her something and she answers from what is actually in your company — not from the internet.",
    trust: "One installation, one server, one company. No storage shared with other customers.",
    primary: "See the OS",
    primaryHref: "https://hq.saimor.world",
    secondary: "How it is built",
    sceneLabel: "HQ · THE ROOM IS READY",
    cards: [
      ["01 / ROOMS", "Every department a place. What lies there belongs there."],
      ["02 / MÔRA", "She lives in the house and knows it. No uploading, no explaining."],
      ["03 / CONNECTION", "What belongs together is visibly connected — asserted or inferred."],
    ],
  },
};

/**
 * Das Sternennetz, das im OS wirklich existiert.
 *
 * Durchgezogene Linien sind gesetzte Verbindungen - jemand hat sie behauptet.
 * Feine gestrichelte sind vermutete. Genau diese Unterscheidung liegt seit dem
 * 24.08.2026 in CORE (services/evidence.py); die Zeichnung hier zeigt sie,
 * statt sich eine Netzstruktur auszudenken.
 */
function StarField({ label }: { label: string }) {
  const sterne = [
    { x: 168, y: 128, r: 13, hell: 1 },
    { x: 356, y: 96, r: 9, hell: 0.66 },
    { x: 470, y: 190, r: 11, hell: 0.82 },
    { x: 250, y: 244, r: 8, hell: 0.5 },
    { x: 96, y: 286, r: 6, hell: 0.3 },
    { x: 388, y: 320, r: 9, hell: 0.6 },
    { x: 540, y: 330, r: 6, hell: 0.28 },
    { x: 214, y: 372, r: 5, hell: 0.2 },
  ];
  const gesetzt: ReadonlyArray<readonly [number, number]> = [[0, 1], [0, 3], [2, 5], [0, 2]];
  const geraten: ReadonlyArray<readonly [number, number]> = [[3, 4], [5, 6], [3, 7], [1, 2], [4, 7]];

  return (
    <svg viewBox="0 0 640 460" role="img" aria-label={label} className="block w-full">
      <defs>
        <radialGradient id="os-grund" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#132824" />
          <stop offset="1" stopColor="#0a1512" />
        </radialGradient>
      </defs>
      <rect width="640" height="460" fill="url(#os-grund)" />

      {geraten.map(([a, b], i) => (
        <line
          key={`v${i}`}
          x1={sterne[a].x} y1={sterne[a].y} x2={sterne[b].x} y2={sterne[b].y}
          stroke="#7fd4c1" strokeOpacity=".22" strokeWidth="1" strokeDasharray="3 6"
        />
      ))}
      {gesetzt.map(([a, b], i) => (
        <line
          key={`g${i}`}
          x1={sterne[a].x} y1={sterne[a].y} x2={sterne[b].x} y2={sterne[b].y}
          stroke="#7fd4c1" strokeOpacity=".62" strokeWidth="1.6" strokeLinecap="round"
        />
      ))}

      {sterne.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r * 2.4} fill="#7fd4c1" opacity={s.hell * 0.14} />
          <circle cx={s.x} cy={s.y} r={s.r} fill="#cdf3ea" opacity={0.35 + s.hell * 0.6} />
        </g>
      ))}

      {/* Legende: der Unterschied, um den es geht */}
      <g transform="translate(64 412)" fontSize="11" fontFamily="ui-monospace, monospace">
        <line x1="0" y1="0" x2="34" y2="0" stroke="#7fd4c1" strokeOpacity=".62" strokeWidth="1.6" strokeLinecap="round" />
        <text x="44" y="4" fill="#cdf3ea" opacity=".72">gesetzt</text>
        <line x1="130" y1="0" x2="164" y2="0" stroke="#7fd4c1" strokeOpacity=".22" strokeWidth="1" strokeDasharray="3 6" />
        <text x="174" y="4" fill="#cdf3ea" opacity=".45">vermutet</text>
      </g>
    </svg>
  );
}

export default function OsSection({ locale }: Props) {
  const copy = COPY[locale];
  return (
    <ProductSection
      id="os"
      copy={copy}
      accent={ACCENT}
      accentInk={ACCENT_INK}
      scene={<StarField label={copy.sceneLabel} />}
    />
  );
}
