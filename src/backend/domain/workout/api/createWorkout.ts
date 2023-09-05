import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { MongoClient } from '@/backend/mongoConnection';
import { generateObjectId } from '@/backend/lib/generateObjectId';
import { persistWorkout } from '@/backend/domain/workout/repository/persistWorkout';
import { createWorkoutUseCase } from '@/backend/domain/workout/usecase/createWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';

export const createWorkout = async (request: NextRequest) => {
  const authSession: any = await getServerSession(authOptions);

  const workoutData = await request.json();

  try {
    const workout = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        generateObjectId,
        persistWorkout: persistWorkout(db, session),
        retrieveExerciseById: retrieveExerciseById(db, session),
      };

      const data = {
        ...workoutData,
        userId: authSession.user.id,
      };

      const res = await createWorkoutUseCase(dependencies)(data);

      return res;
    });

    return makeSuccessResponse('WORKOUT_CREATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
};
