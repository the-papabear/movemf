import type { NextApiRequest, NextApiResponse } from 'next';

import { getExercises } from '@/backend/domain/exercise/api/getExercises';
import { createExercise } from '@/backend/domain/exercise/api/createExercise';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  const user = session?.user as any;
  const userId = user.id;

  if (req.method === 'GET') {
    await getExercises(res, userId);
  }

  if (req.method === 'POST') {
    await createExercise(req, res, userId);
  }
}
