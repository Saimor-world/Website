import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET() {
  // Logo URL - using absolute URL for edge runtime
  const logoUrl = 'https://saimor.world/saimor-logo-new.png';
  
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // Rich emerald gradient background matching brand
          background: "linear-gradient(135deg, #0a1f18 0%, #081410 30%, #0d2920 60%, #061210 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(217, 175, 95, 0.12) 0%, transparent 70%)",
          }}
        />
        
        {/* Main content card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
            borderRadius: "32px",
            background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo container - white rounded box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "140px",
              height: "140px",
              borderRadius: "28px",
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(16, 185, 129, 0.2)",
              marginBottom: "40px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Saimôr"
              width={100}
              height={100}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          
          {/* Brand name */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 700,
              letterSpacing: "-2px",
              color: "#ffffff",
              marginBottom: "16px",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Saimôr
          </div>
          
          {/* Slogan */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: 500,
              letterSpacing: "6px",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #10B981 0%, #D9AF5F 50%, #10B981 100%)",
              backgroundClip: "text",
              color: "transparent",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Klarheit im Wandel
          </div>
        </div>
        
        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "20px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <span>Beratung</span>
          <span style={{ color: "#10B981" }}>•</span>
          <span>Dashboards</span>
          <span style={{ color: "#10B981" }}>•</span>
          <span>Workshops</span>
          <span style={{ color: "#10B981" }}>•</span>
          <span>DSGVO-konform</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
