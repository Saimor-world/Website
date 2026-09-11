import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const mark = 'https://saimor.world/saimor-mark.svg';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #17392c 0%, #0a1712 54%, #050807 100%)',
          color: '#f6f5ee',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 79% 37%, rgba(124,211,176,.18), transparent 27%), radial-gradient(circle at 72% 67%, rgba(214,168,72,.12), transparent 24%)' }} />
        <div style={{ position: 'absolute', right: 72, top: 72, width: 430, height: 430, borderRadius: '50%', overflow: 'hidden', boxShadow: '0 28px 80px rgba(0,0,0,.38), 0 0 70px rgba(214,168,72,.12)', border: '1px solid rgba(224,189,103,.24)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width="430" height="430" alt="Saimôr orbital seal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '66%', padding: '72px 0 72px 78px', position: 'relative' }}>
          <div style={{ fontSize: 20, letterSpacing: '7px', textTransform: 'uppercase', color: 'rgba(224,189,103,.84)', marginBottom: 30 }}>SAIMÔR · SOVEREIGN AI SYSTEMS</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 84, lineHeight: .94, letterSpacing: '-4px', marginBottom: 30 }}>Saimôr OS</div>
          <div style={{ fontSize: 38, lineHeight: 1.15, maxWidth: 690, color: 'rgba(246,245,238,.92)' }}>Arbeit, Dateien und KI.<br />An einem Ort.</div>
          <div style={{ display: 'flex', marginTop: 42, gap: 14, alignItems: 'center', color: 'rgba(219,232,223,.58)', fontSize: 18 }}><span>MÔRA</span><span>·</span><span>Security Check</span><span>·</span><span>Workspaces</span></div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
