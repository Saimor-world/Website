'use client';

import React from 'react';

type Props = { className?: string };

export default function CommunityNote({ className }: Props) {
  return (
    <section
      className={className}
      aria-label="Community Note"
      style={{
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 12,
        padding: 16,
        backdropFilter: 'blur(6px)'
      }}
    >
      <h3 style={{ margin: 0, fontSize: 18 }}>Community Note</h3>
      <p style={{ marginTop: 8 }}>
        Saimôr ist ein wachsendes Ökosystem. Teile Ideen, Bugs oder Wünsche –
        wir bauen das mit dir weiter.
      </p>
    </section>
  );
}
