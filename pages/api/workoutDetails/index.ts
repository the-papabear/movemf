import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { retrieveWorkoutById } from 'backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from 'backend/domain/exercise/repository/retrieveExerciseById';
import { persistWorkoutDetails } from 'backend/domain/workout/repository/persistWorkoutDetails';
import { createWorkoutDetailsUseCase } from 'backend/domain/workout/usecase/createWorkoutDetails';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { workoutId, exerciseId, reps, time, notes, weight },
  } = req;

  if (req.method === 'POST') {
    try {
      const workoutDetails = await createWorkoutDetailsUseCase({
        retrieveWorkoutById,
        retrieveExerciseById,
        persistWorkoutDetails,
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
