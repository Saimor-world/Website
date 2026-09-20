'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import YoriMark from '@/components/YoriMark';
import type { ClientWorldConfig } from '@/lib/client-world';

type Decision = 'yes' | 'change';
type RoomId = 'orientierung' | 'world' | 'beispiel' | 'weiter';

type Props = {
  world: ClientWorldConfig;
  initialDecision?: Decision | null;
};

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

/** Vier Raeume statt vier Absaetze: jedes Thema bekommt eigene Flaeche und ein eigenes Objekt. */
const WORLD_OBJECTS = [
  {
    eyebrow: 'AUFTRITT',
    title: 'Was du nach außen zeigst.',
    body: 'Website, Angebote und Sprache können zusammen gedacht werden, ohne dass deine eigene Handschrift verloren geht.',
    tint: 'bg-[#f7f2e7]',
    object: 'page' as const,
  },
  {
    eyebrow: 'GEDANKEN',
    title: 'Was noch unfertig sein darf.',
    body: 'Eine Idee muss nicht sofort Post, Projekt oder Aufgabe werden. Sie darf liegen bleiben und später mit ihrem Zusammenhang wieder auftauchen.',
    tint: 'bg-[#f2ecdd]',
    object: 'note' as const,
  },
  {
    eyebrow: 'ENTSCHEIDUNGEN',
    title: 'Was deine Aufmerksamkeit braucht.',
    body: 'YORI soll nicht alles anzeigen. Es soll unterscheiden, was gerade wirklich eine Entscheidung von dir braucht – und was warten darf.',
    tint: 'bg-[#eceee1]',
    object: 'choice' as const,
  },
  {
    eyebrow: 'ERINNERUNG',
    title: 'Was nicht wieder bei null beginnen soll.',
    body: 'Wenn etwas später wieder relevant wird, kommt nicht nur der Punkt zurück, sondern auch der Kontext, aus dem er entstanden ist.',
    tint: 'bg-[#f5f0e4]',
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
    <main className="min-h-[100svh] bg-[#f4efe4] text-[#1f3b2d]">
      <div className="relative min-h-[100svh]">
        <LightWorldAmbient />

        {/* Navigation als ruhige Marginalspalte, nicht als App-Schiene:
            keine Pillen, keine Icons - nur Haarlinie und Goldmarke. */}
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col border-r border-[#1f3b2d]/[.08] bg-[#efe9dc]/[.72] px-6 pb-7 pt-8 backdrop-blur-[22px] lg:flex">
          <button
            type="button"
            onClick={() => goTo('orientierung')}
            className="flex items-center gap-3 pb-10 text-left"
          >
            <YoriMark className="h-9 w-9 text-[#2c4a3a]" title="YORI" />
            <span className="grid">
              <b className="font-serif text-[20px] font-medium tracking-[.06em] text-[#1f3b2d]">LUANA</b>
              <small className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#7d6430]">
                DEINE WORLD · YORI
              </small>
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
                    ? 'border-[#9b7f42] text-[#1f3b2d]'
                    : 'border-transparent text-[#556c5e] hover:border-[#1f3b2d]/[.15] hover:text-[#1f3b2d]'
                }`}
              >
                <strong className="text-[14px] font-medium">{label}</strong>
                <small className="mt-0.5 text-[11px] leading-4 text-[#556c5e]">{hint}</small>
              </button>
            ))}
          </nav>

          <p className="mt-auto pt-6 text-[11px] leading-5 text-[#556c5e]">
            Ein persönlicher Entwurf für {world.clientName} — noch kein fertiges Produkt.
          </p>
        </aside>

        <section className="relative z-10 min-h-[100svh] lg:pl-[232px]">
          <header className="mx-auto flex h-[68px] w-[calc(100%-40px)] max-w-[1180px] items-center justify-between gap-4 lg:w-[calc(100%-96px)]">
            {/* Mobil traegt die Kopfzeile den Markenzug einmal - in der Ankunft
                stand er sonst ein zweites Mal direkt darunter. */}
            <div className="flex items-center gap-3 lg:hidden">
              <YoriMark className="h-8 w-8 text-[#2c4a3a]" title="YORI" />
              <span className="font-serif text-[15px] font-medium tracking-[.09em] text-[#1f3b2d]">
                LUANA LUMINA
              </span>
            </div>
            <p className="ml-auto shrink-0 text-[11px] text-[#556c5e]">Persönlicher Entwurf</p>
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

        {/* Mobil: Textleiste mit Goldmarke statt Icon-Raster mit Karten-Hintergrund. */}
        <nav
          className="fixed inset-x-0 bottom-0 z-50 border-t border-[#1f3b2d]/[.10] bg-[#f4efe4]/[.94] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
          aria-label="Luana World mobile Bereiche"
        >
          <div className="flex">
            {ROOMS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => goTo(id)}
                aria-current={room === id ? 'page' : undefined}
                className={`min-h-[56px] flex-1 border-t-2 px-1 text-[13px] transition ${
                  room === id
                    ? 'border-[#9b7f42] font-medium text-[#1f3b2d]'
                    : 'border-transparent text-[#556c5e]'
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
      {/*
        Die Ankunft ist kein Vorhang mehr, durch den man erst klicken muss.
        Sie ist der Anfang desselben Raums - der Knopf fuehrt weiter, statt zu
        oeffnen. Das war einer der Zwischenschritte, die vom 30-Sekunden-Budget
        abgingen.
      */}
      <div className="grid gap-12 pt-10 lg:grid-cols-[1.04fr_.96fr] lg:items-center lg:gap-16 lg:pt-16">
        <div>
          <p className="hidden font-serif text-[17px] font-medium tracking-[.1em] text-[#1f3b2d] lg:block">
            LUANA LUMINA
          </p>

          <p className="mt-2 text-[11px] uppercase tracking-[.18em] text-[#7d6430] lg:mt-9">
            Ein erster Blick in etwas, das dir gehören könnte
          </p>
          <h1 className="mt-5 max-w-[15ch] font-serif text-[clamp(2.35rem,6.6vw,4.2rem)] font-light leading-[1.02] tracking-[-.03em]">
            Was wäre, wenn dein Business einen eigenen ruhigen Raum hätte?
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.75] text-[#3d5748]">
            Einen Ort, der nicht nur zeigt, was du anbietest – sondern mit dir zusammenhält, was du denkst, entscheidest und als Nächstes aufbauen willst.
          </p>

          <button
            type="button"
            onClick={onExplain}
            className="mt-8 inline-flex min-h-[56px] items-center gap-3 rounded-full bg-[#2c4a3a] px-7 text-[15px] font-semibold text-[#f7f1e5] shadow-[0_14px_34px_rgba(44,74,58,.18)] transition hover:-translate-y-0.5 hover:bg-[#233d2f]"
          >
            Meine World entdecken
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-5 max-w-md text-[13px] leading-6 text-[#556c5e]">
            Ein persönlicher Entwurf, kein fertiges Produkt. Gebaut, damit du siehst, was wir meinen – statt es dir zu beschreiben.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-8 -top-10 h-[62%] w-[74%] rounded-full bg-[radial-gradient(circle_at_38%_34%,rgba(255,255,255,.92),rgba(196,208,182,.3)_58%,transparent_74%)] blur-2xl lg:-left-16 lg:h-[70%] lg:w-[80%]"
          />
          <div className="relative rotate-[-.6deg] rounded-[22px_8px_24px_9px] border border-[#1f3b2d]/[.10] bg-[#fffaf0]/[.92] p-7 shadow-[0_22px_60px_rgba(42,70,52,.09)] backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[.16em] text-[#7d6430]">Deine World könnte</p>
            <p className="mt-3 font-serif text-[clamp(1.6rem,3.4vw,2.1rem)] font-light leading-tight text-[#1f3b2d]">
              erinnern, ordnen, verbinden.
            </p>
            <div className="mt-5 h-px bg-[#1f3b2d]/[.10]" />
            <p className="mt-4 text-[14px] leading-6 text-[#556c5e]">
              Ohne aus deinem Business ein weiteres Dashboard zu machen.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="mt-5 ml-auto w-[76%] rotate-[1.4deg] rounded-[9px_20px_10px_18px] bg-[#e8ecdf]/[.86] p-5"
          >
            <p className="text-[10px] uppercase tracking-[.15em] text-[#556c5e]">Heute</p>
            <p className="mt-2 font-serif text-[20px] font-light text-[#1f3b2d]">Nur das, was gerade zählt.</p>
          </div>
        </div>
      </div>

      <div ref={explainRef} className="scroll-mt-6 pt-20 lg:pt-28">
        <p className="text-[11px] uppercase tracking-[.18em] text-[#7d6430]">Ankommen</p>
        <h2 className="mt-4 max-w-[820px] font-serif text-[clamp(1.85rem,4.4vw,2.9rem)] font-light leading-[1.12] tracking-[-.02em] text-[#1f3b2d]">
          Hallo {clientName}. Was ist das hier eigentlich?
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">
          Wir haben das für dich gebaut, weil wir gern mit dir arbeiten würden – und weil sich so ein Raum schwer beschreiben lässt, solange man ihn nicht sieht. Deine Website ist dabei nur ein möglicher Anfang, nicht der Mittelpunkt.
        </p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-[#1f3b2d]/[.10] md:grid-cols-2">
          {WORLD_QA.map((item, index) => (
            <div key={item.q} className="bg-[#faf6ed] p-6 sm:p-8">
              <span className="text-[11px] tracking-[.14em] text-[#7d6430]">0{index + 1}</span>
              <dt className="mt-3 font-serif text-[21px] font-light leading-snug text-[#1f3b2d] sm:text-[23px]">
                {item.q}
              </dt>
              <dd className="mt-3 text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">{item.a}</dd>
            </div>
          ))}
        </dl>

        {/*
          Wer nie navigiert, soll den Kern trotzdem haben: was noch kommt und
          wo die Entscheidung liegt, steht hier am Ende des ersten Raums.
        */}
        <div className="mt-12 rounded-[24px] bg-[#e9ece0]/[.7] p-7 sm:p-10">
          <p className="text-[11px] uppercase tracking-[.16em] text-[#7d6430]">Was noch kommt</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <button type="button" onClick={onExplore} className="text-left">
              <p className="font-serif text-[20px] font-light text-[#1f3b2d]">Deine World</p>
              <p className="mt-2 text-[15px] leading-7 text-[#3d5748]">
                Die vier Dinge, die so ein Raum für dich zusammenhalten würde.
              </p>
            </button>
            <button type="button" onClick={onExample} className="text-left">
              <p className="font-serif text-[20px] font-light text-[#1f3b2d]">Ein Beispiel</p>
              <p className="mt-2 text-[15px] leading-7 text-[#3d5748]">
                Ein kleiner Ausschnitt deines Auftritts, damit es nicht abstrakt bleibt.
              </p>
            </button>
            <button type="button" onClick={onDecide} className="text-left">
              <p className="font-serif text-[20px] font-light text-[#1f3b2d]">Weiter</p>
              <p className="mt-2 text-[15px] leading-7 text-[#3d5748]">
                Was es praktisch bedeuten würde – und eine einzige Frage an dich.
              </p>
            </button>
          </div>
          <button
            type="button"
            onClick={onExplore}
            className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#2c4a3a] px-7 text-[15px] font-semibold text-[#f7f1e5] transition hover:bg-[#233d2f]"
          >
            Weiter zu deiner World
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function WorldRoom({ onExample }: { onExample: () => void }) {
  return (
    <section>
      <RoomIntro
        eyebrow="Deine World"
        title="Nicht mehr Oberfläche. Mehr Zusammenhang."
        body="YORI soll nicht vor dir stehen. Es soll im Hintergrund dafür sorgen, dass Dinge, die zu deinem Business gehören, nicht voneinander getrennt herumliegen."
      />

      {/*
        Vorher vier gleich gebaute Absaetze in einem Raster - es las sich als
        Aufzaehlung. Jetzt vier Flaechen mit eigenem Ton und eigenem Objekt,
        abwechselnd gesetzt, damit ein Rhythmus entsteht.
      */}
      <div className="mt-14 grid gap-5">
        {WORLD_OBJECTS.map(({ eyebrow, title, body, tint, object }, index) => (
          <article
            key={eyebrow}
            className={`overflow-hidden rounded-[26px] px-7 py-11 sm:px-12 sm:py-14 ${tint}`}
          >
            <div
              className={`grid items-center gap-9 lg:gap-14 ${
                index % 2 === 1 ? 'lg:grid-cols-[.85fr_1.15fr]' : 'lg:grid-cols-[1.15fr_.85fr]'
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <p className="text-[11px] uppercase tracking-[.16em] text-[#7d6430]">{eyebrow}</p>
                <h2 className="mt-4 max-w-[16ch] font-serif text-[clamp(1.6rem,3.4vw,2.35rem)] font-light leading-[1.14] text-[#1f3b2d]">
                  {title}
                </h2>
                <p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">{body}</p>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : undefined}>
                <WorldObject kind={object} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[26px] bg-[#e3e9dd]/[.72] p-7 sm:p-11">
        <p className="text-[11px] uppercase tracking-[.16em] text-[#7d6430]">Der eigentliche Gedanke</p>
        <p className="mt-4 max-w-3xl font-serif text-[clamp(1.65rem,3.6vw,2.5rem)] font-light leading-[1.18] text-[#1f3b2d]">
          Deine World soll nicht mehr von dir verlangen. Sie soll weniger verlieren lassen.
        </p>
        <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">
          Weniger Kontext, der verschwindet. Weniger Ideen, die wieder neu erklärt werden müssen. Weniger Entscheidungen, die zwischen fünf Tools hängen bleiben.
        </p>
        <button
          type="button"
          onClick={onExample}
          className="mt-7 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#2c4a3a] px-7 text-[15px] font-semibold text-[#f7f1e5] transition hover:bg-[#233d2f]"
        >
          Zeig mir das an etwas Konkretem
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

/** Ruhige Papier-Objekte statt Icons: YORI bleibt spuerbar, ohne zu dominieren. */
function WorldObject({ kind }: { kind: 'page' | 'note' | 'choice' | 'memory' }) {
  if (kind === 'page') {
    return (
      <div aria-hidden="true" className="mx-auto w-full max-w-[320px] rounded-[16px] bg-[#fffaf0] p-5 shadow-[0_16px_44px_rgba(42,70,52,.07)]">
        <div className="h-1.5 w-16 rounded-full bg-[#c8b489]" />
        <div className="mt-4 h-2.5 w-[88%] rounded-full bg-[#1f3b2d]/[.16]" />
        <div className="mt-2 h-2.5 w-[62%] rounded-full bg-[#1f3b2d]/[.16]" />
        <div className="mt-5 h-8 w-32 rounded-full bg-[#2c4a3a]" />
        <div className="mt-4 h-px w-full bg-[#1f3b2d]/[.08]" />
        <div className="mt-4 h-1.5 w-[45%] rounded-full bg-[#1f3b2d]/[.10]" />
      </div>
    );
  }

  if (kind === 'note') {
    return (
      <div aria-hidden="true" className="mx-auto w-full max-w-[320px]">
        <div className="rotate-[-1.6deg] rounded-[6px_18px_7px_16px] bg-[#fffaf0] p-5 shadow-[0_14px_40px_rgba(42,70,52,.07)]">
          <div className="h-1.5 w-12 rounded-full bg-[#c8b489]" />
          <div className="mt-4 space-y-2">
            <div className="h-2 w-[90%] rounded-full bg-[#1f3b2d]/[.13]" />
            <div className="h-2 w-[74%] rounded-full bg-[#1f3b2d]/[.13]" />
            <div className="h-2 w-[40%] rounded-full bg-[#1f3b2d]/[.09]" />
          </div>
        </div>
        <div className="mt-3 ml-8 w-[68%] rotate-[2deg] rounded-[16px_6px_18px_7px] bg-[#fffaf0]/[.7] p-4">
          <div className="h-2 w-[70%] rounded-full bg-[#1f3b2d]/[.09]" />
        </div>
      </div>
    );
  }

  if (kind === 'choice') {
    return (
      <div aria-hidden="true" className="mx-auto grid w-full max-w-[320px] gap-3">
        <div className="rounded-[14px] border-l-2 border-[#9b7f42] bg-[#fffaf0] p-4 shadow-[0_12px_34px_rgba(42,70,52,.06)]">
          <div className="h-1.5 w-10 rounded-full bg-[#c8b489]" />
          <div className="mt-3 h-2.5 w-[76%] rounded-full bg-[#1f3b2d]/[.18]" />
        </div>
        <div className="rounded-[14px] bg-[#fffaf0]/[.55] p-4">
          <div className="h-2 w-[58%] rounded-full bg-[#1f3b2d]/[.08]" />
        </div>
        <div className="rounded-[14px] bg-[#fffaf0]/[.35] p-4">
          <div className="h-2 w-[44%] rounded-full bg-[#1f3b2d]/[.06]" />
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="relative mx-auto h-[190px] w-full max-w-[320px]">
      <div className="absolute left-0 top-0 w-[74%] rounded-[14px] bg-[#fffaf0]/[.4] p-4">
        <div className="h-2 w-[50%] rounded-full bg-[#1f3b2d]/[.07]" />
      </div>
      <div className="absolute left-8 top-10 w-[74%] rounded-[14px] bg-[#fffaf0]/[.68] p-4">
        <div className="h-2 w-[62%] rounded-full bg-[#1f3b2d]/[.10]" />
      </div>
      <div className="absolute left-16 top-20 w-[74%] rounded-[14px] bg-[#fffaf0] p-4 shadow-[0_14px_38px_rgba(42,70,52,.08)]">
        <div className="h-1.5 w-10 rounded-full bg-[#c8b489]" />
        <div className="mt-3 h-2.5 w-[78%] rounded-full bg-[#1f3b2d]/[.18]" />
      </div>
    </div>
  );
}

function ExampleRoom({ onContinue }: { onContinue: () => void }) {
  return (
    <section>
      <RoomIntro
        eyebrow="Ein Beispiel"
        title="Ein kleiner Ausschnitt, damit es nicht abstrakt bleibt."
        body="Wir nehmen einen Teil deines Auftritts, den du schon hast, und zeigen daran, wie YORI aus etwas Vorhandenem einen nächsten Gedanken machen könnte."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[.86fr_1.14fr] lg:items-start">
        <div className="grid gap-px overflow-hidden rounded-[20px] bg-[#1f3b2d]/[.10]">
          <article className="bg-[#faf6ed] p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[.16em] text-[#7d6430]">Was schon trägt</p>
            <h2 className="mt-3 font-serif text-[21px] font-light leading-snug text-[#1f3b2d] sm:text-[23px]">
              Deine starke Schwelle.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">
              „Du stehst an der Schwelle zu einer neuen Identität.“ trägt bereits Haltung. Eine gute World muss nicht alles verändern – sie sollte erkennen, was schon trägt.
            </p>
          </article>

          <article className="bg-[#f2e9da] p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[.16em] text-[#7d6430]">Was YORI daraus machen könnte</p>
            <h2 className="mt-3 font-serif text-[21px] font-light leading-snug text-[#1f3b2d] sm:text-[23px]">
              Einen Gedanken klarer führen.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">
              Wenn zwei Wege gleichzeitig Aufmerksamkeit wollen, könnte YORI einen davon zuerst führen lassen – und den anderen bewusst leiser halten. Nicht weil etwas falsch ist, sondern damit deine Wirkung schneller ankommt.
            </p>
          </article>
        </div>

        <article className="overflow-hidden rounded-[20px] border border-[#1f3b2d]/[.10] bg-[#f8f3e8] shadow-[0_28px_80px_rgba(31,59,45,.08)]">
          <div className="flex items-center justify-between gap-4 border-b border-[#1f3b2d]/[.08] px-6 py-4">
            <span className="font-serif text-[14px] font-medium tracking-[.1em] text-[#1f3b2d]">LUANA LUMINA</span>
            <span className="text-[11px] text-[#556c5e]">So könnte es aussehen</span>
          </div>
          <div className="p-6 sm:p-10">
            <p className="text-[11px] uppercase tracking-[.14em] text-[#556c5e]">
              Bewusstseinstraining · Identitätsshift · Energiearbeit
            </p>
            <h3 className="mt-6 max-w-xl font-serif text-[clamp(1.9rem,4.4vw,3rem)] font-light leading-[1.06] tracking-[-.03em] text-[#1f3b2d]">
              Du stehst an der Schwelle zu einer neuen Identität.
            </h3>
            <p className="mt-5 max-w-lg text-[15px] leading-[1.7] text-[#3d5748]">
              Ein Satz führt. Ein Weg ist sichtbar. Der zweite bleibt da, ohne mit dem ersten zu konkurrieren.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#2c4a3a] px-7 text-[15px] font-semibold text-[#f7f1e5]">
                Angebote entdecken
              </span>
              <span className="text-[15px] text-[#556c5e] underline decoration-[#556c5e]/30 underline-offset-[6px]">
                Identitätsshift Guide
              </span>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-12 rounded-[26px] bg-[#f0ebdf]/[.8] p-7 sm:p-11">
        <p className="max-w-3xl font-serif text-[clamp(1.5rem,3.2vw,2.1rem)] font-light leading-[1.2] text-[#1f3b2d]">
          Das Entscheidende ist nicht dieser eine Website-Punkt.
        </p>
        <p className="mt-4 max-w-3xl text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">
          Entscheidend wäre, dass deine World später versteht, warum etwas wichtig war, was daraus entstanden ist und wann es wieder auf deinen Tisch gehört.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-7 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#2c4a3a] px-7 text-[15px] font-semibold text-[#f7f1e5] transition hover:bg-[#233d2f]"
        >
          Was würde das für mich bedeuten?
          <ArrowRight className="h-4 w-4" />
        </button>
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
      <RoomIntro
        eyebrow="Weiter"
        title="Was würde das für dich praktisch bedeuten?"
        body="Noch bevor irgendetwas gebaut wird, sind diese Fragen wichtiger als weitere Features."
      />

      <dl className="mt-14 grid gap-px overflow-hidden rounded-[20px] bg-[#1f3b2d]/[.10] lg:grid-cols-3">
        {NEXT_QA.map((item) => (
          <div key={item.q} className="bg-[#faf6ed] p-6 sm:p-8">
            <dt className="font-serif text-[21px] font-light leading-snug text-[#1f3b2d] sm:text-[23px]">
              {item.q}
            </dt>
            <dd className="mt-3 text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">{item.a}</dd>
          </div>
        ))}
      </dl>

      <article className="mt-8 overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,rgba(225,232,220,.9),rgba(245,238,224,.94))] p-7 shadow-[0_24px_72px_rgba(31,59,45,.07)] sm:p-12">
        {decision ? (
          <div className="max-w-3xl">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#2c4a3a] text-[#f7f1e5]">
              <Check className="h-5 w-5" />
            </span>
            <p className="mt-6 text-[11px] uppercase tracking-[.16em] text-[#7d6430]">Deine Antwort ist notiert</p>
            <h2 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.6rem)] font-light leading-[1.16] text-[#1f3b2d]">
              {decision === 'yes'
                ? 'Dann bauen wir von hier weiter.'
                : 'Dann ändern wir zuerst die Richtung.'}
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">
              Deine World erinnert sich an diese Entscheidung. Für den nächsten Schritt reicht eine kurze Nachricht – wir müssen daraus heute noch kein großes Projekt machen.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[.16em] text-[#7d6430]">Eine letzte Frage</p>
            <h2 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.6rem)] font-light leading-[1.16] text-[#1f3b2d]">
              Fühlt sich diese Idee grundsätzlich nach etwas an, das dir Arbeit abnehmen könnte?
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">
              Nicht: Ist schon alles perfekt? Sondern nur: Ist die Richtung interessant genug, um daraus einen echten kleinen nächsten Schritt zu machen?
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                disabled={saving}
                onClick={() => void onChoose('yes')}
                className="min-h-[56px] rounded-full bg-[#2c4a3a] px-7 text-[15px] font-semibold text-[#f7f1e5] transition hover:bg-[#233d2f] disabled:cursor-wait disabled:opacity-60"
              >
                Ja, das möchte ich weiterdenken
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void onChoose('change')}
                className="min-h-[56px] rounded-full border border-[#1f3b2d]/[.18] px-7 text-[15px] text-[#3d5748] transition hover:bg-white/[.5] disabled:cursor-wait disabled:opacity-60"
              >
                Die Richtung braucht noch etwas anderes
              </button>
            </div>
          </div>
        )}

        {error ? (
          <p role="status" className="mt-6 text-[14px] text-[#8c4436]">
            Konnte gerade nicht gespeichert werden. Bitte nochmal versuchen.
          </p>
        ) : null}
      </article>
    </section>
  );
}

function RoomIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <header className="max-w-[820px] pt-8 lg:pt-12">
      <p className="text-[11px] uppercase tracking-[.18em] text-[#7d6430]">{eyebrow}</p>
      <h1 className="mt-4 font-serif text-[clamp(1.85rem,4.4vw,2.9rem)] font-light leading-[1.12] tracking-[-.02em] text-[#1f3b2d]">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">{body}</p>
    </header>
  );
}

function LightWorldAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6f1e6_0%,#ece6d7_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(255,255,255,.82),transparent_30%),radial-gradient(circle_at_10%_84%,rgba(120,143,110,.13),transparent_33%),radial-gradient(circle_at_62%_66%,rgba(199,180,137,.12),transparent_32%)]" />
      <div className="absolute right-[5%] top-[8%] h-[48vh] w-[48vh] rounded-full border border-[#59705e]/[.045]" />
      <div className="absolute right-[12%] top-[16%] h-[31vh] w-[31vh] rounded-full border border-[#59705e]/[.05]" />
      <div className="absolute bottom-[-15%] left-[-8%] h-[46%] w-[44%] rounded-[50%] bg-[radial-gradient(circle,rgba(95,127,98,.10),transparent_68%)] blur-2xl" />
    </div>
  );
}
