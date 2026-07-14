import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Owner-only diagnostic. Return 404 for everyone else so the endpoint's
  // existence is not disclosed publicly.
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'owner') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      userCount,
      prismaVersion: '7.8.0'
    });
  } catch (error: any) {
    console.error('[Prisma Debug Error]', error);
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
