-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "expireAt" TIMESTAMP(3);

-- Backfill expireAt for existing rows (7 days from now) then enforce NOT NULL
UPDATE "RefreshToken" SET "expireAt" = NOW() + INTERVAL '7 days' WHERE "expireAt" IS NULL;
ALTER TABLE "RefreshToken" ALTER COLUMN "expireAt" SET NOT NULL;

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "Severity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "Bug" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reproductionSteps" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "codeSnippet" TEXT,
    "codingLanguage" TEXT,
    "severity" "Severity" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "environment" TEXT,
    "attachment" TEXT,
    "reference" TEXT,
    "solution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bug_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "Bug" ADD CONSTRAINT "Bug_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
