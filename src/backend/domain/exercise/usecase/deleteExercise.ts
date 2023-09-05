import { BackendError } from '@/backend/errors';
import { IRemoveWorkoutUseCase } from '@/backend/domain/workout/interfaces';
import { IRemoveExercise, IRetrieveExerciseById } from '@/backend/domain/exercise/interfaces';

export const deleteExerciseUseCase = (dependencies: DeleteExerciseDependencies) => async (data: DeleteExerciseData) => {
  const { removeExercise, retrieveExerciseById } = dependencies;

  const { exerciseId } = data;

  if (!exerciseId) {
    throw new BackendError(400, 'MISSING_EXERCISE_ID');
  }

  const exerciseDTO = await retrieveExerciseById(exerciseId);

  if (!exerciseDTO) {
    throw new BackendError(404, 'EXERCISE_NOT_FOUND');
  }

  await removeExercise(exerciseId);
};

interface DeleteExerciseData {
  exerciseId: string;
}

interface DeleteExerciseDependencies {
  removeExercise: IRemoveExercise;
  removeWorkoutUseCase: IRemoveWorkoutUseCase;
  retrieveExerciseById: IRetrieveExerciseById;
}
