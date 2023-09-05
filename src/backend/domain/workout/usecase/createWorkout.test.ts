import { WORKOUT_ERRORS } from '@/backend/domain/workout/usecase/errors';
import { createWorkoutUseCase } from '@/backend/domain/workout/usecase/createWorkout';

describe('createWorkoutUseCase', () => {
  const exercise = { _id: 'exerciseId', name: 'Pull-ups' };

  const mockDependencies = {
    persistWorkout: jest.fn(),
    generateObjectId: jest.fn(() => 'id'),
    retrieveExerciseById: jest.fn().mockResolvedValue(exercise),
  };

  const validData = {
    name: 'workout',
    userId: 'userId',
    completedAt: new Date(),
    sets: [
      { setNumber: 1, exerciseId: 'exerciseId', reps: 10, weight: 10 },
      { setNumber: 2, exerciseId: 'exerciseId', reps: 10, weight: 10 },
    ],
  };

  describe('given no sets are given in a workout', () => {
    const invalidData = {
      ...validData,
      sets: [],
    };
    it('should throw an error', async () => {
      await expect(createWorkoutUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: WORKOUT_ERRORS.MISSING_SETS,
      });
    });
  });

  describe('given no exercise is found for the given exerciseId in a set', () => {
    const invalidData = {
      ...validData,
      sets: [
        { setNumber: 2, exerciseId: 'exerciseId', reps: 10, weight: 10 },
        { setNumber: 1, exerciseId: 'non-existent', reps: 10, weight: 10 },
      ],
    };

    it('should throw an error', async () => {
      mockDependencies.retrieveExerciseById.mockResolvedValueOnce(null);

      await expect(createWorkoutUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: WORKOUT_ERRORS.EXERCISE_NOT_FOUND,
      });
    });
  });

  describe('given negative reps', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        sets: [
          { setNumber: 2, exerciseId: 'exerciseId', reps: -1, weight: 10 },
          { setNumber: 1, exerciseId: 'non-existent', reps: 0, weight: 10 },
        ],
      };

      await expect(createWorkoutUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: WORKOUT_ERRORS.INVALID_REPS,
      });
    });
  });

  describe('given negative weight', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        sets: [
          { setNumber: 2, exerciseId: 'exerciseId', reps: 1, weight: 30 },
          { setNumber: 1, exerciseId: 'non-existent', reps: 1, weight: -2 },
        ],
      };

      await expect(createWorkoutUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: WORKOUT_ERRORS.INVALID_WEIGHT,
      });
    });
  });

  describe('given valid data', () => {
    it('should call persistWorkout', async () => {
      mockDependencies.persistWorkout.mockReset();

      await createWorkoutUseCase(mockDependencies)(validData);

      expect(mockDependencies.persistWorkout).toHaveBeenCalledTimes(1);
    });

    it('should return a valid workoutDTO', async () => {
      const workoutDTO = await createWorkoutUseCase(mockDependencies)(validData);

      expect(workoutDTO._id).toBeDefined();
      expect(workoutDTO.sets.length).toEqual(validData.sets.length);
      expect(workoutDTO.completedAt).toEqual(validData.completedAt);
    });
  });
});
