import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { prisma as prismaClient } from './prisma';
import crypto from 'crypto';
import { authPreflight } from './env-preflight';

authPreflight();

function verifyPassword(password: string, storedPassword: string) {
  const [salt, hash] = storedPassword.split(':');
  if (!salt || !hash) return false;
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

function parseEmailList(value?: string) {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

function hashMagicToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function findOrCreateUserByEmail(emailInput: string) {
  const email = emailInput.trim().toLowerCase();
  let user = await prismaClient.user.findUnique({ where: { email } });
  if (user) return user;

  user = await prismaClient.user.create({
    data: {
      email,
      name: email.split('@')[0],
      role: 'free',
    },
  });
  return user;
}

const providers: any[] = [
  CredentialsProvider({
    id: 'magic-token',
    name: 'Magic Token',
    credentials: {
      email: { label: 'Email', type: 'email' },
      token: { label: 'Token', type: 'text' },
    },
    async authorize(credentials) {
      const email = credentials?.email?.toString().trim().toLowerCase();
      const token = credentials?.token?.toString().trim();
      if (!email || !token) return null;

      const tokenHash = hashMagicToken(token);
      const now = new Date();

      const magicToken = await prismaClient.magicLoginToken.findUnique({
        where: { tokenHash },
      });

      if (!magicToken) return null;
      if (magicToken.usedAt) return null;
      if (magicToken.email.toLowerCase() !== email) return null;
      if (magicToken.expiresAt <= now) return null;

      await prismaClient.magicLoginToken.update({
        where: { id: magicToken.id },
        data: { usedAt: now },
      });

      const user = await findOrCreateUserByEmail(email);

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    },
  }),
  CredentialsProvider({
    id: 'credentials',
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;

      const email = credentials.email.toLowerCase();
      
      try {
        const ownerEmails = parseEmailList(process.env.OWNER_EMAILS);
        const ownerPassword = process.env.OWNER_PASSWORD;
        const ownerAllowed = ownerEmails.length === 0 || ownerEmails.includes(email);

        // Allow explicit owner fallback regardless of stored DB password state.
        if (ownerPassword && credentials.password === ownerPassword && ownerAllowed) {
          const ownerUser = await prismaClient.user.upsert({
            where: { email },
            update: { role: 'owner' },
            create: {
              email,
              name: email.split('@')[0],
              role: 'owner',
            },
          });
          return {
            id: ownerUser.id,
            email: ownerUser.email,
            name: ownerUser.name,
            role: 'owner',
          };
        }

        // Import prisma dynamically inside the function to ensure it's loaded
        const { prisma } = await import('./prisma');
        
        if (!prisma || !prisma.user) {
          console.error('Prisma user model is not available');
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = verifyPassword(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      } catch (err) {
        console.error('Authorize error:', err);
        return null;
      }
    },
  }),
];

export const authOptions: AuthOptions = {
  providers,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) {
      // Assign role on sign-in (and keep it stable afterwards).
      if (user && account) {
        const email = (user.email ?? '').toString().trim().toLowerCase();
        const ownerEmails = parseEmailList(process.env.OWNER_EMAILS);
        const proEmails = parseEmailList(process.env.PRO_EMAILS);

        token.role =
          user.role ||
          (email && ownerEmails.includes(email) ? 'owner' : undefined) ||
          (email && proEmails.includes(email) ? 'pro' : undefined) ||
          'free';
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // Add role to session
      if (token?.role) {
        session.user = session.user || {};
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev-and-build-safety',
  debug: process.env.NODE_ENV === 'development',
};
