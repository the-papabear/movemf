import {
  WorkoutDTO,
  WorkoutDetailsDTO,
  IRetrieveWorkoutById,
  IPersistWorkoutDetails,
} from 'backend/domain/workout/interfaces';
import { BackendError } from 'backend/errors';
import { IGenerateObjectId } from 'backend/interfaces';

export const createWorkoutDetailsUseCase =
  (dependencies: CreateWorkoutDetailsDependencies) =>
  async (data: CreateWorkoutDetailsData) => {
    const { retrieveWorkoutById, persistWorkoutDetails, generateObjectId } =
      dependencies;

    const { workoutId, notes, reps, time, weight } = data;

    validateData();

    const workoutDTO = await retrieveWorkoutById(workoutId);
    if (!workoutDTO) {
      throw new BackendError(404, 'workout_not_found');
    }

    const workoutDetailsDTO = createWorkoutDetailsDTO(workoutDTO);

    await persistWorkoutDetails(workoutDetailsDTO);

    return workoutDetailsDTO;

    function createWorkoutDetailsDTO(workout: WorkoutDTO): WorkoutDetailsDTO {
      return {
        reps,
        time,
        notes,
        weight,
        workout,
        _id: generateObjectId(),
      };
    }

    function validateData() {
      if (!workoutId) {
        throw new BackendError(400, 'missing_workoutId');
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
}

interface CreateWorkoutDetailsDependencies {
  generateObjectId: IGenerateObjectId;
  retrieveWorkoutById: IRetrieveWorkoutById;
  persistWorkoutDetails: IPersistWorkoutDetails;
}
