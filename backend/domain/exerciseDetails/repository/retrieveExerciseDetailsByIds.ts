import { ClientSession, Db, ObjectId, WithId } from 'mongodb';

import { mapToExerciseDetailsDTO } from '@backend/domain/exerciseDetails/repository/mapper';
import { ExerciseDetailsAggregationDB } from '@backend/domain/exerciseDetails/repository/interfaces';
import { exerciseDetailsAggregation } from '@backend/domain/exerciseDetails/repository/aggregations';

export const retrieveExerciseDetailsByIds =
  (db: Db, session: ClientSession) => async (exerciseDetailsIds: string[]) => {
    const exerciseDetails = await db
      .collection('exerciseDetails')
      .aggregate<WithId<ExerciseDetailsAggregationDB>>(
        [
          {
            $match: {
              _id: { $in: exerciseDetailsIds.map((id) => new ObjectId(id)) },
            },
          },
          ...exerciseDetailsAggregation,
        ],
        { session },
      )
      .toArray();

    return exerciseDetails.map((exerciseDetails) => mapToExerciseDetailsDTO(exerciseDetails));
  };
