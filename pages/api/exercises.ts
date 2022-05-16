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

  try {
    const data = await prisma.exercise.findMany();

    return res.status(200).json({ error: false, exercises: data });
  } catch (error) {
    return res.status(500).json({ error: true, message: 'Server error retrieving workouts.' });
  }
}
