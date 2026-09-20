'use client';

import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, House, MessageCircle, Sparkles, Waves } from 'lucide-react';
import YoriMark from '@/components/YoriMark';
import type { ClientWorldConfig } from '@/lib/client-world';

type Decision = 'yes' | 'change';

type Props = {
  world: ClientWorldConfig;
  initialDecision?: Decision | null;
};

type RoomId = 'heute' | 'auftritt' | 'ideen' | 'weg';

const ROOMS: Array<{
  id: RoomId;
  label: string;
  hint: string;
  title: string;
  body: string;
}> = [
  {
    id: 'heute',
    label: 'Heute',
    hint: 'was jetzt zählt',
    title: 'Der Einstieg bekommt Ruhe.',
    body: 'Die Haltung bleibt. Wir ordnen nur, was zuerst gesehen wird und welcher Weg wirklich wichtig ist.',
  },
  {
    id: 'auftritt',
    label: 'Auftritt',
    hint: 'deine Außenwirkung',
    title: 'Luana bleibt vor dem System.',
    body: 'Die World trägt deine Sprache und deine Atmosphäre. YORI hält die Arbeit dahinter zusammen, ohne sich davorzustellen.',
  },
  {
    id: 'ideen',
    label: 'Ideen',
    hint: 'noch nicht fertig',
    title: 'Gedanken müssen nicht sofort Aufgaben werden.',
    body: 'Sie können liegen, wachsen und später wieder auftauchen – mit dem Kontext, aus dem sie entstanden sind.',
  },
  {
    id: 'weg',
    label: 'Nächster Weg',
    hint: 'eine Entscheidung',
    title: 'Ein klarer Schritt reicht.',
    body: 'Nicht fünf gleich laute Optionen. Erst eine Entscheidung, dann öffnet sich der nächste Raum.',
  },
];

