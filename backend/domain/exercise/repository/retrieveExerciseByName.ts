import dbConnection from '@backend/mongoConnection';
import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from '@backend/domain/exercise/repository/mapper';

export const retrieveExerciseByName = async (name: string) => {
  const db = await dbConnection();

  const exercise = await db.collection('exercises').findOne<ExerciseDB>({ name });

  if (!exercise) return null;

  return mapToExerciseDTO(exercise);
};
