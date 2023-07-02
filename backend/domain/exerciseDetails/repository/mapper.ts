import { mapToExerciseDTO } from 'backend/domain/exercise/repository/mapper';
import { ExerciseDetailsDTO } from 'backend/domain/exerciseDetails/interfaces';
import { ExerciseDetailsAggregationDB } from 'backend/domain/exerciseDetails/repository/interfaces';

export const mapToExerciseDetailsDTO = (exerciseDetails: ExerciseDetailsAggregationDB): ExerciseDetailsDTO => {
  return {
    ...exerciseDetails,
    _id: exerciseDetails._id.toString(),
    workoutId: exerciseDetails.workout.toString(),
    exercise: mapToExerciseDTO(exerciseDetails.exercise),
  };
};
