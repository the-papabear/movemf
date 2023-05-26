import dbConnection from 'backend/mongoConnection';

const retrieveWorkouts = async () => {
  const db = await dbConnection();

  return await db.collection('workout').find({}).toArray();
};

export default retrieveWorkouts;
