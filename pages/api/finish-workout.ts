import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export default async function finishWorkout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).json({ error: true, message: 'Only POST operations are allowed.' });
  }

  const session = await getSession({ req });
  if (!session || !session.user?.email) {
    return res.status(401).json({ error: true, message: 'No valid session.' });
  }

  const { exercises } = req.body;

  try {
    const workout = await prisma.workout.create({
      data: {
        user: {
          connect: { email: session.user.email },
        },
        name: 'Quick Add Workout',
      },
    });

    for (const exercise of exercises) {
      const exerciseStats = exercise.exerciseStats[0];
      const newExercise = await prisma.exercise.create({
        data: {
          workout: {
            connect: { id: workout.id },
          },
          name: exercise.name,
        },
      });
      const newExerciseStats = await prisma.exerciseStats.create({
        data: {
          exercise: {
            connect: { id: newExercise.id },
          },
          sets: {
            create: exercise.exerciseStats.sets,
          },
        },
      });
      for (const set of exerciseStats.sets) {
        await prisma.sets.create({
          data: {
            exerciseStats: {
              connect: {
                id: newExerciseStats.id,
              },
            },
            lbs: set.new_lbs,
            reps: set.new_reps,
          },
        });
      }
    }
    return res.status(200).json({ error: false, message: 'Successfully created workout' });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: true, message: 'Server error retrieving workouts.' });
  }
}
