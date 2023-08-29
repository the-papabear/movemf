import { ClientSession, Db, ObjectId } from 'mongodb';

import { SetDTO } from '@backend/domain/set/interfaces';

export const persistSet = (db: Db, session: ClientSession) => async (exerciseDetails: SetDTO) => {
  await db.collection('sets').insertOne(
    {
      ...exerciseDetails,
      _id: new ObjectId(exerciseDetails._id),
      workoutId: new ObjectId(exerciseDetails.workoutId),
      exercise: new ObjectId(exerciseDetails.exercise._id),
    },
    { session },
  );
};
