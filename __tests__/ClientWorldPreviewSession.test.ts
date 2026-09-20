import { describe, expect, it } from 'vitest';
import { worldCookieName, worldPreviewCookieName } from '@/lib/client-world-session';

describe('Client World preview session isolation', () => {
  it('uses a separate cookie from the private Client World', () => {
    expect(worldCookieName('luana')).toBe('saimor_world_luana');
    expect(worldPreviewCookieName('luana')).toBe('saimor_world_preview_luana');
    expect(worldPreviewCookieName('luana')).not.toBe(worldCookieName('luana'));
  });

  it('sanitizes the slug consistently without collapsing preview into private access', () => {
    expect(worldCookieName('Luana!')).toBe('saimor_world_luana');
    expect(worldPreviewCookieName('Luana!')).toBe('saimor_world_preview_luana');
  });
});
