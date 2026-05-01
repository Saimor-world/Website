import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createWallEntryFromVerifiedIntent } from '@/lib/wall-entry-service';
import { verifyWallVerificationToken } from '@/lib/wall-verification';

const Body = z.object({
  token: z.string().min(20),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = Body.safeParse(await req.json().catch(() => ({})));
    if (!parsed.success) {
      return NextResponse.json({
        error: 'Der Verifizierungslink ist abgelaufen oder ungueltig.',
      }, { status: 403 });
    }

    const intent = verifyWallVerificationToken(parsed.data.token);
    const result = await createWallEntryFromVerifiedIntent(intent);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error('[Wall Verification Error]', error);
    return NextResponse.json({
      error: 'Der Verifizierungslink ist abgelaufen oder ungueltig.',
    }, { status: 403 });
  }
}
