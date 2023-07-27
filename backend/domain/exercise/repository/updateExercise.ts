import { ClientSession, Db, ObjectId } from 'mongodb';

import { ExerciseDTO } from '@backend/domain/exercise/interfaces';

export const updateExercise = (db: Db, session: ClientSession) => async (exercise: ExerciseDTO) => {
  await db
    .collection('exercises')
    .replaceOne({ _id: new ObjectId(exercise._id) }, { name: exercise.name, link: exercise.link }, { session });
};
