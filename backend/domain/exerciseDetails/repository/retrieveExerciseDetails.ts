import { ClientSession, Db, WithId } from 'mongodb';

import { mapToExerciseDetailsDTO } from '@backend/domain/exerciseDetails/repository/mapper';
import { ExerciseDetailsAggregationDB } from '@backend/domain/exerciseDetails/repository/interfaces';
import { exerciseDetailsAggregation } from '@backend/domain/exerciseDetails/repository/aggregations';

export const retrieveExerciseDetails = (db: Db, session: ClientSession) => async () => {
  const exerciseDetails = await db
    .collection('exerciseDetails')
    .aggregate<WithId<ExerciseDetailsAggregationDB>>([...exerciseDetailsAggregation], { session })
    .toArray();

  return exerciseDetails.map((exerciseDetails) => mapToExerciseDetailsDTO(exerciseDetails));
};
