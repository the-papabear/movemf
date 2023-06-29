import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { ExerciseDB } from 'backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from 'backend/domain/exercise/repository/mapper';

export const retrieveExerciseById = async (exerciseId: string) => {
  const db = await dbConnection();

  const exercise = await db.collection('exercises').findOne<ExerciseDB>({ _id: new ObjectId(exerciseId) });

  if (!exercise) return null;

  return mapToExerciseDTO(exercise);
};
