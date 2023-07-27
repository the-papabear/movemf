import { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from '@backend/mongoConnection';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@backend/domain/exercise/repository/retrieveExerciseById';

export const getExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    const exercise = await MongoClient.exec(async (db, session) => {
      return await retrieveExerciseById(db, session)(id as string);
    });

    makeSuccessResponse(response, undefined, exercise);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
