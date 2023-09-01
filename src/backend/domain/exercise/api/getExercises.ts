import { NextApiRequest, NextApiResponse } from 'next';

import { getUserId } from '@/backend/lib/getUserId';
import { MongoClient } from '@/backend/mongoConnection';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExercises } from '@/backend/domain/exercise/repository/retrieveExercises';

export async function getExercises(req: NextApiRequest, res: NextApiResponse) {
  const userId = await getUserId(req, res);

  try {
    const exercises = await MongoClient.exec(async (db, session) => {
      return await retrieveExercises(db, session)(userId);
    });

    return makeSuccessResponse('', exercises);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
}
