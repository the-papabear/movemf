import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { MongoClient } from '@/backend/mongoConnection';
import { generateObjectId } from '@/backend/lib/generateObjectId';
import persistExercise from '@/backend/domain/exercise/repository/persistExercise';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExerciseByName } from '@/backend/domain/exercise/repository/retrieveExerciseByName';
import { CreateExerciseDependencies, createExerciseUseCase } from '@/backend/domain/exercise/usecase/createExercise';

export async function POST(request: NextRequest) {
  const authSession: any = await getServerSession(authOptions);

  const exerciseData = await request.json();

  try {
    const exerciseDTO = await MongoClient.exec(async (db, session) => {
      const dependencies: CreateExerciseDependencies = {
        generateObjectId,
        persistExercise: persistExercise(db, session),
        retrieveExerciseByName: retrieveExerciseByName(db, session),
      };

      const data = {
        ...exerciseData,
        userId: authSession.user.id,
      };

      return await createExerciseUseCase(dependencies)(data);
    });

    return makeSuccessResponse('EXERCISE_CREATED_SUCCESSFULLY', exerciseDTO);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
}
