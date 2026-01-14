import type { AuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
  providers: [
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
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) {
      // Set default role on first sign in
      if (user && account) {
        token.role = 'free';
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // Add role to session
      if (token?.role) {
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
