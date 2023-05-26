import {
  ExerciseDTO,
  IPersistExercise,
} from 'backend/domain/exercise/interfaces';
import { IGenerateObjectId } from 'backend/interfaces';

export const createExerciseUseCase =
  (dependencies: CreateExerciseDependencies) =>
  async (data: CreateExerciseData) => {
    const { persistExercise, generateObjectId } = dependencies;

    const { name, link } = data;

    validateData();

    const exerciseDTO = createExerciseDTO();

    await persistExercise(exerciseDTO);

    return exerciseDTO;

    function createExerciseDTO(): ExerciseDTO {
      return {
        name,
        link,
        workoutDetails: null,
        _id: generateObjectId(),
      };
    }

    function validateData() {
      if (!name) {
        throw new Error('name_missing');
      }
      if (typeof link === 'string' && !link.trim()) {
        throw new Error('invalid_link');
      }
    }
  };

export interface CreateExerciseData {
  name: string;
  link?: string;
}
export interface CreateExerciseDependencies {
  persistExercise: IPersistExercise;
  generateObjectId: IGenerateObjectId;
}
