import type { NextApiRequest, NextApiResponse } from 'next';

import { createExercise } from 'backend/domain/exercise/api/createExercise';
import { retrieveExercises } from 'backend/domain/exercise/repository/retrieveExercises';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(await retrieveExercises());
  }

  if (req.method === 'POST') {
    await createExercise(req, res);
  }
}
