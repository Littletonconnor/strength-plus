/*
  Warnings:

  - You are about to drop the column `amount` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Set` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "amount",
DROP COLUMN "weight",
ADD COLUMN     "lbs" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "reps" DOUBLE PRECISION NOT NULL DEFAULT 0;
