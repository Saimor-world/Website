'use client';

import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CircleDot,
  Globe2,
  Lightbulb,
  MessageSquareText,
  Orbit,
  Sparkles,
} from 'lucide-react';
import MoraOrb from '@/components/MoraOrb';
import type {
  ClientWorldConfig,
  ClientWorldIdea,
  ClientWorldModule,
  ClientWorldTruth,
} from '@/lib/client-world';

type Reaction = 'interesting' | 'later' | 'not_for_me';

const TRUTH_COPY: Record<ClientWorldTruth, string> = {
  live: 'Verbunden',
  preview: 'Preview',
  not_connected: 'Noch nicht verbunden',
};

function TruthBadge({ state }: { state: ClientWorldTruth }) {
  const styles =
    state === 'live'
      ? 'border-emerald-300/20 bg-emerald-300/[.08] text-emerald-100/75'
      : state === 'preview'
        ? 'border-[#d6a848]/20 bg-[#d6a848]/[.08] text-[#e6cf94]/75'
        : 'border-white/10 bg-white/[.035] text-white/38';

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 font-mono text-[7px] uppercase tracking-[.18em] ${styles}`}>
      {TRUTH_COPY[state]}
    </span>
  );
}

export default function ClientWorldPage({ world }: { world: ClientWorldConfig }) {
  const [activeModuleId, setActiveModuleId] = useState(world.modules[0]?.id ?? '');
  const [reactions, setReactions] = useState<Record<string, Reaction>>({});
  const [busyReaction, setBusyReaction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const activeModule = useMemo(
    () => world.modules.find((module) => module.id === activeModuleId) ?? world.modules[0],
    [activeModuleId, world.modules]
  );

  async function postInteraction(kind: 'idea_reaction' | 'feedback' | 'module_interest', itemId: string | undefined, value: string) {
    const response = await fetch(`/api/world/${encodeURIComponent(world.slug)}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, itemId, value }),
    });
    if (!response.ok) throw new Error('interaction failed');
  }

  async function react(idea: ClientWorldIdea, value: Reaction) {
    if (busyReaction) return;
    setBusyReaction(idea.id);
    try {
      await postInteraction('idea_reaction', idea.id, value);
      setReactions((current) => ({ ...current, [idea.id]: value }));
    } finally {
      setBusyReaction(null);
    }
  }

  async function leaveWorld() {
    try {
      await fetch(`/api/world/${encodeURIComponent(world.slug)}/logout`, {
        method: 'POST',
      });
    } finally {
      window.location.reload();
    }
  }

  async function submitFeedback(event: React.FormEvent) {
    event.preventDefault();
    if (!feedback.trim() || feedbackState === 'sending') return;
    setFeedbackState('sending');
    try {
      await postInteraction('feedback', undefined, feedback.trim());
      setFeedback('');
      setFeedbackState('sent');
    } catch {
      setFeedbackState('error');
    }
  }

  function selectModule(module: ClientWorldModule) {
    setActiveModuleId(module.id);
    void postInteraction('module_interest', module.id, 'open').catch(() => undefined);
  }

  return (
    <main className="min-h-[100svh] bg-[#07100d] text-white selection:bg-[#d6a848]/30">
      <section className="relative min-h-[92svh] overflow-hidden border-b border-white/[.07]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_14%,rgba(62,143,139,.19),transparent_29%),radial-gradient(circle_at_20%_70%,rgba(214,168,72,.07),transparent_26%),linear-gradient(180deg,#07100d_0%,#0b1713_68%,#07100d_100%)]"
        />
        <div aria-hidden="true" className="absolute right-[-11rem] top-[8rem] h-[38rem] w-[38rem] rounded-full border border-white/[.045]" />
        <div aria-hidden="true" className="absolute right-[-4rem] top-[15rem] h-[24rem] w-[24rem] rounded-full border border-[#d6a848]/[.07]" />

        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1460px] flex-col px-6 pb-12 pt-7 sm:px-10 lg:px-14">
          <header className="flex items-center justify-between gap-4">
            <div>
              <div className="font-serif text-lg tracking-[.12em] text-[#f2efe4]">SAIMÔR</div>
              <div className="mt-1 font-mono text-[7px] uppercase tracking-[.24em] text-white/30">Private World</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/70">{world.clientName}</div>
              <div className="mt-1 font-mono text-[7px] uppercase tracking-[.18em] text-emerald-100/35">persönlicher Raum</div>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.12fr_.88fr]">
            <div className="max-w-4xl">
              <p className="font-mono text-[9px] uppercase tracking-[.3em] text-[#d6a848]/72">
                Heute · gemeinsamer Stand
              </p>
              <h1 className="mt-6 max-w-4xl font-serif text-[clamp(4.2rem,8.2vw,8.4rem)] font-light leading-[.84] tracking-[-.06em] text-[#f3efe4]">
                {world.title}
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
                {world.intro}
              </p>
            </div>

            <aside className="rounded-[2.2rem] border border-white/10 bg-white/[.035] p-6 shadow-[0_30px_100px_rgba(0,0,0,.32)] backdrop-blur-2xl sm:p-8">
              <div className="flex items-start gap-4">
                <MoraOrb size={58} state="dream" />
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[.22em] text-emerald-100/42">MÔRA · Preview note</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">{world.today.note}</p>
                </div>
              </div>
              <div className="mt-7 space-y-3 border-t border-white/[.07] pt-6">
                {world.today.focus.map((item, index) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-white/48">
                    <span className="mt-[.6rem] h-1 w-1 shrink-0 rounded-full bg-[#d6a848]/70" />
                    <span>
                      <span className="mr-2 font-mono text-[8px] text-white/24">0{index + 1}</span>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="grid gap-3 border-t border-white/[.06] pt-5 text-xs text-white/32 sm:grid-cols-3">
            <p>Keine erfundenen Live-Daten.</p>
            <p>Preview und echte Quellen bleiben getrennt.</p>
            <p className="sm:text-right">Dieser Raum wächst mit deinen Antworten.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#efeade] text-[#153529]">
        <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <p className="font-mono text-[8px] uppercase tracking-[.27em] text-[#315643]/45">Unsere Sicht · noch ohne Plattformmetriken</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="font-serif text-[clamp(3.5rem,6vw,6.8rem)] font-light leading-[.88] tracking-[-.055em]">
                Nicht mehr zeigen. Klarer verbinden.
              </h2>
            </div>
            <div className="grid gap-9 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <PerspectiveColumn title="Bewahren" items={world.perspective.preserve} />
              <PerspectiveColumn title="Klären" items={world.perspective.clarify} />
              <PerspectiveColumn title="Erkunden" items={world.perspective.explore} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#08120f]">
        <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-12">
              <p className="font-mono text-[8px] uppercase tracking-[.26em] text-[#d6a848]/55">Website direction</p>
              <h2 className="mt-5 font-serif text-[clamp(3.4rem,5.5vw,6rem)] font-light leading-[.9] tracking-[-.05em] text-[#f1ede2]">
                Nicht deine Seite spiegeln. Ihre nächste Form zeigen.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-white/45">{world.websiteDirection.lead}</p>
              <TruthBadge state="preview" />
            </div>
            <div className="border-t border-white/[.08]">
              {world.websiteDirection.moves.map((move, index) => (
                <article key={move.title} className="grid gap-3 border-b border-white/[.08] py-7 sm:grid-cols-[84px_.8fr_1.2fr] sm:gap-7">
                  <div className="font-mono text-[9px] text-[#d6a848]/45">0{index + 1}</div>
                  <h3 className="font-serif text-3xl font-light text-white/86">{move.title}</h3>
                  <p className="text-sm leading-7 text-white/43">{move.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0c1814]">
        <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[.27em] text-emerald-100/38">Presence</p>
              <h2 className="mt-4 font-serif text-[clamp(3.2rem,5vw,5.8rem)] font-light leading-[.9] tracking-[-.05em] text-[#f0ede3]">
                Erst verbinden. Dann urteilen.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/35">
              Wo noch keine Quelle verbunden ist, zeigt die World bewusst keinen Score und keine erfundene Analyse.
            </p>
          </div>
          <div className="mt-12 border-t border-white/[.08]">
            {world.presence.map((source) => (
              <article key={source.id} className="grid gap-5 border-b border-white/[.08] py-7 md:grid-cols-[.7fr_.45fr_1.4fr] md:items-center">
                <div className="flex items-center gap-3">
                  <Globe2 className="h-4 w-4 text-white/30" />
                  <h3 className="text-lg text-white/78">{source.label}</h3>
                </div>
                <TruthBadge state={source.state} />
                <p className="text-sm leading-6 text-white/40">{source.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/[.07] bg-[#07100d]">
        <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[.27em] text-emerald-100/38">Verbindungen</p>
              <h2 className="mt-5 font-serif text-[clamp(3.3rem,5.2vw,5.9rem)] font-light leading-[.9] tracking-[-.05em] text-[#f1ede2]">
                Die World zeigt auch, was wohin fließen kann.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-white/38">
                Nicht als Integrations-Theater: Jede Verbindung sagt offen, ob sie schon echt ist, nur als Preview existiert oder noch auf eine Quelle wartet.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/[.08] bg-white/[.025] p-4 sm:p-6">
              {world.connections.map((connection, index) => (
                <article
                  key={connection.id}
                  className="grid gap-4 border-b border-white/[.07] px-2 py-6 last:border-0 sm:grid-cols-[.75fr_52px_.75fr_1.35fr] sm:items-center sm:gap-5"
                >
                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[.18em] text-white/22">Quelle</p>
                    <p className="mt-1 text-sm text-white/70">{connection.from}</p>
                  </div>
                  <div className="hidden items-center gap-2 sm:flex">
                    <span className="h-px flex-1 bg-gradient-to-r from-white/8 to-[#d6a848]/35" />
                    <ArrowUpRight className="h-3.5 w-3.5 rotate-45 text-[#d6a848]/50" />
                  </div>
                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[.18em] text-white/22">Ziel</p>
                    <p className="mt-1 text-sm text-white/70">{connection.to}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[7px] text-white/18">0{index + 1}</span>
                      <TruthBadge state={connection.state} />
                    </div>
                    <p className="mt-3 text-xs leading-5 text-white/36">{connection.purpose}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#e9e5da] text-[#153529]">
        <div aria-hidden="true" className="absolute right-[-10rem] top-[-10rem] h-[38rem] w-[38rem] rounded-full border border-[#315643]/[.06]" />
        <div className="relative mx-auto max-w-[1380px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <p className="font-mono text-[8px] uppercase tracking-[.27em] text-[#315643]/44">World preview · schon jetzt</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[.62fr_1.38fr]">
            <div>
              <h2 className="font-serif text-[clamp(3.5rem,5.6vw,6.2rem)] font-light leading-[.9] tracking-[-.055em]">
                Drei Räume. Eine Geschichte.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-[#315643]/56">
                Diese Bereiche gehören zur möglichen Gesamtwelt. Heute sind sie bewusst als Preview getrennt von echten Verbindungen.
              </p>

              <div className="mt-9 space-y-2">
                {world.modules.map((module) => (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => selectModule(module)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                      activeModule?.id === module.id
                        ? 'border-[#315643]/24 bg-white/52'
                        : 'border-transparent bg-transparent hover:border-[#315643]/10 hover:bg-white/24'
                    }`}
                  >
                    <span>
                      <span className="block font-mono text-[7px] uppercase tracking-[.18em] text-[#315643]/38">{module.eyebrow}</span>
                      <span className="mt-1 block text-lg">{module.name}</span>
                    </span>
                    <Orbit className="h-4 w-4 text-[#315643]/35" />
                  </button>
                ))}
              </div>
            </div>

            {activeModule ? <WorldModulePreview module={activeModule} /> : null}
          </div>
        </div>
      </section>

      <section className="bg-[#07100d]">
        <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.26em] text-[#d6a848]/55">
                <Sparkles className="h-4 w-4" /> Proaktive Vorschläge
              </div>
              <h2 className="mt-5 font-serif text-[clamp(3.4rem,5vw,5.9rem)] font-light leading-[.9] tracking-[-.05em] text-[#f1ede2]">
                Ideen dürfen früh auftauchen.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-white/38">
                Noch keine automatische MÔRA-Auswertung. Diese Vorschläge sind kuratiert und ausdrücklich Preview — du kannst uns aber schon sagen, was davon zu dir passt.
              </p>
            </div>

            <div className="space-y-4">
              {world.ideas.map((idea, index) => (
                <article key={idea.id} className="rounded-[1.8rem] border border-white/[.08] bg-white/[.03] p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="font-mono text-[8px] text-white/22">0{index + 1}</div>
                    <TruthBadge state={idea.state} />
                  </div>
                  <h3 className="mt-5 font-serif text-3xl font-light text-white/85">{idea.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/43">{idea.body}</p>
                  <p className="mt-4 flex gap-2 text-xs leading-6 text-emerald-100/40">
                    <Lightbulb className="mt-1 h-3.5 w-3.5 shrink-0" />
                    {idea.why}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <ReactionButton
                      active={reactions[idea.id] === 'interesting'}
                      disabled={busyReaction === idea.id}
                      onClick={() => void react(idea, 'interesting')}
                    >
                      Interessant
                    </ReactionButton>
                    <ReactionButton
                      active={reactions[idea.id] === 'later'}
                      disabled={busyReaction === idea.id}
                      onClick={() => void react(idea, 'later')}
                    >
                      Später
                    </ReactionButton>
                    <ReactionButton
                      active={reactions[idea.id] === 'not_for_me'}
                      disabled={busyReaction === idea.id}
                      onClick={() => void react(idea, 'not_for_me')}
                    >
                      Nicht meins
                    </ReactionButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[.07] bg-[#0a1612]">
        <div className="mx-auto grid max-w-[1380px] gap-14 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-28">
          <div>
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.26em] text-emerald-100/38">
              <MessageSquareText className="h-4 w-4" /> Dein Blick
            </div>
            <h2 className="mt-5 max-w-xl font-serif text-[clamp(3.2rem,5vw,5.4rem)] font-light leading-[.92] tracking-[-.05em] text-[#f1ede2]">
              Korrigier die World, bevor sie fest wird.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-white/38">
              Ein Wunsch, eine Grenze, ein „so auf keinen Fall“ — genau solche Hinweise sollen später Teil des gemeinsamen Kontexts werden.
            </p>

            <form onSubmit={submitFeedback} className="mt-8 max-w-xl">
              <textarea
                value={feedback}
                onChange={(event) => {
                  setFeedback(event.target.value);
                  if (feedbackState !== 'idle') setFeedbackState('idle');
                }}
                maxLength={1200}
                rows={5}
                placeholder="Zum Beispiel: Ich möchte persönlicher wirken, aber nicht zu spirituell."
                className="w-full resize-none rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-emerald-200/25"
              />
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-xs text-white/22">{feedback.length}/1200</span>
                <button
                  type="submit"
                  disabled={!feedback.trim() || feedbackState === 'sending'}
                  className="rounded-full bg-[#e9e5da] px-5 py-3 text-xs font-semibold text-[#113225] transition hover:bg-white disabled:opacity-40"
                >
                  {feedbackState === 'sending' ? 'Speichert …' : 'Gedanken hinterlassen'}
                </button>
              </div>
              {feedbackState === 'sent' ? (
                <p role="status" className="mt-4 flex items-center gap-2 text-sm text-emerald-100/55">
                  <Check className="h-4 w-4" /> Ist in dieser World angekommen.
                </p>
              ) : null}
              {feedbackState === 'error' ? (
                <p role="status" className="mt-4 text-sm text-red-100/60">Konnte gerade nicht gespeichert werden.</p>
              ) : null}
            </form>
          </div>

          <div className="rounded-[2rem] border border-white/[.08] bg-white/[.025] p-7 sm:p-9">
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.25em] text-[#d6a848]/50">
              <CircleDot className="h-4 w-4" /> Als Nächstes
            </div>
            <div className="mt-7 space-y-7">
              {world.nextQuestions.map((question, index) => (
                <div key={question} className="grid grid-cols-[38px_1fr] gap-3 border-b border-white/[.07] pb-7 last:border-0 last:pb-0">
                  <span className="font-mono text-[8px] text-white/22">0{index + 1}</span>
                  <p className="text-base leading-7 text-white/65">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[.06] bg-[#07100d] px-6 py-8 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-3 text-xs text-white/26 sm:flex-row sm:items-center sm:justify-between">
          <span>{world.clientName} × SAIMÔR · Private World</span>
          <div className="flex items-center gap-4">
            <span>Preview ≠ verbundene Quelle</span>
            <button
              type="button"
              onClick={() => void leaveWorld()}
              className="text-white/30 underline decoration-white/10 underline-offset-4 transition hover:text-white/55"
            >
              Zugang auf diesem Gerät beenden
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}

function PerspectiveColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[.22em] text-[#315643]/42">{title}</p>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <p key={item} className="border-l border-[#315643]/14 pl-4 text-sm leading-6 text-[#315643]/68">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

function WorldModulePreview({ module }: { module: ClientWorldModule }) {
  const preview =
    module.id === 'yori' ? (
      <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-[#f4f0e7] p-7 text-[#173529] sm:p-9">
        <div aria-hidden="true" className="absolute right-[-8%] top-[-12%] h-56 w-56 rounded-full bg-[#244d38]/[.06]" />
        <div className="relative">
          <p className="font-serif text-xl tracking-[.18em]">YORI</p>
          <p className="mt-16 max-w-sm font-serif text-5xl font-light leading-[.92] tracking-[-.045em]">Mehr Raum. Weniger Lärm.</p>
          <div className="mt-10 flex gap-5">
            <div className="h-16 w-24 -rotate-3 rounded-[50%] bg-white shadow-[0_15px_30px_rgba(38,65,48,.12)]" />
            <div className="mt-8 h-12 w-20 rotate-3 rounded-[50%] bg-white shadow-[0_15px_30px_rgba(38,65,48,.1)]" />
          </div>
        </div>
      </div>
    ) : module.id === 'os' ? (
      <div className="min-h-[340px] rounded-[2rem] border border-white/10 bg-[#081310] p-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.04)] sm:p-9">
        <p className="font-mono text-[8px] uppercase tracking-[.22em] text-emerald-100/38">Saimôr OS · Preview</p>
        <div className="mt-12 grid grid-cols-[72px_1fr] gap-5">
          <div className="space-y-2">
            {['Heute', 'Dateien', 'Termine', 'Aufgaben'].map((item, index) => (
              <div key={item} className={`rounded-lg px-2 py-2 text-[9px] ${index === 0 ? 'bg-white/10 text-white/70' : 'text-white/28'}`}>
                {item}
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/[.07] bg-white/[.03] p-5">
            <p className="text-sm text-white/70">Heute</p>
            <p className="mt-3 max-w-sm text-xs leading-5 text-white/32">Ein gemeinsamer Stand aus verbundenen Diensten, offenen Aufgaben und MÔRAs Vorschlägen.</p>
            <div className="mt-8 h-px bg-white/[.07]" />
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[.035] p-3 text-[10px] text-white/36">Kalender</div>
              <div className="rounded-xl bg-white/[.035] p-3 text-[10px] text-white/36">Content</div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#08130f] p-8 text-white">
        <div aria-hidden="true" className="absolute h-64 w-64 rounded-full border border-emerald-200/[.08]" />
        <div aria-hidden="true" className="absolute h-44 w-44 rounded-full border border-[#d6a848]/[.09]" />
        <div className="relative text-center">
          <MoraOrb size={92} state="dream" />
          <p className="mt-7 font-serif text-4xl font-light">MÔRA</p>
          <p className="mx-auto mt-3 max-w-sm text-xs leading-5 text-white/34">Kontext sehen · Zusammenhänge vorbereiten · Vorschläge erst nach belegten Signalen.</p>
        </div>
      </div>
    );

  return (
    <article className="rounded-[2.4rem] border border-[#315643]/12 bg-white/38 p-3 shadow-[0_28px_70px_rgba(37,60,46,.08)] sm:p-4">
      {preview}
      <div className="px-3 pb-3 pt-6 sm:px-5 sm:pb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[.2em] text-[#315643]/36">{module.eyebrow}</p>
            <h3 className="mt-1 font-serif text-3xl font-light">{module.name}</h3>
          </div>
          <TruthBadge state={module.state} />
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#315643]/58">{module.description}</p>
        {module.link ? (
          <a
            href={module.link.href}
            target={module.link.external ? '_blank' : undefined}
            rel={module.link.external ? 'noreferrer' : undefined}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#315643]/14 bg-white/45 px-4 py-2.5 text-xs font-semibold text-[#204936] transition hover:bg-white"
          >
            {module.link.label}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function ReactionButton({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-xs transition disabled:opacity-45 ${
        active
          ? 'border-emerald-200/20 bg-emerald-200/[.09] text-emerald-100/75'
          : 'border-white/9 bg-white/[.025] text-white/40 hover:bg-white/[.06] hover:text-white/60'
      }`}
    >
      {children}
    </button>
  );
}
