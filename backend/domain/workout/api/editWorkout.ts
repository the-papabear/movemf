import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { generateObjectId } from 'backend/lib/generateObjectId';
import { updateWorkout } from 'backend/domain/workout/repository/updateWorkout';
import { editWorkoutUseCase } from 'backend/domain/workout/usecase/editWorkout';
import { retrieveWorkoutById } from 'backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from 'backend/domain/exercise/repository/retrieveExerciseById';
import { updateExerciseDetails } from 'backend/domain/exerciseDetails/repository/updateExerciseDetails';
import { editExerciseDetailsUseCase } from 'backend/domain/exerciseDetails/usecase/editExerciseDetails';
import { persistExerciseDetails } from 'backend/domain/exerciseDetails/repository/persistExerciseDetails';
import { createExerciseDetailsUseCase } from 'backend/domain/exerciseDetails/usecase/createExerciseDetails';
import { retrieveExerciseDetailsById } from 'backend/domain/exerciseDetails/repository/retrieveExerciseDetailsById';
import { retrieveExerciseDetailsByIds } from 'backend/domain/exerciseDetails/repository/retrieveExerciseDetailsByIds';
import { makeErrorResponse, makeSuccessResponse } from 'backend/lib/makeQueryResponse';

export const editWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const { reps, time, notes, weight, workoutId, exerciseId, exerciseDetailsId, completedAt } = request.body;

  try {
    const workout = await editWorkoutUseCase({
      updateWorkout,
      retrieveWorkoutById,
      retrieveExerciseDetailsById,
      retrieveExerciseDetailsByIds,
      editExerciseDetailsUseCase: editExerciseDetailsUseCase({
        retrieveWorkoutById,
        retrieveExerciseById,
        updateExerciseDetails,
        retrieveExerciseDetailsById,
      }),
      createExerciseDetailsUseCase: createExerciseDetailsUseCase({
        generateObjectId,
        retrieveWorkoutById,
        retrieveExerciseById,
        persistExerciseDetails,
      }),
    })({
      reps,
      time,
      notes,
      weight,
      workoutId,
      exerciseId,
      completedAt,
      exerciseDetailsId,
    });

    return makeSuccessResponse(response, 'WORKOUT_UPDATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};