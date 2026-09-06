import 'server-only';

import crypto from 'node:crypto';

export const XRPL_RPC_URL = process.env.XRPL_RPC_URL || 'https://xrplcluster.com';
const XRPL_ADDRESS_RE = /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/;

export type XrplProduct = {
  id: string;
  name: string;
  description: string;
  amountXrp: string;
};

export const XRPL_PRODUCTS: Record<string, XrplProduct> = {
  'saimor-canary-purchase': {
    id: 'saimor-canary-purchase',
    name: 'Saimôr Canary Purchase',
    description: 'Erster echter End-to-End Produktkauf über XRPL. Beta / Canary.',
    amountXrp: '1',
  },
};

type PaymentIntentPayload = {
  v: 1;
  orderId: string;
  productId: string;
  destination: string;
  destinationTag: number;
  invoiceId: string;
  amountXrp: string;
  createdAt: string;
  expiresAt: string;
};

function signingSecret() {
  const value = process.env.SAIMOR_PAYMENT_SIGNING_SECRET;
  if (!value || value.length < 24) {
    throw new Error('SAIMOR_PAYMENT_SIGNING_SECRET is not configured');
  }
  return value;
}

export function revenueAddress() {
  const value = process.env.SAIMOR_XRPL_REVENUE_ADDRESS?.trim() || '';
  if (!XRPL_ADDRESS_RE.test(value)) {
    throw new Error('SAIMOR_XRPL_REVENUE_ADDRESS is not configured');
  }
  return value;
}

function encodePayload(payload: PaymentIntentPayload) {
  return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
}

function sign(encoded: string) {
  return crypto.createHmac('sha256', signingSecret()).update(encoded).digest('base64url');
}

export function createPaymentIntent(productId: string) {
  const product = XRPL_PRODUCTS[productId];
  if (!product) throw new Error('Unknown product');

  const destination = revenueAddress();
  const orderId = crypto.randomUUID();
  const destinationTag = crypto.randomBytes(4).readUInt32BE(0);
  const invoiceId = crypto.createHash('sha256').update(`saimor:${orderId}`).digest('hex').toUpperCase();
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 30 * 60 * 1000);

  const payload: PaymentIntentPayload = {
    v: 1,
    orderId,
    productId: product.id,
    destination,
    destinationTag,
    invoiceId,
    amountXrp: product.amountXrp,
    createdAt: createdAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };

  const encoded = encodePayload(payload);
  const token = `${encoded}.${sign(encoded)}`;
  const params = new URLSearchParams({
    amount: product.amountXrp,
    network: 'XRPL',
    dt: String(destinationTag),
    invoiceid: invoiceId,
  });

  return {
    token,
    payload,
    product,
    xamanUrl: `https://xaman.app/detect/request:${destination}?${params.toString()}`,
  };
}

export function verifyPaymentIntentToken(token: string): PaymentIntentPayload {
  const [encoded, suppliedSignature] = token.split('.');
  if (!encoded || !suppliedSignature) throw new Error('Invalid payment token');

  const expected = Buffer.from(sign(encoded));
  const supplied = Buffer.from(suppliedSignature);
  if (expected.length !== supplied.length || !crypto.timingSafeEqual(expected, supplied)) {
    throw new Error('Invalid payment token');
  }

  const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as PaymentIntentPayload;
  if (payload.v !== 1 || !XRPL_PRODUCTS[payload.productId]) throw new Error('Invalid payment token');
  if (payload.destination !== revenueAddress()) throw new Error('Payment destination changed');
  if (Date.now() > new Date(payload.expiresAt).getTime()) throw new Error('Payment intent expired');
  return payload;
}

export async function xrplRpc<T>(method: string, params: Record<string, unknown>): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(XRPL_RPC_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ method, params: [{ ...params, api_version: 2 }] }),
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`XRPL RPC returned ${response.status}`);
    const body = await response.json();
    if (body?.result?.status === 'error' || body?.error) {
      throw new Error(body?.result?.error_message || body?.result?.error || body?.error || 'XRPL RPC error');
    }
    return body.result as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function xrpToDrops(amountXrp: string) {
  const [whole = '0', fraction = ''] = amountXrp.split('.');
  const normalizedFraction = `${fraction}000000`.slice(0, 6);
  return BigInt(whole || '0') * 1_000_000n + BigInt(normalizedFraction || '0');
}
