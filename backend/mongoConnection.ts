import { MongoClient } from 'mongodb';

const connectToDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('invalid connection uri');
  }

  let client;

  if (process.env.NODE_ENV !== 'production') {
    client = new MongoClient(process.env.MONGODB_CONNECTION_URI!);
  }

  client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  const db = client.db('movemf');

  return db;
};

export default connectToDB;
