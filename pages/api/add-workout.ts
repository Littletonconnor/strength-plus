import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

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
    let data = [] as any;
    // todo(connor): Fix the table structure so a user is related to a single exercise so we don't have to do this nasty loop.
    for (const workout of workouts) {
      const user = (await prisma.user.findFirst({
        where: {
          email: session.email as string,
        },
        include: {
          exercises: {
            take: 1,
            orderBy: {
              created_at: 'desc',
            },
            where: {
              name: {
                contains: workout,
              },
            },
            include: {
              sets: {
                orderBy: {
                  created_at: 'desc',
                },
              },
            },
          },
        },
      })) as any;
      data = data.concat(user);
    }

    return res.status(200).json({ error: false, exercises: data.map((d: any) => d.exercises).flat() });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Server error retrieving workouts.' });
  }
}
