import type { NextApiRequest, NextApiResponse } from 'next';

import { getExercises } from '@backend/domain/exercise/api/getExercises';
import { createExercise } from '@backend/domain/exercise/api/createExercise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getExercises(res);
  }

  if (req.method === 'POST') {
    await createExercise(req, res);
  }
}
