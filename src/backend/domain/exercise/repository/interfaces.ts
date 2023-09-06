import { ObjectId } from 'mongodb';

export interface ExerciseDB {
  _id: ObjectId;
  name: string;
  link?: string;
  userId: ObjectId;
  type: 'EXERCISE' | 'REST';
}
