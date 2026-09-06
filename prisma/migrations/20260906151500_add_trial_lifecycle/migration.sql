ALTER TABLE "User"
  ADD COLUMN "trialStartedAt" TIMESTAMP(3),
  ADD COLUMN "trialEndsAt" TIMESTAMP(3),
  ADD COLUMN "trialSource" TEXT;

CREATE INDEX "User_role_trialEndsAt_idx"
  ON "User"("role", "trialEndsAt");
