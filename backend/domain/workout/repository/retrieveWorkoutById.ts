import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';

export const retrieveWorkoutById = async (workoutId: string) => {
  const db = await dbConnection();

  const workout = await db
    .collection('workouts')
    .findOne({ _id: new ObjectId(workoutId) });

  if (!workout) return null;

  return workout;
};
