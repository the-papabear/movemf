import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { mapToWorkoutDTO } from '@backend/domain/workout/repository/mapper';
import { WorkoutAggregationDB } from '@backend/domain/workout/repository/interfaces';
import { workoutAggregation } from '@backend/domain/workout/repository/aggregations';

export const retrieveWorkoutById = (db: Db, session: ClientSession) => async (workoutId: string) => {
  const workout = (
    await db
      .collection('workouts')
      .aggregate<WithId<WorkoutAggregationDB>>(
        [
          {
            $match: {
              _id: new ObjectId(workoutId),
            },
          },
          ...workoutAggregation,
        ],
        { session },
      )
      .toArray()
  )[0];

  if (!workout) return null;

  return mapToWorkoutDTO(workout);
};
