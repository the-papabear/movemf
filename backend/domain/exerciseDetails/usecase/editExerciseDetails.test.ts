import { editExerciseDetailsUseCase } from 'backend/domain/exerciseDetails/usecase/editExerciseDetails';

describe('editExerciseDetailsUseCase', () => {
  const workout = { _id: 'workoutId' };
  const exercise = { _id: 'exerciseId' };
  const exerciseDetails = { _id: 'exerciseDetailsId' };

  const mockDependencies = {
    updateExerciseDetails: jest.fn(),
    retrieveWorkoutById: jest.fn().mockResolvedValue(workout),
    retrieveExerciseById: jest.fn().mockResolvedValue(exercise),
    retrieveExerciseDetailsById: jest.fn().mockResolvedValue(exerciseDetails),
  };

  const validData = {
    workoutId: 'workoutId',
    exerciseId: 'exerciseId',
    exerciseDetailsId: 'exerciseDetailsId',
  };

  describe('given no exerciseDetailsId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseDetailsId: '',
      };

      await expect(
        editExerciseDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({
        code: 400,
        message: 'invalid_exerciseDetailsId',
      });
    });
  });

  describe('given no workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: '',
      };

      await expect(
        editExerciseDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({
        code: 400,
        message: 'invalid_workoutId',
      });
    });
  });

  describe('given no exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: '',
      };

      await expect(
        editExerciseDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({
        code: 400,
        message: 'invalid_exerciseId',
      });
    });
  });

  describe('given no exerciseDetails for the given exerciseDetailsId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseDetailsId: 'non_existent',
      };

      mockDependencies.retrieveExerciseDetailsById.mockResolvedValueOnce(null);

      await expect(
        editExerciseDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({
        code: 404,
        message: 'exerciseDetails_not_found',
      });
    });
  });

  describe('given no workout for the given workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: 'non_existent',
      };

      mockDependencies.retrieveWorkoutById.mockResolvedValueOnce(null);

      await expect(
        editExerciseDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({
        code: 404,
        message: 'workout_not_found',
      });
    });
  });

  describe('given no exercise for the given exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: 'non_existent',
      };

      mockDependencies.retrieveExerciseById.mockResolvedValueOnce(null);

      await expect(
        editExerciseDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({
        code: 404,
        message: 'exercise_not_found',
      });
    });
  });

  //TODO: IMPLEMENT OPTIONAL DATA VALIDITY AND SUCCESS TEST CASES
});
