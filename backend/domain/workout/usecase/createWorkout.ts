import {
  ExerciseDTO,
  IRetrieveExercisesByIds,
} from 'backend/domain/exercise/interfaces';
import { BackendError } from 'backend/errors';
import { IGenerateObjectId } from 'backend/interfaces';
import { IPersistWorkout } from 'backend/domain/workout/interfaces';

export const createWorkoutUseCase =
  (dependencies: CreateWorkoutDependencies) =>
  async (data: CreateWorkoutData) => {
    const { retrieveExercisesByIds, persistWorkout, generateObjectId } =
      dependencies;

    const { exerciseIds, completedAt } = data;

    let exerciseDTOs: ExerciseDTO[] = [];

    if (exerciseIds) {
      exerciseDTOs = await retrieveExercisesByIds(exerciseIds);

      if (exerciseDTOs.length !== exerciseIds.length) {
        throw new BackendError(404, 'exercise_not_found');
      }
    }

    const workoutDTO = createWorkoutDTO(exerciseDTOs);

    await persistWorkout(workoutDTO);

    return workoutDTO;

    function createWorkoutDTO(exercises: ExerciseDTO[]) {
      return {
        exercises,
        _id: generateObjectId(),
        completedAt: completedAt ?? new Date(),
      };
    }
  };

interface CreateWorkoutDependencies {
  persistWorkout: IPersistWorkout;
  generateObjectId: IGenerateObjectId;
  retrieveExercisesByIds: IRetrieveExercisesByIds;
}

interface CreateWorkoutData {
  completedAt?: Date;
  exerciseIds?: string[] | null;
}
