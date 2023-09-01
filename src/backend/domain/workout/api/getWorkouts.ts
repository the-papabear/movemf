import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { MongoClient } from '@/backend/mongoConnection';
import retrieveWorkouts from '@/backend/domain/workout/repository/retrieveWorkouts';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';

export const getWorkouts = async () => {
  const authSession: any = await getServerSession(authOptions);

  try {
    const workouts = await MongoClient.exec(async (db, session) => {
      return await retrieveWorkouts(db, session)(authSession.user.id);
    });

    return makeSuccessResponse('', workouts);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
};
