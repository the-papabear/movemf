import { ClientSession, Db, ObjectId } from 'mongodb';

export const removeExercise = (db: Db, session: ClientSession) => async (exerciseId: string) => {
  await db.collection('exercises').deleteOne({ _id: new ObjectId(exerciseId) }, { session });
};
