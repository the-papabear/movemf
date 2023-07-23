import { NextApiRequest, NextApiResponse } from 'next';

import { editExerciseUseCase } from '@backend/domain/exercise/usecase/editExercise';
import { updateExercise } from '@backend/domain/exercise/repository/updateExercise';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@backend/domain/exercise/repository/retrieveExerciseById';
import { retrieveExerciseByName } from '@backend/domain/exercise/repository/retrieveExerciseByName';

export const editExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id, name, link } = request.body;

  try {
    const exercise = await editExerciseUseCase({
      updateExercise,
      retrieveExerciseById,
      retrieveExerciseByName,
    })({ exerciseId: id, name, link });

    return makeSuccessResponse(response, 'EXERCISE_EDITED_SUCCESSFULLY', exercise);
  } catch (e: any) {
    makeErrorResponse(response, e.code, e.message);
  }
};
