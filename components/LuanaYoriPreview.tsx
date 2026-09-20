'use client';

import { useRef, useState } from 'react';
import YoriMark from '@/components/YoriMark';
import type { ClientWorldConfig } from '@/lib/client-world';

type Decision = 'yes' | 'change';
type RoomId = 'orientierung' | 'world' | 'beispiel' | 'weiter';

type Props = {
  world: ClientWorldConfig;
  initialDecision?: Decision | null;
};

/** Ihre eigene Zeile, unveraendert - sie steht so auf ihrer Seite. */
const TAGLINE = 'Bewusstseinstraining · Identitätsshift · Energiearbeit';

const ROOMS: Array<{ id: RoomId; label: string; hint: string }> = [
  { id: 'orientierung', label: 'Ankommen', hint: 'Was ist das hier?' },
  { id: 'world', label: 'Deine World', hint: 'Was sie für dich hält' },
  { id: 'beispiel', label: 'Ein Beispiel', hint: 'Wie daraus Arbeit wird' },
  { id: 'weiter', label: 'Weiter', hint: 'Fragen & nächster Schritt' },
];

const WORLD_QA = [
  {
    q: 'Was ist eine eigene World?',
    a: 'Ein persönlicher Raum hinter deinem Business. Nicht noch ein Kanal, sondern ein Ort, an dem Auftritt, Gedanken, Inhalte und Entscheidungen ihren Zusammenhang behalten.',
  },
  {
    q: 'Was macht YORI darin?',
    a: 'YORI ist die ruhige Logik des Raums. Es legt nicht alles gleichzeitig vor dich, sondern bringt zurück auf den Tisch, was gerade wirklich wichtig ist.',
  },
  {
    q: 'Was hätte ich konkret davon?',
    a: 'Weniger neu zusammensuchen, weniger Kontext wiederholen und klarer sehen, was als Nächstes zählt. Deine World soll Arbeit leichter machen, nicht mehr davon erzeugen.',
  },
  {
    q: 'Ist das einfach eine neue Website?',
    a: 'Nein. Die Website kann ein erster Faden sein. Später könnten auch Ideen, Content, Kooperationen oder Termine denselben Kontext teilen – wenn es für dich sinnvoll ist.',
  },
];

const WORLD_OBJECTS = [
  {
    eyebrow: 'Auftritt',
    title: 'Was du nach außen zeigst.',
    body: 'Website, Angebote und Sprache können zusammen gedacht werden, ohne dass deine eigene Handschrift verloren geht.',
    object: 'page' as const,
  },
  {
    eyebrow: 'Gedanken',
    title: 'Was noch unfertig sein darf.',
    body: 'Eine Idee muss nicht sofort Post, Projekt oder Aufgabe werden. Sie darf liegen bleiben und später mit ihrem Zusammenhang wieder auftauchen.',
    object: 'note' as const,
  },
  {
    eyebrow: 'Entscheidungen',
    title: 'Was deine Aufmerksamkeit braucht.',
    body: 'YORI soll nicht alles anzeigen. Es soll unterscheiden, was gerade wirklich eine Entscheidung von dir braucht – und was warten darf.',
    object: 'choice' as const,
  },
  {
    eyebrow: 'Erinnerung',
    title: 'Was nicht wieder bei null beginnen soll.',
    body: 'Wenn etwas später wieder relevant wird, kommt nicht nur der Punkt zurück, sondern auch der Kontext, aus dem er entstanden ist.',
    object: 'memory' as const,
  },
];

const NEXT_QA = [
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
    a: 'Wir würden einen kleinen Bereich wirklich gemeinsam machen – zum Beispiel deinen Auftritt – und daran prüfen, ob sich die World für dich tatsächlich hilfreich anfühlt.',
  },
];

