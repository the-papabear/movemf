import { persistWorkout } from '@backend/domain/workout/repository/persistWorkout';
import { createWorkoutUseCase } from '@backend/domain/workout/usecase/createWorkout';
import { generateObjectId } from '@backend/lib/generateObjectId';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { MongoClient } from '@backend/mongoConnection';
import { NextApiRequest, NextApiResponse } from 'next';

export const createWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const { completedAt } = request.body;

  try {
    const workout = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        generateObjectId,
        persistWorkout: persistWorkout(db, session),
      };

      const data = { completedAt };

      const res = await createWorkoutUseCase(dependencies)(data);

      return res;
    });

    return makeSuccessResponse(response, 'WORKOUT_CREATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
