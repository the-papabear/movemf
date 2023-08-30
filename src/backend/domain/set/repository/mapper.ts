import { mapToExerciseDTO } from '@/backend/domain/exercise/repository/mapper';
import { SetDTO } from '@/backend/domain/set/interfaces';
import { SetAggregationDB } from '@/backend/domain/set/repository/interfaces';

export const mapToSetDTO = (set: SetAggregationDB): SetDTO => {
  return {
    ...set,
    _id: set._id.toString(),
    workoutId: set.workoutId.toString(),
    exercise: mapToExerciseDTO(set.exercise),
  };
};
