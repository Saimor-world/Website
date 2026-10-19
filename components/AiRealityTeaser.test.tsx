import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import AiRealityTeaser from './AiRealityTeaser';

afterEach(cleanup);

describe('AiRealityTeaser', () => {
  it('raises three meaningful AI trust questions without presenting a news feed', () => {
    render(<AiRealityTeaser locale="de" />);
    expect(screen.getByText('Klingt sicher.')).toBeInTheDocument();
    expect(screen.getByText('Ist es auch belegt?')).toBeInTheDocument();
    expect(screen.getByText('Gehört es wirklich zusammen?')).toBeInTheDocument();
    expect(screen.getByText('Wer gibt es frei?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reality Check öffnen' })).toHaveAttribute('href', '/mora/deep-view');
    expect(screen.queryByRole('button', { name: /Öffentliche Signale laden/ })).not.toBeInTheDocument();
  });

  it('preserves an honest and localized Reality Check in English', () => {
    render(<AiRealityTeaser locale="en" />);
    expect(screen.getByText('Is there evidence?')).toBeInTheDocument();
    expect(screen.getByText('Who approved it?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open Reality Check' })).toHaveAttribute('href', '/en/mora/deep-view');
    expect(screen.getByText('Staged encounter · no live analysis')).toBeInTheDocument();
  });
});
