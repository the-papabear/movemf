import { NextRequest } from 'next/server';

import { MongoClient } from '@/backend/mongoConnection';
import { removeSet } from '@/backend/domain/set/repository/removeSet';
import { removeWorkout } from '@/backend/domain/workout/repository/removeWorkout';
import { removeExercise } from '@/backend/domain/exercise/repository/removeExercise';
import { deleteWorkoutUseCase } from '@/backend/domain/workout/usecase/deleteWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { deleteExerciseUseCase } from '@/backend/domain/exercise/usecase/deleteExercise';
import { retrieveWorkoutById } from '@/backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';
import { retrieveSetByExerciseId } from '@/backend/domain/set/repository/retrieveSetByExerciseId';

export const deleteExercise = async (request: NextRequest) => {
  const exerciseId = request.nextUrl.pathname.split('/')[3];

  try {
    await MongoClient.exec(async (db, session) => {
      const dependencies = {
        removeExercise: removeExercise(db, session),
        retrieveExerciseById: retrieveExerciseById(db, session),
        retrieveSetByExerciseId: retrieveSetByExerciseId(db, session),
        removeWorkoutUseCase: deleteWorkoutUseCase({
          removeWorkout: removeWorkout(db, session),
          retrieveWorkoutById: retrieveWorkoutById(db, session),
          removeSet: removeSet(db, session),
        }),
      };

      return await deleteExerciseUseCase(dependencies)({ exerciseId });
    });

    return makeSuccessResponse('EXERCISE_DELETED_SUCCESSFULLY');
  } catch (e) {
    return makeErrorResponse(400);
  }
};
