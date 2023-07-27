import { ClientSession, Db, ObjectId } from 'mongodb';

import dbConnection from '@backend/mongoConnection';

export const removeExerciseDetails = (db: Db, session: ClientSession) => async (exerciseDetailsId: string) => {
  await db.collection('exerciseDetails').deleteOne({ _id: new ObjectId(exerciseDetailsId) }, { session });
};
