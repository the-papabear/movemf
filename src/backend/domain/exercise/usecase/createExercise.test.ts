import { createExerciseUseCase } from '@/backend/domain/exercise/usecase/createExercise';

describe('createExerciseUseCase', () => {
  const mockDependencies = {
    persistExercise: jest.fn(),
    retrieveExerciseByName: jest.fn(),
    generateObjectId: jest.fn(() => 'exerciseId'),
  };

  const validData = {
    userId: 'user',
    name: 'Pull-up',
    link: 'pullups.com',
  };

  describe('given no name', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        name: '',
      };

      await expect(createExerciseUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'name_missing',
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

      await expect(createExerciseUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 409,
        message: 'duplicate_name',
      });
    });
  });

  describe('given valid data', () => {
    it('should call persistExercise', async () => {
      mockDependencies.persistExercise.mockReset();

      await createExerciseUseCase(mockDependencies)(validData);

      expect(mockDependencies.persistExercise).toHaveBeenCalledTimes(1);
    });

    it('should return a valid ExerciseDTO', async () => {
      const exerciseDTO = await createExerciseUseCase(mockDependencies)(validData);

      assertValidExerciseDTO();

      function assertValidExerciseDTO() {
        expect(exerciseDTO._id).toBeDefined();
        expect(exerciseDTO.name).toMatch(validData.name);
        expect(exerciseDTO.link).toMatch(validData.link);
      }
    });
  });
});
