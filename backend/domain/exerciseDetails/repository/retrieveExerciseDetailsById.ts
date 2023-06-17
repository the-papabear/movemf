import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';

export const retrieveExerciseDetailsById = async (
  exerciseDetailsId: string
) => {
  const db = await dbConnection();

  const exerciseDetails = await db
    .collection('exerciseDetails')
    .findOne({ _id: new ObjectId(exerciseDetailsId) });

  if (!exerciseDetails) return null;

  return exerciseDetails;
};
