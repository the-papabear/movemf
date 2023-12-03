import { BackendError } from '@/backend/errors';
import { IGenerateObjectId } from '@/backend/interfaces';
import { WORKOUT_ERRORS } from '@/backend/domain/workout/usecase/errors';
import { IRetrieveExerciseById } from '@/backend/domain/exercise/interfaces';
import { IRetrieveWorkoutById, IUpdateWorkout, SetDTO } from '@/backend/domain/workout/interfaces';

const editWorkoutUseCase = (dependencies: EditWorkoutDependencies) => async (data: EditWorkoutData) => {
  const { retrieveWorkoutById, retrieveExerciseById, generateObjectId, updateWorkout } = dependencies;
  const { workoutId, sets, name, userId, completedAt } = data;

  const existingWorkoutDTO = await retrieveWorkoutById(workoutId);

  if (!existingWorkoutDTO) {
    throw new BackendError(404, 'WORKOUT_NOT_FOUND');
  }

  const setDTOs = await Promise.all(
    sets.map(async (set) => {
      if (set.reps < 0) {
        throw new BackendError(400, WORKOUT_ERRORS.INVALID_REPS);
      }

      if (set.weight < 0) {
        throw new BackendError(400, WORKOUT_ERRORS.INVALID_WEIGHT);
      }

      const existingExerciseDTO = await retrieveExerciseById(set.exercise._id);

      if (!existingExerciseDTO) {
        throw new BackendError(404, WORKOUT_ERRORS.EXERCISE_NOT_FOUND);
      }

      return set;
    }),
  );

  const updatedWorkoutDTO = createWorkoutDTO(setDTOs);

  await updateWorkout(updatedWorkoutDTO);

  return updatedWorkoutDTO;

  function createWorkoutDTO(sets: SetDTO[]) {
    return {
      sets,
      name,
      userId,
      _id: generateObjectId(),
      completedAt: completedAt ?? new Date(),
    };
  }
};

interface EditWorkoutDependencies {
  updateWorkout: IUpdateWorkout;
  generateObjectId: IGenerateObjectId;
  retrieveWorkoutById: IRetrieveWorkoutById;
  retrieveExerciseById: IRetrieveExerciseById;
}

interface EditWorkoutData {
  name: string;
  userId: string;
  sets: SetDTO[];
  workoutId: string;
  completedAt?: Date;
}

export default editWorkoutUseCase;
