import { MongoClient as Client, ClientSession, Db } from 'mongodb';

export class MongoClient {
  private static client: Client;

  private constructor() {}

  private static getClient() {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing');
    }

    if (!this.client) {
      this.client = new Client(process.env.MONGODB_URI);
    }

    return this.client;
  }

  static async waitForConnectivity(retries: number = 60) {
    const driver = MongoClient.getClient();

    for (let retry = 0; retry < retries; retry++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        await driver.db('admin').command({ ping: 1 });
        return;
      } catch (err) {}
    }

    throw new Error('Mongo not responding. Check connectivity options.');
  }

  static async exec<T = any>(cb: (db: Db, session: ClientSession) => Promise<T>) {
    const client = MongoClient.getClient();
    const db = client.db(process.env.MONGODB_DATABASE);

    const session = client.startSession();

    const res = await cb(db, session);

    await session.endSession();

    return res;
  }
}

let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<Client>;
};

export const mongoClient = async () => {
  let client;

  if (process.env.NODE_ENV === 'development') {
    if (!process.env.MONGODB_URI) {
      throw new Error('invalid connection uri');
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new Client(process.env.MONGODB_URI!);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    return (client = globalWithMongo._mongoClientPromise);
  } else {
    if (!process.env.MONGODB_URI) {
      throw new Error('invalid connection uri');
    }

    client = new Client(process.env.MONGODB_URI);

    const mongoConnection = await client.connect();

    return mongoConnection;
  }
};

export const dbConnection = async () => {
  const connection = await mongoClient();

  return connection.db('movemf');
};

export default dbConnection;
