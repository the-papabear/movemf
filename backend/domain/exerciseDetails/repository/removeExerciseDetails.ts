import { ObjectId } from 'mongodb';

import dbConnection from '@backend/mongoConnection';

export const removeExerciseDetails = async (exerciseDetailsId: string) => {
  const connection = await dbConnection();

  await connection.collection('exerciseDetails').deleteOne({ _id: new ObjectId(exerciseDetailsId) });
};
