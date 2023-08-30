import { editSetUseCase } from '@/backend/domain/set/usecase/editSet';

describe('editSetUseCase', () => {
  const set = { _id: 'setId' };
  const workout = { _id: 'workoutId' };
  const exercise = { _id: 'exerciseId' };

  const mockDependencies = {
    updateSet: jest.fn(),
    retrieveSetById: jest.fn().mockResolvedValue(set),
    retrieveWorkoutById: jest.fn().mockResolvedValue(workout),
    retrieveExerciseById: jest.fn().mockResolvedValue(exercise),
  };

  const validData = {
    workoutId: 'workoutId',
    exerciseId: 'exerciseId',
    setId: 'setId',
  };

  describe('given no setId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        setId: '',
      };

      await expect(editSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'invalid_setId',
      });
    });
  });

  describe('given no workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: '',
      };

      await expect(editSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
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

      await expect(editSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'invalid_exerciseId',
      });
    });
  });

  describe('given no set for the given setId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        setId: 'non_existent',
      };

      mockDependencies.retrieveSetById.mockResolvedValueOnce(null);

      await expect(editSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: 'set_not_found',
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

      await expect(editSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
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

      await expect(editSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: 'exercise_not_found',
      });
    });
  });

  //TODO: IMPLEMENT OPTIONAL DATA VALIDITY AND SUCCESS TEST CASES
});
