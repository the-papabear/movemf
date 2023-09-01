import { NextApiRequest, NextApiResponse } from 'next';

import { getExercise } from '@/backend/domain/exercise/api/getExercise';
import { editExercise } from '@/backend/domain/exercise/api/editExercise';
import { deleteExercise } from '@/backend/domain/exercise/api/deleteExercise';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return await getExercise(req);
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  return await editExercise(req, res);
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  return await deleteExercise(req, res);
}
