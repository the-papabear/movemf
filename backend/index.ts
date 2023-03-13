import express from 'express';

const PORT = 4000;

const app = express();

app.get('/exercise', (req, res) => {
  res.json([
    { name: 'Squat', link: 'squat.com' },
    { name: 'Pull-up', link: 'pull-up.io' },
  ]);
});

app.listen(PORT);

export {};
