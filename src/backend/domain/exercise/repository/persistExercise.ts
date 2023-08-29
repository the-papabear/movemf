import { ClientSession, Db, ObjectId } from 'mongodb';

import { ExerciseDTO } from '@backend/domain/exercise/interfaces';

const persistExercise = (db: Db, session: ClientSession) => async (exercise: ExerciseDTO) => {
  await db.collection('exercises').insertOne(
    {
      ...exercise,
      _id: new ObjectId(exercise._id),
      userId: new ObjectId(exercise.userId),
    },
    { session },
  );
};

export default persistExercise;
