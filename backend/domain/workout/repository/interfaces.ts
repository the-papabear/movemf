import { ObjectId } from 'mongodb';

import { ExerciseDetailsAggregationDB } from '@backend/domain/exerciseDetails/repository/interfaces';

export interface WorkoutDB {
  _id: ObjectId;
  name: string;
  userId: ObjectId;
  completedAt: Date;
}

export interface WorkoutAggregationDB extends WorkoutDB {
  exerciseDetails: ExerciseDetailsAggregationDB[];
}
