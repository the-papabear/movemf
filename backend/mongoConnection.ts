import { MongoClient } from 'mongodb';

const CONNECTION_URI = 'mongodb://localhost:27017';

const connectToDB = async () => {
  const client = new MongoClient(CONNECTION_URI);

  await client.connect();

  const db = client.db('gabriel');

  return db;
};

export default connectToDB;
