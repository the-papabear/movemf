import { ObjectId } from 'mongodb';

export interface ExerciseDB {
  _id: ObjectId;
  name: string;
  userId: ObjectId;
  link: string | null;
  type: 'EXERCISE' | 'REST';
}
