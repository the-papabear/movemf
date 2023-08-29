import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

import { getWorkouts } from '@/backend/domain/workout/api/getWorkouts';
import { createWorkout } from '@/backend/domain/workout/api/createWorkout';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  const user = session?.user as any;
  const userId = user.id;

  if (req.method === 'GET') {
    await getWorkouts(res, userId);
  }

  if (req.method === 'POST') {
    await createWorkout(req, res, userId);
  }
}
