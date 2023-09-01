import { NextApiRequest, NextApiResponse } from 'next';

import { getUserId } from '@/backend/lib/getUserId';
import { MongoClient } from '@/backend/mongoConnection';
import { generateObjectId } from '@/backend/lib/generateObjectId';
import persistExercise from '@/backend/domain/exercise/repository/persistExercise';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { createExerciseUseCase } from '@/backend/domain/exercise/usecase/createExercise';
import { retrieveExerciseByName } from '@/backend/domain/exercise/repository/retrieveExerciseByName';

export const createExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const userId = await getUserId(request, response);

  const { name, link, type } = request.body;

  try {
    const exerciseDTO = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        generateObjectId,
        persistExercise: persistExercise(db, session),
        retrieveExerciseByName: retrieveExerciseByName(db, session),
      };

      const data = {
        name,
        link,
        type,
        userId,
      };

      return await createExerciseUseCase(dependencies)(data);
    });

    return makeSuccessResponse('EXERCISE_CREATED_SUCCESSFULLY', exerciseDTO);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
};
