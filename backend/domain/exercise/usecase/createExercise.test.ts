import { createExerciseUseCase } from 'backend/domain/exercise/usecase/createExercise';

describe('createExerciseUseCase', () => {
  const mockDependencies = {
    persistExercise: jest.fn(),
    generateObjectId: jest.fn(() => 'exerciseId'),
  };

  const validData = { name: 'Pull-up', link: 'pullups.com' };

  describe('given no name', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        name: '',
      };

      await expect(
        createExerciseUseCase(mockDependencies)(invalidData)
      ).rejects.toThrowError('name_missing');
    });
  });

  describe('given an empty link', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        link: '',
      };

      await expect(
        createExerciseUseCase(mockDependencies)(invalidData)
      ).rejects.toThrowError('invalid_link');
    });
  });

  describe('given valid data', () => {
    it('should call persistExercise', async () => {
      mockDependencies.persistExercise.mockReset();

      await createExerciseUseCase(mockDependencies)(validData);

      expect(mockDependencies.persistExercise).toHaveBeenCalledTimes(1);
    });

    it('should return a valid ExerciseDTO', async () => {
      const exerciseDTO = await createExerciseUseCase(mockDependencies)(
        validData
      );

      assertValidExerciseDTO();

      function assertValidExerciseDTO() {
        expect(exerciseDTO._id).toBeDefined();
        expect(exerciseDTO.name).toMatch(validData.name);
        expect(exerciseDTO.link).toMatch(validData.link);
      }
    });
  });
});
