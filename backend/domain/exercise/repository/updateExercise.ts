import { ExerciseDTO } from 'backend/domain/exercise/interfaces';
import dbConnection from 'backend/mongoConnection';
import { ObjectId } from 'mongodb';

export const updateExercise = async (exercise: ExerciseDTO) => {
  const connection = await dbConnection();

  await connection
    .collection('exercises')
    .replaceOne({ _id: new ObjectId(exercise._id) }, { ...exercise });
};
