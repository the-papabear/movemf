import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

import { persistWorkout } from 'backend/domain/workout/repository/persistWorkout';
import retrieveWorkouts from 'backend/domain/workout/repository/retrieveWorkouts';
import { createWorkoutUseCase } from 'backend/domain/workout/usecase/createWorkout';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { completedAt },
  } = req;

  if (req.method === 'GET') {
    const workouts = await retrieveWorkouts();

    return res.status(200).json(workouts);
  }

  if (req.method === 'POST') {
    try {
      const workout = await createWorkoutUseCase({
        persistWorkout,
        generateObjectId: () => new ObjectId().toString(),
      })({ completedAt });

      return res.status(200).json({
        workout,
        code: 200,
        success: true,
        message: 'WORKOUT_CREATED_SUCCESSFULLY',
      });
    } catch (e: any) {
      res.status(e.code).send(e);
    }
  }
}
