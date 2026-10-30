import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';

export const MORA_ORIGINS = [
  'agentaccount.xyz', 'agentpolicy.xyz', 'belege.xyz', 'contentlicensing.xyz', 'cosigners.xyz',
  'digitalinheritance.xyz', 'foerdermittel.xyz', 'pflegeplatz.xyz', 'remittances.xyz', 'vollmacht.xyz',
  'saimor.world/xyz',
];
export const TICKET_TTL_MS = 30 * 60 * 1000;

function secret(): string {
  const s = process.env.MORA_TICKET_SECRET;
  if (!s || s.length < 32) throw new Error('MORA_TICKET_SECRET missing');
  return s;
}
const b64 = (b: Buffer) => b.toString('base64url');

export function ipHash(ip: string): string {
  return createHash('sha256').update(secret() + '|ip|' + ip).digest('hex').slice(0, 32);
}

export function issueTicket(test: boolean) {
  const id = b64(randomBytes(12));
  const exp = Date.now() + TICKET_TTL_MS;
  const body = `${id}.${exp}.${test ? 1 : 0}`;
  const sig = b64(createHmac('sha256', secret()).update(body).digest()).slice(0, 32);
  return { id, ticket: `${body}.${sig}` };
}

export function verifyTicket(ticket: string): { id: string; test: boolean } | null {
  const m = /^([A-Za-z0-9_-]{16})\.(\d{13})\.([01])\.([A-Za-z0-9_-]{32})$/.exec(ticket || '');
  if (!m) return null;
  const [, id, exp, t, sig] = m;
  if (Number(exp) < Date.now()) return null;
  const want = b64(createHmac('sha256', secret()).update(`${id}.${exp}.${t}`).digest()).slice(0, 32);
  if (!timingSafeEqual(Buffer.from(want), Buffer.from(sig))) return null;
  return { id, test: t === '1' };
}

const PROFANITY = [
  'arsch', 'fick', 'fotze', 'hure', 'nazi', 'hitler', 'wichs', 'schlampe', 'missgeburt', 'spast',
  'neger', 'kanake', 'schwuchtel', 'fuck', 'shit', 'bitch', 'cunt', 'nigger', 'nigga', 'faggot',
  'retard', 'whore', 'porn', 'porno', 'sex', 'viagra', 'casino', 'crypto', 'bitcoin',
];
export function needsReview(text: string): boolean {
  const t = text.toLowerCase();
  if (/(https?:|www\.|\b[a-z0-9-]+\.(?:com|de|net|org|io|xyz|ru|info|app|world|co)\b|@|<|>)/i.test(t)) return true;
  const flat = t.normalize('NFKD').replace(/[^a-z0-9]/g, '').replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a');
  return PROFANITY.some((w) => flat.includes(w));
}

export function clean(s: string | undefined, max: number): string {
  return (s || '').normalize('NFC').replace(/[\u0000-\u001f\u007f\u200b-\u200f\u202a-\u202e]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
}
