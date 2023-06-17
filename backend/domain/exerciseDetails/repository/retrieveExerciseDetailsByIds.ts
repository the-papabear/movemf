import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { ExerciseDetailsDTO } from 'backend/domain/exerciseDetails/interfaces';

export const retrieveExerciseDetailsByIds = async (
  exerciseDetailsIds: string[]
) => {
  const db = await dbConnection();

  const exercises = await db
    .collection('exerciseDetails')
    .find({
      _id: { $in: exerciseDetailsIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  return exercises.map(
    (exercise) =>
      ({
        ...exercise,
        _id: new ObjectId(exercise._id).toString(),
      } as ExerciseDetailsDTO)
  );
};
