import cors from 'cors';
import express from 'express';

import connectToDB from '../backend/mongoConnection';

const PORT = 4000;

const app = express();

app.use(cors());

app.get('/api/exercises', async (req, res) => {
  const connection = await connectToDB();

  const exercises = await connection.collection('exercises').find({}).toArray();

  res.send(exercises).status(200);
});

app.listen(PORT, () => console.log('Connected to API server'));

export default app;
