import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ findMany: vi.fn() }));

vi.mock('@/lib/prisma', () => ({
  prisma: { websiteEvent: { findMany: mocks.findMany } },
}));

import { getPriorIdeaReactions } from '@/lib/client-world-interactions';

describe('getPriorIdeaReactions', () => {
  beforeEach(() => mocks.findMany.mockReset());

  it('folds past idea_reaction events into a itemId -> value map, last write wins', async () => {
    mocks.findMany.mockResolvedValue([
      { payload: { slug: 'luana', itemId: 'content-bridge', value: 'interesting' } },
      { payload: { slug: 'luana', itemId: 'booking-path', value: 'later' } },
      { payload: { slug: 'luana', itemId: 'content-bridge', value: 'not_for_me' } },
    ]);

    const reactions = await getPriorIdeaReactions('luana', 'sid-123');

    expect(reactions).toEqual({
      'content-bridge': 'not_for_me',
      'booking-path': 'later',
    });
    expect(mocks.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { event: 'client_world.idea_reaction', visitorId: 'sid-123', path: '/world/luana' },
      })
    );
  });

  it('ignores malformed or unexpected payload shapes', async () => {
    mocks.findMany.mockResolvedValue([
      { payload: null },
      { payload: 'not-an-object' },
      { payload: { itemId: 'x' } },
      { payload: { itemId: 'y', value: 'not-a-real-reaction' } },
      { payload: { itemId: 'z', value: 'interesting' } },
    ]);

    const reactions = await getPriorIdeaReactions('luana', 'sid-123');

    expect(reactions).toEqual({ z: 'interesting' });
  });

  it('fails closed to an empty map instead of breaking access to the world', async () => {
    // An unexpected (non-array) result is enough to exercise the guard
    // without tripping Vitest's known false-positive "unhandled rejection"
    // reporting for a mocked promise rejection that application code does
    // correctly catch.
    mocks.findMany.mockResolvedValue(null);
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const reactions = await getPriorIdeaReactions('luana', 'sid-123');

    expect(reactions).toEqual({});
    error.mockRestore();
  });
});
