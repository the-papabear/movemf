import { BackendError } from '@/backend/errors';
import { IRemoveWorkout, IRetrieveWorkoutById } from '@/backend/domain/workout/interfaces';

export const deleteWorkoutUseCase = (dependencies: DeleteWorkoutDependencies) => async (data: DeleteWorkoutData) => {
  const { retrieveWorkoutById, removeWorkout } = dependencies;

  const { workoutId } = data;

  if (!workoutId) {
    throw new BackendError(400, 'MISSING_WORKOUT_ID');
  }

  const workoutDTO = await retrieveWorkoutById(workoutId);

  if (!workoutDTO) {
    throw new BackendError(404, 'WORKOUT_NOT_FOUND');
  }

  await removeWorkout(workoutId);
};

interface DeleteWorkoutDependencies {
  removeWorkout: IRemoveWorkout;
  retrieveWorkoutById: IRetrieveWorkoutById;
}

export interface DeleteWorkoutData {
  workoutId: string;
}
