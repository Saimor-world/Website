'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MessageSquareText,
} from 'lucide-react';
import type { ClientWorldConfig, ClientWorldIdea, ClientWorldModule } from '@/lib/client-world';

type Reaction = 'interesting' | 'later' | 'not_for_me';
type WebsiteConceptView = 'arrival' | 'personality' | 'offer' | 'contact';

const WEBSITE_CONCEPT_VIEWS: Array<{ id: WebsiteConceptView; label: string; path: string }> = [
  { id: 'arrival', label: 'Start', path: '/' },
  { id: 'personality', label: 'Über dich', path: '/ueber-mich' },
  { id: 'offer', label: 'Angebote', path: '/angebote' },
  { id: 'contact', label: 'Kontakt', path: '/kontakt' },
];

const REACTION_LABELS: Array<{ value: Reaction; label: string }> = [
  { value: 'interesting', label: 'Passt' },
  { value: 'later', label: 'Später' },
  { value: 'not_for_me', label: 'Eher nicht' },
];

export default function ClientWorldPage({
  world,
  initialReactions = {},
}: {
  world: ClientWorldConfig;
  initialReactions?: Record<string, Reaction>;
}) {
  const [websiteConceptView, setWebsiteConceptView] = useState<WebsiteConceptView>('arrival');
  const [reactions, setReactions] = useState<Record<string, Reaction>>(initialReactions);
  const [busyReaction, setBusyReaction] = useState<string | null>(null);
  const [reactionError, setReactionError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const returningWithReactions = useMemo(() => Object.keys(initialReactions).length > 0, [initialReactions]);
  const allIdeasReacted = world.ideas.length > 0 && world.ideas.every((idea) => Boolean(reactions[idea.id]));
  const conceptIndex = WEBSITE_CONCEPT_VIEWS.findIndex((view) => view.id === websiteConceptView);
  const activeConcept = WEBSITE_CONCEPT_VIEWS[conceptIndex];
  const previousConcept =
    WEBSITE_CONCEPT_VIEWS[(conceptIndex - 1 + WEBSITE_CONCEPT_VIEWS.length) % WEBSITE_CONCEPT_VIEWS.length];
  const nextConcept = WEBSITE_CONCEPT_VIEWS[(conceptIndex + 1) % WEBSITE_CONCEPT_VIEWS.length];

  async function postInteraction(
    kind: 'idea_reaction' | 'feedback' | 'module_interest',
    itemId: string | undefined,
    value: string
  ) {
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
    setReactionError(null);

    try {
      await postInteraction('idea_reaction', idea.id, value);
      setReactions((current) => ({ ...current, [idea.id]: value }));
    } catch {
      setReactionError(idea.id);
    } finally {
      setBusyReaction(null);
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

  async function leaveWorld() {
    try {
      await fetch(`/api/world/${encodeURIComponent(world.slug)}/logout`, { method: 'POST' });
    } finally {
      window.location.reload();
    }
  }

  function openModule(module: ClientWorldModule) {
    void postInteraction('module_interest', module.id, 'open').catch(() => undefined);
  }

  return (
    <main className="min-h-[100svh] bg-[#0a110e] text-[#f2efe6] selection:bg-[#d4b466]/30">
      <div className="mx-auto w-full max-w-[1180px] px-5 pb-20 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/[.08] py-5">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-lg tracking-[.12em]">SAIMÔR</span>
            <span className="hidden text-xs text-white/32 sm:inline">Private World</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-white/60">{world.clientName}</span>
            <button
              type="button"
              onClick={() => void leaveWorld()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/42 transition hover:border-white/20 hover:text-white/70"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Abmelden</span>
            </button>
          </div>
        </header>

        <section className="grid gap-7 py-10 lg:grid-cols-[1.25fr_.75fr] lg:py-14">
          <div className="rounded-[2rem] border border-white/[.08] bg-[#0f1915] p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-medium uppercase tracking-[.18em] text-[#d4b466]/75">Gemeinsamer Stand</p>
            <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.9rem,6vw,5.6rem)] font-light leading-[.94] tracking-[-.045em]">
              {world.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/56 sm:text-base">
              {world.intro}
            </p>

            <a
              href="#website"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#eee8d7] px-5 py-3 text-sm font-semibold text-[#173529] transition hover:bg-white"
            >
              Zur aktuellen Arbeit
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <aside className="rounded-[2rem] border border-white/[.08] bg-white/[.035] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[.18em] text-white/34">Jetzt</p>
            <p className="mt-4 text-sm leading-6 text-white/62">{world.today.note}</p>

            <div className="mt-6 space-y-3 border-t border-white/[.08] pt-5">
              {world.today.focus.map((item, index) => (
                <div key={item} className="flex gap-3 text-sm leading-6 text-white/54">
                  <span className="mt-[.45rem] grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#d4b466]/25 text-[9px] text-[#d4b466]/80">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="website" className="scroll-mt-6 border-t border-white/[.08] py-12 lg:py-16">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[.18em] text-[#d4b466]/70">01 · Aktuelle Arbeit</p>
              <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.6vw,4.3rem)] font-light tracking-[-.035em]">
                Website
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/42">
              Hier wird nicht Saimôr erklärt. Hier siehst du den Teil, an dem wir gerade konkret mit dir arbeiten.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
            <div className="rounded-[1.8rem] border border-white/[.08] bg-[#0f1915] p-6 sm:p-7">
              <p className="text-sm font-semibold text-white/82">Die Richtung</p>
              <p className="mt-3 text-sm leading-6 text-white/44">{world.websiteDirection.lead}</p>

              <div className="mt-7 space-y-5">
                {world.websiteDirection.moves.map((move, index) => (
                  <article key={move.title} className="grid grid-cols-[26px_1fr] gap-3">
                    <span className="pt-0.5 text-xs text-[#d4b466]/60">0{index + 1}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-white/78">{move.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/40">{move.body}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 border-t border-white/[.08] pt-5">
                <p className="text-[11px] uppercase tracking-[.16em] text-white/28">Quellenstatus</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {world.presence.map((source) => (
                    <span
                      key={source.id}
                      className="rounded-full border border-white/[.08] bg-white/[.025] px-3 py-1.5 text-[11px] text-white/38"
                    >
                      {source.label} · noch offen
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.8rem] border border-white/[.08] bg-[#ece7db] text-[#173529] shadow-[0_24px_80px_rgba(0,0,0,.22)]">
              <div className="flex flex-col gap-4 border-b border-[#173529]/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[.16em] text-[#173529]/38">Arbeitsvorschau</p>
                  <p className="mt-1 text-sm font-semibold">Wie die nächste Website aufgebaut sein könnte</p>
                </div>

                <div className="flex flex-wrap gap-1 rounded-full bg-[#173529]/[.05] p-1">
                  {WEBSITE_CONCEPT_VIEWS.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setWebsiteConceptView(id)}
                      className={`rounded-full px-3 py-2 text-[10px] transition ${
                        websiteConceptView === id
                          ? 'bg-[#173529] text-[#efeade]'
                          : 'text-[#173529]/50 hover:text-[#173529]/80'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 border-b border-[#173529]/8 bg-[#173529]/[.035] px-5 py-2.5">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[#173529]/15" />
                  <span className="h-2 w-2 rounded-full bg-[#173529]/15" />
                  <span className="h-2 w-2 rounded-full bg-[#173529]/15" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-full bg-white/55 px-3 py-1.5 font-mono text-[9px] text-[#173529]/42">
                  deine-seite.de{activeConcept.path}
                </span>
              </div>

              <WebsiteConcept view={websiteConceptView} />

              <div className="flex items-center justify-between gap-4 border-t border-[#173529]/8 px-5 py-3">
                <button
                  type="button"
                  onClick={() => setWebsiteConceptView(previousConcept.id)}
                  className="inline-flex items-center gap-1.5 text-[10px] text-[#173529]/45 transition hover:text-[#173529]/75"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  {previousConcept.label}
                </button>

                <span className="font-mono text-[9px] text-[#173529]/28">
                  {conceptIndex + 1}/{WEBSITE_CONCEPT_VIEWS.length}
                </span>

                <button
                  type="button"
                  onClick={() => setWebsiteConceptView(nextConcept.id)}
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#173529]/68 transition hover:text-[#173529]"
                >
                  {nextConcept.label}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[.08] py-12 lg:py-16">
          <div className="mb-8 grid gap-5 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[.18em] text-[#d4b466]/70">02 · Entscheidungen</p>
              <h2 className="mt-3 font-serif text-[clamp(2.4rem,4.6vw,4.3rem)] font-light tracking-[-.035em]">
                Was wir vorschlagen
              </h2>
            </div>
            <div>
              <p className="max-w-xl text-sm leading-6 text-white/42">
                Keine abstrakte Ideenwand. Jede Karte bezieht sich auf etwas, das wir oben wirklich beobachtet haben.
              </p>

              {returningWithReactions ? (
                <p className="mt-3 flex items-center gap-2 text-xs text-emerald-100/48">
                  <Check className="h-3.5 w-3.5" />
                  Deine Antworten vom letzten Mal stehen noch drin.
                </p>
              ) : null}

              {allIdeasReacted ? (
                <p className="mt-2 text-xs text-white/34">
                  Du hast alle Vorschläge beantwortet. Was als Nächstes kommt, richtet sich danach.
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {world.ideas.map((idea) => (
              <article key={idea.id} className="flex min-h-[320px] flex-col rounded-[1.6rem] border border-white/[.08] bg-[#0f1915] p-6">
                <p className="text-[10px] uppercase tracking-[.15em] text-white/28">Ausgangspunkt</p>
                <p className="mt-2 text-xs leading-5 text-white/38">„{idea.observedFrom}“</p>

                <h3 className="mt-6 font-serif text-2xl font-light text-white/88">{idea.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{idea.body}</p>

                <p className="mt-4 text-xs leading-5 text-[#d4b466]/62">{idea.why}</p>

                <div className="mt-auto pt-7">
                  <div className="flex flex-wrap gap-2">
                    {REACTION_LABELS.map(({ value, label }) => (
                      <ReactionButton
                        key={value}
                        active={reactions[idea.id] === value}
                        disabled={busyReaction === idea.id}
                        onClick={() => void react(idea, value)}
                      >
                        {reactions[idea.id] === value ? 'Notiert' : label}
                      </ReactionButton>
                    ))}
                  </div>

                  {reactionError === idea.id ? (
                    <p className="mt-3 text-xs text-red-200/70">Konnte nicht gespeichert werden. Bitte nochmal versuchen.</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/[.08] py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-[1.7rem] border border-white/[.08] bg-white/[.035] p-6 sm:p-7">
              <p className="text-xs font-medium uppercase tracking-[.18em] text-[#d4b466]/70">03 · Nächster Schritt</p>
              <h2 className="mt-4 font-serif text-3xl font-light">Was wir von dir brauchen</h2>

              <div className="mt-6 space-y-4">
                {world.nextQuestions.map((question, index) => (
                  <div key={question} className="grid grid-cols-[28px_1fr] gap-3">
                    <span className="text-xs text-white/28">0{index + 1}</span>
                    <p className="text-sm leading-6 text-white/56">{question}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={submitFeedback} className="rounded-[1.7rem] border border-white/[.08] bg-[#0f1915] p-6 sm:p-7">
              <div className="flex items-center gap-2 text-white/52">
                <MessageSquareText className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[.16em]">Deine Antwort</span>
              </div>

              <h2 className="mt-4 font-serif text-3xl font-light">Sag uns, was nicht passt.</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/42">
                Ein Satz reicht. Wichtig ist nur, dass wir nicht auf einer falschen Annahme weiterbauen.
              </p>

              <textarea
                value={feedback}
                onChange={(event) => {
                  setFeedback(event.target.value);
                  if (feedbackState !== 'idle') setFeedbackState('idle');
                }}
                maxLength={1200}
                rows={5}
                placeholder="Zum Beispiel: Die Website-Richtung passt, aber YORI ist für mich gerade noch kein Thema."
                className="mt-6 w-full resize-none rounded-2xl border border-white/10 bg-black/15 px-4 py-4 text-sm leading-6 text-white/80 outline-none transition placeholder:text-white/22 focus:border-[#d4b466]/35 focus:ring-2 focus:ring-[#d4b466]/10"
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-white/26">{feedback.length}/1200</p>
                <button
                  type="submit"
                  disabled={!feedback.trim() || feedbackState === 'sending'}
                  className="inline-flex items-center gap-2 rounded-full bg-[#eee8d7] px-5 py-3 text-sm font-semibold text-[#173529] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {feedbackState === 'sending' ? 'Wird gespeichert …' : 'Rückmeldung speichern'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {feedbackState === 'sent' ? (
                <p className="mt-4 text-xs text-emerald-100/55">Gespeichert. Danke.</p>
              ) : null}
              {feedbackState === 'error' ? (
                <p className="mt-4 text-xs text-red-200/70">Konnte nicht gespeichert werden. Bitte nochmal versuchen.</p>
              ) : null}
            </form>
          </div>
        </section>

        <section className="border-t border-white/[.08] py-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[.16em] text-white/28">Später möglich</p>
              <h2 className="mt-2 font-serif text-2xl font-light text-white/76">Wenn es für dich wirklich nützlich wird.</h2>
            </div>
            <p className="max-w-lg text-xs leading-5 text-white/30">
              Diese Bereiche gehören zur größeren Saimôr-Welt. Sie sind hier absichtlich nur leise angedeutet und noch nicht Teil deiner aktiven Arbeit.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {world.modules.map((module) => (
              <article key={module.id} className="rounded-[1.3rem] border border-white/[.07] bg-white/[.025] p-5">
                <p className="text-[10px] uppercase tracking-[.14em] text-white/24">{module.eyebrow}</p>
                <h3 className="mt-2 font-serif text-xl font-light text-white/72">{module.name}</h3>
                <p className="mt-3 text-xs leading-5 text-white/34">{module.description}</p>

                {module.link ? (
                  <a
                    href={module.link.href}
                    target={module.link.external ? '_blank' : undefined}
                    rel={module.link.external ? 'noreferrer' : undefined}
                    onClick={() => openModule(module)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4b466]/62 transition hover:text-[#d4b466]"
                  >
                    ansehen
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function WebsiteConcept({ view }: { view: WebsiteConceptView }) {
  if (view === 'personality') {
    return (
      <div className="grid min-h-[390px] items-center gap-8 px-6 py-10 lg:grid-cols-[1fr_.85fr] lg:px-9">
        <div>
          <p className="text-[10px] uppercase tracking-[.16em] text-[#173529]/38">Über dich</p>
          <h3 className="mt-4 max-w-md font-serif text-4xl font-light leading-[.95] tracking-[-.035em]">
            Persönlichkeit nicht als Deko, sondern als Orientierung.
          </h3>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#173529]/52">
            Ein echtes Bild, ein eigener Ton und eine klare Haltung. Besucher sollen zuerst verstehen, wer ihnen hier begegnet.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-[#173529]/10 bg-white/45 p-5">
          <div className="aspect-[4/5] rounded-[1.1rem] bg-[radial-gradient(circle_at_55%_30%,rgba(23,53,41,.12),transparent_25%),linear-gradient(145deg,rgba(23,53,41,.05),rgba(23,53,41,.15))]" />
          <p className="mt-4 text-xs leading-5 text-[#173529]/42">Bild, Stimme und Haltung werden gemeinsam festgelegt.</p>
        </div>
      </div>
    );
  }

  if (view === 'offer') {
    return (
      <div className="grid min-h-[390px] gap-8 px-6 py-10 lg:grid-cols-[.9fr_1.1fr] lg:px-9">
        <div>
          <p className="text-[10px] uppercase tracking-[.16em] text-[#173529]/38">Angebote</p>
          <h3 className="mt-4 max-w-md font-serif text-4xl font-light leading-[.95] tracking-[-.035em]">
            Eine Reihenfolge statt fünf gleich lauter Wege.
          </h3>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#173529]/52">
            Besucher bekommen zuerst Orientierung. Danach folgt der passende nächste Schritt — nicht alle Angebote auf einmal.
          </p>
        </div>

        <div className="space-y-3 self-center">
          {['Hauptweg', 'Vertiefung', 'Individuelle Anfrage'].map((label, index) => (
            <div key={label} className="grid grid-cols-[34px_1fr_auto] items-center gap-3 rounded-2xl border border-[#173529]/10 bg-white/45 px-4 py-4">
              <span className="text-xs text-[#173529]/30">0{index + 1}</span>
              <span className="text-sm font-medium">{label}</span>
              <ArrowUpRight className="h-4 w-4 text-[#173529]/25" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'contact') {
    return (
      <div className="flex min-h-[390px] items-center justify-center px-6 py-10 text-center lg:px-9">
        <div className="max-w-2xl">
          <p className="text-[10px] uppercase tracking-[.16em] text-[#173529]/38">Kontakt</p>
          <h3 className="mt-4 font-serif text-4xl font-light leading-[.95] tracking-[-.035em]">
            Am Ende ist klar, was als Nächstes passiert.
          </h3>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#173529]/52">
            Genau eine primäre Handlung. Der konkrete Text hängt später von deinem Angebotsmodell ab.
          </p>
          <div className="mx-auto mt-8 max-w-sm rounded-full bg-[#173529] px-5 py-4 text-sm font-semibold text-[#efeade]">
            Passenden nächsten Schritt öffnen
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[390px] items-end gap-8 px-6 py-10 lg:grid-cols-[1.05fr_.95fr] lg:px-9">
      <div>
        <p className="text-[10px] uppercase tracking-[.16em] text-[#173529]/38">Start</p>
        <h3 className="mt-4 max-w-xl font-serif text-[clamp(2.8rem,5vw,4.8rem)] font-light leading-[.92] tracking-[-.045em]">
          In wenigen Sekunden verstehen, wer du bist und wohin es geht.
        </h3>
        <p className="mt-5 max-w-lg text-sm leading-6 text-[#173529]/52">
          Ein starkes Bild, ein verständlicher Satz und ein eindeutiger nächster Schritt. Keine Konkurrenz um Aufmerksamkeit.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-[#173529]/10 bg-white/45 p-5">
        <div className="aspect-[4/3] rounded-[1.1rem] bg-[radial-gradient(circle_at_55%_35%,rgba(23,53,41,.12),transparent_24%),linear-gradient(145deg,rgba(23,53,41,.04),rgba(23,53,41,.12))]" />
        <div className="mt-4 h-2 w-2/3 rounded-full bg-[#173529]/12" />
        <div className="mt-2 h-2 w-1/2 rounded-full bg-[#173529]/8" />
      </div>
    </div>
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
          ? 'border-[#d4b466]/28 bg-[#d4b466]/[.09] text-[#e9d9a8]'
          : 'border-white/[.09] bg-white/[.025] text-white/42 hover:bg-white/[.06] hover:text-white/68'
      }`}
    >
      {children}
    </button>
  );
}
