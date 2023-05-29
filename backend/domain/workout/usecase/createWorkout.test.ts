import { createWorkoutUseCase } from 'backend/domain/workout/usecase/createWorkout';

describe('createWorkoutUseCase', () => {
  const exercises = [
    { _id: 'exerciseId1' },
    { _id: 'exerciseId2' },
    { _id: 'exerciseId3' },
  ];

  const mockDependencies = {
    persistWorkout: jest.fn(),
    generateObjectId: jest.fn(() => 'id'),
    retrieveExercisesByIds: jest.fn().mockResolvedValue(exercises),
  };

  const validData = {
    exerciseIds: ['exerciseId1', 'exerciseId2', 'exerciseId3'],
  };

  describe('given there is not exercise for the given exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseIds: ['not_existent'],
      };

      mockDependencies.retrieveExercisesByIds.mockResolvedValueOnce([]);

      await expect(
        createWorkoutUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 404, message: 'exercise_not_found' });
    });
  });

  describe('given valid data', () => {
    it('should call persistWorkout', async () => {
      mockDependencies.persistWorkout.mockReset();

      await createWorkoutUseCase(mockDependencies)(validData);

      expect(mockDependencies.persistWorkout).toHaveBeenCalledTimes(1);
    });

    it('should return a valid workoutDTO', async () => {
      const workoutDTO = await createWorkoutUseCase(mockDependencies)(
        validData
      );

      expect(workoutDTO._id).toBeDefined();
      expect(workoutDTO.completedAt).toBeDefined();
      expect(workoutDTO.exercises[0]._id).toMatch(validData.exerciseIds[0]);
    });
  });
});
