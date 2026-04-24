import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Try a simple query
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
