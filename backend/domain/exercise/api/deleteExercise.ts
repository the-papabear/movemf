import { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from '@backend/mongoConnection';
import { removeWorkout } from '@backend/domain/workout/repository/removeWorkout';
import { removeExercise } from '@backend/domain/exercise/repository/removeExercise';
import { deleteWorkoutUseCase } from '@backend/domain/workout/usecase/deleteWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { deleteExerciseUseCase } from '@backend/domain/exercise/usecase/deleteExercise';
import { retrieveWorkoutById } from '@backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from '@backend/domain/exercise/repository/retrieveExerciseById';
import { removeExerciseDetails } from '@backend/domain/exerciseDetails/repository/removeExerciseDetails';
import { retrieveExerciseDetailsByExerciseId } from '@backend/domain/exerciseDetails/repository/retrieveExerciseDetailsByExerciseId';

export const deleteExercise = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    await MongoClient.exec(async (db, session) => {
      const dependencies = {
        removeExercise: removeExercise(db, session),
        retrieveExerciseById: retrieveExerciseById(db, session),
        retrieveExerciseDetailsByExerciseId: retrieveExerciseDetailsByExerciseId(db, session),
        removeWorkoutUseCase: deleteWorkoutUseCase({
          removeWorkout: removeWorkout(db, session),
          retrieveWorkoutById: retrieveWorkoutById(db, session),
          removeExerciseDetails: removeExerciseDetails(db, session),
        }),
      };

      return await deleteExerciseUseCase(dependencies)({ exerciseId: id as string });
    });

    return makeSuccessResponse(response, 'EXERCISE_DELETED_SUCCESSFULLY');
  } catch (e) {
    return makeErrorResponse(response, 400);
  }
};
