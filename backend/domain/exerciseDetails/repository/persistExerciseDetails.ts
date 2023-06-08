import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { ExerciseDetailsDTO } from 'backend/domain/exerciseDetails/interfaces';

export const persistExerciseDetails = async (
  exerciseDetails: ExerciseDetailsDTO
) => {
  const connection = await dbConnection();

  await connection.collection('exerciseDetails').insertOne({
    ...exerciseDetails,
    _id: new ObjectId(exerciseDetails._id),
    workout: new ObjectId(exerciseDetails.workout._id),
    exercise: new ObjectId(exerciseDetails.exercise._id),
  });
};
