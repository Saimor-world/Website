'use client';

/**
 * Screen Reader Only Component
 * Hides content visually but keeps it accessible to screen readers
 */
export default function ScreenReaderOnly({ 
  children,
  as: Component = 'span',
  ...props 
}: { 
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}) {
  return (
    <Component
      className="sr-only"
      {...props}
    >
      {children}
    </Component>
  );
}

