import { describe, it, expect, vi, afterEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    dashboardStats: {
      findFirst: vi.fn(async () => ({
        id: "stats-1",
        facts: 247,
        callsToday: 12,
        costsToday: 2.34,
        updatedAt: new Date("2026-01-01T00:00:00.000Z")
      })),
      create: vi.fn(async () => ({
        id: "stats-1",
        facts: 247,
        callsToday: 12,
        costsToday: 2.34,
        updatedAt: new Date("2026-01-01T00:00:00.000Z")
      }))
    },
    waitlist: {
      findMany: vi.fn(async () => [
        {
          id: "w1",
          name: "Ada",
          email: "ada@example.com",
          createdAt: new Date("2026-01-01T00:00:00.000Z")
        }
      ])
    },
    contactMessage: {
      findMany: vi.fn(async () => [
        {
          id: "c1",
          name: "Bob",
          message: "Hello from contact",
          createdAt: new Date("2026-01-02T00:00:00.000Z")
        }
      ])
    },
    message: {
      findMany: vi.fn(async () => [
        {
          id: "m1",
          role: "user",
          content: "Hello from chat",
          timestamp: new Date("2026-01-03T00:00:00.000Z"),
          session: { id: "s1", externalId: "ext-1" }
        }
      ])
    }
  }
}));

import { GET as getActivity } from "@/app/api/dashboard/activity/route";
import { GET as getOverview } from "@/app/api/dashboard/overview/route";
import { POST as logEventPost } from "@/app/api/log-event/route";

const mockRequest = (url: string, headers?: Record<string, string>) =>
  new NextRequest(url, { headers });

describe("dashboard api fallbacks", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns demo activity data when unauthorized", async () => {
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

    const response = await getOverview(
      mockRequest("http://localhost/api/dashboard/overview", { authorization: "Bearer token" })
    );
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
