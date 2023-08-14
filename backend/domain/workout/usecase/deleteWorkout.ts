import { BackendError } from '@backend/errors';
import { IRemoveExerciseDetails } from '@backend/domain/exerciseDetails/interfaces';
import { IRemoveWorkout, IRetrieveWorkoutById } from '@backend/domain/workout/interfaces';

export const deleteWorkoutUseCase = (dependencies: DeleteWorkoutDependencies) => async (data: DeleteWorkoutData) => {
  const { retrieveWorkoutById, removeExerciseDetails, removeWorkout } = dependencies;

  const { workoutId } = data;

  if (!workoutId) {
    throw new BackendError(400, 'MISSING_WORKOUT_ID');
  }

  const workoutDTO = await retrieveWorkoutById(workoutId);

  if (!workoutDTO) {
    throw new BackendError(404, 'WORKOUT_NOT_FOUND');
  }

  await Promise.all(workoutDTO.exerciseDetails.map(async (exDetails) => await removeExerciseDetails(exDetails._id)));

  await removeWorkout(workoutId);
};

interface DeleteWorkoutDependencies {
  removeWorkout: IRemoveWorkout;
  retrieveWorkoutById: IRetrieveWorkoutById;
  removeExerciseDetails: IRemoveExerciseDetails;
}

export interface DeleteWorkoutData {
  workoutId: string;
}
