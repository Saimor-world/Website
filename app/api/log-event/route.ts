import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const Body = z.object({
  event: z.string().trim().min(1).max(120),
  payload: z.record(z.string(), z.unknown()).optional(),
  path: z.string().trim().max(500).optional(),
  sessionId: z.string().trim().max(120).optional(),
  visitorId: z.string().trim().max(120).optional(),
});

function trimPayload(payload: Record<string, unknown> | undefined) {
  if (!payload) return undefined;
  const json = JSON.stringify(payload);
  if (json.length > 4000) {
    return { truncated: true };
  }
  return payload;
}

export async function POST(request: NextRequest) {
  try {
    const parsed = Body.safeParse(await request.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid event" }, { status: 400 });
    }

    const data = parsed.data;
    if (!prisma.websiteEvent?.create) {
      return NextResponse.json({ success: true, stored: false });
    }

    try {
      await prisma.websiteEvent.create({
        data: {
          event: data.event,
          path: data.path,
          sessionId: data.sessionId,
          visitorId: data.visitorId,
          payload: trimPayload(data.payload) as any,
        },
      });
    } catch (persistError) {
      console.warn("log-event persistence unavailable", persistError);
      return NextResponse.json({ success: true, stored: false });
    }

    return NextResponse.json({ success: true, stored: true });
  } catch (error) {
    console.warn("log-event error", error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export function GET() {
  return NextResponse.json({ success: true, info: "POST to log events" });
}
