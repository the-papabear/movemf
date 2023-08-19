import { ClientSession, Db, ObjectId } from 'mongodb';

import { SetDTO } from '@backend/domain/set/interfaces';

export const updateSet = (db: Db, session: ClientSession) => async (set: SetDTO) => {
  await db.collection('set').replaceOne(
    { _id: new ObjectId(set._id) },
    {
      ...set,
      _id: new ObjectId(set._id),
      workoutId: new ObjectId(set.workoutId),
      exercise: new ObjectId(set.exercise._id),
    },
    { session },
  );
};
