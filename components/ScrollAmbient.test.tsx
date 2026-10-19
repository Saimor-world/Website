import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import ScrollAmbient from './ScrollAmbient';
import { createAmbientAudio } from '@/lib/ambientAudio';

let pathname = '/de';
vi.mock('next/navigation', () => ({ usePathname: () => pathname }));
vi.mock('@/lib/ambientAudio', () => ({ createAmbientAudio: vi.fn() }));
const contexts: FakeContext[] = [];
class FakeContext {
  state = 'suspended';
  resume = vi.fn(async () => { this.state = 'running'; });
  close = vi.fn(async () => { this.state = 'closed'; });
  constructor() { contexts.push(this); }
}
const graph = { setScene: vi.fn(), setVolume: vi.fn(), suspend: vi.fn(), resume: vi.fn().mockResolvedValue(undefined), dispose: vi.fn().mockResolvedValue(undefined) };
beforeEach(() => {
  contexts.length = 0; pathname = '/de'; localStorage.clear(); vi.clearAllMocks();
  vi.stubGlobal('AudioContext', FakeContext);
  vi.mocked(createAmbientAudio).mockImplementation(context => ({ ...graph, context }) as ReturnType<typeof createAmbientAudio>);
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it('stays silent until a deliberate click and keeps one engine across public routes', async () => {
  const { rerender } = render(<ScrollAmbient locale="de" />);
  expect(contexts).toHaveLength(0);
  fireEvent.click(screen.getByRole('button', { name: 'Ambient-Klang einschalten' }));
  await screen.findByRole('button', { name: 'Ambient-Klang ausschalten' });
  pathname = '/mora/deep-view'; window.history.replaceState(null, '', '#clarity');
  rerender(<ScrollAmbient locale="de" />);
  await waitFor(() => expect(graph.setScene).toHaveBeenLastCalledWith('clearing'));
  expect(contexts).toHaveLength(1);
  expect(contexts[0].resume).toHaveBeenCalledTimes(1);
  fireEvent.click(screen.getByRole('button', { name: 'Ambient-Klang ausschalten' }));
  await waitFor(() => expect(graph.dispose).toHaveBeenCalledTimes(1));
});

it('closes sound when entering a private world rather than remounting public audio there', async () => {
  const { rerender } = render(<ScrollAmbient locale="de" />);
  fireEvent.click(screen.getByRole('button', { name: 'Ambient-Klang einschalten' }));
  await screen.findByRole('button', { name: 'Ambient-Klang ausschalten' });
  pathname = '/owner/finance'; rerender(<ScrollAmbient locale="de" />);
  expect(screen.queryByTestId('site-ambient')).not.toBeInTheDocument();
  expect(graph.dispose).toHaveBeenCalledTimes(1);
});

it('suspends a hidden tab and resumes the enabled engine', async () => {
  render(<ScrollAmbient locale="en" />);
  fireEvent.click(screen.getByRole('button', { name: 'Turn ambient sound on' }));
  await screen.findByRole('button', { name: 'Turn ambient sound off' });
  const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(graph.suspend).toHaveBeenCalledTimes(1);
  hidden.mockReturnValue(false); act(() => document.dispatchEvent(new Event('visibilitychange')));
  await waitFor(() => expect(graph.resume).toHaveBeenCalledTimes(1));
});

it('retains only the chosen volume, without autoplay on the next load', async () => {
  localStorage.setItem('saimor.ambient.volume.v1', '27');
  render(<ScrollAmbient locale="de" />);
  expect(screen.getByRole('slider', { hidden: true })).toHaveValue('27');
  fireEvent.change(screen.getByRole('slider', { hidden: true }), { target: { value: '18' } });
  expect(localStorage.getItem('saimor.ambient.volume.v1')).toBe('18');
  expect(contexts).toHaveLength(0);
});

it('reports unsupported audio and lets the user retry', async () => {
  vi.stubGlobal('AudioContext', undefined);
  render(<ScrollAmbient locale="de" />);
  fireEvent.click(screen.getByRole('button', { name: 'Ambient-Klang einschalten' }));
  await screen.findByRole('status');
  vi.stubGlobal('AudioContext', FakeContext);
  fireEvent.click(screen.getByRole('button', { name: 'Ambient-Klang einschalten' }));
  await screen.findByRole('button', { name: 'Ambient-Klang ausschalten' });
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

