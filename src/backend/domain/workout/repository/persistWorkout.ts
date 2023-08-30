import { ClientSession, Db, ObjectId } from 'mongodb';

import { WorkoutDTO } from '@/backend/domain/workout/interfaces';

export const persistWorkout = (db: Db, session: ClientSession) => async (workout: WorkoutDTO) => {
  await db.collection('workouts').insertOne(
    {
      ...workout,
      _id: new ObjectId(workout._id),
      userId: new ObjectId(workout.userId),
      set: workout.set.map((exDet) => new ObjectId(exDet._id)),
    },
    { session },
  );
};
