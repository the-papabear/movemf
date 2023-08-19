import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { makeErrorResponse } from '@backend/lib/makeQueryResponse';
import { deleteSet } from '@backend/domain/set/api/deleteSet';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!ObjectId.isValid(id as string)) {
    return makeErrorResponse(res, 400, 'INVALID_OBJECTID_FORMAT');
  }

  if (req.method === 'DELETE') {
    await deleteSet(req, res);
  }
}
