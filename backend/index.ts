import cors from 'cors';
import express from 'express';

import exerciseRoutes from './domain/exercise/api/exercise';

const app = express();

app.use(cors());

app.use('/api/exercises', exerciseRoutes);

app.listen(process.env.API_PORT, () =>
  console.log(`I'm watching you on port ${process.env.API_PORT}`)
);

export default app;
