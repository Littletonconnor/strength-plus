import bcrypt from 'bcrypt';
import { CODES } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/prisma.mjs';

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).json({ error: true, message: 'Only posting to this endpoint is allowed.' });
  }

  const { email, password } = req.body;
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userFound) {
      return res
        .status(404)
        .json({ error: true, code: CODES.email, message: 'Invalid username or password. Please try again.' });
    }

    if (!password || !userFound.password) {
      return res
        .status(404)
        .json({ error: true, code: CODES.password, message: 'Invalid password. Please try again.' });
    }

    const isCorrectPassword = await bcrypt.compare(password, userFound.password);

    if (!isCorrectPassword) {
      return res
        .status(404)
        .json({ error: true, code: CODES.password, message: 'Invalid password. Please try again.' });
    }

    return res.status(200).json({ data: userFound });
  } catch (error) {
    return res.status(500).json({ error: true, code: CODES.email, message: 'Invalid username. Please try again.' });
  }
}
