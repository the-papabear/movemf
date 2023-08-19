import { ClientSession, Db, ObjectId } from 'mongodb';

export const removeSet = (db: Db, session: ClientSession) => async (setId: string) => {
  await db.collection('sets').deleteOne({ _id: new ObjectId(setId) }, { session });
};
