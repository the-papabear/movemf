import { IGenerateObjectId } from 'backend/interfaces';
import { IPersistWorkout } from 'backend/domain/workout/interfaces';

export const createWorkoutUseCase =
  (dependencies: CreateWorkoutDependencies) =>
  async (data: CreateWorkoutData) => {
    const { persistWorkout, generateObjectId } = dependencies;

    const { completedAt } = data;

    const workoutDTO = createWorkoutDTO();

    await persistWorkout(workoutDTO);

    return workoutDTO;

    function createWorkoutDTO() {
      return {
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
  completedAt?: Date;
}
