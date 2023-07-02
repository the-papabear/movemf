import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse } from 'backend/lib/makeQueryResponse';
import { getExercise } from 'backend/domain/exercise/api/getExercise';
import { editExercise } from 'backend/domain/exercise/api/editExercise';
import { deleteExercise } from 'backend/domain/exercise/api/deleteExercise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!ObjectId.isValid(id as string)) {
    return makeErrorResponse(res, 400, 'INVALID_OBJECTID_FORMAT');
  }

  if (req.method === 'GET') {
    return await getExercise(req, res);
  }

  if (req.method === 'PATCH') {
    return await editExercise(req, res);
  }

  if (req.method === 'DELETE') {
    return await deleteExercise(req, res);
  }
}
