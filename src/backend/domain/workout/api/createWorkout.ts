import { getServerSession } from 'next-auth/next';
import { NextApiRequest, NextApiResponse } from 'next';

import { authOptions } from '@/lib/auth';
import { MongoClient } from '@/backend/mongoConnection';
import { generateObjectId } from '@/backend/lib/generateObjectId';
import { retrieveSetById } from '@/backend/domain/set/repository/retrieveSetById';
import { persistWorkout } from '@/backend/domain/workout/repository/persistWorkout';
import { createWorkoutUseCase } from '@/backend/domain/workout/usecase/createWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';

export const createWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const authSession: any = await getServerSession(authOptions);

  const { completedAt, name, set } = request.body;

  try {
    const workout = await MongoClient.exec(async (db, session) => {
      const dependencies = {
        generateObjectId,
        persistWorkout: persistWorkout(db, session),
        retrieveSetById: retrieveSetById(db, session),
      };

      const data = { completedAt, userId: authSession.user.id, name, set };

      const res = await createWorkoutUseCase(dependencies)(data);

      return res;
    });

    return makeSuccessResponse('WORKOUT_CREATED_SUCCESSFULLY', workout);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
};
