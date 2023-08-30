import { BackendError } from '@/backend/errors';
import { IRemoveSet, IRetrieveSetById } from '@/backend/domain/set/interfaces';

export const deleteSetUseCase = (dependencies: DeleteSetDependencies) => async (data: DeleteSetData) => {
  const { retrieveSetById, removeSet } = dependencies;
  const { setId } = data;

  const existingSetDTO = await retrieveSetById(setId);

  if (!existingSetDTO) {
    throw new BackendError(404, 'EXERCISE_DETAILS_NOT_FOUND');
  }

  await removeSet(existingSetDTO._id);

  return existingSetDTO;

  // TODO: IMPORT DATA VALIDATION CHECKS
  // function validateData(){}
};

interface DeleteSetDependencies {
  removeSet: IRemoveSet;
  retrieveSetById: IRetrieveSetById;
}

interface DeleteSetData {
  setId: string;
}
