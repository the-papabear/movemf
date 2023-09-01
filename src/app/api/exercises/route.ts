import { NextApiRequest, NextApiResponse } from 'next';

import { getExercises } from '@/backend/domain/exercise/api/getExercises';
import { createExercise } from '@/backend/domain/exercise/api/createExercise';

export async function GET() {
  return await getExercises();
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return await createExercise(req, res);
}
