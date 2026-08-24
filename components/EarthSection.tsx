import ProductSection, { type ProductSectionCopy } from "./ProductSection";

type Props = { locale: "de" | "en" };

/**
 * Earth auf der Startseite.
 *
 * Lief oeffentlich unter earth.saimor.world und fehlte auf saimor.world
 * vollstaendig (Portfolio 24.08.2026). Es ist das einzige Produkt mit einem
 * benannten Kunden-Typ und einem konkreten Demonstrator - also gerade das,
 * was ein Schaufenster zeigen sollte.
 */

const ACCENT = "#7fb891";
const ACCENT_INK = "#0f1d15";

const COPY: Record<Props["locale"], ProductSectionCopy> = {
  de: {
    mark: "E",
    name: "EARTH",
    kicker: "FÜR GEMEINDEN UND VERWALTUNGEN",
    eyebrow: "EIN ORT, WIE ER WIRKLICH IST",
    title: "Flächen, Haushalt und Pflege auf einer Karte.",
    body: "Was eine Gemeinde besitzt, was sie kostet, wer sie pflegt und wann etwas ansteht — nicht in vier Tabellen, sondern an dem Ort, um den es geht. Gegen echte Verwaltungsdaten, nicht gegen ein Beispiel.",
    trust: "Läuft auf dem Server der Gemeinde. Was öffentlich wird, entscheidet die Gemeinde.",
    primary: "Earth ansehen",
    primaryHref: "https://earth.saimor.world",
    secondary: "Was auf der Karte liegt",
    sceneLabel: "BÜSUM · DEMONSTRATOR",
    cards: [
      ["01 / FLÄCHEN", "Jedes Grundstück mit Größe, Nutzung und Zuständigkeit."],
      ["02 / HAUSHALT", "Was eine Fläche kostet und was sie einbringt — daneben, nicht woanders."],
      ["03 / PFLEGE", "Wann zuletzt gemäht, geprüft, repariert wurde. Und wann wieder."],
    ],
  },
  en: {
    mark: "E",
    name: "EARTH",
    kicker: "FOR MUNICIPALITIES",
    eyebrow: "A PLACE AS IT ACTUALLY IS",
    title: "Land, budget and upkeep on one map.",
    body: "What a municipality owns, what it costs, who maintains it and when something is due — not across four spreadsheets, but at the place it concerns. Against real administrative data, not a sample.",
    trust: "Runs on the municipality's own server. What becomes public is theirs to decide.",
    primary: "See Earth",
    primaryHref: "https://earth.saimor.world",
    secondary: "What's on the map",
    sceneLabel: "BÜSUM · DEMONSTRATOR",
    cards: [
      ["01 / LAND", "Every parcel with size, use and who is responsible."],
      ["02 / BUDGET", "What a parcel costs and what it returns — right beside it, not elsewhere."],
      ["03 / UPKEEP", "When it was last mown, checked, repaired. And when it is due again."],
    ],
  },
};

/** Eine Karte von oben: Parzellen, ein Weg, Wasser am Rand. */
function MapScene({ label }: { label: string }) {
  const parzellen = [
    { x: 64, y: 96, w: 128, h: 96, t: 0.5 },
    { x: 200, y: 96, w: 92, h: 96, t: 0.28 },
    { x: 64, y: 200, w: 92, h: 118, t: 0.36 },
    { x: 164, y: 200, w: 128, h: 118, t: 0.2 },
    { x: 342, y: 130, w: 116, h: 84, t: 0.44 },
    { x: 342, y: 222, w: 116, h: 96, t: 0.24 },
    { x: 466, y: 130, w: 104, h: 188, t: 0.32 },
  ];

  return (
    <svg viewBox="0 0 640 460" role="img" aria-label={label} className="block w-full">
      <defs>
        <linearGradient id="earth-grund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16211b" />
          <stop offset="1" stopColor="#0e1713" />
        </linearGradient>
      </defs>

      <rect width="640" height="460" fill="url(#earth-grund)" />

      {/* Wasser am oberen Rand */}
      <path d="M0 0h640v58c-90 16-180-10-268 4C284 76 190 58 96 66 60 69 28 66 0 60Z" fill="#3d6d78" opacity=".38" />

      {parzellen.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="#7fb891" opacity={p.t} />
          <rect
            x={p.x}
            y={p.y}
            width={p.w}
            height={p.h}
            fill="none"
            stroke="#7fb891"
            strokeWidth="1.5"
            opacity=".55"
          />
        </g>
      ))}

      {/* Weg */}
      <path d="M0 210h300M300 210V96M300 210v134M300 210h340" fill="none" stroke="#d9c9a6" strokeWidth="7" opacity=".3" />
      <path d="M0 210h300M300 210V96M300 210v134M300 210h340" fill="none" stroke="#d9c9a6" strokeWidth="2" opacity=".5" strokeDasharray="10 12" />

      {/* Drei Markierungen: hier steht etwas an */}
      {[
        [128, 144],
        [400, 172],
        [518, 268],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="15" fill="#d9a756" opacity=".18" />
          <circle r="7" fill="#d9a756" />
          <circle r="3" fill="#241a0c" />
        </g>
      ))}

      {/* Massstab */}
      <g transform="translate(64 400)" opacity=".5">
        <path d="M0 0h96" stroke="#d9c9a6" strokeWidth="2" />
        <path d="M0-5v10M48-4v8M96-5v10" stroke="#d9c9a6" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function EarthSection({ locale }: Props) {
  const copy = COPY[locale];
  return (
    <ProductSection
      id="earth"
      copy={copy}
      accent={ACCENT}
      accentInk={ACCENT_INK}
      scene={<MapScene label={copy.sceneLabel} />}
    />
  );
}
