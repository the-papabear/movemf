import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { mapToExerciseDetailsDTO } from 'backend/domain/exerciseDetails/repository/mapper';
import { ExerciseDetailsAggregationDB } from 'backend/domain/exerciseDetails/repository/interfaces';

export const retrieveExerciseDetailsByIds = async (exerciseDetailsIds: string[]) => {
  const db = await dbConnection();

  const exerciseDetails = await db
    .collection('exerciseDetails')
    .find<ExerciseDetailsAggregationDB>({
      _id: { $in: exerciseDetailsIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  return exerciseDetails.map((exerciseDetails) => mapToExerciseDetailsDTO(exerciseDetails));
};
