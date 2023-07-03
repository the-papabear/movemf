import { ObjectId, WithId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { mapToWorkoutDTO } from 'backend/domain/workout/repository/mapper';
import { WorkoutAggregationDB } from 'backend/domain/workout/repository/interfaces';
import { workoutAggregation } from 'backend/domain/workout/repository/aggregations';

export const retrieveWorkoutById = async (workoutId: string) => {
  const db = await dbConnection();

  const workout = (
    await db
      .collection('workouts')
      .aggregate<WithId<WorkoutAggregationDB>>([
        {
          $match: {
            _id: new ObjectId(workoutId),
          },
        },
        ...workoutAggregation,
      ])
      .toArray()
  )[0];

  if (!workout) return null;

  return mapToWorkoutDTO(workout);
};
