import { BackendError } from '@/backend/errors';
import {
  SetDTO,
  IEditSetUseCase,
  IRetrieveSetById,
  IRetrieveSetByIds,
  ICreateSetUseCase,
} from '@/backend/domain/set/interfaces';
import { WorkoutDTO, IEditWorkout, IRetrieveWorkoutById } from '@/backend/domain/workout/interfaces';

export const editWorkoutUseCase = (dependencies: EditWorkoutDependencies) => async (data: EditWorkoutData) => {
  const { updateWorkout, retrieveWorkoutById, editSetUseCase, retrieveSetById, retrieveSetByIds, createSetUseCase } =
    dependencies;

  const { workoutId, setId, exerciseId, notes, reps, time, weight, completedAt, setNumber, name } = data;

  validateData();

  const existingWorkoutDTO = await retrieveWorkoutById(workoutId);

  if (!existingWorkoutDTO) {
    throw new BackendError(404, 'workout_not_found');
  }

  let setDTOs: SetDTO[] = [];

  if (setId) {
    const existingSetDTO = await retrieveSetById(setId);

    if (!existingSetDTO) {
      throw new BackendError(404, 'set_not_found');
    }

    await editSetUseCase({
      reps,
      time,
      notes,
      setId,
      weight,
      workoutId,
      exerciseId,
    });

    setDTOs = await retrieveSetByIds(existingWorkoutDTO.set.map((set) => set._id));
  } else {
    if (!exerciseId) {
      throw new BackendError(400, 'INVALID_EXERCISE_ID');
    }

    if (!setNumber) {
      throw new BackendError(400, 'MISSING_SET_NUMBER');
    }

    const setDTO = await createSetUseCase({
      reps,
      time,
      notes,
      weight,
      setNumber,
      workoutId,
      exerciseId,
    });

    const existingSetDTOs = await retrieveSetByIds(
      existingWorkoutDTO.set.map((set) => {
        return set._id;
      }),
    );

    setDTOs = [...existingSetDTOs, setDTO];
  }

  const workoutDTO = createWorkoutDTO(existingWorkoutDTO, setDTOs);

  await updateWorkout(workoutDTO);
  return workoutDTO;

  function createWorkoutDTO(workout: WorkoutDTO, sets: SetDTO[]) {
    const workoutDTO = {
      ...workout,
      sets,
    };

    if (name !== undefined) workoutDTO.name = name;
    if (completedAt !== undefined) workoutDTO.completedAt = new Date(completedAt);

    return workoutDTO;
  }

  function validateData() {
    if (!workoutId) {
      throw new BackendError(400, 'invalid_workoutId');
    }
  }
};

interface EditWorkoutDependencies {
  updateWorkout: IEditWorkout;
  editSetUseCase: IEditSetUseCase;
  retrieveSetById: IRetrieveSetById;
  createSetUseCase: ICreateSetUseCase;
  retrieveSetByIds: IRetrieveSetByIds;
  retrieveWorkoutById: IRetrieveWorkoutById;
}

interface EditWorkoutData {
  reps?: number;
  time?: number;
  name?: string;
  setId?: string;
  notes?: string;
  userId: string;
  weight?: number;
  workoutId: string;
  setNumber?: number;
  completedAt?: Date;
  exerciseId?: string;
}
