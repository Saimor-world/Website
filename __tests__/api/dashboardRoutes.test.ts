import { describe, it, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { GET as getActivity } from "@/app/api/dashboard/activity/route";
import { GET as getOverview } from "@/app/api/dashboard/overview/route";
import { POST as logEventPost } from "@/app/api/log-event/route";

const mockRequest = (url: string) => new NextRequest(url);

describe("dashboard api fallbacks", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns demo activity data when unauthorized", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 401
    }));

    const response = await getActivity(mockRequest("http://localhost/api/dashboard/activity"));
    const json = await response.json();

    expect(json.activities).toHaveLength(3);
    expect(json.isDemo).toBe(true);
  });

  it("returns overview data when upstream succeeds", async () => {
    const overview = {
      memory: { facts: 100 },
      voice: { calls_today: 5 },
      costs: { today_usd: 1.23 }
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => overview
    }));

    const response = await getOverview(mockRequest("http://localhost/api/dashboard/overview"));
    const json = await response.json();

    expect(json).toMatchObject(overview);
    expect(json.isDemo).toBe(false);
  });
});

describe("log event route", () => {
  it("accepts payloads", async () => {
    const req = {
      json: async () => ({ event: "test-event" })
    } as unknown as NextRequest;

    const result = await logEventPost(req);
    expect(result.status).toBe(200);
  });
});
