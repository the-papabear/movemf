import { NextApiRequest, NextApiResponse } from 'next';

import { getUserId } from '@/backend/lib/getUserId';
import { MongoClient } from '@/backend/mongoConnection';
import { editExerciseUseCase } from '@/backend/domain/exercise/usecase/editExercise';
import { updateExercise } from '@/backend/domain/exercise/repository/updateExercise';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';
import { retrieveExerciseByName } from '@/backend/domain/exercise/repository/retrieveExerciseByName';

export const editExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const userId = await getUserId(request, response);

  const { id, name, link } = request.body;

  try {
    const exerciseDTO = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        updateExercise: updateExercise(db, session),
        retrieveExerciseById: retrieveExerciseById(db, session),
        retrieveExerciseByName: retrieveExerciseByName(db, session),
      };

      const data = {
        name,
        link,
        userId,
        exerciseId: id,
      };

      return await editExerciseUseCase(dependencies)(data);
    });

    return makeSuccessResponse('EXERCISE_EDITED_SUCCESSFULLY', exerciseDTO);
  } catch (e: any) {
    makeErrorResponse(e.code, e.message);
  }
};
