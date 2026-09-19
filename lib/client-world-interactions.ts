import { prisma } from '@/lib/prisma';

export type ClientWorldReactionValue = 'interesting' | 'later' | 'not_for_me';

const REACTION_VALUES = new Set(['interesting', 'later', 'not_for_me']);

/**
 * Reads back this visitor's past idea reactions from the existing
 * WebsiteEvent pilot store, so the World visibly remembers a decision
 * instead of starting blank on every visit. Best-effort: a transient DB
 * hiccup must not block access to the private world, so failures resolve
 * to "no prior reactions" rather than throwing.
 */
export async function getPriorIdeaReactions(
  slug: string,
  visitorId: string
): Promise<Record<string, ClientWorldReactionValue>> {
  try {
    const events = await prisma.websiteEvent.findMany({
      where: {
        event: 'client_world.idea_reaction',
        visitorId,
        path: `/world/${slug}`,
      },
      orderBy: { createdAt: 'asc' },
      select: { payload: true },
    });

    const reactions: Record<string, ClientWorldReactionValue> = {};
    for (const { payload } of events) {
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) continue;
      const record = payload as Record<string, unknown>;
      const itemId = record.itemId;
      const value = record.value;
      if (typeof itemId === 'string' && typeof value === 'string' && REACTION_VALUES.has(value)) {
        reactions[itemId] = value as ClientWorldReactionValue;
      }
    }
    return reactions;
  } catch (error) {
    console.error('getPriorIdeaReactions failed', error);
    return {};
  }
}
