import { NextApiRequest, NextApiResponse } from 'next';

import { generateObjectId } from '@backend/lib/generateObjectId';
import { updateWorkout } from '@backend/domain/workout/repository/updateWorkout';
import { editWorkoutUseCase } from '@backend/domain/workout/usecase/editWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { retrieveWorkoutById } from '@backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from '@backend/domain/exercise/repository/retrieveExerciseById';
import { updateExerciseDetails } from '@backend/domain/exerciseDetails/repository/updateExerciseDetails';
import { editExerciseDetailsUseCase } from '@backend/domain/exerciseDetails/usecase/editExerciseDetails';
import { persistExerciseDetails } from '@backend/domain/exerciseDetails/repository/persistExerciseDetails';
import { createExerciseDetailsUseCase } from '@backend/domain/exerciseDetails/usecase/createExerciseDetails';
import { retrieveExerciseDetailsById } from '@backend/domain/exerciseDetails/repository/retrieveExerciseDetailsById';
import { retrieveExerciseDetailsByIds } from '@backend/domain/exerciseDetails/repository/retrieveExerciseDetailsByIds';
import { MongoClient } from '@backend/mongoConnection';

export const editWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const { reps, time, notes, weight, workoutId, exerciseId, exerciseDetailsId, completedAt, setNumber } = request.body;

  try {
    const workout = MongoClient.exec(async (db, session) => {
      const dependencies = {
        retrieveExerciseDetailsById,
        retrieveExerciseDetailsByIds,
        updateWorkout: updateWorkout(db, session),
        retrieveWorkoutById: retrieveWorkoutById(db, session),
        editExerciseDetailsUseCase: editExerciseDetailsUseCase({
          updateExerciseDetails,
          retrieveExerciseDetailsById,
          retrieveWorkoutById: retrieveWorkoutById(db, session),
          retrieveExerciseById: retrieveExerciseById(db, session),
        }),
        createExerciseDetailsUseCase: createExerciseDetailsUseCase({
          generateObjectId,
          persistExerciseDetails,
          retrieveWorkoutById: retrieveWorkoutById(db, session),
          retrieveExerciseById: retrieveExerciseById(db, session),
        }),
      };

      const data = {
        reps,
        time,
        notes,
        weight,
        setNumber,
        workoutId,
        exerciseId,
        completedAt,
        exerciseDetailsId,
      };

      return await editWorkoutUseCase(dependencies)(data);
    });

    return makeSuccessResponse(response, 'WORKOUT_UPDATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
