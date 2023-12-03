import { NextApiRequest } from 'next';

import { MongoClient } from '@/backend/mongoConnection';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveWorkoutById } from '@/backend/domain/workout/repository/retrieveWorkoutById';

export async function GET(request: NextApiRequest) {
  const { id } = request.query;

  try {
    const workout = await MongoClient.exec(async (db, session) => {
      return await retrieveWorkoutById(db, session)(id as string);
    });

    return makeSuccessResponse('', workout);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
}
