import { ObjectId } from 'mongodb';

import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';

export interface ExerciseDetailsBase {
  _id: ObjectId;
  reps?: number;
  time?: number;
  notes?: string;
  weight?: number;
  insertedAt: Date;
  setNumber: number;
}

export interface ExerciseDetailsDB extends ExerciseDetailsBase {
  exercise: ObjectId;
  workoutId: ObjectId;
}

export interface ExerciseDetailsAggregationDB extends ExerciseDetailsBase {
  workoutId: ObjectId;
  exercise: ExerciseDB;
}
