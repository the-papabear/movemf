import { ClientSession, Db, ObjectId } from 'mongodb';

import { WorkoutDTO } from '@/backend/domain/workout/interfaces';

export const updateWorkout = (db: Db, session: ClientSession) => async (workout: WorkoutDTO) => {
  await db.collection('workouts').replaceOne(
    { _id: new ObjectId(workout._id) },
    {
      name: workout.name,
      completedAt: workout.completedAt,
      userId: new ObjectId(workout.userId),
      set: workout.sets.map((set) => ({ ...set, exercise: set.exercise._id })),
    },
    { session },
  );
};
