import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// During build (Vercel, CI) DATABASE_URL is not always available —
// `prisma generate` doesn't actually open a connection, it just needs
// the URL string to load the config. Fall back to a placeholder so the
// generate step doesn't fail in build environments. Runtime always
// reads the real DATABASE_URL from process.env.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "postgres://placeholder@localhost:5432/placeholder";
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
