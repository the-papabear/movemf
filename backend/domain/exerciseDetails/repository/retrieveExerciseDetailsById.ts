import { ObjectId } from 'mongodb';

import dbConnection from 'backend/mongoConnection';
import { mapToExerciseDetailsDTO } from 'backend/domain/exerciseDetails/repository/mapper';
import { ExerciseDetailsAggregationDB } from 'backend/domain/exerciseDetails/repository/interfaces';

export const retrieveExerciseDetailsById = async (exerciseDetailsId: string) => {
  const db = await dbConnection();

  const exerciseDetails = await db
    .collection('exerciseDetails')
    .findOne<ExerciseDetailsAggregationDB>({ _id: new ObjectId(exerciseDetailsId) });

  if (!exerciseDetails) return null;

  return mapToExerciseDetailsDTO(exerciseDetails);
};
