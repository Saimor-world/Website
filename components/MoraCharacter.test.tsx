import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MoraCharacter, { type MoraOsMood } from './MoraCharacter';
import MoraOsFace from './MoraOsFace';

describe('MoraCharacter OS alignment', () => {
  const osStates: MoraOsMood[] = ['greet', 'rest', 'listen', 'think', 'work', 'done', 'need'];

  it('supports all seven OS A4 states distinctly across orb and face', () => {
    for (const state of osStates) {
      const { container, unmount } = render(<MoraCharacter state={state} label={`MÔRA ${state}`} />);
      const root = container.querySelector('[data-mora-character]');
      const orb = container.querySelector('[data-state]');
      const face = container.querySelector('[data-face-state]');

      expect(root?.getAttribute('data-mood')).toBe(state);
      expect(orb?.getAttribute('data-state')).toBe(state);
      expect(face?.getAttribute('data-face-state')).toBe(state);
      expect(screen.getByRole('img', { name: `MÔRA ${state}` })).toBeTruthy();
      unmount();
    }
  });

  it('does not collapse listen into dream', () => {
    const { container } = render(<MoraCharacter state="listen" />);
    const orb = container.querySelector('[data-state]');
    const face = container.querySelector('[data-face-state]');

    expect(orb?.getAttribute('data-state')).toBe('listen');
    expect(face?.getAttribute('data-face-state')).toBe('listen');
  });

  it('applies OS FACE_LIFT (0.14 * R) vertically to MoraOsFace eyes and smile', () => {
    const { container: listenDom } = render(<MoraOsFace state="listen" />);
    const ellipses = listenDom.querySelectorAll('ellipse');
    // C=50, R=43, FACE_LIFT=6.02 -> cy = 50 + 0.16*43 - 6.02 = 50.86
    const cy = Number(ellipses[0]?.getAttribute('cy'));
    expect(cy).toBeGreaterThan(50);
    expect(cy).toBeLessThan(52);

    const { container: greetDom } = render(<MoraOsFace state="greet" />);
    const paths = Array.from(greetDom.querySelectorAll('path'));
    const smile = paths.find((p) => (p.getAttribute('d') || '').startsWith('M 45.2'));
    expect(smile).toBeTruthy();
    expect(smile?.getAttribute('d')).toContain('58.6');
  });
});
