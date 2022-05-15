import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'prisma/prisma.mjs';

export default async function history(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(403).json({ error: true, message: 'Only GET operations are allowed.' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: true, message: 'No valid session.' });
  }

  const workouts = Array.isArray(req.query['workouts[]']) ? req.query['workouts[]'] : [req.query['workouts[]']];

  try {
    const data = await prisma.user.findMany({
      where: {
        email: session.email as string,
      },
      include: {
        exercises: {
          where: {
            OR: workouts.map((workout) => ({
              name: {
                contains: workout,
              },
            })),
          },
          include: {
            sets: true,
          },
        },
      },
    });

    return res.status(200).json({ error: false, exercises: data.map((d) => d.exercises).flat() });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Server error retrieving workouts.' });
  }
}
