import { editWorkoutUseCase } from '@backend/domain/workout/usecase/editWorkout';

describe('editWorkoutUseCase', () => {
  const workout = { id: 'workoutId' };
  const set = { id: 'setId' };

  const mockDependencies = {
    updateWorkout: jest.fn(),
    editSetUseCase: jest.fn(),
    createSetUseCase: jest.fn(),
    retrieveSetByIds: jest.fn(),
    retrieveWorkoutById: jest.fn().mockResolvedValue(workout),
    retrieveSetById: jest.fn().mockResolvedValue(set),
  };

  const validData = {
    userId: 'userId',
    workoutId: 'workoutId',
    exerciseId: 'exerciseId',
    setId: 'setId',
  };

  describe('given invalid workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: '',
      };

      await expect(editWorkoutUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
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

      await expect(editWorkoutUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: 'workout_not_found',
      });
    });
  });

  describe('given no set found for the given setId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        setId: 'non_existent',
      };

      mockDependencies.retrieveSetById.mockResolvedValueOnce(null);

      await expect(editWorkoutUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: 'set_not_found',
      });
    });
  });

  //TODO: Implement validation test cases for set input && valid data cases
});
