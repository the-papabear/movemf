import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { WorkoutDTO } from 'backend/domain/workout/interfaces';

export const updateWorkout = async (workout: WorkoutDTO) => {
  const connection = await dbConnection();

  await connection.collection('workouts').replaceOne(
    { _id: new ObjectId(workout._id) },
    {
      completedAt: workout.completedAt,
      exerciseDetails: workout.exerciseDetails.map((exerciseDetails) => new ObjectId(exerciseDetails._id)),
    },
  );
};
