export const runtime = 'nodejs';
import { z } from 'zod';

const Body = z.object({
  name: z.string().trim().max(200).optional(),
  email: z.string().email().optional(),
  message: z.string().trim().max(5000).optional(),
  licht: z.boolean().optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => ({}));
  if (!Body.safeParse(json).success) {
    return new Response('Bad Request', { status: 400 });
  }
  // Kein Mailversand – Cal.com übernimmt die Terminbuchung
  return new Response('OK', { status: 200 });
}
