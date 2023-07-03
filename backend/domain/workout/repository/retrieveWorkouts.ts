import dbConnection from 'backend/mongoConnection';
import { mapToWorkoutDTO } from 'backend/domain/workout/repository/mapper';
import { WorkoutAggregationDB } from 'backend/domain/workout/repository/interfaces';
import { WithId } from 'mongodb';
import { workoutAggregation } from 'backend/domain/workout/repository/aggregations';

const retrieveWorkouts = async () => {
  const db = await dbConnection();

  const workouts = await db
    .collection('workouts')
    .aggregate<WithId<WorkoutAggregationDB>>([...workoutAggregation])
    .toArray();

  return workouts.map((workout) => mapToWorkoutDTO(workout));
};

export default retrieveWorkouts;
