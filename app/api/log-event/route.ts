import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getClientIP, rateLimit } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 8 * 1024;
const logEventLimiter = rateLimit({ interval: 60 * 1000, limit: parseInt(process.env.RATE_LIMIT_LOG_EVENT || "60", 10) });

export const dynamic = "force-dynamic";

const Body = z.object({
  event: z.string().trim().min(1).max(120).regex(/^[a-zA-Z0-9_.:\-]+$/),
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
    const rl = await logEventLimiter.check(request, `log-event:${getClientIP(request)}`);
    if (!rl.success) {
      return NextResponse.json({ success: false, error: "rate_limited" }, { status: 429 });
    }
    const declared = Number(request.headers.get("content-length") || "0");
    if (declared > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: "too_large" }, { status: 413 });
    }
    const raw = await request.text().catch(() => "");
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: "too_large" }, { status: 413 });
    }
    let json: unknown = {};
    try { json = JSON.parse(raw); } catch { json = {}; }
    const parsed = Body.safeParse(json);
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
