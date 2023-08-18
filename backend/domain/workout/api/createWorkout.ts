import { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from '@backend/mongoConnection';
import { generateObjectId } from '@backend/lib/generateObjectId';
import { persistWorkout } from '@backend/domain/workout/repository/persistWorkout';
import { createWorkoutUseCase } from '@backend/domain/workout/usecase/createWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { retrieveExerciseDetailsById } from '@backend/domain/exerciseDetails/repository/retrieveExerciseDetailsById';

export const createWorkout = async (request: NextApiRequest, response: NextApiResponse, userId: string) => {
  const { completedAt, name, exerciseDetails } = request.body;

  try {
    const workout = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        generateObjectId,
        persistWorkout: persistWorkout(db, session),
        retrieveExerciseDetailsById: retrieveExerciseDetailsById(db, session),
      };

      const data = { completedAt, userId, name, exerciseDetails };

      const res = await createWorkoutUseCase(dependencies)(data);

      return res;
    });

    return makeSuccessResponse(response, 'WORKOUT_CREATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
