import { MongoClient } from '@backend/mongoConnection';
import { exerciseDetails, exercises, workouts } from '@backend/scripts/seed/seedData';

export default async function handler(req: any, res: any) {
  const env = process.env.NODE_ENV;

  if (env === 'production') return;

  if (req.method !== 'GET') {
    return res.status(405).send();
  }

  MongoClient.exec(async (db) => {
    const collections = await db.collections();
    await Promise.all(collections.map((collection) => db.collection(collection.collectionName).drop()));

    await db.collection('exercises').insertMany(exercises);
    await db.collection('exerciseDetails').insertMany(exerciseDetails);
    await db.collection('workouts').insertMany(workouts);
  });

  res.status(200).json('Seed completed!');
}
