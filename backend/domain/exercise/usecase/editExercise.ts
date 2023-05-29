import {
  ExerciseDTO,
  IUpdateExercise,
  IRetrieveExerciseById,
  IRetrieveExerciseByName,
} from 'backend/domain/exercise/interfaces';

export const editExerciseUseCase =
  (dependencies: EditExerciseDependencies) =>
  async (data: EditExerciseData) => {
    const { retrieveExerciseById, updateExercise, retrieveExerciseByName } =
      dependencies;

    const { exerciseId, name, link } = data;

    validateData();

    //TODO: implement case for duplicate names

    const existingExerciseDTO = await retrieveExerciseById(exerciseId);
    if (!existingExerciseDTO) {
      throw new Error('exercise_not_found');
    }

    if (name) {
      const duplicateExerciseDTO = await retrieveExerciseByName(name);

      if (duplicateExerciseDTO) {
        throw new Error('duplicate_name');
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
        throw new Error('missing_exerciseId');
      }

      if (typeof name === 'string' && !name.trim()) {
        throw new Error('invalid_name');
      }

      if (typeof link === 'string' && !link.trim()) {
        throw new Error('invalid_link');
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
