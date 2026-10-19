'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './ResponsiveDetails.module.css';

/** Native disclosure on phones; the same content stays expanded on desktop. */
export default function ResponsiveDetails({ title, children, className = '' }: { title: ReactNode; children: ReactNode; className?: string }) {
  const [wide, setWide] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(min-width: 768px)');
    const update = () => setWide(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return <details className={`${styles.disclosure} ${className}`} open={wide || expanded}
    onToggle={event => { if (!wide) setExpanded(event.currentTarget.open); }}>
    <summary tabIndex={wide ? -1 : 0}>{title}<ChevronDown size={15} aria-hidden="true" /></summary>
    <div>{children}</div>
  </details>;
}
