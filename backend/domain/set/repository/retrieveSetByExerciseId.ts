import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { SetDB } from '@backend/domain/set/repository/interfaces';

export const retrieveSetByExerciseId = (db: Db, session: ClientSession) => async (exerciseId: string) => {
  const set = await db
    .collection('sets')
    .find<WithId<SetDB>>({ exercise: new ObjectId(exerciseId) }, { session })
    .toArray();

  return set.map((exDetails) => ({
    _id: exDetails._id.toString(),
    workoutId: exDetails.workoutId.toString(),
  }));
};
