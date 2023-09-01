import { NextApiRequest, NextApiResponse } from 'next';

import { getUserId } from '@/backend/lib/getUserId';
import { MongoClient } from '@/backend/mongoConnection';
import { generateObjectId } from '@/backend/lib/generateObjectId';
import { editSetUseCase } from '@/backend/domain/set/usecase/editSet';
import { updateSet } from '@/backend/domain/set/repository/updateSet';
import { persistSet } from '@/backend/domain/set/repository/persistSet';
import { createSetUseCase } from '@/backend/domain/set/usecase/createSet';
import { updateWorkout } from '@/backend/domain/workout/repository/updateWorkout';
import { editWorkoutUseCase } from '@/backend/domain/workout/usecase/editWorkout';
import { retrieveSetById } from '@/backend/domain/set/repository/retrieveSetById';
import { retrieveSetsById } from '@/backend/domain/set/repository/retrieveSetsById';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveWorkoutById } from '@/backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';

export const editWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const userId = await getUserId(request, response);
  const { reps, time, notes, weight, workoutId, exerciseId, setId, completedAt, setNumber, name } = request.body;

  try {
    const workout = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        updateWorkout: updateWorkout(db, session),
        retrieveWorkoutById: retrieveWorkoutById(db, session),
        retrieveSetById: retrieveSetById(db, session),
        retrieveSetByIds: retrieveSetsById(db, session),
        editSetUseCase: editSetUseCase({
          retrieveWorkoutById: retrieveWorkoutById(db, session),
          retrieveExerciseById: retrieveExerciseById(db, session),
          updateSet: updateSet(db, session),
          retrieveSetById: retrieveSetById(db, session),
        }),
        createSetUseCase: createSetUseCase({
          generateObjectId,
          retrieveWorkoutById: retrieveWorkoutById(db, session),
          retrieveExerciseById: retrieveExerciseById(db, session),
          persistSet: persistSet(db, session),
        }),
      };

      const data = {
        reps,
        time,
        name,
        notes,
        setId,
        weight,
        userId,
        setNumber,
        workoutId,
        exerciseId,
        completedAt,
      };

      return await editWorkoutUseCase(dependencies)(data);
    });

    return makeSuccessResponse('WORKOUT_UPDATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
};
