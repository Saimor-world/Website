type Props = { locale: "de" | "en" };

const COPY = {
  de: {
    eyebrow: "EIN NEUER ORT IM SAIMÔR ÖKOSYSTEM",
    title: "VICINI macht Nähe begehbar.",
    body: "Eine private Kartenwelt für Freundschaften, Zuhause, Nachrichten und Erinnerungen. Keine Timeline, kein Publikum – Menschen und gemeinsame Orte bilden die Oberfläche.",
    trust: "Echte Orte. Sichtbar nur zwischen Menschen, die einander freigeben.",
    primary: "VICINI öffnen",
    secondary: "Was dort schon lebt",
    scene: "Illustration einer VICINI-Nachbarschaft mit Haus und Gartenbeeten",
    cards: [
      ["01 / ORTE", "Zuhause und Erinnerungen liegen dort, wo sie im Leben passiert sind."],
      ["02 / GÄRTEN", "Blumenbeet, Obstgarten oder Gemüsebeet werden Teil des eigenen Hauses."],
      ["03 / NÄHE", "Freundschaften erscheinen als Wege, Häuser und gemeinsam erlebte Momente."],
    ],
  },
  en: {
    eyebrow: "A NEW PLACE IN THE SAIMÔR ECOSYSTEM",
    title: "VICINI makes closeness tangible.",
    body: "A private map world for friendships, homes, messages and memories. No timeline, no audience – people and shared places are the interface.",
    trust: "Real places. Visible only between people who grant each other access.",
    primary: "Open VICINI",
    secondary: "What already lives there",
    scene: "Illustration of a VICINI neighbourhood with a home and garden beds",
    cards: [
      ["01 / PLACES", "Homes and memories live where they actually happened."],
      ["02 / GARDENS", "Flowers, an orchard or vegetable beds become part of your own home."],
      ["03 / CLOSENESS", "Friendships appear as paths, homes and moments experienced together."],
    ],
  },
} as const;

function GardenScene({ label }: { label: string }) {
  const flowers = [
    [30, 23, "#d98b88"],
    [60, 19, "#f0c968"],
    [91, 11, "#e9e5d3"],
    [115, 24, "#ca7390"],
    [52, 44, "#eee3a4"],
    [91, 37, "#d98b88"],
  ] as const;

  return (
    <svg
      viewBox="0 0 680 520"
      role="img"
      aria-label={label}
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id="vicini-ground" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dce4d6" />
          <stop offset="1" stopColor="#aabfa6" />
        </linearGradient>
        <linearGradient id="vicini-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d99a73" />
          <stop offset="1" stopColor="#a95f49" />
        </linearGradient>
        <filter id="vicini-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="12" dy="18" stdDeviation="14" floodColor="#020607" floodOpacity=".34" />
        </filter>
        <pattern id="vicini-rows" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(12)">
          <path d="M0 4H18" stroke="#b8d094" strokeWidth="5" strokeLinecap="round" />
        </pattern>
      </defs>

      <path d="M88 116 365 42 612 181 562 423 256 491 62 342Z" fill="url(#vicini-ground)" filter="url(#vicini-shadow)" />
      <path d="M86 323C182 255 241 269 318 329s139 70 233 28" fill="none" stroke="#f4ead8" strokeWidth="32" strokeLinecap="round" opacity=".88" />
      <path d="M86 323C182 255 241 269 318 329s139 70 233 28" fill="none" stroke="#8e7b65" strokeWidth="2" strokeDasharray="4 13" strokeLinecap="round" opacity=".38" />

      <g transform="translate(218 112)" filter="url(#vicini-shadow)">
        <path d="m15 92 112-66 116 63-4 132-109 67-113-62Z" fill="#f2e6d1" />
        <path d="M15 92 127 26l116 63-112 70Z" fill="url(#vicini-roof)" />
        <path d="m131 159 112-70-4 132-108 67Z" fill="#d8c8ae" />
        <path d="M53 119h47v67H53z" fill="#89a9a6" />
        <path d="M160 173h39v70h-39z" fill="#705a48" />
        <path d="M64 132h25v41H64z" fill="#d8edf0" opacity=".84" />
        <path d="M188 28v-46l21 11v49" fill="#9f6b51" />
        <path d="M183-18h31" stroke="#ecc39d" strokeWidth="8" strokeLinecap="round" />
      </g>

      <g transform="translate(84 151)">
        <path d="m0 38 118-31 58 33-117 35Z" fill="#75563e" opacity=".88" />
        <path d="m14 37 26-7M49 28l26-7M84 19l26-7M119 12l28 16" stroke="#d9c08e" strokeWidth="8" strokeLinecap="round" />
        {flowers.map(([x, y, color], index) => (
          <g key={index} transform={`translate(${x} ${y})`}>
            <path d="M0 5v13" stroke="#456f4e" strokeWidth="3" />
            <circle r="7" fill={color} />
            <circle r="2" fill="#6f5638" />
          </g>
        ))}
      </g>

      <g transform="translate(412 271)">
        <path d="m0 53 128-32 64 38-129 35Z" fill="#74573d" />
        <path d="m13 53 126-31 39 23L51 77Z" fill="url(#vicini-rows)" />
        {[36, 70, 104, 138].map((x, index) => (
          <g key={x} transform={`translate(${x} ${48 - index * 7})`}>
            <path d="M0 0v18" stroke="#426d48" strokeWidth="4" />
            <path d="M0 7c-11-10-17 3 0 8M0 5c11-10 17 3 0 8" fill="#6f9b5c" />
          </g>
        ))}
      </g>

      <g fill="#f7eedf" stroke="#8b705c" strokeWidth="2">
        <circle cx="119" cy="364" r="14" /><circle cx="529" cy="175" r="14" /><circle cx="563" cy="404" r="14" />
      </g>
      <g fill="#a95f49">
        <circle cx="119" cy="364" r="5" /><circle cx="529" cy="175" r="5" /><circle cx="563" cy="404" r="5" />
      </g>
      <path d="M106 94c36 16 54 12 79-9" fill="none" stroke="#f0c968" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 11" />
    </svg>
  );
}

