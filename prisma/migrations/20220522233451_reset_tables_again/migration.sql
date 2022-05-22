/*
  Warnings:

  - You are about to drop the column `userId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `setId` on the `Sets` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseStats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `statId` to the `Sets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseStats" DROP CONSTRAINT "ExerciseStats_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Sets" DROP CONSTRAINT "Sets_setId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Sets" DROP COLUMN "setId",
ADD COLUMN     "statId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExerciseStats";

-- CreateTable
CREATE TABLE "Stats" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_statId_fkey" FOREIGN KEY ("statId") REFERENCES "Stats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
