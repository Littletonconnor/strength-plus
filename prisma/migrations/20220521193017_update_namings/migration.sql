/*
  Warnings:

  - You are about to drop the column `pr_volume` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `pr_weight` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "pr_volume",
DROP COLUMN "pr_weight";
