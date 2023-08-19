import { ClientSession, Db, WithId } from 'mongodb';

import { mapToSetDTO } from '@backend/domain/set/repository/mapper';
import { SetAggregationDB } from '@backend/domain/set/repository/interfaces';
import { setAggregation } from '@backend/domain/set/repository/aggregations';

export const retrieveSets = (db: Db, session: ClientSession) => async () => {
  const set = await db
    .collection('sets')
    .aggregate<WithId<SetAggregationDB>>([...setAggregation], { session })
    .toArray();

  return set.map((set) => mapToSetDTO(set));
};
