'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import type {
  ClientWorldAnswerBlock,
  ClientWorldConfig,
  ClientWorldNote,
  ClientWorldNotesBlock,
} from '@/lib/client-world';

type Reaction = 'interesting' | 'later' | 'disagree';

const REACTION_LABELS: Array<{ value: Reaction; label: string }> = [
  { value: 'interesting', label: 'Machen wir' },
  { value: 'later', label: 'Später' },
  { value: 'disagree', label: 'Sehe ich anders' },
];

export default function ClientWorldPage({
  world,
  initialReactions = {},
}: {
  world: ClientWorldConfig;
  initialReactions?: Record<string, Reaction>;
}) {
  const [reactions, setReactions] = useState<Record<string, Reaction>>(initialReactions);
  const [busyReaction, setBusyReaction] = useState<string | null>(null);
  const [reactionError, setReactionError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const returning = Object.keys(initialReactions).length > 0;

  async function postInteraction(kind: 'idea_reaction' | 'feedback', itemId: string | undefined, value: string) {
    const response = await fetch(`/api/world/${encodeURIComponent(world.slug)}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, itemId, value }),
    });
    if (!response.ok) throw new Error('interaction failed');
  }

  async function react(note: ClientWorldNote, value: Reaction) {
    if (busyReaction) return;
    setBusyReaction(note.id);
    setReactionError(null);
    try {
      await postInteraction('idea_reaction', note.id, value);
      setReactions((current) => ({ ...current, [note.id]: value }));
    } catch {
      setReactionError(note.id);
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

  return (
    <main className="min-h-[100svh] bg-[#0b1310] text-[#eceadf]">
      <div className="mx-auto w-full max-w-[720px] px-6 pb-20 pt-10 sm:px-8">
        <header className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-5">
          <span className="font-serif text-base tracking-[.14em] text-[#efeade]">SAIMÔR</span>
          <span className="text-xs text-white/40">für {world.clientName}</span>
        </header>

        <section className="pt-14">
          <h1 className="font-serif text-4xl font-light tracking-[-.02em] text-[#f3efe4] sm:text-5xl">
            Hallo {world.clientName},
          </h1>
          <div className="mt-6 space-y-4">
            {world.intro.map((paragraph) => (
              <p key={paragraph} className="text-[15px] leading-7 text-white/65">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-8 text-xs text-white/30">{world.stand}</p>
        </section>

        {returning ? (
          <p className="mt-10 flex items-start gap-2 rounded-2xl border border-emerald-200/12 bg-emerald-200/[.04] px-4 py-3 text-[13px] leading-6 text-emerald-100/55">
            <Check className="mt-1 h-3.5 w-3.5 shrink-0" />
            Deine Antworten von letztem Mal stehen noch drin.
          </p>
        ) : null}

        {world.blocks.map((block) =>
          block.kind === 'answer' ? (
            <AnswerBlock key={block.id} block={block} />
          ) : (
            <NotesBlock
              key={block.id}
              block={block}
              reactions={reactions}
              busyReaction={busyReaction}
              reactionError={reactionError}
              onReact={react}
            />
          )
        )}

        <section className="mt-20 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl font-light text-[#f1ede2]">{world.unknown.title}</h2>
          <p className="mt-4 text-[15px] leading-7 text-white/55">{world.unknown.body}</p>
        </section>

        <section className="mt-20 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl font-light text-[#f1ede2]">{world.questions.title}</h2>
          <p className="mt-3 text-[15px] leading-7 text-white/55">{world.questions.lead}</p>
          <ol className="mt-6 space-y-4">
            {world.questions.items.map((question, index) => (
              <li key={question} className="flex gap-4 text-[15px] leading-7 text-white/75">
                <span className="font-mono text-xs text-[#d6a848]/60">{index + 1}</span>
                {question}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 border-t border-white/10 pt-10">
          <h2 className="font-serif text-2xl font-light text-[#f1ede2]">{world.feedback.title}</h2>
          <p className="mt-3 text-[15px] leading-7 text-white/55">{world.feedback.lead}</p>

          <form onSubmit={submitFeedback} className="mt-6">
            <textarea
              value={feedback}
              onChange={(event) => {
                setFeedback(event.target.value);
                if (feedbackState !== 'idle') setFeedbackState('idle');
              }}
              maxLength={1200}
              rows={5}
              placeholder={world.feedback.placeholder}
              className="w-full resize-none rounded-2xl border border-white/12 bg-black/25 px-5 py-4 text-[15px] leading-7 text-white outline-none placeholder:text-white/25 focus:border-emerald-200/30"
            />
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-xs text-white/25">{feedback.length}/1200</span>
              <button
                type="submit"
                disabled={!feedback.trim() || feedbackState === 'sending'}
                className="rounded-full bg-[#e9e5da] px-5 py-3 text-sm font-semibold text-[#10281e] transition hover:bg-white disabled:opacity-40"
              >
                {feedbackState === 'sending' ? 'Wird gesendet …' : world.feedback.button}
              </button>
            </div>
            {feedbackState === 'sent' ? (
              <p role="status" className="mt-4 flex items-center gap-2 text-sm text-emerald-100/60">
                <Check className="h-4 w-4" /> Angekommen. Wir melden uns.
              </p>
            ) : null}
            {feedbackState === 'error' ? (
              <p role="status" className="mt-4 text-sm text-red-100/60">
                Konnte gerade nicht gespeichert werden. Versuch es gleich noch einmal.
              </p>
            ) : null}
          </form>
        </section>

        <footer className="mt-20 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {world.brandName} × SAIMÔR · private Seite
          </span>
          <button
            type="button"
            onClick={() => void leaveWorld()}
            className="text-left text-white/30 underline decoration-white/10 underline-offset-4 transition hover:text-white/55 sm:text-right"
          >
            Zugang auf diesem Gerät beenden
          </button>
        </footer>
      </div>
    </main>
  );
}

function AnswerBlock({ block }: { block: ClientWorldAnswerBlock }) {
  return (
    <section className="mt-20 border-t border-white/10 pt-10">
      <h2 className="font-serif text-2xl font-light text-[#f1ede2]">{block.title}</h2>
      <p className="mt-4 text-[15px] leading-7 text-white/75">{block.lead}</p>
      <div className="mt-4 space-y-4">
        {block.body.map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-7 text-white/55">
            {paragraph}
          </p>
        ))}
      </div>
      <ol className="mt-7 space-y-5">
        {block.steps.map((step, index) => (
          <li key={step} className="flex gap-4">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#d6a848]/25 font-mono text-[10px] text-[#d6a848]/70">
              {index + 1}
            </span>
            <p className="text-[15px] leading-7 text-white/70">{step}</p>
          </li>
        ))}
      </ol>
      <p className="mt-7 rounded-2xl border border-white/10 bg-white/[.03] px-5 py-4 text-[15px] leading-7 text-white/60">
        {block.close}
      </p>
    </section>
  );
}

function NotesBlock({
  block,
  reactions,
  busyReaction,
  reactionError,
  onReact,
}: {
  block: ClientWorldNotesBlock;
  reactions: Record<string, Reaction>;
  busyReaction: string | null;
  reactionError: string | null;
  onReact: (note: ClientWorldNote, value: Reaction) => void;
}) {
  return (
    <section className="mt-20 border-t border-white/10 pt-10">
      <h2 className="font-serif text-2xl font-light text-[#f1ede2]">{block.title}</h2>
      <p className="mt-4 text-[15px] leading-7 text-white/55">{block.lead}</p>

      {block.shot ? (
        <figure className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={block.shot.src}
              alt={block.shot.alt}
              width={720}
              height={1167}
              className="h-auto w-full"
              sizes="(max-width: 720px) 100vw, 720px"
            />
          </div>
          <figcaption className="mt-3 text-xs text-white/30">{block.shot.caption}</figcaption>
        </figure>
      ) : null}

      <div className="mt-12 space-y-12">
        {block.notes.map((note, index) => (
          <article key={note.id}>
            <div className="flex gap-4">
              <span className="mt-1 font-mono text-[10px] text-white/25">{String(index + 1).padStart(2, '0')}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] leading-7 text-white/75">{note.seen}</p>
                <p className="mt-3 border-l border-[#d6a848]/25 pl-4 text-[15px] leading-7 text-white/50">
                  {note.idea}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {REACTION_LABELS.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      disabled={busyReaction === note.id}
                      onClick={() => onReact(note, value)}
                      className={`rounded-full border px-3.5 py-2 text-[13px] transition disabled:opacity-45 ${
                        reactions[note.id] === value
                          ? 'border-emerald-200/25 bg-emerald-200/[.1] text-emerald-100/80'
                          : 'border-white/10 bg-white/[.025] text-white/45 hover:bg-white/[.06] hover:text-white/70'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {reactionError === note.id ? (
                  <p role="status" className="mt-3 text-[13px] text-red-100/55">
                    Konnte gerade nicht gespeichert werden. Versuch es gleich noch einmal.
                  </p>
                ) : reactions[note.id] ? (
                  <p role="status" className="mt-3 flex items-center gap-1.5 text-[13px] text-emerald-100/45">
                    <Check className="h-3.5 w-3.5" /> Notiert.
                  </p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
