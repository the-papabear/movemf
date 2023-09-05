import { BackendError } from '@/backend/errors';
import { IGenerateObjectId } from '@/backend/interfaces';
import { WORKOUT_ERRORS } from '@/backend/domain/workout/usecase/errors';
import { IRetrieveExerciseById } from '@/backend/domain/exercise/interfaces';
import { IPersistWorkout, SetDTO } from '@/backend/domain/workout/interfaces';

export const createWorkoutUseCase = (dependencies: CreateWorkoutDependencies) => async (data: CreateWorkoutData) => {
  const { persistWorkout, generateObjectId, retrieveExerciseById } = dependencies;

  const { completedAt, userId, name, sets } = data;

  if (!sets.length) {
    throw new BackendError(400, WORKOUT_ERRORS.MISSING_SETS);
  }

  const setDTOs = await Promise.all(
    sets.map(async (set) => {
      if (set.reps < 0) {
        throw new BackendError(400, WORKOUT_ERRORS.INVALID_REPS);
      }

      if (set.weight < 0) {
        throw new BackendError(400, WORKOUT_ERRORS.INVALID_WEIGHT);
      }

      const existingExerciseDTO = await retrieveExerciseById(set.exerciseId);

      if (!existingExerciseDTO) {
        throw new BackendError(404, WORKOUT_ERRORS.EXERCISE_NOT_FOUND);
      }

      return {
        ...set,
        exercise: existingExerciseDTO,
      };
    }),
  );

  const workoutDTO = createWorkoutDTO(setDTOs);

  await persistWorkout(workoutDTO);

  return workoutDTO;

  function createWorkoutDTO(sets: SetDTO[]) {
    return {
      name,
      userId,
      sets: setDTOs,
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
  completedAt?: Date;
  sets: { setNumber: number; reps: number; weight: number; exerciseId: string }[];
}
