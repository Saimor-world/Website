import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("log-event", body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.warn("log-event error", error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ success: true, info: "POST to log events" });
}
