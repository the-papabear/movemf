import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { ExerciseDetailsDTO } from 'backend/domain/exerciseDetails/interfaces';

export const updateExerciseDetails = async (exerciseDetails: ExerciseDetailsDTO) => {
  const connection = await dbConnection();

  await connection
    .collection('exerciseDetails')
    .replaceOne(
      { _id: new ObjectId(exerciseDetails._id) },
      { ...exerciseDetails, exercise: new ObjectId(exerciseDetails.exercise._id) },
    );
};
