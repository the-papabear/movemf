import { editExerciseUseCase } from 'backend/domain/exercise/usecase/editExercise';

describe('editExerciseUseCase', () => {
  const mockDependencies = {
    updateExercise: jest.fn(),
    retrieveExerciseById: jest.fn().mockResolvedValue({
      _id: 'existingExerciseId',
      name: 'Pull-up',
      link: 'pull-up.com',
    }),
  };

  const validData = {
    link: 'editedLink.com',
    name: 'Edited exercise name',
    exerciseId: 'existingExerciseId',
  };

  describe('given no exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: '',
      };

      await expect(
        editExerciseUseCase(mockDependencies)(invalidData)
      ).rejects.toThrowError('missing_exerciseId');
    });
  });

  describe('given no exercise is found for the given exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: 'not_existent',
      };
      mockDependencies.retrieveExerciseById.mockResolvedValueOnce(null);

      await expect(
        editExerciseUseCase(mockDependencies)(invalidData)
      ).rejects.toThrowError('exercise_not_found');
    });
  });

  describe('given an empty name', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        name: '',
      };

      await expect(
        editExerciseUseCase(mockDependencies)(invalidData)
      ).rejects.toThrowError('invalid_name');
    });
  });

  describe('given an empty link', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        link: '',
      };

      await expect(
        editExerciseUseCase(mockDependencies)(invalidData)
      ).rejects.toThrowError('invalid_link');
    });
  });

  describe('given valid data', () => {
    it('should call updateExercise', async () => {
      mockDependencies.updateExercise.mockReset();

      await editExerciseUseCase(mockDependencies)(validData);

      expect(mockDependencies.updateExercise).toHaveBeenCalledTimes(1);
    });

    it('should return a valid exerciseDTO when optional fields are not set', async () => {
      const data = {
        ...validData,
        link: null,
      };

      const exerciseDTO = await editExerciseUseCase(mockDependencies)(data);

      expect(exerciseDTO.link).toBeNull();
      expect(exerciseDTO._id).toBeDefined();
      expect(exerciseDTO.name).toEqual(validData.name);
    });

    it('should return a valid exerciseDTO when all fields are set', async () => {
      const exerciseDTO = await editExerciseUseCase(mockDependencies)(
        validData
      );

      expect(exerciseDTO._id).toBeDefined();
      expect(exerciseDTO.name).toMatch(validData.name);
      expect(exerciseDTO.link).toMatch(validData.link);
    });
  });
});
