import { NextApiRequest, NextApiResponse } from 'next';

import retrieveWorkouts from '@backend/domain/workout/repository/retrieveWorkouts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const workouts = await retrieveWorkouts();

    return res.status(200).json(workouts);
  }
}
