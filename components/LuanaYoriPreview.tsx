'use client';

import { useState } from 'react';
import YoriMark from '@/components/YoriMark';
import type { ClientWorldConfig } from '@/lib/client-world';

type Decision = 'yes' | 'change';

type Props = {
  world: ClientWorldConfig;
  initialDecision?: Decision | null;
};

const TAGLINE = 'Bewusstseinstraining · Identitätsshift · Energiearbeit';

const INTRO_QA = [
  {
    q: 'Was ist eine eigene World?',
    a: 'Ein persönlicher Raum hinter deinem Business. Nicht noch ein Kanal, sondern ein Ort, an dem Auftritt, Gedanken, Inhalte und Entscheidungen ihren Zusammenhang behalten.',
  },
  {
    q: 'Warum habt ihr das für mich gebaut?',
    a: 'Weil dein Auftritt schon heute mehr trägt als nur einzelne Seiten: eine klare Sprache, mehrere Wege, Stimmen und Dinge, die weiter wachsen. Genau dort kann eine World helfen, Zusammenhang zu halten.',
  },
  {
    q: 'Was macht YORI darin?',
    a: 'YORI ist die ruhige Logik darunter. Es soll nicht alles gleichzeitig vor dich legen, sondern erinnern, verbinden und zurückbringen, was gerade wirklich zählt.',
  },
  {
    q: 'Was hätte ich konkret davon?',
    a: 'Weniger neu zusammensuchen, weniger Kontext wiederholen und klarer sehen, was als Nächstes wichtig ist. Die World soll Arbeit leichter machen, nicht mehr davon erzeugen.',
  },
  {
    q: 'Ist das einfach eine neue Website?',
    a: 'Nein. Die Website kann ein erster Faden sein. Später könnten auch Ideen, Content, Kooperationen oder Termine denselben Kontext teilen – aber nur dort, wo es für dich wirklich sinnvoll ist.',
  },
  {
    q: 'Bleibt das trotzdem meins?',
    a: 'Ja. YORI soll vorbereiten, erinnern und Zusammenhänge halten – nicht für dich entscheiden. Die Richtung, die Sprache und die Entscheidung bleiben bei dir.',
  },
];

const WORLD_AREAS = [
  {
    chapter: '01 / AUFTRITT',
    title: 'Was du nach außen zeigst.',
    body: 'Website, Angebote und Sprache können zusammen gedacht werden, ohne dass deine eigene Handschrift verloren geht.',
    kind: 'page' as const,
  },
  {
    chapter: '02 / GEDANKEN',
    title: 'Was noch unfertig sein darf.',
    body: 'Eine Idee muss nicht sofort Post, Projekt oder Aufgabe werden. Sie darf liegen bleiben und später mit ihrem Zusammenhang wieder auftauchen.',
    kind: 'note' as const,
  },
  {
    chapter: '03 / ENTSCHEIDUNGEN',
    title: 'Was deine Aufmerksamkeit braucht.',
    body: 'Nicht alles ist gleich dringend. YORI soll unterscheiden, was gerade wirklich eine Entscheidung von dir braucht – und was warten darf.',
    kind: 'choice' as const,
  },
  {
    chapter: '04 / ERINNERUNG',
    title: 'Was nicht wieder bei null beginnen soll.',
    body: 'Wenn etwas später wieder relevant wird, kommt nicht nur der Punkt zurück, sondern auch der Kontext, aus dem er entstanden ist.',
    kind: 'memory' as const,
  },
];

const PRACTICAL_QA = [
  {
    q: 'Müsste ich dafür alles umstellen?',
    a: 'Nein. Die Idee ist gerade das Gegenteil: Die World soll sich um deine bestehende Arbeit legen und erst dort helfen, wo sie wirklich etwas leichter macht.',
  },
  {
    q: 'Müsste ich YORI ständig bedienen?',
    a: 'Möglichst wenig. Ein guter persönlicher Raum sollte nicht nach Pflege verlangen. Er sollte ordnen, erinnern und nur dann auftauchen, wenn etwas relevant wird.',
  },
  {
    q: 'Was wäre der erste echte Schritt?',
    a: 'Wir würden einen kleinen Bereich gemeinsam wirklich machen – zum Beispiel deinen Auftritt – und daran prüfen, ob sich die World für dich tatsächlich hilfreich anfühlt.',
  },
  {
    q: 'Was passiert, wenn sich meine Arbeit verändert?',
    a: 'Dann soll die World mitwachsen. Dinge können leiser werden, neue Fäden dazukommen und ältere Zusammenhänge später wieder wichtig werden, ohne dass du alles neu aufbauen musst.',
  },
];

