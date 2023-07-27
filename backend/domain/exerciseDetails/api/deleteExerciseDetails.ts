import { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { removeExerciseDetails } from '@backend/domain/exerciseDetails/repository/removeExerciseDetails';
import { MongoClient } from '@backend/mongoConnection';

export const deleteExerciseDetails = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    await MongoClient.exec(async (db, session) => {
      await removeExerciseDetails(db, session)(id as string);
    });

    return makeSuccessResponse(response, 'EXERCISE_DETAILS_DELETED_SUCCESSFULLY');
  } catch (e) {
    return makeErrorResponse(response, 400);
  }
};
