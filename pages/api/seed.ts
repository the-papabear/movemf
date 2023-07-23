import connectToDB from '@backend/mongoConnection';
import { exerciseDetails, exercises, workouts } from '@backend/scripts/seed/seedData';

export default async function handler(req: any, res: any) {
  const env = process.env.NODE_ENV;

  if (env === 'production') return;

  if (req.method !== 'GET') {
    return res.status(405).send();
  }

  const client = await connectToDB();

  const collections = await client.collections();

  await Promise.all(collections.map((collection) => client.collection(collection.collectionName).drop()));

  await client.collection('exercises').insertMany(exercises);
  await client.collection('exerciseDetails').insertMany(exerciseDetails);
  await client.collection('workouts').insertMany(workouts);

  res.status(200).json('Seed completed!');
}