const NAV = [
  ['ankommen', '01 · Ankommen'],
  ['world', '02 · Deine World'],
  ['beispiel', '03 · Ein Beispiel'],
  ['weiter', '04 · Weiter'],
] as const;

export default function LuanaYoriPreview({ world, initialDecision = null }: Props) {
  const [decision, setDecision] = useState<Decision | null>(initialDecision);
  const [savingDecision, setSavingDecision] = useState(false);
  const [decisionError, setDecisionError] = useState(false);

  async function chooseDecision(value: Decision) {
    if (savingDecision) return;

    setSavingDecision(true);
    setDecisionError(false);

    try {
      const response = await fetch(`/api/world/${encodeURIComponent(world.slug)}/preview-decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value }),
      });

      if (!response.ok) throw new Error('decision failed');
      setDecision(value);
    } catch {
      setDecisionError(true);
    } finally {
      setSavingDecision(false);
    }
  }

  return (
    <main className="min-h-[100svh] bg-[#f7f2e6] text-[#1c2b20]">
      <LightWorldAmbient />

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-[#b8893f]/[.30] bg-[#f3eddd]/[.76] px-6 pb-7 pt-8 backdrop-blur-[22px] lg:flex">
        <a href="#ankommen" className="pb-10 text-left">
          <span className="flex items-center gap-2.5">
            <YoriMark className="h-8 w-8 shrink-0 text-[#25382a]" title="YORI" />
            <Wordmark className="whitespace-nowrap text-[17px]" />
          </span>
          <span className="mt-2.5 block text-[9px] uppercase leading-4 tracking-[.19em] text-[#5f6e63]">
            {TAGLINE}
          </span>
        </a>

        <nav className="grid border-t border-[#b8893f]/[.24] pt-4" aria-label="Luana World Kapitel">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="border-b border-[#b8893f]/[.20] py-4 text-[10px] uppercase tracking-[.17em] text-[#5f6e63] transition hover:text-[#1c2b20]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#b8893f]/[.28] pt-6">
          <p className="font-mono text-[9px] font-bold tracking-[.22em] text-[#2c6b68]">DEINE WORLD · YORI</p>
          <p className="mt-3 text-[11px] leading-5 text-[#5f6e63]">
            Ein persönlicher Entwurf für {world.clientName}. Luana vorne, YORI darunter.
          </p>
          {decision ? (
            <a href="#weiter" className="mt-5 block text-[9px] uppercase tracking-[.16em] text-[#8c6224] underline decoration-[#b8893f] underline-offset-4">
              Deine Antwort ansehen
            </a>
          ) : null}
        </div>
      </aside>

      <section className="relative z-10 min-h-[100svh] lg:pl-[248px]">
        <header className="border-b border-[#b8893f]/[.34]">
          <div className="mx-auto w-[calc(100%-40px)] max-w-[1180px] py-4 lg:w-[calc(100%-96px)]">
            <div className="flex items-start justify-between gap-3">
              <span className="flex items-center gap-2.5 lg:hidden">
                <YoriMark className="h-7 w-7 shrink-0 text-[#25382a]" title="YORI" />
                <Wordmark className="whitespace-nowrap text-[14px]" />
              </span>
              <p className="ml-auto shrink-0 pt-1 text-[9px] uppercase tracking-[.16em] text-[#5f6e63] sm:text-[10px]">
                Persönlicher Entwurf
              </p>
            </div>
            <p className="mt-2.5 text-[8px] uppercase tracking-[.15em] text-[#5f6e63] lg:hidden">{TAGLINE}</p>
          </div>
        </header>

        <nav className="border-b border-[#b8893f]/[.22] lg:hidden" aria-label="Luana World mobile Kapitel">
          <div className="mx-auto flex w-[calc(100%-40px)] gap-7 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="shrink-0 text-[9px] uppercase tracking-[.14em] text-[#5f6e63]"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        {decision ? (
          <div className="border-b border-[#3E8F8B]/[.18] bg-[#3E8F8B]/[.045]">
            <div className="mx-auto flex w-[calc(100%-40px)] max-w-[1180px] items-center justify-between gap-4 py-3 lg:w-[calc(100%-96px)]">
              <p className="text-[11px] leading-5 text-[#466258]">Willkommen zurück. Deine letzte Antwort ist noch da.</p>
              <a href="#weiter" className="shrink-0 text-[9px] uppercase tracking-[.15em] text-[#2c6b68] underline decoration-[#3E8F8B]/[.45] underline-offset-4">
                ansehen
              </a>
            </div>
          </div>
        ) : null}

        <div className="mx-auto w-[calc(100%-40px)] max-w-[1180px] lg:w-[calc(100%-96px)]">
          <section id="ankommen" className="scroll-mt-4 pb-20 pt-10 lg:pb-28 lg:pt-16">
            <Hero />

            <div className="mt-20 border-y border-[#b8893f]/[.34] py-12 sm:mt-28 sm:py-16">
              <p className="text-center text-[10px] uppercase tracking-[.20em] text-[#8c6224]">Warum für dich?</p>
              <p className="mx-auto mt-6 max-w-3xl text-center font-serif text-[clamp(1.6rem,3.4vw,2.25rem)] font-light leading-[1.26]">
                Weil dein Auftritt schon heute wie eine kleine Welt funktioniert – mit eigener Sprache, mehreren Wegen, Stimmen und Dingen, die weiterwachsen.
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
                Wir wollen daraus kein neues System über dich legen. Wir wollen zeigen, wie diese Dinge ihren Zusammenhang behalten könnten, ohne dass du ihn jedes Mal neu herstellen musst.
              </p>
            </div>

            <SectionOpener
              eyebrow="Ankommen"
              title={`Hallo ${world.clientName}. Was ist das hier eigentlich?`}
              body="Die wichtigsten Fragen zuerst. Nicht als Produktpitch – sondern damit du nach ein paar Minuten selbst beurteilen kannst, ob diese Idee überhaupt zu dir passt."
            />

            <dl className="mt-2 grid lg:grid-cols-2 lg:gap-x-16">
              {INTRO_QA.map((item, index) => (
                <div key={item.q} className="border-b border-[#b8893f]/[.34] py-9">
                  <span className="text-[10px] tracking-[.20em] text-[#8c6224]">0{index + 1}</span>
                  <dt className="mt-4 font-serif text-[clamp(1.35rem,2.8vw,1.7rem)] font-light leading-snug">{item.q}</dt>
                  <dd className="mt-4 max-w-xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">{item.a}</dd>
                </div>
              ))}
            </dl>

            <ChapterBridge number="02" title="Jetzt nicht mehr erklären. Zeigen." href="#world" />
          </section>

          <section id="world" className="scroll-mt-4 border-t border-[#b8893f]/[.34] pb-20 pt-12 lg:pb-28 lg:pt-16">
            <SectionOpener
              eyebrow="Deine World"
              title="Nicht mehr Oberfläche. Mehr Zusammenhang."
              body="YORI soll nicht vor dir stehen. Es soll im Hintergrund dafür sorgen, dass Dinge, die zu deinem Business gehören, nicht voneinander getrennt herumliegen."
            />

            <WorldFlow />

            <div className="mt-14 border-t border-[#b8893f]/[.34]">
              {WORLD_AREAS.map(({ chapter, title, body, kind }, index) => (
                <article key={chapter} className="border-b border-[#b8893f]/[.34] py-12 sm:py-16">
                  <div className={`grid items-center gap-10 lg:gap-16 ${index % 2 ? 'lg:grid-cols-[.82fr_1.18fr]' : 'lg:grid-cols-[1.18fr_.82fr]'}`}>
                    <div className={index % 2 ? 'lg:order-2' : undefined}>
                      <p className="font-mono text-[10px] font-bold tracking-[.18em] text-[#2c6b68]">{chapter}</p>
                      <h3 className="mt-5 max-w-[17ch] font-serif text-[clamp(1.65rem,3.4vw,2.35rem)] font-light leading-[1.16]">{title}</h3>
                      <p className="mt-5 max-w-lg text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">{body}</p>
                    </div>
                    <div className={index % 2 ? 'lg:order-1' : undefined}>
                      <WorldObject kind={kind} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="relative isolate py-16 text-center sm:py-20">
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[.07]">
                <YoriMark className="h-[min(62vw,22rem)] w-[min(62vw,22rem)] text-[#3E8F8B]" title="YORI" />
              </div>
              <p className="font-mono text-[10px] font-bold tracking-[.18em] text-[#2c6b68]">DER EIGENTLICHE GEDANKE</p>
              <p className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(1.75rem,3.8vw,2.6rem)] font-light leading-[1.22]">
                Deine World soll nicht mehr von dir verlangen. <Marker>Sie soll weniger verlieren lassen.</Marker>
              </p>
              <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
                Weniger Kontext, der verschwindet. Weniger Ideen, die wieder neu erklärt werden müssen. Weniger Entscheidungen, die zwischen fünf Tools hängen bleiben.
              </p>
            </div>

            <ChapterBridge number="03" title="Wie sieht das an etwas Echtem aus?" href="#beispiel" />
          </section>

          <section id="beispiel" className="scroll-mt-4 border-t border-[#b8893f]/[.34] pb-20 pt-12 lg:pb-28 lg:pt-16">
            <SectionOpener
              eyebrow="Ein Beispiel"
              title="Alles, was du schon hast — an einem Ort."
              body="Deine Seite trägt bereits eine eigene Welt: ein Bild, einen Satz, mehrere Wege und Stimmen von Menschen, mit denen du gearbeitet hast. Eine World erfindet davon nichts neu. Sie hält es zusammen."
            />

            <ExampleContent />

            <ChapterBridge number="04" title="Was würde das für dich praktisch bedeuten?" href="#weiter" />
          </section>

          <section id="weiter" className="scroll-mt-4 border-t border-[#b8893f]/[.34] pb-16 pt-12 lg:pb-24 lg:pt-16">
            <SectionOpener
              eyebrow="Weiter"
              title="Was würde das für dich praktisch bedeuten?"
              body="Noch bevor irgendetwas gebaut wird, sind diese Fragen wichtiger als weitere Features."
            />

            <dl className="mt-2 grid lg:grid-cols-2 lg:gap-x-16">
              {PRACTICAL_QA.map((item, index) => (
                <div key={item.q} className="border-b border-[#b8893f]/[.34] py-9">
                  <span className="text-[10px] tracking-[.20em] text-[#8c6224]">0{index + 1}</span>
                  <dt className="mt-4 font-serif text-[clamp(1.35rem,2.8vw,1.7rem)] font-light leading-snug">{item.q}</dt>
                  <dd className="mt-4 text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">{item.a}</dd>
                </div>
              ))}
            </dl>

            <DecisionSection
              decision={decision}
              saving={savingDecision}
              error={decisionError}
              onChoose={(value) => void chooseDecision(value)}
            />
          </section>
        </div>

        <footer className="mx-auto w-[calc(100%-40px)] max-w-[1180px] border-t border-[#b8893f]/[.34] pb-10 pt-8 lg:w-[calc(100%-96px)]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-3">
              <YoriMark className="h-6 w-6 shrink-0 text-[#2c6b68]" title="YORI" />
              <span className="font-mono text-[9px] font-bold tracking-[.22em] text-[#2c6b68]">YORI · A SAIMÔR CREATION</span>
            </span>
            <span className="font-serif text-[19px] font-light italic text-[#a8752c]">Create in Flow.</span>
          </div>
        </footer>
      </section>

      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto !important; } }
      `}</style>
    </main>
  );
}

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`block font-serif font-medium tracking-[.14em] text-[#1c2b20] ${className}`}>
      LUANA <span className="text-[#a8752c]">LUMINA</span>
    </span>
  );
}

