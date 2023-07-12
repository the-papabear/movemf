import { ObjectId } from 'mongodb';

import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';

export interface ExerciseDetailsDB {
  _id: ObjectId;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
  setNumber: number;
}

export interface ExerciseDetailsAggregationDB extends ExerciseDetailsDB {
  workoutId: ObjectId;
  exercise: ExerciseDB;
}
