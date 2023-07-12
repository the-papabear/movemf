import { ObjectId, WithId } from 'mongodb';

import dbConnection from '@backend/mongoConnection';
import { mapToExerciseDetailsDTO } from '@backend/domain/exerciseDetails/repository/mapper';
import { ExerciseDetailsAggregationDB } from '@backend/domain/exerciseDetails/repository/interfaces';
import { exerciseDetailsAggregation } from '@backend/domain/exerciseDetails/repository/aggregations';

export const retrieveExerciseDetailsByIds = async (exerciseDetailsIds: string[]) => {
  const db = await dbConnection();

  const exerciseDetails = await db
    .collection('exerciseDetails')
    .aggregate<WithId<ExerciseDetailsAggregationDB>>([
      {
        $match: {
          _id: { $in: exerciseDetailsIds.map((id) => new ObjectId(id)) },
        },
      },
      ...exerciseDetailsAggregation,
    ])
    .toArray();

  return exerciseDetails.map((exerciseDetails) => mapToExerciseDetailsDTO(exerciseDetails));
};
