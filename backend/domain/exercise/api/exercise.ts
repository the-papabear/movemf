import express from 'express';
import { ObjectId } from 'mongodb';

import connectToDB from '../../../mongoConnection';

const router = express.Router();

router.get('/', async (req, res) => {
  const connection = await connectToDB();

  const exercises = await connection.collection('exercises').find({}).toArray();

  return res.send(exercises).status(200);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('EXERCISE_NOT_FOUND');
  }

  const connection = await connectToDB();
  const exercise = await connection
    .collection('exercises')
    .findOne({ _id: new ObjectId(id) });

  return res.send(exercise || null).status(200);
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

  return res.send(`Successfully seeded the db with exercises`).status(200);
});

router.post('/exercise', async (req, res) => {
  const connection = await connectToDB();

  const exercise = await connection
    .collection('exercises')
    .insertOne({ name: req.body.name, link: req.body.link });

  return res.send(`Added entity with id ${exercise.insertedId}`).status(200);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('EXERCISE_NOT_FOUND');
  }

  const connection = await connectToDB();

  await connection.collection('exercises').deleteOne({ _id: new ObjectId(id) });

  return res.status(200).send('EXERCISE_DELETED');
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send('EXERCISE_NOT_FOUND');
  }

  const connection = await connectToDB();

  const exercise = await connection
    .collection('exercises')
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, link } });

  return res.status(200).send('UPDATED_SUCCESSFULLY');
});

export default router;
