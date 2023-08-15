import { ClientSession, Db, ObjectId } from 'mongodb';

import { WorkoutDTO } from '@backend/domain/workout/interfaces';

export const persistWorkout = (db: Db, session: ClientSession) => async (workout: WorkoutDTO) => {
  console.log(workout);
  await db.collection('workouts').insertOne(
    {
      ...workout,
      _id: new ObjectId(workout._id),
      userId: new ObjectId(workout.userId),
    },
    { session },
  );
};
