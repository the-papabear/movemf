import { NextRequest } from 'next/server';

import { MongoClient } from '@/backend/mongoConnection';
import { WorkoutDTO } from '@/backend/domain/workout/interfaces';
import { generateObjectId } from '@/backend/lib/generateObjectId';
import editWorkoutUseCase from '@/backend/domain/workout/usecase/editWorkout';
import { updateWorkout } from '@/backend/domain/workout/repository/updateWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveWorkoutById } from '@/backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';

export async function PATCH(request: NextRequest) {
  const workoutData: WorkoutDTO = await request.json();

  try {
    const workoutDTO = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        generateObjectId,
        updateWorkout: updateWorkout(db, session),
        retrieveWorkoutById: retrieveWorkoutById(db, session),
        retrieveExerciseById: retrieveExerciseById(db, session),
      };

      const data = {
        sets: workoutData.sets,
        name: workoutData.name,
        workoutId: workoutData._id,
        userId: workoutData.userId,
        completedAt: workoutData.completedAt,
      };

      return await editWorkoutUseCase(dependencies)(data);
    });

    return makeSuccessResponse('WORKOUT_EDITED_SUCCESSFULLY', workoutDTO);
  } catch (e: any) {
    makeErrorResponse(e.code, e.message);
  }
}
