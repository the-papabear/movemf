import { WorkoutDTO } from 'backend/domain/workout/interfaces';
import { WorkoutAggregationDB } from 'backend/domain/workout/repository/interfaces';
import { mapToExerciseDetailsDTO } from 'backend/domain/exerciseDetails/repository/mapper';

export const mapToWorkoutDTO = (workout: WorkoutAggregationDB): WorkoutDTO => ({
  ...workout,
  _id: workout._id.toString(),
  exerciseDetails: workout.exerciseDetails.map((exerciseDetails) => mapToExerciseDetailsDTO(exerciseDetails)),
});
