'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './MoraPerspective.module.css';

const COPY = {
  de: { waiting: 'Durch MÔRAs Augen', title: 'Klarheit.', light: 'Licht hereinlassen', next: 'Mit MÔRA weiter' },
  en: { waiting: 'Through MÔRA’s eyes', title: 'Clarity.', light: 'Let the light in', next: 'Continue with MÔRA' },
} as const;

/** The visitor stays inside the morning. Nothing is fetched or decided for them. */
export default function MoraPerspective({ locale, morning, onLight }: {
  locale: 'de' | 'en'; morning: boolean; onLight: () => void;
}) {
  const c = COPY[locale];
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [morning]);
  return (
    <div className={styles.perspective} data-testid="deep-clarity" data-morning={morning}>
      <h1 ref={heading} tabIndex={-1} className={morning ? styles.title : styles.unspoken}>
        {morning ? c.title : c.waiting}
      </h1>
      <div className={styles.action}>
        {morning ? (
          <Link className={styles.quiet} href={locale === 'de' ? '/mora' : '/en/mora'}>
            {c.next}<ArrowUpRight size={15} />
          </Link>
        ) : (
          <button type="button" className={styles.quiet} onClick={onLight}>{c.light}</button>
        )}
      </div>
    </div>
  );
}
