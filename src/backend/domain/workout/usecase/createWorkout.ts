import { BackendError } from '@backend/errors';
import { IGenerateObjectId } from '@backend/interfaces';
import { IPersistWorkout } from '@backend/domain/workout/interfaces';
import { IRetrieveSetById, SetDTO } from '@backend/domain/set/interfaces';

export const createWorkoutUseCase = (dependencies: CreateWorkoutDependencies) => async (data: CreateWorkoutData) => {
  const { persistWorkout, generateObjectId, retrieveSetById } = dependencies;

  const { completedAt, userId, name, set } = data;

  const workoutDTO = createWorkoutDTO();

  if (set && set.length) {
    const existingExDetails = await Promise.all(set.map(async (set) => await retrieveSetById(set._id)));

    if (existingExDetails.length !== set.length) {
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
      set: set || [],
      completedAt: completedAt ?? new Date(),
    };
  }
};

interface CreateWorkoutDependencies {
  persistWorkout: IPersistWorkout;
  retrieveSetById: IRetrieveSetById;
  generateObjectId: IGenerateObjectId;
}

interface CreateWorkoutData {
  name: string;
  set: SetDTO[];
  userId: string;
  completedAt?: Date;
}
