import ProductSection, { type ProductSectionCopy } from "./ProductSection";

type Props = { locale: "de" | "en" };

const ACCENT = "#7fd4c1";
const ACCENT_INK = "#0b1f1b";

const COPY: Record<Props["locale"], ProductSectionCopy> = {
  de: {
    mark: "◎",
    name: "SAIMÔR OS",
    kicker: "DER ARBEITSRAUM",
    eyebrow: "KONTEXT, DATEIEN UND PROZESSE IN EINEM SYSTEM",
    title: "Das OS hält Arbeit zusammen.",
    body: "Das Saimôr OS ist der digitale Arbeitsraum hinter dem System: Bereiche, Dateien, Vorgänge und KI-Kontext bleiben miteinander verbunden. Môra arbeitet innerhalb dieses Raums mit dem vorhandenen Zusammenhang, statt bei jeder Aufgabe wieder bei null zu beginnen. Das OS befindet sich im aktiven Aufbau; die öffentliche Demo läuft in einem getrennten Beispielraum.",
    trust: "Eigener Datenraum, nachvollziehbare Anbindungen und klare Grenzen. Externe KI-Modelle können transparent eingebunden werden, ohne daraus einen gemeinsamen Kundenspeicher zu machen.",
    primary: "Security Check starten",
    primaryHref: "/de/einstieg/security-check",
    secondary: "Môra im OS verstehen",
    sceneLabel: "SAIMÔR OS · ZUSAMMENHÄNGE IM RAUM",
    cards: [
      ["01 / RÄUME", "Bereiche, Dateien und Arbeit bleiben dort, wo sie hingehören."],
      ["02 / KONTEXT", "Zusammenhänge bleiben sichtbar und müssen nicht jedes Mal neu erklärt werden."],
      ["03 / MÔRA", "Die KI-Schicht arbeitet mit diesem Kontext und begleitet die Arbeit im System."],
    ],
  },
  en: {
    mark: "◎",
    name: "SAIMÔR OS",
    kicker: "THE WORKSPACE",
    eyebrow: "CONTEXT, FILES AND PROCESSES IN ONE SYSTEM",
    title: "The OS keeps work connected.",
    body: "Saimôr OS is the digital workspace behind the system: areas, files, work and AI context stay connected. Môra works inside that space with the context already available instead of starting from zero for every task. The OS is in active development; the public demo runs in a separate sample workspace.",
    trust: "A dedicated data space, traceable integrations and clear boundaries. External AI models can be connected transparently without creating shared customer storage.",
    primary: "Start Security Check",
    primaryHref: "/en/entry/security-check",
    secondary: "Understand Môra in the OS",
    sceneLabel: "SAIMÔR OS · CONNECTED CONTEXT",
    cards: [
      ["01 / SPACES", "Areas, files and work stay where they belong."],
      ["02 / CONTEXT", "Connections remain visible instead of being explained again every time."],
      ["03 / MÔRA", "The AI layer works with that context and accompanies the work inside the system."],
    ],
  },
};

function StarField({ label }: { label: string }) {
  const stars = [
    { x: 168, y: 128, r: 13, light: 1 },
    { x: 356, y: 96, r: 9, light: 0.66 },
    { x: 470, y: 190, r: 11, light: 0.82 },
    { x: 250, y: 244, r: 8, light: 0.5 },
    { x: 96, y: 286, r: 6, light: 0.3 },
    { x: 388, y: 320, r: 9, light: 0.6 },
    { x: 540, y: 330, r: 6, light: 0.28 },
    { x: 214, y: 372, r: 5, light: 0.2 },
  ];
  const asserted: ReadonlyArray<readonly [number, number]> = [[0, 1], [0, 3], [2, 5], [0, 2]];
  const inferred: ReadonlyArray<readonly [number, number]> = [[3, 4], [5, 6], [3, 7], [1, 2], [4, 7]];

  return (
    <svg viewBox="0 0 640 460" role="img" aria-label={label} className="block w-full">
      <defs>
        <radialGradient id="os-ground" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#132824" />
          <stop offset="1" stopColor="#0a1512" />
        </radialGradient>
      </defs>
      <rect width="640" height="460" fill="url(#os-ground)" />

      {inferred.map(([a, b], i) => (
        <line
          key={`i${i}`}
          x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y}
          stroke="#7fd4c1" strokeOpacity=".22" strokeWidth="1" strokeDasharray="3 6"
        />
      ))}
      {asserted.map(([a, b], i) => (
        <line
          key={`a${i}`}
          x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y}
          stroke="#7fd4c1" strokeOpacity=".62" strokeWidth="1.6" strokeLinecap="round"
        />
      ))}

      {stars.map((star, i) => (
        <g key={i}>
          <circle cx={star.x} cy={star.y} r={star.r * 2.4} fill="#7fd4c1" opacity={star.light * 0.14} />
          <circle cx={star.x} cy={star.y} r={star.r} fill="#cdf3ea" opacity={0.35 + star.light * 0.6} />
        </g>
      ))}

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
