import { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse, makeSuccessResponse } from 'backend/lib/makeQueryResponse';
import { retrieveWorkoutById } from 'backend/domain/workout/repository/retrieveWorkoutById';

export const getWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.body;

  try {
    const exercise = await retrieveWorkoutById(id);
    return makeSuccessResponse(response, undefined, exercise);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
