ALTER TABLE "SecurityAudit"
  ADD COLUMN "previewStatus" TEXT NOT NULL DEFAULT 'active',
  ADD COLUMN "previewStartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "previewExpiresAt" TIMESTAMP(3),
  ADD COLUMN "claimedAt" TIMESTAMP(3),
  ADD COLUMN "lifecycleLocale" TEXT NOT NULL DEFAULT 'de';

UPDATE "SecurityAudit"
SET
  "previewStartedAt" = "createdAt",
  "previewExpiresAt" = "createdAt" + INTERVAL '30 days'
WHERE "previewExpiresAt" IS NULL;

CREATE INDEX "SecurityAudit_previewStatus_previewExpiresAt_idx"
  ON "SecurityAudit"("previewStatus", "previewExpiresAt");

CREATE TABLE "TrialLifecycleEmail" (
  "id" TEXT NOT NULL,
  "auditId" TEXT NOT NULL,
  "step" TEXT NOT NULL,
  "scheduledFor" TIMESTAMP(3) NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "sentAt" TIMESTAMP(3),
  "providerMessageId" TEXT,
  "error" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "TrialLifecycleEmail_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "TrialLifecycleEmail_auditId_step_key"
  ON "TrialLifecycleEmail"("auditId", "step");

CREATE INDEX "TrialLifecycleEmail_status_scheduledFor_idx"
  ON "TrialLifecycleEmail"("status", "scheduledFor");

ALTER TABLE "TrialLifecycleEmail"
  ADD CONSTRAINT "TrialLifecycleEmail_auditId_fkey"
  FOREIGN KEY ("auditId") REFERENCES "SecurityAudit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
