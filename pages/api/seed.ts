import { ObjectId } from 'mongodb';

import connectToDB from '@backend/mongoConnection';

export default async function handler(req: any, res: any) {
  const env = process.env.NODE_ENV;

  if (env === 'production') return;

  if (req.method === 'GET') {
    const client = await connectToDB();

    const collections = await client.collections();

    await Promise.all(collections.map((collection) => client.collection(collection.collectionName).drop()));

    await client.collection('exercises').insertMany([
      { _id: new ObjectId(), name: 'Plank' },
      { _id: new ObjectId(), name: 'Squats' },
      { _id: new ObjectId(), name: 'Pull-ups' },
      { _id: new ObjectId(), name: 'Push-ups' },
      { _id: new ObjectId(), name: 'Rest', type: 'REST' },
    ]);

    res.status(200).json('OK!');
  }
}
