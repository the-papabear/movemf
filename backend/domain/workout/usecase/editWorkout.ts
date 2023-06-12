import { BackendError } from 'backend/errors';
import { IRetrieveWorkoutById } from 'backend/domain/workout/interfaces';

export const editWorkoutUseCase =
  (dependencies: EditWorkoutDependencies) => async (data: EditWorkoutData) => {
    const { retrieveWorkoutById } = dependencies;

    const { workoutId } = data;

    if (!workoutId) {
      throw new BackendError(400, 'invalid_workoutId');
    }

    const workoutDTO = await retrieveWorkoutById(workoutId);

    if (!workoutDTO) {
      throw new BackendError(404, 'workout_not_found');
    }
  };

interface EditWorkoutDependencies {
  retrieveWorkoutById: IRetrieveWorkoutById;
}

interface EditWorkoutData {
  workoutId: string;
  exerciseDetails: {
    reps?: number;
    time?: number;
    notes?: string;
    weight?: number;
    workoutId: string;
    exerciseId: string;
  };
}
