import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';
import { MongoClient } from '@/backend/mongoConnection';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExercises } from '@/backend/domain/exercise/repository/retrieveExercises';

export async function getExercises() {
  const authSession: any = await getServerSession(authOptions);

  try {
    const exercises = await MongoClient.exec(async (db, session) => {
      return await retrieveExercises(db, session)(authSession.user.id);
    });

    return makeSuccessResponse('', exercises);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
}
