import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import WaitlistForm from '@/components/WaitlistForm';

afterEach(cleanup);

describe('WaitlistForm', () => {
  it('uses consistent German copy and honest early-access status', () => {
    render(<WaitlistForm locale="de" />);

    expect(screen.getByLabelText('Dein Name')).toBeInTheDocument();
    expect(screen.getByText('Early Access · Anfragen offen')).toBeInTheDocument();
    expect(screen.queryByText('+120')).not.toBeInTheDocument();
    expect(screen.queryByText('System Access Pending')).not.toBeInTheDocument();
  });

  it('renders the English early-access status', () => {
    render(<WaitlistForm locale="en" />);

    expect(screen.getByLabelText('Your name')).toBeInTheDocument();
    expect(screen.getByText('Early access · Requests open')).toBeInTheDocument();
  });
});
