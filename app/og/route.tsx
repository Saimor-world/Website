import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#0E1526", color: "#FFCE45", fontSize: 64,
        fontFamily: "Inter, system-ui"
      }}>
        Saimôr – Klarheit im Wandel
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
