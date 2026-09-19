import { describe, expect, it } from 'vitest';
import { getClientWorld, getClientWorldAccessEnvKey, getClientWorldNoteIds } from '@/lib/client-world';

describe('client world config', () => {
  it('exposes Luana as a reusable world without the access secret', () => {
    const world = getClientWorld('luana');

    expect(world?.clientName).toBe('Luana');
    expect(world?.brandName).toBe('Luana Lumina');
    expect(JSON.stringify(world)).not.toContain('CLIENT_WORLD_LUANA_CODE');
  });

  it('keeps the access environment key on the server-side definition boundary', () => {
    expect(getClientWorldAccessEnvKey('luana')).toBe('CLIENT_WORLD_LUANA_CODE');
    expect(getClientWorldAccessEnvKey('missing')).toBeNull();
  });

  it('collects reactable note ids across all notes blocks', () => {
    const world = getClientWorld('luana')!;
    const ids = getClientWorldNoteIds(world);

    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain('zwei-buttons');
  });

  /*
   * Die Seite darf nur behaupten, was wir wirklich gesehen haben. Luanas
   * Reichweite, Umsatz oder Buchungen kennen wir nicht - wenn hier jemals
   * eine Zahl auftaucht, ist sie erfunden.
   */
  it('states no metrics about the client anywhere in the copy', () => {
    const copy = JSON.stringify(getClientWorld('luana'));

    expect(copy).not.toMatch(/\d+\s*(Follower|Abonnent|Besucher|Aufrufe|Views|Likes|Buchungen|Prozent|%)/i);
    expect(copy).not.toMatch(/Reichweite von|Conversion|Umsatz/i);
  });

  it('keeps an explicit section about what Saimôr does not know', () => {
    const world = getClientWorld('luana');

    expect(world?.unknown.title).toBeTruthy();
    expect(world?.unknown.body).toMatch(/Instagram|TikTok/);
  });
});
