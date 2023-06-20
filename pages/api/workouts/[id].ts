import { ObjectId } from 'mongodb';

import { updateWorkout } from 'backend/domain/workout/repository/updateWorkout';
import { editWorkoutUseCase } from 'backend/domain/workout/usecase/editWorkout';
import { retrieveWorkoutById } from 'backend/domain/workout/repository/retrieveWorkoutById';
import { retrieveExerciseById } from 'backend/domain/exercise/repository/retrieveExerciseById';
import { updateExerciseDetails } from 'backend/domain/exerciseDetails/repository/updateExerciseDetails';
import { editExerciseDetailsUseCase } from 'backend/domain/exerciseDetails/usecase/editExerciseDetails';
import { persistExerciseDetails } from 'backend/domain/exerciseDetails/repository/persistExerciseDetails';
import { createExerciseDetailsUseCase } from 'backend/domain/exerciseDetails/usecase/createExerciseDetails';
import { retrieveExerciseDetailsById } from 'backend/domain/exerciseDetails/repository/retrieveExerciseDetailsById';
import { retrieveExerciseDetailsByIds } from 'backend/domain/exerciseDetails/repository/retrieveExerciseDetailsByIds';

export default async function handler(req: any, res: any) {
  const {
    query: { id },
    body: { reps, time, notes, weight, workoutId, exerciseId, exerciseDetailsId, completedAt },
  } = req;

  if (req.method === 'GET') {
    const exercise = await retrieveWorkoutById(id);

    return res.status(200).json(exercise);
  }

  if (req.method === 'PATCH') {
    try {
      const workoutDTO = await editWorkoutUseCase({
        updateWorkout,
        retrieveWorkoutById,
        retrieveExerciseDetailsById,
        retrieveExerciseDetailsByIds,
        editExerciseDetailsUseCase: editExerciseDetailsUseCase({
          retrieveWorkoutById,
          retrieveExerciseById,
          updateExerciseDetails,
          retrieveExerciseDetailsById,
        }),
        createExerciseDetailsUseCase: createExerciseDetailsUseCase({
          retrieveWorkoutById,
          retrieveExerciseById,
          persistExerciseDetails,
          generateObjectId: () => new ObjectId().toString(),
        }),
      })({
        reps,
        time,
        notes,
        weight,
        workoutId,
        exerciseId,
        completedAt,
        exerciseDetailsId,
      });

      return res.status(200).json({
        code: 200,
        workout: workoutDTO,
        message: 'WORKOUT_UPDATED_SUCCESSFULLY',
      });
    } catch (e: any) {
      res.status(500).json(e);
    }
  }
}
