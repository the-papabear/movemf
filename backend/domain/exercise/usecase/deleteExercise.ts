import { BackendError } from '@backend/errors';
import { IRemoveWorkoutUseCase } from '@backend/domain/workout/interfaces';
import { IRemoveExercise, IRetrieveExerciseById } from '@backend/domain/exercise/interfaces';
import { IRetrieveExerciseDetailsByExerciseId } from '@backend/domain/exerciseDetails/interfaces';

export const deleteExercise = (dependencies: DeleteExerciseDependencies) => async (data: DeleteExerciseData) => {
  const { removeExercise, removeWorkout, retrieveExerciseById, retrieveExerciseDetailsByExerciseId } = dependencies;

  const { exerciseId } = data;

  if (!exerciseId) {
    throw new BackendError(400, 'MISSING_EXERCISE_ID');
  }

  const exerciseDTO = await retrieveExerciseById(exerciseId);

  if (!exerciseDTO) {
    throw new BackendError(404, 'EXERCISE_NOT_FOUND');
  }

  const exDetailsDTOs = await retrieveExerciseDetailsByExerciseId(exerciseId);

  if (exDetailsDTOs.length) {
    exDetailsDTOs.map(async (exDetails) => {
      await removeWorkout(exDetails.workoutId);
    });
  }

  await removeExercise(exerciseId);
};

interface DeleteExerciseData {
  exerciseId: string;
}

interface DeleteExerciseDependencies {
  removeExercise: IRemoveExercise;
  removeWorkout: IRemoveWorkoutUseCase;
  retrieveExerciseById: IRetrieveExerciseById;
  retrieveExerciseDetailsByExerciseId: IRetrieveExerciseDetailsByExerciseId;
}
