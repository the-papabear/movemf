import { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { retrieveWorkoutById } from '@backend/domain/workout/repository/retrieveWorkoutById';

export const getWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    const workout = await retrieveWorkoutById(id as string);

    return makeSuccessResponse(response, undefined, workout);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
