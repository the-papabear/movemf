import { NextRequest } from 'next/server';

import { MongoClient } from '@/backend/mongoConnection';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { retrieveExerciseById } from '@/backend/domain/exercise/repository/retrieveExerciseById';

export async function GET(request: NextRequest) {
  const url = request.url.split('/');
  const id = url[url.length - 1];

  try {
    const exercise = await MongoClient.exec(async (db, session) => {
      return await retrieveExerciseById(db, session)(id);
    });

    makeSuccessResponse('', exercise);
  } catch (e: any) {
    return makeErrorResponse(e.code, e.message);
  }
}
