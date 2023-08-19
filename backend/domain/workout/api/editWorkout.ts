import { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from '@backend/mongoConnection';
import { generateObjectId } from '@backend/lib/generateObjectId';
import { updateWorkout } from '@backend/domain/workout/repository/updateWorkout';
import { editWorkoutUseCase } from '@backend/domain/workout/usecase/editWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { retrieveWorkoutById } from '@backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from '@backend/domain/exercise/repository/retrieveExerciseById';
import { updateSet } from '@backend/domain/set/repository/updateSet';
import { editSetUseCase } from '@backend/domain/set/usecase/editSet';
import { persistSet } from '@backend/domain/set/repository/persistSet';
import { createSetUseCase } from '@backend/domain/set/usecase/createSet';
import { retrieveSetById } from '@backend/domain/set/repository/retrieveSetById';
import { retrieveSetByIds } from '@backend/domain/set/repository/retrieveSetByIds';

export const editWorkout = async (request: NextApiRequest, response: NextApiResponse, userId: string) => {
  const { reps, time, notes, weight, workoutId, exerciseId, setId, completedAt, setNumber, name } = request.body;

  try {
    const workout = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        updateWorkout: updateWorkout(db, session),
        retrieveWorkoutById: retrieveWorkoutById(db, session),
        retrieveSetById: retrieveSetById(db, session),
        retrieveSetByIds: retrieveSetByIds(db, session),
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
        weight,
        userId,
        setNumber,
        workoutId,
        exerciseId,
        completedAt,
        setId,
      };

      return await editWorkoutUseCase(dependencies)(data);
    });

    return makeSuccessResponse(response, 'WORKOUT_UPDATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
