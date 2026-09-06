import { NextRequest, NextResponse } from 'next/server';
import { verifyPaymentIntentToken, xrplRpc, xrpToDrops } from '@/lib/xrpl-payments';

function deliveredAmount(entry: any, tx: any) {
  const delivered = entry?.meta?.delivered_amount ?? entry?.meta?.DeliveredAmount;
  if (delivered && delivered !== 'unavailable') return delivered;
  return tx?.DeliverMax ?? tx?.Amount ?? null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = typeof body?.token === 'string' ? body.token : '';
    if (!token) return NextResponse.json({ ok: false, error: 'Missing payment token' }, { status: 400 });

    const intent = verifyPaymentIntentToken(token);
    const history = await xrplRpc<any>('account_tx', {
      account: intent.destination,
      ledger_index_min: -1,
      ledger_index_max: -1,
      binary: false,
      limit: 200,
      forward: false,
    });

    const expectedDrops = xrpToDrops(intent.amountXrp);
    const transactions = Array.isArray(history?.transactions) ? history.transactions : [];

    for (const entry of transactions) {
      const tx = entry?.tx_json || entry?.tx || {};
      const result = entry?.meta?.TransactionResult || entry?.meta?.transaction_result || '';
      const amount = deliveredAmount(entry, tx);

      if (tx?.TransactionType !== 'Payment') continue;
      if (String(tx?.Destination || '') !== intent.destination) continue;
      if (Number(tx?.DestinationTag) !== intent.destinationTag) continue;
      if (String(tx?.InvoiceID || '').toUpperCase() !== intent.invoiceId) continue;
      if (entry?.validated === false || result !== 'tesSUCCESS') continue;
      if (typeof amount !== 'string') continue;

      let deliveredDrops: bigint;
      try {
        deliveredDrops = BigInt(amount);
      } catch {
        continue;
      }
      if (deliveredDrops !== expectedDrops) continue;

      return NextResponse.json({
        ok: true,
        paid: true,
        orderId: intent.orderId,
        productId: intent.productId,
        amountXrp: intent.amountXrp,
        transaction: {
          hash: String(entry?.hash || tx?.hash || ''),
          ledgerIndex: Number(entry?.ledger_index || 0) || null,
          closeTimeIso: entry?.close_time_iso || null,
          account: String(tx?.Account || ''),
        },
      });
    }

    return NextResponse.json({
      ok: true,
      paid: false,
      orderId: intent.orderId,
      expiresAt: intent.expiresAt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Payment verification failed';
    const status = message.includes('expired') || message.includes('token') ? 400 : 502;
    return NextResponse.json({ ok: false, paid: false, error: message }, { status });
  }
}
