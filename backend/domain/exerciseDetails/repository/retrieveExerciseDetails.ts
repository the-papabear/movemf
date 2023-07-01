import { ExerciseDetailsAggregationDB } from 'backend/domain/exerciseDetails/repository/interfaces';
import { mapToExerciseDetailsDTO } from 'backend/domain/exerciseDetails/repository/mapper';
import dbConnection from 'backend/mongoConnection';

export const retrieveExerciseDetails = async () => {
  const db = await dbConnection();

  const exerciseDetails = await db.collection('exerciseDetails').find<ExerciseDetailsAggregationDB>({}).toArray();

  return exerciseDetails.map((exerciseDetails) => mapToExerciseDetailsDTO(exerciseDetails));
};
