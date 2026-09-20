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
    <main className="min-h-[100svh] overflow-hidden bg-[#f3eee3] text-[#203f33]">
      <div className="relative min-h-[100svh]">
        <LightWorldAmbient />

        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[212px] flex-col border-r border-[#365442]/[.10] bg-[#ebe5d8]/[.82] px-4 pb-5 pt-6 shadow-[18px_0_70px_rgba(65,75,58,.06)] backdrop-blur-[22px] lg:flex">
          <button
            type="button"
            onClick={() => setRoom('orientierung')}
            className="flex items-center gap-3 px-2 pb-8 text-left"
          >
            <YoriMark className="h-8 w-8 text-[#315341]" title="YORI" />
            <span className="grid">
              <b className="font-serif text-[21px] font-semibold tracking-[.03em] text-[#214233]">LUANA</b>
              <small className="mt-0.5 text-[7px] uppercase tracking-[.19em] text-[#9a7d44]">DEINE WORLD · YORI</small>
            </span>
          </button>

          <nav className="grid gap-1.5" aria-label="Luana World Bereiche">
            {ROOMS.map(({ id, label, hint, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRoom(id)}
                aria-current={room === id ? 'page' : undefined}
                className={`flex min-h-[54px] items-center gap-3 rounded-[14px] border px-3 text-left transition ${
                  room === id
                    ? 'border-[#315341]/[.12] bg-[#f7f2e8]/[.88] text-[#214233] shadow-[inset_2px_0_#b99a5d,0_10px_28px_rgba(63,80,62,.04)]'
                    : 'border-transparent text-[#3e5949]/[.62] hover:bg-white/[.38] hover:text-[#294737]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
                <span className="grid">
                  <strong className="text-[11px] font-medium">{label}</strong>
                  <small className="mt-0.5 text-[7px] leading-3 text-[#526858]/[.42]">{hint}</small>
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-8 border-t border-[#315341]/[.08] pt-5">
            <p className="px-2 text-[9px] leading-4 text-[#405d4c]/[.46]">
              Eine persönliche Idee davon, wie sich dein Business in einem ruhigen digitalen Raum zusammenfügen könnte.
            </p>
          </div>

          <div className="mt-auto border-t border-[#315341]/[.08] px-2 pt-4">
            <div className="grid grid-cols-[36px_1fr] items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#315341]/[.10] bg-[#f8f3e8] font-serif text-sm font-semibold text-[#315341]">
                L
              </span>
              <span className="grid min-w-0">
                <b className="truncate text-[11px] text-[#294737]">{world.clientName}</b>
                <small className="text-[8px] text-[#496150]/[.42]">persönlicher Entwurf</small>
              </span>
            </div>
            <div className="mt-4 text-[6px] uppercase tracking-[.16em] text-[#496150]/[.28]">
              YORI · A SAIMÔR CREATION
            </div>
          </div>
        </aside>

        <section className="relative z-10 min-h-[100svh] lg:pl-[212px]">
          <header className="mx-auto flex h-[74px] w-[calc(100%-32px)] max-w-[1420px] items-center justify-between border-b border-[#315341]/[.09] lg:w-[calc(100%-72px)]">
            <div className="flex items-center gap-3 lg:hidden">
              <YoriMark className="h-7 w-7 text-[#315341]" title="YORI" />
              <div>
                <div className="font-serif text-[15px] tracking-[.12em] text-[#214233]">LUANA</div>
                <div className="text-[6px] uppercase tracking-[.18em] text-[#9a7d44]">DEINE WORLD · YORI</div>
              </div>
            </div>

            <div className="hidden text-[8px] uppercase tracking-[.17em] text-[#496150]/[.42] lg:block">
              {ROOMS.find((item) => item.id === room)?.hint}
            </div>

            <div className="ml-auto flex items-center gap-2 text-[7px] uppercase tracking-[.13em] text-[#496150]/[.38]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b59a60]" />
              PERSÖNLICHER ENTWURF
            </div>
          </header>

          <div className="mx-auto min-h-[calc(100svh-74px)] w-[calc(100%-32px)] max-w-[1240px] pb-[112px] pt-9 lg:w-[calc(100%-96px)] lg:pb-16 lg:pt-14">
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
          className="fixed bottom-[max(8px,env(safe-area-inset-bottom))] left-1/2 z-50 flex min-h-[74px] w-[calc(100%-16px)] -translate-x-1/2 gap-0.5 rounded-[20px] border border-[#315341]/[.12] bg-[#f4eee3]/[.95] p-1.5 shadow-[0_14px_45px_rgba(55,69,52,.12)] backdrop-blur-xl lg:hidden"
          aria-label="Luana World mobile Bereiche"
        >
          {ROOMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setRoom(id)}
              aria-current={room === id ? 'page' : undefined}
              className={`flex min-h-[62px] flex-1 flex-col items-center justify-center gap-1 rounded-[14px] px-1 transition ${
                room === id
                  ? 'bg-[#dde5da] text-[#1d4c3e]'
                  : 'text-[#52685a]/[.58] hover:bg-white/[.55] hover:text-[#294737]'
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
              <strong className="text-[9px] font-medium">{label}</strong>
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
      className={`luana-arrival fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#f1ebe0] px-5 py-8 text-[#193d2f] ${
        leaving ? 'luana-arrival--leaving' : ''
      }`}
    >
      <LightWorldAmbient />

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] gap-12 lg:grid-cols-[.98fr_1.02fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <YoriMark className="h-8 w-8 text-[#315341]" title="YORI" />
            <div>
              <p className="font-serif text-[16px] tracking-[.16em] text-[#183b2d]">LUANA LUMINA</p>
              <p className="mt-1 text-[7px] uppercase tracking-[.2em] text-[#9a7d44]">
                DEINE WORLD · YORI
              </p>
            </div>
          </div>

          <p className="mt-12 text-[7px] uppercase tracking-[.22em] text-[#6b755e]/[.58] sm:text-[8px]">
            EIN ERSTER BLICK IN ETWAS, DAS DIR GEHÖREN KÖNNTE
          </p>
          <h1 className="mt-5 max-w-[11ch] font-serif text-[clamp(3.2rem,11vw,7rem)] font-light leading-[.91] tracking-[-.052em]">
            Was wäre, wenn dein Business einen eigenen ruhigen Raum hätte?
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#365444]/[.62] sm:text-base">
            Einen Ort, der nicht nur zeigt, was du anbietest – sondern mit dir zusammenhält, was du denkst, entscheidest und als Nächstes aufbauen willst.
          </p>

          <button
            type="button"
            onClick={onEnter}
            disabled={leaving}
            className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#315341] px-6 py-3 text-sm font-semibold text-[#f7f1e5] shadow-[0_14px_34px_rgba(49,83,65,.14)] transition hover:-translate-y-0.5 hover:bg-[#284535] disabled:cursor-wait disabled:opacity-70"
          >
            Meine World entdecken
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-5 max-w-md text-[10px] leading-5 text-[#496451]/[.36]">
            Noch kein fertiges Produkt und keine Bewertung deines Auftritts. Sondern ein persönlicher Entwurf, der zeigen soll, wie sich YORI für dich anfühlen könnte.
          </p>
        </div>

        <div className="relative hidden min-h-[560px] lg:block" aria-hidden="true">
          <div className="absolute right-[4%] top-[7%] h-[64%] w-[66%] rounded-[49%_51%_48%_52%/58%_48%_52%_42%] bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,.96)_0%,rgba(232,230,217,.88)_38%,rgba(177,190,163,.62)_100%)] shadow-[0_35px_90px_rgba(43,69,51,.12)]" />
          <div className="absolute bottom-[8%] left-[6%] h-[34%] w-[46%] rotate-[-4deg] rounded-[52%_48%_44%_56%/58%_52%_48%_42%] bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,.96)_0%,rgba(225,224,207,.84)_44%,rgba(168,185,156,.60)_100%)] shadow-[0_28px_65px_rgba(43,69,51,.10)]" />

          <div className="absolute left-[10%] top-[18%] w-[280px] rotate-[-1deg] rounded-[20px_7px_24px_8px] border border-[#315341]/[.10] bg-[#fffaf0]/[.86] p-5 shadow-[0_18px_55px_rgba(42,70,52,.08)] backdrop-blur-md">
            <p className="text-[7px] uppercase tracking-[.18em] text-[#8c7447]/[.60]">DEINE WORLD KÖNNTE</p>
            <p className="mt-3 font-serif text-2xl font-light leading-tight text-[#214432]">
              erinnern, ordnen, verbinden.
            </p>
            <div className="mt-4 h-px bg-[#315341]/[.10]" />
            <p className="mt-3 text-xs leading-5 text-[#3d5b49]/[.50]">
              Ohne aus deinem Business ein weiteres Dashboard zu machen.
            </p>
          </div>

          <div className="absolute bottom-[15%] right-[7%] w-[230px] rotate-[1.5deg] rounded-[8px_20px_9px_18px] border border-[#315341]/[.08] bg-[#e6ebdf]/[.76] p-4 shadow-[0_14px_42px_rgba(42,70,52,.07)]">
            <p className="text-[7px] uppercase tracking-[.16em] text-[#55705c]/[.52]">HEUTE</p>
            <p className="mt-2 font-serif text-xl font-light text-[#244735]">Nur das, was gerade zählt.</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-[6px] uppercase tracking-[.16em] text-[#405a49]/[.25]">
        YORI · A SAIMÔR CREATION
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
        eyebrow="ANKOMMEN"
        title={`Hallo ${clientName}. Was ist das hier eigentlich?`}
        body="Bevor wir dir irgendetwas vorschlagen, soll die Idee selbst verständlich sein. Deine Website ist dabei nur ein möglicher Anfang – nicht der Mittelpunkt."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {WORLD_QA.map((item, index) => (
          <article
            key={item.q}
            className="rounded-[22px_8px_24px_10px] border border-[#315341]/[.09] bg-[#fbf7ee]/[.80] p-5 shadow-[0_18px_52px_rgba(49,83,65,.045)] sm:p-6"
          >
            <span className="text-[7px] uppercase tracking-[.17em] text-[#a0834c]">0{index + 1}</span>
            <h2 className="mt-3 font-serif text-2xl font-light leading-tight text-[#244735]">{item.q}</h2>
            <p className="mt-4 text-sm leading-7 text-[#486151]/[.62]">{item.a}</p>
          </article>
        ))}
      </div>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onExplore}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#315341] px-6 text-sm font-semibold text-[#f7f1e5]"
        >
          Was meine World können könnte
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onExample}
          className="min-h-12 rounded-full border border-[#315341]/[.12] px-6 text-sm text-[#315341]/[.70]"
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
        eyebrow="DEINE WORLD"
        title="Nicht mehr Oberfläche. Mehr Zusammenhang."
        body="YORI soll nicht vor dir stehen. Es soll im Hintergrund dafür sorgen, dass Dinge, die zu deinem Business gehören, nicht voneinander getrennt herumliegen."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {WORLD_OBJECTS.map(({ eyebrow, title, body, icon: Icon }, index) => (
          <article
            key={eyebrow}
            className={`relative overflow-hidden rounded-[24px_8px_26px_10px] border p-6 shadow-[0_20px_60px_rgba(49,83,65,.05)] ${
              index === 1 ? 'border-[#a89162]/[.12] bg-[#f5ecdc]/[.82]' : 'border-[#315341]/[.09] bg-[#faf6ed]/[.82]'
            }`}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[7px] uppercase tracking-[.17em] text-[#a0834c]">{eyebrow}</p>
                <h2 className="mt-3 max-w-md font-serif text-2xl font-light leading-tight text-[#244735]">{title}</h2>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#315341]/[.09] bg-white/[.46] text-[#476452]">
                <Icon className="h-4 w-4" strokeWidth={1.6} />
              </span>
            </div>
            <p className="mt-5 text-sm leading-7 text-[#486151]/[.60]">{body}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-[26px_9px_28px_11px] border border-[#315341]/[.09] bg-[#e1e8dc]/[.58] p-6 sm:p-8">
        <p className="text-[7px] uppercase tracking-[.17em] text-[#6d7b60]/[.62]">DER EIGENTLICHE GEDANKE</p>
        <p className="mt-4 max-w-3xl font-serif text-3xl font-light leading-tight text-[#244735] sm:text-4xl">
          Deine World soll nicht mehr von dir verlangen. Sie soll weniger verlieren lassen.
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#486151]/[.58]">
          Weniger Kontext, der verschwindet. Weniger Ideen, die wieder neu erklärt werden müssen. Weniger Entscheidungen, die zwischen fünf Tools hängen bleiben.
        </p>
        <button
          type="button"
          onClick={onExample}
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#315341]"
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
        eyebrow="EIN BEISPIEL"
        title="Deine Website ist ein erster Faden – nicht das ganze Bild."
        body="Damit die Idee nicht abstrakt bleibt, nehmen wir einen kleinen Teil deines aktuellen Auftritts. Nicht um ihn zu bewerten, sondern um zu zeigen, wie YORI aus Beobachtung einen nächsten Gedanken machen könnte."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
        <div className="grid gap-4">
          <article className="rounded-[22px_8px_24px_10px] border border-[#315341]/[.09] bg-[#fbf7ee]/[.82] p-6">
            <p className="text-[7px] uppercase tracking-[.17em] text-[#a0834c]">WAS WIR BEWAHREN WÜRDEN</p>
            <h2 className="mt-3 font-serif text-2xl font-light leading-tight text-[#244735]">Deine starke Schwelle.</h2>
            <p className="mt-4 text-sm leading-7 text-[#486151]/[.60]">
              „Du stehst an der Schwelle zu einer neuen Identität.“ trägt bereits Haltung. Eine gute World muss nicht alles verändern – sie sollte erkennen, was schon trägt.
            </p>
          </article>

          <article className="rounded-[10px_24px_12px_26px] border border-[#9c8657]/[.11] bg-[#f1e8d8]/[.78] p-6">
            <p className="text-[7px] uppercase tracking-[.17em] text-[#9a7d44]">WAS YORI DARAUS MACHEN KÖNNTE</p>
            <h2 className="mt-3 font-serif text-2xl font-light leading-tight text-[#244735]">Einen Gedanken klarer führen.</h2>
            <p className="mt-4 text-sm leading-7 text-[#486151]/[.60]">
              Wenn zwei Wege gleichzeitig Aufmerksamkeit wollen, könnte YORI einen davon zuerst führen lassen – und den anderen bewusst leiser halten. Nicht weil etwas falsch ist, sondern damit deine Wirkung schneller ankommt.
            </p>
          </article>
        </div>

        <article className="overflow-hidden rounded-[9px_26px_11px_24px] border border-[#315341]/[.10] bg-[#f8f3e8] text-[#193b2e] shadow-[0_28px_80px_rgba(49,83,65,.08)]">
          <div className="flex items-center justify-between border-b border-[#315341]/[.08] px-5 py-4">
            <span className="font-serif text-[13px] tracking-[.17em]">LUANA LUMINA</span>
            <span className="text-[7px] uppercase tracking-[.14em] text-[#496350]/[.40]">GEDANKENSKIZZE</span>
          </div>
          <div className="p-6 sm:p-9">
            <p className="text-[6px] uppercase tracking-[.17em] text-[#61725d]/[.45]">
              BEWUSSTSEINSTRAINING · IDENTITÄTSSHIFT · ENERGIEARBEIT
            </p>
            <h3 className="mt-6 max-w-xl font-serif text-4xl font-light leading-[.94] tracking-[-.04em] sm:text-5xl">
              Du stehst an der Schwelle zu einer neuen Identität.
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#486151]/[.52]">
              Ein Satz führt. Ein Weg ist sichtbar. Der zweite bleibt da, ohne mit dem ersten zu konkurrieren.
            </p>
            <div className="mt-8 w-full rounded-full bg-[#315341] px-5 py-3.5 text-center text-sm font-semibold text-[#f7f1e5] sm:w-[230px]">
              Angebote entdecken
            </div>
            <div className="mt-3 px-1 py-2 text-sm text-[#3d5b49]/[.48] sm:ml-5 sm:inline-block">
              Identitätsshift Guide
            </div>
          </div>
        </article>
      </div>

      <div className="mt-10 rounded-[24px_8px_26px_10px] border border-[#315341]/[.08] bg-white/[.38] p-6 sm:p-8">
        <p className="font-serif text-2xl font-light leading-tight text-[#244735]">
          Das Entscheidende ist nicht dieser eine Website-Punkt.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#486151]/[.58]">
          Entscheidend wäre, dass deine World später versteht, warum etwas wichtig war, was daraus entstanden ist und wann es wieder auf deinen Tisch gehört.
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#315341]"
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
        eyebrow="WEITER"
        title="Was würde das für dich praktisch bedeuten?"
        body="Noch bevor irgendetwas gebaut wird, sind diese Fragen wichtiger als weitere Features."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {NEXT_QA.map((item, index) => (
          <article
            key={item.q}
            className="rounded-[22px_8px_24px_10px] border border-[#315341]/[.09] bg-[#fbf7ee]/[.80] p-5 shadow-[0_18px_52px_rgba(49,83,65,.04)] sm:p-6"
          >
            <span className="text-[7px] uppercase tracking-[.17em] text-[#a0834c]">FRAGE 0{index + 1}</span>
            <h2 className="mt-3 font-serif text-2xl font-light leading-tight text-[#244735]">{item.q}</h2>
            <p className="mt-4 text-sm leading-7 text-[#486151]/[.60]">{item.a}</p>
          </article>
        ))}
      </div>

      <article className="mt-8 overflow-hidden rounded-[28px_10px_30px_12px] border border-[#315341]/[.10] bg-[linear-gradient(135deg,rgba(225,232,220,.82),rgba(245,238,224,.86))] p-6 shadow-[0_24px_72px_rgba(49,83,65,.06)] sm:p-9">
        {decision ? (
          <div className="max-w-3xl">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#315341]/[.10] bg-[#f8f3e8] text-[#315341]">
              <Check className="h-4 w-4" />
            </span>
            <p className="mt-5 text-[7px] uppercase tracking-[.17em] text-[#8c7447]">DEINE ANTWORT IST NOTIERT</p>
            <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-[#244735] sm:text-4xl">
              {decision === 'yes'
                ? 'Dann bauen wir von hier weiter.'
                : 'Dann ändern wir zuerst die Richtung.'}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#486151]/[.58]">
              Deine World erinnert sich an diese Entscheidung. Für den nächsten Schritt reicht eine kurze Nachricht – wir müssen daraus heute noch kein großes Projekt machen.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl">
            <p className="text-[7px] uppercase tracking-[.17em] text-[#8c7447]">EINE LETZTE FRAGE</p>
            <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-[#244735] sm:text-4xl">
              Fühlt sich diese Idee grundsätzlich nach etwas an, das dir Arbeit abnehmen könnte?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#486151]/[.58]">
              Nicht: Ist schon alles perfekt? Sondern nur: Ist die Richtung interessant genug, um daraus einen echten kleinen nächsten Schritt zu machen?
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => void onChoose('yes')}
                className="min-h-14 rounded-full bg-[#315341] px-5 text-sm font-semibold text-[#f7f1e5] transition hover:bg-[#294737] disabled:cursor-wait disabled:opacity-60"
              >
                Ja, das möchte ich weiterdenken
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void onChoose('change')}
                className="min-h-14 rounded-full border border-[#315341]/[.14] bg-white/[.28] px-5 text-sm text-[#34513f]/[.70] disabled:cursor-wait disabled:opacity-60"
              >
                Die Richtung braucht noch etwas anderes
              </button>
            </div>
          </div>
        )}

        {error ? (
          <p className="mt-5 text-xs text-[#9a5649]">Konnte gerade nicht gespeichert werden. Bitte nochmal versuchen.</p>
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
    <header className="max-w-[860px]">
      <p className="text-[8px] font-semibold uppercase tracking-[.15em] text-[#9a7d44]">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-[clamp(3rem,8vw,5.5rem)] font-light leading-[.94] tracking-[-.052em] text-[#214233]">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-[#486151]/[.60] sm:text-[15px]">{body}</p>
      <span className="mt-6 block h-px w-16 bg-[#b89a60]/[.58]" />
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
      <div className="absolute inset-0 opacity-[.10] bg-[repeating-linear-gradient(113deg,rgba(49,83,65,.018)_0px,rgba(49,83,65,.018)_1px,transparent_1px,transparent_6px)]" />
    </div>
  );
}
