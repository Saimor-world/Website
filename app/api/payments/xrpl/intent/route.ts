import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent } from '@/lib/xrpl-payments';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const productId = typeof body?.productId === 'string' ? body.productId : '';
    const intent = createPaymentIntent(productId);

    return NextResponse.json({
      ok: true,
      product: intent.product,
      token: intent.token,
      orderId: intent.payload.orderId,
      destination: intent.payload.destination,
      destinationTag: intent.payload.destinationTag,
      invoiceId: intent.payload.invoiceId,
      amountXrp: intent.payload.amountXrp,
      expiresAt: intent.payload.expiresAt,
      xamanUrl: intent.xamanUrl,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payment intent failed';
    const status = message === 'Unknown product' ? 400 : 503;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
