import {
  WorkoutDTO,
  IEditWorkout,
  IRetrieveWorkoutById,
} from 'backend/domain/workout/interfaces';
import { BackendError } from 'backend/errors';
import {
  ExerciseDetailsDTO,
  IEditExerciseDetailsUseCase,
  IRetrieveExerciseDetailsById,
  IRetrieveExerciseDetailsByIds,
  ICreateExerciseDetailsUseCase,
} from 'backend/domain/exerciseDetails/interfaces';

export const editWorkoutUseCase =
  (dependencies: EditWorkoutDependencies) => async (data: EditWorkoutData) => {
    const {
      editWorkout,
      retrieveWorkoutById,
      editExerciseDetailsUseCase,
      retrieveExerciseDetailsById,
      retrieveExerciseDetailsByIds,
      createExerciseDetailsUseCase,
    } = dependencies;

    const { workoutId, exerciseDetails, exerciseDetailsIds } = data;

    validateData();

    const existingWorkoutDTO = await retrieveWorkoutById(workoutId);

    if (!existingWorkoutDTO) {
      throw new BackendError(404, 'workout_not_found');
    }

    let exerciseDetailsDTO: ExerciseDetailsDTO[] = [];
    let newExerciseDetailsDTO: ExerciseDetailsDTO | null = null;

    if (exerciseDetails?.exerciseDetailsId) {
      const existingExerciseDetailsDTO = await retrieveExerciseDetailsById(
        exerciseDetails.exerciseDetailsId
      );

      if (!existingExerciseDetailsDTO) {
        newExerciseDetailsDTO = await createExerciseDetailsUseCase(
          exerciseDetails
        );
      } else {
        await editExerciseDetailsUseCase({
          ...exerciseDetails,
          exerciseDetailsId: exerciseDetails.exerciseDetailsId,
        });

        exerciseDetailsDTO = await retrieveExerciseDetailsByIds(
          existingWorkoutDTO.exerciseDetailsIds
        );
      }
    }

    const workoutDTO = createWorkoutDTO(existingWorkoutDTO, exerciseDetailsDTO);

    await editWorkout(workoutDTO);

    return workoutDTO;

    function createWorkoutDTO(
      workout: WorkoutDTO,
      exerciseDetails: ExerciseDetailsDTO[]
    ) {
      return {
        ...workout,
        exerciseDetails: newExerciseDetailsDTO
          ? [...exerciseDetails, newExerciseDetailsDTO]
          : exerciseDetails,
      };
    }

    function validateData() {
      if (!workoutId) {
        throw new BackendError(400, 'invalid_workoutId');
      }
    }
  };

interface EditWorkoutDependencies {
  editWorkout: IEditWorkout;
  retrieveWorkoutById: IRetrieveWorkoutById;
  editExerciseDetailsUseCase: IEditExerciseDetailsUseCase;
  retrieveExerciseDetailsById: IRetrieveExerciseDetailsById;
  createExerciseDetailsUseCase: ICreateExerciseDetailsUseCase;
  retrieveExerciseDetailsByIds: IRetrieveExerciseDetailsByIds;
}

interface EditWorkoutData {
  workoutId: string;
  exerciseDetailsIds: string[];
  exerciseDetails?: {
    reps?: number;
    time?: number;
    notes?: string;
    weight?: number;
    workoutId: string;
    exerciseId: string;
    exerciseDetailsId?: string;
  };
}
