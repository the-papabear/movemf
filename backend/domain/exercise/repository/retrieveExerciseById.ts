import { ObjectId } from 'mongodb';

import dbConnection from '@backend/mongoConnection';

export const retrieveExerciseById = async (exerciseId: string) => {
  const db = await dbConnection();

  const exercise = await db
    .collection('exercises')
    .findOne({ _id: new ObjectId(exerciseId) });

  if (!exercise) return null;

  return exercise;
};
