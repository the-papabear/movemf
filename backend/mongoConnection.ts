import { MongoClient } from 'mongodb';

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};

export const mongoClient = async () => {
  if (!process.env.MONGODB_CONNECTION_URI) {
    throw new Error('invalid connection uri');
  }

  let client;

  if (process.env.NODE_ENV === 'development') {
    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(process.env.MONGODB_CONNECTION_URI!);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    return (client = globalWithMongo._mongoClientPromise);
  } else {
    client = new MongoClient(process.env.MONGODB_URI!);

    const mongoConnection = await client.connect();

    return mongoConnection;
  }
};

export const dbConnection = async () => {
  const connection = await mongoClient();

  return connection.db('movemf');
};

export default dbConnection;
