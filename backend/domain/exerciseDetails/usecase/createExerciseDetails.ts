import { WorkoutDTO, IRetrieveWorkoutById } from 'backend/domain/workout/interfaces';
import { ExerciseDTO, IRetrieveExerciseById } from 'backend/domain/exercise/interfaces';
import { BackendError } from 'backend/errors';
import { ExerciseDetailsDTO, IPersistExerciseDetails } from 'backend/domain/exerciseDetails/interfaces';
import { IGenerateObjectId } from 'backend/interfaces';

export const createExerciseDetailsUseCase =
  (dependencies: CreateExerciseDetailsDependencies) => async (data: CreateExerciseDetailsData) => {
    const { generateObjectId, retrieveWorkoutById, retrieveExerciseById, persistExerciseDetails } = dependencies;

    const { workoutId, exerciseId, notes, reps, time, weight } = data;

    validateData();

    const workoutDTO = await retrieveWorkoutById(workoutId);
    if (!workoutDTO) {
      throw new BackendError(404, 'workout_not_found');
    }

    const exerciseDTO = await retrieveExerciseById(exerciseId);
    if (!exerciseDTO) {
      throw new BackendError(404, 'exercise_not_found');
    }

    const exerciseDetailsDTO = createExerciseDetailsDTO(exerciseDTO);

    await persistExerciseDetails(exerciseDetailsDTO);

    return exerciseDetailsDTO;

    function createExerciseDetailsDTO(exercise: ExerciseDTO): ExerciseDetailsDTO {
      return {
        reps,
        time,
        notes,
        weight,
        exercise,
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

export interface CreateExerciseDetailsData {
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  workoutId: string;
  exerciseId: string;
}

interface CreateExerciseDetailsDependencies {
  generateObjectId: IGenerateObjectId;
  retrieveWorkoutById: IRetrieveWorkoutById;
  retrieveExerciseById: IRetrieveExerciseById;
  persistExerciseDetails: IPersistExerciseDetails;
}
