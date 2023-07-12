import { ObjectId } from 'mongodb';

import dbConnection from '@backend/mongoConnection';
import { ExerciseDTO } from '@backend/domain/exercise/interfaces';

export const updateExercise = async (exercise: ExerciseDTO) => {
  const connection = await dbConnection();

  await connection.collection('exercises').replaceOne({ _id: new ObjectId(exercise._id) }, { ...exercise });
};
