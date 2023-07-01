import { removeExercise } from 'backend/domain/exercise/repository/removeExercise';
import { makeErrorResponse, makeSuccessResponse } from 'backend/lib/makeQueryResponse';
import { NextApiRequest, NextApiResponse } from 'next';

export const deleteExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.body;

  try {
    await removeExercise(id);

    return makeSuccessResponse(response, 'EXERCISE_DELETED_SUCCESSFULLY');
  } catch (e) {
    return makeErrorResponse(response, 400);
  }
};
