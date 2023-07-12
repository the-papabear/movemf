import { exerciseDetailsAggregation } from '@backend/domain/exerciseDetails/repository/aggregations';
import { ExerciseDetailsAggregationDB } from '@backend/domain/exerciseDetails/repository/interfaces';
import { mapToExerciseDetailsDTO } from '@backend/domain/exerciseDetails/repository/mapper';
import dbConnection from '@backend/mongoConnection';
import { WithId } from 'mongodb';

export const retrieveExerciseDetails = async () => {
  const db = await dbConnection();

  const exerciseDetails = await db
    .collection('exerciseDetails')
    .aggregate<WithId<ExerciseDetailsAggregationDB>>([...exerciseDetailsAggregation])
    .toArray();

  return exerciseDetails.map((exerciseDetails) => mapToExerciseDetailsDTO(exerciseDetails));
};
