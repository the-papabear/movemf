import { NextApiResponse } from 'next';

import { MongoClient } from '@backend/mongoConnection';
import retrieveWorkouts from '@backend/domain/workout/repository/retrieveWorkouts';
import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';

export const getWorkouts = async (response: NextApiResponse, userId: string) => {
  try {
    const workouts = await MongoClient.exec(async (db, session) => {
      return await retrieveWorkouts(db, session)(userId);
    });

    return makeSuccessResponse(response, undefined, workouts);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
