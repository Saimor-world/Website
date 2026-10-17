import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PortalExperience from './PortalExperience';

afterEach(cleanup);
describe('the forest doorway', () => {
  for (const locale of ['de', 'en'] as const) it(`enters the shared experience directly in ${locale}`, () => {
    render(<PortalExperience locale={locale} />);
    const door = screen.getByRole('link', { name: locale === 'de' ? 'Schwelle betreten' : 'Cross the threshold' });
    expect(door).toHaveAttribute('href', `${locale === 'de' ? '/mora/deep-view' : '/en/mora/deep-view'}?from=portal`);
    expect(door).toBeEmptyDOMElement();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
