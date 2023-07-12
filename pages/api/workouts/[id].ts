import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse } from '@backend/lib/makeQueryResponse';
import { getWorkout } from '@backend/domain/workout/api/getWorkout';
import { editWorkout } from '@backend/domain/workout/api/editWorkout';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!ObjectId.isValid(id as string)) {
    return makeErrorResponse(res, 400, 'INVALID_OBJECTID_FORMAT');
  }

  if (req.method === 'GET') {
    await getWorkout(req, res);
  }

  if (req.method === 'PATCH') {
    await editWorkout(req, res);
  }
}
