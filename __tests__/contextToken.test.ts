import { describe, expect, it } from 'vitest';
import { buildContextToken, decodeContextToken } from '@/lib/entry-token';

describe('buildContextToken', () => {
    it('produces a two-part base64url.signature token', () => {
        const token = buildContextToken({
            id: 'audit-1',
            company: 'Müller GmbH',
            email: 'test@example.com',
            domain: 'mueller.de',
            score: 52,
            level: 'Mittleres Risiko',
            grade: 'C',
        }, 'test-secret');

        const parts = token.split('.');
        expect(parts).toHaveLength(2);
        expect(parts[0].length).toBeGreaterThan(10);
    });

    it('decodes payload without requiring secret', () => {
        const token = buildContextToken({
            id: 'audit-1',
            company: 'Müller GmbH',
            email: 'test@example.com',
            domain: 'mueller.de',
            score: 52,
            level: 'Mittleres Risiko',
            grade: 'C',
        }, 'test-secret');

        const payload = decodeContextToken(token);
        expect(payload?.company).toBe('Müller GmbH');
        expect(payload?.score).toBe(52);
        expect(payload?.grade).toBe('C');
    });

    it('payload includes exp 24h from now', () => {
        const before = Math.floor(Date.now() / 1000);
        const token = buildContextToken({
            id: 'audit-1',
            company: 'Test',
            email: 'a@b.com',
            domain: 'b.com',
            score: 80,
            level: 'Niedrig',
            grade: 'B',
        }, 'secret');
        const payload = decodeContextToken(token);
        expect(payload?.exp).toBeGreaterThanOrEqual(before + 86000);
    });
});
