/*
  Warnings:

  - You are about to drop the `Set` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- DropTable
DROP TABLE "Set";

-- CreateTable
CREATE TABLE "ExerciseStats" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "ExerciseStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sets" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lbs" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reps" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "setId" TEXT NOT NULL,

    CONSTRAINT "Sets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseStats" ADD CONSTRAINT "ExerciseStats_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sets" ADD CONSTRAINT "Sets_setId_fkey" FOREIGN KEY ("setId") REFERENCES "ExerciseStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
