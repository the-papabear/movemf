import {
  ExerciseDTO,
  ExerciseType,
  IPersistExercise,
  IRetrieveExerciseByName,
} from '@backend/domain/exercise/interfaces';
import { BackendError } from '@backend/errors';
import { IGenerateObjectId } from '@backend/interfaces';

export const createExerciseUseCase = (dependencies: CreateExerciseDependencies) => async (data: CreateExerciseData) => {
  const { persistExercise, generateObjectId, retrieveExerciseByName } = dependencies;

  const { name, link, type } = data;

  validateData();

  const existingExerciseDTO = await retrieveExerciseByName(name);

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
      type,
      _id: generateObjectId(),
    };
  }

  function validateData() {
    if (!name) {
      throw new BackendError(400, 'name_missing');
    }
    if (typeof link === 'string' && !link.trim()) {
      throw new BackendError(400, 'invalid_link');
    }
  }
};

export interface CreateExerciseData {
  name: string;
  link?: string;
  type: ExerciseType;
}

export interface CreateExerciseDependencies {
  persistExercise: IPersistExercise;
  generateObjectId: IGenerateObjectId;
  retrieveExerciseByName: IRetrieveExerciseByName;
}
