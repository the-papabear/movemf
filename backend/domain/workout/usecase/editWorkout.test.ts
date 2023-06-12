import { editWorkoutUseCase } from 'backend/domain/workout/usecase/editWorkout';

describe('editWorkoutUseCase', () => {
  const mockDependencies = {
    retrieveWorkoutById: jest.fn(),
  };

  const validData = {
    workoutId: 'workoutId',
    exerciseDetails: { workoutId: 'workoutId', exerciseId: 'exerciseId' },
  };

  describe('given invalid workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: '',
      };

      await expect(
        editWorkoutUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({
        code: 400,
        message: 'invalid_workoutId',
      });
    });
  });

  describe('given no workout is found for the given workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: 'non_existent',
      };

      mockDependencies.retrieveWorkoutById.mockResolvedValueOnce(null);

      await expect(
        editWorkoutUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 404, message: 'workout_not_found' });
    });
  });
});
