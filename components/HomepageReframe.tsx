'use client';

export default function HomepageReframe() {
  return (
    <style jsx global>{`
      /* Tablet/iPad: keep the forest crown visibly framing the hero. */
      @media (min-width: 640px) and (max-width: 1180px) {
        .forest-canopy-left {
          left: -4% !important;
          top: -3% !important;
          width: 58% !important;
          height: 62% !important;
          opacity: .72 !important;
        }

        .forest-canopy-right {
          right: -5% !important;
          top: -4% !important;
          width: 59% !important;
          height: 64% !important;
          opacity: .68 !important;
        }
      }
    `}</style>
  );
}
