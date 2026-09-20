'use client';

import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  House,
  Lightbulb,
  Sparkles,
  Waves,
} from 'lucide-react';
import YoriMark from '@/components/YoriMark';
import type { ClientWorldConfig } from '@/lib/client-world';

type Decision = 'yes' | 'change';
type RoomId = 'orientierung' | 'world' | 'beispiel' | 'weiter';

type Props = {
  world: ClientWorldConfig;
  initialDecision?: Decision | null;
};

const ROOMS: Array<{
  id: RoomId;
  label: string;
  hint: string;
  icon: typeof House;
}> = [
  { id: 'orientierung', label: 'Ankommen', hint: 'Was ist das hier?', icon: House },
  { id: 'world', label: 'Deine World', hint: 'Was sie für dich hält', icon: Compass },
  { id: 'beispiel', label: 'Ein Beispiel', hint: 'Wie daraus Arbeit wird', icon: Waves },
  { id: 'weiter', label: 'Weiter', hint: 'Fragen & nächster Schritt', icon: Sparkles },
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
    eyebrow: 'AUFTRITT',
    title: 'Was du nach außen zeigst.',
    body: 'Website, Angebote und Sprache können zusammen gedacht werden, ohne dass deine eigene Handschrift verloren geht.',
    icon: Waves,
  },
  {
    eyebrow: 'GEDANKEN',
    title: 'Was noch unfertig sein darf.',
    body: 'Eine Idee muss nicht sofort Post, Projekt oder Aufgabe werden. Sie darf liegen bleiben und später mit ihrem Zusammenhang wieder auftauchen.',
    icon: Lightbulb,
  },
  {
    eyebrow: 'ENTSCHEIDUNGEN',
    title: 'Was deine Aufmerksamkeit braucht.',
    body: 'YORI soll nicht alles anzeigen. Es soll unterscheiden, was gerade wirklich eine Entscheidung von dir braucht – und was warten darf.',
    icon: Compass,
  },
  {
    eyebrow: 'ERINNERUNG',
    title: 'Was nicht wieder bei null beginnen soll.',
    body: 'Wenn etwas später wieder relevant wird, kommt nicht nur der Punkt zurück, sondern auch der Kontext, aus dem er entstanden ist.',
    icon: BookOpen,
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
  const [entered, setEntered] = useState(Boolean(initialDecision));
  const [arrivalLeaving, setArrivalLeaving] = useState(false);
  const [room, setRoom] = useState<RoomId>(initialDecision ? 'weiter' : 'orientierung');
  const [decision, setDecision] = useState<Decision | null>(initialDecision);
  const [savingDecision, setSavingDecision] = useState(false);
  const [decisionError, setDecisionError] = useState(false);

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

  return (
    <main className="min-h-[100svh] overflow-hidden bg-[#f3eee3] text-[#1f3b2d]">
      <div className="relative min-h-[100svh]">
        <LightWorldAmbient />

        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[236px] flex-col border-r border-[#1f3b2d]/[.09] bg-[#ebe5d8]/[.78] px-5 pb-6 pt-7 backdrop-blur-[22px] lg:flex">
          <button
            type="button"
            onClick={() => setRoom('orientierung')}
            className="flex items-center gap-3 px-1 pb-9 text-left"
          >
            <YoriMark className="h-9 w-9 text-[#2c4a3a]" title="YORI" />
            <span className="grid">
              <b className="font-serif text-[20px] font-medium tracking-[.06em] text-[#1f3b2d]">LUANA</b>
              <small className="mt-1 text-[10px] uppercase tracking-[.16em] text-[#7d6430]">
                DEINE WORLD · YORI
              </small>
            </span>
          </button>

          <nav className="grid gap-1" aria-label="Luana World Bereiche">
            {ROOMS.map(({ id, label, hint, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRoom(id)}
                aria-current={room === id ? 'page' : undefined}
                className={`flex min-h-[56px] items-center gap-3 rounded-[14px] px-3 text-left transition ${
                  room === id
                    ? 'bg-[#f8f3e9] text-[#1f3b2d] shadow-[inset_2px_0_#9b7f42]'
                    : 'text-[#556c5e] hover:bg-white/[.45] hover:text-[#1f3b2d]'
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.6} />
                <span className="grid">
                  <strong className="text-[13px] font-medium">{label}</strong>
                  <small className="mt-0.5 text-[11px] leading-4 text-[#556c5e]">{hint}</small>
                </span>
              </button>
            ))}
          </nav>

          <p className="mt-auto border-t border-[#1f3b2d]/[.08] px-1 pt-5 text-[11px] leading-5 text-[#556c5e]">
            Ein persönlicher Entwurf für {world.clientName} — noch kein fertiges Produkt.
          </p>
        </aside>

        <section className="relative z-10 min-h-[100svh] lg:pl-[236px]">
          <header className="mx-auto flex h-[72px] w-[calc(100%-40px)] max-w-[1260px] items-center justify-between gap-4 border-b border-[#1f3b2d]/[.09] lg:w-[calc(100%-96px)]">
            <div className="flex items-center gap-3 lg:hidden">
              <YoriMark className="h-8 w-8 text-[#2c4a3a]" title="YORI" />
              <div>
                <div className="font-serif text-[16px] font-medium tracking-[.06em] text-[#1f3b2d]">LUANA</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[.14em] text-[#7d6430]">DEINE WORLD</div>
              </div>
            </div>

            <div className="hidden text-[12px] text-[#556c5e] lg:block">
              {ROOMS.find((item) => item.id === room)?.hint}
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2 text-[11px] text-[#556c5e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9b7f42]" />
              Persönlicher Entwurf
            </div>
          </header>

          <div className="mx-auto min-h-[calc(100svh-72px)] w-[calc(100%-40px)] max-w-[1180px] pb-[124px] pt-10 lg:w-[calc(100%-96px)] lg:pb-20 lg:pt-14">
            {room === 'orientierung' ? (
              <OrientationRoom
                clientName={world.clientName}
                onExplore={() => setRoom('world')}
                onExample={() => setRoom('beispiel')}
              />
            ) : room === 'world' ? (
              <WorldRoom onExample={() => setRoom('beispiel')} />
            ) : room === 'beispiel' ? (
              <ExampleRoom onContinue={() => setRoom('weiter')} />
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
          className="fixed bottom-[max(10px,env(safe-area-inset-bottom))] left-1/2 z-50 flex min-h-[76px] w-[calc(100%-20px)] -translate-x-1/2 gap-1 rounded-[22px] border border-[#1f3b2d]/[.10] bg-[#f6f1e6]/[.96] p-1.5 shadow-[0_14px_45px_rgba(31,59,45,.12)] backdrop-blur-xl lg:hidden"
          aria-label="Luana World mobile Bereiche"
        >
          {ROOMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setRoom(id)}
              aria-current={room === id ? 'page' : undefined}
              className={`flex min-h-[64px] flex-1 flex-col items-center justify-center gap-1.5 rounded-[16px] px-1 transition ${
                room === id ? 'bg-[#dde5da] text-[#1f3b2d]' : 'text-[#556c5e] hover:bg-white/[.55]'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={1.7} />
              <strong className="text-[11px] font-medium leading-none">{label}</strong>
            </button>
          ))}
        </nav>

        {!entered ? (
          <ArrivalOverlay
            leaving={arrivalLeaving}
            onEnter={() => {
              if (arrivalLeaving) return;
              setArrivalLeaving(true);
              window.setTimeout(() => setEntered(true), 460);
            }}
          />
        ) : null}
      </div>

      <style>{`
        @keyframes luana-arrival-in {
          from { opacity: 0; transform: scale(1.008); }
          to { opacity: 1; transform: scale(1); }
        }
        .luana-arrival {
          animation: luana-arrival-in .72s cubic-bezier(.22,.72,.22,1) both;
          transition: opacity .42s ease, filter .42s ease, transform .42s cubic-bezier(.22,.72,.22,1);
        }
        .luana-arrival--leaving {
          opacity: 0;
          filter: blur(7px);
          transform: scale(1.012);
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .luana-arrival {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}

function ArrivalOverlay({
  onEnter,
  leaving,
}: {
  onEnter: () => void;
  leaving: boolean;
}) {
  return (
    <section
      className={`luana-arrival fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#f1ebe0] px-6 py-10 text-[#1f3b2d] ${
        leaving ? 'luana-arrival--leaving' : ''
      }`}
    >
      <LightWorldAmbient />

      <div className="relative z-10 mx-auto grid w-full max-w-[1120px] gap-14 lg:grid-cols-[1.02fr_.98fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <YoriMark className="h-9 w-9 text-[#2c4a3a]" title="YORI" />
            <p className="font-serif text-[17px] font-medium tracking-[.1em] text-[#1f3b2d]">LUANA LUMINA</p>
          </div>

          <p className="mt-8 text-[11px] uppercase tracking-[.18em] text-[#7d6430]">
            Ein erster Blick in etwas, das dir gehören könnte
          </p>
          <h1 className="mt-5 max-w-[15ch] font-serif text-[clamp(2.35rem,6.6vw,4.2rem)] font-light leading-[1.02] tracking-[-.03em]">
            Was wäre, wenn dein Business einen eigenen ruhigen Raum hätte?
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.75] text-[#3d5748]">
            Einen Ort, der nicht nur zeigt, was du anbietest – sondern mit dir zusammenhält, was du denkst, entscheidest und als Nächstes aufbauen willst.
          </p>

          {/* Mobil fehlt die grosse Komposition rechts. Statt abstrakter Formen
              traegt hier dieselbe Notiz wie dort - sie sagt etwas, statt nur zu
              schmuecken. */}
          <div className="relative mt-8 lg:hidden">
            <div
              aria-hidden="true"
              className="absolute -left-6 -top-8 h-[190px] w-[78%] rounded-full bg-[radial-gradient(circle_at_38%_34%,rgba(255,255,255,.9),rgba(196,208,182,.32)_58%,transparent_74%)] blur-2xl"
            />
            <div className="relative rotate-[-.6deg] rounded-[20px_7px_22px_8px] border border-[#1f3b2d]/[.10] bg-[#fffaf0]/[.9] p-6 shadow-[0_18px_50px_rgba(42,70,52,.08)] backdrop-blur-md">
              <p className="text-[10px] uppercase tracking-[.16em] text-[#7d6430]">Deine World könnte</p>
              <p className="mt-3 font-serif text-[25px] font-light leading-tight text-[#1f3b2d]">
                erinnern, ordnen, verbinden.
              </p>
              <div className="mt-4 h-px bg-[#1f3b2d]/[.10]" />
              <p className="mt-3 text-[13px] leading-6 text-[#556c5e]">
                Ohne aus deinem Business ein weiteres Dashboard zu machen.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onEnter}
            disabled={leaving}
            className="mt-8 inline-flex min-h-[56px] items-center gap-3 rounded-full bg-[#2c4a3a] px-7 text-[15px] font-semibold text-[#f7f1e5] shadow-[0_14px_34px_rgba(44,74,58,.18)] transition hover:-translate-y-0.5 hover:bg-[#233d2f] disabled:cursor-wait disabled:opacity-70"
          >
            Meine World entdecken
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-5 max-w-md text-[13px] leading-6 text-[#556c5e]">
            Ein persönlicher Entwurf, kein fertiges Produkt. Gebaut, damit du siehst, was wir meinen – statt es dir zu beschreiben.
          </p>
        </div>

        <div className="relative hidden min-h-[560px] lg:block" aria-hidden="true">
          <div className="absolute right-[4%] top-[7%] h-[64%] w-[66%] rounded-[49%_51%_48%_52%/58%_48%_52%_42%] bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,.96)_0%,rgba(232,230,217,.88)_38%,rgba(177,190,163,.62)_100%)] shadow-[0_35px_90px_rgba(43,69,51,.12)]" />
          <div className="absolute bottom-[8%] left-[6%] h-[34%] w-[46%] rotate-[-4deg] rounded-[52%_48%_44%_56%/58%_52%_48%_42%] bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,.96)_0%,rgba(225,224,207,.84)_44%,rgba(168,185,156,.60)_100%)] shadow-[0_28px_65px_rgba(43,69,51,.10)]" />

          <div className="absolute left-[10%] top-[18%] w-[288px] rotate-[-1deg] rounded-[20px_7px_24px_8px] border border-[#1f3b2d]/[.10] bg-[#fffaf0]/[.88] p-6 shadow-[0_18px_55px_rgba(42,70,52,.08)] backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[.16em] text-[#7d6430]">Deine World könnte</p>
            <p className="mt-3 font-serif text-[26px] font-light leading-tight text-[#1f3b2d]">
              erinnern, ordnen, verbinden.
            </p>
            <div className="mt-4 h-px bg-[#1f3b2d]/[.10]" />
            <p className="mt-3 text-[13px] leading-6 text-[#556c5e]">
              Ohne aus deinem Business ein weiteres Dashboard zu machen.
            </p>
          </div>

          <div className="absolute bottom-[15%] right-[7%] w-[236px] rotate-[1.5deg] rounded-[8px_20px_9px_18px] border border-[#1f3b2d]/[.09] bg-[#e6ebdf]/[.82] p-5">
            <p className="text-[10px] uppercase tracking-[.15em] text-[#556c5e]">Heute</p>
            <p className="mt-2 font-serif text-[21px] font-light text-[#1f3b2d]">Nur das, was gerade zählt.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrientationRoom({
  clientName,
  onExplore,
  onExample,
}: {
  clientName: string;
  onExplore: () => void;
  onExample: () => void;
}) {
  return (
    <section>
      <RoomIntro
        eyebrow="Ankommen"
        title={`Hallo ${clientName}. Was ist das hier eigentlich?`}
        body="Wir haben das für dich gebaut, weil wir gern mit dir arbeiten würden – und weil sich so ein Raum schwer beschreiben lässt, solange man ihn nicht sieht. Deine Website ist dabei nur ein möglicher Anfang, nicht der Mittelpunkt."
      />

      {/* Antworten als redaktionelle Liste statt als vier gleiche Kaesten:
          die Fragen sollen sich lesen lassen, nicht wie UI wirken. */}
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

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onExplore}
          className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#2c4a3a] px-7 text-[15px] font-semibold text-[#f7f1e5] transition hover:bg-[#233d2f]"
        >
          Was meine World können könnte
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onExample}
          className="min-h-[54px] rounded-full border border-[#1f3b2d]/[.16] px-7 text-[15px] text-[#3d5748] transition hover:bg-white/[.5]"
        >
          direkt zu einem Beispiel
        </button>
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

      <div className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-[#1f3b2d]/[.10] md:grid-cols-2">
        {WORLD_OBJECTS.map(({ eyebrow, title, body, icon: Icon }) => (
          <article key={eyebrow} className="bg-[#faf6ed] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] uppercase tracking-[.16em] text-[#7d6430]">{eyebrow}</p>
                <h2 className="mt-3 max-w-md font-serif text-[21px] font-light leading-snug text-[#1f3b2d] sm:text-[23px]">
                  {title}
                </h2>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e7ebe0] text-[#3d5748]">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
            </div>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">{body}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-[24px] bg-[#e3e9dd]/[.72] p-7 sm:p-10">
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
          className="mt-7 inline-flex min-h-[48px] items-center gap-2 text-[15px] font-semibold text-[#2c4a3a] underline decoration-[#9b7f42]/50 underline-offset-[7px]"
        >
          Zeig mir das an etwas Konkretem
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function ExampleRoom({ onContinue }: { onContinue: () => void }) {
  return (
    <section>
      <RoomIntro
        eyebrow="Ein Beispiel"
        title="Ein kleiner Ausschnitt, damit es nicht abstrakt bleibt."
        body="Wir nehmen einen Teil deines Auftritts, den du schon hast. Nicht um ihn zu prüfen, sondern um zu zeigen, wie YORI aus etwas Vorhandenem einen nächsten Gedanken machen könnte."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[.86fr_1.14fr] lg:items-start">
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

      <div className="mt-10 rounded-[24px] bg-white/[.46] p-7 sm:p-10">
        <p className="max-w-3xl font-serif text-[clamp(1.5rem,3.2vw,2.1rem)] font-light leading-[1.2] text-[#1f3b2d]">
          Das Entscheidende ist nicht dieser eine Website-Punkt.
        </p>
        <p className="mt-4 max-w-3xl text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">
          Entscheidend wäre, dass deine World später versteht, warum etwas wichtig war, was daraus entstanden ist und wann es wieder auf deinen Tisch gehört.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-6 inline-flex min-h-[48px] items-center gap-2 text-[15px] font-semibold text-[#2c4a3a] underline decoration-[#9b7f42]/50 underline-offset-[7px]"
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

      <dl className="mt-12 grid gap-px overflow-hidden rounded-[20px] bg-[#1f3b2d]/[.10] lg:grid-cols-3">
        {NEXT_QA.map((item) => (
          <div key={item.q} className="bg-[#faf6ed] p-6 sm:p-8">
            <dt className="font-serif text-[21px] font-light leading-snug text-[#1f3b2d] sm:text-[23px]">
              {item.q}
            </dt>
            <dd className="mt-3 text-[15px] leading-[1.75] text-[#3d5748] sm:text-[16px]">{item.a}</dd>
          </div>
        ))}
      </dl>

      <article className="mt-8 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,rgba(225,232,220,.9),rgba(245,238,224,.94))] p-7 shadow-[0_24px_72px_rgba(31,59,45,.07)] sm:p-11">
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
    <header className="max-w-[820px]">
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3eee3_0%,#ece5d8_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(255,255,255,.78),transparent_28%),radial-gradient(circle_at_12%_86%,rgba(103,128,101,.12),transparent_31%),radial-gradient(circle_at_64%_68%,rgba(197,180,142,.10),transparent_30%)]" />
      <div className="absolute right-[5%] top-[8%] h-[48vh] w-[48vh] rounded-full border border-[#59705e]/[.045]" />
      <div className="absolute right-[12%] top-[16%] h-[31vh] w-[31vh] rounded-full border border-[#59705e]/[.05]" />
      <div className="absolute bottom-[-15%] left-[-8%] h-[46%] w-[44%] rounded-[50%] bg-[radial-gradient(circle,rgba(95,127,98,.10),transparent_68%)] blur-2xl" />
    </div>
  );
}
