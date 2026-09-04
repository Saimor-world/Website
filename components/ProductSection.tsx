import type { ReactNode } from "react";

/**
 * Ein Produktabschnitt fuer die Startseite.
 *
 * Herausgeloest aus ViciniSection, als Desk und Earth dazukamen. Drei Mal
 * dieselben 160 Zeilen nebeneinander waeren genau die Doppelung, an der dieser
 * Bestand ohnehin leidet - beim Aufraeumen am 24.08.2026 fanden sich fuenf
 * Architekturdokumente, fuenf Mycelium-Bauteile und acht Caddyfiles, von denen
 * jeweils niemand mehr sagen konnte, welches gilt.
 *
 * Was der Abschnitt NICHT vereinheitlicht: die Bildwelt. Jedes Produkt bekommt
 * seine eigene Zeichnung als `scene`, sonst sehen drei verschiedene Dinge
 * gleich aus - und das waere schlimmer als doppelter Code.
 */

export type ProductSectionCopy = {
  /** Kuerzel im Zeichen links, z. B. "D" fuer Desk. */
  mark: string;
  name: string;
  kicker: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Der Satz, der die Zusage traegt. Steht abgesetzt an der Goldlinie. */
  trust: string;
  primary: string;
  primaryHref: string;
  secondary: string;
  cards: ReadonlyArray<readonly [string, string]>;
  /** Aufschrift auf der Zeichnung, oben links. */
  sceneLabel: string;
};

type Props = {
  id: string;
  copy: ProductSectionCopy;
  scene: ReactNode;
  /** Akzentfarbe des Produkts. Gold bleibt SAIMORs Hausfarbe und wird nicht ersetzt. */
  accent: string;
  accentInk: string;
};

export default function ProductSection({ id, copy, scene, accent, accentInk }: Props) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-white/8 bg-world-ink px-5 py-14 text-white/85 md:px-6 md:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            `radial-gradient(circle at 78% 25%, ${accent}20, transparent 30%),` +
            "radial-gradient(circle at 12% 75%, rgba(214,168,72,.08), transparent 34%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl border font-serif text-2xl"
                style={{ borderColor: `${accent}40`, background: `${accent}1a`, color: accent }}
              >
                {copy.mark}
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-[.14em] text-white">{copy.name}</p>
                <p className="text-[9px] font-bold tracking-[.24em] text-world-gold/75">{copy.kicker}</p>
              </div>
            </div>

            <p className="mb-5 font-mono text-[10px] font-bold tracking-[.22em]" style={{ color: accent }}>
              {copy.eyebrow}
            </p>
            <h2 className="max-w-2xl font-serif text-4xl font-medium leading-[1] tracking-[-.035em] text-white sm:text-5xl md:text-6xl">
              {copy.title}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/58 md:text-lg">{copy.body}</p>
            <p className="mt-6 border-l border-world-gold/45 pl-4 text-sm leading-6 text-world-gold/85">
              {copy.trust}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={copy.primaryHref}
                className="rounded-full px-6 py-3 text-sm font-bold transition hover:-translate-y-0.5"
                style={{ background: accent, color: accentInk }}
              >
                {copy.primary}
              </a>
              <a
                href={`#${id}-features`}
                className="hidden rounded-full border border-world-gold/30 px-6 py-3 text-sm font-bold text-world-gold transition hover:border-world-gold md:inline-flex"
              >
                {copy.secondary}
              </a>
            </div>
          </div>

          <div className="relative hidden rounded-[2.2rem_1.1rem_2.5rem_1.3rem] border border-white/10 bg-white/[0.035] p-7 shadow-[14px_16px_0_rgba(0,0,0,.32)] lg:block">
            <div
              className="absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-world-ink/75 px-3 py-1.5 font-mono text-[9px] tracking-[.16em] backdrop-blur"
              style={{ color: accent }}
            >
              {copy.sceneLabel}
            </div>
            {scene}
          </div>
        </div>

        <div
          id={`${id}-features`}
          className="mt-12 hidden overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.025] md:grid md:grid-cols-3"
        >
          {copy.cards.map(([label, text]) => (
            <article
              key={label}
              className="min-h-44 border-b border-white/8 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <p className="font-mono text-[10px] font-bold tracking-[.16em]" style={{ color: accent }}>
                {label}
              </p>
              <p className="mt-10 max-w-sm text-lg font-medium leading-snug text-white/78">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
