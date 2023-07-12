import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';

export const mapToExerciseDTO = (exercise: ExerciseDB) => ({
  ...exercise,
  _id: exercise._id.toString(),
});
