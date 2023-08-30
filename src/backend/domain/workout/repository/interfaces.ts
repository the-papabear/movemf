import { ObjectId } from 'mongodb';

import { SetAggregationDB } from '@/backend/domain/set/repository/interfaces';

export interface WorkoutDB {
  _id: ObjectId;
  name: string;
  userId: ObjectId;
  completedAt: Date;
}

export interface WorkoutAggregationDB extends WorkoutDB {
  set: SetAggregationDB[];
}
