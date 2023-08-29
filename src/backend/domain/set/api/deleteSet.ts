import { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse, makeSuccessResponse } from '@backend/lib/makeQueryResponse';
import { removeSet } from '@backend/domain/set/repository/removeSet';
import { MongoClient } from '@backend/mongoConnection';

export const deleteSet = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;

  try {
    await MongoClient.exec(async (db, session) => {
      await removeSet(db, session)(id as string);
    });

    return makeSuccessResponse(response, 'EXERCISE_DETAILS_DELETED_SUCCESSFULLY');
  } catch (e) {
    return makeErrorResponse(response, 400);
  }
};
