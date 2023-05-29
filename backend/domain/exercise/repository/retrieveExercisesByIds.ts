import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { ExerciseDTO } from 'backend/domain/exercise/interfaces';

export const retrieveExercisesByIds = async (exerciseIds: string[]) => {
  const db = await dbConnection();

  const exercises = await db
    .collection('exercises')
    .find({
      _id: { $in: exerciseIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  return exercises.map(
    (exercise) =>
      ({
        ...exercise,
        _id: new ObjectId(exercise._id).toString(),
      } as ExerciseDTO)
  );
};
