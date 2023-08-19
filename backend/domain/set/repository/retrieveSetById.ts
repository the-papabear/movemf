import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { mapToSetDTO } from '@backend/domain/set/repository/mapper';
import { SetAggregationDB } from '@backend/domain/set/repository/interfaces';
import { setAggregation } from '@backend/domain/set/repository/aggregations';

export const retrieveSetById = (db: Db, session: ClientSession) => async (setId: string) => {
  const set = (
    await db
      .collection('sets')
      .aggregate<WithId<SetAggregationDB>>(
        [
          {
            $match: {
              _id: new ObjectId(setId),
            },
          },
          ...setAggregation,
        ],
        { session },
      )
      .toArray()
  )[0];

  if (!set) return null;

  return mapToSetDTO(set);
};
