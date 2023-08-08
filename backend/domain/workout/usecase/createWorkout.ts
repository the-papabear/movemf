import { IGenerateObjectId } from '@backend/interfaces';
import { IPersistWorkout } from '@backend/domain/workout/interfaces';

export const createWorkoutUseCase = (dependencies: CreateWorkoutDependencies) => async (data: CreateWorkoutData) => {
  const { persistWorkout, generateObjectId } = dependencies;

  const { completedAt, userId } = data;

  const workoutDTO = createWorkoutDTO();

  await persistWorkout(workoutDTO);

  return workoutDTO;

  function createWorkoutDTO() {
    return {
      userId,
      exerciseDetails: [],
      _id: generateObjectId(),
      completedAt: completedAt ?? new Date(),
    };
  }
};

interface CreateWorkoutDependencies {
  persistWorkout: IPersistWorkout;
  generateObjectId: IGenerateObjectId;
}

interface CreateWorkoutData {
  userId: string;
  completedAt?: Date;
}
