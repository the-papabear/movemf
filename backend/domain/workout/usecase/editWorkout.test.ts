import { editWorkoutUseCase } from '@backend/domain/workout/usecase/editWorkout';

describe('editWorkoutUseCase', () => {
  const workout = { id: 'workoutId' };
  const exerciseDetails = { id: 'exerciseDetailsId' };

  const mockDependencies = {
    updateWorkout: jest.fn(),
    editExerciseDetailsUseCase: jest.fn(),
    createExerciseDetailsUseCase: jest.fn(),
    retrieveExerciseDetailsByIds: jest.fn(),
    retrieveWorkoutById: jest.fn().mockResolvedValue(workout),
    retrieveExerciseDetailsById: jest.fn().mockResolvedValue(exerciseDetails),
  };

  const validData = {
    userId: 'userId',
    workoutId: 'workoutId',
    exerciseId: 'exerciseId',
    exerciseDetailsId: 'exerciseDetailsId',
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

  describe('given no exerciseDetails found for the given exerciseDetailsId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseDetailsId: 'non_existent',
      };

      mockDependencies.retrieveExerciseDetailsById.mockResolvedValueOnce(null);

      await expect(editWorkoutUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: 'exerciseDetails_not_found',
      });
    });
  });

  //TODO: Implement validation test cases for exerciseDetails input && valid data cases
});
