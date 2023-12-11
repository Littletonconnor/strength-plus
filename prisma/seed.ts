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

  async function createSet(id: Exercise["id"]) {
    await prisma.set.create({
      data: {
        reps: 10,
        weight: 100,
        exerciseId: id,
      },
    });
  }

  const globalTemplate = await prisma.template.create({
    data: {
      category: "Push, Pull, Legs",
      description:
        "A beginner friendly push workout that focuses on chest, shoulders, and triceps.",
      name: "Push A",
    },
  });

  const template = await prisma.template.create({
    data: {
      category: "Push, Pull, Legs",
      description:
        "A beginner friendly push workout that focuses on chest, shoulders, and triceps.",
      name: "Push B",
      userId: user.id,
    },
  });

  const workout = await prisma.workout.create({
    data: {
      title: "Push",
      description:
        "An intermediate push workout that focuses on incline bench press.",
      userId: user.id,
    },
  });

  const workoutEx1 = await prisma.exercise.create({
    data: {
      title: "bench-press",
      note: "This was a tough one",
      workoutId: workout.id,
    },
  });

  const workoutEx2 = await prisma.exercise.create({
    data: {
      title: "db-shoulder-press",
      workoutId: workout.id,
    },
  });

  const templateEx1 = await prisma.exercise.create({
    data: {
      title: "bench-press",
      note: "This was a tough one",
      templateId: template.id,
    },
  });

  const templateEx2 = await prisma.exercise.create({
    data: {
      title: "db-shoulder-press",
      templateId: template.id,
    },
  });

  const globalTemplateEx1 = await prisma.exercise.create({
    data: {
      title: "squats",
      templateId: globalTemplate.id,
    },
  });

  await createSet(workoutEx1.id);
  await createSet(workoutEx2.id);

  await createSet(templateEx1.id);
  await createSet(templateEx2.id);

  await createSet(globalTemplateEx1.id);

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
