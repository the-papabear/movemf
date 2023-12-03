import { ClientSession, Db, ObjectId } from 'mongodb';

import { WorkoutDTO } from '@/backend/domain/workout/interfaces';

export const updateWorkout = (db: Db, session: ClientSession) => async (workout: WorkoutDTO) => {
  await db.collection('workouts').updateOne(
    { _id: new ObjectId(workout._id) },
    {
      name: workout.name,
      completedAt: workout.completedAt,
      userId: new ObjectId(workout.userId),
      sets: workout.sets.map((set) => ({ ...set, exercise: new ObjectId(set.exercise._id) })),
    },
    { session },
  );
};
