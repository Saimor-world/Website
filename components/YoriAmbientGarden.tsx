import { YORI_VISUAL_ASSET } from '@/lib/yoriVisualAsset';

export default function YoriAmbientGarden({ compact = false }: { compact?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={`yori-photo absolute inset-0 ${compact ? 'yori-photo-compact' : ''}`}
        style={{ backgroundImage: `url(${YORI_VISUAL_ASSET})` }}
      />
      <div className="yori-depth absolute inset-0" />
      <div className="yori-haze absolute inset-0" />
      <div className="yori-grain absolute inset-0" />
      <div className="yori-vignette absolute inset-0" />

      <style>{`
        .yori-photo {
          background-size: cover;
          background-position: center;
          transform: scale(1.035);
          filter: saturate(.82) brightness(.72) contrast(1.06);
          animation: yoriBreathe 22s ease-in-out infinite alternate;
        }
        .yori-photo-compact {
          background-position: center 57%;
          filter: saturate(.74) brightness(.58) contrast(1.09);
          transform: scale(1.08);
        }
        .yori-depth {
          background:
            linear-gradient(90deg, rgba(3,8,5,.72) 0%, rgba(3,8,5,.38) 35%, rgba(3,8,5,.05) 66%, rgba(3,8,5,.2) 100%),
            linear-gradient(180deg, rgba(3,8,5,.18) 0%, transparent 42%, rgba(3,8,5,.44) 100%);
        }
        .yori-haze {
          background:
            radial-gradient(circle at 63% 24%, rgba(237,204,128,.16), transparent 24%),
            radial-gradient(circle at 52% 68%, rgba(118,145,93,.08), transparent 34%);
          mix-blend-mode: screen;
          opacity: .58;
          animation: yoriHaze 14s ease-in-out infinite alternate;
        }
        .yori-grain {
          opacity: .13;
          mix-blend-mode: soft-light;
          background-image:
            radial-gradient(circle at 20% 30%, rgba(255,255,255,.11) 0 .45px, transparent .55px),
            radial-gradient(circle at 70% 64%, rgba(255,255,255,.08) 0 .4px, transparent .5px);
          background-size: 4px 4px, 5px 5px;
        }
        .yori-vignette {
          box-shadow: inset 0 0 180px 36px rgba(2,6,4,.52);
        }
        @keyframes yoriBreathe {
          from { transform: scale(1.035) translate3d(-.3%, .15%, 0); }
          to { transform: scale(1.055) translate3d(.45%, -.18%, 0); }
        }
        @keyframes yoriHaze {
          from { opacity: .42; transform: translate3d(-1%, .4%, 0); }
          to { opacity: .7; transform: translate3d(1.2%, -.6%, 0); }
        }
        @media (max-width: 640px) {
          .yori-photo { background-position: 59% center; transform: scale(1.09); }
          .yori-vignette { box-shadow: inset 0 0 110px 22px rgba(2,6,4,.48); }
        }
        @media (prefers-reduced-motion: reduce) {
          .yori-photo, .yori-haze { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
