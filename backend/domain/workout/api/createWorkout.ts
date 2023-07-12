import { persistWorkout } from '@backend/domain/workout/repository/persistWorkout';
import { createWorkoutUseCase } from '@backend/domain/workout/usecase/createWorkout';
import { generateObjectId } from '@backend/lib/generateObjectId';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { NextApiRequest, NextApiResponse } from 'next';

export const createWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const { completedAt } = request.body;

  try {
    const workout = await createWorkoutUseCase({
      persistWorkout,
      generateObjectId,
    })({ completedAt });

    return makeSuccessResponse(response, 'WORKOUT_CREATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
