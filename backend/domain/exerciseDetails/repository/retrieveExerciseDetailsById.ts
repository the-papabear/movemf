import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { mapToExerciseDetailsDTO } from '@backend/domain/exerciseDetails/repository/mapper';
import { ExerciseDetailsAggregationDB } from '@backend/domain/exerciseDetails/repository/interfaces';
import { exerciseDetailsAggregation } from '@backend/domain/exerciseDetails/repository/aggregations';

export const retrieveExerciseDetailsById = (db: Db, session: ClientSession) => async (exerciseDetailsId: string) => {
  const exerciseDetails = (
    await db
      .collection('exerciseDetails')
      .aggregate<WithId<ExerciseDetailsAggregationDB>>(
        [
          {
            $match: {
              _id: new ObjectId(exerciseDetailsId),
            },
          },
          ...exerciseDetailsAggregation,
        ],
        { session },
      )
      .toArray()
  )[0];

  if (!exerciseDetails) return null;

  return mapToExerciseDetailsDTO(exerciseDetails);
};
