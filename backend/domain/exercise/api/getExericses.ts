import { NextApiResponse } from 'next';

import { MongoClient } from '@backend/mongoConnection';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { retrieveExercises } from '@backend/domain/exercise/repository/retrieveExercises';

export const getExercises = async (response: NextApiResponse) => {
  try {
    const exercises = await MongoClient.exec(async (db, session) => {
      return await retrieveExercises(db, session)();
    });

    return makeSuccessResponse(response, undefined, exercises);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
