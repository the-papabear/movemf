import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { mapToSetDTO } from '@backend/domain/set/repository/mapper';
import { SetAggregationDB } from '@backend/domain/set/repository/interfaces';
import { setAggregation } from '@backend/domain/set/repository/aggregations';

export const retrieveSetByIds = (db: Db, session: ClientSession) => async (setIds: string[]) => {
  const set = await db
    .collection('set')
    .aggregate<WithId<SetAggregationDB>>(
      [
        {
          $match: {
            _id: { $in: setIds.map((id) => new ObjectId(id)) },
          },
        },
        ...setAggregation,
      ],
      { session },
    )
    .toArray();

  return set.map((set) => mapToSetDTO(set));
};
