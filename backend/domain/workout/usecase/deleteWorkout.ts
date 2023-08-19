import { BackendError } from '@backend/errors';
import { IRemoveSet } from '@backend/domain/set/interfaces';
import { IRemoveWorkout, IRetrieveWorkoutById } from '@backend/domain/workout/interfaces';

export const deleteWorkoutUseCase = (dependencies: DeleteWorkoutDependencies) => async (data: DeleteWorkoutData) => {
  const { retrieveWorkoutById, removeSet, removeWorkout } = dependencies;

  const { workoutId } = data;

  if (!workoutId) {
    throw new BackendError(400, 'MISSING_WORKOUT_ID');
  }

  const workoutDTO = await retrieveWorkoutById(workoutId);

  if (!workoutDTO) {
    throw new BackendError(404, 'WORKOUT_NOT_FOUND');
  }

  await Promise.all(workoutDTO.set.map(async (exDetails) => await removeSet(exDetails._id)));

  await removeWorkout(workoutId);
};

interface DeleteWorkoutDependencies {
  removeWorkout: IRemoveWorkout;
  retrieveWorkoutById: IRetrieveWorkoutById;
  removeSet: IRemoveSet;
}

export interface DeleteWorkoutData {
  workoutId: string;
}
