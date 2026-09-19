import { describe, expect, it } from 'vitest';
import { getClientWorld, getClientWorldAccessEnvKey } from '@/lib/client-world';

describe('client world config', () => {
  it('exposes Luana as a reusable world without the access secret', () => {
    const world = getClientWorld('luana');

    expect(world?.clientName).toBe('Luana');
    expect(world?.modules.map((module) => module.id)).toEqual(['yori', 'os', 'mora']);
    expect(world?.presence.every((source) => source.state === 'not_connected')).toBe(true);
    expect(JSON.stringify(world)).not.toContain('CLIENT_WORLD_LUANA_CODE');
  });

  it('keeps the access environment key on the server-side definition boundary', () => {
    expect(getClientWorldAccessEnvKey('luana')).toBe('CLIENT_WORLD_LUANA_CODE');
    expect(getClientWorldAccessEnvKey('missing')).toBeNull();
  });
});
