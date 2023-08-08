import { ClientSession, Db, ObjectId } from 'mongodb';

import { IRetrieveExercises } from '@backend/domain/exercise/interfaces';
import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from '@backend/domain/exercise/repository/mapper';

export const retrieveExercises =
  (db: Db, session: ClientSession): IRetrieveExercises =>
  async (userId: string) => {
    console.log('---HERE---', userId);
    const exercises = await db
      .collection('exercises')
      .find<ExerciseDB>({ userId: new ObjectId(userId) }, { session })
      .toArray();

    return exercises.map((exercise) => mapToExerciseDTO(exercise));
  };
