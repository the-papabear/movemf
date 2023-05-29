import dbConnection from 'backend/mongoConnection';

const retrieveWorkouts = async () => {
  const db = await dbConnection();

  return await db.collection('workouts').find({}).toArray();
};

export default retrieveWorkouts;
