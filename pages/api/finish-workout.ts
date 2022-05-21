import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export default async function finishWorkout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).json({ error: true, message: 'Only POST operations are allowed.' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: true, message: 'No valid session.' });
  }

  const { email, password } = req.body;

  try {
    await prisma.workout.create({
      data: {
        user: {
          connect: { email: 'littletonconnor@gmail.com' },
        },
        exercises: {
          create: [],
        },
      },
    });

    return res.status(200).json({ error: false, exercises: data.map((d: any) => d.exercises).flat() });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Server error retrieving workouts.' });
  }
}
