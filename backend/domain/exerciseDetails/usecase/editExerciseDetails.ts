import { BackendError } from 'backend/errors';
import {
  ExerciseDetailsDTO,
  IUpdateExerciseDetails,
  IRetrieveExerciseDetailsById,
} from 'backend/domain/exerciseDetails/interfaces';
import { IRetrieveWorkoutById } from 'backend/domain/workout/interfaces';
import { IRetrieveExerciseById } from 'backend/domain/exercise/interfaces';

export const editExerciseDetailsUseCase =
  (dependencies: EditExerciseDetailsDependencies) =>
  async (data: EditExerciseDetailsData) => {
    const {
      retrieveWorkoutById,
      retrieveExerciseById,
      updateExerciseDetails,
      retrieveExerciseDetailsById,
    } = dependencies;

    const {
      reps,
      time,
      notes,
      weight,
      workoutId,
      exerciseId,
      exerciseDetailsId,
    } = data;

    validateData();

    const existingExerciseDetailsDTO = await retrieveExerciseDetailsById(
      exerciseDetailsId
    );

    if (!existingExerciseDetailsDTO) {
      throw new BackendError(404, 'exerciseDetails_not_found');
    }

    const workoutDTO = await retrieveWorkoutById(workoutId);

    if (!workoutDTO) {
      throw new BackendError(404, 'workout_not_found');
    }

    const exerciseDTO = await retrieveExerciseById(exerciseId);

    if (!exerciseDTO) {
      throw new BackendError(404, 'exercise_not_found');
    }

    const exerciseDetailsDTO = createExerciseDetailsDTO(
      existingExerciseDetailsDTO
    );

    await updateExerciseDetails(exerciseDetailsDTO);

    return exerciseDetailsDTO;

    function createExerciseDetailsDTO(exerciseDetails: ExerciseDetailsDTO) {
      const exerciseDetailsDTO = {
        ...exerciseDetails,
      };

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

      if (!exerciseId) {
        throw new BackendError(400, 'invalid_exerciseId');
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
  exerciseId: string;
  exerciseDetailsId: string;
}