import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { WorkoutDetailsDTO } from 'backend/domain/workout/interfaces';

export const persistWorkoutDetails = async (
  workoutDetails: WorkoutDetailsDTO
) => {
  const connection = await dbConnection();

  await connection.collection('workoutDetails').insertOne({
    ...workoutDetails,
    _id: new ObjectId(workoutDetails._id),
    workout: new ObjectId(workoutDetails.workout._id),
  });
};
