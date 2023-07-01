import { ObjectId } from 'mongodb';

import { ExerciseDB } from 'backend/domain/exercise/repository/interfaces';

export interface ExerciseDetailsDB {
  _id: ObjectId;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
}

export interface ExerciseDetailsAggregationDB extends ExerciseDetailsDB {
  workout: ObjectId;
  exercise: ExerciseDB;
}
