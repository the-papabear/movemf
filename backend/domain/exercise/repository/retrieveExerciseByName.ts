import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { ExerciseDTO } from 'backend/domain/exercise/interfaces';

export const retrieveExerciseByName = async (name: string) => {
  const db = await dbConnection();

  const exercise = await db.collection('exercises').findOne({ name });

  if (!exercise) return null;

  return exercise;
};
