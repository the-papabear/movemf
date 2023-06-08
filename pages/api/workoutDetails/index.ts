import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { retrieveWorkoutById } from 'backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from 'backend/domain/exercise/repository/retrieveExerciseById';
import { persistExerciseDetails } from 'backend/domain/exerciseDetails/repository/persistExerciseDetails';
import { createExerciseDetailsUseCase } from 'backend/domain/exerciseDetails/usecase/createExerciseDetails';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { workoutId, exerciseId, reps, time, notes, weight },
  } = req;

  if (req.method === 'POST') {
    try {
      const workoutDetails = await createExerciseDetailsUseCase({
        retrieveWorkoutById,
        retrieveExerciseById,
        persistExerciseDetails,
        generateObjectId: () => new ObjectId().toString(),
      })({ workoutId, exerciseId, reps, time, notes, weight });

      return res.status(200).json({
        code: 200,
        success: true,
        workoutDetails,
        message: 'WORKOUT_DETAILS_CREATED_SUCCESSFULLY',
      });
    } catch (e: any) {
      res.status(e.code).send(e);
    }
  }
}
