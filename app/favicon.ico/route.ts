import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Redirect favicon.ico requests to the new logo
  const url = new URL(request.url);
  return NextResponse.redirect(new URL('/saimor-logo-new.png', url.origin), {
    status: 301, // Permanent redirect
  });
}
