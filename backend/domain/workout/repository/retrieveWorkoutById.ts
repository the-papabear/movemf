import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { WorkoutDTO } from 'backend/domain/workout/interfaces';

export const retrieveWorkoutById = async (workoutId: string) => {
  const db = await dbConnection();

  const workout = await db.collection('workouts').findOne({ _id: new ObjectId(workoutId) });

  if (!workout) return null;

  return {
    _id: workout._id.toString(),
    completedAt: workout.completedAt,
    exerciseDetails: workout.exerciseDetails.map((id: ObjectId) => id.toString()),
  } as WorkoutDTO;
};
