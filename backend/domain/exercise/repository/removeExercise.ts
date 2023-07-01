import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';

export const removeExercise = async (exerciseId: string) => {
  const connection = await dbConnection();

  await connection.collection('exercises').deleteOne({ _id: new ObjectId(exerciseId) });
};
