/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Lazy Prisma client — Next.js's build-time "Collecting page data" step
// imports this module just to resolve types/exports. We must NOT instantiate
// the client (or check DATABASE_URL) at module-load time, or the build
// fails on Vercel where build-env doesn't carry DATABASE_URL.
//
// Instead: create the client on first property access via a Proxy. The
// missing-env check moves to the moment a query actually runs (where
// throwing is the correct behaviour).

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

function getOrCreate(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Proxy delays construction until first real use. Property access on
// build-time imports (typeof prisma, etc.) still works without crashing.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getOrCreate();
    const value = Reflect.get(client, prop, client);
    return typeof value === 'function' ? value.bind(client) : value;
  },
}) as PrismaClient;
