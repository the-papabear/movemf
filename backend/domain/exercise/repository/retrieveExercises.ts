import dbConnection from 'backend/mongoConnection';

export const retrieveExercises = async () => {
  const db = await dbConnection();

  return await db.collection('exercises').find({}).toArray();
};
