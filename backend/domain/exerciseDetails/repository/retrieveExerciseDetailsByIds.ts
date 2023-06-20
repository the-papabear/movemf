import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { ExerciseDetailsDTO } from 'backend/domain/exerciseDetails/interfaces';

export const retrieveExerciseDetailsByIds = async (
  exerciseDetailsIds: string[]
) => {
  const db = await dbConnection();

  const exerciseDetails = await db
    .collection('exerciseDetails')
    .find({
      _id: { $in: exerciseDetailsIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  return exerciseDetails.map(
    (exerciseDetails) =>
      ({
        ...exerciseDetails,
        _id: new ObjectId(exerciseDetails._id).toString(),
      } as ExerciseDetailsDTO)
  );
};
