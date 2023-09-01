import { NextApiRequest, NextApiResponse } from 'next';

import { getUserId } from '@/backend/lib/getUserId';
import { MongoClient } from '@/backend/mongoConnection';
import retrieveWorkouts from '@/backend/domain/workout/repository/retrieveWorkouts';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';

export const getWorkouts = async (request: NextApiRequest, response: NextApiResponse) => {
  const userId = await getUserId(request, response);

  try {
    const workouts = await MongoClient.exec(async (db, session) => {
      return await retrieveWorkouts(db, session)(userId);
    });

    return makeSuccessResponse(undefined, workouts);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
};
