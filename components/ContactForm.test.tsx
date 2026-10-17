import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactForm from './ContactForm';

const originalCalendarUrl = process.env.NEXT_PUBLIC_CAL_URL;

afterEach(() => {
  if (originalCalendarUrl === undefined) {
    delete process.env.NEXT_PUBLIC_CAL_URL;
  } else {
    process.env.NEXT_PUBLIC_CAL_URL = originalCalendarUrl;
  }
});

describe('ContactForm', () => {
  it('always offers email contact without exposing configuration details', () => {
    delete process.env.NEXT_PUBLIC_CAL_URL;
    render(<ContactForm locale="de" />);
    const email = screen.getByRole('link', { name: 'E-Mail schreiben' });
    expect(email.getAttribute('href')).toMatch(/^mailto:contact@saimor\.world\?subject=/);
    expect(screen.queryByText(/CAL_URL fehlt/i)).toBeNull();
    expect(screen.queryByRole('link', { name: 'Gespräch buchen' })).toBeNull();
  });

  it('shows booking when a calendar is configured', () => {
    process.env.NEXT_PUBLIC_CAL_URL = 'https://cal.com/example/book';
    render(<ContactForm locale="en" />);
    expect(screen.getByRole('link', { name: 'Send an email' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Book a call' }).getAttribute('href')).toBe('https://cal.com/example/book');
  });
});
