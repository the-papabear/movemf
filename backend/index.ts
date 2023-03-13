import cors from 'cors';
import express from 'express';

const PORT = 4000;

const app = express();

app.use(cors());

app.get('/exercises', (req, res) => {
  res.json([
    { name: 'Squat', link: 'squat.com' },
    { name: 'Pull-up', link: 'pull-up.io' },
  ]);

  res.status(200);
});

app.listen(PORT);

export {};
