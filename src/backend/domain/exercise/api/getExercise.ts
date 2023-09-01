import { NextApiRequest } from 'next';

import { MongoClient } from '@/backend/mongoConnection';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';

export const getExercise = async (request: NextApiRequest) => {
  const { id } = request.query;

  try {
    const exercise = await MongoClient.exec(async (db, session) => {
      return await retrieveExerciseById(db, session)(id as string);
    });

    makeSuccessResponse('', exercise);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
};
