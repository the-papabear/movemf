import { ClientSession, Db } from 'mongodb';

import { IRetrieveExercises } from '@backend/domain/exercise/interfaces';
import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from '@backend/domain/exercise/repository/mapper';

export const retrieveExercises =
  (db: Db, session: ClientSession): IRetrieveExercises =>
  async () => {
    const exercises = await db.collection('exercises').find<ExerciseDB>({}, { session }).toArray();

    return exercises.map((exercise) => mapToExerciseDTO(exercise));
  };
