import { IGenerateObjectId } from '@backend/interfaces';
import { IPersistWorkout } from '@backend/domain/workout/interfaces';

export const createWorkoutUseCase = (dependencies: CreateWorkoutDependencies) => async (data: CreateWorkoutData) => {
  const { persistWorkout, generateObjectId } = dependencies;

  const { completedAt, userId, name } = data;

  const workoutDTO = createWorkoutDTO();

  await persistWorkout(workoutDTO);

  return workoutDTO;

  function createWorkoutDTO() {
    return {
      name,
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
  name: string;
  userId: string;
  completedAt?: Date;
}
