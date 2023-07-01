import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { ExerciseDTO } from 'backend/domain/exercise/interfaces';
import { ExerciseDB } from 'backend/domain/exercise/repository/interfaces';
import { mapToExerciseDTO } from 'backend/domain/exercise/repository/mapper';

export const retrieveExercisesByIds = async (exerciseIds: string[]) => {
  const db = await dbConnection();

  const exercises = await db
    .collection('exercises')
    .find<ExerciseDB>({
      _id: { $in: exerciseIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  return exercises.map((exercise) => mapToExerciseDTO(exercise));
};
