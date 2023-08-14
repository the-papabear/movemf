import { ClientSession, Db, ObjectId } from 'mongodb';

export const removeWorkout = (db: Db, session: ClientSession) => async (workoutId: string) => {
  await db.collection('workouts').deleteOne({ _id: new ObjectId(workoutId) }, { session });
};
