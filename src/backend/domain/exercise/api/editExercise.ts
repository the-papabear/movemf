import { NextRequest } from 'next/server';

import { MongoClient } from '@/backend/mongoConnection';
import { ExerciseDTO } from '@/backend/domain/exercise/interfaces';
import { editExerciseUseCase } from '@/backend/domain/exercise/usecase/editExercise';
import { updateExercise } from '@/backend/domain/exercise/repository/updateExercise';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';
import { retrieveExerciseByName } from '@/backend/domain/exercise/repository/retrieveExerciseByName';

export async function PATCH(request: NextRequest) {
  const exerciseData: ExerciseDTO = await request.json();

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
        userId: exerciseData.userId,
        exerciseId: exerciseData._id,
      };

      return await editExerciseUseCase(dependencies)(data);
    });

    return makeSuccessResponse('EXERCISE_EDITED_SUCCESSFULLY', exerciseDTO);
  } catch (e: any) {
    makeErrorResponse(e.code, e.message);
  }
}
