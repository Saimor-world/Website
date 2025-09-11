import { describe, it, expect } from "vitest";
import { z } from "zod";
const Body = z.object({ name: z.string().optional(), email: z.string().email(), message: z.string().min(1), licht: z.boolean().optional() });
describe("contact schema", () => {
  it("rejects invalid email", () => expect(Body.safeParse({ email:"x", message:"m" }).success).toBe(false));
  it("accepts valid body", () => expect(Body.safeParse({ email:"a@b.de", message:"hi" }).success).toBe(true));
});
