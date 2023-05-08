import { MongoClient } from 'mongodb';

const connectToDB = async () => {
  const client = new MongoClient(process.env.MONGODB_CONNECTION_URI!);

  await client.connect();

  const db = client.db('movemf');

  return db;
};

export default connectToDB;
