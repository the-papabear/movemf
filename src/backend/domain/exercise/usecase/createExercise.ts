import { ExerciseDTO, IPersistExercise, IRetrieveExerciseByName } from '@/backend/domain/exercise/interfaces';
import { BackendError } from '@/backend/errors';
import { IGenerateObjectId } from '@/backend/interfaces';

export const createExerciseUseCase = (dependencies: CreateExerciseDependencies) => async (data: CreateExerciseData) => {
  const { persistExercise, generateObjectId, retrieveExerciseByName } = dependencies;

  const { name, link, userId } = data;

  validateData();

  const existingExerciseDTO = await retrieveExerciseByName(name, userId);

  if (existingExerciseDTO) {
    throw new BackendError(409, 'duplicate_name');
  }

  const exerciseDTO = createExerciseDTO();

  await persistExercise(exerciseDTO);

  return exerciseDTO;

  function createExerciseDTO(): ExerciseDTO {
    return {
      name,
      link,
      userId,
      _id: generateObjectId(),
    };
  }

  function validateData() {
    if (!name) {
      throw new BackendError(400, 'name_missing');
    }

    if (!userId) {
      throw new BackendError(400, 'userId_missing');
    }
  }
};

export interface CreateExerciseData {
  name: string;
  link?: string;
  userId: string;
}

export interface CreateExerciseDependencies {
  persistExercise: IPersistExercise;
  generateObjectId: IGenerateObjectId;
  retrieveExerciseByName: IRetrieveExerciseByName;
}
