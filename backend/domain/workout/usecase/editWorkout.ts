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
      updateWorkout,
      retrieveWorkoutById,
      editExerciseDetailsUseCase,
      retrieveExerciseDetailsById,
      retrieveExerciseDetailsByIds,
      createExerciseDetailsUseCase,
    } = dependencies;

    const { workoutId, exerciseDetails } = data;

    validateData();

    const existingWorkoutDTO = await retrieveWorkoutById(workoutId);

    if (!existingWorkoutDTO) {
      throw new BackendError(404, 'workout_not_found');
    }

    let newExerciseDetailsDTO: ExerciseDetailsDTO | null = null;

    if (exerciseDetails) {
      if (exerciseDetails?.exerciseDetailsId) {
        const existingExerciseDetailsDTO = await retrieveExerciseDetailsById(
          exerciseDetails.exerciseDetailsId
        );

        if (!existingExerciseDetailsDTO) {
          throw new BackendError(404, 'exerciseDetails_not_found');
        }

        await editExerciseDetailsUseCase({
          ...exerciseDetails,
          exerciseDetailsId: exerciseDetails.exerciseDetailsId,
        });
      } else {
        newExerciseDetailsDTO = await createExerciseDetailsUseCase(
          exerciseDetails
        );
      }
    }

    const existingWorkoutDetailsIds = existingWorkoutDTO.exerciseDetails.map(
      (exerciseDetails: any) => exerciseDetails._id
    );

    const exerciseDetailsDTOs = await retrieveExerciseDetailsByIds(
      existingWorkoutDetailsIds
    );

    if (exerciseDetailsDTOs.length !== existingWorkoutDetailsIds.length) {
      throw new BackendError(400, 'invalid_exerciseDetailsIds');
    }

    const workoutDTO = createWorkoutDTO(
      existingWorkoutDTO,
      exerciseDetailsDTOs
    );

    await updateWorkout(workoutDTO);

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
  updateWorkout: IEditWorkout;
  retrieveWorkoutById: IRetrieveWorkoutById;
  editExerciseDetailsUseCase: IEditExerciseDetailsUseCase;
  retrieveExerciseDetailsById: IRetrieveExerciseDetailsById;
  createExerciseDetailsUseCase: ICreateExerciseDetailsUseCase;
  retrieveExerciseDetailsByIds: IRetrieveExerciseDetailsByIds;
}

interface EditWorkoutData {
  workoutId: string;
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
