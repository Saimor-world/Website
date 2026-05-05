ALTER TABLE "SecurityAudit"
  ADD COLUMN "ownerStatus" TEXT NOT NULL DEFAULT 'new',
  ADD COLUMN "ownerNote" TEXT,
  ADD COLUMN "ownerUpdatedAt" TIMESTAMP(3);

CREATE INDEX "SecurityAudit_ownerStatus_createdAt_idx"
  ON "SecurityAudit"("ownerStatus", "createdAt");
