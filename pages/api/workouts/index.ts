import { NextApiRequest, NextApiResponse } from 'next';

import { getWorkouts } from '@backend/domain/workout/api/getWorkouts';
import { createWorkout } from '@backend/domain/workout/api/createWorkout';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getWorkouts(res);
  }

  if (req.method === 'POST') {
    await createWorkout(req, res);
  }
}
