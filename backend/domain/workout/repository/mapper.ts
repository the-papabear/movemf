import { WorkoutDTO } from '@backend/domain/workout/interfaces';
import { WorkoutAggregationDB } from '@backend/domain/workout/repository/interfaces';
import { mapToExerciseDetailsDTO } from '@backend/domain/exerciseDetails/repository/mapper';

export const mapToWorkoutDTO = (workout: WorkoutAggregationDB): WorkoutDTO => {
  return {
    ...workout,
    _id: workout._id.toString(),
    userId: workout.userId.toString(),
    exerciseDetails: workout.exerciseDetails.map((exerciseDetails) => mapToExerciseDetailsDTO(exerciseDetails)),
  };
};
