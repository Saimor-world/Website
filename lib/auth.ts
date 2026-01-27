import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import { JWT } from 'next-auth/jwt';

function parseEmailList(value?: string) {
  return (value ?? '')
    .split(',')
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

const providers: any[] = [];

// Optional: owner credential login (useful even without SMTP configured).
// Enable by setting OWNER_PASSWORD (and ideally OWNER_EMAILS).
if (process.env.OWNER_PASSWORD) {
  providers.push(
    CredentialsProvider({
      id: 'credentials',
      name: 'Owner',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = (credentials?.email ?? '').toString().trim().toLowerCase();
        const password = (credentials?.password ?? '').toString();
        const ownerEmails = parseEmailList(process.env.OWNER_EMAILS);

        // If OWNER_EMAILS is set, require the email to be listed.
        if (!email) return null;
        if (ownerEmails.length > 0 && !ownerEmails.includes(email)) return null;
        if (password !== process.env.OWNER_PASSWORD) return null;

        return { id: email, email, name: email, role: 'owner' } as any;
      },
    })
  );
}

if (process.env.EMAIL_SERVER_HOST && process.env.EMAIL_FROM) {
  providers.push(
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT) || 587,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    })
  );
}

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
