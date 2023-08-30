import { NextApiRequest, NextApiResponse } from 'next';

import { MongoClient } from '@/backend/mongoConnection';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveWorkoutById } from '@/backend/domain/workout/repository/retrieveWorkoutById';

export const getWorkout = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    const workout = await MongoClient.exec(async (db, session) => {
      return await retrieveWorkoutById(db, session)(id as string);
    });

    return makeSuccessResponse(response, undefined, workout);
  } catch (e: any) {
    return makeErrorResponse(response, e.code, e.message);
  }
};
