import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse } from '@backend/lib/makeQueryResponse';
import { deleteExerciseDetails } from '@backend/domain/exerciseDetails/api/deleteExerciseDetails';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!ObjectId.isValid(id as string)) {
    return makeErrorResponse(res, 400, 'INVALID_OBJECTID_FORMAT');
  }

  if (req.method === 'DELETE') {
    await deleteExerciseDetails(req, res);
  }
}
