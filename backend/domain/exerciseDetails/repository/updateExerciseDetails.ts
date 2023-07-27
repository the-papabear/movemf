import { ClientSession, Db, ObjectId } from 'mongodb';

import { ExerciseDetailsDTO } from '@backend/domain/exerciseDetails/interfaces';

export const updateExerciseDetails =
  (db: Db, session: ClientSession) => async (exerciseDetails: ExerciseDetailsDTO) => {
    await db.collection('exerciseDetails').replaceOne(
      { _id: new ObjectId(exerciseDetails._id) },
      {
        ...exerciseDetails,
        _id: new ObjectId(exerciseDetails._id),
        workoutId: new ObjectId(exerciseDetails.workoutId),
        exercise: new ObjectId(exerciseDetails.exercise._id),
      },
      { session },
    );
  };
