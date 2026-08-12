import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

export async function GET() {
  const file = await readFile(path.join(process.cwd(), 'public', 'favicon-32.png'));
  return new NextResponse(file, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
}
