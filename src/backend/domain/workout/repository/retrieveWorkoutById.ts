import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { WorkoutDB } from '@/backend/domain/workout/repository/interfaces';
import { mapToWorkoutDTO } from '@/backend/domain/workout/repository/mapper';
import { workoutAggregation } from '@/backend/domain/workout/repository/aggregations';

export const retrieveWorkoutById = (db: Db, session: ClientSession) => async (workoutId: string) => {
  const workout = (
    await db
      .collection('workouts')
      .aggregate<WithId<WorkoutDB>>(
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
