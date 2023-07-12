import { NextApiRequest, NextApiResponse } from 'next';

import { createWorkout } from '@backend/domain/workout/api/createWorkout';
import retrieveWorkouts from '@backend/domain/workout/repository/retrieveWorkouts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(await retrieveWorkouts());
  }

  if (req.method === 'POST') {
    await createWorkout(req, res);
  }
}
