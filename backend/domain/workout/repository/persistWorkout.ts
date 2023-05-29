import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { WorkoutDTO } from 'backend/domain/workout/interfaces';

export const persistWorkout = async (workout: WorkoutDTO) => {
  const connection = await dbConnection();

  await connection.collection('workouts').insertOne({
    ...workout,
    _id: new ObjectId(workout._id),
    exercises: workout.exercises.map((exercise) => new ObjectId(exercise._id)),
  });
};
