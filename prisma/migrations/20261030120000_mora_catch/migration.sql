CREATE TABLE "MoraCatch" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "caughtAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipHash" TEXT NOT NULL,
    "test" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "note" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ticket',
    "enteredAt" TIMESTAMP(3),
    CONSTRAINT "MoraCatch_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "MoraCatch_ticketId_key" ON "MoraCatch"("ticketId");
CREATE INDEX "MoraCatch_status_caughtAt_idx" ON "MoraCatch"("status", "caughtAt");
CREATE INDEX "MoraCatch_ipHash_caughtAt_idx" ON "MoraCatch"("ipHash", "caughtAt");
