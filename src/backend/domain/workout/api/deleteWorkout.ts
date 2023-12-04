import { MongoClient } from '@/backend/mongoConnection';
import { removeWorkout } from '@/backend/domain/workout/repository/removeWorkout';
import { makeErrorResponse, makeSuccessResponse } from '@/backend/lib/makeQueryResponse';
import { deleteWorkoutUseCase } from '@/backend/domain/workout/usecase/deleteWorkout';
import { retrieveWorkoutById } from '@/backend/domain/workout/repository/retrieveWorkoutById';

export async function DELETE(workoutId: string) {
  await MongoClient.exec(async (db, session) => {
    try {
      const dependencies = {
        removeWorkout: removeWorkout(db, session),
        retrieveWorkoutById: retrieveWorkoutById(db, session),
      };

      const data = {
        workoutId,
      };

      await deleteWorkoutUseCase(dependencies)(data);

      return makeSuccessResponse('WORKOUT_DELETED_SUCCESSFULLY');
    } catch (e: any) {
      return makeErrorResponse(e.code, e.message);
    }
  });
}
