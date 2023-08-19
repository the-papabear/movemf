import { ClientSession, Db, ObjectId } from 'mongodb';

import { SetDTO } from '@backend/domain/exerciseDetails/interfaces';

export const persistExerciseDetails = (db: Db, session: ClientSession) => async (exerciseDetails: SetDTO) => {
  await db.collection('exerciseDetails').insertOne(
    {
      ...exerciseDetails,
      _id: new ObjectId(exerciseDetails._id),
      workoutId: new ObjectId(exerciseDetails.workoutId),
      exercise: new ObjectId(exerciseDetails.exercise._id),
    },
    { session },
  );
};
