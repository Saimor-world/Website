import ParallaxOrbits from "./ParallaxOrbits";

type Props = { locale: 'de' | 'en' }

export default function Principles({ locale }: Props) {
  const items = locale==='de'
    ? ['Ruhe vor Tempo','Tiefe vor Lautstärke','Verantwortung vor Reichweite','Privatheit vor Profil','Schönheit vor Trick']
    : ['Calm before speed','Depth before volume','Responsibility before reach','Privacy before profile','Beauty before trick']

  return (
    <section id="prinzipien" className="section relative">
      {/* parallax hinterlegt */}
      <ParallaxOrbits strength={0.18}>
        <svg className="section-orbits" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <g fill="none" className="stroke">
            <path d="M0 200 Q720 60 1440 200" />
            <ellipse cx="960" cy="240" rx="420" ry="120" />
          </g>
        </svg>
      </ParallaxOrbits>

      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px w-full bg-white/10 mb-8" />
        <h2 className="text-[26px] md:text-[30px] font-medium mb-6">
          {locale==='de' ? 'Prinzipien' : 'Principles'}
        </h2>

        <div className="flex flex-wrap gap-3">
          {items.map((t, i) => (
            <span key={t} className="s-pill reveal" style={{ animationDelay: `${i*60}ms` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
