import { BackendError } from '@backend/errors';
import {
  ExerciseDetailsDTO,
  IEditExerciseDetailsUseCase,
  IRetrieveExerciseDetailsById,
  IRetrieveExerciseDetailsByIds,
  ICreateExerciseDetailsUseCase,
} from '@backend/domain/exerciseDetails/interfaces';
import { WorkoutDTO, IEditWorkout, IRetrieveWorkoutById } from '@backend/domain/workout/interfaces';

export const editWorkoutUseCase = (dependencies: EditWorkoutDependencies) => async (data: EditWorkoutData) => {
  const {
    updateWorkout,
    retrieveWorkoutById,
    editExerciseDetailsUseCase,
    retrieveExerciseDetailsById,
    retrieveExerciseDetailsByIds,
    createExerciseDetailsUseCase,
  } = dependencies;

  const { workoutId, exerciseDetailsId, exerciseId, notes, reps, time, weight, completedAt, setNumber, name } = data;

  validateData();

  const existingWorkoutDTO = await retrieveWorkoutById(workoutId);

  if (!existingWorkoutDTO) {
    throw new BackendError(404, 'workout_not_found');
  }

  let exerciseDetailsDTOs: ExerciseDetailsDTO[] = [];

  if (exerciseDetailsId) {
    const existingExerciseDetailsDTO = await retrieveExerciseDetailsById(exerciseDetailsId);

    if (!existingExerciseDetailsDTO) {
      throw new BackendError(404, 'exerciseDetails_not_found');
    }

    await editExerciseDetailsUseCase({
      reps,
      time,
      notes,
      weight,
      workoutId,
      exerciseId,
      exerciseDetailsId,
    });

    exerciseDetailsDTOs = await retrieveExerciseDetailsByIds(
      existingWorkoutDTO.exerciseDetails.map((exerciseDetails) => exerciseDetails._id),
    );
  } else {
    if (!exerciseId) {
      throw new BackendError(400, 'INVALID_EXERCISE_ID');
    }

    if (!setNumber) {
      throw new BackendError(400, 'MISSING_SET_NUMBER');
    }

    const exerciseDetailsDTO = await createExerciseDetailsUseCase({
      reps,
      time,
      notes,
      weight,
      setNumber,
      workoutId,
      exerciseId,
    });

    const existingExerciseDetailsDTOs = await retrieveExerciseDetailsByIds(
      existingWorkoutDTO.exerciseDetails.map((exerciseDetails) => {
        return exerciseDetails._id;
      }),
    );

    exerciseDetailsDTOs = [...existingExerciseDetailsDTOs, exerciseDetailsDTO];
  }

  const workoutDTO = createWorkoutDTO(existingWorkoutDTO, exerciseDetailsDTOs);

  await updateWorkout(workoutDTO);
  return workoutDTO;

  function createWorkoutDTO(workout: WorkoutDTO, exerciseDetails: ExerciseDetailsDTO[]) {
    const workoutDTO = {
      ...workout,
      exerciseDetails: exerciseDetails,
    };

    if (name !== undefined) workoutDTO.name = name;
    if (completedAt !== undefined) workoutDTO.completedAt = new Date(completedAt);

    return workoutDTO;
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
  reps?: number;
  time?: number;
  name?: string;
  notes?: string;
  userId: string;
  weight?: number;
  workoutId: string;
  setNumber?: number;
  completedAt?: Date;
  exerciseId?: string;
  exerciseDetailsId?: string;
}
