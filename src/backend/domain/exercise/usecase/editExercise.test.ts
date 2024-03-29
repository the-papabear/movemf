import { editExerciseUseCase } from '@/backend/domain/exercise/usecase/editExercise';

describe('editExerciseUseCase', () => {
  const mockDependencies = {
    updateExercise: jest.fn(),
    retrieveExerciseByName: jest.fn(),
    retrieveExerciseById: jest.fn().mockResolvedValue({
      userId: 'user',
      name: 'Pull-up',
      link: 'pull-up.com',
      _id: 'existingExerciseId',
    }),
  };

  const validData = {
    userId: 'userId',
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

      await expect(editExerciseUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'missing_exerciseId',
      });
    });
  });

  describe('given no exercise is found for the given exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: 'not_existent',
      };
      mockDependencies.retrieveExerciseById.mockResolvedValueOnce(null);

      await expect(editExerciseUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: 'exercise_not_found',
      });
    });
  });

  describe('given an empty name', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        name: '',
      };

      await expect(editExerciseUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'invalid_name',
      });
    });
  });

  describe('given an exercise name that already exists', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        name: 'Duplicate Name',
      };

      mockDependencies.retrieveExerciseByName.mockResolvedValueOnce({
        name: 'Duplicate Name',
      });

      await expect(editExerciseUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 409,
        message: 'duplicate_name',
      });
    });
  });

  describe('given valid data', () => {
    it('should call updateExercise', async () => {
      mockDependencies.updateExercise.mockReset();

      await editExerciseUseCase(mockDependencies)(validData);

      expect(mockDependencies.updateExercise).toHaveBeenCalledTimes(1);
    });

    it('should return a valid exerciseDTO', async () => {
      const exerciseDTO = await editExerciseUseCase(mockDependencies)(validData);

      expect(exerciseDTO._id).toBeDefined();
      expect(exerciseDTO.name).toMatch(validData.name);
      expect(exerciseDTO.link).toMatch(validData.link);
    });
  });
});
