import express from 'express';
import { ObjectId } from 'mongodb';

import connectToDB from '../../../mongoConnection';

const router = express.Router();

router.get('/', async (req, res) => {
  const connection = await connectToDB();

  const exercises = await connection.collection('exercises').find({}).toArray();

  res.send(exercises).status(200);
});

router.get('/seedExercises', async (req, res) => {
  const connection = await connectToDB();

  seedExercises();

  async function seedExercises() {
    await connection.collection('exercises').insertMany([
      { _id: new ObjectId(), name: 'Dumbbell skull crushers' },
      { _id: new ObjectId(), name: 'Push-ups' },
    ]);
  }

  res.send(`Successfully seeded the db with exercises`).status(200);
});

export default router;
