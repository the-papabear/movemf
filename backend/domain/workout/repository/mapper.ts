import { WorkoutDTO } from '@backend/domain/workout/interfaces';
import { WorkoutAggregationDB } from '@backend/domain/workout/repository/interfaces';
import { mapToSetDTO } from '@backend/domain/set/repository/mapper';

export const mapToWorkoutDTO = (workout: WorkoutAggregationDB): WorkoutDTO => {
  return {
    ...workout,
    _id: workout._id.toString(),
    userId: workout.userId.toString(),
    set: workout.set.map((set) => mapToSetDTO(set)),
  };
};
