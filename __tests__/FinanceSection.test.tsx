import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import FinanceSection from '@/components/FinanceSection';

afterEach(cleanup);

describe('FinanceSection (public copy)', () => {
  for (const locale of ['de', 'en'] as const) {
    it(`${locale}: mentions XRP/RLUSD payments, no figures, addresses or trading wording`, () => {
      const { container } = render(<FinanceSection locale={locale} />);
      const text = container.textContent || '';
      expect(text).toMatch(/XRP\/RLUSD/);
      expect(text).not.toMatch(/trad|invest|anlage|bot|rendite|profit|gewinn/i);
      expect(text).not.toMatch(/\br[1-9A-HJ-NP-Za-km-z]{24,34}\b/);
      expect(text).not.toMatch(/\d+[.,]\d+\s?(€|EUR|XRP|RLUSD|\$)/);
    });
  }
});
