import { createWorkoutUseCase } from '@backend/domain/workout/usecase/createWorkout';

describe('createWorkoutUseCase', () => {
  const mockDependencies = {
    persistWorkout: jest.fn(),
    generateObjectId: jest.fn(() => 'id'),
  };

  const validData = {
    completedAt: new Date(),
  };

  describe('given valid data', () => {
    it('should call persistWorkout', async () => {
      mockDependencies.persistWorkout.mockReset();

      await createWorkoutUseCase(mockDependencies)(validData);

      expect(mockDependencies.persistWorkout).toHaveBeenCalledTimes(1);
    });

    it('should return a valid workoutDTO', async () => {
      const workoutDTO = await createWorkoutUseCase(mockDependencies)(validData);

      expect(workoutDTO._id).toBeDefined();
      expect(workoutDTO.exerciseDetails).toEqual([]);
      expect(workoutDTO.completedAt).toEqual(validData.completedAt);
    });
  });
});
