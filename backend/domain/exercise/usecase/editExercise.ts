import {
  ExerciseDTO,
  IUpdateExercise,
  IRetrieveExerciseById,
  IRetrieveExerciseByName,
} from '@backend/domain/exercise/interfaces';
import { BackendError } from '@backend/errors';

export const editExerciseUseCase = (dependencies: EditExerciseDependencies) => async (data: EditExerciseData) => {
  const { retrieveExerciseById, updateExercise, retrieveExerciseByName } = dependencies;

  const { exerciseId, name, link } = data;

  validateData();

  const existingExerciseDTO = await retrieveExerciseById(exerciseId);
  if (!existingExerciseDTO) {
    throw new BackendError(404, 'exercise_not_found');
  }

  if (name) {
    const duplicateExerciseDTO = await retrieveExerciseByName(name);

    if (duplicateExerciseDTO) {
      throw new BackendError(409, 'duplicate_name');
    }
  }

  const exerciseDTO = createExerciseDTO(existingExerciseDTO);

  await updateExercise(exerciseDTO);

  return exerciseDTO;

  function createExerciseDTO(exercise: ExerciseDTO): ExerciseDTO {
    const exerciseDTO = {
      ...exercise,
    };

    if (name !== undefined) exerciseDTO.name = name;

    if (link !== undefined) exerciseDTO.link = link;

    return exerciseDTO;
  }

  function validateData() {
    if (!exerciseId) {
      throw new BackendError(400, 'missing_exerciseId');
    }

    if (typeof name === 'string' && !name.trim()) {
      throw new BackendError(400, 'invalid_name');
    }

    if (typeof link === 'string' && !link.trim()) {
      throw new BackendError(400, 'invalid_link');
    }
  }
};

interface EditExerciseData {
  name?: string;
  exerciseId: string;
  link?: string | null;
}

interface EditExerciseDependencies {
  updateExercise: IUpdateExercise;
  retrieveExerciseById: IRetrieveExerciseById;
  retrieveExerciseByName: IRetrieveExerciseByName;
}
