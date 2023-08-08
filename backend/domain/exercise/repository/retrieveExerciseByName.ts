import { ClientSession, Db } from 'mongodb';

import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from '@backend/domain/exercise/repository/mapper';

export const retrieveExerciseByName = (db: Db, session: ClientSession) => async (name: string, userId: string) => {
  const exercise = await db.collection('exercises').findOne<ExerciseDB>({ name, userId }, { session });

  if (!exercise) return null;

  return mapToExerciseDTO(exercise);
};