export default function ViciniSection({ locale }: Props) {
  const copy = COPY[locale];

  return (
    <section className="relative overflow-hidden border-t border-white/8 bg-world-ink px-6 py-24 text-white/85 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(111,155,92,.13),transparent_30%),radial-gradient(circle_at_12%_75%,rgba(214,168,72,.08),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-[1.25rem] border border-[#b8cfad]/25 bg-[#b8cfad]/10 font-serif text-3xl text-[#dce8d5]">V</div>
              <div>
                <p className="text-2xl font-semibold tracking-[.14em] text-white">VICINI</p>
                <p className="text-[9px] font-bold tracking-[.24em] text-world-gold/75">A SAIMÔR EXPERIMENT</p>
              </div>
            </div>
            <p className="mb-5 font-mono text-[10px] font-bold tracking-[.22em] text-[#aeca9f]">{copy.eyebrow}</p>
            <h2 className="max-w-2xl font-serif text-5xl font-medium leading-[.96] tracking-[-.04em] text-white md:text-7xl">{copy.title}</h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/58 md:text-lg">{copy.body}</p>
            <p className="mt-6 border-l border-world-gold/45 pl-4 text-sm leading-6 text-world-gold/85">{copy.trust}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="https://vicini.saimor.world" className="rounded-full bg-[#aeca9f] px-6 py-3 text-sm font-bold text-[#162219] transition hover:-translate-y-0.5 hover:bg-[#c6dcbb]">{copy.primary}</a>
              <a href="#vicini-features" className="rounded-full border border-world-gold/30 px-6 py-3 text-sm font-bold text-world-gold transition hover:border-world-gold">{copy.secondary}</a>
            </div>
          </div>

          <div className="relative rounded-[2.2rem_1.1rem_2.5rem_1.3rem] border border-white/10 bg-white/[0.035] p-4 shadow-[14px_16px_0_rgba(0,0,0,.32)] sm:p-7">
            <div className="absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-world-ink/75 px-3 py-1.5 font-mono text-[9px] tracking-[.16em] text-[#c6dcbb] backdrop-blur">STUTTGART · PRIVATE WORLD</div>
            <GardenScene label={copy.scene} />
          </div>
        </div>

        <div id="vicini-features" className="mt-16 grid overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.025] md:grid-cols-3">
          {copy.cards.map(([label, text]) => (
            <article key={label} className="min-h-44 border-b border-white/8 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <p className="font-mono text-[10px] font-bold tracking-[.16em] text-[#aeca9f]">{label}</p>
              <p className="mt-10 max-w-sm text-lg font-medium leading-snug text-white/78">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
