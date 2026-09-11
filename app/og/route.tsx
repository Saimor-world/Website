import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 78% 34%, rgba(124,211,176,.22), transparent 25%), radial-gradient(circle at 72% 62%, rgba(214,168,72,.14), transparent 22%)' }} />
        <div style={{ position: 'absolute', right: 70, top: 74, width: 430, height: 430, border: '1px solid rgba(255,255,255,.12)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', right: 118, top: 122, width: 334, height: 334, border: '1px solid rgba(214,168,72,.24)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', right: 183, top: 187, width: 204, height: 204, border: '1px solid rgba(139,224,197,.22)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', right: 254, top: 258, width: 62, height: 62, borderRadius: '50%', background: 'radial-gradient(circle, #f3df9f 0%, #78c9ae 34%, rgba(120,201,174,.08) 70%, transparent 72%)', boxShadow: '0 0 80px rgba(139,224,197,.22)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '68%', padding: '72px 0 72px 78px', position: 'relative' }}>
          <div style={{ fontSize: 20, letterSpacing: '7px', textTransform: 'uppercase', color: 'rgba(224,189,103,.84)', marginBottom: 30 }}>SAIMÔR · SOVEREIGN AI SYSTEMS</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 84, lineHeight: .94, letterSpacing: '-4px', marginBottom: 30 }}>Saimôr OS</div>
          <div style={{ fontSize: 38, lineHeight: 1.15, maxWidth: 700, color: 'rgba(246,245,238,.92)' }}>Arbeit, Dateien und KI.<br />An einem Ort.</div>
          <div style={{ display: 'flex', marginTop: 42, gap: 14, alignItems: 'center', color: 'rgba(219,232,223,.58)', fontSize: 18 }}>
            <span>MÔRA</span><span>·</span><span>Security Check</span><span>·</span><span>Workspaces</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
