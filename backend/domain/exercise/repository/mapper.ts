import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';

export const mapToExerciseDTO = (exercise: ExerciseDB) => ({
  _id: exercise._id.toString(),
  name: exercise.name,
  link: exercise.link,
  type: exercise.type,
  userId: exercise.userId.toString(),
});
