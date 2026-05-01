import { describe, expect, it } from 'vitest';
import { buildDemoCompanyProfile } from '@/lib/demo-company';

describe('demo company profile', () => {
  it('derives a simulated HQ profile from an audit', () => {
    const profile = buildDemoCompanyProfile({
      id: 'audit-1',
      name: 'Anonym',
      email: 'owner@coffee-test.de',
      industry: 'Gastronomie',
      companySize: '1-10',
      domain: 'coffee-test.de',
      targetDomain: 'coffee-test.de',
      score: 58,
      level: 'Medium',
      analysis: 'Mittlere Risiken gefunden.',
      recommendations: [
        { title: 'HSTS fehlt', text: 'HTTPS haerten.', priority: 'high' },
        { title: 'security.txt fehlt', text: 'Kontakt anlegen.', priority: 'medium' },
      ],
    });

    expect(profile.companyName).toBe('Coffee Test');
    expect(profile.industry).toBe('Gastronomie');
    expect(profile.rooms.map((room) => room.name)).toContain('Security');
    expect(profile.documents[0].title).toContain('Digital Risk Report');
    expect(profile.tasks[0]).toMatchObject({ title: 'HSTS fehlt', priority: 'high' });
    expect(profile.moraBriefing).toContain('simulierte HQ-Erstansicht');
  });

  it('keeps the preview honest when no recommendations exist', () => {
    const profile = buildDemoCompanyProfile({
      id: 'audit-2',
      name: 'Muster GmbH',
      email: 'kontakt@muster.test',
      score: 91,
      level: 'Low',
      analysis: 'Solide Basis.',
      recommendations: [],
    });

    expect(profile.companyName).toBe('Muster GmbH');
    expect(profile.tasks.length).toBeGreaterThan(0);
    expect(profile.moraBriefing).toContain('bis echte Tools verbunden werden');
  });
});
