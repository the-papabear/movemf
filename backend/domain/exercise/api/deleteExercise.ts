import { NextApiRequest, NextApiResponse } from 'next';

import { removeExercise } from 'backend/domain/exercise/repository/removeExercise';
import { makeErrorResponse, makeSuccessResponse } from 'backend/lib/makeQueryResponse';

export const deleteExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    await removeExercise(id as string);

    return makeSuccessResponse(response, 'EXERCISE_DELETED_SUCCESSFULLY');
  } catch (e) {
    return makeErrorResponse(response, 400);
  }
};