function Marker({ children }: { children: React.ReactNode }) {
  return <mark className="bg-[#e9dfc2] px-1 text-[#1c2b20]">{children}</mark>;
}

function Hero() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16">
      <div>
        <p className="text-[10px] uppercase tracking-[.20em] text-[#8c6224]">Ein erster Blick in etwas, das dir gehören könnte</p>
        <h1 className="mt-6 max-w-[15ch] font-serif text-[clamp(2.45rem,6.8vw,4.5rem)] font-light leading-[1.05] tracking-[-.01em]">
          Was wäre, wenn dein Business einen eigenen ruhigen Raum hätte?
        </h1>
        <p className="mt-7 max-w-xl text-[16px] leading-[1.8] text-[#55655a]">
          Einen Ort, der nicht nur zeigt, was du anbietest – sondern mit dir zusammenhält, was du denkst, entscheidest und als Nächstes aufbauen willst.
        </p>
        <a href="#ankommen-fragen" className="mt-8 inline-block border-b border-[#b8893f] pb-1.5 text-[12px] uppercase tracking-[.19em] text-[#1c2b20]">
          Verstehen, was damit gemeint ist
        </a>
        <p className="mt-7 max-w-md text-[13px] leading-6 text-[#5f6e63]">
          Gebaut, damit du die Idee erleben kannst – nicht damit wir dir ein fertiges System verkaufen.
        </p>
      </div>

      <div className="relative py-8">
        <div aria-hidden="true" className="absolute -left-8 -top-8 h-[75%] w-[80%] rounded-full bg-[radial-gradient(circle_at_38%_34%,rgba(255,255,255,.92),rgba(196,208,182,.30)_58%,transparent_74%)] blur-2xl" />
        <div className="relative border-y border-[#b8893f]/[.34] py-9">
          <p className="text-[10px] uppercase tracking-[.20em] text-[#8c6224]">Deine World könnte</p>
          <p className="mt-4 font-serif text-[clamp(1.8rem,3.6vw,2.45rem)] font-light leading-tight">erinnern, ordnen, verbinden.</p>
          <p className="mt-5 max-w-sm text-[14px] leading-7 text-[#5f6e63]">Und dabei im Hintergrund bleiben, solange du sie nicht brauchst.</p>
        </div>
        <p className="mt-8 font-serif text-[19px] font-light leading-relaxed text-[#5f6e63]">Heute — nur das, was gerade zählt.</p>
      </div>
      <div id="ankommen-fragen" className="scroll-mt-6" />
    </div>
  );
}

