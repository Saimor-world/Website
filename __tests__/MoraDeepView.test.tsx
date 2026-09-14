import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import MoraDeepView from '@/components/MoraDeepView';
import { dream } from '@/lib/deep-view-dream';

describe('deep view dream rules', () => {
  it('drops noise without proposing anything', () => {
    const result = dream(['newsletter', 'nightwatch']);
    expect(result.dropped).toEqual(['newsletter', 'nightwatch']);
    expect(result.links).toHaveLength(0);
    expect(result.constellation).toBeNull();
    expect(result.task).toBeNull();
  });

  it('a guess alone never forms a constellation', () => {
    const result = dream(['mail', 'meeting']);
    expect(result.links).toEqual([expect.objectContaining({ evidence: 'geraten' })]);
    expect(result.constellation).toBeNull();
    expect(result.task).toBeNull();
  });

  it('backed connections form a constellation with one task', () => {
    const result = dream(['offer', 'meeting']);
    expect(result.constellation).toEqual(['offer', 'meeting']);
    expect(result.task).toEqual({ key: 'prepareOffer', due: true, sources: ['offer', 'meeting'] });
  });

  it('an open approval takes priority and shared words are rejected', () => {
    const result = dream(['offer', 'mail', 'approval', 'newsletter']);
    expect(result.task?.key).toBe('getApproval');
    expect(result.rejected).toEqual([expect.objectContaining({ a: 'newsletter', b: 'offer', reason: 'noSource' })]);
    expect(result.operations.filter((op) => op.kind === 'task')).toHaveLength(1);
  });
});

describe('MoraDeepView', () => {
  it('turns a proposal into a moon and then a star', () => {
    render(<MoraDeepView locale="de" />);
    expect(screen.getByText(/Keine Aufgabe/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Angebot_final.pdf' }));
    fireEvent.click(screen.getByRole('button', { name: 'Kundentermin' }));

    expect(screen.getByText('Angebot vor dem Termin bereitstellen')).toBeInTheDocument();
    expect(screen.getByText('STERNSCHNUPPE')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Annehmen' }));
    expect(screen.getByText('MOND')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Erledigt' }));
    expect(screen.getByText('STERN')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Erledigt' })).not.toBeInTheDocument();
  });

  it('shows dropped noise in the dream log', () => {
    render(<MoraDeepView locale="en" />);
    fireEvent.click(screen.getByRole('button', { name: 'Newsletter' }));
    expect(screen.getByText(/Newsletter dropped – noise/)).toBeInTheDocument();
    expect(screen.getByText(/No task/)).toBeInTheDocument();
  });
});
