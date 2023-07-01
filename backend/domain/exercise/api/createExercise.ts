import { NextApiRequest, NextApiResponse } from 'next';

import { generateObjectId } from 'backend/lib/generateObjectId';
import persistExercise from 'backend/domain/exercise/repository/persistExercise';
import { makeErrorResponse, makeSuccessResponse } from 'backend/lib/makeQueryResponse';
import { createExerciseUseCase } from 'backend/domain/exercise/usecase/createExercise';
import { retrieveExerciseByName } from 'backend/domain/exercise/repository/retrieveExerciseByName';

export const createExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const { name, link, type } = request.body;

  try {
    const exercise = await createExerciseUseCase({
      persistExercise,
      generateObjectId,
      retrieveExerciseByName,
    })({ name, link, type });

    return makeSuccessResponse(response, 'EXERCISE_CREATED_SUCCESSFULLY', exercise);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
