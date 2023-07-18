import { BackendError } from '@backend/errors';
import { IRemoveExerciseDetails, IRetrieveExerciseDetailsById } from '@backend/domain/exerciseDetails/interfaces';

export const deleteExerciseDetailsUseCase =
  (dependencies: DeleteExerciseDetailsDependencies) => async (data: DeleteExerciseDetailsData) => {
    const { retrieveExerciseDetailsById, removeExerciseDetails } = dependencies;
    const { exerciseDetailsId } = data;

    const existingExerciseDetailsDTO = await retrieveExerciseDetailsById(exerciseDetailsId);

    if (!existingExerciseDetailsDTO) {
      throw new BackendError(404, 'EXERCISE_DETAILS_NOT_FOUND');
    }

    await removeExerciseDetails(existingExerciseDetailsDTO._id);

    return existingExerciseDetailsDTO;

    // TODO: IMPORT DATA VALIDATION CHECKS
    // function validateData(){}
  };

interface DeleteExerciseDetailsDependencies {
  removeExerciseDetails: IRemoveExerciseDetails;
  retrieveExerciseDetailsById: IRetrieveExerciseDetailsById;
}

interface DeleteExerciseDetailsData {
  exerciseDetailsId: string;
}
