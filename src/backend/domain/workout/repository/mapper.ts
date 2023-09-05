import { WorkoutDTO } from '@/backend/domain/workout/interfaces';
import { WorkoutDB } from '@/backend/domain/workout/repository/interfaces';
import { mapToExerciseDTO } from '@/backend/domain/exercise/repository/mapper';

export const mapToWorkoutDTO = (workout: WorkoutDB): WorkoutDTO => {
  return {
    ...workout,
    _id: workout._id.toString(),
    userId: workout.userId.toString(),
    sets: workout.sets.map((set) => ({ ...set, exercise: mapToExerciseDTO(set.exercise) })),
  };
};
