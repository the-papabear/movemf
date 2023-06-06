import {
  WorkoutDTO,
  WorkoutDetailsDTO,
  IRetrieveWorkoutById,
  IPersistWorkoutDetails,
} from 'backend/domain/workout/interfaces';
import {
  ExerciseDTO,
  IRetrieveExerciseById,
} from 'backend/domain/exercise/interfaces';
import { BackendError } from 'backend/errors';
import { IGenerateObjectId } from 'backend/interfaces';

export const createWorkoutDetailsUseCase =
  (dependencies: CreateWorkoutDetailsDependencies) =>
  async (data: CreateWorkoutDetailsData) => {
    const {
      generateObjectId,
      retrieveWorkoutById,
      retrieveExerciseById,
      persistWorkoutDetails,
    } = dependencies;

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

    const workoutDetailsDTO = createWorkoutDetailsDTO(workoutDTO, exerciseDTO);

    await persistWorkoutDetails(workoutDetailsDTO);

    return workoutDetailsDTO;

    function createWorkoutDetailsDTO(
      workout: WorkoutDTO,
      exercise: ExerciseDTO
    ): WorkoutDetailsDTO {
      return {
        reps,
        time,
        notes,
        weight,
        workout,
        exercise,
        createdAt: new Date(),
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

interface CreateWorkoutDetailsData {
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  workoutId: string;
  exerciseId: string;
}

interface CreateWorkoutDetailsDependencies {
  generateObjectId: IGenerateObjectId;
  retrieveWorkoutById: IRetrieveWorkoutById;
  retrieveExerciseById: IRetrieveExerciseById;
  persistWorkoutDetails: IPersistWorkoutDetails;
}
