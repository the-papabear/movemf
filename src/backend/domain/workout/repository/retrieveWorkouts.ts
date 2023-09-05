import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { WorkoutDB } from '@/backend/domain/workout/repository/interfaces';
import { mapToWorkoutDTO } from '@/backend/domain/workout/repository/mapper';
import { workoutAggregation } from '@/backend/domain/workout/repository/aggregations';

const retrieveWorkouts = (db: Db, session: ClientSession) => async (userId: string) => {
  const workouts = await db
    .collection('workouts')
    .aggregate<WithId<WorkoutDB>>([{ $match: { userId: new ObjectId(userId) } }, ...workoutAggregation], {
      session,
    })
    .toArray();

  return workouts.map((workout) => mapToWorkoutDTO(workout));
};

export default retrieveWorkouts;
