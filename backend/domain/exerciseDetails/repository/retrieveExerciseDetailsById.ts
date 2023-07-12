import { ObjectId, WithId } from 'mongodb';

import dbConnection from '@backend/mongoConnection';
import { mapToExerciseDetailsDTO } from '@backend/domain/exerciseDetails/repository/mapper';
import { ExerciseDetailsAggregationDB } from '@backend/domain/exerciseDetails/repository/interfaces';
import { exerciseDetailsAggregation } from '@backend/domain/exerciseDetails/repository/aggregations';

export const retrieveExerciseDetailsById = async (exerciseDetailsId: string) => {
  const db = await dbConnection();

  const exerciseDetails = (
    await db
      .collection('exerciseDetails')
      .aggregate<WithId<ExerciseDetailsAggregationDB>>([
        {
          $match: {
            _id: new ObjectId(exerciseDetailsId),
          },
        },
        ...exerciseDetailsAggregation,
      ])
      .toArray()
  )[0];

  if (!exerciseDetails) return null;

  return mapToExerciseDetailsDTO(exerciseDetails);
};
