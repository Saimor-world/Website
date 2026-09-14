/**
 * Deep View demo dream: fixed rules over example signals.
 *
 * Mirrors the shape of MÔRA's real dream (Myzel spec): noise is dropped,
 * connections need a reason and say whether they are backed by a source
 * ("gesetzt") or only guessed ("geraten"), a constellation forms only around
 * backed connections, and at most one task is proposed.
 */

export const SIGNAL_KEYS = ['offer', 'mail', 'meeting', 'approval', 'nightwatch', 'newsletter'] as const;
export type SignalKey = (typeof SIGNAL_KEYS)[number];

export type Evidence = 'gesetzt' | 'geraten';
export type LinkReason = 'meetingNamesOffer' | 'mailRepliesOffer' | 'approvalBlocksOffer' | 'sameCustomer';
export type RejectReason = 'noSource' | 'unrelated';
export type TaskKey = 'prepareOffer' | 'clarifyTiers' | 'getApproval';

export type DropOperation = { kind: 'drop'; signal: SignalKey; reason: 'noise' | 'repeat' };
export type LinkOperation = { kind: 'link'; a: SignalKey; b: SignalKey; evidence: Evidence; reason: LinkReason };
export type RejectedOperation = { kind: 'rejected'; a: SignalKey; b: SignalKey; reason: RejectReason };
export type ConstellationOperation = { kind: 'constellation'; stars: SignalKey[] };
export type TaskOperation = { kind: 'task'; task: TaskKey };

export type DreamOperation = DropOperation | LinkOperation | RejectedOperation | ConstellationOperation | TaskOperation;

export type DreamTask = { key: TaskKey; due: boolean; sources: SignalKey[] };

export type DreamResult = {
  operations: DreamOperation[];
  dropped: SignalKey[];
  links: LinkOperation[];
  rejected: RejectedOperation[];
  constellation: SignalKey[] | null;
  task: DreamTask | null;
};

const LINK_RULES: Omit<LinkOperation, 'kind'>[] = [
  { a: 'offer', b: 'meeting', evidence: 'gesetzt', reason: 'meetingNamesOffer' },
  { a: 'offer', b: 'mail', evidence: 'gesetzt', reason: 'mailRepliesOffer' },
  { a: 'offer', b: 'approval', evidence: 'gesetzt', reason: 'approvalBlocksOffer' },
  { a: 'mail', b: 'meeting', evidence: 'geraten', reason: 'sameCustomer' },
];

export function dream(selected: readonly SignalKey[]): DreamResult {
  const has = new Set(selected);

  const dropped: DropOperation[] = [];
  if (has.has('newsletter')) dropped.push({ kind: 'drop', signal: 'newsletter', reason: 'noise' });
  if (has.has('nightwatch')) dropped.push({ kind: 'drop', signal: 'nightwatch', reason: 'repeat' });

  const links: LinkOperation[] = LINK_RULES.filter((rule) => has.has(rule.a) && has.has(rule.b)).map((rule) => ({
    kind: 'link',
    ...rule,
  }));

  const rejected: RejectedOperation[] = [];
  if (has.has('newsletter') && has.has('offer')) {
    rejected.push({ kind: 'rejected', a: 'newsletter', b: 'offer', reason: 'noSource' });
  }
  if (has.has('nightwatch') && (has.has('offer') || has.has('meeting'))) {
    rejected.push({ kind: 'rejected', a: 'nightwatch', b: has.has('offer') ? 'offer' : 'meeting', reason: 'unrelated' });
  }

  // Backed connections form the core; a guess only joins when both ends are already in it.
  const core = new Set<SignalKey>();
  for (const link of links) {
    if (link.evidence === 'gesetzt') {
      core.add(link.a);
      core.add(link.b);
    }
  }
  const constellation = core.size >= 2 ? SIGNAL_KEYS.filter((key) => core.has(key)) : null;

  let task: DreamTask | null = null;
  if (constellation) {
    const key: TaskKey = has.has('approval') ? 'getApproval' : has.has('mail') ? 'clarifyTiers' : 'prepareOffer';
    const source: SignalKey = key === 'getApproval' ? 'approval' : key === 'clarifyTiers' ? 'mail' : 'meeting';
    task = { key, due: has.has('meeting'), sources: ['offer', source] };
  }

  const operations: DreamOperation[] = [
    ...dropped,
    ...links,
    ...rejected,
    ...(constellation ? [{ kind: 'constellation', stars: constellation } as const] : []),
    ...(task ? [{ kind: 'task', task: task.key } as const] : []),
  ];

  return { operations, dropped: dropped.map((op) => op.signal), links, rejected, constellation, task };
}
