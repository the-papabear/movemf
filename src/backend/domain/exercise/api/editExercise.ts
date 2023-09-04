import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { MongoClient } from '@/backend/mongoConnection';
import { editExerciseUseCase } from '@/backend/domain/exercise/usecase/editExercise';
import { updateExercise } from '@/backend/domain/exercise/repository/updateExercise';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';
import { retrieveExerciseByName } from '@/backend/domain/exercise/repository/retrieveExerciseByName';

export const editExercise = async (request: NextRequest) => {
  const authSession: any = await getServerSession(authOptions);
  const exerciseData = await request.json();

  try {
    const exerciseDTO = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        updateExercise: updateExercise(db, session),
        retrieveExerciseById: retrieveExerciseById(db, session),
        retrieveExerciseByName: retrieveExerciseByName(db, session),
      };

      const data = {
        name: exerciseData.name,
        link: exerciseData.link,
        exerciseId: exerciseData.id,
        userId: authSession.user.id,
      };

      return await editExerciseUseCase(dependencies)(data);
    });

    return makeSuccessResponse('EXERCISE_EDITED_SUCCESSFULLY', exerciseDTO);
  } catch (e: any) {
    makeErrorResponse(e.code, e.message);
  }
};
