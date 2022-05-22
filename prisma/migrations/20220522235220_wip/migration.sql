/*
  Warnings:

  - Added the required column `userId` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
