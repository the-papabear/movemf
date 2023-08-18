import { BackendError } from '@backend/errors';
import { IGenerateObjectId } from '@backend/interfaces';
import { IPersistWorkout } from '@backend/domain/workout/interfaces';
import { ExerciseDetailsDTO, IRetrieveExerciseDetailsById } from '@backend/domain/exerciseDetails/interfaces';

export const createWorkoutUseCase = (dependencies: CreateWorkoutDependencies) => async (data: CreateWorkoutData) => {
  const { persistWorkout, generateObjectId, retrieveExerciseDetailsById } = dependencies;

  const { completedAt, userId, name, exerciseDetails } = data;

  const workoutDTO = createWorkoutDTO();

  if (exerciseDetails && exerciseDetails.length) {
    const existingExDetails = await Promise.all(
      exerciseDetails.map(async (exerciseDetails) => await retrieveExerciseDetailsById(exerciseDetails._id)),
    );

    if (existingExDetails.length !== exerciseDetails.length) {
      throw new BackendError(404, 'EXERCISE_DETAILS_NOT_FOUND');
    }
  }

  await persistWorkout(workoutDTO);

  return workoutDTO;

  function createWorkoutDTO() {
    return {
      name,
      userId,
      _id: generateObjectId(),
      exerciseDetails: exerciseDetails || [],
      completedAt: completedAt ?? new Date(),
    };
  }
};

interface CreateWorkoutDependencies {
  persistWorkout: IPersistWorkout;
  generateObjectId: IGenerateObjectId;
  retrieveExerciseDetailsById: IRetrieveExerciseDetailsById;
}

interface CreateWorkoutData {
  name: string;
  userId: string;
  completedAt?: Date;
  exerciseDetails: ExerciseDetailsDTO[];
}
