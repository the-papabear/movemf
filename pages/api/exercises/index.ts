import { ObjectId } from 'mongodb';

import persistExercise from 'backend/domain/exercise/repository/persistExercise';
import { createExerciseUseCase } from 'backend/domain/exercise/usecase/createExercise';
import { retrieveExercises } from 'backend/domain/exercise/repository/retrieveExercises';
import { retrieveExerciseByName } from 'backend/domain/exercise/repository/retrieveExerciseByName';

export default async function handler(req: any, res: any) {
  const {
    body: { name, link },
  } = req;

  if (req.method === 'GET') {
    const exercises = await retrieveExercises();

    return res.status(200).json(exercises);
  }

  if (req.method === 'POST') {
    const exercise = await createExerciseUseCase({
      persistExercise,
      retrieveExerciseByName,
      generateObjectId: () => new ObjectId().toString(),
    })({
      name,
      link,
    });

    return res.status(200).json({
      exercise,
      code: 200,
      success: true,
      message: 'EXERCISE_CREATED_SUCCESSFULLY',
    });
  }
}
