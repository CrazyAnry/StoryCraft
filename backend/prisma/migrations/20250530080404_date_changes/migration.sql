-- AlterTable
ALTER TABLE "User" ALTER COLUMN "planCreatedAt" SET DEFAULT NOW(),
ALTER COLUMN "planWillDeleteAt" SET DEFAULT NOW() + interval '1 month';
