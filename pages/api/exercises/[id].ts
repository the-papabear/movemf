import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { editExerciseUseCase } from 'backend/domain/exercise/usecase/editExercise';
import { updateExercise } from 'backend/domain/exercise/repository/updateExercise';
import { retrieveExerciseById } from 'backend/domain/exercise/repository/retrieveExerciseById';
import { retrieveExerciseByName } from 'backend/domain/exercise/repository/retrieveExerciseByName';

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    body: { name, link },
  } = req;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      code: 404,
      success: false,
      message: 'EXERCISE_NOT_FOUND',
    });
  }

  if (req.method === 'GET') {
    const exercise = await retrieveExerciseById(id);

    return res.status(200).json(exercise);
  }

  if (req.method === 'PATCH') {
    const exerciseDTO = await editExerciseUseCase({
      updateExercise,
      retrieveExerciseById,
      retrieveExerciseByName,
    })({ exerciseId: id, name, link });

    return res.status(200).json({
      code: 200,
      success: true,
      exercise: exerciseDTO,
      message: 'EXERCISE_UPDATED_SUCCESSFULLY',
    });
  }

  if (req.method === 'DELETE') {
    const connection = await dbConnection();

    await connection
      .collection('exercises')
      .deleteOne({ _id: new ObjectId(id) });

    return res.status(200).send({
      code: 200,
      success: true,
      message: 'EXERCISE_DELETED',
    });
  }
}
