import { NextResponse } from 'next/server';

import { MongoClient } from '@/backend/mongoConnection';
import { set, exercises, workouts } from '@/backend/scripts/seed/seedData';

export default async function GET(req: any, res: any) {
  const env = process.env.NODE_ENV;

  if (env === 'production') return;

  if (req.method !== 'GET') {
    return res.status(405).send();
  }

  MongoClient.exec(async (db) => {
    const collections = await db.collections();
    await Promise.all(collections.map((collection) => db.collection(collection.collectionName).drop()));

    await db.collection('exercises').insertMany(exercises);
    await db.collection('set').insertMany(set);
    await db.collection('workouts').insertMany(workouts);
  });

  return NextResponse.json({ status: 200, message: 'Seed completed successfully!' }, { status: 200 });
}
