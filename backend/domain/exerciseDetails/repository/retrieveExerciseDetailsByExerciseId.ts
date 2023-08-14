import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { ExerciseDetailsDB } from '@backend/domain/exerciseDetails/repository/interfaces';

export const retrieveExerciseDetailsByExerciseId = (db: Db, session: ClientSession) => async (exerciseId: string) => {
  const exerciseDetails = await db
    .collection('exerciseDetails')
    .find<WithId<ExerciseDetailsDB>>({ exercise: new ObjectId(exerciseId) }, { session })
    .toArray();

  return exerciseDetails.map((exDetails) => ({
    _id: exDetails._id.toString(),
    workoutId: exDetails.workoutId.toString(),
  }));
};
