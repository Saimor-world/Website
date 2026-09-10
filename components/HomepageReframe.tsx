'use client';

export default function HomepageReframe() {
  return (
    <style jsx global>{`
      /* Homepage 2026-09: remove the heavy four-card explainer directly below the hero. */
      #system > div {
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(320px, .92fr);
        column-gap: clamp(3rem, 8vw, 8rem);
        align-items: end;
      }

      #system > div > p:first-child {
        grid-column: 1 / -1;
      }

      #system > div > h2 {
        grid-column: 1;
        margin-top: 1.25rem !important;
        max-width: 760px !important;
      }

      #system > div > h2 + div {
        display: none !important;
      }

      #system > div > div:last-of-type {
        grid-column: 2;
        margin-top: 0 !important;
        border: 0 !important;
        border-left: 1px solid rgba(224, 189, 103, .28) !important;
        background: transparent !important;
        padding: 0 0 .25rem clamp(1.5rem, 3vw, 3rem) !important;
        box-shadow: none !important;
      }

      /* Tablet/iPad: the forest crown should visibly frame the hero again. */
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

      @media (max-width: 900px) {
        #system {
          padding-top: 4.25rem !important;
          padding-bottom: 4.5rem !important;
        }

        #system > div {
          grid-template-columns: 1fr;
          row-gap: 2rem;
        }

        #system > div > h2,
        #system > div > div:last-of-type {
          grid-column: 1;
        }

        #system > div > div:last-of-type {
          border-left: 0 !important;
          border-top: 1px solid rgba(224, 189, 103, .22) !important;
          padding: 1.5rem 0 0 !important;
        }
      }
    `}</style>
  );
}
