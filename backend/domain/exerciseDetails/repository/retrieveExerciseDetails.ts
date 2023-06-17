import dbConnection from 'backend/mongoConnection';

export const retrieveExerciseDetails = async () => {
  const db = await dbConnection();

  return await db.collection('exerciseDetails').find({}).toArray();
};
