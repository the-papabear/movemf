import { ClientSession, Db, ObjectId } from 'mongodb';

import { WorkoutDTO } from '@backend/domain/workout/interfaces';

export const updateWorkout = (db: Db, session: ClientSession) => async (workout: WorkoutDTO) => {
  await db.collection('workouts').replaceOne(
    { _id: new ObjectId(workout._id) },
    {
      completedAt: workout.completedAt,
      exerciseDetails: workout.exerciseDetails.map((exerciseDetails) => new ObjectId(exerciseDetails._id)),
    },
    { session },
  );
};
