import type { WorkoutSchedule } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getWorkoutScheduleById(
  userId: WorkoutSchedule["userId"],
) {
  return prisma.workoutSchedule.findMany({ where: { userId } });
}

export async function createWorkoutSchedule(
  userId: WorkoutSchedule["userId"],
  data: WorkoutSchedule,
) {
  return prisma.workoutSchedule.create({
    data: {
      ...data,
      userId,
    },
  });
}
