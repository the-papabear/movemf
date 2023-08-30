import { BackendError } from '@/backend/errors';
import { IRetrieveWorkoutById } from '@/backend/domain/workout/interfaces';
import { SetDTO, IUpdateSet, IRetrieveSetById } from '@/backend/domain/set/interfaces';
import { ExerciseDTO, IRetrieveExerciseById } from '@/backend/domain/exercise/interfaces';

export const editSetUseCase = (dependencies: EditSetDependencies) => async (data: EditSetData) => {
  const { retrieveWorkoutById, retrieveExerciseById, updateSet, retrieveSetById } = dependencies;

  const { reps, time, notes, weight, workoutId, exerciseId, setId } = data;

  validateData();

  const existingSetDTO = await retrieveSetById(setId);

  if (!existingSetDTO) {
    throw new BackendError(404, 'set_not_found');
  }

  const workoutDTO = await retrieveWorkoutById(workoutId);

  if (!workoutDTO) {
    throw new BackendError(404, 'workout_not_found');
  }

  let exerciseDTO: ExerciseDTO;

  if (exerciseId) {
    const newExerciseDTO = await retrieveExerciseById(exerciseId);

    if (!newExerciseDTO) {
      throw new BackendError(404, 'exercise_not_found');
    }

    exerciseDTO = newExerciseDTO;
  } else {
    const existingExerciseDTO = await retrieveExerciseById(existingSetDTO.exercise._id);

    if (!existingExerciseDTO) {
      throw new BackendError(404, 'exercise_not_found');
    }

    exerciseDTO = existingExerciseDTO;
  }

  const setDTO = createSetDTO(existingSetDTO, exerciseDTO);

  await updateSet(setDTO);

  return setDTO;

  function createSetDTO(set: SetDTO, exercise: ExerciseDTO) {
    const setDTO = {
      ...set,
    };

    setDTO.exercise = exercise;
    if (reps !== undefined) setDTO.reps = reps;
    if (time !== undefined) setDTO.time = time;
    if (notes !== undefined) setDTO.notes = notes;
    if (weight !== undefined) setDTO.weight = weight;

    return setDTO;
  }

  function validateData() {
    if (!setId) {
      throw new BackendError(400, 'invalid_setId');
    }

    if (!workoutId) {
      throw new BackendError(400, 'invalid_workoutId');
    }
  }
};

export interface EditSetDependencies {
  retrieveWorkoutById: IRetrieveWorkoutById;
  retrieveExerciseById: IRetrieveExerciseById;
  updateSet: IUpdateSet;
  retrieveSetById: IRetrieveSetById;
}

export interface EditSetData {
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  workoutId: string;
  exerciseId?: string;
  setId: string;
}
