import { Exercise, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "connor@gmail.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("connor123", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const schedule = await prisma.schedule.create({
    data: {
      title: "Push Pull Legs",
      description: "A bro split",
      userId: user.id,
    },
  });

  async function createSet(id: Exercise["id"]) {
    await prisma.set.create({
      data: {
        reps: 10,
        weight: 100,
        exerciseId: id,
      },
    });
  }

  const pushA = await prisma.workout.create({
    data: {
      title: "Push",
      description: "Chest, Shoulders, Triceps",
      day: "monday",
      scheduleId: schedule.id,
    },
  });

  const ex1 = await prisma.exercise.create({
    data: {
      title: "bench-press",
      note: "This was a tough one",
      workoutId: pushA.id,
    },
  });

  const ex2 = await prisma.exercise.create({
    data: {
      title: "db-shoulder-press",
      workoutId: pushA.id,
    },
  });

  await createSet(ex1.id);
  await createSet(ex2.id);

  const pullA = await prisma.workout.create({
    data: {
      title: "Pull",
      description: "Back and Biceps",
      day: "tuesday",
      scheduleId: schedule.id,
    },
  });

  const ex3 = await prisma.exercise.create({
    data: {
      title: "pull-ups",
      workoutId: pullA.id,
    },
  });

  const ex4 = await prisma.exercise.create({
    data: {
      title: "hammer-curls",
      workoutId: pullA.id,
    },
  });

  await createSet(ex3.id);
  await createSet(ex4.id);

  const legsA = await prisma.workout.create({
    data: {
      title: "Legs",
      description: "Legs",
      day: "wednesday",
      scheduleId: schedule.id,
    },
  });

  const ex5 = await prisma.exercise.create({
    data: {
      title: "squats",
      workoutId: legsA.id,
    },
  });

  const ex6 = await prisma.exercise.create({
    data: {
      title: "calf-raises",
      workoutId: legsA.id,
    },
  });

  await createSet(ex5.id);
  await createSet(ex6.id);

  const pushB = await prisma.workout.create({
    data: {
      title: "Push",
      description: "Chest, Shoulders, Triceps",
      day: "friday",
      scheduleId: schedule.id,
    },
  });

  const ex7 = await prisma.exercise.create({
    data: {
      title: "db-bench-press",
      workoutId: pushB.id,
    },
  });

  const ex8 = await prisma.exercise.create({
    data: {
      title: "tricep-dips",
      workoutId: pushB.id,
    },
  });

  await createSet(ex7.id);
  await createSet(ex8.id);

  const pullB = await prisma.workout.create({
    data: {
      title: "Pull",
      description: "Back and Biceps",
      day: "saturday",
      scheduleId: schedule.id,
    },
  });

  const ex9 = await prisma.exercise.create({
    data: {
      title: "lat-pull-machine",
      workoutId: pullB.id,
    },
  });

  const ex10 = await prisma.exercise.create({
    data: {
      title: "bicep-curls",
      workoutId: pullB.id,
    },
  });

  await createSet(ex9.id);
  await createSet(ex10.id);

  const legsB = await prisma.workout.create({
    data: {
      title: "Legs",
      description: "Legs",
      day: "sunday",
      scheduleId: schedule.id,
    },
  });

  const ex11 = await prisma.exercise.create({
    data: {
      title: "front-squats",
      workoutId: legsB.id,
    },
  });

  const ex12 = await prisma.exercise.create({
    data: {
      title: "leg-extensions",
      workoutId: legsB.id,
    },
  });

  await createSet(ex11.id);
  await createSet(ex12.id);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