export default function LuanaYoriPreview({ world, initialDecision = null }: Props) {
  const [room, setRoom] = useState<RoomId>(initialDecision ? 'weiter' : 'orientierung');
  const [decision, setDecision] = useState<Decision | null>(initialDecision);
  const [savingDecision, setSavingDecision] = useState(false);
  const [decisionError, setDecisionError] = useState(false);
  const explainRef = useRef<HTMLDivElement>(null);

  async function chooseDecision(value: Decision) {
    if (savingDecision) return false;

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
      return true;
    } catch {
      setDecisionError(true);
      return false;
    } finally {
      setSavingDecision(false);
    }
  }

  function goTo(next: RoomId) {
    setRoom(next);
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.body.scrollTo({ top: 0, behavior: 'auto' });
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    }
  }

  return (
    <main className="min-h-[100svh] bg-[#f7f2e6] text-[#1c2b20]">
      <div className="relative min-h-[100svh]">
        <LightWorldAmbient />

        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-[#b8893f]/[.3] bg-[#f3eddd]/[.72] px-6 pb-7 pt-8 backdrop-blur-[22px] lg:flex">
          <button type="button" onClick={() => goTo('orientierung')} className="pb-10 text-left">
            <span className="flex items-center gap-2.5">
              <YoriMark className="h-8 w-8 shrink-0 text-[#25382a]" title="YORI" />
              <Wordmark className="whitespace-nowrap text-[17px]" />
            </span>
            <span className="mt-2.5 block text-[9px] uppercase leading-4 tracking-[.19em] text-[#5f6e63]">
              {TAGLINE}
            </span>
          </button>

          <nav className="grid" aria-label="Luana World Bereiche">
            {ROOMS.map(({ id, label, hint }) => (
              <button
                key={id}
                type="button"
                onClick={() => goTo(id)}
                aria-current={room === id ? 'page' : undefined}
                className={`grid min-h-[58px] content-center border-l-2 py-2 pl-4 text-left transition ${
                  room === id
                    ? 'border-[#b8893f] text-[#1c2b20]'
                    : 'border-transparent text-[#5f6e63] hover:border-[#b8893f]/[.4] hover:text-[#1c2b20]'
                }`}
              >
                <strong className="text-[11px] font-medium uppercase tracking-[.17em]">{label}</strong>
                <small className="mt-1 text-[11px] leading-4 text-[#5f6e63]">{hint}</small>
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-[#b8893f]/[.3] pt-6">
            <p className="text-[9px] uppercase tracking-[.19em] text-[#8c6224]">DEINE WORLD · YORI</p>
            <p className="mt-3 text-[11px] leading-5 text-[#5f6e63]">
              Ein persönlicher Entwurf für {world.clientName} — noch kein fertiges Produkt.
            </p>
          </div>
        </aside>

        <section className="relative z-10 min-h-[100svh] lg:pl-[248px]">
          {/* Kopfzeile wie auf ihrer Seite: Markenzug, Zeile darunter, Goldlinie. */}
          <header className="border-b border-[#b8893f]/[.34]">
            <div className="mx-auto w-[calc(100%-40px)] max-w-[1180px] py-4 lg:w-[calc(100%-96px)]">
              <div className="flex items-start justify-between gap-3">
                {/* Markenzug bleibt einzeilig - umgebrochen sieht er nicht mehr
                    nach ihrem Kopf aus, sondern nach zwei Woertern. */}
                <span className="flex items-center gap-2.5 lg:hidden">
                  <YoriMark className="h-7 w-7 shrink-0 text-[#25382a]" title="YORI" />
                  <Wordmark className="whitespace-nowrap text-[14px]" />
                </span>
                <p className="ml-auto shrink-0 pt-1 text-[9px] uppercase tracking-[.16em] text-[#5f6e63] sm:text-[10px] sm:tracking-[.18em]">
                  Persönlicher Entwurf
                </p>
              </div>
              <p className="mt-2.5 text-[8px] uppercase tracking-[.15em] text-[#5f6e63] lg:hidden">
                {TAGLINE}
              </p>
            </div>
          </header>

          <div
            key={room}
            className="luana-room mx-auto w-[calc(100%-40px)] max-w-[1180px] pb-[116px] pt-4 lg:w-[calc(100%-96px)] lg:pb-24 lg:pt-8"
          >
            {room === 'orientierung' ? (
              <OrientationRoom
                clientName={world.clientName}
                explainRef={explainRef}
                onExplain={() =>
                  explainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                onExplore={() => goTo('world')}
                onExample={() => goTo('beispiel')}
                onDecide={() => goTo('weiter')}
              />
            ) : room === 'world' ? (
              <WorldRoom onExample={() => goTo('beispiel')} />
            ) : room === 'beispiel' ? (
              <ExampleRoom onContinue={() => goTo('weiter')} />
            ) : (
              <NextRoom
                decision={decision}
                saving={savingDecision}
                error={decisionError}
                onChoose={(value) => {
                  void chooseDecision(value);
                }}
              />
            )}
          </div>
        </section>

        <nav
          className="fixed inset-x-0 bottom-0 z-50 border-t border-[#b8893f]/[.34] bg-[#f7f2e6]/[.95] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
          aria-label="Luana World mobile Bereiche"
        >
          <div className="flex">
            {ROOMS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => goTo(id)}
                aria-current={room === id ? 'page' : undefined}
                className={`min-h-[56px] flex-1 border-t-2 px-1 text-[10px] uppercase tracking-[.13em] transition ${
                  room === id
                    ? 'border-[#b8893f] font-medium text-[#1c2b20]'
                    : 'border-transparent text-[#5f6e63]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      <style>{`
        .luana-room { animation: luana-room-in .5s cubic-bezier(.22,.72,.22,1) both; }
        @keyframes luana-room-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .luana-room { animation: none !important; }
          html { scroll-behavior: auto !important; }
        }
      `}</style>
    </main>
  );
}

/** LUANA in Tinte, LUMINA in Messing - genau wie auf ihrer Seite. */
function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`block font-serif font-medium tracking-[.14em] text-[#1c2b20] ${className}`}>
      LUANA <span className="text-[#a8752c]">LUMINA</span>
    </span>
  );
}

/**
 * Ihre Seite kennt keinen gefuellten Knopf - eine Handlung ist dort
 * Versalientext mit goldener Unterlinie. Genau das hier, damit die World in
 * ihrer Sprache spricht statt in unserer.
 */
function TextCta({
  children,
  onClick,
  disabled,
  tone = 'ink',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tone?: 'ink' | 'muted';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-[48px] items-end border-b pb-1.5 text-[12px] uppercase tracking-[.19em] transition disabled:cursor-wait disabled:opacity-50 ${
        tone === 'ink'
          ? 'border-[#b8893f] text-[#1c2b20] hover:border-[#8c6224]'
          : 'border-[#5f6e63]/40 text-[#5f6e63] hover:border-[#5f6e63] hover:text-[#1c2b20]'
      }`}
    >
      {children}
    </button>
  );
}

/** Ihr Textmarker: warmer Sandblock hinter einer Kernaussage. */
function Marker({ children }: { children: React.ReactNode }) {
  return <mark className="bg-[#e9dfc2] px-1 text-[#1c2b20]">{children}</mark>;
}

function Rule() {
  return <div aria-hidden="true" className="h-px w-full bg-[#b8893f]/[.34]" />;
}

function OrientationRoom({
  clientName,
  explainRef,
  onExplain,
  onExplore,
  onExample,
  onDecide,
}: {
  clientName: string;
  explainRef: React.RefObject<HTMLDivElement>;
  onExplain: () => void;
  onExplore: () => void;
  onExample: () => void;
  onDecide: () => void;
}) {
  return (
    <section>
      <div className="grid gap-12 pt-10 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16 lg:pt-16">
        <div>
          <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">
            Ein erster Blick in etwas, das dir gehören könnte
          </p>
          <h1 className="mt-6 max-w-[15ch] font-serif text-[clamp(2.4rem,6.8vw,4.4rem)] font-light leading-[1.06] tracking-[-.01em]">
            Was wäre, wenn dein Business einen eigenen ruhigen Raum hätte?
          </h1>
          <p className="mt-7 max-w-xl text-[16px] leading-[1.8] text-[#55655a]">
            Einen Ort, der nicht nur zeigt, was du anbietest – sondern mit dir zusammenhält, was du denkst, entscheidest und als Nächstes aufbauen willst.
          </p>

          <div className="mt-8">
            <TextCta onClick={onExplain}>Meine World entdecken</TextCta>
          </div>

          <p className="mt-7 max-w-md text-[13px] leading-6 text-[#5f6e63]">
            Ein persönlicher Entwurf, kein fertiges Produkt. Gebaut, damit du siehst, was wir meinen – statt es dir zu beschreiben.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-8 -top-10 h-[62%] w-[74%] rounded-full bg-[radial-gradient(circle_at_38%_34%,rgba(255,255,255,.92),rgba(196,208,182,.3)_58%,transparent_74%)] blur-2xl lg:-left-16 lg:h-[70%] lg:w-[80%]"
          />
          <div className="relative border-y border-[#b8893f]/[.34] py-9">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">Deine World könnte</p>
            <p className="mt-4 font-serif text-[clamp(1.7rem,3.6vw,2.3rem)] font-light leading-tight">
              erinnern, ordnen, verbinden.
            </p>
            <p className="mt-5 text-[14px] leading-7 text-[#5f6e63]">
              Ohne aus deinem Business ein weiteres Dashboard zu machen.
            </p>
          </div>

          <p className="mt-8 font-serif text-[19px] font-light leading-relaxed text-[#5f6e63]">
            Heute — nur das, was gerade zählt.
          </p>
        </div>
      </div>

      <div ref={explainRef} className="scroll-mt-4 pt-20 lg:pt-28">
        <SectionOpener
          eyebrow="Ankommen"
          title={`Hallo ${clientName}. Was ist das hier eigentlich?`}
          body="Wir haben das für dich gebaut, weil wir gern mit dir arbeiten würden – und weil sich so ein Raum schwer beschreiben lässt, solange man ihn nicht sieht. Deine Website ist dabei nur ein möglicher Anfang, nicht der Mittelpunkt."
        />

        <dl className="mt-4 grid lg:grid-cols-2 lg:gap-x-16">
          {WORLD_QA.map((item, index) => (
            <div key={item.q} className="border-b border-[#b8893f]/[.34] py-9">
              <span className="text-[10px] tracking-[.2em] text-[#8c6224]">0{index + 1}</span>
              <dt className="mt-4 font-serif text-[clamp(1.4rem,3vw,1.75rem)] font-light leading-snug">
                {item.q}
              </dt>
              <dd className="mt-4 max-w-xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16">
          <p className="text-center text-[10px] uppercase tracking-[.2em] text-[#8c6224]">Was noch kommt</p>
          <div className="mt-8 grid gap-0 sm:grid-cols-3 sm:gap-x-12">
            {[
              { title: 'Deine World', body: 'Die vier Dinge, die so ein Raum für dich zusammenhalten würde.', go: onExplore },
              { title: 'Ein Beispiel', body: 'Ein kleiner Ausschnitt deines Auftritts, damit es nicht abstrakt bleibt.', go: onExample },
              { title: 'Weiter', body: 'Was es praktisch bedeuten würde – und eine einzige Frage an dich.', go: onDecide },
            ].map(({ title, body, go }) => (
              <button
                key={title}
                type="button"
                onClick={go}
                className="border-b border-[#b8893f]/[.34] py-7 text-left transition hover:text-[#1c2b20] sm:border-b-0 sm:border-t"
              >
                <p className="font-serif text-[21px] font-light">{title}</p>
                <p className="mt-3 text-[15px] leading-7 text-[#55655a]">{body}</p>
              </button>
            ))}
          </div>
          <div className="mt-10 text-center">
            <TextCta onClick={onExplore}>Weiter zu deiner World</TextCta>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorldRoom({ onExample }: { onExample: () => void }) {
  return (
    <section>
      <SectionOpener
        eyebrow="Deine World"
        title="Nicht mehr Oberfläche. Mehr Zusammenhang."
        body="YORI soll nicht vor dir stehen. Es soll im Hintergrund dafür sorgen, dass Dinge, die zu deinem Business gehören, nicht voneinander getrennt herumliegen."
      />

      <div className="mt-4">
        {WORLD_OBJECTS.map(({ eyebrow, title, body, object }, index) => (
          <article key={eyebrow} className="border-b border-[#b8893f]/[.34] py-14 sm:py-20">
            <div
              className={`grid items-center gap-10 lg:gap-16 ${
                index % 2 === 1 ? 'lg:grid-cols-[.85fr_1.15fr]' : 'lg:grid-cols-[1.15fr_.85fr]'
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">{eyebrow}</p>
                <h2 className="mt-4 max-w-[16ch] font-serif text-[clamp(1.7rem,3.6vw,2.5rem)] font-light leading-[1.14]">
                  {title}
                </h2>
                <p className="mt-6 max-w-lg text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">{body}</p>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                <WorldObject kind={object} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="py-16 text-center sm:py-20">
        <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">Der eigentliche Gedanke</p>
        <p className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(1.75rem,3.8vw,2.6rem)] font-light leading-[1.22]">
          Deine World soll nicht mehr von dir verlangen.{' '}
          <Marker>Sie soll weniger verlieren lassen.</Marker>
        </p>
        <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
          Weniger Kontext, der verschwindet. Weniger Ideen, die wieder neu erklärt werden müssen. Weniger Entscheidungen, die zwischen fünf Tools hängen bleiben.
        </p>
        <div className="mt-10">
          <TextCta onClick={onExample}>Zeig mir das an etwas Konkretem</TextCta>
        </div>
      </div>
    </section>
  );
}

function WorldObject({ kind }: { kind: 'page' | 'note' | 'choice' | 'memory' }) {
  if (kind === 'page') {
    return (
      <div aria-hidden="true" className="mx-auto w-full max-w-[320px] border border-[#b8893f]/[.3] bg-[#fdfaf1] p-6">
        <div className="h-1.5 w-16 bg-[#c8a86a]" />
        <div className="mt-5 h-2.5 w-[88%] bg-[#1c2b20]/[.16]" />
        <div className="mt-2 h-2.5 w-[62%] bg-[#1c2b20]/[.16]" />
        <div className="mt-6 h-px w-28 bg-[#b8893f]" />
        <div className="mt-6 h-px w-full bg-[#b8893f]/[.28]" />
        <div className="mt-5 h-1.5 w-[45%] bg-[#1c2b20]/[.10]" />
      </div>
    );
  }

  if (kind === 'note') {
    return (
      <div aria-hidden="true" className="mx-auto w-full max-w-[320px]">
        <div className="rotate-[-1.4deg] border border-[#b8893f]/[.3] bg-[#fdfaf1] p-6">
          <div className="h-1.5 w-12 bg-[#c8a86a]" />
          <div className="mt-5 space-y-2.5">
            <div className="h-2 w-[90%] bg-[#1c2b20]/[.13]" />
            <div className="h-2 w-[74%] bg-[#1c2b20]/[.13]" />
            <div className="h-2 w-[40%] bg-[#1c2b20]/[.09]" />
          </div>
        </div>
        <div className="mt-4 ml-10 w-[66%] rotate-[1.8deg] border border-[#b8893f]/[.22] bg-[#fdfaf1]/[.7] p-4">
          <div className="h-2 w-[70%] bg-[#1c2b20]/[.09]" />
        </div>
      </div>
    );
  }

  if (kind === 'choice') {
    return (
      <div aria-hidden="true" className="mx-auto grid w-full max-w-[320px]">
        <div className="border-l-2 border-[#b8893f] bg-[#fdfaf1] px-5 py-5">
          <div className="h-1.5 w-10 bg-[#c8a86a]" />
          <div className="mt-3.5 h-2.5 w-[76%] bg-[#1c2b20]/[.18]" />
        </div>
        <div className="border-b border-[#b8893f]/[.2] px-5 py-5">
          <div className="h-2 w-[58%] bg-[#1c2b20]/[.08]" />
        </div>
        <div className="px-5 py-5">
          <div className="h-2 w-[44%] bg-[#1c2b20]/[.06]" />
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="relative mx-auto h-[200px] w-full max-w-[320px]">
      <div className="absolute left-0 top-0 w-[72%] border border-[#b8893f]/[.18] bg-[#fdfaf1]/[.45] p-4">
        <div className="h-2 w-[50%] bg-[#1c2b20]/[.07]" />
      </div>
      <div className="absolute left-9 top-11 w-[72%] border border-[#b8893f]/[.24] bg-[#fdfaf1]/[.72] p-4">
        <div className="h-2 w-[62%] bg-[#1c2b20]/[.10]" />
      </div>
      <div className="absolute left-[4.5rem] top-[5.5rem] w-[72%] border border-[#b8893f]/[.3] bg-[#fdfaf1] p-4">
        <div className="h-1.5 w-10 bg-[#c8a86a]" />
        <div className="mt-3 h-2.5 w-[78%] bg-[#1c2b20]/[.18]" />
      </div>
    </div>
  );
}

function ExampleRoom({ onContinue }: { onContinue: () => void }) {
  return (
    <section>
      <SectionOpener
        eyebrow="Ein Beispiel"
        title="Ein kleiner Ausschnitt, damit es nicht abstrakt bleibt."
        body="Wir nehmen einen Teil deines Auftritts, den du schon hast, und zeigen daran, wie YORI aus etwas Vorhandenem einen nächsten Gedanken machen könnte."
      />

      <div className="mt-4 grid gap-12 lg:grid-cols-[.86fr_1.14fr] lg:items-start lg:gap-16">
        <div>
          <article className="border-b border-[#b8893f]/[.34] py-9">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">Was schon trägt</p>
            <h2 className="mt-4 font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-light leading-snug">
              Deine starke Schwelle.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
              „Du stehst an der Schwelle zu einer neuen Identität.“ trägt bereits Haltung. Eine gute World muss nicht alles verändern – sie sollte erkennen, was schon trägt.
            </p>
          </article>

          <article className="border-b border-[#b8893f]/[.34] py-9">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">Was YORI daraus machen könnte</p>
            <h2 className="mt-4 font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-light leading-snug">
              Einen Gedanken klarer führen.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
              Wenn zwei Wege gleichzeitig Aufmerksamkeit wollen, könnte YORI einen davon zuerst führen lassen – und den anderen bewusst leiser halten. Nicht weil etwas falsch ist, sondern damit deine Wirkung schneller ankommt.
            </p>
          </article>
        </div>

        {/*
          Der Ausschnitt spricht jetzt ihre Handlungssprache: Versalien mit
          Goldlinie statt gefuelltem Knopf. So steht es auf ihrer Seite -
          vorher zeigte unser Beispiel eine Schaltflaeche, die es dort nie gab.
        */}
        <article className="border border-[#b8893f]/[.34] bg-[#fdfaf1]">
          <div className="flex items-center justify-between gap-4 border-b border-[#b8893f]/[.34] px-6 py-4">
            <Wordmark className="whitespace-nowrap text-[13px]" />
            <span className="text-[10px] uppercase tracking-[.16em] text-[#5f6e63]">So könnte es aussehen</span>
          </div>
          <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
            <p className="text-[9px] uppercase tracking-[.19em] text-[#5f6e63]">{TAGLINE}</p>
            <h3 className="mx-auto mt-8 max-w-xl font-serif text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.12]">
              Du stehst an der Schwelle zu einer neuen Identität.
            </h3>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.8] text-[#55655a]">
              Ein Satz führt. Ein Weg ist sichtbar. Der zweite bleibt da, ohne mit dem ersten zu konkurrieren.
            </p>
            <div className="mt-10 grid justify-items-center gap-5">
              <span className="border-b border-[#b8893f] pb-1.5 text-[12px] uppercase tracking-[.19em] text-[#1c2b20]">
                Angebote entdecken
              </span>
              <span className="border-b border-[#5f6e63]/40 pb-1.5 text-[12px] uppercase tracking-[.19em] text-[#5f6e63]">
                Identitätsshift Guide
              </span>
            </div>
          </div>
        </article>
      </div>

      <div className="py-16 text-center sm:py-20">
        <p className="mx-auto max-w-3xl font-serif text-[clamp(1.55rem,3.4vw,2.2rem)] font-light leading-[1.24]">
          Das Entscheidende ist nicht dieser eine Website-Punkt.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
          Entscheidend wäre, dass deine World später versteht, warum etwas wichtig war, was daraus entstanden ist und wann es wieder auf deinen Tisch gehört.
        </p>
        <div className="mt-10">
          <TextCta onClick={onContinue}>Was würde das für mich bedeuten?</TextCta>
        </div>
      </div>
    </section>
  );
}

function NextRoom({
  decision,
  saving,
  error,
  onChoose,
}: {
  decision: Decision | null;
  saving: boolean;
  error: boolean;
  onChoose: (value: Decision) => void | Promise<void>;
}) {
  return (
    <section>
      <SectionOpener
        eyebrow="Weiter"
        title="Was würde das für dich praktisch bedeuten?"
        body="Noch bevor irgendetwas gebaut wird, sind diese Fragen wichtiger als weitere Features."
      />

      <dl className="mt-4 grid lg:grid-cols-3 lg:gap-x-14">
        {NEXT_QA.map((item) => (
          <div key={item.q} className="border-b border-[#b8893f]/[.34] py-9">
            <dt className="font-serif text-[clamp(1.35rem,2.8vw,1.7rem)] font-light leading-snug">{item.q}</dt>
            <dd className="mt-4 text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">{item.a}</dd>
          </div>
        ))}
      </dl>

      <div className="py-16 text-center sm:py-24">
        {decision ? (
          <>
            <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">Deine Antwort ist notiert</p>
            <h2 className="mx-auto mt-6 max-w-[22ch] font-serif text-[clamp(1.85rem,4.2vw,2.8rem)] font-light leading-[1.18]">
              {decision === 'yes'
                ? 'Dann bauen wir von hier weiter.'
                : 'Dann ändern wir zuerst die Richtung.'}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
              Deine World erinnert sich an diese Entscheidung. Für den nächsten Schritt reicht eine kurze Nachricht – wir müssen daraus heute noch kein großes Projekt machen.
            </p>
          </>
        ) : (
          <>
            <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">Eine letzte Frage</p>
            <h2 className="mx-auto mt-6 max-w-[24ch] font-serif text-[clamp(1.85rem,4.2vw,2.8rem)] font-light leading-[1.18]">
              Fühlt sich diese Idee grundsätzlich nach etwas an, das dir Arbeit abnehmen könnte?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">
              Nicht: Ist schon alles perfekt? Sondern nur: Ist die Richtung interessant genug, um daraus einen echten kleinen nächsten Schritt zu machen?
            </p>

            {/*
              Das einzige gefuellte Element der ganzen Seite. Ihre Seite kennt
              keine Knoepfe - aber dieser eine Moment ist der Zweck des Stuecks,
              und eine reine Textzeile verliert ihn zu leicht.
            */}
            <div className="mt-11 grid justify-items-center gap-7">
              <button
                type="button"
                disabled={saving}
                onClick={() => void onChoose('yes')}
                className="min-h-[58px] bg-[#1c2b20] px-10 text-[12px] uppercase tracking-[.19em] text-[#f7f2e6] transition hover:bg-[#25382a] disabled:cursor-wait disabled:opacity-60"
              >
                Ja, das möchte ich weiterdenken
              </button>
              <TextCta tone="muted" disabled={saving} onClick={() => void onChoose('change')}>
                Die Richtung braucht noch etwas anderes
              </TextCta>
            </div>
          </>
        )}

        {error ? (
          <p role="status" className="mt-8 text-[14px] text-[#8c4436]">
            Konnte gerade nicht gespeichert werden. Bitte nochmal versuchen.
          </p>
        ) : null}
      </div>
    </section>
  );
}

/** Ihr Abschnitts-Rhythmus: goldene Versalien mittig, Serif mittig, dann Linie. */
function SectionOpener({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <header className="pt-10 text-center lg:pt-14">
      <p className="text-[10px] uppercase tracking-[.2em] text-[#8c6224]">{eyebrow}</p>
      <h1 className="mx-auto mt-6 max-w-[20ch] font-serif text-[clamp(1.95rem,4.6vw,3rem)] font-light leading-[1.16]">
        {title}
      </h1>
      <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-[1.8] text-[#55655a] sm:text-[16px]">{body}</p>
      <div className="mt-12">
        <Rule />
      </div>
    </header>
  );
}

function LightWorldAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8f4e9_0%,#eef0e2_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(255,255,255,.8),transparent_30%),radial-gradient(circle_at_10%_84%,rgba(120,143,110,.11),transparent_33%)]" />
      <div className="absolute bottom-[-15%] left-[-8%] h-[46%] w-[44%] rounded-[50%] bg-[radial-gradient(circle,rgba(95,127,98,.09),transparent_68%)] blur-2xl" />
    </div>
  );
}
