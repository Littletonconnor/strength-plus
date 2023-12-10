import type { Schedule } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getScheduleById(userId: Schedule["userId"]) {
  return prisma.schedule.findUnique({ where: { userId } });
}

export async function getWorkoutsByScheduleId(id: Schedule["id"]) {
  return prisma.workout.findMany({
    where: { scheduleId: id },
    include: { exercises: true },
  });
}

export async function createWorkoutSchedule(
  userId: Schedule["userId"],
  data: Schedule,
) {
  return prisma.schedule.create({
    data: {
      ...data,
      userId,
    },
  });
}
