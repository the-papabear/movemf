import { ObjectId } from 'mongodb';

import dbConnection from '@backend/mongoConnection';
import { ExerciseDTO } from '@backend/domain/exercise/interfaces';

const persistExercise = async (exercise: ExerciseDTO) => {
  const connection = await dbConnection();

  await connection.collection('exercises').insertOne({
    ...exercise,
    workoutDetails: [],
    _id: new ObjectId(exercise._id),
  });
};

export default persistExercise;
