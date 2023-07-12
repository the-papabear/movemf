import { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@backend/domain/exercise/repository/retrieveExerciseById';

export const getExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    const exercise = await retrieveExerciseById(id as string);

    makeSuccessResponse(response, undefined, exercise);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
