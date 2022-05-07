import type { NextApiRequest, NextApiResponse } from 'next';

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(403).json({ error: true, message: 'Only posting to this endpoint is allowed.' });
  }

  console.log('body', req.body);
}