function WorldFlow() {
  const steps = [
    ['HEUTE', 'Etwas braucht deine Aufmerksamkeit.', 'Eine Entscheidung, ein Gedanke oder ein Faden liegt sichtbar da. Nicht alles andere auch.'],
    ['DARF LIEGEN', 'Nicht alles muss sofort weiter.', 'Unfertige Ideen dürfen still werden, ohne aus dem Zusammenhang zu verschwinden.'],
    ['KOMMT ZURÜCK', 'Wenn es wieder zählt, ist der Kontext noch da.', 'Nicht nur eine Notiz – sondern warum sie wichtig war und womit sie zusammenhing.'],
  ];

  return (
    <div className="mt-12 border-y border-[#b8893f]/[.34] py-3">
      <p className="py-5 text-center font-mono text-[10px] font-bold tracking-[.18em] text-[#2c6b68]">SO SOLL SICH YORI VERHALTEN</p>
      <div className="grid md:grid-cols-3">
        {steps.map(([eyebrow, title, body], index) => (
          <div key={eyebrow} className={`relative px-1 py-8 md:px-8 ${index ? 'border-t border-[#b8893f]/[.24] md:border-l md:border-t-0' : ''}`}>
            <p className="text-[9px] uppercase tracking-[.18em] text-[#8c6224]">{eyebrow}</p>
            <h3 className="mt-3 font-serif text-[22px] font-light leading-snug">{title}</h3>
            <p className="mt-4 text-[14px] leading-7 text-[#55655a]">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorldObject({ kind }: { kind: 'page' | 'note' | 'choice' | 'memory' }) {
  if (kind === 'page') {
    return (
      <div aria-hidden="true" className="mx-auto w-full max-w-[320px] rounded-[1.4rem_.5rem_1.5rem_.6rem] border border-[#b8893f]/[.30] bg-[#fdfaf1] p-6 shadow-[7px_8px_0_rgba(62,143,139,.12)]">
        <div className="h-1.5 w-16 bg-[#c8a86a]" /><div className="mt-5 h-2.5 w-[88%] bg-[#1c2b20]/[.16]" /><div className="mt-2 h-2.5 w-[62%] bg-[#1c2b20]/[.16]" /><div className="mt-6 h-px w-28 bg-[#b8893f]" /><div className="mt-6 h-px w-full bg-[#b8893f]/[.28]" /><div className="mt-5 h-1.5 w-[45%] bg-[#1c2b20]/[.10]" />
      </div>
    );
  }
  if (kind === 'note') {
    return (
      <div aria-hidden="true" className="mx-auto w-full max-w-[320px]">
        <div className="rotate-[-1.4deg] rounded-[.5rem_1.4rem_.6rem_1.3rem] border border-[#b8893f]/[.30] bg-[#fdfaf1] p-6 shadow-[7px_8px_0_rgba(62,143,139,.12)]">
          <div className="h-1.5 w-12 bg-[#c8a86a]" /><div className="mt-5 space-y-2.5"><div className="h-2 w-[90%] bg-[#1c2b20]/[.13]" /><div className="h-2 w-[74%] bg-[#1c2b20]/[.13]" /><div className="h-2 w-[40%] bg-[#1c2b20]/[.09]" /></div>
        </div>
        <div className="ml-10 mt-4 w-[66%] rotate-[1.8deg] rounded-[1.2rem_.4rem_1.3rem_.5rem] border border-[#b8893f]/[.22] bg-[#fdfaf1]/[.70] p-4"><div className="h-2 w-[70%] bg-[#1c2b20]/[.09]" /></div>
      </div>
    );
  }
  if (kind === 'choice') {
    return (
      <div aria-hidden="true" className="mx-auto grid w-full max-w-[320px]">
        <div className="rounded-[1.2rem_.4rem_1.3rem_.5rem] border-l-2 border-[#3E8F8B] bg-[#fdfaf1] px-5 py-5 shadow-[7px_8px_0_rgba(62,143,139,.12)]"><div className="h-1.5 w-10 bg-[#3E8F8B]" /><div className="mt-3.5 h-2.5 w-[76%] bg-[#1c2b20]/[.18]" /></div>
        <div className="border-b border-[#b8893f]/[.20] px-5 py-5"><div className="h-2 w-[58%] bg-[#1c2b20]/[.08]" /></div>
        <div className="px-5 py-5"><div className="h-2 w-[44%] bg-[#1c2b20]/[.06]" /></div>
      </div>
    );
  }
  return (
    <div aria-hidden="true" className="relative mx-auto h-[200px] w-full max-w-[320px]">
      <div className="absolute left-0 top-0 w-[72%] rounded-[1.2rem_.4rem_1.3rem_.5rem] border border-[#b8893f]/[.18] bg-[#fdfaf1]/[.45] p-4"><div className="h-2 w-[50%] bg-[#1c2b20]/[.07]" /></div>
      <div className="absolute left-9 top-11 w-[72%] rounded-[1.2rem_.4rem_1.3rem_.5rem] border border-[#b8893f]/[.24] bg-[#fdfaf1]/[.72] p-4"><div className="h-2 w-[62%] bg-[#1c2b20]/[.10]" /></div>
      <div className="absolute left-[4.5rem] top-[5.5rem] w-[72%] rounded-[1.2rem_.4rem_1.3rem_.5rem] border border-[#b8893f]/[.30] bg-[#fdfaf1] p-4 shadow-[7px_8px_0_rgba(62,143,139,.12)]"><div className="h-1.5 w-10 bg-[#c8a86a]" /><div className="mt-3 h-2.5 w-[78%] bg-[#1c2b20]/[.18]" /></div>
    </div>
  );
}

function ExampleContent() {
  const holdings = [
    ['Dein Satz', '„Du stehst an der Schwelle zu einer neuen Identität.“ — er bleibt ein wiedererkennbarer Ton, egal wo jemand ankommt.'],
    ['Deine drei Felder', 'Bewusstseinstraining, Identitätsshift, Energiearbeit. Sie gehören zusammen und müssen nicht an jedem Ort neu erklärt werden.'],
    ['Deine drei Wege', 'Orakellegung, Skool-Mitgliedschaft, 1:1 Mentoring. Jeder Weg kann seinen eigenen Kontext behalten.'],
    ['Deine Stimmen', 'Was Menschen dir nach der Arbeit geschrieben haben, muss nicht verstreut in Chats liegen bleiben.'],
    ['Deine kleinen Portale', 'Auch das, was noch unfertig ist, darf einen Platz haben und später wiederkommen.'],
  ];

  return (
    <>
      <div className="mt-4 grid gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-start lg:gap-16">
        <article className="border border-[#b8893f]/[.34] bg-[#fdfaf1]">
          <div className="flex items-center justify-between gap-4 border-b border-[#b8893f]/[.34] px-6 py-4"><Wordmark className="whitespace-nowrap text-[13px]" /><span className="text-[10px] uppercase tracking-[.16em] text-[#5f6e63]">Dein Auftritt</span></div>
          <div className="relative isolate overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-20">
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(176deg,#7f9660_0%,#5d7a45_44%,#46603a_100%)]" />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_12%,rgba(240,244,222,.34),transparent_62%),radial-gradient(ellipse_at_50%_112%,rgba(28,43,32,.45),transparent_58%)]" />
            <div className="relative">
              <p className="text-[9px] uppercase tracking-[.19em] text-[#f2eeda]/80">{TAGLINE}</p>
              <h3 className="mx-auto mt-8 max-w-xl font-serif text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.12] text-[#fbf8ee]">Du stehst an der Schwelle zu einer neuen Identität.</h3>
              <div className="mt-10 grid justify-items-center gap-5">
                <span className="border-b border-[#d9b877] pb-1.5 text-[12px] uppercase tracking-[.19em] text-[#fbf8ee]">Angebote entdecken</span>
                <span className="border-b border-[#fbf8ee]/45 pb-1.5 text-[12px] uppercase tracking-[.19em] text-[#fbf8ee]/80">Identitätsshift Guide</span>
              </div>
            </div>
          </div>
          <p className="border-t border-[#b8893f]/[.34] px-6 py-4 text-[12px] leading-5 text-[#5f6e63]">Dein eigenes Bild gehört hier hinein. Bis dahin zeigen wir nur die Stimmung, nicht einen erfundenen Ersatz.</p>
        </article>

        <div>
          <p className="text-[10px] uppercase tracking-[.20em] text-[#8c6224]">Was deine World halten würde</p>
          <dl className="mt-6">
            {holdings.map(([q, a]) => (
              <div key={q} className="border-b border-[#b8893f]/[.34] py-7">
                <dt className="font-serif text-[clamp(1.3rem,2.6vw,1.6rem)] font-light leading-snug">{q}</dt>
                <dd className="mt-3 text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="py-16 text-center sm:py-20">
        <p className="mx-auto max-w-3xl font-serif text-[clamp(1.55rem,3.4vw,2.2rem)] font-light leading-[1.24]">Nichts davon müsste neu erfunden werden. <Marker>Es müsste nur zusammenbleiben.</Marker></p>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">Eine World ist der Ort, an dem dein Bild, dein Satz, deine Wege und die Gespräche darüber denselben Zusammenhang behalten — auch in einem Jahr, wenn wieder etwas Neues dazukommt.</p>
      </div>
    </>
  );
}

function DecisionSection({
  decision,
  saving,
  error,
  onChoose,
}: {
  decision: Decision | null;
  saving: boolean;
  error: boolean;
  onChoose: (value: Decision) => void;
}) {
  return (
    <div className="py-16 text-center sm:py-24">
      {decision ? (
        <>
          <p className="text-[10px] uppercase tracking-[.20em] text-[#8c6224]">Deine Antwort ist notiert</p>
          <h2 className="mx-auto mt-6 max-w-[22ch] font-serif text-[clamp(1.85rem,4.2vw,2.8rem)] font-light leading-[1.18]">{decision === 'yes' ? 'Dann bauen wir von hier weiter.' : 'Dann ändern wir zuerst die Richtung.'}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">Deine World erinnert sich an diese Entscheidung. Für den nächsten Schritt reicht eine kurze Nachricht – wir müssen daraus heute noch kein großes Projekt machen.</p>
        </>
      ) : (
        <>
          <p className="text-[10px] uppercase tracking-[.20em] text-[#8c6224]">Eine letzte Frage</p>
          <h2 className="mx-auto mt-6 max-w-[25ch] font-serif text-[clamp(1.85rem,4.2vw,2.8rem)] font-light leading-[1.18]">Fühlt sich das nach einer World an, die dir wirklich etwas abnehmen könnte – ohne dir Kontrolle zu nehmen?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">Nicht: Ist schon alles perfekt? Sondern nur: Ist die Richtung interessant genug, um daraus gemeinsam einen echten kleinen nächsten Schritt zu machen?</p>

          <div className="mx-auto mt-12 max-w-3xl border-y border-[#b8893f]/[.34]">
            <button
              type="button"
              disabled={saving}
              onClick={() => onChoose('yes')}
              className="group w-full py-7 text-left transition disabled:cursor-wait disabled:opacity-50 sm:py-8"
            >
              <span className="text-[10px] uppercase tracking-[.20em] text-[#8c6224]">JA — WEITERDENKEN</span>
              <span className="mt-3 flex items-end justify-between gap-6">
                <span className="font-serif text-[clamp(1.5rem,3.3vw,2.15rem)] font-light leading-tight">Das möchte ich gemeinsam weiterbauen.</span>
                <span aria-hidden="true" className="mb-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#3E8F8B] transition group-hover:scale-125" />
              </span>
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => onChoose('change')}
              className="w-full border-t border-[#b8893f]/[.24] py-6 text-left text-[11px] uppercase tracking-[.17em] text-[#5f6e63] transition hover:text-[#1c2b20] disabled:cursor-wait disabled:opacity-50"
            >
              Die Richtung braucht noch etwas anderes
            </button>
          </div>
        </>
      )}

      {error ? <p role="status" className="mt-8 text-[14px] text-[#8c4436]">Konnte gerade nicht gespeichert werden. Bitte nochmal versuchen.</p> : null}
    </div>
  );
}

function ChapterBridge({ number, title, href }: { number: string; title: string; href: string }) {
  return (
    <div className="mt-16 border-t border-[#b8893f]/[.34] pt-7 sm:mt-20">
      <a href={href} className="group flex items-end justify-between gap-6">
        <span>
          <span className="font-mono text-[9px] font-bold tracking-[.18em] text-[#2c6b68]">KAPITEL {number}</span>
          <span className="mt-2 block font-serif text-[clamp(1.35rem,2.8vw,1.8rem)] font-light">{title}</span>
        </span>
        <span aria-hidden="true" className="mb-1 block h-px w-12 bg-[#b8893f] transition group-hover:w-20" />
      </a>
    </div>
  );
}

function SectionOpener({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="text-center">
      <p className="text-[10px] uppercase tracking-[.20em] text-[#8c6224]">{eyebrow}</p>
      <h2 className="mx-auto mt-6 max-w-[20ch] font-serif text-[clamp(1.95rem,4.6vw,3rem)] font-light leading-[1.16]">{title}</h2>
      <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">{body}</p>
    </header>
  );
}

function LightWorldAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8f4e9_0%,#eef0e2_100%)]" />
      <div className="world-haze absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(255,255,255,.8),transparent_30%),radial-gradient(circle_at_10%_84%,rgba(120,143,110,.12),transparent_33%),radial-gradient(circle_at_58%_62%,rgba(62,143,139,.07),transparent_28%)]" />
      <div className="world-breathe absolute bottom-[-15%] left-[-8%] h-[46%] w-[44%] rounded-[50%] bg-[radial-gradient(circle,rgba(95,127,98,.1),transparent_68%)] blur-2xl" />
      <div className="world-grain absolute inset-0" />

      <style>{`
        .world-haze { animation: worldHaze 14s ease-in-out infinite alternate; }
        .world-breathe { animation: worldBreathe 22s ease-in-out infinite alternate; }
        .world-grain {
          opacity: .1;
          mix-blend-mode: multiply;
          background-image:
            radial-gradient(circle at 20% 30%, rgba(28,43,32,.12) 0 .45px, transparent .55px),
            radial-gradient(circle at 70% 64%, rgba(28,43,32,.09) 0 .4px, transparent .5px);
          background-size: 4px 4px, 5px 5px;
        }
        @keyframes worldHaze { from { opacity: .72; transform: translate3d(-1%, .4%, 0); } to { opacity: 1; transform: translate3d(1.2%, -.6%, 0); } }
        @keyframes worldBreathe { from { transform: scale(1) translate3d(-.3%, .15%, 0); } to { transform: scale(1.06) translate3d(.45%, -.18%, 0); } }
        @media (prefers-reduced-motion: reduce) { .world-haze, .world-breathe { animation: none !important; } }
      `}</style>
    </div>
  );
}
