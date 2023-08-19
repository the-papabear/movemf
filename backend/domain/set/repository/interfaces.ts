import { ObjectId } from 'mongodb';

import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';

export interface SetBase {
  _id: ObjectId;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
  setNumber: number;
}

export interface SetDB extends SetBase {
  exercise: ObjectId;
  workoutId: ObjectId;
}

export interface SetAggregationDB extends SetBase {
  workoutId: ObjectId;
  exercise: ExerciseDB;
}
