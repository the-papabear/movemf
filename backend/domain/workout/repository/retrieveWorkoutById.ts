import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { WorkoutDTO } from 'backend/domain/workout/interfaces';
import { WorkoutAggregationDB } from 'backend/domain/workout/repository/interfaces';
import { mapToWorkoutDTO } from 'backend/domain/workout/repository/mapper';

export const retrieveWorkoutById = async (workoutId: string) => {
  const db = await dbConnection();

  const workout = await db.collection('workouts').findOne<WorkoutAggregationDB>({ _id: new ObjectId(workoutId) });

  if (!workout) return null;

  return mapToWorkoutDTO(workout);
};
