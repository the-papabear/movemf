import { createSetUseCase } from '@backend/domain/set/usecase/createSet';

describe('createWorkoutDetailsUseCase', () => {
  const workout = { _id: 'workoutId' };
  const exercise = { _id: 'exerciseId' };

  const mockDependencies = {
    persistSet: jest.fn(),
    generateObjectId: jest.fn(() => 'id'),
    retrieveWorkoutById: jest.fn().mockResolvedValue(workout),
    retrieveExerciseById: jest.fn().mockResolvedValue(exercise),
  };

  const validData = {
    reps: 1,
    time: 30,
    weight: 22,
    setNumber: 1,
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

      await expect(createSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'missing_workoutId',
      });
    });
  });

  describe('given no exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: '',
      };

      await expect(createSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'missing_exerciseId',
      });
    });
  });

  describe('given no Workout for the given workoutId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        workoutId: 'non_existent',
      };

      mockDependencies.retrieveWorkoutById.mockResolvedValueOnce(null);

      await expect(createSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: 'workout_not_found',
      });
    });
  });

  describe('given no Exercise for the given exerciseId', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        exerciseId: 'non_existent',
      };

      mockDependencies.retrieveExerciseById.mockResolvedValueOnce(null);

      await expect(createSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 404,
        message: 'exercise_not_found',
      });
    });
  });

  describe('given negative reps', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        reps: -1,
      };

      await expect(createSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'invalid_reps',
      });
    });
  });

  describe('given negative time', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        time: -1,
      };

      await expect(createSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'invalid_time',
      });
    });
  });

  describe('given negative weight', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        weight: -1,
      };

      await expect(createSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'invalid_weight',
      });
    });
  });

  describe('given empty notes', () => {
    it('should throw an error', async () => {
      const invalidData = {
        ...validData,
        notes: ' ',
      };

      await expect(createSetUseCase(mockDependencies)(invalidData)).rejects.toMatchObject({
        code: 400,
        message: 'invalid_notes',
      });
    });
  });

  describe('given valid data', () => {
    it('should call persistSet', async () => {
      mockDependencies.persistSet.mockReset();

      await createSetUseCase(mockDependencies)(validData);

      expect(mockDependencies.persistSet).toHaveBeenCalledTimes(1);
    });

    it('should return a valid setDTO', async () => {
      const setDTO = await createSetUseCase(mockDependencies)(validData);

      expect(setDTO._id).toBeDefined();
      expect(setDTO.insertedAt).toBeDefined();
      expect(setDTO.reps).toEqual(validData.reps);
      expect(setDTO.time).toEqual(validData.time);
      expect(setDTO.notes).toEqual(validData.notes);
      expect(setDTO.weight).toEqual(validData.weight);
      expect(setDTO.workoutId).toEqual(validData.workoutId);
      expect(setDTO.exercise._id).toEqual(validData.exerciseId);
    });
  });
});
