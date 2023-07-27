import { ClientSession, Db, ObjectId } from 'mongodb';

import { ExerciseDB } from '@backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from '@backend/domain/exercise/repository/mapper';

export const retrieveExercisesByIds = (db: Db, session: ClientSession) => async (exerciseIds: string[]) => {
  const exercises = await db
    .collection('exercises')
    .find<ExerciseDB>(
      {
        _id: { $in: exerciseIds.map((id) => new ObjectId(id)) },
      },
      { session },
    )
    .toArray();

  return exercises.map((exercise) => mapToExerciseDTO(exercise));
};
