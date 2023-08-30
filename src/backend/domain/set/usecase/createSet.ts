import { BackendError } from '@/backend/errors';
import { IGenerateObjectId } from '@/backend/interfaces';
import { SetDTO, IPersistSet } from '@/backend/domain/set/interfaces';
import { IRetrieveWorkoutById } from '@/backend/domain/workout/interfaces';
import { ExerciseDTO, IRetrieveExerciseById } from '@/backend/domain/exercise/interfaces';

export const createSetUseCase = (dependencies: CreateSetDependencies) => async (data: CreateSetData) => {
  const { generateObjectId, retrieveWorkoutById, retrieveExerciseById, persistSet } = dependencies;

  const { workoutId, exerciseId, notes, reps, time, weight, setNumber } = data;

  validateData();

  const workoutDTO = await retrieveWorkoutById(workoutId);
  if (!workoutDTO) {
    throw new BackendError(404, 'workout_not_found');
  }

  const exerciseDTO = await retrieveExerciseById(exerciseId);
  if (!exerciseDTO) {
    throw new BackendError(404, 'exercise_not_found');
  }

  const setDTO = createSetDTO(exerciseDTO);

  await persistSet(setDTO);

  return setDTO;

  function createSetDTO(exercise: ExerciseDTO): SetDTO {
    return {
      reps,
      time,
      notes,
      weight,
      exercise,
      setNumber,
      workoutId,
      insertedAt: new Date(),
      _id: generateObjectId(),
    };
  }

  function validateData() {
    if (!workoutId) {
      throw new BackendError(400, 'missing_workoutId');
    }
    if (!exerciseId) {
      throw new BackendError(400, 'missing_exerciseId');
    }

    if (reps) {
      if (reps < 0) {
        throw new BackendError(400, 'invalid_reps');
      }
    }

    if (time) {
      if (time < 0) {
        throw new BackendError(400, 'invalid_time');
      }
    }

    if (weight) {
      if (weight < 0) {
        throw new BackendError(400, 'invalid_weight');
      }
    }

    if (notes) {
      if (typeof notes === 'string' && !notes.trim()) {
        throw new BackendError(400, 'invalid_notes');
      }
    }
  }
};

export interface CreateSetData {
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  setNumber: number;
  workoutId: string;
  exerciseId: string;
}

interface CreateSetDependencies {
  generateObjectId: IGenerateObjectId;
  retrieveWorkoutById: IRetrieveWorkoutById;
  retrieveExerciseById: IRetrieveExerciseById;
  persistSet: IPersistSet;
}
