import { describe, expect, it } from 'vitest';
import { getClientWorld, getClientWorldAccessEnvKey } from '@/lib/client-world';

describe('client world config', () => {
  it('exposes Luana as a reusable world without the access secret', () => {
    const world = getClientWorld('luana');

    expect(world?.clientName).toBe('Luana');
    expect(world?.modules.map((module) => module.id)).toEqual(['yori', 'os', 'mora']);
    expect(world?.presence.every((source) => source.state === 'not_connected')).toBe(true);
    expect(world?.connections.some((connection) => connection.state === 'live')).toBe(true);
    expect(world?.connections.some((connection) => connection.state === 'preview')).toBe(true);
    expect(world?.connections.some((connection) => connection.state === 'not_connected')).toBe(true);
    expect(world?.connections.every((connection) => ['in', 'core', 'out'].includes(connection.stage))).toBe(true);
    expect(JSON.stringify(world)).not.toContain('CLIENT_WORLD_LUANA_CODE');
  });

  it('grounds every proactive idea in a real editorial observation, not an unexplained suggestion', () => {
    const world = getClientWorld('luana');
    const perspective = [
      ...(world?.perspective.preserve ?? []),
      ...(world?.perspective.clarify ?? []),
      ...(world?.perspective.explore ?? []),
    ];

    expect(world?.ideas.length).toBeGreaterThan(0);
    for (const idea of world?.ideas ?? []) {
      expect(idea.observedFrom.length).toBeGreaterThan(0);
      expect(perspective).toContain(idea.observedFrom);
    }
  });

  it('keeps the access environment key on the server-side definition boundary', () => {
    expect(getClientWorldAccessEnvKey('luana')).toBe('CLIENT_WORLD_LUANA_CODE');
    expect(getClientWorldAccessEnvKey('missing')).toBeNull();
  });
});
