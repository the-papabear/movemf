import dbConnection from 'backend/mongoConnection';
import { ExerciseDB } from 'backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from 'backend/domain/exercise/repository/mapper';

export const retrieveExercises = async () => {
  const db = await dbConnection();

  const exercises = await db.collection('exercises').find<ExerciseDB>({}).toArray();

  return exercises.map((exercise) => mapToExerciseDTO(exercise));
};
