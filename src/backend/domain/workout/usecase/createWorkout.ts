import { BackendError } from '@/backend/errors';
import { IGenerateObjectId } from '@/backend/interfaces';
import { WORKOUT_ERRORS } from '@/backend/domain/workout/usecase/errors';
import { IRetrieveExerciseById } from '@/backend/domain/exercise/interfaces';
import { IPersistWorkout, SetDTO } from '@/backend/domain/workout/interfaces';

export const createWorkoutUseCase = (dependencies: CreateWorkoutDependencies) => async (data: CreateWorkoutData) => {
  const { persistWorkout, generateObjectId, retrieveExerciseById } = dependencies;

  const { completedAt, userId, name, sets } = data;

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

  const workoutDTO = createWorkoutDTO(setDTOs);

  await persistWorkout(workoutDTO);

  return workoutDTO;

  function createWorkoutDTO(sets: SetDTO[]) {
    return {
      name,
      sets,
      userId,
      _id: generateObjectId(),
      completedAt: completedAt ?? new Date(),
    };
  }
};

interface CreateWorkoutDependencies {
  persistWorkout: IPersistWorkout;
  generateObjectId: IGenerateObjectId;
  retrieveExerciseById: IRetrieveExerciseById;
}

interface CreateWorkoutData {
  name: string;
  userId: string;
  sets: SetDTO[];
  completedAt?: Date;
}
