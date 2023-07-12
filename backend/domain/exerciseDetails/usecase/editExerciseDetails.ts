import { BackendError } from '@backend/errors';
import {
  ExerciseDetailsDTO,
  IUpdateExerciseDetails,
  IRetrieveExerciseDetailsById,
} from '@backend/domain/exerciseDetails/interfaces';
import { IRetrieveWorkoutById } from '@backend/domain/workout/interfaces';
import { ExerciseDTO, IRetrieveExerciseById } from '@backend/domain/exercise/interfaces';

export const editExerciseDetailsUseCase =
  (dependencies: EditExerciseDetailsDependencies) => async (data: EditExerciseDetailsData) => {
    const { retrieveWorkoutById, retrieveExerciseById, updateExerciseDetails, retrieveExerciseDetailsById } =
      dependencies;

    const { reps, time, notes, weight, workoutId, exerciseId, exerciseDetailsId } = data;

    validateData();

    const existingExerciseDetailsDTO = await retrieveExerciseDetailsById(exerciseDetailsId);

    if (!existingExerciseDetailsDTO) {
      throw new BackendError(404, 'exerciseDetails_not_found');
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
      const existingExerciseDTO = await retrieveExerciseById(existingExerciseDetailsDTO.exercise._id);

      if (!existingExerciseDTO) {
        throw new BackendError(404, 'exercise_not_found');
      }

      exerciseDTO = existingExerciseDTO;
    }

    const exerciseDetailsDTO = createExerciseDetailsDTO(existingExerciseDetailsDTO, exerciseDTO);

    await updateExerciseDetails(exerciseDetailsDTO);

    return exerciseDetailsDTO;

    function createExerciseDetailsDTO(exerciseDetails: ExerciseDetailsDTO, exercise: ExerciseDTO) {
      const exerciseDetailsDTO = {
        ...exerciseDetails,
      };

      exerciseDetailsDTO.exercise = exercise;
      if (reps !== undefined) exerciseDetailsDTO.reps = reps;
      if (time !== undefined) exerciseDetailsDTO.time = time;
      if (notes !== undefined) exerciseDetailsDTO.notes = notes;
      if (weight !== undefined) exerciseDetailsDTO.weight = weight;

      return exerciseDetailsDTO;
    }

    function validateData() {
      if (!exerciseDetailsId) {
        throw new BackendError(400, 'invalid_exerciseDetailsId');
      }

      if (!workoutId) {
        throw new BackendError(400, 'invalid_workoutId');
      }
    }
  };

export interface EditExerciseDetailsDependencies {
  retrieveWorkoutById: IRetrieveWorkoutById;
  retrieveExerciseById: IRetrieveExerciseById;
  updateExerciseDetails: IUpdateExerciseDetails;
  retrieveExerciseDetailsById: IRetrieveExerciseDetailsById;
}

export interface EditExerciseDetailsData {
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  workoutId: string;
  exerciseId?: string;
  exerciseDetailsId: string;
}
