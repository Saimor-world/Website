'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Check,
  House,
  Lightbulb,
  Sparkles,
  Waves,
} from 'lucide-react';
import YoriMark from '@/components/YoriMark';
import type { ClientWorldConfig } from '@/lib/client-world';

type Decision = 'yes' | 'change';
type RoomId = 'heute' | 'auftritt' | 'ideen' | 'weg';

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
  { id: 'heute', label: 'Heute', hint: 'Schreibtisch', icon: House },
  { id: 'auftritt', label: 'Auftritt', hint: 'Außenwirkung', icon: Waves },
  { id: 'ideen', label: 'Ideen', hint: 'Gedankenraum', icon: Lightbulb },
  { id: 'weg', label: 'Weg', hint: 'Entscheidung', icon: Sparkles },
];

export default function LuanaYoriPreview({ world, initialDecision = null }: Props) {
  const [entered, setEntered] = useState(Boolean(initialDecision));
  const [arrivalLeaving, setArrivalLeaving] = useState(false);
  const [room, setRoom] = useState<RoomId>('heute');
  const [decision, setDecision] = useState<Decision | null>(initialDecision);
  const [savingDecision, setSavingDecision] = useState(false);
  const [decisionError, setDecisionError] = useState(false);
  const [paperOpen, setPaperOpen] = useState(false);

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
    <main className="min-h-[100svh] overflow-hidden bg-[#100d0b] text-[#f3ecdf]">
      <div className="relative min-h-[100svh]">
        <AmbientRoom />

        <aside className="fixed inset-y-0 left-0 z-40 hidden w-[200px] flex-col border-r border-[#f4e2c6]/[.07] bg-[linear-gradient(180deg,rgba(30,22,15,.64),rgba(20,15,10,.48))] px-[15px] pb-5 pt-6 shadow-[18px_0_70px_rgba(0,0,0,.22)] backdrop-blur-[22px] lg:flex">
          <button
            type="button"
            onClick={() => setRoom('heute')}
            className="flex items-center gap-3 px-2 pb-7 text-left"
          >
            <YoriMark className="h-8 w-8 text-[#d6ad6d]" title="YORI" />
            <span className="grid">
              <b className="font-serif text-[22px] font-semibold tracking-[.02em] text-[#f4ecdf]">LUANA</b>
              <small className="text-[8px] uppercase tracking-[.18em] text-[#d6ad6d]">YORI WORLD</small>
            </span>
          </button>

          <nav className="grid gap-1.5" aria-label="Luana World Bereiche">
            {ROOMS.map(({ id, label, hint, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRoom(id)}
                aria-current={room === id ? 'page' : undefined}
                className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 text-left text-[12px] transition ${
                  room === id
                    ? 'border-[#d6ad6d]/[.14] bg-[linear-gradient(90deg,rgba(214,173,109,.10),transparent_72%)] text-[#f4ecdf] shadow-[inset_2px_0_#d6ad6d]'
                    : 'border-transparent text-[#f4ecdf]/[.58] hover:bg-white/[.035] hover:text-[#f4ecdf]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.7} />
                <span className="grid">
                  <strong className="font-medium">{label}</strong>
                  <small className="mt-0.5 text-[8px] text-[#f4ecdf]/[.34]">{hint}</small>
                </span>
              </button>
            ))}
          </nav>

          <section className="mx-2 mt-8 rounded-xl border border-[#f4e2c6]/[.09] bg-white/[.025] p-3.5">
            <span className="flex items-center gap-2 text-[10px] text-[#eee2d1]">
              <i className="h-1.5 w-1.5 rounded-full bg-[#d6ad6d] shadow-[0_0_12px_rgba(214,173,109,.5)]" />
              Entwurf
            </span>
            <small className="mt-1.5 block text-[8px] leading-4 text-[#f4ecdf]/[.42]">
              {decision ? 'Keine verbundenen Quellen. Schreibtisch frei.' : 'Keine verbundenen Quellen. Eine Entscheidung wartet.'}
            </small>
          </section>

          <div className="mt-auto border-t border-[#f4e2c6]/[.08] px-2 pt-4">
            <div className="grid grid-cols-[36px_1fr] items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d6ad6d] font-serif text-sm font-semibold text-[#261b12]">
                L
              </span>
              <span className="grid min-w-0">
                <b className="truncate text-[11px] text-[#f4ecdf]">{world.clientName}</b>
                <small className="text-[8px] text-[#f4ecdf]/[.42]">persönliche World</small>
              </span>
            </div>
            <div className="mt-4 text-[6px] uppercase tracking-[.16em] text-[#f4ecdf]/[.22]">
              YORI · A SAIMÔR CREATION
            </div>
          </div>
        </aside>

        <section className="relative z-10 min-h-[100svh] lg:pl-[200px]">
          <header className="mx-auto flex h-[72px] w-[calc(100%-32px)] max-w-[1380px] items-center justify-between border-b border-[#f4e2c6]/[.08] lg:w-[calc(100%-72px)]">
            <div className="flex items-center gap-3 lg:hidden">
              <YoriMark className="h-7 w-7 text-[#d6ad6d]" title="YORI" />
              <div>
                <div className="font-serif text-[15px] tracking-[.12em]">LUANA</div>
                <div className="text-[6px] uppercase tracking-[.18em] text-[#d6ad6d]">YORI WORLD</div>
              </div>
            </div>

            <div className="hidden text-[9px] uppercase tracking-[.16em] text-[#f4ecdf]/[.34] lg:block">
              {room === 'heute' ? 'SCHREIBTISCH' : room === 'auftritt' ? 'AUFTRITT' : room === 'ideen' ? 'IDEENRAUM' : 'NÄCHSTER WEG'}
            </div>

            <div className="ml-auto flex items-center gap-2 text-[8px] text-[#f4ecdf]/[.38]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6ad6d]" />
              PERSÖNLICHER ENTWURF
            </div>
          </header>

          <div className="mx-auto min-h-[calc(100svh-72px)] w-[calc(100%-32px)] max-w-[1280px] pb-[110px] pt-8 lg:w-[calc(100%-96px)] lg:pb-12 lg:pt-12">
            {room === 'heute' ? (
              <DeskRoom
                clientName={world.clientName}
                decision={decision}
                onOpenPaper={() => setPaperOpen(true)}
                onOpenAppearance={() => setRoom('auftritt')}
                onOpenDecision={() => setRoom('weg')}
              />
            ) : room === 'auftritt' ? (
              <AppearanceRoom onBack={() => setRoom('heute')} onDecision={() => setRoom('weg')} />
            ) : room === 'ideen' ? (
              <IdeasRoom onBack={() => setRoom('heute')} />
            ) : (
              <DecisionRoom
                decision={decision}
                saving={savingDecision}
                error={decisionError}
                onChoose={(value) => {
                  void chooseDecision(value);
                }}
                onBack={() => setRoom('heute')}
              />
            )}
          </div>
        </section>

        <nav
          className="fixed bottom-[max(8px,env(safe-area-inset-bottom))] left-1/2 z-50 flex min-h-[74px] w-[calc(100%-16px)] -translate-x-1/2 gap-0.5 rounded-[20px] border border-[#315341]/[.12] bg-[#f3eee4]/[.93] p-1.5 shadow-[0_14px_45px_rgba(0,0,0,.18)] backdrop-blur-xl lg:hidden"
          aria-label="Luana World mobile Bereiche"
        >
          {ROOMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setRoom(id)}
              aria-current={room === id ? 'page' : undefined}
              className={`flex min-h-[62px] flex-1 flex-col items-center justify-center gap-1 rounded-[14px] px-1 text-[9px] transition ${
                room === id
                  ? 'bg-[#dde5da] text-[#1d4c3e]'
                  : 'text-[#52685a]/[.58] hover:bg-white/[.45] hover:text-[#294737]'
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
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

        {paperOpen ? (
          <PaperSurface
            decision={decision}
            saving={savingDecision}
            error={decisionError}
            onClose={() => setPaperOpen(false)}
            onChoose={async (value) => {
              const saved = await chooseDecision(value);
              if (saved) {
                setPaperOpen(false);
                setRoom('heute');
              }
            }}
          />
        ) : null}
      </div>

      <style>{`
        @keyframes luana-arrival-in {
          from { opacity: 0; transform: scale(1.01); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes luana-paper-in {
          from { opacity: 0; transform: translateY(18px) scale(.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes luana-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
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
        .luana-paper-backdrop {
          animation: luana-backdrop-in .24s ease-out both;
        }
        .luana-paper-surface {
          animation: luana-paper-in .34s cubic-bezier(.22,.72,.22,1) both;
          transform-origin: 50% 80%;
        }
        @media (min-width: 640px) {
          @keyframes luana-paper-in {
            from { opacity: 0; transform: translate(-50%, calc(-50% + 18px)) scale(.985); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .luana-arrival,
          .luana-paper-backdrop,
          .luana-paper-surface {
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
      className={`luana-arrival fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#efe9dc] px-5 py-8 text-[#193d2f] ${leaving ? 'luana-arrival--leaving' : ''}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(255,255,255,.92),transparent_25%),radial-gradient(circle_at_16%_88%,rgba(78,109,76,.18),transparent_30%),linear-gradient(180deg,#f0eadf_0%,#e8e0d2_100%)]" />
      <div aria-hidden="true" className="absolute -right-[18vw] top-[8vh] h-[62vw] max-h-[720px] w-[62vw] max-w-[720px] rounded-full border border-[#294d3c]/[.07]" />
      <div aria-hidden="true" className="absolute -right-[7vw] top-[18vh] h-[38vw] max-h-[440px] w-[38vw] max-w-[440px] rounded-full border border-[#294d3c]/[.08]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <YoriMark className="h-8 w-8 text-[#244a38]" title="YORI" />
            <div>
              <p className="font-serif text-[16px] tracking-[.16em] text-[#183b2d]">LUANA LUMINA</p>
              <p className="mt-1 text-[7px] uppercase tracking-[.2em] text-[#59705e]/[.48]">
                DEINE WORLD · YORI
              </p>
            </div>
          </div>

          <p className="mt-12 text-[7px] uppercase tracking-[.22em] text-[#6b755e]/[.58] sm:text-[8px]">
            BEWUSSTSEINSTRAINING · IDENTITÄTSSHIFT · ENERGIEARBEIT
          </p>
          <h1 className="mt-5 max-w-[11ch] font-serif text-[clamp(3.4rem,12vw,7.6rem)] font-light leading-[.9] tracking-[-.055em]">
            Du stehst an der Schwelle zu einer neuen Identität.
          </h1>
          <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#365444]/[.58]">
            Hier beginnt deine World. Dein Auftritt ist der erste Faden darin.
          </p>

          <button
            type="button"
            onClick={onEnter}
            disabled={leaving}
            className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#294737] px-6 py-3 text-sm font-semibold text-[#f5f0e4] shadow-[0_14px_34px_rgba(34,67,49,.16)] transition hover:-translate-y-0.5 hover:bg-[#213b2f] disabled:cursor-wait disabled:opacity-70"
          >
            Meine World öffnen
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-5 text-[10px] text-[#496451]/[.34]">
            persönlicher Entwurf · keine verbundenen Konten
          </p>
        </div>

        <div className="relative hidden min-h-[560px] lg:block" aria-hidden="true">
          <div className="absolute right-[4%] top-[5%] h-[68%] w-[68%] rounded-[49%_51%_48%_52%/58%_48%_52%_42%] bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,.94)_0%,rgba(232,230,217,.86)_38%,rgba(177,190,163,.64)_100%)] shadow-[0_35px_90px_rgba(43,69,51,.16)]" />
          <div className="absolute bottom-[6%] left-[4%] h-[36%] w-[48%] rotate-[-4deg] rounded-[52%_48%_44%_56%/58%_52%_48%_42%] bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,.94)_0%,rgba(225,224,207,.82)_44%,rgba(168,185,156,.62)_100%)] shadow-[0_28px_65px_rgba(43,69,51,.14)]" />
          <div className="absolute left-[12%] top-[23%] w-[250px] rotate-[-1deg] border border-[#315341]/[.11] bg-[#fffaf0]/[.82] p-5 shadow-[0_18px_55px_rgba(42,70,52,.09)] backdrop-blur-md">
            <p className="text-[7px] uppercase tracking-[.18em] text-[#58705e]/[.42]">AUF DEINEM TISCH</p>
            <p className="mt-3 font-serif text-2xl font-light leading-tight text-[#214432]">
              Eine Entscheidung wartet.
            </p>
            <div className="mt-4 h-px bg-[#315341]/[.10]" />
            <p className="mt-3 text-xs leading-5 text-[#3d5b49]/[.48]">
              Welcher Weg soll auf deiner Website zuerst führen?
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-[6px] uppercase tracking-[.16em] text-[#405a49]/[.25]">
        YORI · A SAIMÔR CREATION
      </div>
    </section>
  );
}

function DeskRoom({
  clientName,
  decision,
  onOpenPaper,
  onOpenAppearance,
  onOpenDecision,
}: {
  clientName: string;
  decision: Decision | null;
  onOpenPaper: () => void;
  onOpenAppearance: () => void;
  onOpenDecision: () => void;
}) {
  return (
    <section aria-label="YORI Arbeitsraum">
      <header className="max-w-[760px]">
        <p className="text-[8px] uppercase tracking-[.18em] text-[#d6ad6d]/[.70]">HEUTE · SCHREIBTISCH</p>
        <h1 className="mt-3 font-serif text-[clamp(3.2rem,9vw,6rem)] font-medium leading-[.92] tracking-[-.055em] text-[#f4ecdf]">
          Hallo {clientName}.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f4ecdf]/[.50]">
          Hier liegt nur, was deine Aufmerksamkeit braucht.
        </p>
        <span className="mt-5 block h-px w-16 bg-[#d6ad6d]/[.62]" />
        <div className="mt-5 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#d6ad6d] shadow-[0_0_12px_rgba(214,173,109,.45)]" />
          <div>
            <b className="block text-[10px] font-medium text-[#eee2d1]">
              {decision ? 'Entscheidung gespeichert' : '1 Sache wartet auf dich'}
            </b>
            <small className="text-[8px] text-[#f4ecdf]/[.34]">
              Entwurf · nur bekannter Website-Kontext
            </small>
          </div>
        </div>
      </header>

      <div className="relative mt-10 min-h-[470px] overflow-hidden rounded-[28px_8px_30px_10px] border border-[#f4e2c6]/[.08] bg-[linear-gradient(180deg,rgba(65,49,36,.50),rgba(28,21,16,.62))] p-5 shadow-[0_32px_90px_rgba(0,0,0,.25)] sm:p-8">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_76%_20%,rgba(214,173,109,.08),transparent_28%),radial-gradient(circle_at_18%_85%,rgba(87,120,92,.08),transparent_30%)]" />

        {decision ? (
          <div className="relative z-10 grid min-h-[320px] w-full max-w-[700px] place-items-center rounded-[18px_6px_20px_7px] border border-[#f4e2c6]/[.07] bg-white/[.025] p-8 text-center backdrop-blur-sm">
            <div className="max-w-md">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-[#d6ad6d]/[.18] bg-[#d6ad6d]/[.08] text-[#d6ad6d]">
                <Check className="h-4 w-4" />
              </span>
              <p className="mt-5 text-[7px] uppercase tracking-[.18em] text-[#d6ad6d]/[.54]">SCHREIBTISCH FREI</p>
              <h2 className="mt-3 font-serif text-3xl font-light leading-tight text-[#f4ecdf]">
                Die Entscheidung ist notiert.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[#f4ecdf]/[.42]">
                Erledigte Dinge bleiben nicht liegen. Wenn wieder etwas deine Aufmerksamkeit braucht, kommt es zurück auf den Tisch.
              </p>
              <button
                type="button"
                onClick={onOpenDecision}
                className="mt-6 text-[10px] text-[#d6ad6d]/[.66] underline decoration-[#d6ad6d]/[.24] underline-offset-4"
              >
                Entscheidung ansehen
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenPaper}
            className="group relative z-10 block min-h-[320px] w-full max-w-[700px] rotate-[-.35deg] border border-[#6f6658]/[.18] bg-[#fff8ec] p-6 text-left text-[#2c4336] shadow-[0_28px_80px_rgba(0,0,0,.18)] transition hover:-translate-y-1 hover:rotate-0 sm:p-8"
          >
            <p className="text-[7px] uppercase tracking-[.18em] text-[#7a6657]/[.46]">AUF DEINEM TISCH</p>
            <h2 className="mt-5 max-w-xl font-serif text-3xl font-light leading-[1.02] tracking-[-.035em] sm:text-4xl">
              Der Einstieg deiner Website wartet auf eine Entscheidung.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#5d665e]/[.58]">
              Deine Haltung bleibt. Offen ist nur, welcher Weg im ersten Moment führt: Angebot oder Guide.
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-[#5b665e]/[.10] pt-4">
              <span className="text-[10px] text-[#4b5f50]/[.46]">Öffnen und entscheiden</span>
              <ArrowRight className="h-4 w-4 text-[#294737]/[.42] transition group-hover:translate-x-1" />
            </div>
          </button>
        )}

        <aside className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2 lg:absolute lg:right-8 lg:top-8 lg:mt-0 lg:w-[290px] lg:grid-cols-1">
          <button
            type="button"
            onClick={onOpenAppearance}
            className="rounded-xl border border-[#f4e2c6]/[.08] bg-white/[.035] p-4 text-left backdrop-blur-sm transition hover:bg-white/[.055]"
          >
            <span className="text-[7px] uppercase tracking-[.15em] text-[#d6ad6d]/[.54]">AUFTRITT</span>
            <p className="mt-2 font-serif text-xl font-light text-[#f4ecdf]">Was bleibt. Was klarer wird.</p>
          </button>

          <button
            type="button"
            onClick={onOpenDecision}
            className="rounded-xl border border-[#f4e2c6]/[.08] bg-white/[.035] p-4 text-left backdrop-blur-sm transition hover:bg-white/[.055]"
          >
            <span className="text-[7px] uppercase tracking-[.15em] text-[#d6ad6d]/[.54]">NÄCHSTER WEG</span>
            <p className="mt-2 font-serif text-xl font-light text-[#f4ecdf]">Eine Entscheidung reicht.</p>
          </button>
        </aside>

        <p className="relative z-10 mt-7 text-[10px] italic text-[#f4ecdf]/[.26] lg:absolute lg:bottom-7 lg:right-8">
          Der Schreibtisch darf ruhig bleiben.
        </p>
      </div>
    </section>
  );
}

function AppearanceRoom({
  onBack,
  onDecision,
}: {
  onBack: () => void;
  onDecision: () => void;
}) {
  return (
    <section>
      <RoomIntro
        eyebrow="AUFTRITT"
        title="Luana bleibt vor dem System."
        body="YORI verändert nicht deine Haltung. Es macht klarer, was zuerst gesehen und welcher Weg zuerst gegangen wird."
      />

      <div className="mt-9 grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
        <article className="rounded-[7px_24px_9px_20px] border border-[#f4e2c6]/[.08] bg-[#fff8ec] p-6 text-[#2c4336] shadow-[0_24px_65px_rgba(0,0,0,.16)] sm:p-8">
          <p className="text-[7px] uppercase tracking-[.16em] text-[#7a6657]/[.44]">WAS BLEIBT</p>
          <h2 className="mt-4 font-serif text-3xl font-light leading-tight">Die Schwelle ist der starke Satz.</h2>
          <p className="mt-4 text-sm leading-7 text-[#5d665e]/[.56]">
            „Du stehst an der Schwelle zu einer neuen Identität.“ trägt bereits Haltung und Richtung. Er braucht keinen Ersatz, sondern mehr Raum.
          </p>
        </article>

        <article className="overflow-hidden rounded-[7px_24px_9px_20px] border border-[#f4e2c6]/[.08] bg-[#f6f0e3] text-[#193b2e] shadow-[0_24px_65px_rgba(0,0,0,.16)]">
          <div className="flex items-center justify-between border-b border-[#315341]/[.09] px-5 py-4">
            <span className="font-serif text-[13px] tracking-[.17em]">LUANA LUMINA</span>
            <span className="text-[7px] uppercase tracking-[.14em] text-[#496350]/[.40]">EINSTIEG</span>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-[6px] uppercase tracking-[.17em] text-[#61725d]/[.45]">
              BEWUSSTSEINSTRAINING · IDENTITÄTSSHIFT · ENERGIEARBEIT
            </p>
            <h3 className="mt-5 max-w-lg font-serif text-4xl font-light leading-[.94] tracking-[-.04em] sm:text-5xl">
              Du stehst an der Schwelle zu einer neuen Identität.
            </h3>
            <div className="mt-8 w-full rounded-full bg-[#294737] px-5 py-3.5 text-center text-sm font-semibold text-[#f5f0e4] sm:w-[230px]">
              Angebote entdecken
            </div>
            <div className="mt-3 px-1 py-2 text-sm text-[#3d5b49]/[.48] sm:ml-5 sm:inline-block">
              Identitätsshift Guide
            </div>
          </div>
        </article>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <button type="button" onClick={onDecision} className="inline-flex items-center gap-2 text-[11px] font-medium text-[#d6ad6d]/[.72]">
          Richtung entscheiden <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <button type="button" onClick={onBack} className="text-[10px] text-[#f4ecdf]/[.38] underline underline-offset-4">
          zurück zum Schreibtisch
        </button>
      </div>
    </section>
  );
}

function IdeasRoom({ onBack }: { onBack: () => void }) {
  return (
    <section>
      <RoomIntro
        eyebrow="IDEEN"
        title="Nicht jeder Gedanke muss sofort Arbeit werden."
        body="Eine Idee darf in der World liegen bleiben, bis sie wieder relevant wird. Dann kommt sie mit ihrem Kontext zurück."
      />

      <div className="mt-9 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <article className="rotate-[.25deg] rounded-[6px_26px_8px_22px] border border-[#6f6658]/[.16] bg-[#fff8ec] p-6 text-[#2c4336] shadow-[0_28px_80px_rgba(0,0,0,.18)] sm:p-8">
          <p className="text-[7px] uppercase tracking-[.18em] text-[#7a6657]/[.46]">IDEENBLATT</p>
          <h2 className="mt-5 font-serif text-3xl font-light leading-tight sm:text-4xl">
            Was wäre, wenn Website und Content nicht jedes Mal bei null anfangen?
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5d665e]/[.58]">
            Derselbe Gedanke kann später wieder für Website, Social oder einen Guide auftauchen – ohne dass du den Zusammenhang jedes Mal neu erklären musst.
          </p>
          <p className="mt-8 text-[7px] uppercase tracking-[.15em] text-[#7a6657]/[.32]">
            ENTWURF · KEINE VERBUNDENEN KANÄLE
          </p>
        </article>

        <article className="self-end rounded-[18px_5px_19px_6px] border border-[#f4e2c6]/[.08] bg-[#dfe7db]/[.14] p-6 backdrop-blur-sm sm:p-7">
          <p className="text-[7px] uppercase tracking-[.17em] text-[#d6ad6d]/[.54]">YORI HÄLT FEST</p>
          <p className="mt-4 font-serif text-2xl font-light leading-tight text-[#f4ecdf]">
            Ideen dürfen unfertig sein.
          </p>
          <p className="mt-4 text-sm leading-6 text-[#f4ecdf]/[.44]">
            Erst wenn sie wieder wichtig werden, kommen sie zurück auf den Tisch.
          </p>
        </article>
      </div>

      <button type="button" onClick={onBack} className="mt-7 text-[10px] text-[#f4ecdf]/[.38] underline underline-offset-4">
        zurück zum Schreibtisch
      </button>
    </section>
  );
}

function DecisionRoom({
  decision,
  saving,
  error,
  onChoose,
  onBack,
}: {
  decision: Decision | null;
  saving: boolean;
  error: boolean;
  onChoose: (value: Decision) => void | Promise<void>;
  onBack: () => void;
}) {
  return (
    <section>
      <RoomIntro
        eyebrow="NÄCHSTER WEG"
        title="Eine Entscheidung reicht."
        body="YORI darf Kontext vorbereiten. Die Entscheidung bleibt bei dir."
      />

      <article className="mt-9 max-w-3xl rounded-[7px_26px_9px_22px] border border-[#6f6658]/[.16] bg-[#fff8ec] p-6 text-[#2c4336] shadow-[0_28px_80px_rgba(0,0,0,.18)] sm:p-9">
        <p className="text-[7px] uppercase tracking-[.18em] text-[#7a6657]/[.44]">AUF DEINEM TISCH</p>
        <h2 className="mt-5 font-serif text-3xl font-light leading-tight sm:text-4xl">
          Welcher Weg soll auf deiner Website zuerst führen?
        </h2>
        <p className="mt-5 text-sm leading-7 text-[#5d665e]/[.56]">
          Für diesen Entwurf würden wir „Angebote entdecken“ führen und den Guide als ruhigeren zweiten Weg behalten.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => void onChoose('yes')}
            className={`min-h-14 px-5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
              decision === 'yes'
                ? 'bg-[#d8c289] text-[#23382d]'
                : 'bg-[#294737] text-[#f5f0e4] hover:bg-[#213b2f]'
            }`}
          >
            {decision === 'yes' ? 'Angebot führt · notiert' : 'Angebot soll führen'}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void onChoose('change')}
            className={`min-h-14 border px-5 text-sm transition disabled:cursor-wait disabled:opacity-60 ${
              decision === 'change'
                ? 'border-[#8c7652]/[.25] bg-[#eadfca] text-[#514733]'
                : 'border-[#315341]/[.14] text-[#34513f]/[.64]'
            }`}
          >
            {decision === 'change' ? 'Änderung gewünscht · notiert' : 'Ich würde es anders lösen'}
          </button>
        </div>

        {decision ? (
          <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#4e6355]/[.52]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Gespeichert. Deine World erinnert sich beim nächsten Besuch.
          </p>
        ) : error ? (
          <p className="mt-5 text-xs text-[#9a5649]">Konnte gerade nicht gespeichert werden. Bitte nochmal versuchen.</p>
        ) : null}
      </article>

      <button type="button" onClick={onBack} className="mt-7 text-[10px] text-[#f4ecdf]/[.38] underline underline-offset-4">
        zurück zum Schreibtisch
      </button>
    </section>
  );
}

function PaperSurface({
  decision,
  saving,
  error,
  onClose,
  onChoose,
}: {
  decision: Decision | null;
  saving: boolean;
  error: boolean;
  onClose: () => void;
  onChoose: (value: Decision) => void | Promise<void>;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Papier schließen"
        className="luana-paper-backdrop fixed inset-0 z-[80] bg-[#0b0806]/[.48] backdrop-blur-[6px]"
      />
      <section className="luana-paper-surface fixed inset-x-3 bottom-3 z-[90] max-h-[88svh] overflow-y-auto rounded-[8px_28px_10px_24px] border border-[#6f6658]/[.18] bg-[#fff8ec] p-6 text-[#2c4336] shadow-[0_36px_110px_rgba(0,0,0,.34)] sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(680px,calc(100%-40px))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:p-9">
        <div className="flex items-center justify-between">
          <p className="text-[7px] uppercase tracking-[.18em] text-[#7a6657]/[.44]">AUF DEINEM TISCH</p>
          <button type="button" onClick={onClose} className="text-[10px] text-[#5d665e]/[.44]">schließen</button>
        </div>

        <h2 className="mt-5 font-serif text-3xl font-light leading-tight sm:text-4xl">
          Der Einstieg deiner Website wartet auf eine Entscheidung.
        </h2>
        <p className="mt-5 text-sm leading-7 text-[#5d665e]/[.56]">
          Deine Haltung funktioniert bereits. Wir würden nur dafür sorgen, dass im ersten Moment ein Weg führt und der zweite ruhig daneben bestehen kann.
        </p>

        <div className="mt-7 border-y border-[#315341]/[.10] py-6">
          <p className="text-[7px] uppercase tracking-[.16em] text-[#61725d]/[.42]">UNSER VORSCHLAG</p>
          <p className="mt-3 font-serif text-2xl font-light">„Angebote entdecken“ führt.</p>
          <p className="mt-2 text-sm leading-6 text-[#5d665e]/[.50]">Der Identitätsshift Guide bleibt sichtbar, aber leiser.</p>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => void onChoose('yes')}
            className="min-h-14 bg-[#294737] px-5 text-sm font-semibold text-[#f5f0e4] disabled:opacity-60"
          >
            {decision === 'yes' ? 'Notiert · Angebot führt' : 'Passt so'}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void onChoose('change')}
            className="min-h-14 border border-[#315341]/[.14] px-5 text-sm text-[#34513f]/[.64] disabled:opacity-60"
          >
            {decision === 'change' ? 'Notiert · erst ändern' : 'Ich würde es ändern'}
          </button>
        </div>

        {error ? <p className="mt-4 text-xs text-[#9a5649]">Konnte gerade nicht gespeichert werden.</p> : null}
      </section>
    </>
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
      <p className="text-[8px] font-semibold uppercase tracking-[.14em] text-[#d6ad6d]/[.68]">{eyebrow}</p>
      <h1 className="mt-3 font-serif text-[clamp(3rem,8vw,5.3rem)] font-medium leading-[.94] tracking-[-.055em] text-[#f4ecdf]">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f4ecdf]/[.48]">{body}</p>
      <span className="mt-5 block h-px w-16 bg-[#d6ad6d]/[.58]" />
    </header>
  );
}

function AmbientRoom() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#18120d_0%,#0e0b08_72%,#0a0806_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_77%_18%,rgba(214,173,109,.10),transparent_28%),radial-gradient(circle_at_68%_80%,rgba(72,108,76,.08),transparent_34%),radial-gradient(circle_at_28%_30%,rgba(255,241,213,.035),transparent_24%)]" />
      <div className="absolute right-[7%] top-[9%] h-[52vh] w-[52vh] rounded-full border border-[#e3c892]/[.035]" />
      <div className="absolute right-[13%] top-[16%] h-[34vh] w-[34vh] rounded-full border border-[#e3c892]/[.04]" />
      <div className="absolute bottom-[-18%] right-[-8%] h-[52%] w-[48%] rounded-[50%] bg-[radial-gradient(circle,rgba(56,88,61,.10),transparent_67%)] blur-2xl" />
      <div className="absolute inset-0 opacity-[.12] bg-[repeating-linear-gradient(113deg,rgba(255,255,255,.012)_0px,rgba(255,255,255,.012)_1px,transparent_1px,transparent_5px)]" />
    </div>
  );
}
