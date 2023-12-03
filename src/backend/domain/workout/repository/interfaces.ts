import { ObjectId } from 'mongodb';

import { ExerciseDB } from '@/backend/domain/exercise/repository/interfaces';

export interface WorkoutDB {
  _id: ObjectId;
  name: string;
  sets: SetDB[];
  userId: ObjectId;
  completedAt: Date;
}

export interface SetDB {
  reps: number;
  weight: number;
  setNumber: number;
  exercise: ExerciseDB;
}
