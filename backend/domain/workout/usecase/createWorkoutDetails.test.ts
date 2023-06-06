import { createWorkoutDetailsUseCase } from 'backend/domain/workout/usecase/createWorkoutDetails';

describe('createWorkoutDetailsUseCase', () => {
  const workout = { _id: 'workoutId' };
  const exercise = { _id: 'exerciseId' };

  const mockDependencies = {
    persistWorkoutDetails: jest.fn(),
    generateObjectId: jest.fn(() => 'id'),
    retrieveWorkoutById: jest.fn().mockResolvedValue(workout),
    retrieveExerciseById: jest.fn().mockResolvedValue(exercise),
  };

  const validData = {
    reps: 1,
    time: 30,
    weight: 22,
    notes: 'lorem ipsum',
    workoutId: 'workoutId',
    exerciseId: 'exerciseId',
  };

  describe('given no workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: '',
      };

      await expect(
        createWorkoutDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 400, message: 'missing_workoutId' });
    });
  });

  describe('given no exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: '',
      };

      await expect(
        createWorkoutDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 400, message: 'missing_exerciseId' });
    });
  });

  describe('given no Workout for the given workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: 'non_existent',
      };

      mockDependencies.retrieveWorkoutById.mockResolvedValueOnce(null);

      await expect(
        createWorkoutDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 404, message: 'workout_not_found' });
    });
  });

  describe('given no Exercise for the given exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: 'non_existent',
      };

      mockDependencies.retrieveExerciseById.mockResolvedValueOnce(null);

      await expect(
        createWorkoutDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 404, message: 'exercise_not_found' });
    });
  });

  describe('given negative reps', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        reps: -1,
      };

      await expect(
        createWorkoutDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 400, message: 'invalid_reps' });
    });
  });

  describe('given negative time', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        time: -1,
      };

      await expect(
        createWorkoutDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 400, message: 'invalid_time' });
    });
  });

  describe('given negative weight', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        weight: -1,
      };

      await expect(
        createWorkoutDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 400, message: 'invalid_weight' });
    });
  });

  describe('given empty notes', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        notes: ' ',
      };

      await expect(
        createWorkoutDetailsUseCase(mockDependencies)(invalidData)
      ).rejects.toMatchObject({ code: 400, message: 'invalid_notes' });
    });
  });

  describe('given valid data', () => {
    it('should call persistWorkoutDetails', async () => {
      mockDependencies.persistWorkoutDetails.mockReset();

      await createWorkoutDetailsUseCase(mockDependencies)(validData);

      expect(mockDependencies.persistWorkoutDetails).toHaveBeenCalledTimes(1);
    });

    it('should return a valid workoutDetailsDTO', async () => {
      const workoutDetailsDTO = await createWorkoutDetailsUseCase(
        mockDependencies
      )(validData);

      expect(workoutDetailsDTO._id).toBeDefined();
      expect(workoutDetailsDTO.reps).toEqual(validData.reps);
      expect(workoutDetailsDTO.time).toEqual(validData.time);
      expect(workoutDetailsDTO.notes).toEqual(validData.notes);
      expect(workoutDetailsDTO.weight).toEqual(validData.weight);
      expect(workoutDetailsDTO.workout._id).toEqual(validData.workoutId);
    });
  });
});
