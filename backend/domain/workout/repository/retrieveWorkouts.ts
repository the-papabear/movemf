import dbConnection from 'backend/mongoConnection';
import { mapToWorkoutDTO } from 'backend/domain/workout/repository/mapper';
import { WorkoutAggregationDB } from 'backend/domain/workout/repository/interfaces';

const retrieveWorkouts = async () => {
  const db = await dbConnection();

  const workouts = await db.collection('workouts').find<WorkoutAggregationDB>({}).toArray();

  return workouts.map((workout) => mapToWorkoutDTO(workout));
};

export default retrieveWorkouts;