export default function LuanaYoriPreview({ world, initialDecision = null }: Props) {
  const [room, setRoom] = useState<RoomId>('heute');
  const [decision, setDecision] = useState<Decision | null>(initialDecision);
  const [savingDecision, setSavingDecision] = useState(false);
  const [decisionError, setDecisionError] = useState(false);
  const activeRoom = ROOMS.find((item) => item.id === room) ?? ROOMS[0];

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
    <main className="relative overflow-hidden bg-[#efe9dc] text-[#18362b] selection:bg-[#7b8d6a]/[.25]">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-[#244a38]/[.10]">
        <LuanaGardenScene hero />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1480px] flex-col px-5 pb-8 pt-[calc(1rem+env(safe-area-inset-top))] sm:px-9 sm:pb-10 lg:px-14">
          <header className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#294d3c]/[.12] bg-white/[.46] shadow-[0_10px_36px_rgba(38,66,50,.07)]">
                <YoriMark className="h-6 w-6 text-[#244a38]" title="Luana World" />
              </span>
              <div className="min-w-0">
                <div className="truncate font-serif text-[15px] tracking-[.18em] text-[#183b2d] sm:text-base">
                  LUANA LUMINA
                </div>
                <div className="mt-1 truncate font-mono text-[6px] uppercase tracking-[.17em] text-[#385746]/[.45] sm:text-[7px] sm:tracking-[.2em]">
                  DEINE WORLD · YORI
                </div>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="font-mono text-[7px] uppercase tracking-[.18em] text-[#385746]/[.40]">
                BY SAIMÔR
              </div>
              <div className="mt-1 hidden text-[10px] text-[#385746]/[.42] sm:block">
                persönliche Preview
              </div>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-10 pb-12 pt-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-8 lg:pb-16 lg:pt-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 font-mono text-[7px] uppercase tracking-[.22em] text-[#6d765a]/[.58] sm:text-[8px] sm:tracking-[.27em]">
                <span className="h-px w-8 bg-[#667359]/[.35]" />
                BEWUSSTSEINSTRAINING · IDENTITÄTSSHIFT · ENERGIEARBEIT
              </div>

              <h1 className="mt-7 max-w-[11ch] font-serif text-[clamp(3.45rem,15vw,6rem)] font-light leading-[.9] tracking-[-.055em] text-[#183a2d] sm:max-w-[12ch] lg:text-[clamp(5.2rem,7.3vw,8.6rem)]">
                Du stehst an der Schwelle zu einer neuen Identität.
              </h1>

              <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#365444]/[.62] sm:text-base sm:leading-8">
                Nicht als neue Marke über dir. Sondern als ruhiger Raum hinter deinem Business – für das, was heute zählt und das, was später wieder wichtig wird.
              </p>

              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href="#deine-world"
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#294737] px-6 py-3 text-sm font-semibold text-[#f5f0e4] shadow-[0_14px_34px_rgba(34,67,49,.16)] transition hover:-translate-y-0.5 hover:bg-[#213b2f]"
                >
                  Deine World betreten
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#signal"
                  className="text-sm text-[#355744]/[.52] underline decoration-[#355744]/[.16] underline-offset-4 transition hover:text-[#244a38]"
                >
                  sehen, wie daraus Arbeit wird
                </a>
              </div>
            </div>

            <div className="relative mx-auto h-[300px] w-full max-w-[690px] sm:h-[420px] lg:h-[650px]" aria-hidden="true">
              <div className="absolute right-[2%] top-[8%] h-[58%] w-[68%] rounded-[49%_51%_48%_52%/58%_48%_52%_42%] bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,.88)_0%,rgba(238,234,220,.72)_36%,rgba(198,199,178,.56)_100%)] shadow-[0_35px_90px_rgba(43,69,51,.13)]" />
              <div className="absolute bottom-[8%] left-[7%] h-[34%] w-[48%] rotate-[-5deg] rounded-[52%_48%_44%_56%/58%_52%_48%_42%] bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,.9)_0%,rgba(229,226,211,.76)_44%,rgba(183,189,164,.6)_100%)] shadow-[0_28px_65px_rgba(43,69,51,.12)]" />
              <div className="absolute bottom-[28%] right-[4%] h-[19%] w-[27%] rotate-[5deg] rounded-[54%_46%_55%_45%/45%_58%_42%_55%] bg-[radial-gradient(circle_at_36%_25%,rgba(255,255,255,.92)_0%,rgba(232,228,215,.82)_48%,rgba(190,194,174,.62)_100%)] shadow-[0_22px_52px_rgba(43,69,51,.10)]" />

              <div className="absolute left-[7%] top-[8%] max-w-[240px] rounded-[1.4rem] border border-[#315341]/[.12] bg-[#f6f1e6]/[.76] p-4 shadow-[0_18px_55px_rgba(42,70,52,.08)] backdrop-blur-md sm:left-[12%] sm:top-[14%] sm:p-5">
                <div className="font-mono text-[7px] uppercase tracking-[.2em] text-[#456451]/[.42]">HEUTE</div>
                <p className="mt-3 font-serif text-xl font-light leading-tight text-[#214432] sm:text-2xl">
                  Ein Faden. Nicht alles gleichzeitig.
                </p>
                <div className="mt-4 h-px bg-[#315341]/[.10]" />
                <p className="mt-3 text-xs leading-5 text-[#3d5b49]/[.48]">
                  Einstieg ordnen · Hauptweg klären · Rest liegen lassen
                </p>
              </div>

              <div className="absolute bottom-[13%] right-[11%] rounded-full border border-[#315341]/[.10] bg-[#f7f3e9]/[.72] px-4 py-2 font-mono text-[7px] uppercase tracking-[.16em] text-[#48604f]/[.46] shadow-[0_12px_35px_rgba(42,70,52,.06)] backdrop-blur">
                YORI HÄLT DEN KONTEXT
              </div>
            </div>
          </div>

          <a
            href="#deine-world"
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[#315341]/[.32]"
            aria-label="Zur World scrollen"
          >
            <ChevronDown className="mx-auto h-5 w-5" />
            <span className="mt-1 block font-mono text-[6px] uppercase tracking-[.23em]">WEITER</span>
          </a>
        </div>
      </section>

      <section id="deine-world" className="relative min-h-[100svh] overflow-hidden bg-[#f2ede2] px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <LuanaGardenScene />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="flex items-center justify-between border-b border-[#345442]/[.12] pb-4">
            <div className="flex items-center gap-3">
              <YoriMark className="h-7 w-7 text-[#234a37]" title="YORI" />
              <div>
                <p className="font-serif text-[14px] tracking-[.16em] text-[#1d4031]">LUANA</p>
                <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[.18em] text-[#496451]/[.40]">
                  YORI WORLD
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-right">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6f9478]" />
              <span className="font-mono text-[6px] uppercase tracking-[.16em] text-[#4d6654]/[.42] sm:text-[7px]">
                PREVIEW · NOCH KEINE LIVE-QUELLEN
              </span>
            </div>
          </div>

          <div className="relative mt-5 min-h-[720px] overflow-hidden border border-[#315341]/[.10] bg-[#f7f2e8]/[.70] shadow-[0_34px_100px_rgba(35,64,47,.09)] backdrop-blur-sm sm:mt-7 sm:min-h-[760px]">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_84%_8%,rgba(255,255,255,.72),transparent_24%),linear-gradient(180deg,rgba(255,255,255,.14),transparent_58%)]" />
            <div aria-hidden="true" className="absolute -right-24 top-10 h-[26rem] w-[26rem] rounded-full border border-[#47614e]/[.055]" />
            <div aria-hidden="true" className="absolute right-2 top-28 h-[15rem] w-[15rem] rounded-full border border-[#47614e]/[.05]" />

            <div className="relative z-10 grid min-h-[720px] grid-rows-[auto_1fr_auto] sm:min-h-[760px]">
              <header className="grid gap-6 border-b border-[#315341]/[.10] px-5 py-6 sm:px-8 sm:py-7 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[.22em] text-[#496451]/[.42]">
                    {room === 'heute' ? 'SCHREIBTISCH' : room === 'auftritt' ? 'AUFTRITT' : room === 'ideen' ? 'IDEEN' : 'NÄCHSTER WEG'}
                  </p>
                  <h2 className="mt-3 font-serif text-[clamp(2.8rem,9vw,5.7rem)] font-light leading-[.92] tracking-[-.05em] text-[#193d2f]">
                    {room === 'heute' ? 'Hallo Luana.' : activeRoom.label}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[#3b5948]/[.52] sm:text-[15px] sm:leading-7">
                    {room === 'heute'
                      ? 'Hier liegt nur, was gerade deine Aufmerksamkeit braucht. Alles andere darf im Haus bleiben, ohne laut zu werden.'
                      : activeRoom.body}
                  </p>
                  <span className="mt-5 block h-px w-16 bg-[#b29b60]/[.55]" />
                </div>

                <div className="flex items-center gap-2 text-left lg:text-right">
                  <span className="font-mono text-[7px] uppercase tracking-[.14em] text-[#526b59]/[.36]">
                    PERSÖNLICHER ARBEITSRAUM
                  </span>
                </div>
              </header>

              <div className="relative px-5 py-7 sm:px-8 sm:py-9">
                {room === 'heute' ? (
                  <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
                    <article className="relative min-h-[340px] rotate-[-.25deg] border border-[#6d6959]/[.12] bg-[#fffaf0] p-6 shadow-[0_26px_70px_rgba(71,55,38,.10)] sm:p-8">
                      <div className="absolute inset-x-0 top-[78px] h-px bg-[#7c7568]/[.07]" />
                      <p className="font-mono text-[7px] uppercase tracking-[.18em] text-[#7a6657]/[.44]">AUF DEINEM TISCH</p>
                      <h3 className="mt-5 max-w-xl font-serif text-3xl font-light leading-[1.02] tracking-[-.035em] text-[#2c4336] sm:text-4xl">
                        Der Einstieg deiner Website wartet auf eine Entscheidung.
                      </h3>
                      <p className="mt-5 max-w-xl text-sm leading-7 text-[#5d665e]/[.58]">
                        Die Haltung funktioniert. Offen ist nur, welcher Weg im ersten Moment führt: Angebot oder Guide.
                      </p>

                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => setRoom('auftritt')}
                          className="min-h-14 border border-[#315341]/[.12] bg-[#e2e9de] px-4 text-left text-sm text-[#274735] transition hover:-translate-y-0.5 hover:bg-[#dbe5d8]"
                        >
                          <span className="block font-semibold">Auftritt öffnen</span>
                          <span className="mt-1 block text-[11px] text-[#46604f]/[.46]">den Einstieg ansehen</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRoom('weg')}
                          className="min-h-14 border border-[#315341]/[.10] bg-[#f2ead8] px-4 text-left text-sm text-[#4b4738] transition hover:-translate-y-0.5 hover:bg-[#eee3c9]"
                        >
                          <span className="block font-semibold">Entscheidung öffnen</span>
                          <span className="mt-1 block text-[11px] text-[#645e49]/[.46]">einen Hauptweg wählen</span>
                        </button>
                      </div>
                    </article>

                    <div className="grid gap-4">
                      <article className="border border-[#315341]/[.10] bg-[#e4eadf]/[.60] p-5 sm:p-6">
                        <p className="font-mono text-[7px] uppercase tracking-[.17em] text-[#536c59]/[.40]">YORI NOTIZ</p>
                        <p className="mt-4 font-serif text-2xl font-light leading-tight text-[#244735]">
                          Nicht mehr Inhalt. Weniger Konkurrenz im ersten Moment.
                        </p>
                        <p className="mt-4 text-xs leading-6 text-[#47604f]/[.48]">
                          Diese Notiz basiert nur auf dem bekannten Einstieg – nicht auf erfundenen Daten.
                        </p>
                      </article>

                      <article className="border border-[#315341]/[.10] bg-white/[.38] p-5 sm:p-6">
                        <p className="font-mono text-[7px] uppercase tracking-[.17em] text-[#536c59]/[.40]">IM HAUS</p>
                        <div className="mt-4 space-y-3 text-sm text-[#34513f]/[.58]">
                          <button type="button" onClick={() => setRoom('ideen')} className="flex w-full items-center justify-between border-b border-[#315341]/[.08] pb-3 text-left">
                            <span>1 Idee liegt ruhig bereit</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                          </button>
                          <button type="button" onClick={() => setRoom('weg')} className="flex w-full items-center justify-between text-left">
                            <span>1 Entscheidung braucht dich</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                          </button>
                        </div>
                      </article>
                    </div>
                  </div>
                ) : room === 'auftritt' ? (
                  <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
                    <article className="border border-[#315341]/[.10] bg-white/[.38] p-6 sm:p-7">
                      <p className="font-mono text-[7px] uppercase tracking-[.17em] text-[#536c59]/[.40]">WAS BLEIBT</p>
                      <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-[#244735]">
                        Die Schwelle bleibt dein stärkster Satz.
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[#45604f]/[.52]">
                        „Du stehst an der Schwelle zu einer neuen Identität.“ trägt Haltung und Richtung. YORI würde ihn nicht ersetzen, sondern ihm mehr Raum geben.
                      </p>
                    </article>

                    <article className="overflow-hidden border border-[#315341]/[.12] bg-[#faf6ec] shadow-[0_24px_70px_rgba(43,69,51,.09)]">
                      <div className="flex items-center justify-between border-b border-[#315341]/[.09] px-5 py-4">
                        <span className="font-serif text-[13px] tracking-[.17em] text-[#244735]">LUANA LUMINA</span>
                        <span className="font-mono text-[7px] uppercase tracking-[.14em] text-[#496350]/[.40]">EINSTIEG</span>
                      </div>
                      <div className="p-6 sm:p-8">
                        <p className="font-mono text-[6px] uppercase tracking-[.17em] text-[#61725d]/[.45]">
                          BEWUSSTSEINSTRAINING · IDENTITÄTSSHIFT · ENERGIEARBEIT
                        </p>
                        <h3 className="mt-5 max-w-lg font-serif text-4xl font-light leading-[.94] tracking-[-.04em] text-[#193b2e] sm:text-5xl">
                          Du stehst an der Schwelle zu einer neuen Identität.
                        </h3>
                        <button type="button" className="mt-8 w-full rounded-full bg-[#294737] px-5 py-3.5 text-sm font-semibold text-[#f5f0e4] sm:w-auto sm:min-w-[230px]">
                          Angebote entdecken
                        </button>
                        <button type="button" className="mt-3 block px-1 py-2 text-sm text-[#3d5b49]/[.48] sm:ml-5 sm:inline-block">
                          Identitätsshift Guide
                        </button>
                      </div>
                    </article>
                  </div>
                ) : room === 'ideen' ? (
                  <div className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
                    <article className="relative min-h-[360px] rotate-[.3deg] border border-[#756b5a]/[.12] bg-[#fff9ed] p-6 shadow-[0_26px_70px_rgba(71,55,38,.09)] sm:p-8">
                      <p className="font-mono text-[7px] uppercase tracking-[.18em] text-[#7a6657]/[.44]">IDEENBLATT</p>
                      <h3 className="mt-5 font-serif text-3xl font-light leading-tight text-[#2c4336] sm:text-4xl">
                        Was wäre, wenn Website und Content nicht jedes Mal bei null anfangen?
                      </h3>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5d665e]/[.58]">
                        Ein Gedanke könnte in deiner World liegen bleiben, später für Website, Social oder einen Guide wieder auftauchen – mit dem Kontext, warum er überhaupt wichtig war.
                      </p>
                      <p className="mt-8 font-mono text-[7px] uppercase tracking-[.15em] text-[#7a6657]/[.32]">
                        PREVIEW · KEINE VERBUNDENEN KANÄLE
                      </p>
                    </article>

                    <article className="self-end border border-[#315341]/[.10] bg-[#dfe7db]/[.65] p-6 sm:p-7">
                      <p className="font-mono text-[7px] uppercase tracking-[.17em] text-[#536c59]/[.40]">YORI HÄLT FEST</p>
                      <p className="mt-4 font-serif text-2xl font-light leading-tight text-[#244735]">
                        Ideen dürfen unfertig sein.
                      </p>
                      <p className="mt-4 text-sm leading-6 text-[#45604f]/[.50]">
                        Sie müssen nicht sofort Aufgabe, Post oder Projekt werden. Erst wenn sie wieder relevant sind, kommen sie zurück auf den Tisch.
                      </p>
                    </article>
                  </div>
                ) : (
                  <div className="mx-auto max-w-3xl">
                    <article className="border border-[#315341]/[.10] bg-[#fffaf0] p-6 shadow-[0_28px_80px_rgba(71,55,38,.10)] sm:p-9">
                      <p className="font-mono text-[7px] uppercase tracking-[.18em] text-[#7a6657]/[.44]">ENTSCHEIDUNG</p>
                      <h3 className="mt-5 font-serif text-3xl font-light leading-tight text-[#2c4336] sm:text-4xl">
                        Welcher Weg soll im ersten Moment führen?
                      </h3>
                      <p className="mt-5 text-sm leading-7 text-[#5d665e]/[.56]">
                        Für diese Preview würden wir „Angebote entdecken“ führen und den Guide als ruhigeren zweiten Weg behalten.
                      </p>
                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <button type="button" onClick={() => void chooseDecision('yes')} className="min-h-14 bg-[#294737] px-5 text-sm font-semibold text-[#f5f0e4]">
                          Angebot führt
                        </button>
                        <button type="button" onClick={() => void chooseDecision('change')} className="min-h-14 border border-[#315341]/[.12] px-5 text-sm text-[#34513f]/[.64]">
                          Ich würde es anders lösen
                        </button>
                      </div>
                    </article>
                  </div>
                )}
              </div>

              <nav className="mx-3 mb-3 grid grid-cols-4 border border-[#315341]/[.12] bg-[#f3eee4]/[.92] p-1.5 shadow-[0_14px_45px_rgba(43,69,51,.08)] backdrop-blur-md sm:mx-auto sm:mb-5 sm:w-fit sm:min-w-[520px]" aria-label="Luana World Bereiche">
                {[
                  { id: 'heute' as RoomId, label: 'Heute', Icon: House },
                  { id: 'auftritt' as RoomId, label: 'Auftritt', Icon: Waves },
                  { id: 'ideen' as RoomId, label: 'Ideen', Icon: MessageCircle },
                  { id: 'weg' as RoomId, label: 'Weg', Icon: Sparkles },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setRoom(id)}
                    aria-current={room === id ? 'page' : undefined}
                    className={`flex min-h-14 flex-col items-center justify-center gap-1 px-2 text-[9px] transition ${
                      room === id
                        ? 'bg-[#dde5da] text-[#1d4c3e]'
                        : 'text-[#52685a]/[.52] hover:bg-white/[.45] hover:text-[#294737]'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-center text-[11px] leading-5 text-[#496451]/[.34]">
            Eine personalisierte YORI-Vorschau: keine verbundenen Konten, keine erfundenen Kennzahlen, keine externen Aktionen.
          </p>
        </div>
      </section>

      <section id="signal" className="relative overflow-hidden border-y border-[#c8c1ad]/[.35] bg-[#e7dfcf] px-5 py-20 sm:px-9 sm:py-24 lg:px-14 lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_90%_12%,rgba(255,255,255,.5),transparent_27%),linear-gradient(120deg,rgba(49,79,59,.035),transparent_42%)]" />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="max-w-3xl">
            <p className="font-mono text-[7px] uppercase tracking-[.24em] text-[#5b6f5d]/[.44] sm:text-[8px]">
              SIGNAL → ENTSCHEIDUNG → ARBEIT
            </p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,10vw,6rem)] font-light leading-[.91] tracking-[-.05em] text-[#183a2d]">
              YORI soll nicht nur schön liegen. Es soll etwas weiterbringen.
            </h2>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#365444]/[.56] sm:text-base">
              Ein Beispiel aus dem, was wir von deinem Einstieg wirklich kennen – ohne erfundene Reichweiten, Angebote oder Daten.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[.9fr_60px_.9fr_60px_1.15fr] lg:items-stretch">
            <FlowCard
              kicker="SIGNAL"
              title="Zwei gleich starke Wege."
              body="„Angebote entdecken“ und „Identitätsshift Guide“ konkurrieren im ersten Moment um dieselbe Aufmerksamkeit."
            />
            <FlowArrow />
            <FlowCard
              kicker="YORI ORDNET"
              title="Ein Hauptweg."
              body="Der wichtigste Schritt wird klar. Der Guide bleibt sichtbar, aber muss nicht genauso laut sein."
              accent
            />
            <FlowArrow />
            <article className="overflow-hidden rounded-[1.7rem] border border-[#315341]/[.12] bg-[#f5f0e4] shadow-[0_24px_70px_rgba(43,69,51,.10)]">
              <div className="flex items-center justify-between border-b border-[#315341]/[.09] px-5 py-4">
                <span className="font-serif text-[13px] tracking-[.17em] text-[#244735]">LUANA LUMINA</span>
                <span className="font-mono text-[7px] uppercase tracking-[.14em] text-[#496350]/[.40]">ENTWURF</span>
              </div>
              <div className="p-6 sm:p-7">
                <p className="font-mono text-[6px] uppercase tracking-[.17em] text-[#61725d]/[.45]">
                  BEWUSSTSEINSTRAINING · IDENTITÄTSSHIFT · ENERGIEARBEIT
                </p>
                <h3 className="mt-5 font-serif text-4xl font-light leading-[.94] tracking-[-.04em] text-[#193b2e]">
                  Du stehst an der Schwelle zu einer neuen Identität.
                </h3>
                <button type="button" className="mt-7 w-full rounded-full bg-[#294737] px-5 py-3.5 text-sm font-semibold text-[#f5f0e4]">
                  Angebote entdecken
                </button>
                <button type="button" className="mt-3 w-full px-4 py-2 text-sm text-[#3d5b49]/[.52]">
                  Identitätsshift Guide
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0d241b] px-5 py-20 text-[#f3ecde] sm:px-9 sm:py-24 lg:px-14 lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(108,144,111,.24),transparent_31%),radial-gradient(circle_at_18%_85%,rgba(62,143,139,.12),transparent_30%),linear-gradient(180deg,#10291e_0%,#0b1d16_100%)]" />
        <div aria-hidden="true" className="absolute right-[-9rem] top-[4rem] h-[31rem] w-[31rem] rounded-full border border-[#e8d9b0]/[.07]" />
        <div aria-hidden="true" className="absolute right-[1rem] top-[10rem] h-[18rem] w-[18rem] rounded-full border border-[#8ab09a]/[.08]" />

        <div className="relative z-10 mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <YoriMark className="h-9 w-9 text-[#f1eadc]/[.78]" title="YORI" />
              <span className="font-mono text-[7px] uppercase tracking-[.22em] text-[#d8cfb8]/[.38]">YORI · A SAIMÔR CREATION</span>
            </div>

            <h2 className="mt-8 max-w-2xl font-serif text-[clamp(3.2rem,10vw,6.4rem)] font-light leading-[.9] tracking-[-.05em]">
              Deine World müsste nicht bei der Website enden.
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#e8e0cf]/[.52] sm:text-base">
              Wenn du möchtest, hält YORI später auch Ideen, Content, Kooperationen und Termine in demselben Kontext – ohne daraus ein lautes Dashboard zu machen.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#e8dfcb]/[.10] bg-[#f2eadc]/[.055] p-6 shadow-[0_30px_100px_rgba(0,0,0,.22)] backdrop-blur-md sm:p-8">
            <p className="font-mono text-[7px] uppercase tracking-[.2em] text-[#d8c89e]/[.48]">EINE ENTSCHEIDUNG</p>
            <h3 className="mt-4 font-serif text-3xl font-light sm:text-4xl">Soll diese Richtung weiterleben?</h3>
            <p className="mt-4 text-sm leading-6 text-[#eee5d4]/[.45]">
              Mehr braucht es für diesen ersten Schritt nicht.
            </p>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                disabled={savingDecision}
                onClick={() => void chooseDecision('yes')}
                className={`flex min-h-14 w-full items-center justify-between rounded-full px-5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
                  decision === 'yes'
                    ? 'bg-[#d9c58c] text-[#183127]'
                    : 'bg-[#efe7d7] text-[#183127] hover:bg-white'
                }`}
              >
                <span>{decision === 'yes' ? 'Ja — diese Richtung.' : 'Ja, zeig mir den nächsten Schritt'}</span>
                {decision === 'yes' ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>

              <button
                type="button"
                disabled={savingDecision}
                onClick={() => void chooseDecision('change')}
                className={`min-h-12 w-full rounded-full border px-5 text-sm transition disabled:cursor-wait disabled:opacity-60 ${
                  decision === 'change'
                    ? 'border-[#d9c58c]/[.35] bg-[#d9c58c]/[.10] text-[#eadcb7]'
                    : 'border-[#eee5d4]/[.12] text-[#eee5d4]/[.52] hover:border-[#eee5d4]/[.25] hover:text-[#eee5d4]/[.74]'
                }`}
              >
                {decision === 'change' ? 'Verstanden — erst etwas ändern.' : 'Ich würde vorher etwas ändern'}
              </button>
            </div>

            {decision ? (
              <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#dfd5c0]/[.38]">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Gespeichert. Wenn du wiederkommst, erinnert sich diese Preview an deine Entscheidung.
              </p>
            ) : decisionError ? (
              <p className="mt-5 text-xs leading-5 text-[#e6b1a6]/70">
                Konnte gerade nicht gespeichert werden. Bitte nochmal versuchen.
              </p>
            ) : null}
          </div>
        </div>

        <footer className="relative z-10 mx-auto mt-20 flex max-w-[1180px] items-center justify-between border-t border-[#efe5d1]/[.08] pt-6 font-mono text-[6px] uppercase tracking-[.17em] text-[#e5dac3]/[.24] sm:text-[7px]">
          <span>{world.clientName.toUpperCase()} WORLD</span>
          <span>YORI · SAIMÔR</span>
        </footer>
      </section>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>
    </main>
  );
}

function FlowCard({
  kicker,
  title,
  body,
  accent = false,
}: {
  kicker: string;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <article
      className={`rounded-[1.7rem] border p-6 sm:p-7 ${
        accent
          ? 'border-[#58745f]/[.16] bg-[#dce2d3]/[.62]'
          : 'border-[#315341]/[.10] bg-[#f4ede0]/[.72]'
      }`}
    >
      <p className="font-mono text-[7px] uppercase tracking-[.18em] text-[#57705d]/[.42]">{kicker}</p>
      <h3 className="mt-4 font-serif text-2xl font-light leading-tight text-[#214432] sm:text-3xl">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-[#3d5b49]/[.52]">{body}</p>
    </article>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-1 text-[#52705b]/[.30] lg:py-0" aria-hidden="true">
      <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
    </div>
  );
}

function LuanaGardenScene({ hero = false }: { hero?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_14%,rgba(255,255,255,.86),transparent_29%),linear-gradient(180deg,rgba(255,255,255,.28),transparent_60%)]" />
      <div
        className={`luana-tree absolute ${
          hero
            ? '-right-[11%] -top-[8%] h-[92%] w-[53%]'
            : '-right-[13%] -top-[12%] h-[78%] w-[45%]'
        }`}
      />
      <div
        className={`luana-tree luana-tree-left absolute ${
          hero
            ? '-left-[20%] bottom-[-10%] h-[55%] w-[38%]'
            : '-left-[15%] bottom-[-14%] h-[52%] w-[35%]'
        }`}
      />

      <svg viewBox="0 0 1200 720" preserveAspectRatio="none" className="luana-sand absolute inset-x-[-4%] bottom-[-4%] h-[64%] w-[108%]">
        {Array.from({ length: 14 }).map((_, index) => (
          <path
            key={index}
            d={`M-40 ${90 + index * 34} C190 ${25 + index * 31}, 315 ${150 + index * 26}, 520 ${95 + index * 32} S860 ${55 + index * 34}, 1240 ${105 + index * 32}`}
            fill="none"
            stroke="#405f4a"
            strokeOpacity={0.045 + index * 0.002}
            strokeWidth="1"
          />
        ))}
      </svg>

      <svg viewBox="0 0 420 650" className="luana-branch absolute right-[-3%] top-[-4%] h-[72%] w-[38%] opacity-30">
        <path d="M320 0 C300 120 286 206 304 334 C315 420 284 515 248 650" fill="none" stroke="#234b35" strokeWidth="3" strokeOpacity=".44" />
        <path d="M301 170 C235 155 198 119 156 70 M304 278 C354 245 382 212 412 160 M293 390 C226 365 180 330 141 273 M281 492 C333 470 366 438 401 397" fill="none" stroke="#234b35" strokeWidth="1.4" strokeOpacity=".34" />
      </svg>

      <style>{`
        .luana-tree {
          background: radial-gradient(ellipse at 70% 35%, rgba(63,95,61,.34), rgba(91,118,77,.14) 38%, transparent 69%);
          filter: blur(20px);
          opacity: .78;
        }
        .luana-tree-left {
          background: radial-gradient(ellipse at 30% 58%, rgba(57,91,59,.28), rgba(112,126,79,.11) 41%, transparent 71%);
          opacity: .48;
        }
        .luana-sand {
          animation: luanaSand 18s ease-in-out infinite alternate;
        }
        .luana-branch {
          animation: luanaBranch 14s ease-in-out infinite alternate;
          transform-origin: 80% 8%;
        }
        @keyframes luanaSand {
          from { transform: translate3d(-.8%,0,0); }
          to { transform: translate3d(.9%,.5%,0); }
        }
        @keyframes luanaBranch {
          from { transform: rotate(-.35deg) translateY(0); }
          to { transform: rotate(.55deg) translateY(3px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .luana-sand, .luana-branch { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
