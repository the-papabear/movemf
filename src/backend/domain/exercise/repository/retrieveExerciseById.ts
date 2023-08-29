import { ClientSession, Db, ObjectId } from 'mongodb';

import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from '@backend/domain/exercise/repository/mapper';

export const retrieveExerciseById = (db: Db, session: ClientSession) => async (exerciseId: string) => {
  const exercise = await db.collection('exercises').findOne<ExerciseDB>({ _id: new ObjectId(exerciseId) }, { session });

  if (!exercise) return null;

  return mapToExerciseDTO(exercise);
};
